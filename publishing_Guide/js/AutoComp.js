
$(document).ready(function () {
	var IsCookie = ['', '', ''], IsCookieFirst = ['', '', ''], RecomCompCnt = 0, idx = 0;
	$("#txtKeyword").autocomplete({
		source: function (request, response) {
			//IsCookie = ''; IsCookieFirst = ''; // 쿠키제크 초기화
			IsCookie = ['', '', '']; IsCookieFirst = ['', '', ''];
			//console.log('className='+this.className);
			// 한글완성 아니면 리턴
			// 이전과 같은 키워드이면 리턴
			var KeyNew = $.trim(request.term); //$.trim($("#txtKeyword").val()); //CheckHanCompStr($.trim($("#txtKeyword").val()));
			if ((KeyNew == '검색' || KeyNew == '기업명 검색' || KeyNew == '기업명을 입력해주세요') && document.location.href.toLowerCase().indexOf('/search/') == -1) return;
			//if (KeyPrev == KeyNew) { response(ResultPrev); return; }
			//KeyPrev = KeyNew;
			//console.log('focus2');
			//$('#txtKeyword').val('').val(KeyNew);
			// 파라미터 설정 CacheGet:1/0(캐시사용,미사용), StartWith:1/0(like 'A%', like '%A%')
			var param = {
				Keyword: KeyNew,
				TopN: 10,
				CacheGet: 1,
				StartWith: 1
			};
			//alert(JSON.stringify(param));
			$.ajax({
				url: '/Search/SearchList.aspx/SearchKeyGet',
				data: JSON.stringify(param),
				dataType: "json",
				type: "POST",
				contentType: "application/json; charset=utf-8",
				success: function (data) {
					//ResultPrev = data.d.Result;
					// console.log(data.d.TimeDiff + ' ' + data.d.pattern);
					RecomCompCnt = data.d.RecomCompCnt;
					//response(data.d.Result);
					response($.map(data.d.Result, function (item) {
						return {
							label: item.split('-')[0],
							val: item.split('-')[1]
						}
					}))
				},
				error: function (response) {
					alert(response.responseText);
				},
				failure: function (response) {
					alert(response.responseText);
				}
			});
		},
		select: function (e, i) {
			//console.log(i.item.val + ' ' + i.item.value + ' ' + i.item.label);
			//$("[id$=hfCustomerId]").val(i.item.val);
			if (i.item.val == i.item.label) location.href = "/Search/SearchList.aspx?Keyword=" + encodeURIComponent(i.item.label);
		},
		// input box에 한글문자를 입력하고 나온 리스트에서 방향키를 사용하여 선택하려고 할 때 리스트목록이 변경됨 해결 방법
		focus: function (event, ui) {
			return false;
			//또는
			//event.preventDefault();
		},
		minLength: 0
	})
	.each(function() {
		idx = 0;
		if (this.className.indexOf('KeywordAuto2') > -1) idx = 1;
		else if (this.className.indexOf('KeywordAuto3') > -1) idx = 2;
		//console.log('className=' + this.className + ' idx='+idx);
		$(this).data("autocomplete")._renderItem = function (ul, item) {
			//IsCookie[idx] = '', IsCookieFirst[idx] = '', RecomCompCnt = 0;
			//console.log('idx='+idx+' IsCookie[idx]=' + IsCookie[idx]);
			//console.log(item.value + ' ' + item.label);
			if (item.value == '최근검색어') {
				IsCookie[idx] = '1';
				return $('');
				//item.value = '';
				//return $('<li class="ui-menu-item recom"></li>').data("item.autocomplete", item).append('<span>' + item.label + '</span>').appendTo(ul);
			} else {
				// highlighting the typed words
				// item.label
				// 한글완성형 있을때만 highlighting
				var termComplete = CheckHanCompStr(this.term);
				var newText = item.label;
				try {
					if (termComplete != '') newText = String(item.label).replace(new RegExp(termComplete, "gi"), "<span color='red'>$&</span>");
				}
				catch (e) { }

				if (IsCookie[idx] == '1') {
					//if (idx != 0) return $('');

					// 최근검색어 기본스타일, 최초스타일
					var liObj = $('<li></li>').data("item.autocomplete", item).append("<a href='/Comp/CompSummary.aspx?CompID=" + item.val + "'>" + item.label + " <span>바로가기 &gt;</span></a>");
					var liObjFirst = $('<li class="ui-menu-item recom"></li>').data("item.autocomplete", item).append("<a href='/Comp/CompSummary.aspx?CompID=" + item.val + "'>" + item.label + " <span>바로가기 &gt;</span></a>");

					if (IsCookieFirst[idx] == '') {
						IsCookieFirst[idx] = '1';
						// 최근검색어 처음일때만 recom 스타일 적용
						// 추천검색어 없을때는 기본스타일
						var liObj2 = liObjFirst;
						if (RecomCompCnt == 0) liObj2 = liObj;
						return liObj2.appendTo(ul);
					}
					else
						return liObj.appendTo(ul);
				}
				else
					return $("<li></li>").data("item.autocomplete", item).append("<a>" + newText + "</a>").appendTo(ul);
			}
		};
	});

	// 
	//$(".KeywordAuto2,.KeywordAuto3").autocomplete("option", "minLength", 1);

	$("#txtKeyword").focus(function () {
		// ,.KeywordAuto2,.KeywordAuto3
		//console.log('focus');
		$(this).autocomplete('search');
	});

});