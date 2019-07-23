/* GNB */
$(function(){
	/* submenu over,out */
	$('#gnb>ul>li.selected>ul').css({'display':'block'});
	
	$('#gnb>ul>li').hover(function(){
		var depth1 = $(this);
		if(depth1.hasClass('selected')){
			$(this).find("ul").css({'display':'block'});
		} else {
			$(this).find("ul").css({'display':'block'});
			$(this).find("a").addClass('on');
			$("li.selected>ul").css({'display':'none'});
		}
	}, function(){
		var depth1 = $(this);
		if(depth1.hasClass('selected')){
			$(this).find("ul").css({'display':'block'});
		} else {
			$(this).find("ul").css({'display':'none'});
			$(this).find("a").removeClass('on');
			$("li.selected>ul").css({'display':'block'});
		}
	});
	
	/* submenu img rollover */
	$("#gnb>ul>li>ul>li>a img").each(function() {
		rollsrc = $(this).attr("src");
		rollON = rollsrc.replace(/.gif$/ig,"_on.gif");
		$("<img>").attr("src", rollON);
	});
	
	$("#gnb>ul>li>ul>li>a").hover(function(){
		imgsrc = $(this).children("img").attr("src");
		if(imgsrc) {
			matches = imgsrc.match(/_on/);

			if (!matches) {
			imgsrcON = imgsrc.replace(/.gif$/ig,"_on.gif");
			$(this).children("img").attr("src", imgsrcON);
			}
		}
	}, function(){
		if(imgsrc) {
			$(this).children("img").attr("src", imgsrc);
		}
	});
});

/* GNB2 (2016-05-30 renewal) */
/*$(function(){
	// 전체메뉴 show/hide
	var $menuAll = $('#gnb2 .menu_all');
	$('#gnb2>.menu>li>a').mouseenter(function(){
		$menuAll.stop().animate({"height":"258px"},200);
	});
	$('#gnb2').mouseleave(function(){
		$menuAll.stop().animate({"height":"0"},200);
	});
	$('#gnb2 .menu_all .close').click(function(){
		$menuAll.stop().animate({"height":"0"},200);
	});
	
	// 전체메뉴 hover시 현재위치 표시
	$("#gnb2>.menu>li").not(".sm").each(function(idx) {
		idx = idx + 1;
		$('.menu_all .ma'+idx).hover(function(){
			$('.menu .m'+idx).toggleClass('over');
		});	
	});
	
	// submenu img rollover
	$("#gnb2 .sm li a img").each(function() {
		rollsrc = $(this).attr("src");
		rollON = rollsrc.replace(/.gif$/ig,"_on.gif");
		$("<img>").attr("src", rollON);
	});
	
	$("#gnb2 .sm li a").hover(function(){
		imgsrc = $(this).children("img").attr("src");
		if(imgsrc) {
			matches = imgsrc.match(/_on/);

			if (!matches) {
			imgsrcON = imgsrc.replace(/.gif$/ig,"_on.gif");
			$(this).children("img").attr("src", imgsrcON);
			}
		}
	}, function(){
		if(imgsrc) {
			$(this).children("img").attr("src", imgsrc);
		}
	});
});*/

$(function () {
	$('#gnb4 .left>li.selected>ul').css({ 'display': 'block' });

	$('#gnb4 .left>li').hover(function () {
		var depth1 = $(this);
		if (depth1.hasClass('selected')) {
			$(this).find("ul").css({ 'display': 'block' });
		} else {
			$(this).find("ul").css({ 'display': 'block' });
			$(this).addClass('view');
			$("li.selected>ul").css({ 'display': 'none' });
		}
	}, function () {
		var depth1 = $(this);
		if (depth1.hasClass('selected')) {
			$(this).find("ul").css({ 'display': 'block' });
		} else {
			$(this).find("ul").css({ 'display': 'none' });
			$(this).removeClass('view');
		}
		$("li.selected>ul").css({ 'display': 'block' });
	});

	$("#gnb4 .sm li img").each(function () {
		rollsrc = $(this).attr("src");
		rollON = rollsrc.replace(/.png$/ig, "_on.png");
		$("<img>").attr("src", rollON);
	});

	$("#gnb4 .sm li").hover(function () {
		imgsrc = $(this).find("img").attr("src");
		if (imgsrc) {
			matches = imgsrc.match(/_on/);

			if (!matches) {
				imgsrcON = imgsrc.replace(/.png$/ig, "_on.png");
				$(this).find("img").attr("src", imgsrcON);
			}
		}
	}, function () {
		if (imgsrc) {
			$(this).find("img").attr("src", imgsrc);
		}
	});
});

