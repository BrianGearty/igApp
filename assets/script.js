// https://api.instagram.com/oauth/authorize
//   ?client_id=215321604061729
//   &redirect_uri=https://briangearty.github.io/igApp/
//   &scope=user_profile,user_media
//   &response_type=code

function getURL(){
    var query = window.location.search;
    var splitQuery = query.split("=")[1];
    console.log(splitQuery)
    pushParams(splitQuery);
    }
    getURL();

let igUsernameInput = document.getElementById("username");

const igConnectBtn = document.getElementById("connectBtn")
igConnectBtn.addEventListener("click", function(){
    //let username = igUsernameInput.value.trim();
    authIg()
})

function authIg(){

    let appId = "215321604061729";
	// let redUri = window.location.origin + "/igApp";
    let redUri = "https://briangearty.github.io/igApp/"
    //let redUri = "file:///Users/briangearty/igApp/index.html"
	let url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redUri}&scope=user_profile,user_media&response_type=code`;
	window.open(url, "_self").focus();

    console.log(window.location)

}

function pushParams(query){
    console.log(query)

    if(!query){
        return;
    } else {

        // let url = "https://api.instagram.com/oauth/access_token"
        // fetch(url, {method: "POST"}, {
        //     code: query,
        //     redirectUrl: "https://briangearty.github.io/igApp/",
        // })
        // .then(response => response.json())
        // .then(data => console.log(data))
        
    }



}

//   curl -X POST \
//   https://api.instagram.com/oauth/access_token \
//   -F client_id=215321604061729 \
//   -F client_secret=ebe0d042ab0d30e443d7766de43149f2 \
//   -F grant_type=authorization_code \
//   -F redirect_uri=//briangearty.github.io/igApp/\
//   -F code=AQB5FbryPo9tXAUANfQQHCKwtOeOkWYHnNRmTcez29o1EKRi_1Ll5nOhBfZPICntotzTzG1kEsBdS1vmKuYNhkW8MpjWLJP3TJ4Gr6wpy3i9NDUcawDUeicQv0Nm1_bESUBrOL1V555WF2OpaT9KaI_7hr05RbmrFlMHi9Q9z51zyh1jGxG1MbYkehej81xQwDgW0M-Ln9hDAxoTJ9Zvlaf1f0Xj9CWHkIs8ulWRl_yjwg


