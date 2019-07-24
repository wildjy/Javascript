function floating() {
	this.isIE = (navigator.userAgent.toLowerCase().indexOf("msie") != -1);

	this.objBasis = null;									// 플로팅 기준객체
	this.objFloating = null;								// 플로팅 객체
	this.timer = null;										// 타임 객체

	this.speed = 5;										// 미끄러지는속도 : 작을수록 빠름
	this.time = 10;											// 빠르기 : 작을수록 부드러움
	this.isMove = true;									// 이동여부

	this.initTop;												// 초기 TOP 위치 : 설정시 해당위치에서 marginTop 위치로 미끄러져 온다. 예) -1000

	this.bodyMargin = { left : 0, top : 0 };		// BODY MARGIN

	this.left;
	this.top;

	this.marginLeft;
	this.marginTop;
	this.marginBottom;

	this.init = function() {
		var self = this;

		if (!this.isIE) this.speed *= 1.2;

		if (this.objFloating) {
			this.marginLeft = (typeof this.marginLeft == "undefined") ? 0 : parseInt(this.marginLeft, 10);
			this.marginBottom = (typeof this.marginBottom == "undefined") ? 0 : parseInt(this.marginBottom, 10);

			if (this.objBasis) {
				this.marginTop = (typeof this.marginTop == "undefined") ? this.getOffset(this.objBasis).top : parseInt(this.marginTop, 10);

				this.left = parseInt(this.objBasis.offsetWidth, 10) + this.marginLeft;
				this.top = this.marginTop;

				this.objFloating.style.left = (this.getOffset(this.objBasis).left + this.left) + "px";
				this.objFloating.style.top = ((typeof this.initTop == "undefined") ? this.top : this.initTop) + "px";
				this.objFloating.style.display = "";

				this.addEvent(window, 'resize', function() { self.resize(); });
			}
			else {
				this.marginTop = (typeof this.marginTop == "undefined") ? 0 : parseInt(this.marginTop, 10);

				this.top = this.getOffset(this.objFloating).top + this.marginTop;

				this.objFloating.style.marginLeft = this.marginLeft + "px";
				this.objFloating.style.top = this.top + "px";

				this.objFloating.style.display = "";
			}
		}
	}

	this.run = function() {
		var self = this;

		if (!this.objFloating) return;

		var floatingHeight = this.objFloating.offsetHeight;

		var floatingTop = (this.objFloating.style.top) ? parseInt(this.objFloating.style.top, 10) : this.objFloating.offsetTop;
		var docTop = (document.documentElement.scrollTop || document.body.scrollTop) + this.top;
		var moveTop = Math.ceil(Math.abs(floatingTop - docTop) / this.speed);

		var floatingBottom = floatingTop + moveTop + floatingHeight;
		var limitBottom = document.body.scrollHeight - this.marginBottom;

		if (floatingTop < docTop) {
			this.objFloating.style.top = ((floatingBottom < limitBottom) ? floatingTop+moveTop : limitBottom-floatingHeight) + "px";
		}
		else {
			this.objFloating.style.top = (floatingTop - moveTop) + "px";
		}

		this.timer = setTimeout(function () { self.run() }, this.time);
	}

	this.move = function() {
		if (this.isMove) {
			this.isMove = false;
			clearTimeout(this.timer);
			this.objFloating.style.top = this.top + "px";
		}
		else {
			this.isMove = true;
			this.run();
		}
	}

	this.resize = function() {
		if (this.objFloating) this.objFloating.style.left = (this.getOffset(this.objBasis).left + this.left) + "px";
	}

	this.getOffset = function(obj) {
		var objOffset = { left : 0, top : 0 };
		var objOffsetParent = obj.offsetParent;

		objOffset.left = parseInt(obj.offsetLeft, 10);
		objOffset.top = parseInt(obj.offsetTop, 10);

		while (objOffsetParent) {
			objOffset.left += parseInt(objOffsetParent.offsetLeft, 10);
			objOffset.top += parseInt(objOffsetParent.offsetTop, 10);

			objOffsetParent = objOffsetParent.offsetParent;
		}

		return objOffset;
	}

	this.addEvent = function(obj, evt, exec) {
		if (window.attachEvent) obj.attachEvent('on'+evt, exec);
		else if (window.addEventListener) obj.addEventListener(evt, exec, false);
		else obj['on'+evt] = exec;
	}
}
