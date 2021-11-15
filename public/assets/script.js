

// https://api.instagram.com/oauth/authorize
//   &redirect_uri=https://briangearty.github.io/igApp/
//   &scope=user_profile,user_media

let splitQuery;

function getURL() {
    setTimeout(function(){
        let query = window.location.search;
        splitQuery = query.split("=")[1];
        console.log(splitQuery)
        pushParams(splitQuery)
    }, 2000)

}
getURL();

let igUsernameInput = document.getElementById("username");

const igConnectBtn = document.getElementById("connectBtn")
igConnectBtn.addEventListener("click", function () {
    //let username = igUsernameInput.value.trim();
    authIg()
})

function authIg() {

    let appId = "215321604061729";
    // let redUri = window.location.origin + "/igApp";
    //let redUri = "http://localhost:3001/"
    let redUri = "https://stark-chamber-84959.herokuapp.com/"
    let url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redUri}&scope=user_profile,user_media&response_type=code`;
    window.open(url, "_self").focus();

    console.log(window.location)

}

function pushParams(query) {
    console.log("QUERY IN PUSH", query)

    let params = {
        redirect_uri: "https://stark-chamber-84959.herokuapp.com/",
        code: query,
    }

    const searchParams = Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');

    //const searchParams =`redirect_uri=https://stark-chamber-84959.herokuapp.com/&code=${query}`
    console.log(searchParams)

    let url = "/api/insta"
    fetch(url, {
        method: "POST",
        body: searchParams
    })
        .then(response => console.log(response))
        // .then(response => response.json())
        .then(data => getUser(data))
        .catch(err => {
            console.log("Error in fetch", err.response.data);
        });
    
}

function getUser(data){
    console.log("DATA FROM POST IN GET USER", data)
}


// 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8

//   curl -X POST \
//   https://api.instagram.com/oauth/access_token \
//   -F client_id=215321604061729 \
//   -F client_secret=ebe0d042ab0d30e443d7766de43149f2 \
//   -F grant_type=authorization_code \
//   -F redirect_uri=//briangearty.github.io/igApp/\
//   -F code=AQB5FbryPo9tXAUANfQQHCKwtOeOkWYHnNRmTcez29o1EKRi_1Ll5nOhBfZPICntotzTzG1kEsBdS1vmKuYNhkW8MpjWLJP3TJ4Gr6wpy3i9NDUcawDUeicQv0Nm1_bESUBrOL1V555WF2OpaT9KaI_7hr05RbmrFlMHi9Q9z51zyh1jGxG1MbYkehej81xQwDgW0M-Ln9hDAxoTJ9Zvlaf1f0Xj9CWHkIs8ulWRl_yjwg


