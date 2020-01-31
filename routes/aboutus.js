var express = require('express');
var router = express.Router();
var handler = require('../public/utils/handler');
var fs = require('../public/utils/myfs')

router.get('/', (req, res, next) => {
    var msg = {};
    handler.getBlogCount().then(count => {
        msg.blogcount = count;
        return fs.readFile('./AboutUs.md')
    }).then(data => {
        msg.content = data;
        res.send(msg);
    })
})

module.exports = router;