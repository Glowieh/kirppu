# Setting up development environment
This guide is meant for setting up a basic Kirppu development environment for testing.
It consists of a high level guide outlining the steps, example guide that has more detail and finally some pointers on how to access Kirppu once it's running.


## High level guide

1. Install python.
    1. Install pip.
       Pip is used for downloading and installing dependencies. It is included
       by default in Python since 2.7.9 and 3.4.
    2. (recommended) Install virtualenv.
       Virtualenv is used to install Python and dependencies directly to the
       project folder, so that any updates to the rest of the system don't
       influence the project.
4. Clone Kirppu.
5. Install dependencies with pip and dependencies.txt.
6. Install js dependencies with npm. (Needed only if doing CoffeeScript/js/css editing.)
7. Setup database with dev data.
8. Run django with manage.py.


## Example guide

Windows:

- If pip or virtualenv are missing from PATH, even though they are installed, call them through python
    - `python -m pip install virtualenv`
    - `python -m virtualenv venv`

Syntax:

- \# comment
- $ Linux/generic command line
- \> Windows specific command line


### Setting up Kirppu and its dependencies
```Text
# Install python if your system doesn't have it already.
$ sudo aptitude install python

# Install pip. If using Windows, check pip website for how to install pip.
$ sudo aptitude install python-pip
$ sudo pip install virtualenv
$ git clone https://github.com/jlaunonen/kirppu.git kirppu
$ cd kirppu

# Activate virtualenv. After this point all modules installed with pip
# are local to the project.
~/kirppu$ source venv/bin/activate
> venv\Scripts\activate.bat

# (optional) Check that python and pip point to the venv folder.
(venv) ~/kirppu$ which python pip
/home/ari/kirppu/venv/bin/python
/home/ari/kirppu/venv/bin/pip

# Install packages needed to build the requirements from source.
# On Windows pip might download actual binaries, or you might need to
# have Visual Studio and install the dependencies
# Pillow/PIL can make use of other libs too, but zlib should suffice.
sudo aptitude install python-dev zlib1g-dev nodejs
sudo yum install python-devel libzip-devel nodejs

# Install required python packages.
~/kirppu$ pip install -r requirements.txt
Successfully installed django-1.6.10 django-pipeline-1.3.27 pillow-2.4.0 pyBarcode-0.8b1

# Install required js packages (defined by package.json).
# Note, that this is ran inside the "kirppu" module instead of project root.
~/kirppu/kirppu$ npm install
# (this may take a while, and will output huge tree after it completes.)
```

### Add some example Data for Kirppu.
```Text
# Initialize models for Kirppu in a sqlite database (db.sqlite).
# Create a new superuser when asked.
(venv) ~/kirppu$ python manage.py syncdb
Installed 0 object(s) from 0 fixture(s)

# Load some fake data to play with.
(venv) ~/kirppu$ python manage.py loaddata dev_data
Installed 10 object(s) from 1 fixture(s)

# Run Django dev server in some port, I like 9874.
(venv) ~/kirppu$ python manage.py runserver 9874
```

## Testing Kirppu

- Admin interface
    - `localhost:9874/admin/`
    - Login with the local superuser credentials.
    - You can view and modify the model at your will here.
- Vendor UI
    - `localhost:9874/kirppu/vendor`
    - Vendors register their items here.
- Clerk UI
    - `localhost:9874/kirppu/checkout`
    - To enable, you need to set `KIRPPU_CHECKOUT_ACTIVE` to _True_ in
      `kirppu/local_settings.py`
    - "Locked Need to validate counter."
        - Input `:*dev_counter`
    - "Locked Login..."
        - In admin panel, goto clerks and generate an access code for you self with
          Action: "Generate missing Clerk access codes"
        - Input your access code.


## Frontend development notes

To compile frontend sources for use in browser, there is two choices, which can both be added to IDE simultaneously.


### Gulp watcher

- When changing files in `static_src`, they need to be compiled with `gulp`. Manually:
  `~/kirppu/kirppu$ node node_modules/gulp/bin/gulp.js`

- Automatic compilation can be added to IDE. Following configuration compiles only module whose part has been changed.
    - Disable _Immediate file synchronization_
    - Show console: _Always_  (errors are currently not found correctly from output)
    - File type: _Any_
    - Scope: Define own scope that recursively contains `static_src` directory.
    - Program: Either `node_modules/gulp/bin/gulp.js` or wrapper script (or `node` itself; add the gulp.js to first argument then).
    - Arguments: `build --file $FilePathRelativeToProjectRoot$`
    - Output paths to refresh: `./static`

- When needed, automatic compilation can be disabled from watcher list by un-checking the watcher.


### Gulp run configuration

- "Rebuild":
    - Gulpfile: Choose the `gulpfile.js` from `kirppu` module.
    - Task: `default`
    - Node: Choose your node binary.
    - Gulp package: Find `kirppu/kirppu/node_modules/gulp`.

- "Rebuild production":
    - Same as above, but this additionally compress the results (of some parts). This will take a bit longer than without compress.
    - Arguments: `--type production`
