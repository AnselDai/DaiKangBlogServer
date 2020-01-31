var express = require('express');
var router = express.Router();
var handler = require('../public/utils/handler');

router.get('/', (req, res, next) => {
    var msg = {};
    handler.getBlogCount().then(count => {
        res.send({
            blogcount: count
        })
    })
})

module.exports = router;