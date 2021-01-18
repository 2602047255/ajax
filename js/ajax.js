/**
 * 处理请求的 data
*/
function resolveData(data) {
  var rows = [];
  for(var key in data) {
    var query = `${key}=${data[key]}`;
    rows.push(query);
  }
  return rows.join('&');
}

// 封装 ajax 函数
function ajax(options = {}) {
  var xhr = new XMLHttpRequest();
  var qs = resolveData(options.data);

  if(options.method.toUpperCase() === 'GET') {
    xhr.open(options.method, options.url + '?' + qs);
    xhr.send();
  } else if(options.method.toUpperCase() === 'POST') {
    xhr.open(options.method, options.url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(qs)
  }

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var result = JSON.parse(xhr.response);
      options.success(result);
    }
  }
}