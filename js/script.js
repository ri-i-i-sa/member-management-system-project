const api_url = 'https://script.google.com/macros/s/AKfycbxjt3at4c_4Mqb_ykUmUxtCBM6kuTiJLP2hKAe4DOC1LOCh18l6603AIgnjl55sH5EK/exec'; 
$tableRows = createHeaderDOM();

fetch(api_url)
  .then(function (fetch_data) {
    return fetch_data.json();
  })
  .then(function (json) {
    let arrayLineDOM = []; 

    for (var i in json) {
      let membersId = json[i].id;
      let membersName = json[i].name;
      let membersFurigana = json[i].furigana;
      let membersGender = getGenderText(json[i].gender);
      let membersTel = json[i].tel;
      let membersBirthday = birthdayToString(json[i].birthday);
      let membersStatus = getStatusText(json[i].status);
      let $lineDOM = $('<tr class="line">');

      $lineDOM.append($('<td>' + membersId + '</td>'));
      $lineDOM.append($('<td>' + membersName + '<img src="./img/iconmonstr-external-link-thin-240.png" alt="詳細へのリンク"> </th> </td>'));
      $lineDOM.append($('<td>' + membersFurigana + '</td>'));
      $lineDOM.append($('<td>' + membersGender + '</td>'));
      $lineDOM.append($('<td>' + membersTel + '</td>'));
      $lineDOM.append($('<td>' + membersBirthday + '</td>'));
      $lineDOM.append($('<td>' + membersStatus + '</td>'));
      $lineDOM.append($('<td>4</td>'));
      $lineDOM.append($('<td><div class="flex"><div class="button-date"><a href="#" class="text-medium">来店登録</a></div><div class="button-history"><a href="#" class="text-medium">来店履歴</a></div></div></td>'));

      $lineDOM.append($('</tr>'));
      arrayLineDOM.push($lineDOM); 
    }

    $tableRows.after(arrayLineDOM);
  });
$(".member-view").html($tableRows);


function createHeaderDOM() {
  let $headerDOM = $('<tr class="heading flex">');
  $headerDOM.append($('<th>ID</th>'));
  $headerDOM.append($('<th>名前（漢字）</th>'));
  $headerDOM.append($('<th>名前（ふりがな）</th>'));
  $headerDOM.append($('<th>性別</th>'));
  $headerDOM.append($('<th>電話番号</th>'));
  $headerDOM.append($('<th>誕生日</th>'));
  $headerDOM.append($('<th>会員ステータス</th>'));
  $headerDOM.append($('<th>来店回数</th>'));
  $headerDOM.append($('<th>管理オプション</th>'));
  $headerDOM.append($('</tr>'));

  return $headerDOM;
}

function getGenderText(genderValue) {
  if (genderValue === 0) {
      return "無回答";
  } else if (genderValue === 1) {
      return "男";
  } else if (genderValue === 2) {
      return "女";
  } else {
      return ""; 
  }
};

function getStatusText(statusValue) {
  if (statusValue === 0) {
      return "一般";
  } else if (statusValue === 1) {
      return "VIP";
  } else {
      return ""; 
  }
};

function birthdayToString(birthdayValue) {
  let date = new Date(birthdayValue);
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let formattedDate = year + "/" + month + "/" + day;
  return formattedDate;
};

