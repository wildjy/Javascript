// 2020.07.28 by : wildcat.

//hasClass
function hasClass(ele,cls) {
  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
//addClass
function addClass(ele,cls) {
  if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
//removeClass
function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
  }
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
    vanillaScroll : function($standard, $target, $fixed, $class, $type){
      //$standard(script 유무), $target(fixed 기준), $fixed(fixed-target), $class(fix addClass), $type[default, menu]
      var _standard = document.querySelector($standard);
      var _target = document.querySelector($target);
      addClass(_standard, 'aa');
      addClass(_target, 'cc');

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
      var _limit = clientRect.top;
      console.log(clientRect);

      if(y_pos > _limit){
        console.log("remove")
        removeClass(_target, $class);
        removeClass(_fixed, $class);
      }

      function scrolling(){
        var y_pos = window.pageYOffset;
        var _limit = clientRect.top;
        //console.log(y_pos);
        //console.log(_limit);
        if(y_pos > _limit){
          addClass(_target, $class);
          addClass(_fixed, $class);
        } else {
          removeClass(_target, $class);
          removeClass(_fixed, $class);
        }
      }
      window.addEventListener('scroll', scrolling);
    }
  }
}

ui_Project.init();