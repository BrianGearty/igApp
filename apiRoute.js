const router = require("express").Router();
const request = require('request');

router.post('/api/insta', async (req, res) => {


    let accessToken = null;
    try {
        console.log("WE BE GETTING PLACES")

        // send form based request to Instagram API
        // const result = await request.post({
        //     url: 'https://api.instagram.com/oauth/access_token',
        //     form: {
        //         client_id: process.env.CLIENT_ID,
        //         client_secret: process.env.CLIENT_SECRET,
        //         grant_type: 'authorization_code',
        //         redirect_uri: req.body.redirect_uri,
        //         code: req.body.code
        //     }

        // });

        // console.log("RESPONSE FROM INSTAGRAM RESULT", result)
        // accessToken = JSON.parse(result).access_token;
        // //res.send(accessToken)

    } catch (e) {
        // console.log("ERROR HAPPENS HERE", e);
        // res.status(500).json(e.response.data)
        console.log(e)
    }
})


module.exports = router;