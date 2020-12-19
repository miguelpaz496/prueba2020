var Request = require("request");




exports.newLyrics = (req, res) => {

    console.log(req.body)

    let {lyrics} = req.body;

    Request.post({
        "headers": { "content-type": "application/json", 
                    "Authorization": "Bearer a_ItVQVpy8n2JpN7SO382k7W0vMPV3O27WE9QQ0PXkAAAPDX9HEHRS5VJmcPuOPGzZoH2U0PglLUVbv2W0" 
                    },
        "url": "https://api-b2b.backenster.com/b1/api/v3/translate",
        "body": JSON.stringify({
            "from": "en_GB",
            "to": "es_CO",
            "data": lyrics,
            "platform": "api"
            })
    }, (error, response, body) => {
        if(error) {
            return console.log(error);
        }

        let {targetTransliteration} = JSON.parse(body);

        console.log(JSON.parse(body));
        console.log(targetTransliteration)

        res.status(200).send({targetTransliteration});

    });

};