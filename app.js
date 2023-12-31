var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var http = require("http");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var yleRouter = require("./routes/getYleArticles");
var materialRouter = require("./routes/materialData");
var summaryRouter = require("./routes/writeSummary");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/yle", yleRouter);
app.use("/materials", materialRouter);
app.use("/summary", summaryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.send("error"); //this or res.status(err.status || 500).send('error')
});

module.exports = app;
