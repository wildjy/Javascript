//숫자만입력
function OnlyNumber(){
    if(event.keyCode < 48  || event.keyCode > 57){
        event.returnValue = false;
    }
}

// 영문과 숫자로만 입력되었는지 체크
// objID: input DOM 객체 / string 입력 가능
function checkNotHangul(objID)
{
    if (typeof objID === 'object') {
        objID = objID.value;
    }

    if (typeof objID !== 'string') {
        objID = '';
    }

    // 아이디는 4~12자 이내로 .. 영문과 숫자만 입력가능.
	var valid = "abcdefghijklmnopqrstuvwxyz0123456789"
	var ok = true;
	var temp;
	for (var i=0; i<objID.length; i++) 
	{
		temp = "" + objID.substring(i, i+1);
		if (valid.indexOf(temp) == "-1") 
			ok = false;
	}
	return ok;
}

// 숫자로만 입력되었는지 체크
function checkOnlyNumber(objID)
{
    // 숫자만 입력가능.
	var valid = "0123456789"
	var ok = true;
	var temp;
	for (var i=0; i<objID.value.length; i++) 
	{
		temp = "" + objID.value.substring(i, i+1);
		if (valid.indexOf(temp) == "-1") 
			ok = false;
	}
	return ok;
}

function checkPasswordLength(upw)
{
	if(upw.value.length >= 12) {
		alert("비밀번호는 최대 12자리까지 입력 가능합니다.");
		event.returnValue = false;
	}
}

// 비밀번호체크
function checkPwdID(objID,objPWD)
{
	if(objID.value=="")
	{
	   alert("아이디를입력하세요.");
	   objID.focus();
	   return false;    
	}else
	{
		// 아이디 입력성공이 아니면 리턴 ... 2015.6.10 이인재
		if ($("#hidNoDup").val() != 'Y') return false;
		
		if (objPWD.value != "" && !checkNotHangulPassword(objID.value, objPWD.value))
		{
//		    alert(objID.value + "\n" + objPWD.value)
			objPWD.value = "";
			objPWD.focus();
			return false;
		}
	}
    
	return true;
}


// 비밀번호체크
function checkPwdIDChg(objID,objPWD)
{
	if(objID.value=="")
	{
	   alert("아이디를입력하세요.");
	   objID.focus();
	   return false;    
	}else
	{
		// 아이디 입력성공이 아니면 리턴 ... 2015.6.10 이인재
		//if ($("#hidNoDup").val() != 'Y') return false;
		
		if(!checkNotHangulPassword(objID.value,objPWD.value))
		{
//		    alert(objID.value + "\n" + objPWD.value)
			objPWD.value = "";
			objPWD.focus();
			return false;
		}
	}
    
	return true;
}

