//===PageMethod 동기/비동기 구분하여 호출하기 위해 사용==
var asyncState = true;
XMLHttpRequest.prototype.original_open = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
    async = asyncState;
    var eventArgs = Array.prototype.slice.call(arguments);
    return this.original_open.apply(this, eventArgs);
}
//===PageMethod 동기/비동기 구분하여 호출하기 위해 사용==


//===PageMethod 호출 함수 ===================================

//TabSubCheckbox 바인딩
function fnGetTabSubList(tabcode)
{
    //class 변경    
    $('#ulTabList').find('li').each(function(){
        $(this).css
        // cache jquery var
        var current = $(this);
        // check if our current li has children (sub elements)
        // if it does, skip it
        // ps, you can work with this by seeing if the first child
        // is a UL with blank inside and odd your custom BLANK text
        if(current.children().size() > 0) {return true;}
        // add current text to our current phrase
        phrase += current.text();
    });
    
     _TabCode = tabcode
    var strParams = _TabCode;	
    
    PageMethods.GetTabSubList(strParams, OnGetTabSubListComplete, OnFailed);
}

function OnGetTabSubListComplete(result)
{ 
    //초기화
    fnDefaultDisplay();
    $("#ulTabSubList").empty();
    
    if (result == null || result.length < 1) { }
    
    $("#ulTabSubList").append(result);
    //목록 조회
    fnGetList();
}

// 초기화
function fnDefaultcheckboxkDisplay()
{
    $("input:checkbox").prop("checked",false);
}

function fnDefaultDisplay()
{
    //Tab이 바뀌면 검색조건 control 초기화
    $('#form1').trigger("reset");
    $("input:checkbox").prop("checked",false);
    
    //산업업종
    altJinhakCode = '';
    altJinhakCodeName = '';
    $("#divJinhakCode").find("span").remove();    

    //직종/직무
    altJobCategoryCode = ''
    altJobCategoryCodeName = '';    
    $("#divJobCategoryCode").find("span").remove();

    //지역
    altAreaCode = ''
    altAreaCodeName = ''; 
    $("#divAreaCode").find("span").remove();

//    alert("altAreaCode1 : " + altAreaCode + "\naltAreaCodeName1 : " + altAreaCodeName);

    //자격증
    altLicenseCode = '';
    altLicenseCodeName = '';
    $("#divLicenseCode").find("span").remove();

    //우대조건
    altSpecialCode = '';
    $("#divSpecialCode").find("span").remove();
    
    //display 초기화
    $('#spCareerYear').hide();
    $('#spPayConditionCode').show();
    
}


//경력 : 두번째 ddl 데이터 가져오기
function fnGetCareerYear(parentcode)
{
    asyncState = false; //동기호출
    var strParams = parentcode;     
    PageMethods.GetCareerYear(strParams, OnGetCareerYear, OnFailed);    
}
function OnGetCareerYear(result)
{
    if (result == null || result.length < 1) { return; }
    
    fnCodeBind("ddlCareerYear2", result, '년 이하');
    
    //다시 비동기로 변경
    asyncState = true;  
}

//연봉 : 두번째 ddl 데이터 가져오기
function fnGetPayConditionCode(parentcode)
{
    asyncState = false; //동기호출
    var strParams = parentcode;     
    PageMethods.GetPayConditionCode(strParams, OnGetPayConditionCode, OnFailed);    
}
function OnGetPayConditionCode(result)
{
    if (result == null || result.length < 1) { return; }
    
    fnCodeBind("ddlPayConditionCode2", result, '선택');
    
    //다시 비동기로 변경
    asyncState = true;  
}

//전공코드 : 두번째 ddl 데이터 가져오기
function fnGetMajor(parentcode)
{
    asyncState = false; //동기호출
    var strParams = _MemID + ';' + parentcode;
    PageMethods.GetMajor(strParams, OnfnGetMajor, OnFailed);
}
function OnfnGetMajor(result)
{
    if (result == null || result.length < 1) { return; }
 
    fnCodeBind("ddlEduCode2", result, "선택");
    
    //다시 비동기로 변경
    asyncState = true;  
}

//나의 전공 가져오기
function fnGetMyMajor(parentcode)
{
    asyncState = false; //동기호출
    var strParams = _MemID + ';' + _MyeduCode1; 
//    var strParams = _MemID + ';' + parentcode
    PageMethods.GetMyMajor(strParams, OnGetMyMajor, OnFailed);
}
function OnGetMyMajor(result)
{
    if (result == null || result.length < 1) { 
        if ( _MemID == null || _MemID == '')
        {
            alert('로그인 후 이용할 수 있습니다. ');
        }
        else
        {
            alert('전공이 설정되어 있지 않습니다.');
        }        
        $("#chkMyMajor").prop("checked", false);
        return;
    }
    fnGetMajor(_MyeduCode1);
//    fnCodeBind("ddlEduCode2", result, "선택");
    
    //다시 비동기로 변경
    asyncState = true;  
}

//나의 검색조건 상세 가져오기
var Oldsearchid = "";
function fnGetMySearchSaveData()
{
    asyncState = false; //동기호출    
    var searchid = $('#ddlApplySearchSave').val();
//    alert("searchidval : " + searchid + "\nOldsearchid : " + Oldsearchid);    
    if ( searchid != Oldsearchid )
    {
        fnDefaultcheckboxkDisplay();
        fnDefaultDisplay();
    }
    
    if(searchid  != '')
    {
        $("#hdnSearchSave").val(searchid);
        var strParams = searchid;
        PageMethods.GetMySearchSaveData(strParams, OnGetMySearchSaveData, OnFailed);
    }
    Oldsearchid = $("#hdnSearchSave").val();
    
    // 상세검색 항목이 선택된 경우 펼쳐보이게
    if ( $("#srcMore").find("input").is(':checked') || $("#divSpecialCode").find("span").text() != "" || $("#divLicenseCode").find("span").text() != "")
    {
        $("#more").click();
    }
    else
    {
        $("#more").text('상세검색');
        $("#srcMore").hide();
    }
}

