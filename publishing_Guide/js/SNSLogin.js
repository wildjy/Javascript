// 5:네이버 6:카카오 7:페이스북 8:구글
// $(document).ready(function () {
// 	// 5:네이버 6:카카오 7:페이스북 8:구글
// 	$(document).on('click', '#kakao_id_login', function (e) {
// 		loginWithKakao();
// 	});
// 	$(document).on('click', '#facebook_id_login', function (e) {
// 		fb_login();
// 	});
// 	$(document).on('click', '#google_id_login', function (e) {
// 		Googlelogin();
// 	});
// });

function pops(url,name,w,h){ var popupWin = window.open(url,name,'width='+w+',height='+h+',scrollbars=yes'); popupWin.focus(); } //Popup(스크롤바있음)

//카카오 초기화
//<![CDATA[
// 사용할 앱의 JavaScript 키를 설정해 주세요.
var isInit;
if (!isInit && window.Kakao) {
	try {
		Kakao.init('32cb382f6e6cdaedbc079b69e4080502');
		isInit = true;
	} catch (e) {}
}
function loginWithKakao() {
	if (!window.Kakao) {
		alert('현재 카카오 로그인 사용이 불가능합니다.');
		return;
	}
	// 로그인 창을 띄웁니다.
	Kakao.Auth.login({
		success: function (authObj) {
			//alert(JSON.stringify(authObj));
			Kakao.API.request({
				url: '/v1/user/me',
				//data: {	propertyKeys: ['kaccount_email'] },
				success: function (res) {
					//alert(JSON.stringify(res)); //<---- kakao.api.request 에서 불러온 결과값 json형태로 출력
					//alert(res.kaccount_email);
					//return;
					var nickname = "";
					var id = "";
					var email = "";
					var gender = "";

					if (res !== undefined) {
						id = res.id;
						email = "";
					}
					if (res.properties !== undefined) nickname = res.properties.nickname;
					if (nickname != "") nickname = encodeURIComponent(nickname);
					//if (res.kaccount_email == null || res.kaccount_email == 'undefined')
					//	alert("로그인 연동에 필요한 이메일 주소가 없어 로그인 연동을 이용할 수 없습니다.");
					//else

					// 이메일
					if (res.kaccount_email) email = res.kaccount_email;
					
					// 성별
					if (res.kaccount_gender) {
						if (res.kaccount_gender == 'male') gender = 'M';
						else if (res.kaccount_gender == 'female') gender = 'F';
					}

					var req = "RegSite=6&SocialID=" + id + "&Name=" + nickname + "&Gender=" + gender;
					pops("/Member/SNSAuth/Kakao?" + req, "SNSAuthKakao", "440", "500");
				}
			})
		},
		fail: function (err) {
			//alert(JSON.stringify(err));
			alert('인증에 문제가 있습니다.');
		}
	});
};
//]]>

//페이스북 초기화
window.fbAsyncInit = function () {//993853047295620 -www.careeacatch.co.kr 
	FB.init({ appId: '993853047295620', status: true, cookie: true, xfbml: true });
};

function checkEmail(email) {
	var res = true;
	// 정규식 - 이메일 유효성 검사
	var regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

	//이메일 체크
	if (!regEmail.test(email)) res = false;

	return res;
}

function fb_login() {
	if (!window.FB) {
		alert('현재 페이스북 로그인 사용이 불가능합니다.');
		return;
	}
	FB.init({ appId: '993853047295620', status: true, cookie: true, xfbml: true });
	FB.login(function (response) {
		if (response.authResponse) {
			access_token = response.authResponse.accessToken; //get access token
			user_id = response.authResponse.userID; //get FB UID
			//$('#email').html(response.email);
			FB.api('/me', { fields: 'email,id,name,gender' }, function (response) {
				var email = response.email;
				var id = response.id;
				var name = response.name;
				if (name) name = encodeURIComponent(name);
				var gender = response.gender;
				if (gender) gender = gender.toUpperCase();
				if (checkEmail(email) || id.length > 0) {
					//alert(email);
					var req = "RegSite=7&Email=" + email + "&SocialID=" + id + "&Name=" + name + "&Gender=" + gender;
					pops("/Member/SNSAuth/Facebook?" + req, "SNSAuthFacebook", "440", "500");
				}
				else {
					alert("페이스북 이메일 정보가 없습니다. 페이스북 아이디로 로그인을 이용할 수 없습니다.");
				}
				/*
				var html = '<table>';
				for (var key in response) {
					html += ('<tr>' +'<th>' + key + '</th>' +'<td>' + response[key] + '</td>' +'</tr>'  );
				}
				$("#thishe").html(html+'</table>');
				*/

				});

		} else {
			//user cancel
		}
	}, {
		scope: 'public_profile,email'
	});
}



// 구글 초기화	
// Called when Google Javascript API Javascript is loaded
function HandleGoogleApiLibrary() {
	// Load "client" & "auth2" libraries
	gapi.load('client:auth2', {
		callback: function () {
			// Initialize client library
			// clientId & scope is provided => automatically initializes auth2 library
			gapi.client.init({
				apiKey: 'AIzaSyCCAc8VXJCzZ3b99pK0T9T0OpBLNR3MALk',
				client_id: '439490372558-sfeq5afgar3347nopsrsj8c4oihqm4f8.apps.googleusercontent.com',
				scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me'
			}).then(
				// On success
				function (success) {
					// After library is successfully loaded then enable the login button
					//$("#login-button").removeAttr('disabled');
				},
				// On error
				function (error) {
					//alert('Error : Failed to Load Library');
				}
			);
		},
		onerror: function () {
			// Failed to load libraries
		}
	});
}

// Click on login button
//$("#google_id_login").on('click', function () {
function Googlelogin() {
	//$("#login-button").attr('disabled', 'disabled');

	if (!window.gapi) {
		alert('현재 구글 로그인 사용이 불가능합니다.');
		return;
	}

	// API call for Google login
	gapi.auth2.getAuthInstance().signIn().then(
		// On success
		function (success) {
			// API call to get user information
			gapi.client.request({ path: 'https://www.googleapis.com/plus/v1/people/me' }).then(
				// On success
				function (success) {
					//console.log(success);
					var user_info = JSON.parse(success.body);
					//console.log(user_info);

					//$("#user-information div").eq(0).find("span").text(user_info.displayName);
					//$("#user-information div").eq(1).find("span").text(user_info.id);
					//$("#user-information div").eq(2).find("span").text(user_info.gender);
					//$("#user-information div").eq(3).find("span").html('<img src="' + user_info.image.url + '" />');
					//$("#user-information div").eq(4).find("span").text(user_info.emails[0].value);

					//$("#user-information").show();
					//$("#login-button").hide();
					
					//alert(user_info.gender);
					var gender = '';
					if (user_info.gender) gender = user_info.gender.toUpperCase().substr(0, 1);

					var req = "RegSite=8&Email=" + user_info.emails[0].value + "&SocialID=" + user_info.id + "&Name=" + encodeURIComponent(user_info.displayName) + "&Gender=" + gender;
					pops("/Member/SNSAuth/Google?" +req, "SNSAuthGoogle", "440", "500");
				},
				// On error
				function (error) {
					//$("#login-button").removeAttr('disabled');
					//alert('Error : Failed to get user user information');
				}
			);
		},
		// On error
		function (error) {
			//$("#login-button").removeAttr('disabled');
			//alert('Error : Login Failed');
		}
	);
}
//});
