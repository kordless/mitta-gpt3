// mitta screenshot 0.1.1
// copyright, 2022
// kordless@gmail.com

var tab_url = "";
var title = "";

const loadIcon = async() => {
  try {
    const res = await chrome.action.setIcon({path: "assets/icon-128.png"});
  } catch(err) {
    console.log("cursor load error");
  }
};

const loadCursor = async() => {
  try {
    const res = await chrome.action.setIcon({path: "assets/cursor-128.png"});
  } catch(err) {
    console.log("cursor load error");
  }
};

// handle click of icon
chrome.action.onClicked.addListener(function (tab) {
  tab_url = tab.url;
  loadCursor().then(console.log("loaded cursor"));

  // strip trailing / off URL
  if(tab_url.charAt( tab_url.length-1 ) == "/") {
    tab_url = tab_url.slice(0, -1)
    var stripped_url = true
  } else {
    var stripped_url = false
  }
  title = tab.title;

  loadIcon().then(console.log("loaded icon"));
  var url = "https://api.openai.com/v1/completions";
  
  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({"model": "text-davinci-002", "prompt": "Tell me more about "+title, "temperature": 0, "max_tokens": 6})
  }).then(result => result.json())
  .then((result) => {
    console.log(result);
    console.log(result.choices[0].text);
  }).catch(err => {
    console.log("error, login failed");
    loadIcon().then(console.log("loaded icon"));
  });
})