const api_url = 'https://script.google.com/macros/s/AKfycbypHYoHe6azwbfRgCPMAAw_hSRa9SW1yxzJbabdg3cSxRV29ueaJ3VfED16UviYs5uu/exec';

const params = {
  view: 'history'
};

const url = new URL(api_url);
url.search = new URLSearchParams(params).toString();

fetch(url)
  .then(function (fetch_data) {
    return fetch_data.json();
  })
  .then(function (json) {
    for (var i in json) {
      console.log(json);
    }
  });
