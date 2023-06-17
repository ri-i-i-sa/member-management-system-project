var api_url = 'https://script.google.com/macros/s/AKfycbxjt3at4c_4Mqb_ykUmUxtCBM6kuTiJLP2hKAe4DOC1LOCh18l6603AIgnjl55sH5EK/exec'; 

fetch(api_url)
.then(function (fetch_data) {
return fetch_data.json();
})
.then(function (json) {
for (var i in json) {
    let membersId = json[i].id;
    let membersName = json[i].name;
    let membersFurigana = json[i].furigana;
    let membersGender = getGenderText(json[i].gender);
    let membersTel = json[i].tel;
    let membersBirthday = birthdayToString(json[i].birthday);
    let membersStatus = getStatusText(json[i].status);
    
    let $divsLine = $('<tr class="line">');
    $divsLine.append($('<td>' + membersId + '</td>'));
    $divsLine.append($('<td>' + membersName + '<img src="./img/iconmonstr-external-link-thin-240.png" alt="詳細へのリンク"> </th> </td>'));
    $divsLine.append($('<td>' + membersFurigana + '</td>'));
    $divsLine.append($('<td>' + membersGender + '</td>'));
    $divsLine.append($('<td>' + membersTel + '</td>'));
    $divsLine.append($('<td>' + membersBirthday + '</td>'));
    $divsLine.append($('<td>' + membersStatus + '</td>'));
    $divsLine.append($('<td>4</td>'));
    $divsLine.append($('<td><div class="flex"><div class="button-date"><a href="#" class="text-medium">来店登録</a></div><div class="button-history"><a href="#" class="text-medium">来店履歴</a></div></div></td>'));

    $divsLine.append($('</tr>'));
    $(".line").append($divsLine);
  }
});

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