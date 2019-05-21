/*
 * Copyright (C) 2017 Jason Henderson
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

// Another example of logging out within the child process
var log = require('electron-log');
log.transports.console.level = 'info';
log.transports.file.level = 'info';

var express = require('express');
var router = express.Router();

function openFolder(path) {

    var shell = require('shelljs');
    
    if (process.platform === 'win32') {
        shell.exec("start " + path);
    } else {
        shell.exec("open " + path);
    }

};

/* GET home page. */
router.get('/', function (req, res, next) {
    log.info('serving home page...');
    res.render('index', { title: 'Express' });

    let path = req.query.path
    path = path.replace(/__/g, "%20");
    path = "file:///" + path;

    openFolder(path);

});

module.exports = router;
