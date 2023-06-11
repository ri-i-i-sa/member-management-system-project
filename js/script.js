

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