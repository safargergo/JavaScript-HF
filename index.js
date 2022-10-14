const express = require('express');
const app = express();


require("./routing/index")(app);

app.use(express.static('static'));
app.listen(3000, function () {
    console.log('OK :3000');
});