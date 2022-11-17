const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: "secret"
}))


require("./routing/index")(app);

app.use(express.static('static'));

app.use((err, req, res, next) => {
    res.end("problem!!!");
    console.log(err);
});

app.listen(3000, function () {
    console.log('OK :3000');
});


