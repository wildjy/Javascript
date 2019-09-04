//<![CDATA[
var ui = {
  init: function () {
    this.main.init();
    this.sub.init();
  },

  main: {
    init: function () {
      if ($(".gnb").length) {
        this.gnb();
      }
      if ($(".totalBtn").length) {
        this.totalNav();
      }
      if ($(".slider-nav").length) {
        this.slider();
      }
    },

    //Gnb
    gnb: function () {
      var g_nav = true,
        s_nav = true,
        gnb = $(".gnb"),
        sub = $(".sm"),
        gnbTarget = $(".gnb>li>a"),
        subTarget = $(".sm>li>a"),
        offImg = "_off.png",
        onImg = "_on.png",
        _active = $(".gnb>li.selected>a").children("img");

      gnb.children("li").each(function () {
        var _ = $(this);
        if (_.hasClass("selected")) {
          _.children("a").find("img").attr("src", _.children("a").find("img").attr("src").replace(offImg, onImg));
          _.children("ul.sm").show();
        }
      });

      sub.children("li").each(function () {
        var _ = $(this);
        if (_.hasClass("selected")) {
          //_.children("a").find("img").attr("src", _.children("a").find("img").attr("src").replace(".png", onImg));
        }
      });

      gnbTarget.on("mouseover focus", function () {
        var gnbOn = $(".gnb .on"),
          onsrc = $(this).find("img").attr("src").replace(offImg, onImg);

        if (gnbOn.hasClass("on")) {
          var offsrc = gnbOn.find("img").attr("src").replace(onImg, offImg);
          gnbOn.find("img").attr("src", offsrc);
          gnbOn.next("ul").hide();
        };
        gnbOn.removeClass("on");
        $(this).addClass("on");
        if (_active.is(":visible")) {
          _active.attr("src", _active.attr("src").replace(offImg, onImg));
        }
        $(this).find("img").attr("src", onsrc);
        $(".sm").hide();
        $(this).next("ul").show();
      });

      function hideGnb() {
        if (g_nav && s_nav) {
          var _ = $(this);
          var gnbOn = $(".gnb .on");
          if (gnbOn.hasClass("on")) {
            var offsrc = gnbOn.find("img").attr("src").replace(onImg, offImg);
            gnbOn.find("img").attr("src", offsrc);
            gnbOn.next("ul").hide();
            if (_active.is(":visible")) {
              _active.attr("src", _active.attr("src").replace(offImg, onImg));
              $(".gnb>li.selected>ul").show();
            }
          };
        }
      };

      gnb.on("mouseleave", function () {
        g_nav = true;
        hideGnb();
      }).on("mouseenter", function () {
        g_nav = false;
      }).find(".sm").on("mouseleave", function () {
        s_nav = true;
        hideGnb();
      }).on("mouseenter", function () {
        s_nav = false;
      });

      subTarget.find("img").on("mouseover", function () {
        var src = $(this).attr("src");
        var regex = /.png/gi;
        var matches = src.match(/_on/);

        if (!matches) {
          src = this.src.replace(regex, '_on.png');
          $(this).attr("src", src);
        }
      }).on("mouseleave", function () {
        var src = $(this).attr("src");
        var regex = /_on.png/gi;
        var matches = src.match(/_on/);

        if (!$(this).closest(".sm>li.selected").is(":visible")) {
          src = this.src.replace(regex, '.png');
          $(this).attr("src", src);
        };
      });
    },

    //�꾩껜硫붾돱
    totalNav: function () {

      var tt_ = true,
        openTotal = $(".totalBtn>a"),
        totalNav = $(".total_nav");

      openTotal.on("click", function () {
        if (tt_) {
          tt_ = false;
          $(this).find("img").attr("src", $(this).find("img").attr("src").replace("_off.png", "_on.png"));
          totalNav.addClass("on").stop().animate({
            "height": "385px"
          }, 300);
          $("#wrapper").append("<div class='dimm'></div>");

          $('.dimm').on("click", function () {
            tt_ = true;
            openTotal.find("img").attr("src", openTotal.find("img").attr("src").replace("_on.png", "_off.png"));
            totalNav.stop().animate({
              "height": "0px"
            }, 50).removeClass("on");
            $(this).remove();
          })
        } else {
          tt_ = true;
          $(this).find("img").attr("src", $(this).find("img").attr("src").replace("_on.png", "_off.png"));
          totalNav.stop().animate({
            "height": "0px"
          }, 50).removeClass("on");
          $("#wrapper .dimm").remove();
        }
      })
    },

    //硫붿씤 而⑦뀗痢쟳lider
    slider: function () {

    }
  },

  sub: {
    init: function () {
      this.module();
      if ($(".openRecr_top").length) {
        this.openRecrTop();
      }
      if ($(".inside-wrap").length) {
        this.inside(); //�몄궗�대뱶 硫붿씤
      }
      if ($("#inside-wrap").length) {
        this.inside_sub(); //�몄궗�대뱶 �쒕툕
      }
      if ($(".fix-nav").length || $(".moving-nav").length) {
        this.moveNav(".fix-nav", ".inside-obj");
        this.moveNav(".m-navi-1", ".inside-obj");
        this.moveNav(".m-navi-2", ".inside-obj");
      }
      if ($(".popup").length) {
        this.popLayer(".pop-btn", "default");
        this.popLayer(".video-pop-btn", "video");
      }
      if ($(".layerFocus").length) {
        this.layer();
      }
    },

    openRecrTop: function () {
      var $tab = $(".opR-tab>li"),
        $panel = $(".tab-panel"),
        _bottom = $(".openRecr_bottom");
      _num = [];

      for (var i = 0; i <= $tab.length; i++)
        _num.push(i);

      $.each(_num, function () {
        $tab.eq(this).find("a").attr("href", "#tab_" + this);
        $panel.eq(this).attr("id", "tab_" + this);
      })

      //$tab.eq(0).children("a").addClass("on");
      $tab.each(function () {
        var _ = $(this).children("a");
        _txt = _.attr("title"),
          _Bg = _.attr("class").substr(0, 5);
        if (_.hasClass("on")) {
          $(_.attr("href")).show(0, function () {
            $(this).find(".pn-cont").hide();
          });
          _.closest(".opR-tab").addClass(_Bg);
          $(".openRecr_v").addClass(_Bg);
          $(".openRecr_v>.slogen").find("span").text(_txt);
          //$(".nav-btn").addClass("on");
        };
      });

      $(".nav-btn>a").on("click", function () {
        var _ = $(this).parent();

        if (_.hasClass("on")) {
          _.removeClass("on");
          _.next(".pn-cont").hide();
        } else {
          _.addClass("on");
          $(".openRecr_top").append("<div class='dimm'></div>");
          _.next(".pn-cont").show(0, function () {
            _this = $(this);
            _this.find(".close").click(function () {
              _.removeClass("on");
              $(this).parent().hide();
              $(".dimm").remove();
            })
          });
          $(".dimm").click(function () {
            _this.hide();
            $(this).remove();
          })
        }
      });

      var flag = true;
      if (_bottom.height() > 800) {
        $(window).scroll(function () {
          var _winTop = $(this).scrollTop(),
            _posTop = $(".openRecr_v").offset().top + $(".openRecr_v").height() - $(".opR-tab").height(),
            _fixTab = $(".opRecr-Tab-Box"),
            _opBtn = $(".nav-btn"),
            _tenTab = $(".tenTab_slide"),
            _panel = $(".pn-cont");

          if (_winTop >= _posTop - 0) {
            _fixTab.addClass("fixed");
            _tenTab.addClass("fixed");
            /*
            if($(".tab-2").hasClass("on")){
              _bottom.addClass("fix-1");
              _bottom.removeClass("fix");
            } else {
              _bottom.addClass("fix");
              _bottom.removeClass("fix-1");
            }
            */

            if (_opBtn.hasClass("on")) {
              _opBtn.removeClass("on");
            };
          } else {
            _fixTab.removeClass("fixed");
            _tenTab.removeClass("fixed");

            if (_opBtn.hasClass("on") == false) {
              //_opBtn.addClass("on");
              //_panel.show();
            }
            if ($(".tab-2").hasClass("on")) {
              _bottom.removeClass("fix-1");
            } else {
              _bottom.removeClass("fix");
            }

            flag = true;
          }
        });
      }

      var tenSlide = new Swiper('.tenTab_slide', {
        slidesPerView: 'auto',
        freeMode: true,
        loop: false,
        spaceBetween: 0
      });

      var _tenTab = $('.tenTab_slide .swiper-slide');
      for (var i = 0; i < _tenTab.length; i++) {
        if (_tenTab.eq(i).hasClass('active')) {
          tenSlide.slideTo(i, 100, false);
        }
      }
      //tenSlide.slideTo(2, 100, false);

      $tab.on("click", function () {
        var _ = $(this).children("a"),
          _txt = _.attr("title"),
          _posTop = $(".openRecr_v").offset().top + $(".openRecr_v").height() - $(".opR-tab").height(),
          _Bg = _.attr("class").substr(0, 5),
          _img = _.children("img").attr("src");

        $panel.hide();
        $tab.children("a").removeClass("on");
        _.addClass("on");
        $(".openRecr_v").attr("class", "openRecr_v " + _Bg);
        $(".openRecr_v>.slogen").find("span").text(_txt);
        $(".opR-tab").attr("class", "opR-tab " + _Bg);

        if (_.hasClass("on")) {
          $(_.attr("href")).show(0, function () {
            var _ = $(this);
            console.log(_.attr("id"));
            $(".nav-btn").removeClass("on");
            $(".pn-cont").hide();
            if (_.attr("id") == "tab_1") {
              //console.log(tenSlide);
              tenSlide.update();
              var _tenTab = $('.tenTab_slide .swiper-slide');
              for (var i = 0; i < _tenTab.length; i++) {
                if (_tenTab.eq(i).hasClass('active')) {
                  tenSlide.slideTo(i, 100, false);
                }
              }
              //tenSlide.slideTo(2, 100, false);
            } else {
              //tenSlide.destroy();
              tenSlide.slideTo(0, 0, false);
            }

            //_.show();
            //_.find(".nav-btn").addClass("on");
            //_.find(".pn-cont").show();
          });
        }

        if ($(window).scrollTop() > _posTop) {
          /*
          if($(".tab-2").hasClass("on")){
            _bottom.addClass("fix-1");
            _bottom.removeClass("fix");
          } else {
            _bottom.addClass("fix");
            _bottom.removeClass("fix-1");
          }
          */
          $(".nav-btn").removeClass("on");
          $(".pn-cont").hide();
        }

        return false;
      });
    },

    moveNav: function (nav, obj) {
      var _num = [],
        _nav = $(nav);
      _obj = $(obj);

      for (var i = 0; i < _nav.find("a").length; i++)
        _num.push(i);

      $.each(_num, function () {
        _nav.find("a").eq(this).attr("rel", "#nav_" + this);
        $(obj).eq(this).attr("id", "nav_" + this);
      })

      var midSlide = new Swiper('.mid-navi', {
        slidesPerView: 'auto',
        freeMode: true,
        loop: false,
        spaceBetween: 0
      });

      _nav.each(function () {
        var _ = $(this);

        _.find("a").on("click", function () {
          var _rel = $($(this).attr("rel")),
            _pos = _rel.offset().top,
            _this = $(this).parent("div").index();

          $(".moving-nav").find("a").removeClass("active");
          $(this).addClass("active");
          if ($(".fix-nav").is(":visible")) {

            midSlide.slideTo(_this, 0, false);

            $("html, body").stop().animate({
              "scrollTop": _pos - 140
            }, 300, function () {
              $(".thume>a").removeClass("active");
              _rel.find(".thume>a").addClass("active");
            });
          } else {
            $("html, body").stop().animate({
              "scrollTop": _pos - 60
            }, 300);
          }

          /*
          if(_pos == _last){
            console.log("last");
            $(".fix-nav>a:last").addClass("active");
          }
          */
        })
      })

      _obj.each(function (index) {
        var _self = $(this);
        console.log(_self)

        $(window).scroll(function () {
          var wPosY = $(window).scrollTop();
          var offsetCods = _self.offset().top;
          var _rel = $(_self.attr("id"));

          if (wPosY > offsetCods - 143) {
            _nav.find("a").removeClass("active");
            _nav.find("a").eq(index).addClass("active");

            midSlide.slideTo(index, 0, false);

            if (wPosY > offsetCods - 143) {
              _self.find(".thume>a").addClass("active");
            } else {
              $(".thume>a").removeClass("active");
            }

          } else {
            _self.find(".thume>a").removeClass("active");
          }

          if ($(window).width() > 1920) {
            if (wPosY > offsetCods - 640) {
              _nav.find("a").removeClass("active");
              _nav.find("a").eq(index).addClass("active")
            }
          }
        })
      });
    },

    inside: function () {
      var _a = $(window).height(),
        _b = _a - 201;
      _nav = $(".mid-navi");

      $(window).scroll(function () {
        var _wTop = $(window).scrollTop(),
          _limit = $("#header"),
          _fix = $(".visual");

        if (_wTop > _limit.offset().top + 53 && _limit.offset().top + _limit.height() + 53) {
          _nav.addClass("default");

          if (_wTop > _nav.offset().top && _nav.offset().top + _nav.height()) {
            _nav.addClass("fixed").removeClass("default");
          }
          if (_wTop < _fix.offset().top + _fix.height()) {
            _nav.removeClass("fixed");
          }
          $(".scrollTop").fadeIn();
        } else {
          _nav.removeClass("fixed");
          if ($(window).width() < 1920) {
            _nav.removeClass("default");
          }
          $(".scrollTop").fadeOut();
        }
      });

      $(".scrollTop>a").on("click", function () {
        $("html,body").stop().animate({
          "scrollTop": 0
        }, 300);
        return false;
      })
    },

    inside_sub: function () {
      $(window).scroll(function () {
        var _wTop = $(window).scrollTop(),
          _target = $(".fixed-header"),
          _limit = $(".header");

        if (_wTop > 0) {
          $(".logo img").attr("src", $(".logo img").attr("src").replace("-w.png", "-c.png"));
          _target.addClass("fixed");
          $(".scrollTop").fadeIn();
        } else {
          $(".logo img").attr("src", $(".logo img").attr("src").replace("-c.png", "-w.png"));
          _target.removeClass("fixed");
          $(".scrollTop").fadeOut();
        }
      });

      var _s = true
      _ttOpen = $(".menu"),
        _ttNavi = $(".total-navi");
      $body = $('body'),
        $html = $('html');
      var _scroll;

      _ttOpen.on("click", function () {
        if (_s) {
          _s = false;
          _ttNavi.addClass("on").stop().animate({
            "right": "0%"
          }, 300);
          //_scroll = window.pageYOffset;
          //$html.css({"overflow": "hidden"});
          //$body.css({"position":"fixed", "top": -_scroll});

          $('.close').on("click", function () {
            _s = true;
            $(".biz-list>dt>a").removeClass("open");
            $(".biz-list>dt>a").parent().next("dd").stop().animate({
              "height": "0"
            }, 300);
            _ttNavi.removeClass("on").stop().animate({
              "right": "-100%"
            }, 150);
            //$html.css({"overflow":"auto" });
            //$body.css({"position":"", "top":""});
            //window.scrollTo(0, _scroll);
            return false;
          });
        }
        return false;
      });

      $(".biz-list>dt>a").on("click", function () {
        if ($(this).hasClass("open")) {
          $(this).removeClass("open");
          $(this).parent().next("dd").stop().animate({
            "height": "0"
          }, 300);
        } else {
          $(this).addClass("open");
          $(this).parent().next("dd").stop().animate({
            "height": "100%"
          }, 300);
        }
      })

      var _insideSlider = $(".inside-visual");
      _insideSlider.on('init', function (event, slick) {
        $(".v-1").addClass("active");
      });

      _insideSlider.slick({
        autoplay: true,
        fade: true,
        infinite: true,
        autoplaySpeed: 4500,
        speed: 500,
        arrows: false,
        dots: true,
        focusOnSelect: false
      });

      _insideSlider.on('beforeChange', function (slider, event, slick, currentSlide, nextSlide) {
        var nextPanel = $('[data-slick-index=' + currentSlide + ']');
        $(".slick-slide").removeClass("active");
        $(nextPanel).addClass('active');
      });

      //year
      var _yMore = $(".year-more>a"),
        _yArea = $(".year-area"),
        _yBox = $(".year-box");

      _yBox.each(function () {
        var _y = $(this).find("ul li");
        _y.eq(0).show();
        _y.eq(1).show();
      });

      _yMore.on("click", function () {
        if (_yArea.hasClass("more")) {
          $(this).parent().removeClass("on");
          $(this).parent().next().removeClass("more");
          _yBox.find("li").hide();
          for (var a = 0; a < $(".year-box").length; a++) {
            $(_yBox.eq(a).find("li")).eq(0).show();
            $(_yBox.eq(a).find("li")).eq(1).show();
          }
        } else {
          $(this).parent().addClass("on");
          $(this).parent().next().addClass("more");
          _yBox.find("li").show();
        }
        return false;
      });

      $(".year-close>a").on("click", function () {
        _yMore.parent().removeClass("on");
        _yArea.removeClass("more");
        _yBox.find("li").hide();
        for (var a = 0; a < $(".year-box").length; a++) {
          $(_yBox.eq(a).find("li")).eq(0).show();
          $(_yBox.eq(a).find("li")).eq(1).show();
        }
        var _yTop = $(".year-cont").offset().top - 180;
        $("html, body").stop().animate({
          "scrollTop": _yTop
        }, 0);
        return false;
      });

      //
      var sta = true;
      var $qkTop = $(".scrollTop .top");
      var opF = $(".scrollTop .snsOpen");
      var cloF = $(".scrollTop .snsClose");

      opF.on("click", function () {
        var $img = $(this).find("img");
        var $a = $(this).parent().children("a");

        if (sta) {
          sta = false;
          $(this).addClass("on");
          $("#wrap").append("<div class='dimm'></div>");
          $img.attr("src", $img.attr("src").replace("sns-ploating.png", "sns-close.png"));
          $a.append("<span></span>");

          for (var i = 0; i <= $a.length; i++) {
            var txt = $a.eq(-i).children("img").attr("alt");

            $a.eq(-i).find("span").text(txt);
            $a.eq(-i).css({
              "opacity": "1",
              "visibility": "visible"
            }).stop().animate({
              "top": -(($(this).width()) * i) + "px"
            }, 100 * i, function () {
              $a.addClass("on");
            });
          };
        } else {
          sta = true;
          $(this).removeClass("on");
          $("#wrap .dimm").remove();
          $img.attr("src", $(this).find("img").attr("src").replace("sns-close.png", "sns-ploating.png"));
          $a.find("span").remove();
          $a.css({
            "opacity": "0",
            "visibility": "hidden"
          }).stop().animate({
            "top": "0px"
          }, 100);
        }
        return false;
      });

      $(".scrollTop>a").on("click", function () {
        $("html,body").stop().animate({
          "scrollTop": 0
        }, 300);
        return false;
      });
    },

    popLayer: function (target, type) {
      var _num = [],
        _target = $(target);

      for (var i = 0; i < _target.length; i++)
        _num.push(i);

      $.each(_num, function () {
        var $html = '';
        $html += "<div class='layerPop'>";
        $html += "<div class='inLayer'>";
        $html += "<div class='cont'>";
        $html += "<div class='info'>";
        $html += "<p class='ctg-name'></p>";
        $html += "<p class='name'></p>";
        $html += "<p class='type'></p>";
        $html += "</div>";
        $html += "<div class='close'><a href='#self'><img src='https://imgorg.catch.co.kr/job/inside/layer-close.png' alt='�앹뾽�リ린'></a></div>";
        $html += "</div>";

        var popup = $($html);
        $("#inside-wrap").append(popup);

        var _layer = $(".layerPop");
        _target.eq(this).attr("rel", "#ly_" + this);
        _layer.eq(this).attr("id", "ly_" + this);
      });

      _target.each(function () {
        var _ = $(this);

        _.on("click", function () {
          var _pop = $($(this).attr("rel")),
            _data = $(this).find(".data"),
            _data_1 = _data.find(".data-1").html(),
            _data_2 = _data.find(".data-2").html(),
            _data_3 = _data.find(".data-3").html(),
            _url = $(this).attr("data-video");

          switch (type) {
            case "default":
              _pop.fadeIn();
              break;
            case "video":
              _pop.find(".cont").prepend("<div class='video'><iframe src='" + _url + "?feature=player_embedded&vq=hd1080&showinfo=0&autoplay=1&loop=1;playlist=G0RTfxQeMAw' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div>");
              _pop.find(".ctg-name").html(_data_1);
              _pop.find(".name").html(_data_2);
              _pop.find(".type").html(_data_3);
              if (_data_1 == null) {
                $(".info").hide();
              } else {
                $(".info").show();
              }
              _pop.fadeIn();
            default:
              console.log("default")
          };
          _pop.find(".close>a").on("click", function () {
            var _ = $(this).closest(".layerPop");
            if (type == "video") {
              _.find(".video").remove();
            }
            _.hide();
            return false;
          });
        });
      });
    },

    layer: function () {
      /* layer popup */
      $('.layerFocus').click(function () {
        var $self = $(this);
        var $target = $($(this).attr('href'));

        $target.attr('tabindex', '0').show();
        $target.find(".close").focus();

        if ($(".scroll").is(":visible")) {
          $('.scroll').slimScroll({
            height: "650px",
            size: '4px',
            distance: '2px',
            opacity: 7,
            color: '#02a8aa',
            alwaysVisible: true
          });
        }

        $target.find(".close").click(function () {
          $target.hide();
          $self.focus();
          $(this).off('click');
        });
        return false;
      });

      $('.layerClose').each(function () {
        $(document).click(function (e) {
          //if( !$('.layerClose').has(e.target).length )
          //$('.layerClose').hide();
        });
      });
    },

    module: function () {
      //alert();
    }
  }
}

$(document).ready(function () {
  ui.init();
});
//]]>