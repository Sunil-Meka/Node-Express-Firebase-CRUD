const functions = require('firebase-functions')

const express = require("express");

const app = express();

app.use(express.json());

app.use('/auth',require('./services/user/controller'))

exports.app = functions.https.onRequest(app)