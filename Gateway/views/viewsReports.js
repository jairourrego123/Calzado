const axios = require('axios');
const config = require('../config.json');
const errores = require('../errors');
const views = {}

views.reportHandler = (serviceUrl) => async (req, res) => {
    try {
        console.log("Generando reporte...");
        
        const user  = await axios.get(config.services.gestionDeUsuarios + '/profile', {
            headers: { Authorization: req.headers.authorization }
        });
        req.body.tenant = user.data.tenant;
        const url = `${serviceUrl}${req.url}`;
        const apiKey = req.headers['x-api-key']; 
        const response = await axios({  
            method: req.method,
            url: url,
            data: req.body, 
            headers: {
                'x-api-key': apiKey, 
            },
            responseType: 'arraybuffer', 
        });
        if (response.headers['content-type']) {
            res.setHeader('Content-Type', response.headers['content-type']);
        }
        if (response.headers['content-disposition']) {
            res.setHeader('Content-Disposition', response.headers['content-disposition']);
        }
        res.status(response.status).send(Buffer.from(response.data));
    }
    catch (error) {
        errores(error)
        res.sendStatus(error.response ? error.response.status : 400);
    }
};


module.exports= views;