function OnGetMySearchSaveData(result)
{   
    if (result == null || result.length < 1) { return; }
    
    //searchid, userflag, memid, searchcategory, title;
//    var searchid = result[0].searchid;
//    var userflag = result[0].userflag;
//    var memid = result[0].memid;
//    var searchcategory = result[0].searchcategory;
//    var title = result[0].title;
//    var jinhakcode = result[0].jinhakcode;
//    var ksiccode = result[0].ksiccode;
    var jobcategorycode1 = result[0].jobcategorycode1;
    var jobcategorycode3 = result[0].jobcategorycode3;
    var jobcategorycode3name = result[0].jobcategorycode3name;
    var areacode1 = result[0].areacode1;
    var areacode2 = result[0].areacode2;
    var areasubwaycode = result[0].areasubwaycode;
    
    var careeryear1 = result[0].careeryear1;
    var careeryear2 = result[0].careeryear2;
    var careernot = result[0].careernot;
    var educationnot = result[0].educationnot;
    var educationlevel = result[0].educationlevel;    
    var deadlinetodayyn = result[0].deadlinetodayyn;
    var compgubun = result[0].compgubun;
    var applypaycondition1 = result[0].applypaycondition1;
    var applypaycondition2 = result[0].applypaycondition2;    
    var applyemployment = result[0].applyemployment;    
    
//    alert("areacode1 : " + areacode1 + "\nareacode2 : " + areacode2)
    
    if(_PageGubun == 'A')
    {        
        $('#txtCompName').val(result[0].compname);
    }
    
    if(_PageGubun == 'A' || _PageGubun == 'C')
    {
        //직종/직무        
        if(result[0].jobcategorycode3 != '')
        {   
            altJobCategoryCode = result[0].jobcategorycode3;
            altJobCategoryCodeName = result[0].jobcategorycode3name;
            
            var jobcategorycode3 = result[0].jobcategorycode3.split('@');
            var jobcategorycode3name = result[0].jobcategorycode3name.split('@');
            
            var strHtml = '';
            for (i = 0; i < jobcategorycode3.length; i++)
            {   
                for (j = 0; j < jobcategorycode3name.length; j++)
                {
                    if( i == j)
                    {
                        strHtml += "<span id='span_"+jobcategorycode3[i]+"'>" + jobcategorycode3name[j] + " <a href=\"javascript:DelJobCategoryCode('" +jobcategorycode3[i]+"');\"><img src=\"http://image.jinhak.com/job/admin_jinhak/ico_delete.gif\" alt=\"삭제\" /></a></span>";    
                    }
                }
            }            
            $("#divJobCategoryCode").html("&nbsp;" + strHtml);
        }
        
        //지역
//        alert("areacode0 : " + result[0].areacode1 + "\nareacode0 : " + result[0].areacode2 + "\n_PageGubun : " + _PageGubun)
        if(result[0].areacode1 != '')
        { 
            altAreaCode = result[0].areacode1;
            altAreaCodeName = result[0].areacode2;
                    
            var areacode2 = result[0].areacode1.split('@');
            var areacode2name = result[0].areacode2.split('@');
            
            var strHtml = '';
            for (i = 0; i < areacode2.length; i++)
            {   
                for (j = 0; j < areacode2name.length; j++)
                {
                    if( i == j)
                    {
                        strHtml += "<span id='span_"+areacode2[i]+"'>" + areacode2name[j] + " <a href=\"javascript:DelAreaCode('" +areacode2[i]+"');\"><img src=\"http://image.jinhak.com/job/admin_jinhak/ico_delete.gif\" alt=\"삭제\" /></a></span>";    
                    }
                }
            }            
            $("#divAreaCode").html("&nbsp;" + strHtml);     
        }               
    }
    
    if(_PageGubun != 'A')
    {
        //산업구분
        if(result[0].jinhakcode != '')
        {   
            altJinhakCode = result[0].jinhakcode;
            altJinhakCodeName = result[0].jinhakcodename;

            var jinhakcode = result[0].jinhakcode.split('@');
            var jinhakcodename = result[0].jinhakcodename.split('@');
            
            var strHtml = '';
            for (i = 0; i < jinhakcode.length; i++)
            {   
                for (j = 0; j < jinhakcodename.length; j++)
                {
                    if( i == j)
                    {
                        strHtml += "<span id='span_"+jinhakcode[i]+"'>" + jinhakcodename[j] + " <a href=\"javascript:DelJinhakCode('" +jinhakcode[i]+"');\"><img src=\"http://image.jinhak.com/job/admin_jinhak/ico_delete.gif\" alt=\"삭제\" /></a></span>";    
                    }
                }
            }            
            $("#divJinhakCode").html("&nbsp;" + strHtml);
        }
    }
    
    if(_PageGubun == 'E')
    {   
        if(result[0].favorcompgubun.length > 0)
        {   
            var favorcompgubun = result[0].favorcompgubun.split('@');
            for (i = 0; i < favorcompgubun.length; i++)
            {   
                $("input:checkbox[id='chkRankTot" + favorcompgubun[i] + "']").prop("checked",true);   
            } 
        }
        
        if(result[0].goodcompgubun.length > 0)
        {   
            var goodcompgubun = result[0].goodcompgubun.split('@');
            for (i = 0; i < goodcompgubun.length; i++)
            {   
                $("input:checkbox[id='chkRank" + goodcompgubun[i] + "']").prop("checked",true);   
            } 
        }
    }
    
    var careergubun = result[0].careergubun.split('@');
    for (i = 0; i < careergubun.length; i++)
    {   
		$("input:checkbox[id='chkCareerGubun" + careergubun[i] + "']").prop("checked",true);
        
        if(careergubun[i] == '2')
        {
            $('#spCareerYear').show();
            $('#ddlCareerYear1').val(careeryear1);
            $('#ddlCareerYear2').val(careeryear2);
        }
    }      
    
    $('#ddlEducationLevel').val(educationlevel);
    if(educationnot == 'Y'){ $("input:checkbox[id='chkEducationLevelNot']").prop("checked",true); }
    if(deadlinetodayyn == 'Y'){ $("input:checkbox[id='chkDeadLine']").prop("checked",true); }
    
    //상세검색
    $('input:checkbox[name="chkCompGubun"]:input[value="' + compgubun +'"]').prop("checked", true);
    $('#ddlPayConditionCode1').val(applypaycondition1);
    $('#ddlPayConditionCode2').val(applypaycondition2);
        
    var compwelfareinsure = result[0].compwelfareinsure.split('@');
    for (i = 0; i < compwelfareinsure.length; i++)
    {   
        $("input:checkbox[id='chkInsure" + compwelfareinsure[i] + "']").prop("checked",true);        
    }    
    var compwelfarepay = result[0].compwelfarepay.split('@');
    for (i = 0; i < compwelfarepay.length; i++)
    {   
        $("input:checkbox[id='chkPay" + compwelfarepay[i] + "']").prop("checked",true);        
    }
    var compwelfarebreak = result[0].compwelfarebreak.split('@');
    for (i = 0; i < compwelfarebreak.length; i++)
    {   
        $("input:checkbox[id='chkBreak" + compwelfarebreak[i] + "']").prop("checked",true);        
    }    
    var applyemployment = result[0].applyemployment.split('@');
    for (i = 0; i < applyemployment.length; i++)
    {   
        $("input:checkbox[id='chkEmployment" + applyemployment[i] + "']").prop("checked",true);        
    }

    //우대조건
    if(result[0].specialcode != '')
    {   
        altSpecialCode = result[0].specialcode;

        var specialcode = result[0].specialcode.split('@');
        var specialcodename = result[0].specialcodename.split('@');
        
        var strHtml = '';
        for (i = 0; i < specialcode.length; i++)
        {   
            for (j = 0; j < specialcodename.length; j++)
            {
                if( i == j)
                {
                    strHtml += "<span id='span_"+specialcode[i]+"'>" + specialcodename[j] + " <a href=\"javascript:DelSpecialCode('" +specialcode[i]+"');\"><img src=\"http://image.jinhak.com/job/admin_jinhak/ico_delete.gif\" alt=\"삭제\" /></a></span>";    
                }
            }
        }
        $("#divSpecialCode").html("&nbsp;" + strHtml);
    }
    
    //자격증
    if(result[0].licensecode != '')
    {   
        altLicenseCode = result[0].licensecode;
        altLicenseCodeName = result[0].licensecodename;
        
        var licensecode = result[0].licensecode.split('@');
        var licensecodename = result[0].licensecodename.split('@');
        
        var strHtml = '';
        for (i = 0; i < licensecode.length; i++)
        {   
            for (j = 0; j < licensecodename.length; j++)
            {
                if( i == j )
                {
                    strHtml += "<span id='span_"+licensecode[i]+"'>" + licensecodename[j] + " <a href=\"javascript:DelLicenseCode('" +licensecode[i]+"');\"><img src=\"http://image.jinhak.com/job/admin_jinhak/ico_delete.gif\" alt=\"삭제\" /></a></span>";    
                }
            }
        }
        $("#divLicenseCode").html("&nbsp;" + strHtml);
    }
    
    //예상검색결과 가져오기
    fnGetListCnt();
    
    //다시 비동기로 변경
    asyncState = true;  
}


