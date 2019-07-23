
//##### XML링크
var xmlDoc , lineMapStr = "", currentPath="", index = 0;
var moz = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined'); 
var ie = (typeof window.ActiveXObject != 'undefined');

// 임시!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var wwwRoot = ''
var memRoot = ''
var adminRoot = ''

function importXML(file) {
	// xml document parsing by file
	try{
		var xmlhttp;
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}
		else{// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.open("GET",file,false);
		xmlhttp.send();
		xmlDoc = xmlhttp.responseXML;
	}
	catch(ex){//alert(ex.message);
	}
}

function getLineMapNode(id){
	var menuXpath , node;
	menuXpath = "//menu[@id='" + id + "']";
	if (moz) {
		node = xmlDoc.evaluate(menuXpath, xmlDoc, null, 9,null).singleNodeValue;
	} else if (ie) {
		node = xmlDoc.selectSingleNode(menuXpath);	
	}
	return node;
}

function setString(node){
	var spStr = "" , last="";
	var name = node.getAttribute("name");
	var url  = node.getAttribute("url").cnvurl();
	var nodeId  = node.getAttribute("id");
	if(node != xmlDoc.documentElement) 	setString(node.parentNode);
	if(currentPath != nodeId) {
		if(nodeId != 0) lineMapStr += "<span>"+ name+"</span> ";
	}
	else {
		lineMapStr += "<span class='pwd'>"+name+"</span>";
	}
}

var JINHAKMENULIST=new Object();

function SetMenuNmUrl( MenuNm, MenuUrl){
	this.MenuNm = MenuNm || "";
	this.MenuUrl = MenuUrl || "";
};

JINHAKMENULIST['0'] = new SetMenuNmUrl('홈',wwwRoot+'/');

JINHAKMENULIST['1'] = new SetMenuNmUrl('뉴스',wwwRoot+'/News/JobNews');
JINHAKMENULIST['1_1'] = new SetMenuNmUrl('취업뉴스',wwwRoot+'/News/JobNews');
JINHAKMENULIST['1_2'] = new SetMenuNmUrl('채용동향분석',wwwRoot+'/News/RecruitNews');

JINHAKMENULIST['2'] = new SetMenuNmUrl('직무탐색',wwwRoot+'/Job/JobList');
JINHAKMENULIST['2_1'] = new SetMenuNmUrl('직무탐색',wwwRoot+'/Job/JobList');
JINHAKMENULIST['2_2'] = new SetMenuNmUrl('진단',wwwRoot + '/Jindan/index');
JINHAKMENULIST['2_3'] = new SetMenuNmUrl('직무정보',wwwRoot+'/Job/JobInfo');
JINHAKMENULIST['2_4'] = new SetMenuNmUrl('토크',wwwRoot+'/Job/JobTalk');
JINHAKMENULIST['2_5'] = new SetMenuNmUrl('통계',wwwRoot+'/Job/JobStats');

//// 교육 - 임시로 오픈 - 2015.04.24 amadas
//JINHAKMENULIST['3'] = new SetMenuNmUrl('교육',wwwRoot+'/EduTemp/EduLectureGisuView?Code=A');
//JINHAKMENULIST['3_1'] = new SetMenuNmUrl('직무소양과정',wwwRoot+'/EduTemp/EduLectureGisuView?Code=A&Iframe=Y');
//JINHAKMENULIST['3_2'] = new SetMenuNmUrl('실전대비과정',wwwRoot+'/EduTemp/EduLectureGisuView?Code=B&Iframe=Y');
//JINHAKMENULIST['3_3'] = new SetMenuNmUrl('멘토링',wwwRoot+'/EduMentoBoard/EduMentoBoard');

