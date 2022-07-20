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
            res.send(currencies);
            console.log("Requested data");
         })
         .catch((error) => console.log(error));
});

app.get("/conversionRate", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');


    const url = new URL(req.protocol + "://" + req.get("host") + req.originalUrl);
    const params = url.searchParams;

    const fromCurr = params.get("fromCurr");
    const toCurr = params.get("toCurr");

    if(fromCurr != null && toCurr != null) {
        const url = "http://currencies.apps.grandtrunk.net/getlatest/" + fromCurr + "/" + toCurr;

        axios.get(url)
        .then((response) => {
            var rate = response.data;
            res.send({rate});
            console.log("Requested conversion-rate");
         })
         .catch((error) => console.log(error));

    }
});

app.listen(8080, () => {
    console.log("listening on port 8080");
});