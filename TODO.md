- When watching, safely rerun jshint on change
- Keep app/components somewhere else, it is a vendor directory
    - Also app/styles/*bootstrap*
- Auto-run bower and npm, or have grunt complain on all tasks if not installed
- Grunt build task that can run on a server (e.g. no testacular)
- Generate README.md in target project
- Close browser window on clean exit of grunt server
- Include all the magical extra modules (bootstrap, etc.) we want by default
    - With command line options to set to minimal includes, or asking for each
    - Best way to handle all this is to have a list of libraries referenced by
      the composer.json and index.haml templates, rather than the ugly series
      of if statements used now.
    - FontAwesome should also be optional
- Re-add proper coffeescript support
    - Can we back-compile the Javascript? Probably not, but worth a try...
- Make use of Haml optional
- Maybe return to MainCtrl pattern?
- Add built-in support for component-shrinkwrap and npm shrinkwrap
