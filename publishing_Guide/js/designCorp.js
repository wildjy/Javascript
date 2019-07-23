/* GNB */
$(function () {
	// $('#gnb4 .left>li.selected>ul').css({ 'display': 'block' });

	// $('#gnb4 .left>li').hover(function () {
	// 	var depth1 = $(this);
	// 	if (depth1.hasClass('selected')) {
	// 		$(this).find("ul").css({ 'display': 'block' });
	// 	} else {
	// 		$(this).find("ul").css({ 'display': 'block' });
	// 		$(this).addClass('view');
	// 		$("li.selected>ul").css({ 'display': 'none' });
	// 	}
	// }, function () {
	// 	var depth1 = $(this);
	// 	if (depth1.hasClass('selected')) {
	// 		$(this).find("ul").css({ 'display': 'block' });
	// 	} else {
	// 		$(this).find("ul").css({ 'display': 'none' });
	// 		$(this).removeClass('view');
	// 	}
	// 	$("li.selected>ul").css({ 'display': 'block' });
	// });

	// $("#gnb4 .sm li img").each(function () {
	// 	rollsrc = $(this).attr("src");
	// 	rollON = rollsrc.replace(/.png$/ig, "_on.png");
	// 	$("<img>").attr("src", rollON);
	// });

	// $("#gnb4 .sm li").hover(function () {
	// 	imgsrc = $(this).find("img").attr("src");
	// 	if (imgsrc) {
	// 		matches = imgsrc.match(/_on/);

	// 		if (!matches) {
	// 			imgsrcON = imgsrc.replace(/.png$/ig, "_on.png");
	// 			$(this).find("img").attr("src", imgsrcON);
	// 		}
	// 	}
	// }, function () {
	// 	if (imgsrc) {
	// 		$(this).find("img").attr("src", imgsrc);
	// 	}
	// });
});

/* GNB floating */
$(function () {
	$('.topFix').each(function () {
		var menupos = $(".topFix").offset().top;
		$(window).scroll(function () {
			if ($(window).scrollTop() >= menupos) {
				$(".topFix").addClass('floating');
			} else {
				$(".topFix").removeClass('floating');
			}
		});
	});
});

/* tab (click) */
$(function () {
	$('ul.tab').each(function () {
		var $active, $content, $links = $(this).find('a');

		$active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
		$active.parent("li").addClass('selected');
		$active.find('img').each(function () {
			$(this).attr('src', $(this).attr('src').replace('.gif', '_on.gif'));
		});

		$content = $($active[0].hash);

		$links.not($active).each(function () {
			/*$(this.hash).hide();*/
			$(this.hash).addClass('hideCont');
		});

		$(this).on('click', 'a', function (e) {
			$active.parent("li").removeClass('selected');
			$active.find('img').each(function () {
				$(this).attr('src', $(this).attr('src').replace('_on.gif', '.gif'));
			});
			/*$content.hide();*/
			$content.addClass('hideCont');

			$active = $(this);
			$content = $(this.hash);

			$active.parent("li").addClass('selected');
			$active.find('img').each(function () {
				$(this).attr('src', $(this).attr('src').replace('.gif', '_on.gif'));
			});
			/*$content.show();*/
			$content.removeClass('hideCont');

			e.preventDefault();
		});
	});
});

/* more view */
/*$(function(){ 아래 내용으로 변경 함
	$(".msgHover").hover(function(){
		$(this).next(".msgDetail").show();
	},function(){
		$(this).next(".msgDetail").hide();
	});
});*/
$(function(){
	$('.msgHover').on('mouseover focusin', function () {
		$(this).next(".msgDetail").show();
	});
	$('.msgHover').on('mouseout focusout', function () {
		$(this).next(".msgDetail").hide();
	});
});


$(function () {
	$('.msgToggle').on('click keypress', function () {
		$(".msgDetail").not($(this).siblings(".msgDetail")).hide();
		$(this).siblings(".msgDetail").toggle();
		return false;
	});
	$(document).click(function (e) {
		if (e.target.className == "msgDetail") { return false; }
		$(".msgDetail").hide();
	});
});

/* body 클릭 시 레이어 닫기 */
/*$(document).click(function (e) { 아래 내용으로 변경 함
	if (e.target.className == "layerClose") { return false; }
	$(".layerClose").hide();
});*/
/*$(function(){ 접근성 때문에 아래 내용으로 변경
	$('.layerClose').each(function(){
		$(document).click(function(e){
			if( !$('.layerClose').has(e.target).length )
			$('.layerClose').hide();
		});
	});
});*/


/* img rollover */
$(function () {
	$('img.rollover').hover(function () {
		// 이미 선택된것은 스킵
		if (this.src.indexOf('_on.') == -1) this.src = this.src.replace(".gif", "_on.gif");
	}, function () {
		this.src = this.src.replace("_on.gif", ".gif");
	});
});
$(function () {
	$('img.rolloverPNG').hover(function () {
		if (this.src.indexOf('_on.') == -1) this.src = this.src.replace(".png", "_on.png");
	}, function () {
		this.src = this.src.replace("_on.png", ".png");
	});
});

