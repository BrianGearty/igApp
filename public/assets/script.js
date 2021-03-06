let igUsernameInput = document.getElementById("username");
const authIgBtn = document.getElementById("authBtn");
const cleartokenBtn = document.getElementById("clearTokenBtn")
const igFeedDiv = document.getElementById("instagramFeed")
const notification = document.getElementById("notification")
const usernameEl = document.getElementById("username")

let photos = []
let videos = []
let carousel = []

let splitQuery;

getURL = () => {
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

cleartokenBtn.addEventListener("click", function () {
    window.location.href = "https://stark-chamber-84959.herokuapp.com/"
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

            usernameEl.append(data[0].data[0].username)

            for (var i = 0; i < data[0].data.length; i++) {

                let card = document.createElement("div")
                card.setAttribute("class", "card")
                let cardBody = document.createElement("div")
                cardBody.setAttribute("class", "card-body")

                let instaStuff = data[0].data[i];
                //console.log("iNSTA STUFF", instaStuff)

                if (instaStuff.media_type === "IMAGE") {

                    let imageTag = document.createElement("img");
                    imageTag.setAttribute("src", instaStuff.media_url)
                    imageTag.setAttribute("width", "50%")
                    imageTag.setAttribute("class", "igIMG card-img-top")

                    let imageCaption = document.createElement("h5")
                    imageCaption.setAttribute("class", "card-text caption")
                    imageCaption.textContent = instaStuff.caption

                    card.append(imageTag)
                    cardBody.append(imageCaption)
                    card.append(cardBody)


                } else if (instaStuff.media_type === 'CAROUSEL_ALBUM') {

                    console.log(instaStuff.children.data[0])
                    // let carouselItem = document.createElement("div")
                    // carouselItem.setAttribute("class", "carousel-item")

                    // let carouselImg = document.createElement("img")
                    // console.log("INSTA STUFF.CHILDREN.DATA",instaStuff.children.data.length)

                    // instaStuff.children.data.forEach(function(img, i){
                    //     console.log("CHILDREN DATA", img)
                    //     console.log("img index", i)


                    //     carouselImg.setAttribute("class", "d-block w-100 card-image-top")
                    //     carouselImg.setAttribute("src", img.media_url)
                    //     carouselImg.setAttribute("alt", "carousel picture")


                    //     carouselItem.append(carouselImg)

                    //console.log("CAROUSEL Item", carouselItem)
                    // })


                    // let carousel = document.createElement("div")
                    // carousel.setAttribute("class", "carousel slide")
                    // carousel.setAttribute("data-ride", "carousel")
                    // carousel.setAttribute("id", "carouselControls")

                    // let carouselInner = document.createElement("div")
                    // carouselInner.setAttribute("class", "carousel-inner")

                    // let prevTag = document.createElement("a")
                    // let nextTag = document.createElement("a")
                    // prevTag.setAttribute("class", "carousel-control-prev")
                    // prevTag.setAttribute("href", "#carouselControls")
                    // prevTag.setAttribute("role", "button")
                    // prevTag.setAttribute("data-slide", "prev")
                    // nextTag.setAttribute("class", "carousel-control-next")
                    // nextTag.setAttribute("href", "#carouselControls")
                    // nextTag.setAttribute("role", "button")
                    // nextTag.setAttribute("data-slide", "next")

                    // let prevSpan = document.createElement("span")
                    // let nextSpan = document.createElement("span")
                    // prevSpan.setAttribute("class", "carousel-control-prev-icon")
                    // prevSpan.setAttribute("aria-hidden", "false")
                    // nextSpan.setAttribute("class", "carousel-control-next-icon")
                    // nextSpan.setAttribute("aria-hidden", "false")

                    // prevTag.append(prevSpan)
                    // nextTag.append(nextSpan)

                    // carouselInner.append(carouselItem)
                    // carousel.append(carouselInner, prevTag, nextTag)
                    // console.log(carousel)
                } else if (instaStuff.media_type === 'VIDEO') {

                    let video = document.createElement("video" )
                    video.setAttribute("width", "50%")
                    video.setAttribute("class", "igIMG")
                    video.setAttribute("controls", "play pause")

                    let vidCaption = document.createElement("h5")
                    vidCaption.setAttribute("class", "card-text caption")
                    vidCaption.textContent = instaStuff.caption
                    

                    let source = document.createElement("source")
                    source.setAttribute("src", instaStuff.media_url)
                    source.setAttribute("type", "video/mp4")

                    cardBody.append(vidCaption)
                    video.append(source)
                    card.append(video, cardBody)
                }

                
                //card.append(cardBody)
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

setTimeout(() => {
    getPhotos();
}, 2000)
