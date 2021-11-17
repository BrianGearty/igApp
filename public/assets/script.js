let igUsernameInput = document.getElementById("username");
const authIgBtn = document.getElementById("authBtn");
const getPhotoBtn = document.getElementById("photoBtn")
const igFeedDiv = document.getElementById("instagramFeed")
const notification = document.getElementById("notification")

let photos = []
let videos = []
let carousel = []

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
if (!splitQuery) {
    console.log("no splitquery")
} else if (splitQuery === "undefined") {
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

function postAuthCode(query) {

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
            console.log("CAROUSEL FROM /API/INSTA", data[0].data[i])

            for (var i = 0; i < data[0].data.length; i++) {

                let card = document.createElement("div")
                card.setAttribute("class", "card")
                let cardBody = document.createElement("div")
                cardBody.setAttribute("class", "card-body")

                let instaStuff = data[0].data[i];
                console.log("iNSTA STUFF", instaStuff)

                if (instaStuff.media_type === "IMAGE") {

                    let imageTag = document.createElement("img");
                    imageTag.setAttribute("src", instaStuff.media_url)
                    imageTag.setAttribute("width", "50%")
                    imageTag.setAttribute("class", "igIMG card-img-top")

                    let imageCaption = document.createElement("h4")
                    imageCaption.setAttribute("class", "card-text")
                    imageCaption.textContent = instaStuff.caption

                    card.append(imageTag)
                    cardBody.append(imageCaption)
                    card.append(cardBody)


                } else if (instaStuff.media_type === "CAROUSEL_ALBUM") {

                    let carousel = document.createElement("div")
                    carousel.setAttribute("class", "carousel slide")
                    carousel.setAttribute("data-ride", "carousel")

                    let carouselInner = document.createElement("div")
                    carouselInner.setAttribute("class", "carousel-inner")

                    let carouselItem = document.createElement("div")
                    carouselItem.setAttribute("class", "carousel-item")

                    let carouselImg = document.createElement("img")
                    carouselImg.setAttribute("class", "d-block w-100")
                    carouselImg.setAttribute("src", instaStuff.media_url)

                    carousel.append(carouselInner)

                    carouselInner.append(carouselItem)

                    carouselItem.append(carouselImg)




                } else {

                }

                igFeedDiv.append(card)

                // instaPhotos = data.data.filter(d => d.media_type === "IMAGE").map(d => d.media_url, d.caption);
                // photos.push(instaPhotos)

                // instaCarousel = data.data.filter(d => d.media_type === "CAROUSEL_ALBUM").map(d => d.media_url, d.caption);
                // carousel.push(instaCarousel)
                // instaVid = data.data.filter(d => d.media_type === "VIDEO").map(d => d.media_url, d.caption);
                // videos.push(instaVid)




            }

        })


}
