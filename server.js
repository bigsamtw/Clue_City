const express = require('express');
const app = express();
const port = 10048;

app.use(express.static(__dirname + '/public'));
app.listen(port);
console.log(`Express server is now listening on IP : http://luffy.ee.ncku.edu.tw:${port}`)

