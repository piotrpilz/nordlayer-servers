Hello! Check my instructions and your requiremenets with my comments below, in the "Requirements (and checklist)" section.
## How to run

### 1. The current main branch is automatically deployed and available at this URL:
   https://jhy5w.netlify.app/

### 2. To run the app locally, follow these steps

1) clone this repository
   
    ```shell    
    git clone git@github.com:piotrpilz/nordlayer-servers.git
    ```

1) Go to the application catalog:
   
    ```shell
    cd nordlayer-servers
    ```

2) Install dependecies
   
    ```shell
    npm install
    ```

3) Run application server
   
    ```shell
    npm run preview
    ```

The applicaton should be available at
http://localhost:4173/


### 3. Testing
1) To run unit tests use a following command
    ```shell
    npm run test
    ```

2) All e2e tests are performed on a production environment https://jhy5w.netlify.app, you can override this setting by creating and editing `.env.local` file)
   
    To run e2e tests use:

    ```shell
    npm run e2e
    ```

    or using GUI
    ```
    npm run e2e:ui
    ```

    You can check e2e test reports using:
    ```shell
    npm run e2e:report
    ```

-------
## Further improvements:

In the next iterations I would like to:
- add internationalization for the app (ex. using i18n `react-i18next`)
- write more unit tests to get better coverage
- create mocks as separate files for some modules (ex. api calls)
- add e2e testing for older browsers
- create simple user panel for the logged user with logout option

## Requirements (and checklist)
Based on instruction file you provided I've created a checklist with my comnents included.
### Design
- Come up with a simple, yet usable design - ✅
- Design must be mobile-friendly and responsive - ✅
- Use SVG 's where possible- ✅
  
  > **_NOTE:_** I used svg only. For an app logo and icons.

- For CSS you can use whatever you need and feel comfortable with (vanilla CSS is an option too), but we strongly recommend these:
  - CSS-in-JS
  - CSS Modules
  - Tailwind - ✅
  
  > **_NOTE:_** I've used `Tailwind` to get more familliar with this framework. Some tweaks were requried to get it working in IE11.

### App
- Use ES6+ features where applicable - ✅
- Use + Context API and React Query (or Redux) - ✅

   > **_NOTE:_**
   >
   > 1) I've used `React Query` to create communication with API: obtain user token and fetch servers list. 
   > 2) I've created additional repositories with api calls for `servers` and `token` entities `/api` catalog
   > 3) I've created an additional wrapper for apiClient to get more maintable code

- Use Typescript - ✅
- This must be a single-page application. Use routing library( `react-router-dom` or `@reach/router` ) - ✅
- Implement login by sending an authorization request ( POST )
to https://playground.tesonet.lt/v1/tokens to generate a token (don't forget to pass `Content-Type`)&nbsp;-&nbsp;✅

- Use browser storage solution to persist token between sessions - ✅
    
    > **_NOTE:_** I've created an additional wrapper/facade for browsers local storage

- Use the token to retrieve the server list
from https://playground.tesonet.lt/v1/servers,- ✅

- Order the results of the servers list by and name - ✅
- Implement logout - ✅

### Bonus

- It is all good to use as a starter, but if you have time and want to showcase your skill - use JS bundler instead (preferably Vite or )
    > **_NOTE:_** For educational purposes I've setup and configured application using vite, configured typescript, added some plugins and helpers ex. husky git hooks. And I've found it very exciting :)

- We highly recommend following TDD patterns and showcasing your skills at writing tests ( unit , integration, e2e - all are good)
   > **_NOTE:_** I’ve added some unit tests, but there are still more that I would like to add. I've configured a Playwright e2e testing framework and created test covering all actions in the app.

- Use for running tasks, i.e. for development, cleaning build or etc. - ✅
- Do validation of login fields and provide user-friendly error messages if
needed #UXmatters - ✅
    > **_NOTE:_** `Login` button in the `login form` should be disabled if password or username is empty

- Indicate the loading state for the user whenever requests are in action - ✅ 

- Git History - ✅
- Don't import too many libraries (keep away from bootstrap, Material-ui, etc.) - ✅
- Include in the file a list of desired improvements to your solution which you would do with more time and resources. - ✅
  
  > **_NOTE:_** Pointed out in Further improvements: section

- Imagine this as a production-level product at scale - ✅
- Structure! With great structure, comes great reusability! - ✅
  
    > **_NOTE:_** I've kept this in my mind, so I introduced some wrappers, facades and sepearated layers :)
- Have fun!
    > **_NOTE:_** I've had!! :D It was very interesting to setup an app from the scratch. I didn't do this for a while :)
