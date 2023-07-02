const urlParams = new URLSearchParams(window.location.search);
const view = urlParams.get('view');
const id = urlParams.get('id');

var restURL = new URL(window.location.href);
restURL.searchParams.delete('view');
restURL.searchParams.delete('id');
history.replaceState(null, null, restURL.pathname);

console.log(view);
console.log(id);



const api_url = 'https://script.google.com/macros/s/AKfycbzrDp-YLsNwsTonjesoamjuwaKDXccVrhcr9d1guQVH_z3vEx1jRYBmESnqFGRmINlc/exec';

const params = {
  view: 'members',
};

let url = new URL(api_url);
url.search = new URLSearchParams(params).toString();

$tableRows = createHeaderDOM();

fetch(url)
  .then(function(fetch_data) {
    return fetch_data.json();
  })
  .then(function(json) {
    let arrayLineDOM = [];

    for (var i in json) {
      let memberInfo = jsonToDictionary(json[i]);
      let lineDOM = $('<tr class="line">');

      lineDOM.append($('<td>' + memberInfo.memberId + '</td>'));
      lineDOM.append($('<td>' + memberInfo.memberName + '<img src="./assets/img/iconmonstr-external-link-thin-240.png" alt="詳細へのリンク"> </th> </td>'));
      lineDOM.append($('<td>' + memberInfo.memberFurigana + '</td>'));
      lineDOM.append($('<td>' + memberInfo.memberGender + '</td>'));
      lineDOM.append($('<td>' + memberInfo.memberTel + '</td>'));
      lineDOM.append($('<td>' + memberInfo.memberBirthday + '</td>'));
      lineDOM.append($('<td>' + memberInfo.memberStatus + '</td>'));
      lineDOM.append($('<td>4</td>'));
      lineDOM.append($('<td><div class="flex"><div class="button-date"><a href="#" class="text-medium">来店登録</a></div><div class="button-history"><a href="./history.html" class="text-medium" id="' +
        memberInfo.memberId + '" data-name="' + memberInfo.memberName + '">来店履歴</a></div></div></td>'));
      lineDOM.append($('</tr>'));
      arrayLineDOM.push(lineDOM);
    }

    $tableRows.after(arrayLineDOM);

    $('.button-history a').on('click', function(e) {
      e.preventDefault();

      let id = $(this).attr('id');
      let name = $(this).data('name');
      params.memberId = id;
      params.memberName = encodeURIComponent(name);

      let targetURL = new URL("./history.html", window.location.href);
      targetURL.search = new URLSearchParams(params).toString();

      window.location.href = targetURL.href;
    });
  });

$(".member-view").html($tableRows);

function createHeaderDOM() {
  let headerDOM = $('<tr class="heading flex">');
  headerDOM.append($('<th>ID</th>'));
  headerDOM.append($('<th>名前（漢字）</th>'));
  headerDOM.append($('<th>名前（ふりがな）</th>'));
  headerDOM.append($('<th>性別</th>'));
  headerDOM.append($('<th>電話番号</th>'));
  headerDOM.append($('<th>誕生日</th>'));
  headerDOM.append($('<th>会員ステータス</th>'));
  headerDOM.append($('<th>来店回数</th>'));
  headerDOM.append($('<th>管理オプション</th>'));
  headerDOM.append($('</tr>'));

  return headerDOM;
}


$('.search-btn.text-medium').on('click', function(e) {
  e.preventDefault();

  let id = 1;
  let view = params.view;

  let targetURL = new URL(window.location.href);
  targetURL.searchParams.set('view', view);
  targetURL.searchParams.set('id', id);

  let newURL = targetURL.href; 

  window.location.assign(newURL);
});


function jsonToDictionary(json) {
  return {
    memberId: json.id,
    memberName: json.name,
    memberFurigana: json.furigana,
    memberGender: getGenderText(json.gender),
    memberTel: json.tel,
    memberBirthday: birthdayToString(json.birthday),
    memberStatus: getStatusText(json.status)
  };
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