//예상검색결과 가져오기
function fnGetListCnt()
{
    var searchgubun = _PageGubun;  //ABC:기업검색, D:대기업공채관, E:우수기업채용관, F:우대조건맞춤공고, G:공기업
    var jinhakcode = '';
    var ksiccode = '';
    var compname = '';
    var jobcategorycode1 = '';
    var jobcategorycode3 = '';
    var areacode1 = '';
    var areacode2 = '';
    var areasubwaycode ='';
    var comptype ='';
    var regdate = '';
    if(searchgubun == 'ABC')
    {
        jinhakcode = $("#ddlJinhakCode").val(); 
        jobcategorycode1 = $("#ddlJobCategoryCode").val();  
        areacode1 = $("#ddlAreaCode").val(); 
        compname = $('#txtCompName').val();
        if(compname == '키워드를 입력해 주세요'){
            compname='';
        }       
    }
    else if (searchgubun == 'DETAIL')
    {
         
    }
    else
    {
        jinhakcode = altJinhakCode;
        jobcategorycode3 = altJobCategoryCode;
        areacode1 = altAreaCode;
        areacode2 = altAreaCodeName;
    }            
//    alert("areacode1 : " + areacode1 + "\nareacode2 : " + areacode2 + "\njobcategorycode1 : " + jobcategorycode1 + "\njobcategorycode3 : " + jobcategorycode3);
    
    
    var careernot ='';
    if($('#chkCareerGubun0').is(':checked') ){careernot='Y';}
    var educationnot ='';
    if($('#chkEducationLevelNot').is(':checked') ){educationnot='Y';}
    var graduationyn ='';        
    var deadlinetodayyn ='';
    if($('#chkDeadLine').is(':checked') ){deadlinetodayyn='Y';}
    var compwelfareinsure ='';
    $('input:checkbox[name=chkInsure]:checked').each(function(){
        compwelfareinsure += $(this).val()+"@";
    });     
    var compwelfarepay ='';
    $('input:checkbox[name=chkPay]:checked').each(function(){
        compwelfarepay += $(this).val()+"@";
    }); 
    var compwelfarebreak ='';
    $('input:checkbox[name=chkBreak]:checked').each(function(){
        compwelfarebreak += $(this).val()+"@";
    }); 
    var applyemployment ='';
    $('input:checkbox[name=chkEmployment]:checked').each(function(){
        applyemployment += $(this).val()+"@";
    });         
    var specialcode = altSpecialCode;
    var licensecode =altLicenseCode;
    var compvalue1 ='';
    var compvalue2 ='';
    var careergubun ='';
    $('input:checkbox[name=chkCareerGubun]:checked').each(function(){
        careergubun += $(this).val()+"@";
    })
    var careeryear1 =$('#ddlCareerYear1').val();
    var careeryear2 =$('#ddlCareerYear2').val();
    var applylevel =$('#ddlEducationLevel').val();
    var compgubun ='';  // 기업구분 : 라디오버튼에서 체크박스로 변경
//    if($("input[name='rdoCompGubun']:checked").length > 0)
//    {
//        compgubun = $("input[name='rdoCompGubun']:checked").val();
//    }
    $('input:checkbox[name=chkCompGubun]:checked').each(function(){
        compgubun += $(this).val()+"@";
    })

    var payconditioncode1 =$('#ddlPayConditionCode1').val();
    var payconditioncode2 =$('#ddlPayConditionCode2').val();
    if(payconditioncode2 == null) {payconditioncode2 = '';}
    
    if(searchgubun == 'D') // 대기업공채
    {
        compgubun = '1';
    }
    if(searchgubun == 'G') //공기업·공공기관
    {
        compgubun = '4';
    }    
    if(searchgubun == 'E') // 우수기업채용
    {
        compgubun = '2';
        if($('#chkRankTot1').is(':checked') )
        {
            compvalue1 = '0';
        }
        if($('#chkRankTot2').is(':checked') )
        {
            compvalue1 = '1';
        }
        if($('#chkRankTot1').is(':checked') && $('#chkRankTot2').is(':checked') )
        {
            compvalue1 = '';
        }
    }
       
    var objParam = {        
        searchgubun: searchgubun,
        jinhakcode: jinhakcode,
        ksiccode: ksiccode,
        jobcategorycode1: jobcategorycode1,
        jobcategorycode3: jobcategorycode3,
        areacode1: areacode1,
        areacode2: areacode2,
        areasubwaycode: areasubwaycode,
        compname: compname,
        careernot: careernot,
        educationnot: educationnot,
        graduationyn: graduationyn,
        deadlinetodayyn: deadlinetodayyn,
        compwelfareinsure: compwelfareinsure,
        compwelfarepay: compwelfarepay,
        compwelfarebreak: compwelfarebreak,
        applyemployment: applyemployment,
        specialcode: specialcode,
        licensecode: licensecode,
        compvalue1: compvalue1,
        compvalue2: compvalue2,
        careergubun: careergubun,
        careeryear1: careeryear1,
        careeryear2: careeryear2,
        careernot: careernot,
        applylevel: applylevel,
        compgubun: compgubun,
        payconditioncode1: payconditioncode1,
        payconditioncode2: payconditioncode2,
        currentpage : _CurrentPage,
        pagesize : _pageSize,
        sort : _Sort
    };
    
//    alert("compgubun : " + compgubun + "\n payconditioncode1 : " + payconditioncode1 + "\n payconditioncode2 : " + payconditioncode2 );
    //웹메소드 호출
    PageMethods.GetListCnt(objParam, OnGetListCnt, OnFailed); //웹메소드 호출
}

function OnGetListCnt(result)
{   
    if (result == null || result.length < 1) {
//      alert('더이상 정보가 없습니다.'); 
        return;
    } 
    
    var totalcnt = result; 
//    $("#strongSearchCnt").empty('');   
    $("#strongSearchCnt").text(totalcnt);   //예상검색결과
}

