const router = require("express").Router();
const fetch = require("node-fetch")

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
    const response = await fetch(`https://graph.instagram.com/v12.0/${userInfo.userId}/?access_token=${userInfo.accessToken}`)
    const data = await response.json();
    console.log("MEDIA FROM USER", data)

    // let user = {
    //     id: data.id,
    //     username: data.username,
    //     accessToken: userInfo.accessToken,
    // }

    console.log("GETTING USERRRRRR", user)
    getMedia(user)
    
    } catch (err){
        console.log("ERROR IN GET USERRRRRR", err)
        
    }
}

async function getMedia(user){

    try{
        const response = await fetch(`https://graph.instagram.com/${user.media[1]}?fields=id,username,media_type&access_token=${user.accessToken}`)
        const data = await response.json();
        console.log("MEDIAAAAAA", JSON.stringify(data))
    
    
    
    
        
        } catch (err){
            console.log("ERROR IN GET MEDIAAAAA", err)
            
        }

}


module.exports = router;