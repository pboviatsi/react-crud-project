var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var app = express();
var port = process.env.port || 3000;

var indexRouter = require('./routes/productsRoutes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ορισμός static φακέλου
app.use(express.static(path.join(__dirname,'views')));

app.use(express.json());

// routes των προϊόντων
app.use('/products', indexRouter);

// 404 και error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});
