const router = require("express").Router();
const fetch = require("node-fetch")

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


        let userInfo = {
            accessToken: data.access_token,
            userId: data.user_id
        }
        console.log("ACCCCCESSSSS TOKENNNNNN",userInfo)
        getUser(userInfo)
    } catch (err){

        console.log("ERROR HAPPENS HERE", err);
        res.status(500).json(err.response.data)
    }
})

async function getUser(userInfo){
    console.log("HIT GET USER WITH TOKEN", userInfo)

    try{
    const response = await fetch(`https://graph.instagram.com/v12.0/${userinfo.user_id}?fields=id,username&access_token=${userInfo.accessToken}`)
    const data = await response.json();
    console.log("USERR", data)

    } catch (err){
        console.log("ERROR IN GET USERRRRRR", err)
        
    }
}


module.exports = router;