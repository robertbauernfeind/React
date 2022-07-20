const { default: axios } = require("axios");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to CORS server");
});
app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" });
});
app.get("/data", (req, res) => {
    // source: https://softauthor.com/how-to-fix-cors-issue-permanently-right-now/
    res.set('Access-Control-Allow-Origin', '*');
    axios.get("http://currencies.apps.grandtrunk.net/currencies")
        .then((response) => {
            var currencies = response.data.split("\n");
            res.send(currencies)
            console.log(currencies);
         })
         .catch((error) => console.log(error));
})
app.listen(8080, () => {
    console.log("listening on port 8080");
});