/* tab (click) */
$(function(){
	var JQtabViewNum = 0;
	if($("ul.tab").hasClass('JQtabView2')){JQtabViewNum = 1;}
	if($("ul.tab").hasClass('JQtabView3')){JQtabViewNum = 2;}
	if($("ul.tab").hasClass('JQtabView4')){JQtabViewNum = 3;}
	if($("ul.tab").hasClass('JQtabView5')){JQtabViewNum = 4;}
	$('ul.tab').each(function(){
		var $active, $content, $links = $(this).find('a');

		$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[JQtabViewNum]);
		$active.parent("li").addClass('selected');
		$active.find('img').each(function(){
			$(this).attr('src', $(this).attr('src').replace('.gif', '_on.gif'));
		});

		$content = $($active[0].hash);

		$links.not($active).each(function () {
			$(this.hash).hide();
		});

		$(this).on('click', 'a', function(e){
			$active.parent("li").removeClass('selected');
			$active.find('img').each(function(){
				$(this).attr('src', $(this).attr('src').replace('_on.gif', '.gif'));
			});
			$content.hide();

			$active = $(this);
			$content = $(this.hash);

			$active.parent("li").addClass('selected');
			$active.find('img').each(function(){
				$(this).attr('src', $(this).attr('src').replace('.gif', '_on.gif'));
			});
			$content.show();

			e.preventDefault();
		});
	});
});

/* tab (over) */
$(function(){
	$('ul.tabOver').each(function(){
		var $active, $content, $links = $(this).find('a');

		$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
		$active.parent("li").addClass('selected');
		$active.find('img').each(function(){
			$(this).attr('src', $(this).attr('src').replace('.gif', '_on.gif'));
		});

		$content = $($active[0].hash);

		$links.not($active).each(function () {
			$(this.hash).hide();
		});

		$(this).on('mouseover', 'a', function(e){
			$active.parent("li").removeClass('selected');
			$active.find('img').each(function(){
				$(this).attr('src', $(this).attr('src').replace('_on.gif', '.gif'));
			});
			$content.hide();

			$active = $(this);
			$content = $(this.hash);

			$active.parent("li").addClass('selected');
			$active.find('img').each(function(){
				$(this).attr('src', $(this).attr('src').replace('.gif', '_on.gif'));
			});
			$content.show();

			e.preventDefault();
		});
	});
});

/* select box */
// select box -> listbox
// 사용 페이지에서 아래와 같이 호출 하여 사용한다.
// IfSel + selectbox아이디값(=ddlJCode2)
//function IfSelddlJCode2(val){
//    alert(val);
//}
$(window).load(function(){
	$.fn.customSelect = function(){
		function getRandomID() {
			var timeStamp = new Date().getTime();
			var randomStr = (Math.floor(Math.random() * timeStamp)).toString();
	
			return randomStr;
		}
	
		function getElementID( $obj ) {
			var objId = $obj.attr('id');
	
			if( !objId ) {
				objId = getRandomID();
				$obj.attr('id', objId);
			}

			return objId;
		}
	    
		this.each(function(idx) {
			var $select = $(this),
				$option = $select.children('option'),
				selectedText = '', optionHtml = '', _html = '',
				elId = getElementID( $select ),
				eventId = '.evtId_' + elId,
				$dsSelectBox, $selectText, $ul, $li;
			 
			(function makeCustomSelectHtml() {
				$.each($option, function() {
					var $thisOptionItem = $(this),
						name = $thisOptionItem.text() || '',
						value = $thisOptionItem.val(),
						isSelected = $thisOptionItem.prop('selected') || false,
						isDisabled = $thisOptionItem.prop('disabled') || false,
						className = isDisabled ? 'disabled' : isSelected ? 'selected' : '';
	                
//	                var onclick = "onclick=IfSel"+elId+"('"+value+"','"+name+"')";
	                var onclick = "onclick=IfSel"+elId+"('"+value+"')";
					optionHtml += '<li id="'+value+'" class="' + className + '"  data-value="'+value+'" value="'+value+'" '+onclick+' >' + name + '</li>';

				});
				
				if( selectedText === '' && $option.length > 0 ){
//					selectedText = $option.eq(0).text();    // 0번째 Selected 
                    var selectindex = $("#"+elId+" option").index($("#"+elId+" option:selected"));  // Selected된 index
                    selectedText = $option.eq(selectindex).text();
				}
	
				_html  = '<div class="dsSelectBox">';
				_html += '<div class="selectedText">' + selectedText + '</div>';
				_html += '<ul style="z-index:' + (999 - idx) + '" id=ul'+elId+'>' + optionHtml + '</ul>';
				_html += '</div>';
	
				$select.next('.dsSelectBox').remove();
				$select.after(_html);
				$select.hide();
	
				$dsSelectBox = $select.next('.dsSelectBox');
				$dsSelectBox.width($select.outerWidth(true));
	
				$selectText	= $dsSelectBox.children('.selectedText');
				$ul			= $dsSelectBox.children('ul');
				$li			= $ul.children('li');
			})();
	
			(function initEvent() {
				$dsSelectBox.off(eventId).on('mousedown' + eventId, function(){
					$('div.dsSelectBox').children('ul').not($ul).slideUp(100,'swing');
					$ul.slideDown(100,'swing');
				});
	
				$ul.children('li:not(.disabled)').off(eventId).on('click' + eventId, function(){
					var $this		= $(this);
					var thisValue	= $this.attr('data-value');
					var thisText	= $this.html();
	
					$li.removeClass('selected');
					$this.addClass('selected');
					$ul.slideUp(100,'swing');
					$selectText.html(thisText);
					$select.val(thisValue);
				});
	
				$select.off(eventId).on('change' + eventId, function(){
					var $this	= $(this);
					var index	= $this.children('option:selected').index();
	
					$li.eq( index ).trigger('click');
				});
	
				$select.on('click' + eventId, function(){
					$dsSelectBox.trigger('mousedown');
				});
	
				$('body').off(eventId).on('mouseup' + eventId, function(e){
					if( $dsSelectBox.size() === 0 ){
						$ul.slideUp(100,'swing');
					}
				});
	
				// 셀렉트 레이어 이외의 다른것을 click 시 열려있는 select 레이어 닫기
				$(document).off(eventId).on('click' + eventId, function(e) {
					var $target = $(e.target);
	
					if( !$target.hasClass('selectedText') ) {
						$ul.slideUp(100,'swing');
					}
				});
			})();
		});
	};
	$('.select_box').customSelect();
});

