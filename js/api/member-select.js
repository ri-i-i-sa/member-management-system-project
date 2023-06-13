export function fetchData() {

  var api_url = 'https://script.google.com/macros/s/AKfycbxjt3at4c_4Mqb_ykUmUxtCBM6kuTiJLP2hKAe4DOC1LOCh18l6603AIgnjl55sH5EK/exec'; //生成したAPIのURLを指定

  fetch(api_url)
  .then(function (fetch_data) {
  return fetch_data.json();
  })
  .then(function (json) {
  for (var i in json) {
    console.log("json[i].id");
    console.log(json[i].id);
    console.log("json[i].name");
    console.log(json[i].name);
    console.log("json[i].furigana");
    console.log(json[i].furigana);
    console.log("json[i].gender");
    console.log(json[i].gender);
    console.log("json[i].tel");
    console.log(json[i].tel);
    console.log("json[i].birthday");
    console.log(json[i].birthday);
    console.log("json[i].status");
    console.log(json[i].status);
    }
  });
};