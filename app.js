var express = require('express'),
    app = express(),
    multer = require('multer');
var fs = require('fs');

var imgs = ['png', 'jpg', 'jpeg', 'gif', 'bmp']; // only make thumbnail for these

function getExtension(fn) {
    return fn.split('.').pop();
}

function fnAppend(fn, insert) {
    var arr = fn.split('.');
    var ext = arr.pop();
    insert = (insert !== undefined) ? insert : new Date().getTime();
    return arr + '.' + insert + '.' + ext;
}


app.use(multer({
    dest: './static/uploads/',
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase();
    }
}));
app.use(express.static(__dirname + '/static'));


app.post('/api/upload', function (req, res) {
    res.send({image: false, file: req.files.userFile.originalname, savedAs: req.files.userFile.name});
});
app.get('/api/filenames', function (req, res) { // this is the RESTful API that will send json reply to browser with filenames list
    var fnames = fs.readdir('./static/uploads', function (err, files) {
        res.send(JSON.stringify(files));
    });
});

var server = app.listen(8081, function () {
    console.log('listening on port %d', server.address().port);
});
