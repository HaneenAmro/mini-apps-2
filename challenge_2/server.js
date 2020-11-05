

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './client/dist')));


app.get("/currency", (req, res) => {

    res.status(200).send("Helllo")
})


app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`)
})