// 교육 - 추후 오픈 때 적용할 페이지 - 2015.04.24 amadas
JINHAKMENULIST['3'] = new SetMenuNmUrl('역량강화교육',wwwRoot+'/EduOnline/EduCourseProfile1?Code=A');
JINHAKMENULIST['3_1'] = new SetMenuNmUrl('취업진로과정',wwwRoot+'/EduOnline/EduCourseProfile2');
JINHAKMENULIST['3_2'] = new SetMenuNmUrl('취업실전과정',wwwRoot+'/EduOnline/EduCourseProfile1?Code=A');
JINHAKMENULIST['3_3'] = new SetMenuNmUrl('멘토링',wwwRoot+'/EduMentoBoard/EduMentoBoard');
JINHAKMENULIST['3_4'] = new SetMenuNmUrl('대기업공채전략',wwwRoot+'/EduMajorCompany/EduMajorCompList');
JINHAKMENULIST['3_5'] = new SetMenuNmUrl('온라인교육프로그램',wwwRoot+'/EduOnline/EduCourseProfile1?Code=A');
JINHAKMENULIST['3_6'] = new SetMenuNmUrl('대학프로그램',wwwRoot+'/EduOnline/Edu_Univ');

JINHAKMENULIST['4'] = new SetMenuNmUrl('기업',wwwRoot+'/Company/CompList');
JINHAKMENULIST['4_1'] = new SetMenuNmUrl('우수기업',wwwRoot+'/Company/CompList');
JINHAKMENULIST['4_2'] = new SetMenuNmUrl('강소기업',wwwRoot+'/Company/CompList?flag=3');
JINHAKMENULIST['4_3'] = new SetMenuNmUrl('대기업',wwwRoot+'/Company/CompSearch');
JINHAKMENULIST['4_4'] = new SetMenuNmUrl('중견기업',wwwRoot+'/Company/CompSearch?size=3');
JINHAKMENULIST['4_5'] = new SetMenuNmUrl('중소기업',wwwRoot+'/Company/CompSearch?size=2');
JINHAKMENULIST['4_11'] = new SetMenuNmUrl('공기업·공공기업',wwwRoot+'/Company/CompSearch?size=4');
JINHAKMENULIST['4_6'] = new SetMenuNmUrl('개요',wwwRoot+'/Company/CompSummary');
JINHAKMENULIST['4_7'] = new SetMenuNmUrl('기업정보',wwwRoot+'/Company/CompInfo');
JINHAKMENULIST['4_8'] = new SetMenuNmUrl('토크',wwwRoot+'/Company/CompTalk');
JINHAKMENULIST['4_9'] = new SetMenuNmUrl('뉴스',wwwRoot+'/Company/Comp_ews');
JINHAKMENULIST['4_10'] = new SetMenuNmUrl('통계',wwwRoot+'/Company/CompStats');
JINHAKMENULIST['4_11'] = new SetMenuNmUrl('요약 재무제표',wwwRoot+'/Company/CompSummaryFS');

JINHAKMENULIST['5'] = new SetMenuNmUrl('채용',wwwRoot+'/Apply/ApplyNoticeListA');
JINHAKMENULIST['5_1'] = new SetMenuNmUrl('산업(업종)별',wwwRoot+'/Apply/ApplyNoticeListA');
JINHAKMENULIST['5_2'] = new SetMenuNmUrl('직종(직무)별',wwwRoot+'/Apply/ApplyNoticeListB');
JINHAKMENULIST['5_3'] = new SetMenuNmUrl('지역별',wwwRoot+'/Apply/ApplyNoticeListC');
JINHAKMENULIST['5_4'] = new SetMenuNmUrl('대기업공채관',wwwRoot+'/Apply/ApplyNoticeListD');
JINHAKMENULIST['5_5'] = new SetMenuNmUrl('우수기업채용관',wwwRoot+'/Apply/ApplyNoticeListE');
JINHAKMENULIST['5_8'] = new SetMenuNmUrl('공기업·공공기관채용관',wwwRoot+'/Apply/ApplyNoticeListG');
JINHAKMENULIST['5_6'] = new SetMenuNmUrl('우대조건맞춤공고',wwwRoot+'/Apply/ApplyNoticeListF');
JINHAKMENULIST['5_7'] = new SetMenuNmUrl('상세요강','');

