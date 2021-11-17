let igUsernameInput = document.getElementById("username");
const authIgBtn = document.getElementById("authBtn");
const getPhotoBtn = document.getElementById("photoBtn")
const igFeedDiv = document.getElementById("instagramFeed")
const notification = document.getElementById("notification")



let splitQuery;

function getURL() {
    let query = window.location.search;
    splitQuery = query.split("=")[1];
    console.log(splitQuery)
}
getURL();

authIgBtn.addEventListener("click", function () {
    //let username = igUsernameInput.value.trim();
    authIg()
    console.log("clicked")

})

getPhotoBtn.addEventListener("click", function () {
    //let username = igUsernameInput.value.trim();
    getPhotos();

})

authIg = () => {
    let appId = "215321604061729";
    // let redUri = window.location.origin + "/igApp";
    let redUri = "https://stark-chamber-84959.herokuapp.com/"
    let url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redUri}&scope=user_profile,user_media&response_type=code`;
    window.open(url, "_self").focus();
}

//handling to fire off postAuthCode or not
if(!splitQuery){
    console.log("no splitquery")
} else if(splitQuery === "undefined"){
    console.log("splitquery undefined")
}
else {
    notification.removeAttribute("class")

    setTimeout(function () {
        notification.setAttribute("class", "hide");
    }, 3000);
    console.log("splitquery")
    postAuthCode(splitQuery)
}

function postAuthCode(query){

    const searchParams = `redirect_uri=https://stark-chamber-84959.herokuapp.com/&code=${query}`

    fetch("/api/insta", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: searchParams,
    })
};

getPhotos = () => {

    fetch("/api/insta")
        .then(response => response.json())
        .then(data => {
            console.log("DATA FROM /API/INSTA", data)






            // for (var i = 0; i < data[0].length; i++) {

            //     let card = document.createElement("div")
            //     card.setAttribute("class", "card")
            //     let cardBody = document.createElement("div")
            //     cardBody.setAttribute("class", "card-body")

            //     let imageTag = document.createElement("img");
            //     imageTag.setAttribute("src", data[0][i])
            //     imageTag.setAttribute("width", "50%")
            //     imageTag.setAttribute("class", "igIMG")


            //     cardBody.append(imageTag)
            //     card.append(cardBody)
            //     igFeedDiv.append(card)
            // }


        })


}
