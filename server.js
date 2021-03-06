var express = require("express");
const db = require("./models");
const session = require("express-session");
require("dotenv").config();

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 2 },
  })
);

// Static directory
app.use(express.static("public"));
/////////////////////////////////
const handlebars = require("express-handlebars");
// const helper = handlebars.create({});

// helper.handlebars.registerHelper("isdefined", function (value) {
//   return value !== undefined;
// });

//Sets our app to use the handlebars engine
app.set("view engine", "handlebars");
//Sets handlebars configurations (we will go through them later on)
app.engine(
  "handlebars",
  handlebars({ layoutsDir: __dirname + "/views/layouts" })
);
// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/business_api_routes.js")(app);
require("./routes/comment_api_routes.js")(app);
require("./routes/customer_api_route.js")(app);
require("./routes/review_api_route.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================

// Change force: to true if it's cool for the site to remove database items.
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
  });
});