JINHAKMENULIST['6'] = new SetMenuNmUrl('취업로드맵', wwwRoot + '/Controls/RoadMap');
JINHAKMENULIST['6_1'] = new SetMenuNmUrl('선호직무탐색', wwwRoot + '/Jindan/index');
JINHAKMENULIST['6_2'] = new SetMenuNmUrl('직무역량탐색', wwwRoot + '/Jindan/index');
JINHAKMENULIST['6_3'] = new SetMenuNmUrl('직무요건준비도', wwwRoot + '/Jindan/index');
JINHAKMENULIST['6_4'] = new SetMenuNmUrl('기업적합도', wwwRoot + '/Jindan/index');
JINHAKMENULIST['6_5'] = new SetMenuNmUrl('직무수행능력', wwwRoot + '/Jindan/index');
//JINHAKMENULIST['6_1'] = new SetMenuNmUrl('선호직무탐색',wwwRoot+'/Jindan/PreferJob');
//JINHAKMENULIST['6_2'] = new SetMenuNmUrl('직무역량탐색',wwwRoot+'/Jindan/JobCompetency');
//JINHAKMENULIST['6_3'] = new SetMenuNmUrl('직무요건준비도',wwwRoot+'/Jindan/JobRequirement');
//JINHAKMENULIST['6_4'] = new SetMenuNmUrl('기업적합도',wwwRoot+'/Jindan/CompanySuitability');
//JINHAKMENULIST['6_5'] = new SetMenuNmUrl('직무수행능력',wwwRoot+'/Jindan/Achievement');

JINHAKMENULIST['7'] = new SetMenuNmUrl('마이페이지', wwwRoot+'/Member/News');
JINHAKMENULIST['7_1'] = new SetMenuNmUrl('마이페이지', wwwRoot+'/Member/News');
JINHAKMENULIST['7_2'] = new SetMenuNmUrl('이력서', wwwRoot+'/Member/Resume');
JINHAKMENULIST['7_3'] = new SetMenuNmUrl('진단내역', wwwRoot+'/Member/DiagnosisList');
JINHAKMENULIST['7_4'] = new SetMenuNmUrl('교육내역', wwwRoot+'/Member/JinhakEducationListOnline');
JINHAKMENULIST['7_5'] = new SetMenuNmUrl('지원내역', wwwRoot+'/Member/ApplyList');
JINHAKMENULIST['7_6'] = new SetMenuNmUrl('관심내역', wwwRoot+'/Member/ScrapList');
JINHAKMENULIST['7_7'] = new SetMenuNmUrl('통계', wwwRoot+'/Member/StatisticsList');
JINHAKMENULIST['7_8'] = new SetMenuNmUrl('개인정보관리', memRoot + '/Customer/CustomerInfoLogin');
JINHAKMENULIST['7_9'] = new SetMenuNmUrl('결제내역', wwwRoot+'/Member/PayList');
JINHAKMENULIST['7_10'] = new SetMenuNmUrl('기업평판내역', wwwRoot + '/Member/CompReviewList');

JINHAKMENULIST['8'] = new SetMenuNmUrl('공개설정', memRoot+'/Member/OpenState');
//JINHAKMENULIST['9'] = new SetMenuNmUrl('공개설정', '');


JINHAKMENULIST['10'] = new SetMenuNmUrl('회원가입', memRoot + '/Member/MemberJoinStart');
JINHAKMENULIST['11'] = new SetMenuNmUrl('이용약관', wwwRoot+ '/Member/AccessTerms');
JINHAKMENULIST['12'] = new SetMenuNmUrl('개인정보취급방침', wwwRoot+ '/Member/Priarcy');
JINHAKMENULIST['13'] = new SetMenuNmUrl('로그아웃', memRoot+'/Controls/Logout');
JINHAKMENULIST['14'] = new SetMenuNmUrl('이용안내', memRoot+'/Customer/CustomerUseGuide');

