let aft_practice={};
let action='push_exam_url_msg';
// 处理图片过大
function imgPx2Rem(ele) {
  let $img_list = $(ele).children("img")
  if ($img_list.length === 0) return
  let defereds = [];
  $img_list.each(function () {
    let dfd = $.Deferred();
    $(this).on('load', function () {
      dfd.resolve()
    })
    defereds.push(dfd);
  });
  $.when.apply(null, defereds).done(function () {
    const html_font_size = parseInt($("html").css("fontSize").split('px')[0])
    $img_list.each(function () {
      const width_rem = this.width / html_font_size
      if (width_rem > 6.7) { // 6.7 = 7.5 - (padding*2) ;  padding = 0.4
        $(this).css("width", "100%")
      }
    })
  });
}

// 添加选项事件
function setOptionsClickEvent() {
	
	
  let $aft_option = $(".aft_option")
  let selected = aft_practice.selected
  // 答题页面
  if (selected) {
    $aft_option.eq(string2index(selected)).addClass('right')
  } else {
    // 解决IOS9问题
    $aft_option.removeClass('right')
  }

  $aft_option.click(function () {
//	e="aftstudent://open-browser?param=aaa");
//	window.location.href=e;
	
  })

}
function openIframe(url) {
  var iframe = document.createElement('iframe');
  iframe.setAttribute('src', url);
  document.body.appendChild(iframe);
  iframe.parentNode.removeChild(iframe);
  iframe = null;
}

function makeSchemeUrl(action, param) {
	return `client://open_1v1replay?param={"target_url":"https://www.afanti100.com"}`;
 // return `client://${encodeURIComponent(action)}?param=${encodeURIComponent(JSON.stringify(param))}`;
}
// 生成答案解析
function buildAnswer() {
  console.log(aft_practice.show_answer,'答案解析')
  let selected = aft_practice.selected
  let $aft_option = $(".aft_option");
  if(aft_practice.jieda){
    $(".analysis-desc").html(aft_practice.jieda)
  }else {
    $(".analysis .analysis-title-icon1").hide();
  }
  let correctAnswer = aft_practice.answer_option
  // 知识点
  const knowledge_list = aft_practice.knowledge_point ? aft_practice.knowledge_point.replace(/；/g, ";").split(';') : '';
  console.log(knowledge_list,'知识点')
  let knowledge_list_html = ''
  if(knowledge_list!==''){
    knowledge_list.map(function (item) {
      knowledge_list_html += '<span>' + item.replace(/\.$/gi,"") + '</span>'
    })
    $(".analysis .knowledge-point").html(knowledge_list_html)
  }else{
    $(".analysis .analysis-title-icon2").hide();
  }

  // 选中答案
  $aft_option.eq(string2index(correctAnswer)).addClass('right')


  if (selected === correctAnswer) {
    $(".my-answer").html(selected).attr("class", "my-answer answer-right")
  } else {
    $(".my-answer").html(selected || '无').attr("class", "my-answer answer-error")
    $aft_option.eq(string2index(selected)).addClass('error')
  }
  $(".analysis").show()

}


//处理选项的ABCD序号
function setOptionIndex() {
  let $aft_option = $(".aft_option")
  $aft_option.each(function (index) {
    let html = $(this).html()
    if($(this).find('.index').length > 0) return // 解决IOS9问题
    html = html.replace(/[ABCDEF]/, '<span class="index">$&</span><span class="option-desc">')
    html = html.replace(/\．/, '')
    html += '</span>'
    $(this).html(html)
    $(this).attr("data", String.fromCharCode(65 + index))
  })
  let correctAnswer = aft_practice.answer_option
  $(".correct-answer").html(correctAnswer)
}

function string2index(str) {
  if (!str) return
  return str.charCodeAt(0) - 65
}

function getData (data) {
  aft_practice = data
  aft_practice = JSON.parse(data)
  const need_decode_item = ['question_html','knowledge_point','option_html','jieda']

  need_decode_item.map(function (item,index) {
    if(aft_practice[item]!==''){
      aft_practice[item] = decodeURIComponent(aft_practice[item])
    }else {
      delete aft_practice[item];
    }
  })
  return new Promise(function (resolve, reject) {
    if(aft_practice.question_html){
      $(".question .title").html(aft_practice.question_html)
    }
    if (aft_practice.option_html){
      $(".question .option").html(aft_practice.option_html)
    }

    if (aft_practice.show_answer) buildAnswer()

    resolve(aft_practice);
  });
}

function aftPracticeInit(data) {
  if (!data) return
  return getData(data).then(function () {
    setOptionIndex()
    // 修正题干选项图片过大
    imgPx2Rem(".question .title")
    imgPx2Rem(".question .option")
    if (!aft_practice.show_answer) {
      setOptionsClickEvent()
    }else {
      imgPx2Rem(".analysis .analysis-desc")
    }
    $("body").show()
  })
}




//function attackEnemy() {
////document.write("land on");
////  $("body").show();
////alert("ready go");
//}
//attackEnemy();
// aftPracticeInit(aft_practices);