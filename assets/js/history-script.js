const api_url = 'https://script.google.com/macros/s/AKfycbxq5EBR77k4LWLhayZYu0iZa22SlZ_BChE2_jMvMMDZyccu8-54Z7i4ucqwg9ZKk0IR/exec';

$tableRows = createHeaderDOM();
$totalAmount = 0;

$(document).ready(function() {
  // URLのクエリパラメーターを取得
  const urlParams = new URLSearchParams(window.location.search);
  
  // パラメーターを設定
  const params = {
    view: 'history',
    memberId: urlParams.get('memberId')
  };

  let $memberIdDOM = $('<p class="id-name">ID : <p class="id-number">' + params.memberId + '</p>');
  $(".id-wrap.flex").html($memberIdDOM);

  // URLを構築
  const url = new URL(api_url);
  url.search = new URLSearchParams(params).toString();
  
  // APIにリクエストを送信
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    if (json.length === 0) {
      $(".member-view").hide();
      $(".totaltext").hide();
      $(".text-for-hide").show();
    } else {
      $(".text-for-hide").hide();

      let arrayLineDOM = [];

      for (var i in json) {
        let reserveDate = json[i].reserveAt;
        let arrivalDate = json[i].arrivalAt;
        let arrivalCheck = getArrivalText(json[i].arrivalFlag);
        let paymentTotal = formatAmount(json[i].paymentAmount);
        let $lineDOM = $('<tr class="line">');

        $lineDOM.append($('<td>' + reserveDate + '</td>'));
        $lineDOM.append($('<td>' + arrivalDate + '</td>'));
        $lineDOM.append($('<td>' + arrivalCheck + '</td>'));

        $totalAmount += json[i].paymentAmount;
        $lineDOM.append($('<td>' + paymentTotal + '</td>'));

        $lineDOM.append($('</tr>'));
        arrayLineDOM.push($lineDOM);
      }
      $tableRows.after(arrayLineDOM);

      let $totalAmountDOM = $('<span class="totalprice">' + formatAmount($totalAmount) + '</span>');
      $(".totaltext").html("合計金額: ").append($totalAmountDOM);
    }
  });
  $(".text-for-hide").hide(); 
  $(".member-view").html($tableRows);
});

function createHeaderDOM() {
  let $headerDOM = $('<tr class="heading flex">');
  $headerDOM.append($('<th>予約日時</th>'));
  $headerDOM.append($('<th>来店日時</th>'));
  $headerDOM.append($('<th>来店状態</th>'));
  $headerDOM.append($('<th>支払金額</th>'));
  $headerDOM.append($('</tr>'));

  return $headerDOM;
}

function getArrivalText(arrivalValue) {
  if (arrivalValue === 1) {
    return "済";
  } else {
    return "未";
  }
}

function formatAmount(amount) {
  const formattedAmount = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(amount);
  
  return formattedAmount;
}