/* more view */
/*$(function(){ 아래 내용으로 변경 함
	$(".msgHover").hover(function(){
		$(this).next(".msgDetail").show();
	},function(){
		$(this).next(".msgDetail").hide();
	});
});*/
$(function () {
	$('.msgHover').on('mouseover focusin', function () {
		$(this).next(".msgDetail").show();
	});
	$('.msgHover').on('mouseout focusout', function () {
		$(this).next(".msgDetail").hide();
	});
});

/*$(function(){ jquery1.10.2.min.js을 사용하기 위해 아래 토글 형태로 변경함
	$(".msgToggle").toggle(function(){
		$(this).next(".msgDetail").show();
		$(this).addClass('selected');
	},function(){
		$(this).next(".msgDetail").hide();
		$(this).removeClass('selected');
	});
});*/

//$(function(){
//	$(".msgToggle").click(function(){
//		$(this).next(".msgDetail").toggle();
//		$(this).toggleClass("selected");
//	});
//});

function smView(obj, oimg, msg) {
	var obj = document.getElementById(obj);
	var oimg = document.getElementById(oimg);
	if(obj) {
		if(obj.style.display=='none' || obj.style.display=='') {
			obj.style.display='block';
			oimg.className='some';
			oimg.innerHTML = msg + " 닫기";
		} else {
			obj.style.display='none';
			oimg.className='more';
			oimg.innerHTML = msg;
		}
	}
}

function overChart(obj) { 
	document.getElementById(obj).className='corp_info_view';
}

function outChart(obj) { 
	document.getElementById(obj).className='corp_info_hide';
}

/* img rollover */
$(function(){
	$('.rollover>a>img').hover(function(){
		this.src=this.src.replace(".gif", "_on.gif");
	}, function(){
		this.src=this.src.replace("_on.gif", ".gif");
	});
});

/* add css */
$(function(){
	$('.addEven li:nth-child(2n)').addClass('even');
});

/* iframe resize */ 
function resizeFrame(iframeObj) {
	var innerBody = iframeObj.contentWindow.document.documentElement;
	oldEvent = innerBody.onclick;
	innerBody.onclick = function(){ resizeFrame(iframeObj, 1);oldEvent; };
	var innerHeight = innerBody.scrollHeight;
	iframeObj.style.height = innerHeight + "px";
}

/* 채용 검색 */
$(function(){
	$('.search_cate .arr').click(function(){
		$(this).prev('.list_ck').toggleClass('heightAuto');
		$(this).toggleClass('selected');
	});
});

$(function(){
	var article = $('.box_search');
	$(".box_search .bt_detail a").click(function(){
		article.find('#srcMore').toggle();
		$(this).toggleClass("selected");
	});
});

/* NCS 관심버튼 on/off */
$(function(){
	//체크박스 Class지정
	$(".ico_save input").click(function(){
		var chk = $(this).is(":checked");
		if(chk) $(this).parent().addClass("on");
		else  $(this).parent().removeClass("on");
	});
	//선택되어있는 체크박스 on클래스설정
	$(".ico_save input:checked").each(function() {
		var test = $(this).val();
		$(this).parent().addClass("on");
	});
});


/* etc */
function over(obj) { document.getElementById(obj).style.display='block'; }
function out(obj) { document.getElementById(obj).style.display='none'; }
function pop(url,name,w,h){ window.open(url,name,'width='+w+',height='+h+',scrollbars=no,status=1'); } //Popup(스크롤바없음)
function pops(url,name,w,h){ window.open(url,name,'width='+w+',height='+h+',scrollbars=yes'); } //Popup(스크롤바있음)

