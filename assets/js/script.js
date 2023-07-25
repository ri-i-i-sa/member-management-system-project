MicroModal.init();

const api_url = 'https://script.google.com/macros/s/AKfycby1JBW60FdElZxOJ5qX5Sd1bbRPMEjKc_hV_PexgObSbIOVHrwz3GAICxmwGtvmnDxc/exec';

const params = {
  view: 'members'
};

const matchThrough = 0;
const matchTrue = 1;
const matchFalse = 2;

let url = new URL(api_url);
url.search = new URLSearchParams(params).toString();

tableRows = createTableHeaderDOM();

$('#reset-btn').on('click', function(e) {
  e.preventDefault();

  $("#id-input, #name-input, #furigana-input, #tel-input").val('');
  $("input[name='status'][value='unspecified']").prop('checked', true);
});

fetch(url)
  .then(function(fetch_data) {
    return fetch_data.json();
  })
  .then(function(json) {
    let arrayLineDOM = [];

    for (var i in json) {
      lineDOM = createTableDataDOM(json[i]);
      arrayLineDOM.push(lineDOM);
    }

    tableRows.after(arrayLineDOM);

    $(document).ready(function() {
      $('#arrival-btn a').on('click', function(e) {
        e.preventDefault();
        MicroModal.show('modal-1');
 
        $('#member-name').text($(this).data('name'));
      });
    });
    
    $('#history-btn a').on('click', function(e) {
      e.preventDefault();

      params.memberId = $(this).attr('id');
      params.memberName = encodeURIComponent($(this).data('name'));

      let targetURL = new URL("./history.html", window.location.href);
      targetURL.search = new URLSearchParams(params).toString();

      window.location.href = targetURL.href;
    });

    $('#search-btn').on('click', function(e) {
      e.preventDefault();

      let arrayLineDOM = [];
    
      for (var i in json) {

        lineDOM = $('<tr class="line">');
        let searchId = $("#id-input").val();
        let searchName = $("#name-input").val();
        let searchFurigana = $("#furigana-input").val();
        let searchTel = $("#tel-input").val();
        let searchStatus = $("input[name='status']:checked").val();
        
        let searchConditions = []
        
        if (searchId) searchConditions.id = searchId; 
        if (searchName) searchConditions.name = searchName; 
        if (searchFurigana) searchConditions.furigana = searchFurigana; 
        if (searchTel) searchConditions.tel = searchTel; 
        if (searchStatus) searchConditions.status = searchStatus; 

        let matchStatus = searchANDConditions(searchConditions, json[i]);

        switch (matchStatus){
          case matchThrough:
            arrayLineDOM.push(createTableDataDOM(json[i]));
            break;
          case matchTrue:
            arrayLineDOM.push(createTableDataDOM(json[i]));
            break;
        }
      }

      $(".member-view").html(tableRows);
    
      tableRows.after(arrayLineDOM);
    });
  });

$(".member-view").html(tableRows);

function searchANDConditions(searchConditions, json){
  let matchStatus = matchThrough;

  if ('id' in searchConditions) {
    matchStatus = (json.id.toString() === searchConditions.id) ? matchTrue : matchFalse;
  }
  if ('name' in searchConditions) {
    if (json.name.includes(searchConditions.name)) {
      matchStatus = (matchStatus != matchFalse) ? matchTrue : matchFalse;
    } else {
      matchStatus = matchFalse;
    }
  }
  if ('furigana' in searchConditions) {
    if (json.furigana.toString().includes(searchConditions.furigana)) {
      matchStatus = (matchStatus != matchFalse) ? matchTrue : matchFalse;
    } else {
      matchStatus = matchFalse;
    }
  }
  if ('tel' in searchConditions) {
    if (json.tel.toString() === searchConditions.tel) {
      matchStatus = (matchStatus != matchFalse) ? matchTrue : matchFalse;
    } else {
      matchStatus = matchFalse;
    }
  }
  if ('status' in searchConditions) {
    if (searchConditions.status === "unspecified"){
      matchStatus = (matchStatus != matchFalse) ? matchTrue : matchFalse;
    } else if (json.status === statusValueToNumber(searchConditions.status)) {
      matchStatus = (matchStatus != matchFalse) ? matchTrue : matchFalse;
    } else {
      matchStatus = matchFalse;
    }
  }

  return matchStatus;
}

function createTableDataDOM(memberJson){
  let lineDOM = $('<tr class="line">')
  let memberInfo = jsonToDictionary(memberJson);
  lineDOM.append($('<td>' + memberInfo.memberId + '</td>'));
  lineDOM.append($('<td>' + memberInfo.memberName + '<img src="./assets/img/iconmonstr-external-link-thin-240.png" alt="詳細へのリンク"> </th> </td>'));
  lineDOM.append($('<td>' + memberInfo.memberFurigana + '</td>'));
  lineDOM.append($('<td>' + memberInfo.memberGender + '</td>'));
  lineDOM.append($('<td>' + memberInfo.memberTel + '</td>'));
  lineDOM.append($('<td>' + memberInfo.memberBirthday + '</td>'));
  lineDOM.append($('<td>' + memberInfo.memberStatus + '</td>'));
  lineDOM.append($('<td>4</td>'));
  lineDOM.append($('<td><div class="flex"><div class="arrivalinput-btn" id="arrival-btn"><a class="text-medium"" data-name="' + memberInfo.memberName + '">来店登録</a></div><div class="history-btn" id="history-btn"><a href="./history.html" class="text-medium" id="' +
    memberInfo.memberId + '" data-name="' + memberInfo.memberName + '">来店履歴</a></div></div></td>'));
  lineDOM.append($('</tr>'));
  return lineDOM;
}

function createTableHeaderDOM() {
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

function updateClock() {
  let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  $('#modal-1-title').text(new Date().toLocaleString('ja-JP', options));
}

setInterval(updateClock, 1000);

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

function statusValueToNumber(inputValue) {
  if (inputValue === "general") {
    return 0;
  } else if (inputValue === "vip") {
    return 1;
  }
}

function limitAndFormatInput(input) {
  let value = input.value.replace(/[^0-9]/g, ''); 
  let formattedValue = formatPhoneNumber(value); 
  if (value.length > 11 && !value.includes('-')) {
    input.value = formattedValue.substr(0, 11); 
  } else {
    input.value = formattedValue;
  }
  input.setAttribute('maxlength', '13');
}

function limitInputId(input) {
  input.value = input.value.replace(/[^0-9]/g, ''); 
}

function formatPhoneNumber(value) {
  let formattedValue = value;
  
  if (value.length >= 4 && value.length <= 7) {
    formattedValue = value.slice(0, 3) + '-' + value.slice(3);
  } else if (value.length > 7) {
    formattedValue = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
  }
  
  return formattedValue;
}

function limitInputLength(input) {
  let maxLength = input.getAttribute("maxlength");
  let value = input.value;
  let byteLength = Array.from(value).reduce(function (length, char) {
    return length + (char.charCodeAt(0) > 255 ? 2 : 1);
  }, 0);

  if (byteLength > maxLength) {
    input.value = truncateValue(value, maxLength);
  }
}

function truncateValue(value, maxLength) {
  let truncatedValue = '';
  let byteLength = 0;
  for (let i = 0; i < value.length; i++) {
    byteLength += value.charCodeAt(i) > 255 ? 2 : 1;
    if (byteLength > maxLength) {
      break;
    }
    truncatedValue += value.charAt(i);
  }
  return truncatedValue;
}

