const router = require("express").Router();
const request = require('request');

router.post("/api/insta", async (req, res) => {
    //let code = req.body.code;
    //let redirectUri = req.body.redirectUri;
    console.log("HIT /API/INSTAAAAAAAAAAAA", req.body.code)

    //console.log("HIT /API/INSTAAAAAAAAAAAA", res )

    let accessToken = null;
    try {

        // send form based request to Instagram API
        const result = await request.post({
            url: 'https://api.instagram.com/oauth/access_token',
            form: {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: req.body.redirectUri,
                code: req.body.code
            }
        });

        res.send(result.access_token)
        accessToken = result.access_token;
        try{
            let resp = await fetch(`https://graph.instagram.com/${process.env.CLIENT_ID}/media?access_token=${accessToken}`)
            res.status(200).json(resp);
            console.log("HIT THE GET FOR GRAPH", resp)

        } catch (err){
            res.status(500).json(err)
        }

    } catch (e) {
        console.log("ERROR HAPPENS HERE", e);
        res.status(500).json(e)
    }
})

router.get("/api/insta", async (req, res)=>{
    console.log("/API/GETTTTTTTTTTTTTTT",res)
    try{

    

    } catch (err){

    }
})

module.exports = router;