
//검색시 제외문자 있는지 체크 return True, False - 2011.12.05 김일석
/*
			// SQLInjection 방지 스크립트 추가
			if($("#txtSearch").val() != '') {
				if(CheckWhiteStringJS($("#txtSearch").val()))
				{
					alert("검색제한문자가있습니다. 검색어를확인해주세요.");
					$("#txtSearch").focus();
					return false;
				}
			}
*/
function CheckWhiteStringSimpleObj(Obj) {
	if (Obj.val() != '') {
		if (CheckWhiteStringSimple(Obj.val())) {
			alert("입력제한문자가있습니다. 입력내용을 확인해주세요.");
			Obj.focus();
			return false;
		}
	}
}
function CheckWhiteStringJS(ChkVal) {
	var regex = /[^a-zA-Z0-9_,+:=|@!?&./\-\\\u00A0\u2028\u2029\%\\\u0020\u1100-\u11FF\u3130-\u3180\uAC00-\uD7AF|(){}]/;
	var chkFlg = regex.test(ChkVal);

	// 제외문자 체크 - 2013.2.6 이인재
	var IsBlockList = false;
	var arrExp = new Array(";", "/*", "*/", "-", "@", "=", "%"
		, "select", "where", "drop", "alter", "exec", "insert", "update", "delete", "xp_"
		, "'"
		, "<applet", "<embed", "<script", "<frameset", "<layer", "<link", "<meta", "<object");
	for (var i = 0; i < arrExp.length; i++) {
		if (ChkVal.toLowerCase().indexOf(arrExp[i]) > -1) {
			IsBlockList = true;
			break;
		}
	}

	return chkFlg || IsBlockList;
}
//입력시 제외문자 있는지 체크 (커뮤니티)
function CheckWhiteStringSimple(ChkVal) {
	// 제외문자 체크 - 2013.2.6 이인재
	var IsBlockList = false;
	var arrExp = new Array("/*", "*/", "--", "script"
		, "select", "where", "drop", "alter", "exec", "insert", "update", "delete", "xp_", "'");
	for (var i = 0; i < arrExp.length; i++) {
		if (ChkVal.toLowerCase().indexOf(arrExp[i]) > -1) {
			IsBlockList = true;
			break;
		}
	}
	return IsBlockList;
}

// Get parameter values from href in jquery
function getURLParameter(url, name) {
	return (RegExp(name + '=' + '(.+?)(&|$)').exec(url) || [, null])[1];
}

// 신규검색어
var KeyPrev = '';
function SearchKeyView() {
	// 키워드 없으면 검색목록 숨기고 종료
	if ($.trim($("#txtKeyword").val()) == "") {
		$(".userSearchKey").hide();
		return;
	}
	// 한글완성 아니면 리턴
	// 이전과 같은 키워드이면 리턴
	var KeyNew = CheckHanCompStr($.trim($("#txtKeyword").val()));
	if (KeyNew == '' || KeyPrev == KeyNew) return;
	KeyPrev = KeyNew;
	// 파라미터 설정
	var param = {
		Keyword: KeyNew,
		TopN: 5,
		CacheGet: $("#txtCacheGet").val()
	};
	//alert(JSON.stringify(param));

	// 회원이면 설정값 저장, 비회원이면 cookie 셋팅 (ajax로)
	$.ajax({
		async: false,
		url: '/Search/SearchList.aspx/SearchKeyGet',
		type: 'post',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(param),
		dataType: 'json',
		success: function (d) {
			//alert(d.d.Result);
			if (d.d.Result == "") $(".userSearchKey").hide();
			else {
				$("ul[class=userSearchKey]").html(d.d.Result);
				$(".userSearchKey").show();
				//console.log(d.d.TimeDiff);
			}
		},
		error: function (request, status, error) {
			alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
			//alert('에러가 발생했습니다.');
		}
	});
}

