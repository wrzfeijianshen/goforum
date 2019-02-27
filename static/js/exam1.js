function attackEnemy() {
//document.write("land on");
//  $("body").show();



  // openIframe();
  openIframe1();
}
function openIframe1() {
  alert("openIframe go");
	e="aftstudent://open-browser?param=aaa";
  window.location.href=e;
}
function openIframe() {
  url = `aftstudent://open-browser?param=aaa`;
  alert("openIframe go");
  var iframe = document.createElement('iframe');
  iframe.setAttribute('src', url);
  document.body.appendChild(iframe);
  iframe.parentNode.removeChild(iframe);
  iframe = null;
}
