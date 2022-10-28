const express = require('express');
const app = express();

app.set('view engine', 'ejs');

require("./routing/index")(app);

app.use(express.static('static'));
app.listen(3000, function () {
    console.log('OK :3000');
});