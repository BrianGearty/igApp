
let splitQuery;

function getURL() {
        let query = window.location.search;
        splitQuery = query.split("=")[1];
        console.log(splitQuery)
}
getURL();

let igUsernameInput = document.getElementById("username");

const igConnectBtn = document.getElementById("connectBtn")
igConnectBtn.addEventListener("click", function () {
    //let username = igUsernameInput.value.trim();
    //pushParams(splitQuery)
    other(splitQuery)

})

const authIgBtn = document.getElementById("authBtn");
authIgBtn.addEventListener("click", function () {
    //let username = igUsernameInput.value.trim();
    authIg()
    console.log("clicked")
    
})


function authIg() {

    let appId = "215321604061729";
    // let redUri = window.location.origin + "/igApp";
    //let redUri = "https://localhost:3001/"
    let redUri = "https://stark-chamber-84959.herokuapp.com/"
    let url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redUri}&scope=user_profile,user_media&response_type=code`;
    window.open(url, "_self").focus();

}

other = async(query)=>{
return await fetch("/api/insta", {
    method: "POST",
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: {
    code: query,
    redirect_uri: "https://stark-chamber-84959.herokuapp.com/",
    }
}).then(response => console.log("RESPONSE FROM SERVER", response))
    .catch(err => console.log(err))

}

// pushParams = async (query)=> {


//     console.log("QUERY IN PUSH", query)

//     let params = {
//         redirect_uri: "https://localhost:3001/",
//         code: query,
//     }

//     const searchParams = Object.keys(params).map((key) => {
//         return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
//     }).join('&');

//     //const searchParams =`redirect_uri=https://stark-chamber-84959.herokuapp.com/&code=${query}`
//     // console.log(searchParams)

//     let url = "/api/insta"
//     try{
//     let response = await fetch(url, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//         },
//         body: searchParams
//     })

//     const data = await response.json();
//     console.log("DATA IN POST", data)
//         return data;
//     } catch (e) {
//         return e;
//     }    
    
// }


// 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8

//   curl -X POST \
//   https://api.instagram.com/oauth/access_token \
//   -F client_id=215321604061729 \
//   -F client_secret=ebe0d042ab0d30e443d7766de43149f2 \
//   -F grant_type=authorization_code \
//   -F redirect_uri=//briangearty.github.io/igApp/\
//   -F code=AQB5FbryPo9tXAUANfQQHCKwtOeOkWYHnNRmTcez29o1EKRi_1Ll5nOhBfZPICntotzTzG1kEsBdS1vmKuYNhkW8MpjWLJP3TJ4Gr6wpy3i9NDUcawDUeicQv0Nm1_bESUBrOL1V555WF2OpaT9KaI_7hr05RbmrFlMHi9Q9z51zyh1jGxG1MbYkehej81xQwDgW0M-Ln9hDAxoTJ9Zvlaf1f0Xj9CWHkIs8ulWRl_yjwg


