var api_url = 'https://script.google.com/macros/s/AKfycbzbspL8HqK0e2Tk04gGJWGz18V1Mz70C0qTmS3nNDzGp-7VuJH1AtIA-dXQpH_45sU4/exec'; //生成したAPIのURLを指定
 
fetch(api_url)
.then(function (fetch_data) {
  return fetch_data.json();
})
.then(function (json) {
  for (var i in json) {
    console.log(json[i].name);
  }
});
 
// 下記JQuery動作確認用
$(function () {
    setTimeout(function () {
      $(".test").fadeIn(1200);
    }, 6500); //0.5秒後にフェードイン
    setTimeout(function () {
      $(".test").fadeOut(500);
    }, 50);
    setTimeout(function () {
      //2.5秒後にフェードアウト
      $(".test").fadeIn(1500);
    }, 3500);
  });