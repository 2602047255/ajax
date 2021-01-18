function resolveData(params) {
  var rows = [];
  for(var key in params) {
    var str = `${key}=${params[key]}`;
    rows.push(str);
  }
  return rows.join('&');
}

function ajax(options = {}) {
  var xhr = new XMLHttpRequest();
  var qs = resolveData(options.data);

  if(options.method.toUpperCase() === 'GET') {
    xhr.open(options.method, options.url + '?' + qs);
    xhr.send();
  } else if(options.method.toUpperCase() === 'POST') {
    xhr.open(options.method, options.url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(qs);
  }

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var result = JSON.parse(xhr.response);
      options.success(result);
    }
  }
}

ajax({
  method: 'get',
  url: 'http://www.liulongbin.top:3006/api/getbooks',
  success: function(result) {
    console.log(result);
  }
})

ajax({
  method: 'post',
  url: 'http://www.liulongbin.top:3006/api/addbook',
  data: {
    bookname: '大耳朵图图',
    author: '某某某',
    publisher: '某某出版社出版'
  },
  success: function(result) {
    console.log(result);
  }
})