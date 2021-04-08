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
// this addClass
function thisAddActive(_this, cls, callback){
	addClass(_this, cls);
}
// this removeClass
function thisRemoveActive(_this, cls, callback){
	removeClass(_this, cls);
};
// toggle active
function toggleActive(_this, obj, cls, callback){
	if(hasClass(document.getElementById(obj), cls)){
    removeClass(_this, cls);
		removeClass(document.getElementById(obj), cls);
	} else {
    addClass(_this, cls);
		addClass(document.getElementById(obj), cls);
	}
};
// element show
function overShow(obj, cls, type, callback){
	addClass(document.getElementById(obj), cls);
	document.getElementById(obj).style.display = type;
};
// element hide
function overHide(obj, cls, callback){
	removeClass(document.getElementById(obj), cls);
	document.getElementById(obj).style.display = "none";
};
// toggle element show/hide
function toggleShow(_this, obj, cls, type, callback){
	if(hasClass(document.getElementById(obj), cls)){
    removeClass(_this, cls);
		removeClass(document.getElementById(obj), cls);
		document.getElementById(obj).style.display = "none";
	} else {
    addClass(_this, cls);
		addClass(document.getElementById(obj), cls);
		document.getElementById(obj).style.display = type;
	}
};

// iframe out element show
function iframeShow(obj, cls, type, callback){
	//console.log(obj);
	//console.log($('#info', parent.document));
	var test = $("#" + obj, parent.document);
	test.addClass(cls);
	test.css({"display" : type});
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
    tabModule : function($tab, $panel, $cls, $callback){
      var _target = document.querySelector($tab);
      var _tab = _target.getElementsByTagName("li");
      var _panel = document.querySelectorAll($panel);
      //console.log(_target)
      //console.log(_tab.getElementsByClassName("selected"))
      console.log(_panel)

      function getElementIndex(element, range) {
        // 추가
        if (!!range) return [].indexOf.call(element, range);
        return [].indexOf.call(element.parentNode.children, element);
      }

      var ele = document.getElementById('common_Tab').getElementsByClassName('selected');
      var testElements = document.getElementsByClassName('selected');
      var testDivs = Array.prototype.filter.call(testElements, function(testElement) {
        //console.log(testElement.index);
        return testElement.getIndex;
      });
      Array.prototype.forEach.call(_tab, function(tab, index) {
        //console.log(tab.setAttribute("data-tabNum", index));
        //console.log(tab.setAttribute("data-tabNum", index));
        console.log(index);

        // _panel[_isTab].style.display = 'block';
      });

      function hidePanel(){
        Array.prototype.forEach.call(_panel, function(panelList, index) {
          panelList.style.display = 'none';
        });
      };

      hidePanel();

      // call
      Array.prototype.forEach.call(_tab, function(tabList, index) {
        //console.log(tabList);
        //console.log(index);
        tabList.children[0].setAttribute("data-tabNum", index); //data-tabNum setting

        _panel[0].style.display = 'block'; // first tab panel show
        tabList.children[0].addEventListener('click', function(e) {
          var _isTab = this.getAttribute('data-tabNum'); //data-tabNum search
          console.log(this);
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
      })
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

    }
  }
}

ui_Project.init();