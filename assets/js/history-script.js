const api_url = 'https://script.google.com/macros/s/AKfycbziG0kBCwC77B7Zr82T1ThhOq7rvULmApC2tt-u-cTI3q-X_E-WNIP9Y9izfFeFF8pq/exec';

$tableRows = createHeaderDOM();

$(document).ready(function() {
  // URLのクエリパラメーターを取得
  const urlParams = new URLSearchParams(window.location.search);
  
  // idパラメーターを取得
  const id = urlParams.get('id');
  
  // パラメーターを設定
  const params = {
    view: 'history',
    id: id
  };
  
  // URLを構築
  const url = new URL(api_url);
  url.search = new URLSearchParams(params).toString();
  
  // APIにリクエストを送信
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      // 取得したデータを処理
      console.log(json);

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
        $lineDOM.append($('<td>' + paymentTotal + '</td>'));

        $lineDOM.append($('</tr>'));
        arrayLineDOM.push($lineDOM); 
      }

      $tableRows.after(arrayLineDOM);
    })
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
