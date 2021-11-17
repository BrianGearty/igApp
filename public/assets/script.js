let igUsernameInput = document.getElementById("username");
const authIgBtn = document.getElementById("authBtn");
const igConnectBtn = document.getElementById("connectBtn")
const getPhotoBtn = document.getElementById("photoBtn")
const igFeedDiv = document.getElementById("instagramFeed")

let splitQuery;

function getURL() {
    let query = window.location.search;
    splitQuery = query.split("=")[1];
    console.log(splitQuery)
}
getURL();

igConnectBtn.addEventListener("click", function () {
    //let username = igUsernameInput.value.trim();
    other(splitQuery)

})

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

other = (query) => {

    const searchParams =`redirect_uri=https://stark-chamber-84959.herokuapp.com/&code=${query}`

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
    .then(data =>{
        console.log("DATA FROM /API/INSTA", data)

        for(var i = 0; i < data.length; i++){

        let imageTag = document.createElement("img");
        imageTag.setAttribute("src", data[i])
        imageTag.setAttribute("width", "50%")

        igFeedDiv.append(imageTag)
        }


    })


}
