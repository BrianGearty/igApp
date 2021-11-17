const router = require("express").Router();
const fetch = require("node-fetch")

let instaPhotos;

// getting auth code from front end
router.post('/api/insta', async (req, res) => {
    // passing our auth code and putting it in x-ww-form-urlencoded format
    let form = `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=${req.body.redirect_uri}&code=${req.body.code}`
    // node-fetch hitting instagrams access token end point to exchange our auth code for access token
    try{
        const response = await fetch('https://api.instagram.com/oauth/access_token' ,{
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: form,
        })
        // response from instagram
        const data = await response.json();

        console.log("DATA FROM ACCESS EXCHANGE", data)
        // parase data into object
        let userInfo = {
            accessToken: data.access_token,
            userId: data.user_id
        }
        console.log("ACCCCCESSSSS TOKENNNNNN",userInfo)
        // pass parsed data into getUser function
        getUser(userInfo)
    } catch (err){

        console.log("ERROR HAPPENS HERE", err);
        res.status(500).json(err.response.data)
    }
})

// here we call instagrams end point to get user info
async function getUser(userInfo){
    console.log("HIT GET USER WITH TOKEN", userInfo)


    try{
    const response = await fetch(`https://graph.instagram.com/me/media?fields=media_type,permalink,media_url&access_token=${userInfo.accessToken}`)
    const data = await response.json();
    //console.log("MEDIA FROM USER", data.data[1].id)
        console.log("MEDIAAAA", data)

        instaPhotos = data.data.filter(d => d.media_type === "IMAGE").map(d => d.media_url);

        console.log("INSTA PHOTOS", instaPhotos)

    } catch (err){
        console.log("ERROR IN GET USERRRRRR", err)
        
    }
}

console.log("INSTA PHOTOS OUTSIDE", instaPhotos)




module.exports = router;