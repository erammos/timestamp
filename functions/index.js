
const functions = require('firebase-functions');
const express = require('express');
const app = express();
const logRequestStart = (req, res, next) => {
    console.info(`${req.method} ${req.originalUrl}`) 
    res.on('finish', () => {
        console.info(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
    })
    next()
}
app.use(logRequestStart)
app.get('/api/timestamp/:date_string',(req,res)=> {
    let value = req.params['date_string'];
    var date = new Date(isNaN(value)? value : parseInt(value));
    res.json({unix: date.valueOf(),utc: date.toUTCString()});
});
app.get('/api/timestamp/',(req,res)=> {s
    res.json({unix: Date.now(),utc:Date()});
});
exports.app = functions.https.onRequest(app);