//패스워드 체크 스크립트 (argumnets.length == 1 일 경우, 추가)
function checkNotHangulPassword(uid, upw) 
{
    if(arguments.length == 1) {
        upw = uid;
    }
    var chk_num = upw.search(/[0-9]/g); 
    var chk_eng = upw.search(/[a-zA-Z]/g);
    //var chk_engL = upw.search(/[a-z]/g);
    //var chk_engU = upw.search(/[A-Z]/g);
    var chk_sp = upw.search(/[!@#$\%\^&\*()\_]/g);	//12가지
    var chk = 0;
    if(chk_num < 0) chk = chk + 1;
    if(chk_eng < 0) chk = chk + 1;
    //if(chk_engU < 0) chk = chk + 1;
    if(chk_sp < 0) chk = chk + 1;

	//특수문자 체크
	if( upw.search(/[\<\>]/g) > -1 || upw.indexOf("&#") >= 0)
	{
		alert('특수문자(<, >, &#)는 비밀번호에 사용할 수 없습니다.'); 
        return false;
	}
	
	//var regex=/^[0-9A-Za-z]{8,12}$/;if(!regex.test(upw))
	if(!/^[a-zA-Z0-9!-_]{8,12}$/.test(upw))
	{ 
		alert('비밀번호는 8~12자리를 사용해야 합니다.(단, 2가지 조합일 경우 10~12자리)'); 
		return false;
	}
	
	if(chk == 1)	//3개중 2개일 경우
	{
		if(upw.length < 10)	//2개 조합이고 10자리가 안될 경우
		{
			alert('비밀번호는 10자리~12자리를 사용해야 합니다.(단, 3가지 조합일 경우 8~12자리)'); 
			return false;
        }
	}
	else if(chk >= 2)	//3개중 2개이상 없을 경우
	{
		alert('비밀번호는 숫자, 영문, 특수문자 ! @ # $ % ^ & * ( ) _ 3가지 중 2가지 이상의 문자(10~12자리) 또는 3가지 문자(8~12자리)를 혼용하여야 합니다.'); 
		return false;
	}

    if(/(\w)\1\1\1/.test(upw))
    {
        alert('비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.'); 
        return false;
    }
 
    if(arguments.length == 2) 
    {
        if (uid != "" && upw.search(uid) > -1)
        {
            alert('ID가 포함된 비밀번호는 사용하실 수 없습니다.'); 
            return false;
        } 
    }
    
	// 연속된 문자 체크
    if (!checkContinualPassword(upw)) {
    	alert('연속된 문자를 4자리 이상 사용하실 수 없습니다.');
    	return false;
	}

    return true; 
} 

//연속된 문자 체크
function checkContinualPassword(upw) {
	//-- 연속된 문자 체크 : Start
	var check = true;
	var CResult = [];
	//-- 아스키코드로 변환
	$.each(upw.split(''), function (index, value) {
		CResult.push(upw.charCodeAt(index));
	});

	var ChkMax = 3; // (중복허용개수 - 1) 3 : 4개의 연속된 숫자나 문제 체크 123, 321, abc 
	var CInfo = { U: 0, S: 0, D: 0 };

	//-- UP
	$.each(CResult, function (index, value) {
		if (index < (CResult.length + 1)) {
			if (((CResult[index] + 1) == CResult[index + 1])) { CInfo.U += 1; } else { CInfo.U = 0; }
			if (((CResult[index]) == CResult[index + 1])) { CInfo.S += 1; } else { CInfo.S = 0; }
			if (((CResult[index] - 1) == CResult[index + 1])) { CInfo.D += 1; } else { CInfo.D = 0; }
		}
		if (CInfo.U >= ChkMax || CInfo.S >= ChkMax || CInfo.D >= ChkMax) { check = false; }
		//if (CInfo.U >= ChkMax) { console.log("[Continuity] : UP"); }
		//if (CInfo.S >= ChkMax) { console.log("[Continuity] : SAME"); }
		//if (CInfo.D >= ChkMax) { console.log("[Continuity] : DOWN");}
	});
	//console.log("Result " + CInfo.U + ' ' + CInfo.S + ' ' + CInfo.D);
	//-- 연속된 문자 체크 : End
	return check;
}


// 필수 체크 시 사용
function NeedsObjAllChk(name, msg, idx){
    idx = (idx == null) ? 0: idx;
    // 보여지고 있는 항목들에서 사용자가 입력한 값이 하나도 없다면.. 
    if (!$('#'+name).is(":hidden")&&EditedObjCnt(name) != ObjCnt(name)){alert(msg); $('#'+name+' input')[0].focus(); return false;}
    else {return true;}
}

// 필수 체크 시 사용 - 체크박스 제외
function NeedsObjAllChk_cbn(name, msg, idx){
    idx = (idx == null) ? 0: idx;
    // 보여지고 있는 항목들에서 사용자가 입력한 값이 하나도 없다면.. 
    if (!$('#'+name).is(":hidden")&&EditedObjCnt_cbn(name) != ObjCnt_cbn(name)){alert(msg); $('#'+name+' input')[0].focus(); return false;}
    else {return true;}
}

// 사용자가 editing한 객체 수 세기
function EditedObjCnt(name){
    var cnt = 0;
    $('*',ObjRtn(name)).each(function(){
        if(this.type!=null && this.type != ""){
            if ((this.type=='radio'||this.type=='checkbox')&&this.checked) cnt++;
            else if (this.type!='radio'&&this.type!='checkbox'&&this.value!='') cnt++;
        }
    });
    return cnt;
}

// 사용자가 editing한 객체 수 세기 -  체크박스 제외
function EditedObjCnt_cbn(name){
    var cnt = 0;
    $('*',ObjRtn(name)).each(function(){
        if(this.type!=null && this.type != ""){
            if (this.type!='checkbox') cnt++;
        }
    });
    return cnt;
}

// 내부에 입력해야할 객체 수 세기
function ObjCnt(name){
    var cnt = 0;
    $('*',ObjRtn(name)).each(function(){
        if(this.type!=null && this.type != ""){
            if ((this.type=='radio'||this.type=='checkbox')) cnt++;
            else if (this.type!='radio'&&this.type!='checkbox') cnt++;
        }
    });
    return cnt;
}

// 내부에 입력해야할 객체 수 세기 - 체크박스 제외
function ObjCnt_cbn(name){
    var cnt = 0;
    $('*',ObjRtn(name)).each(function(){
        if(this.type!=null && this.type != ""){
            if (this.type!='checkbox') cnt++;
        }
    });
    return cnt;
}
		   
 //validate	 -- 테두리 빨간색, 오류메세지
function IfValid(name){	        	
    if(!($("#"+name).val())){	        
         $("#div"+name+"> label").attr("class","");
         $("#div"+name).addClass("error");
         $("#div"+name+" > p").show();
    } 
}      

//실패, 성공 메세지  
function MessageWrite(gubun,divname, message){
    if(gubun == "1"){   //성공시
        $("#"+divname).removeClass("error"); 
        $("#"+divname).addClass("pass");
      }  
    else{ //실패시
        $("#"+divname).removeClass("pass"); 
        $("#"+divname).addClass("error");                      
    }        
      
    $("#"+divname+" > p").show();			      
    $("#"+divname+" > p").text(message);   
}
//실패, 성공 메세지(HTML Tag 포함)
function MessageWriteHtml(gubun, divname, message) {
	if (gubun == "1") {   //성공시
		$("#" + divname).removeClass("error");
		$("#" + divname).addClass("pass");
	}
	else { //실패시
		$("#" + divname).removeClass("pass");
		$("#" + divname).addClass("error");
	}

	$("#" + divname).show();
	$("#" + divname).html(message);
}

//validate	 -- 에러메세지 보여줌
function IfValidError(name, message) {
    if (!($("#" + name).val())) {
        $("#hidMsg").val(message);
        $("#error2").show();
    }
}

function ErrorView(message) {
    $("#hidMsg").val(message);
    $("#error2").show();
}

//만14세 체크
function isBelow14( UserBirthYear, userBirthMonth, userBirthDay )
{
    today = new Date();
    
    ThisYear = today.getFullYear();
    ThisMonth = today.getMonth()+1;
    ThisDay = today.getDate();

    yearDiff = ThisYear - UserBirthYear;
    monthDiff = ThisMonth - userBirthMonth;
    dayDiff = ThisDay - userBirthDay;

    //alert(ThisYear + '년' + ThisMonth + '월' + ThisDay + '일');
    //alert(UserBirthYear + '년' + userBirthMonth + '월' + userBirthDay + '일');
    //alert(yearDiff + '년' + monthDiff + '월' + dayDiff + '일');

    if ( yearDiff == 15 ) // 년도 차이가 14이면
    {
        if (monthDiff < 0) {
            //alert("만15세 미만은 가입 할 수 없습니다.");
            return false;
        }
        else if (monthDiff == 0) {
            if (dayDiff < 0) {
                //alert("만15세 미만은 가입 할 수 없습니다.");
                return false;
            }
            else
            {
                return true;
            }
        }
        else
            return true;
    }
    else if ( yearDiff < 15 )
    {
            //alert("만15세 미만은 가입 할 수 없습니다.");
            return false;
    }
    else
    {
        return true;
    }
}     