//목록 >검색결과 가져오기
function fnGetList()
{   
    var searchgubun = _PageGubun;  //ABC:기업검색, D:대기업공채관, E:우수기업채용관, F:우대조건맞춤공고, G:공기업
    var jinhakcode = '';
    var ksiccode = '';
    var compname = '';
    var jobcategorycode1 = '';
    var jobcategorycode3 = '';
    var areacode1 = '';
    var areacode2 = '';
    var areasubwaycode ='';
    var comptype ='';
    var regdate = '';
    if(searchgubun == 'ABC')
    {
        jinhakcode = $("#ddlJinhakCode").val(); 
        jobcategorycode1 = $("#ddlJobCategoryCode").val();  
        areacode1 = $("#ddlAreaCode").val(); 
        compname = $('#txtCompName').val();
        if(compname == '키워드를 입력해 주세요'){
            compname='';
        }       
    }
    else if (searchgubun == 'DETAIL')
    {
        compname = $('#txtCompName').val();
        if(compname == '키워드를 입력해 주세요'){
            compname='';
        } 
        //jinhakcode
        if($("#ddlJinhakCode1").val() != ''){
            jinhakcode += $("#ddlJinhakCode1").val() + '@';
        }
        if($("#ddlJinhakCode2").val() != ''){
            jinhakcode += $("#ddlJinhakCode2").val() + '@';
        }
        if($("#ddlJinhakCode3").val() != ''){
            jinhakcode += $("#ddlJinhakCode3").val() + '@';
        }
        //ksiccode
        if($("#ddlKCISCode1").val() != ''){
            ksiccode += $("#ddlKCISCode1").val() + '@';
        }
        if($("#ddlKCISCode2").val() != ''){
            ksiccode += $("#ddlKCISCode2").val() + '@';
        }
        if($("#ddlKCISCode3").val() != ''){
            ksiccode += $("#ddlKCISCode3").val() + '@';
        }
        //jobcategorycode1
        if($("#ddlJobCategory1Code1").val() != ''){
            jobcategorycode1 += $("#ddlJobCategory1Code1").val() + '@';
        }
        if($("#ddlJobCategory1Code2").val() != ''){
            jobcategorycode1 += $("#ddlJobCategory1Code2").val() + '@';
        }
        if($("#ddlJobCategory1Code3").val() != ''){
            jobcategorycode1 += $("#ddlJobCategory1Code3").val() + '@';
        }
        //jobcategorycode3
        if($("#ddlJobCategory3Code1").val() != ''){
            jobcategorycode3 += $("#ddlJobCategory3Code1").val() + '@';
        }
        if($("#ddlJobCategory3Code2").val() != ''){
            jobcategorycode3 += $("#ddlJobCategory3Code2").val() + '@';
        }
        if($("#ddlJobCategory3Code3").val() != ''){
            jobcategorycode3 += $("#ddlJobCategory3Code3").val() + '@';
        }
        //areacode1
        if($("#ddlAreaCode1").val() != ''){
            areacode1 = $("#ddlAreaCode1").val();
        }
        //areacode2
        if($("#ddlAreaCode2").val() != ''){
            areacode2 = $("#ddlAreaCode2").val();
        }
        //areasubwaycode
        $('input:checkbox[name=chkSubway]:checked').each(function(){            
            areasubwaycode += $(this).val()+"@";
        });
        //comptype
        comptype = $("#ddlCompType").val();
        regdate = $("#ddlRegDate").val();   
    }
    else
    {
        jinhakcode = altJinhakCode;
        jobcategorycode3 = altJobCategoryCode;
        areacode1 = altAreaCode;
        areacode2 = altAreaCodeName;
    }  
    
//    alert("altAreaCode4 : " + altAreaCode + "\naltAreaCodeName4 : " + altAreaCodeName);
    
    var careernot ='';
    if($('#chkCareerGubun0').is(':checked') ){careernot='Y';}
    var educationnot ='';
    if($('#chkEducationLevelNot').is(':checked') ){educationnot='Y';}
    var graduationyn ='';        
    var deadlinetodayyn ='';
    if($('#chkDeadLine').is(':checked') ){deadlinetodayyn='Y';}
    var compwelfareinsure ='';
    $('input:checkbox[name=chkInsure]:checked').each(function(){
        compwelfareinsure += $(this).val()+"@";
    }); 
    var compwelfarepay ='';
    $('input:checkbox[name=chkPay]:checked').each(function(){
        compwelfarepay += $(this).val()+"@";
    }); 
    var compwelfarebreak ='';
    $('input:checkbox[name=chkBreak]:checked').each(function(){
        compwelfarebreak += $(this).val()+"@";
    }); 
    var applyemployment ='';
    $('input:checkbox[name=chkEmployment]:checked').each(function(){
        applyemployment += $(this).val()+"@";
    });         
    var specialcode = altSpecialCode;
    var licensecode =altLicenseCode;
    var compvalue1 ='';
    var compvalue2 ='';
     var careergubun ='';
    $('input:checkbox[name=chkCareerGubun]:checked').each(function(){
        careergubun += $(this).val()+"@";
    });
    var careeryear1 =$('#ddlCareerYear1').val();
    var careeryear2 =$('#ddlCareerYear2').val();
    var applylevel =$('#ddlEducationLevel').val();
    var compgubun ='';
//    if($("input[name='chkCompGubun']:checked").length > 0)
//    {
//        compgubun = $("input[name='chkCompGubun']:checked").val();
//    }
    $('input:checkbox[name=chkCompGubun]:checked').each(function(){
        compgubun += $(this).val()+"@";
    })
    var payconditioncode1 =$('#ddlPayConditionCode1').val();    
    var payconditioncode2 = '';
    if($('#ddlPayConditionCode2').prop("checked")){
        payconditioncode2 = 'Y';
    }
    if(payconditioncode2 == null) {payconditioncode2 = '';}
    
    if(searchgubun == 'D') // 대기업공채
    {
        compgubun = '1';
    }
    if(searchgubun == 'G') //공기업·공공기관
    {
        compgubun = '4';
    }       
    if(searchgubun == 'E') // 우수기업채용
    {
        compgubun = '2';
        if($('#chkRankTot1').is(':checked') )
        {
            compvalue1 = '0';
        }
        if($('#chkRankTot2').is(':checked') )
        {
            compvalue1 = '1';
        }
        if($('#chkRankTot1').is(':checked') && $('#chkRankTot2').is(':checked') )
        {
            compvalue1 = '';
        }
    }
    if(searchgubun == 'F') // 우대조건맞춤공고
    {
		var compid ='';
		$('input:checkbox[name=chkScrapCompany]:checked').each(function(){
			compid += $(this).val()+"@";
		});  
		var jobcategorycode = '';
		$('input:checkbox[name=chkScrapJob]:checked').each(function(){
			jobcategorycode += $(this).val()+"@";
		}); 
		var specialcode1 ='';
		$('input:checkbox[name=chkSpecialCode1]:checked').each(function(){
			specialcode1 += $(this).val()+"@";
		});        
		var majorcode =$('#ddlEduCode2').val();
		var educode ='';
		$('input:checkbox[name=chkEduCode]:checked').each(function(){
			educode += $(this).val()+"@";
		});
		var specialcode2 ='';
		$('input:checkbox[name=chkSpecialCode2]:checked').each(function(){
			specialcode2 += $(this).val()+"@";
		});
		var specialcode3 ='';
		$('input:checkbox[name=chkSpecialCode3]:checked').each(function(){
			specialcode3 += $(this).val()+"@";
		});  
    }

    var objParam = {        
        searchgubun: searchgubun,
        jinhakcode: jinhakcode,
        ksiccode: ksiccode,
        jobcategorycode1: jobcategorycode1,
        jobcategorycode3: jobcategorycode3,
        areacode1: areacode1,
        areacode2: areacode2,
        areasubwaycode: areasubwaycode,        
        compname: compname,
        careernot: careernot,
        educationnot: educationnot,
        graduationyn: graduationyn,
        deadlinetodayyn: deadlinetodayyn,
        compwelfareinsure: compwelfareinsure,
        compwelfarepay: compwelfarepay,
        compwelfarebreak: compwelfarebreak,
        applyemployment: applyemployment,
        specialcode: specialcode,
        licensecode: licensecode,
        compvalue1: compvalue1,
        compvalue2: compvalue2,
        careergubun: careergubun,
        careeryear1: careeryear1,
        careeryear2: careeryear2,
        applylevel: applylevel,
        compgubun: compgubun,
        payconditioncode1: payconditioncode1,
        payconditioncode2: payconditioncode2,
        comptype: comptype,
        regdate: regdate,
        currentpage : _CurrentPage,
        pagesize : _pageSize,
        sort : _Sort,        
        compid: compid,
        jobcategorycode: jobcategorycode,
        specialcode1: specialcode1,
        majorcode: majorcode,
        specialcode2: specialcode2,
        specialcode3: specialcode3
    };
//    alert("정열기준\nsearchgubun : "  + searchgubun  + "\njinhakcode : "  + jinhakcode  + "\nksiccode : "  + ksiccode
//         + "\njobcategorycode1 : "  + jobcategorycode1  + "\njobcategorycode3 : "  + jobcategorycode3
//         + "\nareacode1 : "  + areacode1  + "\nareacode2 : "  + areacode2
//         + "\nareasubwaycode : "  + areasubwaycode + "\ncompname : "  + compname  + "\ncareernot : "  + careernot
//         + "\neducationnot : "  + educationnot  + "\ngraduationyn : "  + graduationyn  + "\ndeadlinetodayyn : "  + deadlinetodayyn
//         + "\ncompwelfareinsure : "  + compwelfareinsure  + "\ncompwelfarepay : "  + compwelfarepay  + "\ncompwelfarebreak : "  + compwelfarebreak
//         + "\napplyemployment : "  + applyemployment  + "\nspecialcode : "  + specialcode  + "\nlicensecode : "  + licensecode
//         + "\ncompvalue1 : "  + compvalue1  + "\ncompvalue2 : "  + compvalue2
//         + "\ncareergubun : "  + careergubun  + "\ncareeryear1 : "  + careeryear1  + "\ncareeryear2 : "  + careeryear2
//         + "\napplylevel : "  + applylevel  + "\ncompgubun : "  + compgubun  + "\npayconditioncode1 : "  + payconditioncode1 + "\npayconditioncode2 : "  + payconditioncode2
//         + "\n_CurrentPage : "  + _CurrentPage + "\n_pageSize : "  + _pageSize + "\n_Sort : "  + _Sort
//         + "\ncompidt : "  + compid + "\njobcategorycode : "  + jobcategorycode + "\nspecialcode1 : "  + specialcode1
//         + "\nmajorcode : "  + majorcode + "\nspecialcode2 : "  + specialcode2 + "\nspecialcode3 : "  + specialcode3
//         + "\comptype : " + comptype + "\regdate : " + regdate
//         );
    //웹메소드 호출
    PageMethods.GetList(objParam, OnGetList, OnFailed); //웹메소드 호출
}

