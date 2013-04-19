- When watching, safely rerun jshint on change
- Default templated code includes references to angular-bootstrap, angular-ui
- Proper paths to FontAwesome fonts
- Keep app/components somewhere else, it is a vendor directory
    - Also app/styles/*bootstrap*
- Auto-run bower and npm, or have grunt complain on all tasks if not installed
- Grunt build task that can run on a server (e.g. no testacular)
- Underscore.string
- Generate README.md
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