JINHAKMENULIST['15'] = new SetMenuNmUrl('고객센터', wwwRoot+'/Customer/CustomerMain');
JINHAKMENULIST['15_1'] = new SetMenuNmUrl('아이디찾기', memRoot+'/Customer/CustomerIdSearch');
JINHAKMENULIST['15_2'] = new SetMenuNmUrl('비밀번호찾기', memRoot+'/Customer/CustomerIdSearch?IpSel=PW');
JINHAKMENULIST['15_3'] = new SetMenuNmUrl('회원정보변경', memRoot+'/Customer/CustomerInfoLogin');
//JINHAKMENULIST['15_4'] = new SetMenuNmUrl('비밀번호변경', memRoot+'/Customer/CustomerInfoLogin?IpSel=PW');
JINHAKMENULIST['15_4'] = new SetMenuNmUrl('비밀번호변경', memRoot+'/Customer/CustomerPwdChange');
JINHAKMENULIST['15_5'] = new SetMenuNmUrl('회원탈퇴', memRoot+'/Customer/CustomerLeaveStep1');
JINHAKMENULIST['15_6'] = new SetMenuNmUrl('이용안내-개인', wwwRoot+'/Customer/CustomerUseGuide');
JINHAKMENULIST['15_7'] = new SetMenuNmUrl('이용안내-기업', wwwRoot+'/Customer/CustomerUseGuide?MemFlag=2');
JINHAKMENULIST['15_8'] = new SetMenuNmUrl('고객상담-개인', wwwRoot+'/Customer/CustomerAdvice');
JINHAKMENULIST['15_9'] = new SetMenuNmUrl('고객상담-기업', wwwRoot+'/Customer/CustomerAdvice?MemFlag=2');
JINHAKMENULIST['15_10'] = new SetMenuNmUrl('공지사항', wwwRoot+'/Customer/CustomerNoticeList');

JINHAKMENULIST['16'] = new SetMenuNmUrl('진단', wwwRoot+'/Jindan/Character');
JINHAKMENULIST['16_1'] = new SetMenuNmUrl('CATCH탐색진단', wwwRoot+'/Jindan/PreferJob');
JINHAKMENULIST['16_2'] = new SetMenuNmUrl('NCS실전진단', wwwRoot+'/Jindan/JobRequirement');
JINHAKMENULIST['16_3'] = new SetMenuNmUrl('인성진단', wwwRoot+'/Jindan/Character');

JINHAKMENULIST['17'] = new SetMenuNmUrl('진단가이드', wwwRoot+'/Guide/ResumeGuide');
JINHAKMENULIST['18'] = new SetMenuNmUrl('이벤트', wwwRoot+'/Event/EventList');
JINHAKMENULIST['19'] = new SetMenuNmUrl('당첨자확인', wwwRoot+'/Event/EventUserList');

//기업회원메뉴
JINHAKMENULIST['21'] = new SetMenuNmUrl('채용공고등록관리', adminRoot+'/CompanyAdmin/ApplyNoticeList?SearchGubun=0');
JINHAKMENULIST['22'] = new SetMenuNmUrl('채용/지원자관리', adminRoot+'/CompanyAdmin/ApplyPeopleList?SearchGubun=0');
JINHAKMENULIST['23'] = new SetMenuNmUrl('인재조회', '');
JINHAKMENULIST['24'] = new SetMenuNmUrl('기업정보관리', adminRoot+'/CompanyAdmin/InfoChange');


JINHAKMENULIST['30_2'] = new SetMenuNmUrl('진단내역', adminRoot+'/UnivAdmin/JindanList');

//취업진로과정메뉴
JINHAKMENULIST['40'] = new SetMenuNmUrl('취업진로지도자과정', wwwRoot+'/EduOnline/EduCatchJob');
JINHAKMENULIST['40_1'] = new SetMenuNmUrl('과정소개', wwwRoot+'/EduOnline/EduCatchJob');
JINHAKMENULIST['40_2'] = new SetMenuNmUrl('강의목록', wwwRoot+'/EduOnline/EduLectureList');


// 메뉴구조 변경 리뉴얼 - 2016.06.16
JINHAKMENULIST['51'] = new SetMenuNmUrl('기업분석', wwwRoot + '/Company/CompMajor?flag=Major');
JINHAKMENULIST['51_1'] = new SetMenuNmUrl('1,000대기업', wwwRoot + '/Company/CompMajor?flag=Major');
JINHAKMENULIST['51_2'] = new SetMenuNmUrl('상장기업', wwwRoot + '/Company/CompMajor?flag=IPO');
JINHAKMENULIST['51_3'] = new SetMenuNmUrl('공기업,공공기관', wwwRoot + '/Company/CompMajor?flag=Public');
JINHAKMENULIST['51_4'] = new SetMenuNmUrl('외국계기업', wwwRoot + '/Company/CompMajor?flag=Foreign');
JINHAKMENULIST['51_5'] = new SetMenuNmUrl('CATCH추천기업', wwwRoot + '/Company/CompMajor?flag=Recom');
JINHAKMENULIST['51_6'] = new SetMenuNmUrl('테마기업', wwwRoot + '/Company/CompMajor?flag=Theme');
JINHAKMENULIST['51_7'] = new SetMenuNmUrl('기업취재', wwwRoot + '/Company/CompMajor?flag=Report');
JINHAKMENULIST['51_8'] = new SetMenuNmUrl('기업검색', wwwRoot + '/Company/CompMajor?flag=Search');
JINHAKMENULIST['51_9'] = new SetMenuNmUrl('강소기업', wwwRoot + '/Company/CompMajor?flag=Gangso');

