const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const port = 2000

//need fs
const fs = require('fs');

//set a root object to feed into express

var rootObj = {root: _dirname + '/public'};

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(_dirname, '/public')));

app.get('/', (req, res) => res.sendFile('/public/assets/index.html', rootObj));

app.get('/notes', (req, res) => res.sendFile('/public/assets/notes.html', rootObj));

app.get('/api/notes', (req, res) => {
    console.log('api.notesget')
    let json = getJson();
    console.log(json);
    res.json(json);
})