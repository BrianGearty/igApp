// https://api.instagram.com/oauth/authorize
//   ?client_id=215321604061729
//   &redirect_uri=https://briangearty.github.io/igApp/
//   &scope=user_profile,user_media
//   &response_type=code


//let igUsernameInput = document.getElementById("username");

const igConnectBtn = document.getElementById("connectBtn")
igConnectBtn.addEventListener("click", function(){
    //let username = igUsernameInput.value.trim();
    authIg()
})

function authIg(){

    let appId = "215321604061729";
	// let redUri = window.location.origin + "/igApp";
    let redUri = "https://briangearty.github.io/igApp/"
	let url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redUri}&scope=user_profile,user_media&response_type=code`;
	window.open(url, "_self").focus();

    console.log(window.location)

var accessToken = null; //the access token is required to make any endpoint calls, http://instagram.com/developer/endpoints/

            //an interval runs to get the access token from the pop-up
    //         var interval = setInterval(function() {
    //             try {
    //                 console.log("WINDOW STUFFFFFF",window.location);
    //                 //check if hash exists
    //                 if(popup.location.hash.length) {
    //                     //hash found, that includes the access token
    //                     clearInterval(interval);
    //                     accessToken = popup.location.hash.slice(14); //slice #access_token= from string
    //                     if(callback != undefined && typeof callback == 'function') callback();
    //                 }
    //             }
    //             catch(evt) {
    //                 //permission denied
    //                 console.log("error");
    //             }
    //         }, 100);
        
    
    // function login_callback() {
    //     alert("You are successfully logged in! Access Token: "+accessToken);
    // }
    // function login() {
    //     authenticateInstagram(
    //         '16edb5c3bc05437594d69178f2aa646a', //instagram client ID
    //         'localhost/facebook', //instagram redirect URI
    //         login_callback //optional - a callback function
    //     );
    //     return false;
    // }
}
// function authIg(){
//     let appId = "215321604061729";
// 	// let redUri = window.location.origin + "/igApp";
//     let redUri = "https://briangearty.github.io/igApp/"
// 	let url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redUri}&scope=user_profile,user_media&response_type=code`;
// 	window.open(url, "_self").focus();
// }

// async function getUrl(){
//     console.log(result)
//     let url = "https://api.instagram.com/oauth/access_token"
// fetch(url, {method: "POST"})
// .then(response => response.json())
// .then(data => console.log(data))

// }

//   curl -X POST \
//   https://api.instagram.com/oauth/access_token \
//   -F client_id=215321604061729 \
//   -F client_secret=ebe0d042ab0d30e443d7766de43149f2 \
//   -F grant_type=authorization_code \
//   -F redirect_uri=//briangearty.github.io/igApp/\
//   -F code=AQB5FbryPo9tXAUANfQQHCKwtOeOkWYHnNRmTcez29o1EKRi_1Ll5nOhBfZPICntotzTzG1kEsBdS1vmKuYNhkW8MpjWLJP3TJ4Gr6wpy3i9NDUcawDUeicQv0Nm1_bESUBrOL1V555WF2OpaT9KaI_7hr05RbmrFlMHi9Q9z51zyh1jGxG1MbYkehej81xQwDgW0M-Ln9hDAxoTJ9Zvlaf1f0Xj9CWHkIs8ulWRl_yjwg


function getURL(){
var query = window.location.search;


console.log(query)
}

getURL();