JINHAKMENULIST['52'] = new SetMenuNmUrl('뉴스', wwwRoot + '/News/RecruitNews');
JINHAKMENULIST['52_1'] = new SetMenuNmUrl('취업뉴스', wwwRoot + '/News/JobNews');
//JINHAKMENULIST['52_2'] = new SetMenuNmUrl('기업뉴스', wwwRoot + '/News/CompNews');
JINHAKMENULIST['52_3'] = new SetMenuNmUrl('캐치뉴스', wwwRoot + '/News/RecruitNews');
JINHAKMENULIST['52_4'] = new SetMenuNmUrl('오늘의캐치', wwwRoot + '/News/TodayCatch');

JINHAKMENULIST['53'] = new SetMenuNmUrl('취업전략', wwwRoot + '/News/RecruitNews');
JINHAKMENULIST['53_1'] = new SetMenuNmUrl('채용동향분석', wwwRoot + '/News/RecruitNews');
JINHAKMENULIST['53_2'] = new SetMenuNmUrl('대기업공채전략', wwwRoot + '/NCS/RecruitPlan_A');
JINHAKMENULIST['53_3'] = new SetMenuNmUrl('공기업공채전략', wwwRoot + '/NCS/RecruitPlan_B');
JINHAKMENULIST['53_4'] = new SetMenuNmUrl('산업/고용동향분석', wwwRoot + '/News/IndustNews');

JINHAKMENULIST['54'] = new SetMenuNmUrl('채용정보', wwwRoot + '/NCS/RecruitInfo');

JINHAKMENULIST['55'] = new SetMenuNmUrl('직무', wwwRoot + '/Job/JobList');
JINHAKMENULIST['55_1'] = new SetMenuNmUrl('직군별', wwwRoot + '/Job/JobList');
JINHAKMENULIST['55_2'] = new SetMenuNmUrl('관련전공별', wwwRoot + '/Job/JobList');

JINHAKMENULIST['56'] = new SetMenuNmUrl('진단', wwwRoot + '/Jindan/index');
JINHAKMENULIST['56_0'] = new SetMenuNmUrl('진단안내', wwwRoot + '/Jindan/index');
JINHAKMENULIST['56_1'] = new SetMenuNmUrl('기업적합도', wwwRoot + '/Jindan/index?m3=1');
JINHAKMENULIST['56_2'] = new SetMenuNmUrl('조직인성', wwwRoot + '/Jindan/index?m3=2');
JINHAKMENULIST['56_3'] = new SetMenuNmUrl('선호직무탐색', wwwRoot + '/Jindan/index?m3=3');
JINHAKMENULIST['56_4'] = new SetMenuNmUrl('직무수행능력', wwwRoot + '/Jindan/index?m3=4');
JINHAKMENULIST['56_5'] = new SetMenuNmUrl('NCS직업기초능력', wwwRoot + '/Jindan/index?m3=5');
JINHAKMENULIST['56_6'] = new SetMenuNmUrl('NCS취업준비도', wwwRoot + '/Jindan/index?m3=6');

//JINHAKMENULIST['57'] = new SetMenuNmUrl('교육', wwwRoot + '/News/CatchCast');
//JINHAKMENULIST['57_1'] = new SetMenuNmUrl('실전취업강의', wwwRoot + '/EduOnline/EduCourseProfile1');
//JINHAKMENULIST['57_2'] = new SetMenuNmUrl('취업진로과정', wwwRoot + '/EduOnline/EduCourseProfile2');
//JINHAKMENULIST['57_3'] = new SetMenuNmUrl('오프라인특강', wwwRoot + '/EduOffline/Interview');
//JINHAKMENULIST['57_4'] = new SetMenuNmUrl('캐치캐스트', wwwRoot + '/News/CatchCast');