// 최근검색어
function RecentSearchKeyView() {
	var param = {
	};
	//alert(JSON.stringify(param));

	// 회원이면 설정값 저장, 비회원이면 cookie 셋팅 (ajax로)
	$.ajax({
		async: false,
		url: '/Search/SearchList.aspx/RecentSearchKeyGet',
		type: 'post',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(param),
		dataType: 'json',
		success: function (d) {
			//alert(d.d.Result);
			if (d.d.Result == "") $(".userRecentSearch").hide();
			else {
				$("ul[class=userRecentSearch]").html(d.d.Result);
				$(".userRecentSearch").show();
			}
		},
		error: function (xhr, textStatus, errorThrown) { }
	});
}

// 한글 완성형 체크
function CheckHanComp(v) {
	var Res = '';
	for (var i = 0; i < v.length; i++) {
		var chr = v.substr(i, 1);
		chr = escape(chr);
		if (chr.charAt(1) == "u") {
			chr = chr.substr(2, (chr.length - 1));
			if ((chr < "AC00") || (chr > "D7A3"))
				return false;
		}
		else {
			return false;
		}
	}
	return true;
}
// 한글 완성형 체크하고 && 한글여부체크하여 문자열 추출 (한글 아닌것은 그대로 한글은 완성형만)
function CheckHanCompStr(v) {
	var Res = '';
	for (var i = 0; i < v.length; i++) {
		var ch = v.substr(i, 1);
		if (!is_hangul_char(ch)) Res += ch;
		else {
			var chr = escape(ch);
			if (chr.charAt(1) == "u") {
				chr = chr.substr(2, (chr.length - 1));
				if (!((chr < "AC00") || (chr > "D7A3")))
					Res += ch;
			}
		}
	}
	
	return Res;
}
function is_hangul_char(ch) {
	c = ch.charCodeAt(0);
	if (0x1100 <= c && c <= 0x11FF) return true;
	if (0x3130 <= c && c <= 0x318F) return true;
	if (0xAC00 <= c && c <= 0xD7A3) return true;
	return false;
}

// link target _blank 
function LinkTargetBlank(JindanURL) {
	// insert an <a> into document and click it **natively**
	// (.get(0) returns the DOM element)
	//alert(JindanURL);
	$('<a id="fred99" />').prop('href', JindanURL).prop('target', '_blank').text('LINK').appendTo('body').get(0).click();
	// now we've clicked, tidy up
	$('#fred99').remove();
}

//==============================================================================================================
// 개발단에서 추가한 부분
//==============================================================================================================
// .. ==> . 으로 변경 후 문자수 체크
function ReplaceEnd(objStr,str1,str2) {
	objStr = objStr.replace(str1,str2);
	while (objStr.indexOf(str1) > -1) {
		objStr = objStr.replace(str1, str2);
	}
	return objStr;
}

//--------------------------------------------------------------------------------------------------------------
// 함수명 : NoSpacebar
// 작성자 : amadas
// 작성일 : 2014.10.24
// 설명   : Spacebar 사용불가
//--------------------------------------------------------------------------------------------------------------

function NoSpacebar()
{ 
    if (event.keyCode == 32)
    {
        alert('Spacebar 입력 불가능합니다.');
        event.returnValue = false;
    }      
}


//--------------------------------------------------------------------------------------------------------------
// 함수명 : onlyNumber
// 작성자 : amadas
// 작성일 : 2014.10.24
// 설명   : 숫자만 입력가능
//--------------------------------------------------------------------------------------------------------------

function onlyNumber() 
{
    var objEv = event.srcElement;
    if (event.keyCode != 13)
    {
        if (event.keyCode != 13 && (event.keyCode < 48) || (event.keyCode > 57))
        {
            alert('숫자만 입력 가능합니다.');
            objEv.value = "";
            objEv.focus();
            return false;
        }
    }
}


//--------------------------------------------------------------------------------------------------------------
// 함수명 : ChkKeyCode
// 작성자 : amadas
// 작성일 : 2014.10.24
// 설명   : 한글, 영문만 입력가능
//--------------------------------------------------------------------------------------------------------------

function ChkKeyCode()
{
    if ( event.keyCode < 65 || (event.keyCode > 122 && event.keyCode <= 127) )
    {
        alert('한글 또는 영문만 입력가능합니다.');
        event.returnValue = null;
        return;
    }        
}


