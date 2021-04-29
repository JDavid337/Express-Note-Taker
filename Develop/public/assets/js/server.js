const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const notes = require('./db/db.json');
const path = require('path');
const uuid = require('uuid');
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
    console.log('/api/notespost')
    let json = getJson();
    console.log(json);
    res.json(json);
})

app.post('/api/notes', (req, res) => {
    console.log('/api/notespost')
    //let json = getJson();
    console.log(req.body);
    addNoteToJSON(req.body)
    res.json(getJson());
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

function getJson() {
    let data = fs.readFileSync(_dirname + '/db/db.json');
    let json = JSON.parse(data);
    return json;
}

function createNoteObject(data) {
    let obj = {title: data.title,
                text: data.text,
                complete: false,
                hidden: false}
        return obj
}

function addNoteToJSON(note) {
    let json = getJson();
    let newNote = createNoteObject(note);
    json.push(newNote);
    saveJSON(json);
}

function saveJSON(jsonData) {
    let data = JSON.stringify(jsonData);
    fs.writeFileSync(_dirname + 'db/db.json', data);
}