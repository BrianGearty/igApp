const router = require("express").Router();
const request = require('request');

let code;
let redirect_uri;

console.log("code outside")

// let form = {
//     client_id: process.env.CLIENT_ID,
//     client_secret: process.env.CLIENT_SECRET,
//     grant_type: 'authorization_code',
//     redirect_uri: req.body.redirect_uri,
//     code: req.body.code
// }

router.post('/api/insta', async (req, res) => {
        
    let accessToken = null;
    
        console.log("WE BE GETTING PLACES")
    try{
        //send form based request to Instagram API
        const result = await request.post({
            url: 'https://api.instagram.com/oauth/access_token',
            form: {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: req.body.redirect_uri,
                code: req.body.code
            }

        });

        console.log("RESPONSE FROM INSTAGRAM RESULT", result)
        res.json(result)
        //res.send(accessToken)
    } catch (err){

        console.log("ERROR HAPPENS HERE", err);
        res.status(500).json(err.response.data)
    }
})


module.exports = router;