function OnGetList(result)
{   
    //초기화
    $("#tbList tbody").empty();
    if (result == null || result.length < 1) {
//            alert('더이상 정보가 없습니다.'); 
        return;
    } 
    
    var list = result[0].list;
    var totalcnt = result[0].totalcnt;
    var todaycnt = result[0].todaycnt;
    
    $("#tbList tbody").append(list);
    $(".t_total").find('strong').empty();
    $(".t_total").find('strong:eq(0)').text(totalcnt); //조회된 총게시물수   
    $(".t_total").find('strong:eq(2)').text(todaycnt); //오늘등록된 게시물 수
    
    $("#strongSearchCnt").text(totalcnt);   //예상검색결과
    
    if ( totalcnt == 0 )
    {
        $(".btn_more").hide();
    }
    else
    {
        $(".btn_more").show();
    }
}

//조회구분 변경시
function IfSelddlPageSize(val)
{	
    //초기화
    _CurrentPage = 1;
    $("#tbList tbody").empty();
    
    //조회 
    _pageSize = val;       
    fnGetList();
}

// 정렬기준 변경시
function fnSort(val)
{
    $('.sort').find('a').removeClass('selected');
    if(val == 'A.RegDate DESC' || val == 'A.ApplyStartDate DESC') { $('.sort').find('a:eq(0)').addClass('selected'); }
    else if(val == 'A.ApplyEndDate ASC') { $('.sort').find('a:eq(1)').addClass('selected'); }
    else if(val == 'A.UpdateDate DESC') { $('.sort').find('a:eq(2)').addClass('selected'); }
    else if(val == 'A.CareerGubun ASC')
    {
		$('.sort').find('a:eq(3)').addClass('selected');
		if ($("#spanCareerGubun").hasClass("up")) {
			$("#spanCareerGubun").removeClass('up').addClass('down');
			val='A.CareerGubun DESC';
		} else {
			$("#spanCareerGubun").removeClass('down').addClass('up');
			val='A.CareerGubun ASC';
		}
	}
    else if (val == 'A.EducationLevel ASC')
    {
		$('.sort').find('a:eq(4)').addClass('selected'); 
		if ($("#spanEducationLevel").hasClass("up")) {
			$("#spanEducationLevel").removeClass('up').addClass('down');
			val='A.EducationLevel DESC';
		} else {
			$("#spanEducationLevel").removeClass('down').addClass('up');
			val='A.EducationLevel ASC';
		}
	}else if(val == 'B.TotJum DESC'){
	    $('.sort').find('a:eq(5)').addClass('selected');
	}
    
    $("#tbList tbody").empty();
    
    //조회
    _Sort = val;

    fnGetList();
} 


//나의 검색조건 가져오기 - 검색조건저장 팝업에서 호출
function fnGetMySearchSaveList(parentcode)
{
    asyncState = false; //동기호출
    var strParams = _MemID + ';' + _PageGubun;
    PageMethods.GetMySearchSaveList(strParams, OnGetMySearchSaveList, OnFailed);    
}
function OnGetMySearchSaveList(result)
{
    var selectedval = $('#ddlApplySearchSave').val();
    if (result == null || result.length < 1) { return; }
    
    fnCodeBind("ddlApplySearchSave", result, '선택');
    
    $('#ddlApplySearchSave').val(selectedval);
    //다시 비동기로 변경
    asyncState = true;  
} 

