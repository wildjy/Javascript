// Front UI Script
// 2020.07.28 by : wildcat.

// inint : hasClass, addClass, removeClass
function hasClass(ele,cls) {
  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};
function addClass(ele,cls) {
  if (!this.hasClass(ele,cls)) ele.className += " "+cls;
};
function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
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
      console.log(_tab)
      console.log(_panel)


      Array.prototype.forEach.call(_tab, function(tab, index) {
        var a = tab.getAttribute('class').indexOf('selected');
        var b = [a];
        console.log(b.indexOf(true))
        if(a === true){

        }
        //_panel[_isTab].style.display = 'block';
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
        console.log(index);
        tabList.children[0].setAttribute("data-tabNum", index); //data-tabNum setting

        _panel[0].style.display = 'block'; // first tab panel show
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
    }
  }
}

ui_Project.init();