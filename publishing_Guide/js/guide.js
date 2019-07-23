    //<![CDATA[
      var ui = {
        init : function(){
            ui.nav();
            ui.guide();
        },

        nav : function(){
            var sta = false;

            for(var i=0; i<=$(".nav>li").length; i++){
                $(".nav>li").eq(i).children("a").attr("href","#pos_" + (i+1));
                $(".guide_Area").eq(i).attr("id","pos_" + (i+1));
            }
            
            //
            $(".nav>li>a").on("click", function(){
                //alert()
                var $pos = $($(this).attr("href")).offset().top,
                liLen = $(this).closest(".nav").find("li").length;
                //console.log($pos);
                //$(".nav>li>a").removeClass("on");
                //$(this).addClass("on");
                if(liLen !== $(".guide_Area").length){
                    alert("nav메뉴와 '.guide_Area'의 갯수가 동일한지 체크하세요.");
                }
                $("html,body").stop().animate({"scrollTop":$pos - 100}, 300);
                return false;
            });

            $(".open_gnb").on("click", function(){
                if(sta){
                    sta = false;
                    $("body.guide").removeClass("is-open");
                    $("body.guide").addClass("is-closed");
                    //$(".guide_nav").stop().animate({"left":"0%"}, 500);
                } else {
                    sta = true;
                    $("body.guide").addClass("is-open");
                    $("body.guide").removeClass("is-closed");
                    //$(".guide_nav").stop().animate({"left":"-50%"}, 500);
                }
            })
        },

        guide : function(){
            var $num = [];

            for(var i=0; i<=$(".guide_block").length; i++)
            $num.push(i);
           
            $.each($num, function(){
                //console.log(this);
                var target = $(".guide_block").eq(this),
                guideBox = target.find(".guide_box"),
                guideView = target.find(".view_guide"),
                moreBtn = target.find(".more");
                
                if(guideView.is(":visible")){
                    target.find(".more").addClass("on");

                    if(guideBox.html().replace(/(^\s*)|(\s*$)/g, "") == ""){
                        guideBox.hide();
                    }

                    if(guideView.html().replace(/(^\s*)|(\s*$)/g, "") == ""){
                        guideView.hide();
                    }
                    
                    if(guideView.height() >= 300){
                        guideView.addClass("min");//reset min-height

                        moreBtn.show();
                        moreBtn.on("click", function(){
                            var targetClosest = $(this).closest(".guide_block"),
                            posY = targetClosest.offset().top,
                            target = targetClosest.find(".view_guide");
                            if(target.hasClass("min")){
                                target.removeClass("min");
                                $(this).children().text("접기").addClass("on");
                            } else {
                                target.addClass("min");
                                $(this).children().text("더보기").removeClass("on");
                                $("html, body").stop().animate({"scrollTop":posY}, 100);
                            }
    
                            return false;
                        })
                    } else {
                        
                    }
                } else {
                   
                }
            })

            $(".guide_Area").each(function(index){
                var $self = $(this);
                
                $(".nav>li:first-child").find("a").addClass("on");

                $(window).scroll(function(){
                    var wPosY = $(window).scrollTop();
                    var offsetCods = $self.offset().top
                    
                    if(wPosY > offsetCods - 200){
                        //console.log(index);
                        $(".nav>li>a").removeClass("on");
                        $(".nav>li").eq(index).find("a").addClass("on")
                    } else {
                        //console.log("off");                       
                    }
                })
            });

            /*
            $(".guide_Area").each(function(){
                //console.log($(this).find(".view_guide").length)
                var guideView = $(this).find(".view_guide");
                
                if(guideView.height() >= 250){
                    guideView.addClass("min");
                    guideView.addClass("type");

                    $(this).find(".more").show();
                    $(this).find(".more").on("click", function(){
                        target = $(this).closest(".guide_block").find(".view_guide");
                        if(target.hasClass("min")){
                            target.removeClass("min");
                            $(this).children().text("접기").addClass("on");
                        } else {
                            target.addClass("min");
                            $(this).children().text("더보기").removeClass("on");
                        }

                        return false;
                    })
                } else {
                    $(this).find(".more").hide();
                }
            });
            */
        }
    };
    
    $(document).ready(function(){
        ui.init();
    });
    //]]>