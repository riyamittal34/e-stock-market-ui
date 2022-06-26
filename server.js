const express = require('express');
const path = require('path')
const port = 4200;
const app = express();

app.use(express.static('e-stock-market-ui'))

app.get('/', (req, res) => {
    res.sendFile('index.html',{root:__dirname + "/e-stock-market-ui"})
});


app.listen(port, () => {
    console.log("Server is listening on port "+port);
});