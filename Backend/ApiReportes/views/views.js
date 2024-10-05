const axios = require("axios");
const views = {};
const config = require("../config.json");
const general = require("../reportes/General")
require('dotenv').config();

const apiKeyConsultas = process.env.API_KEY_CONSULTAS


console.log(apiKeyConsultas);

views.Reportes = async (req, res) => {

    console.log("entre");
    
    axios.post(config.urlApiConsulta, req.body, {
        headers: {
            Authorization: `Api-Key ${apiKeyConsultas}`
        }
    })
        .then((result) => {

            general.LibroRadicador(req, res, result.data);
        }).catch((err) => {
            res.send(err)
        });

}
module.exports = views;