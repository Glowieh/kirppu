from ..utils import PixelWriter
import barcode
from barcode.charsets import code128
from django import template
from django.conf import settings
register = template.Library()
import base64
from cStringIO import StringIO
from django.utils.functional import memoize
from collections import OrderedDict
from ..models import UIText
import re


class FifoDict(OrderedDict):
    def __init__(self, *args, **kwargs):
        self.limit = kwargs.pop("limit", None)
        OrderedDict.__init__(self, *args, **kwargs)
        self._remove_oldest()

    def __setitem__(self, key, value):
        OrderedDict.__setitem__(self, key, value)
        self._remove_oldest()

    def _remove_oldest(self):
        if not self.limit:
            return

        while len(self) > self.limit:
            self.popitem(last=False)


# Limit the size of the dict to a reasonable number so that we don't have
# millions of dataurls cached.
barcode_dataurl_cache = FifoDict(limit=50000)


class KirppuBarcode(barcode.Code128):
    """Make sure barcode is always the same width"""

    def _maybe_switch_charset(self, pos):
        """Do not switch ever."""
        char = self.code[pos]
        assert(char in code128.B)
        return []

    def _try_to_optimize(self, encoded):
        return encoded

    @staticmethod
    def length(text, writer):
        """
        Get expected image width for given text when using given writer.

        :param text: Text to be encoded or length of the text.
        :type text: str | unicode | int
        :param writer: Writer used to write. Expected to be able tell its total quiet zone size.
        :return: Width of the resulting image.
        :rtype: int
        """
        # Text is actually going to be text+LF. CH=11, (START=11, END=13)=24
        if not isinstance(text, int):
            length = len(text)
        else:
            length = text
        return (length + 1) * 11 + 24 + writer.quiet_zone()


@register.simple_tag
def load_text(id_):
    return UIText.objects.get(identifier=id_).text


def generate_dataurl(code, ext, expect_width=143):
    if not code:
        return ''

    writer = PixelWriter(format=ext)
    mime_type = 'image/' + ext

    # PIL only writes to
    bar = KirppuBarcode(code, writer=writer)
    memory_file = StringIO()
    pil_image = bar.render({
        'module_width': 1
    })

    width, height = pil_image.size

    # These measurements have to be exactly the same as the ones used in
    # price_tags.css. If they are not the image might be distorted enough
    # to not register on the scanner.
    if settings.DEBUG:
        assert(height == 1)
        assert(expect_width is None or width == expect_width)

    pil_image.save(memory_file, format=ext)
    data = memory_file.getvalue()

    dataurl_format = 'data:{mime_type};base64,{base64_data}'
    return dataurl_format.format(
        mime_type=mime_type,
        base64_data=base64.encodestring(data)
    )
get_dataurl = memoize(generate_dataurl, barcode_dataurl_cache, 2)


@register.simple_tag
def barcode_dataurl(code, ext, expect_width=143):
    return get_dataurl(code, ext, expect_width)


@register.simple_tag
def barcode_css(low=4, high=6, target=None, container=None, compress=False):
    target = target or ".barcode_img.barcode_img{0}"
    container = container or ".barcode_container.barcode_container{0}"

    css = """
        {target}, {container} {{
            width: {px}px;
            background-color: white;
        }}
    """

    output = []
    for code_length in range(low, high + 1):
        px = KirppuBarcode.length(code_length, PixelWriter)
        for multiplier in range(1, 3):
            suffix = "_" + str(code_length) + "_" + str(multiplier)
            mpx = px * multiplier
            rule = css.format(
                target=target.format(suffix),
                container=container.format(suffix),
                px=mpx,
            )
            if compress:
                rule = re.sub(r'[\s]+', "", rule)
            output.append(rule)
    return "".join(output)
