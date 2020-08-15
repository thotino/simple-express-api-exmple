const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const { startDatabase } = require("./database/mongo");
const { insertAd, getAds, updateAd, deleteAd } = require("./database/ads");

const app = express();
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://<AUTH0_DOMAIN>/.well-known/jwks.json"
    }),
    audience: "<API_IDENTIFIER>",
    issuer: "https://<AUTH0_DOMAIN>/",
    algorithms: ["RS256"]
});

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));
// app.use(checkJwt);

app.post("/", (req, res) => {
    insertAd(req.body).then((insertedResult) => {
        // res.send({ message : "New ad inserted" });
        res.json(insertedResult);
    });
});

app.get("/", (req, res) => {
    getAds().then((ads) => { 
        result = ads;
        res.send(ads);
    });
});

app.put("/:id", (req, res) => {
    updateAd(req.params.id, req.body).then(() => {
        res.send({ message : "Ad updated" });
    });
});

app.delete("/:id", (req, res) => {
    deleteAd(req.params.id).then(() => {
        res.send({ message : "Ad removed" });
    });
});

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = {server,}
