
			var main_slide_active = function(){
				var glide = $('#contents .slider').glide().data('api_glide');

				$(window).on('keyup', function (key) {
					if (key.keyCode === 13) {
						glide.jump(3, console.log('Wooo!'));
					};
				});

				$('.slider-arrow').on('click', function() {
					console.log(glide.current());
				});
			};

			$(window).load(function(){
			main_slide_active();
			});

			$(document).ready(function(){
				/*$("div.m_view div.in_view:not("+$("ul.tab_type1 li a.selected").attr("href")+")").hide()
				$("ul.tab_type1 li a").click(function(){
					$("ul.tab_type1 li a").removeClass("selected");
					$(this).addClass("selected");
					$("div.m_view div.in_view").hide();
					$($(this).attr("href")).show();
					return false;
				});*/
				$("div.m_view1 div.in_view1:not("+$("ul.tab_type2 li a.selected").attr("href")+")").hide()
				$("ul.tab_type2 li a").click(function(){
					$("ul.tab_type2 li a").removeClass("selected");
					$(this).addClass("selected");
					$("div.m_view1 div.in_view1").hide();
					$($(this).attr("href")).show();
					return false;
				});
				$("div.m_view2 div.in_view2:not("+$("ul.tab_type3 li a.selected").attr("href")+")").hide()
				$("ul.tab_type3 li a").click(function(){
					$("ul.tab_type3 li a").removeClass("selected");
					$(this).addClass("selected");
					$("div.m_view2 div.in_view2").hide();
					$($(this).attr("href")).show();
					return false;
				});
			});