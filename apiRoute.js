const router = require("express").Router();
const fetch = require('node-fetch')

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
        

    let form = `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=${req.body.redirect_uri}&code=${req.body.code}`
    
        console.log("WE BE GETTING PLACES")
    try{
        //send form based request to Instagram API
        const response = await fetch('https://api.instagram.com/oauth/access_token' ,{
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: form,
        })
        const data = await response.json();


        console.log(data)
        
    } catch (err){

        console.log("ERROR HAPPENS HERE", err);
        res.status(500).json(err.response.data)
    }
})


module.exports = router;