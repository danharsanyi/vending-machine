# New Project

> ✨ Bootstrapped with Create Snowpack App (CSA).

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like "@snowpack/plugin-webpack" to your `snowpack.config.js` config file.

### npm test

Launches the application test runner.
Run with the `--watch` flag (`npm test -- --watch`) to run in interactive watch mode.

### App Requirements

- [ ] Must not allow the user to enter invalid currency (only 10c, 20c, 50c, $1, $2)
- [ ] Ensure correct amount of money is entered prior to making selection
- [ ] Ability for user to make a selection
- [ ] Separate presentation logic from business logic
- [ ] Unit tests

### Stretch

- [ ] Ability for user to collect change if amount entered is greater than the purchase value and they are finished purchasing
- [ ] Ability for user to return/refund coins
- [ ] Add Mobile responsive styles
- [ ] Move state management to library eg xstate