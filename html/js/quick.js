			 //QUCIK 메뉴!!!
			 var stmnLEFT = -120; // 왼쪽 여백
			 var stmnGAP1 = 0; // 위쪽 여백
			 var stmnGAP2 = -133; // 스크롤시 위쪽과 떨어지는 거리
			 var stmnBASE = 0; //스크롤 시작위치
			 var stmnActivateSpeed = 50;// 누르고 나서 올라오는 속도
			 var stmnScrollSpeed = 50; // 따라 내려오는 속도 (클수록 빠름!)
			 var stmnTimer; 
			 
			 function RefreshStaticMenu() { 
			  var stmnStartPoint, stmnEndPoint; 
			  stmnStartPoint = parseInt(document.getElementById('quick').style.top, 10); 
			  stmnEndPoint = Math.max(document.documentElement.scrollTop, document.body.scrollTop) + stmnGAP2; 
			  if (stmnEndPoint < stmnGAP1) stmnEndPoint = stmnGAP1; 
			  if (stmnStartPoint != stmnEndPoint) { 
				stmnScrollAmount = Math.ceil( Math.abs( stmnEndPoint - stmnStartPoint ) / 15 ); 
				document.getElementById('quick').style.top = parseInt(document.getElementById('quick').style.top, 10) + ( ( stmnEndPoint<stmnStartPoint ) ? -stmnScrollAmount : stmnScrollAmount ) + 'px'; 
				stmnRefreshTimer = stmnScrollSpeed; 
				}
			  stmnTimer = setTimeout("RefreshStaticMenu();", stmnActivateSpeed); 
			  } 
			 function InitializeStaticMenu() {
			  document.getElementById('quick').style.right = stmnLEFT + 'px';
			  document.getElementById('quick').style.top = document.body.scrollTop + stmnBASE + 'px'; 
			  RefreshStaticMenu();
			  }
			  window.onload=InitializeStaticMenu;
