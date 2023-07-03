const api_url = 'https://script.google.com/macros/s/AKfycby1JBW60FdElZxOJ5qX5Sd1bbRPMEjKc_hV_PexgObSbIOVHrwz3GAICxmwGtvmnDxc/exec';

tableRows = createHeaderDOM();

$(document).ready(function() {
  const urlParams = new URLSearchParams(window.location.search);
  
  const params = {
    view: 'history',
    memberId: urlParams.get('memberId'),
  };

  let memberIdDOM = $('<p class="id-name">ID : <p class="id-number">' + params.memberId + '</p>');
  $(".id-wrap.flex").html(memberIdDOM);

  let memberNameDOM = $('<p class="member-name">' + decodeURIComponent(urlParams.get('memberName')) + '</p><p>&nbsp;様</p>');
  $(".name-wrap.flex").html(memberNameDOM);

  const url = new URL(api_url);
  url.search = new URLSearchParams(params).toString();

  
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    if (json.length === 0) {
    $(".no-history-message").show();

    } else {
      $(".heading.flex").show();
      $(".total-text").show();
      let arrayLineDOM = [];
      let totalAmount = 0;
      
      for (var i in json) {
        let lineDOM = $('<tr class="line">');

        lineDOM.append($('<td>' + json[i].reserveAt + '</td>'));
        lineDOM.append($('<td>' + json[i].arrivalAt + '</td>'));
        lineDOM.append($('<td>' + getArrivalText(json[i].arrivalFlag) + '</td>'));
        lineDOM.append($('<td>' + formatAmount(json[i].paymentAmount) + '</td>'));

        lineDOM.append($('</tr>'));

        arrayLineDOM.push(lineDOM);
        totalAmount += json[i].paymentAmount;
      }
      tableRows.after(arrayLineDOM);

      let $totalAmountDOM = $('<span class="total-price">' + formatAmount(totalAmount) + '</span>');
      $(".total-text").append($totalAmountDOM);
    }
  });
  $(".member-view").html(tableRows);

  $(".heading.flex").hide();
});

function createHeaderDOM() {
  let headerDOM = $('<tr class="heading flex" hidden>');
  headerDOM.append($('<th>予約日時</th>'));
  headerDOM.append($('<th>来店日時</th>'));
  headerDOM.append($('<th>来店状態</th>'));
  headerDOM.append($('<th>支払金額</th>'));
  headerDOM.append($('</tr>'));

  return headerDOM;
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
