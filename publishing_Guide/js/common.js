var imgsrc;
$(document).ready(function() {

/* Submenu Rollover Rollout */
	$("#submenu li img").each(function() {
		// Set the original src
		rollsrc = $(this).attr("src");
		rollON = rollsrc.replace(/.gif$/ig,"_on.gif");
		$("<img>").attr("src", rollON);
	});
	
	// Navigation rollovers
	$("#submenu li a").mouseover(function(){
		imgsrc = $(this).children("img").attr("src");
						
		if (imgsrc == null || imgsrc == 'undefined') return;
		//alert(imgsrc);
		matches = imgsrc.match(/_on/);

		// don't do the rollover if state is already ON
		if (!matches) {
		    imgsrcON = imgsrc.replace(/.gif$/ig,"_on.gif"); // strip off extension
		    $(this).children("img").attr("src", imgsrcON);
		}
	});
	$("#submenu li a").mouseout(function(){
	    if(imgsrc) {
		    $(this).children("img").attr("src", imgsrc); // .replace("_on",""));
		}
	});
});

/* ie6 png */
function setPng24(obj) {
	obj.width=obj.height=1;
	obj.className=obj.className.replace(/\bpng24\b/i,'');
	obj.style.filter ="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
	obj.src=''; 
	return '';
}

/* 동영상 */
function MovieView(id,murl,w,h,pv) {
	document.write("\
	<object width='"+w+"' height='"+h+"' id='"+id+"' classid='clsid:22D6f312-B0F6-11D0-94AB-0080C74C7E95' codebase='http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701' standby='Loading Microsoft Windows Media Player components...' type='application/x-oleobject' VIEWASTEXT>\
	<param NAME='FILENAME' VALUE='"+murl+"'>\
	<param NAME='AutoRestart' VALUE='false'>\
	<param NAME='ShowAudioControls' VALUE='"+pv+"'>\
	<param NAME='ShowControls' VALUE='"+pv+"'>\
	<param NAME='PlayCount' VALUE='1'>\
	<param NAME='EnableContextMenu' Value='1'>\
	<param NAME='BufferTime' VALUE='3'>\
	<PARAM NAME='ClickToPlay' VALUE='1'>\
	<param name='ShowStatusBar' value='"+pv+"'>\
	<param name='AnimationAtStart' value='true'>\
	<param name='windowlessVideo' value='1'>\
	</object>\
	");
}

/* TabMenu */
function tabview(tab, viewer, txtimg, total, current) {
	var slttab = document.getElementById(tab+current);
	var sltview = document.getElementById(viewer+current);
	var slttxt = document.getElementById(txtimg+current);

	for(i=1; i<=total; i++) {
		if(document.getElementById(tab+i)) document.getElementById(tab+i).className = "";
		if(document.getElementById(viewer+i)) document.getElementById(viewer+i).style.display = "none";
		if(document.getElementById(txtimg+i)) document.getElementById(txtimg+i).src = document.getElementById(txtimg+i).src.replace("_on.gif", ".gif");
	}
	if(sltview) {
		if(slttab) slttab.className = "selected"
		sltview.style.display = "block";
		if(slttxt) slttxt.src = slttxt.src.replace(".gif", "_on.gif");
	}
}

/* iframe resize */ 
function resizeFrame(iframeObj) {
	var innerBody = iframeObj.contentWindow.document.documentElement;
	oldEvent = innerBody.onclick;
	innerBody.onclick = function(){ resizeFrame(iframeObj, 1);oldEvent; };
	var innerHeight = innerBody.scrollHeight;
	iframeObj.style.height = innerHeight + "px";
}

/* over out */
function over(obj) { document.getElementById(obj).style.display='block'; }
function out(obj) { document.getElementById(obj).style.display='none'; }

/* popup */
function pop(url,name,w,h){ var popupWin = window.open(url,name,'width='+w+',height='+h+',scrollbars=no,status=1'); popupWin.focus(); } //Popup(스크롤바없음)
function pops(url,name,w,h){ var popupWin = window.open(url,name,'width='+w+',height='+h+',scrollbars=yes'); popupWin.focus(); } //Popup(스크롤바있음)
function popresize(url,name,w,h){ window.open(url,name,'width='+w+',height='+h+',scrollbars=0,status=1,resizable=1') } //Popup(팝업 리사이징)
function popfullscreen (url,name){ window.open(url,name,'fullscreen=yes,menubar=no,status=no,toolbar=no,titlebar=no,location=no,scrollbars=yes,height='+screen.height+',width='+screen.width) }

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