/* iframe resize */
function resizeFrame(iframeObj) {
	var innerBody = iframeObj.contentWindow.document.documentElement;
	oldEvent = innerBody.onclick;
	innerBody.onclick = function () { resizeFrame(iframeObj, 1); oldEvent; };
	var innerHeight = innerBody.scrollHeight;
	iframeObj.style.height = innerHeight + "px";
}

/* etc */
function over(obj) { document.getElementById(obj).style.display = 'block'; }
function out(obj) { document.getElementById(obj).style.display = 'none'; }
function pop(url, name, w, h) { window.open(url, name, 'width=' + w + ',height=' + h + ',scrollbars=no,status=1'); } //Popup(스크롤바없음)
function pops(url, name, w, h) { window.open(url, name, 'width=' + w + ',height=' + h + ',scrollbars=yes'); } //Popup(스크롤바있음)

//문자 바꾸기, 사용법 var str = 문자열.replaceAll("a", "1");  
String.prototype.replaceAll = function (str1, str2) {
	var temp_str = "";
	if (this.trim() != "" && str1 != str2) {
		temp_str = this.trim();
		while (temp_str.indexOf(str1) > -1) {
			temp_str = temp_str.replace(str1, str2);
		}
	}
	return temp_str;
}

$(function() {
	$.fn.customSelect = function () {
		function getRandomID() {
			var timeStamp = new Date().getTime();
			var randomStr = (Math.floor(Math.random() * timeStamp)).toString();

			return randomStr;
		}

		function getElementID($obj) {
			var objId = $obj.attr('id');

			if (!objId) {
				objId = getRandomID();
				$obj.attr('id', objId);
			}

			return objId;
		}

		this.each(function (idx) {
			var $select = $(this),
				$option = $select.children('option'),
				selectedText = '', optionHtml = '', _html = '',
				elId = getElementID($select),
				eventId = '.evtId_' + elId,
				$dsSelectBox, $selectText, $ul, $li;

			(function makeCustomSelectHtml() {
				$.each($option, function () {
					var $thisOptionItem = $(this),
						name = $thisOptionItem.text() || '',
						value = $thisOptionItem.val(),
						isSelected = $thisOptionItem.prop('selected') || false,
						isDisabled = $thisOptionItem.prop('disabled') || false,
						className = isDisabled ? 'disabled' : isSelected ? 'selected' : '';

					//	                var onclick = "onclick=IfSel"+elId+"('"+value+"','"+name+"')";
					var onclick = "onclick=IfSel" + elId + "('" + value + "')";
					optionHtml += '<li id="' + value + '" class="' + className + '"  data-value="' + value + '" value="' + value + '" ' + onclick + ' >' + name + '</li>';

				});

				if (selectedText === '' && $option.length > 0) {
					//					selectedText = $option.eq(0).text();    // 0번째 Selected 
					var selectindex = $("#" + elId + " option").index($("#" + elId + " option:selected"));  // Selected된 index
					selectedText = $option.eq(selectindex).text();
				}

				_html = '<div class="dsSelectBox">';
				_html += '<div class="selectedText">' + selectedText + '</div>';
				_html += '<ul style="z-index:' + (999 - idx) + '" id=ul' + elId + '>' + optionHtml + '</ul>';
				_html += '</div>';

				$select.next('.dsSelectBox').remove();
				$select.after(_html);
				$select.hide();

				$dsSelectBox = $select.next('.dsSelectBox');
				$dsSelectBox.width($select.outerWidth(true));

				$selectText = $dsSelectBox.children('.selectedText');
				$ul = $dsSelectBox.children('ul');
				$li = $ul.children('li');
			})();

			(function initEvent() {
				$dsSelectBox.off(eventId).on('mousedown' + eventId, function () {
					$('div.dsSelectBox').children('ul').not($ul).slideUp(100, 'swing');
					$ul.slideDown(100, 'swing');
				});

				$ul.children('li:not(.disabled)').off(eventId).on('click' + eventId, function () {
					var $this = $(this);
					var thisValue = $this.attr('data-value');
					var thisText = $this.html();

					$li.removeClass('selected');
					$this.addClass('selected');
					$ul.slideUp(100, 'swing');
					$selectText.html(thisText);
					$select.val(thisValue);
				});

				$select.off(eventId).on('change' + eventId, function () {
					var $this = $(this);
					var index = $this.children('option:selected').index();

					$li.eq(index).trigger('click');
				});

				$select.on('click' + eventId, function () {
					$dsSelectBox.trigger('mousedown');
				});

				$('body').off(eventId).on('mouseup' + eventId, function (e) {
					if ($dsSelectBox.size() === 0) {
						$ul.slideUp(100, 'swing');
					}
				});

				// 셀렉트 레이어 이외의 다른것을 click 시 열려있는 select 레이어 닫기
				$(document).off(eventId).on('click' + eventId, function (e) {
					var $target = $(e.target);

					if (!$target.hasClass('selectedText')) {
						$ul.slideUp(100, 'swing');
					}
				});
			})();
		});
	};
});

$(window).load(function () {
	$('.select_box').customSelect();
});