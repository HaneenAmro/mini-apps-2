

const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './client/dist')));

//get the currency
app.get("/currency", (req, res) => {
    axios.get(
        //the end point for bpi
        `https://api.coindesk.com/v1/bpi/historical/close.json?start=2020-01-01&end=2020-10-10`
    )
        .then(response => {
            res.status(200).send(response.data)
        })
        .catch(err => console.log(err));
});


app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`)
})