//===Default Event ====================================
//페이지 기본 이벤트 
function fnDefaultEvent()
{
    //Tab
    $(document).on("click", "#ulTabList li", function(){
        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
        
        $('#divTabSubWayList').hide();
    });
    
    if(_PageGubun =='A' || _PageGubun=='B' || _PageGubun=='C')
    {
        //전체 checkbox 클릭시
		$(document).on("click", "#chkTabSubCodeAll", function(){
			var chk = $(this).is(':checked');
			$("input[name='chkTabSubCode']").prop("checked", chk);
			
			//fnGetList(); //목록 조회
		});

		//전체 or checkbox 클릭시
		$(document).on("click", "input[name='chkTabSubCodeAll'], input[name='chkTabSubCode']", function(){
			fnGetList(); //목록 조회
		});
    }
    
    //내 검색조건 가져오기
    $("#ddlApplySearchSave").change(function(e) {
        fnGetMySearchSaveData();
    });
    
    //경력
    $('#spCareerYear').hide();
    $("#chkCareerGubun2").click(function(){
        if($(this).is(":checked"))
        {
            $('#spCareerYear').show(); 
        }
        else
        {
            $('#spCareerYear').hide(); 
            $('#ddlCareerYear1').val('');
            $('#ddlCareerYear2').val('');
        }        
    });
    
    //경력
    $("#ddlCareerYear1").change(function(e) {
        fnGetCareerYear($(this).val());    //두번째 ddl 바인딩
    });
    
    //연봉
    $("#ddlPayConditionCode1").change(function(e) {
        fnGetPayConditionCode($(this).val());    //두번째 ddl 바인딩
    });
    
    //회사 내규에 따름 
    $("#chkPayConditionCode").click(function(){
        if($(this).is(":checked"))
        {   
            $('#spPayConditionCode').hide(); 
            $('#ddlPayConditionCode1').val('');
            $('#ddlPayConditionCode1').val('');
        }
        else
        {
            $('#spPayConditionCode').show(); 
        }
    });
    
    //더보기 클릭시
    $(document).on("click", ".more", function(){
		// 상세검색닫기 클릭 시 '더이상 정보가 없습니다.' 알럿뜸
		// 2014.12.31 이인재
		// [상세검색 닫기] 는 제외
		//alert($(this).html());
        //if ($(this).attr('id') == 'more') return;
        if ($(this).html() == '상세검색') return;
        
        var totalCnt = parseInt($(".t_total").find('strong:eq(0)').text());
        var moreCnt = totalCnt - _CurrentPage * _pageSize;
        
        //데이터가 없을경우
        if(moreCnt < 0) { alert('더이상 정보가 없습니다.'); return; }
        
        //데이터가 더 있을 경우
        _CurrentPage = _CurrentPage + 1;
        fnGetList(); //목록조회
    });
    
    //예상검색결과 가져오기
    $(document).on("click", "input", function(){    
		fnGetListCnt();
    });
    $("select").change(function(e) {
		fnGetListCnt();
    });
}
//===선택항목 삭제 ===================================

//산업업종 삭제
var altJinhakCode = '';
var altJinhakCodeName = '';
function DelJinhakCode(v)
{
    var selectedCode = altJinhakCode.split('@');
    var selectedName = altJinhakCodeName.split('@');
    
    // 배열 값 idx 이용해서 삭제
    var idx = $.inArray(v, selectedCode);
    selectedCode.splice(idx, 1);
    selectedName.splice(idx, 1);
    
    altJinhakCode = selectedCode.join('@');
    altJinhakCodeName = selectedName.join('@');

    // span 없애기
    $("#divJinhakCode").find("#span_"+v).remove();

	// 예상검색결과
	fnGetListCnt();    
}


//직종/직무 삭제        
var altJobCategoryCode = ''
var altJobCategoryCodeName = ''; 	    
function DelJobCategoryCode(v)
{   
    var selectedCode = altJobCategoryCode.split('@');
    var selectedName = altJobCategoryCodeName.split('@');
    
    // 배열 값 idx 이용해서 삭제
    var idx = $.inArray(v, selectedCode);
    selectedCode.splice(idx, 1);
    selectedName.splice(idx, 1);
    
    altJobCategoryCode = selectedCode.join('@');
    altJobCategoryCodeName = selectedName.join('@');

    // span 없애기
    $("#divJobCategoryCode").find("#span_" + v).remove();
    
	// 예상검색결과
	fnGetListCnt();    
}

//지역 삭제        
var altAreaCode = ''
var altAreaCodeName = ''; 	    
function DelAreaCode(v)
{   
    var selectedCode = altAreaCode.split('@');
    var selectedName = altAreaCodeName.split('@');

    // 배열 값 idx 이용해서 삭제
        var idx = $.inArray(v, selectedCode);
        selectedCode.splice(idx, 1);
        selectedName.splice(idx, 1);
        
        altAreaCode = selectedCode.join('@');
        altAreaCodeName = selectedName.join('@');

    // span 없애기
    $("#divAreaCode").find("#span_" + v).remove();
    
	// 예상검색결과
	fnGetListCnt();    
} 

////지역 삭제        
//var altAreaCode2 = ''
//var altAreaCodeName2 = ''; 	    
//function DelAreaCode(v)
//{   
//    var selectedCode = altAreaCode.split('@');
//    var selectedName = altAreaCodeName.split('@');

//    // 배열 값 idx 이용해서 삭제
//        var idx = $.inArray(v, selectedCode);
//        selectedCode.splice(idx, 1);
//        selectedName.splice(idx, 1);
//        
//        altAreaCode2 = selectedCode.join('@');
//        altAreaCodeName2 = selectedName.join('@');

//    // span 없애기
//    $("#divAreaCode2").find("#span_" + v).remove();
//} 

//자격증삭제
var altLicenseCode = '';
var altLicenseCodeName = '';
function DelLicenseCode(v)
{   
    var selectedCode = altLicenseCode.split('@');
    var selectedName = altLicenseCodeName.split('@');
    
    // 배열 값 idx 이용해서 삭제
    var idx = $.inArray(v, selectedCode);
    selectedCode.splice(idx, 1);
    selectedName.splice(idx, 1);
    
    altLicenseCode = selectedCode.join('@');
    altLicenseCodeName = selectedName.join('@');

    // span 없애기
    $("#divLicenseCode").find("#span_"+v).remove();            
}

//우대조건삭제
var altSpecialCode = '';
function DelSpecialCode(v)
{   
    altSpecialCode = '@'+altSpecialCode;
    altSpecialCode = altSpecialCode.replace('@' + v,'');
    altSpecialCode = altSpecialCode.substr(1);
    // span 없애기
    $("#divSpecialCode").find("#span_"+v).remove();            
}



//-------- common ----------------------
//select box bind
function fnCodeBind(controlid, result, text) {

    $('option', '#' + controlid).remove();
    
    var options = '';
    if(text != '') options = '<option value="">' + text + '</option>';
   
    for (var i = 0; i < result.length; i++) {
        options += '<option value="' + result[i].code + '">' + result[i].name + '</option>';
    }
    
    $('#' + controlid).html(options);
}

//페이지이동
function fnGoUrl(gubun, applynoticeid)
{
    if(gubun == '상세') {
        location.href = "/Apply/ApplyNoticeView.aspx?ApplyNoticeID=" + applynoticeid;
    }
}

