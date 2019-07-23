
$(document).ready(function () {
	var RecomCompCnt = 0;
	var CompUnivGubun = 'CompID'; // 기업/대학 구분
	var clsName = ''; // 클래스명
	$(".KeywordAuto21,.KeywordAuto22,.KeywordAuto23,.KeywordAuto31").autocomplete({
		source: function (request, response) {
			if (this.element[0].className.indexOf("KeywordAuto21") > -1) clsName = "KeywordAuto21";
			else if (this.element[0].className.indexOf("KeywordAuto22") > -1) clsName = "KeywordAuto22";
			else if (this.element[0].className.indexOf("KeywordAuto23") > -1) clsName = "KeywordAuto23";
			else if (this.element[0].className.indexOf("KeywordAuto31") > -1) clsName = "KeywordAuto31";
			CompUnivGubun = clsName == 'KeywordAuto31' ? "UnivCode":"CompID"
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
				StartWith: CompUnivGubun == 'CompID' ? '1':'',
				Gubun: CompUnivGubun
			};
			//alert(JSON.stringify(param));
			$.ajax({
				url: '/CatchDot/MyCatchDot.aspx/SearchKeyJustGet',
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
			if (clsName == 'KeywordAuto21') { $("#CompID1").val(i.item.val); $("#CompName1").val(i.item.value); }
			else if (clsName == 'KeywordAuto22') { $("#CompID2").val(i.item.val); $("#CompName2").val(i.item.value); }
			else if (clsName == 'KeywordAuto23') { $("#CompID3").val(i.item.val); $("#CompName3").val(i.item.value); }
			else if (clsName == 'KeywordAuto31') { $("#UnivCode").val(i.item.val); $("#UnivName").val(i.item.value); }
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
		//console.log('className=' + this.className + ' idx='+idx);
		$(this).data("autocomplete")._renderItem = function (ul, item) {
			//IsCookie[idx] = '', IsCookieFirst[idx] = '', RecomCompCnt = 0;
			//console.log('idx='+idx+' IsCookie[idx]=' + IsCookie[idx]);
			//console.log(item.value + ' ' + item.label);
			// highlighting the typed words
			// item.label
			// 한글완성형 있을때만 highlighting
			var termComplete = CheckHanCompStr(this.term);
			var newText = item.label;
			try {
				if (termComplete != '') newText = String(item.label).replace(new RegExp(termComplete, "gi"), "<span color='red'>$&</span>");
			}
			catch (e) { }

			return $("<li></li>").data("item.autocomplete", item).append("<a>" + newText + "</a>").appendTo(ul);
		};
	});

	// 
	//$(".KeywordAuto3").autocomplete("option", "minLength", 1);

	$(".KeywordAuto21,.KeywordAuto22,.KeywordAuto23,.KeywordAuto31").focus(function () {
		// ,.KeywordAuto2,.KeywordAuto3
		//console.log('focus');
		$(this).autocomplete('search');
	});

});