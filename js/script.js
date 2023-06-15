var api_url = 'https://script.google.com/macros/s/AKfycbxjt3at4c_4Mqb_ykUmUxtCBM6kuTiJLP2hKAe4DOC1LOCh18l6603AIgnjl55sH5EK/exec'; //生成したAPIのURLを指定

$.getJSON(api_url, function(json) {
  $.each(json, function(i, item) {
    if (i === 0) {
      $("#id-firstline").text(item.id);
      $("#name-firstline").text(item.name);
      $("#furigana-firstline").text(item.furigana);
      $("#gender-firstline").text(getGenderText(item.gender));
      $("#tel-firstline").text(item.tel);
      $("#birthday-firstline").text(birthdayToString(item.birthday));
      $("#status-firstline").text(getStatusText(item.status));
    } else if (i === 1) {
      $("#id-secondline").text(item.id);
      $("#name-secondline").text(item.name);
      $("#furigana-secondline").text(item.furigana);
      $("#gender-secondline").text(getGenderText(item.gender));
      $("#tel-secondline").text(item.tel);
      $("#birthday-secondline").text(birthdayToString(item.birthday));
      $("#status-secondline").text(getStatusText(item.status));
    }
  });
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