//팝업호출
function fnOpenPopUp(gubun, arrvalue)
{
    if(gubun == '지역')
    {   
        pops("/Popup/Popup_BaseAreaCode.aspx?ArrValue=" + arrvalue + "&ChkReturnURL=Apply", "Popup_BaseAreaCode", "420", "450");
    }    
    else if(gubun == '자격증')
    {
        pops("/Popup/Popup_BaseLicenseCodeMulti.aspx?ArrValue=" + arrvalue + "&ChkReturnURL=Apply", "Popup_BaseLicenseCode", "380", "450");
    }
    else if(gubun == '우대조건')
    {
        pops("/Popup/Popup_BaseSpecialCode.aspx?ArrValue=" + arrvalue + "&ChkReturnURL=Apply", "Popup_BaseSpecialCode", "560", "650");
    }
    else if(gubun == '직종직무')
    {
        pops("/Popup/Popup_BaseJobCategory.aspx?ArrValue=" + arrvalue + "&ChkReturnURL=Apply", "Popup_BaseJobCategory", "640", "420");
    }
    else if(gubun == '산업업종')
    {
        pops("/Popup/Popup_BaseJinhakCode.aspx?ArrValue=" + arrvalue + "&ChkReturnURL=Apply", "Popup_BaseJinhakCode", "640", "420");
    }
    else if(gubun == '기업탐색')
    {
        location.href = '/Comp/CompMajor.aspx';
    }
    else if(gubun == '직무탐색')
    {
        location.href = '/Job/JobList.aspx';
    }
    else if(gubun == '직무역량검사')
    {
        alert('어디로 갈까나요~~~~??');
    }
    else if(gubun == '검색저장')
    {
        fnSearchSave();
    }    
}

//채용공고 관심 등록
function fnSetSaveScrap(applynoticeid)
{
    if(_MemID == null || _MemID == '')
    {
        alert('로그인이 필요한 기능입니다.');
        return;
    }
    
    //관심구분(0:관심산업 1:관심 기업 2:관심 직무 3:채용공고)
    var gubun = '3';    
    var strParams = _MemID + ";" + gubun + ";" + applynoticeid;
    PageMethods.SetSaveScrap(strParams, OnSetSaveScrap, OnFailed);    //웹메소드 호출
}

function OnSetSaveScrap(result)
{   
    if (result == null || result.length < 1) {
        alert('관심내역 등록에 실패하였습니다. 관리자에게 문의하세요');
        return;
    }
    
    if(result == 'Y') 
    {
        alert('등록되었습니다.');
    }
    else if(result == 'N') 
    {
        alert('이미 등록되어 있습니다.');
    }
    else
    {
        //result == 'x'
        alert('관심내역 등록에 실패하였습니다. 관리자에게 문의하세요');
    }
}

