const express = require("express");
const app = express();
const router = require('./routes')
const firebase = require('firebase');
require("firebase/firestore");

app.use('/api', router);

app.listen(3300, () => {
    console.log('server listening on port 3300')
})