//--------------------------------------------------------------------------------------------------------------
// 함수명 : ChkKeyCodeAll
// 작성자 : amadas
// 작성일 : 2014.10.24
// 설명   : 한글, 영문, 숫자만 입력가능
//--------------------------------------------------------------------------------------------------------------

function ChkKeyCodeAll()
{
    if (!((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123) || (event.keyCode > 44031 && event.keyCode < 55203) || (event.keyCode>12592 && event.keyCode < 12644)))
    {
        alert('한글, 영문, 숫자만 입력가능합니다.');
        event.returnValue = null;
        return;
    }        
}


//--------------------------------------------------------------------------------------------------------------
// 함수명 : fnDateDiff
// 작성자 : shko
// 작성일 : 2014.11.10
// 설명   : 날짜 시작일 종료일 check
//--------------------------------------------------------------------------------------------------------------
function fnDateDiff(startdate, enddate) {
    var day = 0;
    if (enddate && startdate) {
        if (enddate - startdate < 0) {
            alert("종료일자가 시작일자보다 이전일 수 없습니다");
            return day;
        }
        else {
            day = ((enddate.getTime() - startdate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        }
    }
    else {
        alert("시작일 종료일 모두 입력하세요");
    }
    return day;
}

//--------------------------------------------------------------------------------------------------------------
// 함수명 : fnDateDiff
// 작성자 : shko
// 작성일 : 2014.11.10
// 설명   : textbox focus out 시 콤마처리
//          textbox  focusout='fnNumberFormat(this);'
//--------------------------------------------------------------------------------------------------------------
function fnNumberFormat(obj){
     // 포커스 나갈때 콤마처리
     $(obj).val($(obj).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));     
}


//--------------------------------------------------------------------------------------------------------------
// 함수명 : fnOpenSearchPop
// 작성자 : shko
// 작성일 : 2014.11.15
// 설명   : 공통Popup : return값을 받을 부모창 controlid 값을 가지고 간다.
//--------------------------------------------------------------------------------------------------------------
function fnOpenSearchPop(gubun, controlid1, controlid2)
{
    var params = "?controlid1=" + controlid1 + "&controlid2=" + controlid2;
    if (gubun == '자격증')
    {   
        pops("/Popup/Popup_BaseLicenseCode.aspx" + params, "Popup_BaseLicenseCode" , "380", "380");
    }
}

//--------------------------------------------------------------------------------------------------------------
// 함수명 : fnSetSelectBox
// 작성자 : shko
// 작성일 : 2014.11.15
// 설명   : SelectBox 바인딩 
//--------------------------------------------------------------------------------------------------------------
function fnSetSelectBox(tableid, controlid, arraydata) {

    var select = $('#' + tableid).find('#' + controlid);
    if (select.prop) {
        var options = select.prop('options');
    }
    else {
        var options = select.attr('options');
    }
    $('option', select).remove();

    options[options.length] = new Option('선택', '', true, true);

    $.each(arraydata, function (val, text) {
        options[options.length] = new Option(text.name, text.code);
    });
}
    
//--------------------------------------------------------------------------------------------------------------
// 함수명 : fnCutLastString
// 작성자 : shko
// 작성일 : 2014.11.15
// 설명   : 마지막 문자만 자른다
//--------------------------------------------------------------------------------------------------------------
function fnCutLastString(str)
{
    var ret = str;
    if(ret.length > 0)
    {
        ret = ret.substring(0, (ret.length - 1)); 
    }        
    return ret;
}

function fnCutLastTwoString(str)
{
    var ret = str;
    if(ret.length > 0)
    {
        ret = ret.substring(0, (ret.length - 2)); 
    }        
    return ret;
}

//--------------------------------------------------------------------------------------------------------------
// 함수명 : fnAddZeros
// 작성자 : shko
// 작성일 : 2014.11.15
// 설명   : 넘어온 숫자 앞에 0 붙이기
//            leadingZeros('5', '2') --> '05', leadingZeros('5', '3') --> '005'
//--------------------------------------------------------------------------------------------------------------
function fnAddZeros(num, digits) {
	var zero = '';
	num = num.toString();

	if (num.length < digits) {
		for (i = 0; i < digits - num.length; i++)
			zero += '0';
	}
	return zero + num;
}


//--------------------------------------------------------------------------------------------------------------
// 함수명 : limitCharacters
// 작성자 : 99ani
// 작성일 : 2014.11.19
// 설명   :  글자 수 제한
//   예 : id가  txtComment인 textarea 200자 글 제한 =>  $("#txtComment").bind("keydown keyup keypress", function() {limitCharacters('txtComment', 200, 'limit2');	});
//--------------------------------------------------------------------------------------------------------------
function limitCharacters(textid, limit, limitid){        // 잆력 값 저장        
	var text = $('#'+textid).val(); // 입력값 길이 저장        
	var textlength = text.length;        
		if(textlength > limit){
			$('#' + limitid).html('('+ (limit - textlength) +' / '+ (limit) +')');
			$('#'+textid).val(text.substr(0,limit));
			alert(limit+'자 이하로 작성해 주세요.');
			return;
		}else{
			$('#' + limitid).html('('+ (limit - textlength) +' / '+ (limit) +')');
			return;
		}
	}
	
	
//--------------------------------------------------------------------------------------------------------------
// 함수명 : fnChangeReadOnly
// 작성자 : shko
// 작성일 : 2014.11.20
// 설명   : inputbox readonly 처리 input text 전용
//--------------------------------------------------------------------------------------------------------------
function fnChangeReadOnly(controlid, bool) {

    if(bool)
    {
        $('#' + controlid).attr('readonly', true);
        $('#' + controlid).val('');
    }
    else
    {
        $('#' + controlid).attr('readonly', false);
        
        // 날짜(년도, 월) controlid
        if ( controlid == "txtMilitaryStartY" || controlid == "txtMilitaryEndY" )
        {
            $('#' + controlid).val('년도');
        }
        else if ( controlid == "txtMilitaryStartM" || controlid == "txtMilitaryEndM" )
        {
            $('#' + controlid).val('월');
        }
    }
}

//--------------------------------------------------------------------------------------------------------------
// 함수명 : fnChangeDisabled
// 작성자 : shko
// 작성일 : 2014.11.20
// 설명   : control disabled 처리 
//--------------------------------------------------------------------------------------------------------------
function fnChangeDisabled(controlid, bool) {

    if(bool)
    {
        $('#' + controlid).attr('disabled', true);
        $('#' + controlid).val('');
    }
    else
    {
        $('#' + controlid).attr('disabled', false);
    }
}


//--------------------------------------------------------------------------------------------------------------
// 함수명 : CompPopupGuideView
// 작성자 : 99ani
// 작성일 : 2014.11.26
// 설명   : 기업개요 > 가이드 공통Popup 
//--------------------------------------------------------------------------------------------------------------

function CompPopupGuideView(CategoryGubun)
{
    if ( CategoryGubun == "형태규모" )
    {
        pops("../../assets/popup/Popup_CompTypeGuide.html", "Popup_CompTypeGuide" , "470", "450");
    }
    else if ( CategoryGubun == "안정성" )
    {
        pop("../../assets/popup/Popup_CompStableGuide.html", "Popup_CompStableGuide" , "470", "470");
    }
    else if ( CategoryGubun == "성장성" )
    {
        pops("../../assets/popup/Popup_CompGrowGuide.html", "Popup_CompGrowGuide" , "470", "450");
    }
    else if ( CategoryGubun == "수익성" )
    {
        pops("../../assets/popup/Popup_CompProfitGuide.html", "Popup_CompProfitGuide" , "470", "450");
    }

}


//--------------------------------------------------------------------------------------------------------------
// 함수명 : IfScrap
// 작성자 : 99ani
// 작성일 : 2014.11.26
// 설명   : 스크랩 공통
// 사용 방법 : 관심 수<strong id='ScrapCount1'>0</strong> <a href='javascript:IfScrap('Gubun', 'Contents', '1');'>+관심</a> 
// Gubun : 1:기업 2:직무 3:채용공고 4:뉴스
// Contents : CompID, BaseJobCategory_Code, ApplyNotice_ApplyID
// Count : ScrapCount가 ""이거나 값이 있으면 해당 아이디를 갖는 ScrapCount + 1
//             X면 관심등록 만..         PR이면 parent.location.reload()
// login 상태가 아니면 로그인 팝업
//--------------------------------------------------------------------------------------------------------------      
function IfScrap(Gubun, Contents, Count, obj) {
	//event = event || window.event;
	//var source = event.target || event.srcElement;
	//alert(obj.childNodes[0].src);

            $.ajax({
	            type: "GET",
	            async: false,   		           
	            url: "/Controls/ajax_Scrap.aspx",
	            data:  "Gubun="+Gubun+"&Contents="+Contents,		          
	            success: function (result2) {
	            	//alert(result2);
	            	var result = '', Cnt = 0;
	            	var arrResult = result2.split(':');
	            	if (arrResult.length == 1) result = arrResult[0];
	            	else if (arrResult.length >= 1) { result = arrResult[0]; Cnt = arrResult[1]; }

	                if(result =="NoLogin"){
	                    //alert('로그인이 필요합니다');
	                	//pops('/Popup/Popup_Login.aspx','로그인','330','360');
	                	// /Comp/Controls/ifrmCompList.aspx
	                	// /Comp/Controls/ifrmRecomList.aspx?flag=Finance Review ==> /Comp/RecomFinance.aspx /Comp/RecomReview.aspx
						if (requestURL.indexOf("/Comp/Controls/ifrmCompList.aspx") > -1) top.location.href = '/Member/Login.aspx?ReturnURL=/Comp/CompMajor.aspx';
						else if (requestURL.indexOf("/Comp/Controls/ifrmRecomList.aspx?flag=Finance") > -1) top.location.href = '/Member/Login.aspx?ReturnURL=/Comp/RecomFinance.aspx';
						else if (requestURL.indexOf("/Comp/Controls/ifrmRecomList.aspx?flag=Review") > -1) top.location.href = '/Member/Login.aspx?ReturnURL=/Comp/RecomReview.aspx';
						else top.location.href = '/Member/Login.aspx?ReturnURL=' + requestURL;
	                    return;  
	                }
	                
	                if (result == 'CompLogin'){ //기업회원은 관심등록 하지 못한다.
	                    alert("관심등록은 일반 회원만 가능합니다.");
	                    return;  
	                }
	                
	                if(result == "Y"){
	                    //alert('관심등록이 완료 되었습니다.');
	                	//
	                    if (obj != null) {
	                    	//obj.children(0).src = obj.children(0).src.replace('ico_type4_01', 'ico_type4_01_on').replace('ico_type2_01', 'ico_type2_01_on');
	                    	obj.childNodes[0].src = obj.childNodes[0].src.replace('ico_type4_01', 'ico_type4_01_on').replace('ico_type2_01', 'ico_type2_01_on').replace('ico_type2_04', 'ico_type2_04_on');
	                    }
	                	//
	                    if ($(".btn_like")) {
	                    	$(".btn_like").css('background-image', "url(http://image.jinhak.com/job/corp/ico_like03_on.png)");
	                    	$(".btn_like").text(Cnt);
	                    	//alert($(".btn_like").text());
	                    }

	                    //if(Count == "X"){
    	                //}else if(Count == "PR"){    	                        	                      
    	                //    parent.location.reload();  
    	                //}else {
	                    //    //var sCount = parseInt($("#ScrapCount"+Count).text());  	       
    	                //    $("#ScrapCount"+Count).text(Count);
    	                //}

	                    return;  
	                }  
	              
	                if (result == "N") {
	                	if (obj != null) {
	                		//if (Gubun=='3') alert('관심기업에서 삭제되었습니다.');
	                		//obj.children(0).src = obj.children(0).src.replace('ico_type4_01_on', 'ico_type4_01').replace('ico_type2_01_on', 'ico_type2_01');
	                		obj.childNodes[0].src = obj.childNodes[0].src.replace('ico_type4_01_on', 'ico_type4_01').replace('ico_type2_01_on', 'ico_type2_01').replace('ico_type2_04_on', 'ico_type2_04');
						}
	                	//else alert('이미 관심 등록 되었습니다.');
	                	//
	                	if ($(".btn_like")) {
	                		$(".btn_like").css('background-image', "url(http://image.jinhak.com/job/corp/ico_like03.png)");
	                		$(".btn_like").text(Cnt);
	                		//alert($(".btn_like").text());
	                	}

	                    return;  
	                }  
	                if(  result == "X" ){
	                    alert('스크랩 도중 오류가 발생하였습니다.\n\n담당자에게 문의 바랍니다.');
	                    return;  
	                }  	                
	            },
	            error: function(xhr, textStatus, errorThrown){
	                alert("error");
	            }
            });           
}

function IfScrapView(Gubun, Contents, Count, obj) {
	$.ajax({
		type: "GET",
		async: false,
		url: "/Controls/ajax_Scrap.aspx",
		data: "Gubun=" + Gubun + "&Contents=" + Contents + "&Mode=View",
		success: function (result2) {
			//alert(result2);
			var MyCnt = 0, Cnt = 0;
			var arrResult = result2.split(':');
			MyCnt = arrResult[0]; Cnt = arrResult[1];
			
			if (MyCnt > 0) {
				//alert('관심등록이 완료 되었습니다.');
				//
				if (obj != null) {
					obj.childNodes[0].src = obj.childNodes[0].src.replace('ico_type4_01', 'ico_type4_01_on').replace('ico_type2_01', 'ico_type2_01_on').replace('ico_type2_04', 'ico_type2_04_on');
				}
				//
				if ($(".btn_like")) {
					$(".btn_like").css('background-image', "url(http://image.jinhak.com/job/corp/ico_like03_on.png)");
					$(".btn_like").text(Cnt);
					//alert($(".btn_like").text());
				}
			}
			else {
				if (obj != null) {
					//if (Gubun=='3') alert('관심기업에서 삭제되었습니다.');
					//obj.children(0).src = obj.children(0).src.replace('ico_type4_01_on', 'ico_type4_01').replace('ico_type2_01_on', 'ico_type2_01');
					obj.childNodes[0].src = obj.childNodes[0].src.replace('ico_type4_01_on', 'ico_type4_01').replace('ico_type2_01_on', 'ico_type2_01').replace('ico_type2_04_on', 'ico_type2_04');
				}
				if ($(".btn_like")) {
					$(".btn_like").css('background-image', "url(http://image.jinhak.com/job/corp/ico_like03.png)");
					$(".btn_like").text(Cnt);
					//alert($(".btn_like").text());
				}

			}

		},
		error: function (xhr, textStatus, errorThrown) {
			alert("error");
		}
	});
}


//--------------------------------------------------------------------------------------------------------------
// 함수명 : SearchData
// 작성자 : ijlee
// 작성일 : 
// 설명   :  우편번호 검색 open
//--------------------------------------------------------------------------------------------------------------      
    function SearchData(gubun, objects, setFocus)
    {
        var arrObj = objects.split('#'); // 넘어온 객체들을 배열로 담는다.
        var url = '';
        var width, height;
        var scroll = 'no';
        if (gubun == 'post') { // 우편번호 검색
            //url = '/Member/Controls/SearchPostRoadName.aspx';  
			url = '/Popup/Popup_ZipCode.aspx';
			width = "428px";height="455px";
			scroll = 'yes';
        }
        
//        // IE일 경우에만 모달로 열어준다.
//        if ($.browser.msie && gubun != 'post')
//        {
//			var returnValues = window.showModalDialog(url, window, 'dialogWidth:' + width + '; dialogHeight:' + height + '; dialogTop:100px; dialogLeft:100px; scroll:'+scroll+';status:no;help:no;');
//			
//			// 받아온 값을 객체들에 넣어주기
//			if (returnValues != null)
//			{
//				for (var i=0; i<arrObj.length; i++)
//				{
//					// 존재하는 객체에만 값 넣기.
//					if (arrObj[i] != "" && $("#"+arrObj[i]) != undefined && $("#"+arrObj[i]) != null)
//						$("#"+arrObj[i])[0].value = returnValues[arrObj[i].replace('txt','').replace('Mem','').replace('hid','').replace('Re','')];
//					//AddressEtc, SiGunCode					
//				}
//			}
//		}
//		else
//        {
			var win = window.open(url, "JinhakPopPost", 'width=' + width + ', height=' + height + ', scroll=no, resizable=no');
			if (win.focus) win.focus();
//        }
        
        // 포커스를 주고 싶은게 있다면..
        if (setFocus != null && setFocus != "" && setFocus != "undefined" && gubun != 'post')
			$("#"+setFocus)[0].focus();
    }
      

    //--------------------------------------------------------------------------------------------------------------
    // 함수명 : IfScrap
    // 작성자 : 99ani
    // 작성일 : 2014.11.26
    // 설명   : 아이디 저장 관련 함수
    //          로그인 ID는 txtJobID,  PW는 txtJobPwd로 맞춘다 
    //--------------------------------------------------------------------------------------------------------------     

    // 화면 로드시 아이디
    // Gubun =1 로그인 팝업 , Gubun = 2 : 메인 
    function getLogin(Gubun) {
        
    // userid 쿠키에서 id 값을 가져온다.
        var cook = document.cookie + ";";
        var idx = cook.indexOf("userid", 0);
        var val = "";

        if (idx != -1) {
            cook = cook.substring(idx, cook.length);
            begin = cook.indexOf("=", 0) + 1;
            end = cook.indexOf(";", begin);
            val = unescape(cook.substring(begin, end));
        }

        // 가져온 쿠키값이 있으면        
        if (val != "") {
            if(Gubun == "2"){
                if ( $("#uc_Login1_txtJobID").length > 0 ) { //로그인 후에는 객체를 찾지 못해 오류가 나므로, 로그인 폼이 있을 경우만 체크
                    document.getElementById("uc_Login1_txtJobID").value = val;
                    document.getElementById("uc_Login1_txtJobID").style.background="#FFF";    
                }            

            }  
            else{    
                if ( $("#txtJobID").length > 0 ) {                    
                    document.getElementById("txtJobID").value = val;
                    document.getElementById("txtJobID").style.background="#FFF";  
                }
            }  

            if ( $("#idsave").length > 0 ) {                                
                document.getElementById("idsave").checked = true;
            }  
        }
    }   
    
     
   
       
    function confirmSave(checkbox)
    {
        var isRemember;

        if(checkbox.checked)
        {
            isRemember = confirm("이 PC에 로그인 정보를 저장하시겠습니까? PC방등의 공공장소에서는 개인정보가 유출될 수 있으니 주의해주십시오.");
            if(!isRemember)
            checkbox.checked = false;
        }
    }   
  
    function setsave(name, value, expiredays)
    {
        var today = new Date();
        today.setDate( today.getDate() + expiredays );
        document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";"
    }    
  
    function saveLogin(id)
    {
        if(id != "")
        {
            // userid 쿠키에 id 값을 7일간 저장
            setsave("userid", id, 7);
        }else{
            // userid 쿠키 삭제
            setsave("userid", id, -1);
        }
    }  
       
    //--------------------------------------------------------------------------------------------------------------
    // 함수명 : OnFailed
    // 작성자 : shko
    // 작성일 : 2015.01.18
    // 설명   : PageMethods : 공통 오류 처리
    //--------------------------------------------------------------------------------------------------------------         
    function OnFailed(error)
    {      
        alert(error.get_message());
    }
  
	// getUrlParameter('action'); // "edit"
    function getUrlParameter(name) {
    	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    	var results = regex.exec(location.search);
    	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

	/* Example Uses */
	//console.log(isValidDate("0000-00-00"));  // false
	//console.log(isValidDate("2015-01-40"));  // false
    function isValidDate(dateString) {
    	var regEx = /^\d{4}-\d{2}-\d{2}$/;
    	if (!dateString.match(regEx)) return false;  // Invalid format
    	var d = new Date(dateString);
    	if (!d.getTime() && d.getTime() !== 0) return false; // Invalid date
    	return d.toISOString().slice(0, 10) === dateString;
    }

try {
	module.exports = {CheckHanCompStr: CheckHanCompStr};
} catch (e) {}