//검색조건 저장
function fnSearchSave()
{
    if(_MemID == '' || _MemID == null) {alert('로그인이 필요한 기능입니다.'); return;}
    
    var searchgubun = _PageGubun;  //A:산업(업종)별,B:직무직종별, C:지역별, D:대기업공채관, E:우수기업채용관, F:우대조건맞춤공고, G:공기업
    var jinhakcode = '';
    var ksiccode = '';
    var compname = '';
    if(searchgubun == 'A')
    {
        jinhakcode = _TabCode;
        $('input:checkbox[name=chkTabSubCode]:checked').each(function(){
            ksiccode += $(this).val()+"@";
        });        
        ksiccode = fnCutLastString(ksiccode);        
        compname = $('#txtCompName').val();
    }
    else
    {
        jinhakcode = altJinhakCode;
    }
    
    var jobcategorycode1 = '';
    var jobcategorycode3 = '';
    if(searchgubun == 'B')
    {
        jobcategorycode1 = _TabCode;
        $('input:checkbox[name=chkTabSubCode]:checked').each(function(){
            jobcategorycode3 += $(this).val()+"@";
        }); 
        jobcategorycode3 = fnCutLastString(jobcategorycode3);
    }
    else
    {
        jobcategorycode3 = altJobCategoryCode;
    }
    
    var areacode1 = '';
    var areacode2 = '';
    var areasubwaycode ='';
    if(searchgubun == 'C')
    {
        areacode1 = _TabCode;
        $('input:checkbox[name=chkTabSubCode]:checked').each(function(){
            areacode2 += $(this).val()+"@";
        }); 
        areacode2 = fnCutLastString(areacode2);
        
        $('input:checkbox[name=chkSubWay]:checked').each(function(){
            areasubwaycode += $(this).val()+"@";
        }); 
        areasubwaycode = fnCutLastString(areasubwaycode);
    }
    else
    { 
//        areacode2 = altAreaCode;
        areacode1 = altAreaCode;
        areacode2 = altAreaCodeName;
        areasubwaycode = '';
    }

//    alert("altAreaCode5 : " + altAreaCode + "\naltAreaCodeName5 : " + altAreaCodeName);
    
    var careernot ='';
    if($('#chkCareerGubun0').is(':checked') ){careernot='Y';}
    var educationnot ='';
    if($('#chkEducationLevelNot').is(':checked') ){educationnot='Y';}    
    var deadlinetodayyn ='';
    if($('#chkDeadLine').is(':checked') ){deadlinetodayyn='Y';}    
    
    var compwelfareinsure ='';
    $('input:checkbox[name=chkInsure]:checked').each(function(){
        compwelfareinsure += $(this).val()+"@";
    }); 
    compwelfareinsure = fnCutLastString(compwelfareinsure);
    
    var compwelfarepay ='';
    $('input:checkbox[name=chkPay]:checked').each(function(){
        compwelfarepay += $(this).val()+"@";
    }); 
    compwelfarepay = fnCutLastString(compwelfarepay);
    
    var compwelfarebreak ='';
    $('input:checkbox[name=chkBreak]:checked').each(function(){
        compwelfarebreak += $(this).val()+"@";
    }); 
    compwelfarebreak = fnCutLastString(compwelfarebreak);
    
    var applyemployment ='';
    $('input:checkbox[name=chkEmployment]:checked').each(function(){
        applyemployment += $(this).val()+"@";
    });    
    applyemployment = fnCutLastString(applyemployment);
         
    var specialcode = altSpecialCode;
    var licensecode =altLicenseCode;
    
    var compvalue1 ='';
    var compvalue2 ='';
    if(searchgubun == 'E')  //우수기업채용공고일경우
    {   
        $('input:checkbox[name=chkRankTot]:checked').each(function(){
            compvalue1 += $(this).val()+"@";
        });
        compvalue1 = fnCutLastString(compvalue1);
        
        $('input:checkbox[name=chkRank]:checked').each(function(){
            compvalue2 += $(this).val()+"@";
        });
        compvalue2 = fnCutLastString(compvalue2);
    }
    
    var careergubun ='';
    $('input:checkbox[name=chkCareerGubun]:checked').each(function(){
        careergubun += $(this).val()+"@";
    });
    careergubun = fnCutLastString(careergubun);
    
    var careeryear1 =$('#ddlCareerYear1').val();
    var careeryear2 =$('#ddlCareerYear2').val();
    var applylevel =$('#ddlEducationLevel').val();
    var compgubun ='';
    if($("input[name='chkCompGubun']:checked").length > 0)
    {
        compgubun = $("input[name='chkCompGubun']:checked").val();
    }
    var payconditioncode1 = '';
    var payconditioncode2 = '';
    if($('#ddlPayConditionCode1').length > 0)
    {
        payconditioncode1 =$('#ddlPayConditionCode1').val();
    }
    if($('#ddlPayConditionCode1').length > 0)
    {
        payconditioncode2 =$('#ddlPayConditionCode2').val();
    }    
    if(payconditioncode2 == null) {payconditioncode2 = '';}
    
//    유효성 검사 : 산업(업종)별, 직종(직무)별, 지역별, 대기업공채관, 우수기업채용관, 공기업.공공기관채용관에서만 검색조건 저장시 아래 값들 체크(한개이상 체크시 저장가능)
//    검색메뉴 : searchgubun | 산업구분 : jinhakcode, ksiccode | 직종/직무 : jobcategorycode1, jobcategorycode3    
//    지역 : areacode1, areacode2 | 경력구분 : 신입,경력(careergubun),  경력기간(careeryear1, careeryear2), 무관 포함(careernot)
//    학력구분 : applylevel, 무관 포함(educationnot) | 마감일 : deadlinetodayyn | 기업명 : compname | 기업구분 : compgubun
//    우수기업구분 : compvalue1 | 기업선호구분 : compvalue2 | 연봉 : 연봉구분(payconditioncode1, payconditioncode2), 회사 내규에 따름 
//    복리후생(연금/보험) : compwelfareinsure | 복리후생(급여제도) : compwelfarepay | 복리후생(휴일/휴가) : compwelfarebreak
//    고용형태 : applyemployment | 우대조건 : specialcode | 자격증 : licensecode
//    alert("tabsubcode : " + tabsubcode + "\n jinhakcode : " + jinhakcode + "\n jobcategorycode1 : " + jobcategorycode1 + "\n jobcategorycode3 : " + jobcategorycode3
//        + "\n areacode1 : " + areacode1 + "\n areacode2 : " + areacode2
//        + "\n careergubun : " + careergubun + "\n careeryear1 : " + careeryear1 + "\n careernot : " + careernot
//        + "\n applylevel : " + applylevel + "\n educationnot : " + educationnot
//        + "\n deadlinetodayyn : " + deadlinetodayyn + "\n compname : " + compname + "\n compgubun : " + compgubun
//        + "\n compvalue1 : " + compvalue1 + "\n compvalue2 : " + compvalue2
//        + "\n payconditioncode1 : " + payconditioncode1 + "\n payconditioncode2 : " + payconditioncode2
//        + "\n compwelfareinsure : " + compwelfareinsure + "\n compwelfarepay : " + compwelfarepay + "\n compwelfarebreak : " + compwelfarebreak
//        + "\n applyemployment : " + applyemployment + "\n specialcode : " + specialcode + "\n licensecode : " + licensecode); return;

    
    var tabsubcode = '';    
//    if(searchgubun == 'A') {
//        tabsubcode = ksiccode;
//    }
    if(searchgubun == 'B') {
        tabsubcode = jobcategorycode3;
    }
    if(searchgubun == 'C') {
        tabsubcode = areacode2;
    }
    
    if(tabsubcode == '' && areasubwaycode == '' && compname == ''
         && careernot == '' && educationnot == ''
         && deadlinetodayyn == '' && compwelfareinsure == ''
         && compwelfarepay == '' && compwelfarebreak == ''
         && applyemployment == '' && specialcode == ''
         && licensecode == '' && compvalue1 == ''
         && compvalue2 == '' && careergubun == ''
         && careeryear1 == '' && careeryear2 == ''
         && applylevel == '' && compgubun == ''
         && payconditioncode1 == '' && payconditioncode2 == '')
    {
        alert('먼저 검색조건을 설정하세요'); return;
    }

    if ($('#chkCareerGubun2').is(':checked') ) 
    {
        if ($('#ddlCareerYear1').val() == "" || $('#ddlCareerYear2').val() == "")
        {
            alert('경력구분의 범위를 선택해 주세요.'); return;
        } 
    }
    
    var params = "?searchgubun=" + searchgubun +"&jinhakcode=" + jinhakcode + "&ksiccode=" + ksiccode
                + "&jobcategorycode1=" + jobcategorycode1 + "&jobcategorycode3=" + jobcategorycode3
                + "&areacode1=" + areacode1 + "&areacode2=" + areacode2
                + "&areasubwaycode=" + areasubwaycode + "&compname=" + compname
                + "&careernot=" + careernot + "&educationnot=" + educationnot
                + "&deadlinetodayyn=" + deadlinetodayyn + "&compwelfareinsure=" + compwelfareinsure
                + "&compwelfarepay=" + compwelfarepay + "&compwelfarebreak=" + compwelfarebreak
                + "&applyemployment=" + applyemployment + "&specialcode=" + specialcode
                + "&licensecode=" + licensecode + "&compvalue1=" + compvalue1
                + "&compvalue2=" + compvalue2 + "&careergubun=" + careergubun
                + "&careeryear1=" + careeryear1 + "&careeryear2=" + careeryear2
                + "&applylevel=" + applylevel + "&compgubun=" + compgubun
                + "&payconditioncode1=" + payconditioncode1 + "&payconditioncode2=" + payconditioncode2;        

    pops("/Popup/Popup_SearchSaveApplyNotice.aspx"+ params, "Popup_SearchSaveApplyNotice", "380", "400");
}

//검색조건 저장 - 우대조건맞춤정보 전용 - 안씀
function fnSearchSaveF()
{
    var searchgubun = _PageGubun;  //A:산업(업종)별,B:직무직종별, C:지역별, D:대기업공채관, E:우수기업채용관, F:우대조건맞춤공고, G:공기업
    var compid ='';
    $('input:checkbox[name=chkScrapCompany]:checked').each(function(){
        compid += $(this).val()+"@";
    });  
    var jobcategorycode = '';
    $('input:checkbox[name=chkScrapJob]:checked').each(function(){
        jobcategorycode += $(this).val()+"@";
    }); 
    var specialcode1 ='';
    $('input:checkbox[name=chkSpecialCode1]:checked').each(function(){
        specialcode1 += $(this).val()+"@";
    });        
    var majorcode =$('#ddlEduCode2').val();
    var educode ='';
    $('input:checkbox[name=chkEduCode]:checked').each(function(){
        educode += $(this).val()+"@";
    });
    var specialcode2 ='';
    $('input:checkbox[name=chkSpecialCode2]:checked').each(function(){
        specialcode2 += $(this).val()+"@";
    });
    var specialcode3 ='';
    $('input:checkbox[name=chkSpecialCode3]:checked').each(function(){
        specialcode3 += $(this).val()+"@";
    });
    
    
    var params = "?searchgubun=" + searchgubun +"&compid=" + compid + "&specialcode1=" + specialcode1
                + "&majorcode=" + majorcode + "&educode=" + educode
                + "&specialcode2=" + specialcode2 + "&specialcode3=" + specialcode3;

    pops("/Popup/Popup_SearchSaveApplyNotice.aspx"+ params, "Popup_SearchSaveApplyNotice", "380", "400");
}
