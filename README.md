# Travel Logging Application

Double click anywhere on the map to create a log entry. There will be a pin appearing for the new entries. Click pins to display log detail for that location. Simple but fun.

LIVE LINK : https://korhan-travel-log.herokuapp.com/

## Details

Backend : Express, MongoDB,
FrontEnd: React, react-map-gl, reach-hook-form (for form input object handling)

## Notes for Deployment to Heroku in case of separate Front End and Backend

### Steps to follow are given below

1.  Make sure you use either cors package from npm or handle headers for cross origin resource sharing, otherwise you will receive errors.
2.  Make sure you created environment variables with REACT_APP prefix and all capital case.
3.  Favicon will probably give an error. You may need to use a package to handle favicon use. I used express-favicon for the purpose with this code.
    `app.use(favicon(path.join(__dirname, "/client/build/favicon.ico")));`
4.  For production build, we need to add static files to our server.js file with the following code snippet:

```
if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/ping", (req, res) => {
  res.send("pong");
});
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
}
```

5.  package.json file of the root directory should have correct scripts to run either prior or post deploy to heroku. These are

```
 "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "heroku-prebuild": "NPM_CONFIG_PRODUCTION=false INLINE_RUNTIME_CHUNK=false npm install --prefix client && npm run build --prefix client",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false INLINE_RUNTIME_CHUNK=false npm install --prefix client && npm run build --prefix client",
    "lint": "eslint",
    "exit": "taskkill /IM node.exe -F"
  },
```

6. Check your routings well, and update them with the actual URL obtained from Heroku.

```
const API_URL =
process.env.NODE_ENV === "production"
  ? "https://korhan-travel-log.herokuapp.com"
  : "http://localhost:1337";
```

7. Create a Procfile with the following code inside

```
web: node server.js
```

8.  Don't forget to add your environment variables in heroku settings, otherwise you app will fail. And ofcourse, don't forget to add .env file to .gitignore...
