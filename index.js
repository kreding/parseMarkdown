var express = require('express');
var router = express.Router();
var fs = require('fs');
var marked = require('marked');
var app = express();

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: true,
    sanitize: true,
    smartLists: true,
    smartypants: true
});

var css = "<style type='text/css'>body{padding:20px 20%}p,li{font-size:18px;line-height:1.5}img{width:100%}</style>";

/* GET markdown page. */
router.get('/', function(req, res, next) {
    var filePath = req.query['filePath'],
        fileName = (req.query['fileName'] || 'markdown document').replace('/', ''),
        isOrgin = req.query['type'] && req.query['type'] == 'orgin';
    if (!filePath) {
        throw new Error('require file path.');
    }
    fs.readFile(filePath, function(err, data) {
        if (err) {
            throw new Error('need not exist.');
        } else {
            marked(data.toString(), function(err, content) {
                if (err || isOrgin)
                    content = data;
               // res.send(content + css);
                res.render('markdown', {
                    content: content,
                    title: "The way to go"
                });

            });
        }
    });
});
app.use('/markdown', router);
app.set('view engine', 'ejs');
app.listen(3002, function() {
    console.log('server on port: 3002')
});
