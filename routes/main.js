var express = require('express');
var router = express.Router();
var handler = require('../public/utils/handler');

router.get('/', (req, res, next) => {
    var msg = {};
    handler.getAllOverviewsInfo().then(overviews => {
        msg.overviews = overviews;
        return handler.getBlogCount();
    }).then(count => {
        console.log(count)
        msg.blogcount = count;
        console.log(msg)
        res.send(msg);
    })
})

module.exports = router;