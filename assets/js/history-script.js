const api_url = 'https://script.google.com/macros/s/AKfycbypHYoHe6azwbfRgCPMAAw_hSRa9SW1yxzJbabdg3cSxRV29ueaJ3VfED16UviYs5uu/exec';

const params = {
  view: 'history'
};

const url = new URL(api_url);
url.search = new URLSearchParams(params).toString();

$tableRows = createHeaderDOM();

fetch(url)
  .then(function (fetch_data) {
    return fetch_data.json();
  })
  .then(function (json) {
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

    $tableRows.after(arrayLineDOM);
    }
  });
$(".member-view").html($tableRows);

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
  if (arrivalValue === 0) {
      return "不来店";
  } else if (arrivalValue === 1) {
      return "来店済";
  } else {
      return ""; 
  }
};

function formatAmount(amount) {
  const formattedAmount = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(amount);
  
  return formattedAmount;
}