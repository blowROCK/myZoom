import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + "/public"))

app.get('/', (req, res) => res.render('home'))
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => {
  console.log('listen http://localhost:2201');
};

app.listen(2201, handleListen);