JINHAKMENULIST['57'] = new SetMenuNmUrl('캐치TV', wwwRoot + '/News/CatchCast');
JINHAKMENULIST['57_1'] = new SetMenuNmUrl('철수N존슨', wwwRoot + '/News/CatchCast');
JINHAKMENULIST['57_2'] = new SetMenuNmUrl('카드뉴스', wwwRoot + '/News/RecruitNews');
JINHAKMENULIST['57_3'] = new SetMenuNmUrl('취업뉴스', wwwRoot + '/News/JobNews');
JINHAKMENULIST['57_4'] = new SetMenuNmUrl('오늘의캐치', wwwRoot + '/News/TodayCatch');

// 메뉴구조 변경 리뉴얼 - 2016.12.27
JINHAKMENULIST['58'] = new SetMenuNmUrl('기업분석', wwwRoot + '/Comp/RecomFinance');
//JINHAKMENULIST['58_1'] = new SetMenuNmUrl('1,000대기업', wwwRoot + '/Comp/CompMajor?flag=Major');
//JINHAKMENULIST['58_2'] = new SetMenuNmUrl('상장기업', wwwRoot + '/Comp/CompMajor?flag=IPO');
//JINHAKMENULIST['58_3'] = new SetMenuNmUrl('강소기업', wwwRoot + '/Comp/CompMajor?flag=Gangso');
//JINHAKMENULIST['58_4'] = new SetMenuNmUrl('공기업,공공기관', wwwRoot + '/Comp/CompMajor?flag=Public');
//JINHAKMENULIST['58_5'] = new SetMenuNmUrl('외국계기업', wwwRoot + '/Comp/CompMajor?flag=Foreign');
//JINHAKMENULIST['58_6'] = new SetMenuNmUrl('추천기업', wwwRoot + '/Comp/CompMajor?flag=Recom');
JINHAKMENULIST['58_7'] = new SetMenuNmUrl('테마기업', wwwRoot + '/Comp/CompTheme');
//JINHAKMENULIST['58_8'] = new SetMenuNmUrl('기업취재', wwwRoot + '/Comp/CompMajor?flag=Report');
JINHAKMENULIST['58_9'] = new SetMenuNmUrl('기업검색', wwwRoot + '/Comp/CompMajor?flag=Search');
JINHAKMENULIST['58_10'] = new SetMenuNmUrl('기업비교', wwwRoot + '/Comp/Compare');
JINHAKMENULIST['58_11'] = new SetMenuNmUrl('추천기업', wwwRoot + '/Comp/RecomFinance');
JINHAKMENULIST['58_12'] = new SetMenuNmUrl('기업분석', wwwRoot + '/Comp/AnalysisComp');

// 메뉴구조 변경 리뉴얼 - 2018.06.20
JINHAKMENULIST['60'] = new SetMenuNmUrl('캐치닷', wwwRoot + '/CatchDot/index');
JINHAKMENULIST['60_1'] = new SetMenuNmUrl('소개', wwwRoot + '/CatchDot/index');
JINHAKMENULIST['60_2'] = new SetMenuNmUrl('이용안내', wwwRoot + '/CatchDot/Usage');
JINHAKMENULIST['60_3'] = new SetMenuNmUrl('프로그램', wwwRoot + '/CatchDot/Program');
JINHAKMENULIST['60_5'] = new SetMenuNmUrl('My캐치닷', wwwRoot + '/CatchDot/MyCatchDot');
//JINHAKMENULIST['60_6'] = new SetMenuNmUrl('가입인증', wwwRoot + '/CatchDot/CheckAuth');
JINHAKMENULIST['60_8'] = new SetMenuNmUrl('커뮤니티', wwwRoot + '/CatchCafe/Community');

function getMenuNm( idx )
{
    var TmpMenuNm = "";
    try
    {
	    TmpMenuNm = JINHAKMENULIST[idx].MenuNm;	
	}
	catch(e)
	{
	}
	return TmpMenuNm;
}

