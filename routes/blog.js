var express = require('express');
var router = express.Router();
var fs = require('../public/utils/myfs');
var handler = require('../public/utils/handler');

router.post('/', (req, res, next) => {
    console.log(req.body.id);
    // res.send('blog post');
    let id = req.body.id;
    // get overviews
    handler.extractMarkdownFileById(id).then(data => {
        console.log(data.overview);
        res.send(data)
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;