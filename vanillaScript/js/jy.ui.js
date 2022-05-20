// Front UI Script
// 2020.07.28 by : wildcat.

// inint : hasClass, addClass, removeClass
function hasClass(ele,cls) {
  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};
function addClass(ele,cls) {
  if (!this.hasClass(ele,cls)) ele.className += " " + cls;
};
function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,'');
  }
};

//addClass, removeClass
// target addClass
function addActive(obj, cls, callback){
	addClass(document.getElementById(obj), cls);
};
// target removeClass
function removeActive(obj, cls, callback){
	removeClass(document.getElementById(obj), cls);
};
function toggleShow(_this, obj, cls, type, callback){
	if(hasClass(document.getElementById(obj), cls)){
		_this.classList.remove(cls);
		removeClass(document.getElementById(obj), cls);
		document.getElementById(obj).style.display = "none";
	} else {
		_this.classList.add(cls);
		addClass(document.getElementById(obj), cls);
		document.getElementById(obj).style.display = type;
	}
}
function overShow(obj, cls, type, callback){
	addClass(document.getElementById(obj), cls);
	document.getElementById(obj).style.display = type;
}
function iframeShow(obj, cls, type, callback){
	//console.log(obj);
	//console.log('inner.html �� �⑥닔');
	//console.log($('#info', parent.document));
	var test = $("#" + obj, parent.document);
	test.addClass(cls);
	test.css({"display":type});
}
function iframeHide(obj, cls, type, callback){
	//console.log(obj);
	//console.log('inner.html �� �⑥닔');
	//console.log($('#info', parent.document));
	var test = $("#" + obj, parent.document);
	test.removeClass(cls);
	test.css({"display":type});
}
function overHide(obj, cls, callback){
	removeClass(document.getElementById(obj), cls);
	document.getElementById(obj).style.display = "none";
}
//addClass, removeClass
function toggleActive(_this, obj, cls, callback){
	if(hasClass(document.getElementById(obj), cls)){
		_this.classList.remove(cls);
		removeClass(document.getElementById(obj), cls);
	} else {
		_this.classList.add(cls);
		addClass(document.getElementById(obj), cls);
	}
}
function addActive(obj, cls, callback){
	addClass(document.getElementById(obj), cls);
}
function removeActive(obj, cls, callback){
	removeClass(document.getElementById(obj), cls);
}
function thisAddActive(_this, cls, callback){
	_this.classList.add(cls);
	//addClass(document.getElementById(obj), cls);
}
function thisRemoveActive(_this, cls, callback){
	_this.classList.remove(cls);
	//removeClass(document.getElementById(obj), cls);
}

//fadeIn
function fadeIn(target){
	var level = 0;
	var inTimer = null;
	inTimer = setInterval(function(){
		level = fadeInAction(target, level, inTimer);
	}, 50)
};
function fadeInAction(target, level, inTimer){
	level = level + 0.1;
	changeOpacity(target, level);
	target.style.display = "block"
	if(level > 1) {
		clearInterval(inTimer);
	} else {
		return level;
	}
}
//fadeOut
function fadeOut(target){
	var level = 1;
	var outTimer = null;
	inTimer = setInterval(function(){
		level = fadeInAction(target, level, outTimer);
	}, 50)
};
function fadeOutAction(target, level, outTimer){
	level = level - 0.1;
	changeOpacity(target, level);
	target.style.display = "none"
	if(level<0) {
		clearInterval(outTimer);
	} else {
	return level;
	}
}
function changeOpacity(target, level){
	var obj = target;
	obj.style.opacity = level;
	obj.style.MozOpacity = level;
	obj.style.KhtmlOpacity = level;
	obj.style.MsFilter = "'progid: DXImageTransform.Microsoft.Alpha(Opacity=" + (level * 100) + ")'";
	obj.style.filter = "alpha(opacity=" + (level * 100) + ");";
}

