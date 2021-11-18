//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const homeStartingContent = 'Isi Buku mu semenarik mungkin disini.';
const aboutContent =
  'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.';
const contactContent =
  'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.';

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

let posts = [];

app.get('/', function (req, res) {
  res.render('home', {
    firstParagraph: homeStartingContent,
    post: posts,
  });
});

app.get('/about', function (req, res) {
  res.render('about', {
    secondAbout: aboutContent,
  });
});
app.get('/contact', function (req, res) {
  res.render('contact', {
    thirdContact: contactContent,
  });
});

app.get('/compose', function (req, res) {
  res.render('compose');
});

app.post('/compose', function (req, res) {
  const input = { title: req.body.compose, content: req.body.postbody, penerbit: req.body.penerbit, penulis: req.body.penulis, gambar: req.body.gambar };

  posts.push(input);
  res.redirect('/');
});

app.get('/posts/:postid', function (req, res) {
  const requested = _.lowerCase(req.params.postid);
  posts.forEach(function (post) {
    const postss = _.lowerCase(post.title);
    console.log(post);
    if (requested === postss) {
      res.render('post', {
        titles: post.title,
        contents: post.content,
        penulis: post.penulis,
        penerbit: post.penerbit,
        gambar: post.gambar,
      });
    } else {
      ('Nothing Here !');
    }
  });
});
app.listen(3000, function () {
  console.log('Server started on port 3000');
});