function getMenuLink( idx )
{
	var TmpMenuUrl = "";
    try
    {
		TmpMenuUrl = JINHAKMENULIST[idx].MenuUrl;
	}
	catch(e)
	{
	}	
	return TmpMenuUrl; 
}

function getMenuNm_Full( idx )
{
    var arr_idx = idx.split("_" );
    var tmp_idx = "";
    
    for( i=0;i<arr_idx.length;i++)
    {
        if( tmp_idx != "" ) tmp_idx += "_";
        tmp_idx += arr_idx[i];

        var tmpNm = getMenuNm( tmp_idx );
//        <span>&gt;</span> 1Depth <span>&gt;</span> 2Depth <span>&gt;</span> <strong>3Depth</strong>
//        alert("idx : " + idx + "\ntmp_idx : " + tmp_idx + "\ntmpNm : " + tmpNm + "\nlineMapStr : " + lineMapStr);
        if( idx != tmp_idx) 
        {
            if(tmp_idx != 0) lineMapStr += "<span>&gt;</span> "+ tmpNm+" ";
//            
		}
		else
		{
            lineMapStr += "<span>&gt;</span> <strong>"+tmpNm+"</strong>";
		}
//		alert(lineMapStr)
    }
}

function TmpGetMuXML( baseid, sn, en )
{
    for(var i=sn;i<en;i++)
    {                
        if( sn == 0 ) document.write("<br><br>");
    
        var tmpID = baseid + i;
          
        var node = getLineMapNode(tmpID);
        if( node )
        {        
            var tmpScript = "JINHAKMENULIST['"+tmpID+"'] = new SetMenuNmUrl('"+node.getAttribute("name")+"','"+node.getAttribute("url")+"');<br>";
            document.write(tmpScript);
            TmpGetMuXML( tmpID + "_", 1, en );
        }
        else {}
    }        
}


function path(id, node)
{
	try
	{	
	    lineMapStr = "";		
		getMenuNm_Full( id );
		document.write(lineMapStr);
	}
	catch(e)
	{
		if(node == null)
		{
			document.write("아이디가 존재 하지 않습니다 : " + id);
		}
		else
		{
			document.write("예외처리 발생 : " +  e);
		}
	}
}

function Mname(id)
{
	var name  = getMenuNm( id );
	document.write(name);
}

/* Modified By Sangini */
function link()
{
	var id = "";
	var depth = arguments.length;
	// alert(eval("'a"+arguments[0]+"'"));
	try {
		if(depth==0) return;
		else if(depth==1) id = eval("'"+arguments[0]+"'");
		else if(depth==2) id = eval("'"+arguments[0]+"_"+arguments[1]+"'");
		else if(depth==3) id = eval("'"+arguments[0]+"_"+arguments[1]+"_"+arguments[2]+"'");
		else if(depth==4) id = eval("'"+arguments[0]+"_"+arguments[1]+"_"+arguments[2]+"_"+arguments[3]+"'");
		
		if(id=="") 
		{
		    alert("서비스 준비중입니다.");
		}
		else
		{
//			var url  = getMenuLink(id).cnvurl();
            var url  = getMenuLink(id);
			if( url == "" ) 
			{
			    alert('서비스 준비중 입니다.');
			    return;
            }
			return url;
		}
	}
	catch(e)
	{
	    alert('서비스 준비중 입니다.');
    }
}
//#####

/*링크 클릭시 로그인이 필요한 경우  로그인 팝업을 띄운다.
    로그인 했을 경우 해당 url로 이동.
   작성자 : 99ani 
*/
function link_login(id, LoginYN)
{    
	try {
	
        var url  = getMenuLink(id);
	
	    if (LoginYN == "" ){
	    	//pops('/Popup/Popup_Login?ReturnURL=' + url, '로그인', '330', '360');
	    	top.location.href = '/Member/Login?ReturnURL=' + url;
	        return; 
	    }  

		if(id=="") 
		{
		    alert("서비스 준비중입니다.");
		}
		else
		{
			if( url == "" ) 
			{
			    alert('서비스 준비중 입니다.');
			    return;
            }
			location.href = url;
		}
	}
	catch(e)
	{
	    alert('서비스 준비중 입니다.');
    }
}