function toolTip(target, cls, type, callback){
	//target : this, cls : class, type : close
	switch (type){
		case "close" : //close
			//console.log("close");
			removeClass(target.parentNode.parentNode.previousElementSibling , cls);
			removeClass(target.parentNode.parentNode, cls);
		break;
		default : //default
			//console.log("default");
			if(hasClass(target, cls)){
				removeClass(target, cls);
				removeClass(target.nextElementSibling, cls);
				//target.nextElementSibling.classList.remove(cls);
			} else {
				addClass(target, cls);
				addClass(target.nextElementSibling, cls);
				//target.nextElementSibling.classList.add(cls);
			}
		break;
	};
}

// Get a index number from siblings
function getIndex(ele) {
  var _i = 0;
  while((ele = ele.previousSibling) != null ) {
    _i++;
  }

  return _i;
}

var ui_Project = {
  init : function () {
    this.common.init();
  },

  common : {
    init: function () {
      //console.log("test");
    }
  },

  ui : {
    tabModule : function($tab, $panel, $cls, $type, $callback){
      var _target = document.querySelector($tab);
      var _tab = _target.querySelectorAll("li");
      var _panel = document.querySelectorAll($panel);

      console.log(_tab);
			switch ($type){
      case "reset" : //reset
        //console.log("reset");
        var _allTab = document.querySelectorAll($tab);

        console.log(_allTab)
        console.log(_allTab.children)

				Array.prototype.forEach.call(_allTab, function(tab, index) {
          console.log(tab.children)
          console.log(tab.children[0])

          for(var i=0; i < tab.children.length; i++){
            if(tab.children[i].nodeType != 1) continue
            var items = tab.children.item(i);
            items.classList.remove($cls);
          }
          addClass(tab.children[0], $cls);
				});

				Array.prototype.forEach.call(_tab, function(tab, index) {
          removeClass(tab, $cls);
				});
				Array.prototype.forEach.call(_panel, function(panelList, index) {
					panelList.style.display = 'none';
				});

        addClass(_tab[0], $cls);
				_panel[0].style.display = 'block';
        break;
      case "hide" : // hide
        //console.log("hide");

				Array.prototype.forEach.call(_tab, function(tab, index) {
          removeClass(tab, $cls);
				});
				Array.prototype.forEach.call(_panel, function(panelList, index) {
					panelList.style.display = 'none';
				});

        break;
      default : //init Event

        function hidePanel(){
          Array.prototype.forEach.call(_panel, function(panelList, index) {
            panelList.style.display = 'none';
          });
        };

        hidePanel();

        Array.prototype.forEach.call(_tab, function(tabList, index) {
          //console.log(tabList);
          //console.log(index);
          tabList.children[0].setAttribute("data-tabNum", index); //data-tabNum setting

          //_panel[0].style.display = 'block'; // first tab panel show
          tabList.children[0].addEventListener('click', function(e) {
            var _isTab = this.getAttribute('data-tabNum'); //data-tabNum search
            //console.log(this);
            //console.log(_isTab);

            // tab
            Array.prototype.forEach.call(_tab, function(tabList, index) {
              removeClass(tabList, $cls);
            });
            // tab panel
            hidePanel();
            // active
            addClass(this.parentElement, $cls);
            _panel[_isTab].style.display = 'block';

            e.preventDefault()
          })
        });

        //active selected
        var _active = _target.querySelectorAll("li.selected")[0];
        var _activeNum = _active.firstChild.getAttribute('data-tabNum');
        _panel[_activeNum].style.display = 'block';

        break;
      };
    },

    scroll : function($standard, $target, $fixed, $class, $type){
      //$standard(script 유무), $target(fixed relative), $fixed(fixed target), $class(fix addClass), $type[default, menu]
      var _standard = document.querySelector($standard);
      var _target = document.querySelector($target);

      switch ($type){
      case "default" : //default
        var	_fixed = document.querySelector($fixed);
        break;
      case "menu" : // report fixed menu
        var	_fixed = document.querySelector($fixed);
        _target.style.height = _fixed.clientHeight + "px";
        break;
      default : //error
        console.log("error");
        break;
      };

      var clientRect = _target.getBoundingClientRect();
      var y_pos = window.pageYOffset;
      var _limit = window.pageYOffset + clientRect.top;
      //console.log(clientRect);

      if(y_pos > _limit){
        console.log("remove");
      };

      function scrolling(){
        var y_pos = window.pageYOffset;
        //var _limit = window.pageYOffset + clientRect.top;

        if(y_pos > _limit){
          addClass(_target, $class);
          addClass(_fixed, $class);
        } else {
          removeClass(_target, $class);
          removeClass(_fixed, $class);
        }
      };

      window.addEventListener('scroll', scrolling);
    },

		toggle_Module :  function(target, btn, panel, cls, callback){
			//target = item, btn = open_btn, panel = show/hide contents, cls = class
			var _item = document.querySelectorAll(target);
			var _btn = document.querySelectorAll(btn);
			var _panel = document.querySelectorAll(panel);

      Array.prototype.forEach.call(_item, function(item, index) {
				var _this = item.querySelectorAll(btn);

        _this[0].addEventListener('click', function(e) {
          //console.log(_panel);
					if(hasClass(this, cls)){
						this.classList.remove(cls);
						this.nextElementSibling.classList.remove(cls);
					} else {
						for ( var i = 0; i < _panel.length; i++ ) {
							//console.log(i);
							_panel[i].classList.remove(cls);
							_btn[i].classList.remove(cls);
						}
						this.classList.add(cls)
						this.nextElementSibling.classList.add(cls);
					}
        });
      });
		},

    slick_Module : function(selector, newObj, callback){
      var slickObj = {
        infinite: true,
        autoplay: false,
        touchMove: false,
        pauseOnHover: false,
        variableWidth: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplaySpeed: 1000,
        speed: 200,
        arrows: true,
        dots: false
      };
      //console.log(slickObj)

      // var _slick = document.getElementsByClassName(selector)[0];
      // //console.log(_slick);
      // $(_slick).slick({
      //   ...newObj ? {...slickObj, ...newObj} : slickObj
      // });

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }return target;
      };

      var _slick = document.getElementsByClassName(selector)[0];
      //console.log(_slick);
      $(_slick).slick(_extends({}, newObj ? _extends({}, slickObj, newObj) : slickObj));
    },

    swiper_Module : function(selector, newObj, callback){

      var _swiper = document.getElementsByClassName(selector)[0];

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }return target;
      };

      var swiperObj = {
        pagitaion: '.swiper-pagination',
        paginationClickable: true,
        slidesPerView: 'auto',
        spaceBetween: 0
      };

      var isSwiper = new Swiper(_swiper, newObj ? _extends({}, swiperObj, newObj) : swiperObj);

      for (var i = 0; i < $(_swiper).find(".swiper-slide").length; i++) {
        if ($(_swiper).find(".swiper-slide").eq(i).hasClass("selected")) {
          //isSwiper.slideTo(i, 100)
        }
      }

    },

		fontSizeChange : function(target, btn, change, set, cls){
			/*
				target = controls parent Element,
				btn = controls btn ,
				change = contents Element,
				set = change find target Element, ( + css style setting )
				cls = add class
			*/
			var _target = document.getElementById(target);
			var _sizeBtn = _target.querySelectorAll(btn);
			var _changeTarget = document.getElementById(change);
			var _changeContents = _changeTarget.querySelectorAll(set);

			_changeTarget.setAttribute('class', '');

			Array.prototype.forEach.call(_changeContents, function(setFont, index) {
				Array.prototype.forEach.call(_sizeBtn, function(sizeBtn, index) {
					sizeBtn.addEventListener('click', function(e) {
						//console.log(sizeBtn);
						//console.log(setFont);
						var _size = this.getAttribute('id'); // size
						var _set = set.replace('.', '');

						setFont.setAttribute('class', _set); //class setting
						setFont.classList.add(_size);

						Array.prototype.forEach.call(_sizeBtn, function(btn, index) {
							removeClass(btn, cls);
						});
						this.classList.add(cls);

						e.preventDefault();
					})
				});
			});
		}

  }
}

ui_Project.init();