const router = require("express").Router();
const fetch = require("node-fetch")


router.post('/api/insta', async (req, res) => {

    let form = `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=${req.body.redirect_uri}&code=${req.body.code}`
    
    try{
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
    const response = await fetch(`https://graph.instagram.com/v12.0/${userInfo.userId}?fields=id,username&access_token=${userInfo.accessToken}`)
    const data = await response.json();
    console.log("MEDIA FROM USER", JSON.stringify(data.media.data))

    let user = {
        id: data.id,
        username: data.username,
        accessToken: userInfo.accessToken,
    }

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