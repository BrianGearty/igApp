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
                // let cardBody = document.createElement("div")
                // cardBody.setAttribute("class", "card-body")

                let instaStuff = data[0].data[i];
                console.log("iNSTA STUFF", instaStuff)

                if (instaStuff.media_type === "IMAGE") {

                    // let imageTag = document.createElement("img");
                    // imageTag.setAttribute("src", instaStuff.media_url)
                    // imageTag.setAttribute("width", "50%")
                    // imageTag.setAttribute("class", "igIMG card-img-top")

                    // let imageCaption = document.createElement("h4")
                    // imageCaption.setAttribute("class", "card-text")
                    // imageCaption.textContent = instaStuff.caption

                    // card.append(imageTag)
                    // cardBody.append(imageCaption)
                    // card.append(cardBody)

                    //"https://scontent-iad3-2.cdninstagram.com/v/t51.2885-15/39209780_441483436343962_1747052392316141568_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=qW8U_7BBLEsAX91h7sY&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=0eff034ec24a204299eda96feb5bf4dd&oe=619A0A4D"
                    //"https://scontent-iad3-2.cdninstagram.com/v/t51.2885-15/39926281_2134387383513684_1025651470323679232_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=YXcS5lKub7oAX9PifaM&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=894a1feeea4720d9185c9a4909963150&oe=6199CE09"

                } else if (instaStuff.media_type === 'CAROUSEL_ALBUM') {
                    let carouselItem = document.createElement("div")
                    carouselItem.setAttribute("class", "carousel-item")

                    let carouselImg = document.createElement("img")
                    // console.log("INSTA STUFF.CHILDREN.DATA",instaStuff.children.data.length)

                    instaStuff.children.forEach(function(img, i){
                        console.log("CHILDREN DATA", img)
                        console.log(i)

                        // carouselImg.setAttribute("class", "d-block w-100")
                        // carouselImg.setAttribute("src", img[i].media_url)

                        
                        // carouselItem.append(carouselImg)

                        // console.log("CAROUSEL Item", carouselItem)
                    })
                    

                    let carousel = document.createElement("div")
                    carousel.setAttribute("class", "carousel slide")
                    carousel.setAttribute("data-ride", "carousel")

                    let carouselInner = document.createElement("div")
                    carouselInner.setAttribute("class", "carousel-inner")



                    // carouselInner.append(carouselItem)
                    // carousel.append(carouselInner)

                    console.log(carousel)
                } else {

                }


                card.append(carousel)
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
