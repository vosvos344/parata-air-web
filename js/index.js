const wAnimate = {
	isLoading: false,
	isAnimated: false,
	isEnd: false,
	endStep: 6,
	step: 0,
	upDown: null,
	init: function () {
		$(window)
			.on('touchstart', function(e){
				wAnimate.touchStartY = e.touches[0].clientY
			})
			.on('touchmove', function(e){
				wAnimate.touchEndY = e.touches[0].clientY
			})
			.on('touchend', function(e){
				if(!wAnimate.isLoading){
					return;
				}
				if(wAnimate.isAnimated){
					return;
				}
				const moveY = wAnimate.touchStartY - wAnimate.touchEndY

				if(moveY >= 0){
					if(wAnimate.isEnd){
						return;
					}
					wAnimate.step++
					wAnimate.upDown = "up"
				}else{
					if(wAnimate.isEnd && $(window).scrollTop() > 0){
						return;
					}
					wAnimate.step--
					wAnimate.upDown = "down"
					$(window).scrollTop(0)

					if(wAnimate.step < 0){
						wAnimate.step = 0
						return;
					}
				}
				if(wAnimate.step >= wAnimate.endStep){
					wAnimate.step = wAnimate.endStep
					wAnimate.isEnd = true
					$("body").css("overflow", "auto");
					$("html, body").css("touch-action", "pan-y");
				}else{
					wAnimate.isEnd = false
					$("body").css("overflow", "hidden");
					$("html, body").css("touch-action", "none");
					$(window).scrollTop(0)
				}
				$(".animateWrap").attr("data-step", wAnimate.step).attr("data-upDown", wAnimate.upDown);
				wAnimate.isAnimated = true
				wAnimate.play[wAnimate.step]()
			})
	},
	play: [
		function(){ // 0
			$(".symbol").removeClass("is-down-done is-up-done")
			$(".symbol-inner").removeClass("is-down")
			void $(".symbol-inner")[0].offsetWidth;
			$(".symbol-inner").removeClass("is-big")
			void $(".symbol-inner")[0].offsetWidth;
			$(".symbol-inner").addClass("is-small");
			$(".section3 ").css({"top":"auto"});

			$(".symbol-inner").one("transitionend animationend", function () {
				$(".symbol-inner").removeClass("is-active")
				$(".symbol-inner").removeClass("is-small")
				$(".symbol").removeClass("small")
				void $(".symbol")[0].offsetWidth;
				$(".symbol").addClass("big");
			});

			$(".symbol").one("transitionend animationend", function () {
				wAnimate.isAnimated = false
			});
		},
		function(){ // 1
			if(wAnimate.upDown=="up"){
				$(".symbol").removeClass("big")
				void $(".symbol")[0].offsetWidth;
				$(".symbol").addClass("small");

				$(".symbol").one("transitionend animationend", function() {
					$(".symbol-inner").addClass("is-active").addClass("is-big");
				});

				$(".symbol-inner").one("transitionend animationend", function() {
					wAnimate.isAnimated = false
				});
			}else{
				$(".header ").removeClass("is-opacity");
				$(".symbol-inner").removeClass("is-up");
				void $(".symbol-inner")[0].offsetWidth;

				$(".symbol-inner").addClass("is-down");

				$(".symbol-inner").one("transitionend animationend", function (e) {
					$(".symbol").addClass("is-down-done");
					wAnimate.isAnimated = false
				});
			}
		},
		function(){ // 2
			if(wAnimate.upDown=="up") {
				$(".navTxt").text(((lang == "ko") ? "01. 브랜드 슬로건" : "01. Brand Slogan"));
				$(".symbol-inner").addClass("is-up");
				$(".section3 ").css({"top":"0"});
				$(".header ").addClass("is-opacity");
				$(".symbol").one("transitionend animationend", function (e) {
					$(".symbol").addClass("is-up-done");
					wAnimate.isAnimated = false
				});
			}else {
				$(".section3 .ani-wrap .first").removeClass().addClass("first down-down");
				$(".section3 .ani-wrap .second").removeClass().addClass("second down");
				$(".section3 .sec1 .video-wrap").css("height", "0");

				$(".section3 .sec1 .video-wrap").one("transitionend animationend", function (e) {
					wAnimate.isAnimated = false
				});
			}
		},
		function(){ // 3
			if(wAnimate.upDown=="up") {
				$(".section3 .ani-wrap .first").removeClass().addClass("first up-up");
				$(".section3 .ani-wrap .second").removeClass().addClass("second up");
				$(".section3 .sec1 .video-wrap").css("height", "50");
				$(".section3 .sec1 .video-wrap").one("transitionend animationend", function (e) {
					wAnimate.isAnimated = false
				});
			}else{
				$(".section3 .ani-wrap .second").removeClass().addClass("second down-down");
				$(".section3 .ani-wrap .third").removeClass().addClass("third down");
				$(".section3 .sec1 .video-wrap").css("height", "50");
				$(".section3 .sec1 .video-wrap").one("transitionend animationend", function (e) {
					wAnimate.isAnimated = false
				});
			}
		},
		function(){ // 4
			if(wAnimate.upDown=="up") {
				$(".section3 .ani-wrap .second").removeClass().addClass("second up-up");
				$(".section3 .ani-wrap .third").removeClass().addClass("third up");
				$(".section3 .sec1 .video-wrap").css("height", "120");
				$(".section3 .sec1 .video-wrap").one("transitionend animationend", function (e) {
					wAnimate.isAnimated = false
				});
			}else{
				$(".section3 .sec1 .text-wrap .first, .section3 .sec1 .text-wrap .second, .section3 .sec1 .text-wrap .third").removeClass("on");

				$(".section3 .sec1 .text-wrap .first, .section3 .sec1 .text-wrap .second, .section3 .sec1 .text-wrap .third").one("transitionend animationend", function (e) {
					$(".navTxt").text(((lang == "ko") ? "브랜드 슬로건" : "Brand Slogan"));
					$(".section3 .sec1 .video-wrap").css("height", "120");
					$(".section3 .ani-wrap .third").removeClass().addClass("third down-down");
				});
				$(".section3 .ani-wrap .third").one("transitionend animationend", function (e) {
					wAnimate.isAnimated = false
				});
			}
		},
		function(){ // 5
			if(wAnimate.upDown=="up") {
				$(".section3 .ani-wrap .third").removeClass().addClass("third up-up");
				$(".section3 .sec1 .video-wrap").css({"width":"100%", "height":"100vh"});

				$(".section3 .sec1 .video-wrap").one("transitionend animationend", function (e) {
					$(".navTxt").text(((lang == "ko") ? "02. 기업 철학" : "02. philosophy"));
					$(".section3 .sec1 .text-wrap .first, .section3 .sec1 .text-wrap .second, .section3 .sec1 .text-wrap .third").addClass("on");
					wAnimate.isAnimated = false
				});
			}else{
				$(".section3 .sec1 .video-wrap").css({"width":"100%", "height":"100vh"});
				$(".section3 .sec1").removeClass("toggle");
				$(".section3 .sec1 .text-wrap div").addClass("on");
				$(".section3 .sec2").removeClass("toggle");
				$(".section3 .sec2 .text-wrap .first, .section3 .sec2 .text-wrap .second, .section3 .sec2 .text-wrap .third").removeClass("on");

				$(".section3 .sec2 .text-wrap .first, .section3 .sec2 .text-wrap .second, .section3 .sec2 .text-wrap .third").one("transitionend animationend", function (e) {
					wAnimate.isAnimated = false
				});
			}
		},
		function(){ // 6
			if(wAnimate.upDown=="up") {
				$(".section3 .sec1").addClass("toggle");
				$(".section3 .sec2").addClass("toggle");

				$(".section3 .sec2 ").one("transitionend animationend", function (e) {
					$(".section3 .sec2 .text-wrap .first, .section3 .sec2 .text-wrap .second, .section3 .sec2 .text-wrap .third").addClass("on");
					wAnimate.isAnimated = false
				});
			}
		}
	]
}
wAnimate.init()

$(document).ready(function () {
	$("html, body").animate({
		scrollTop : 0
	});

	var Slide = new Swiper(".type-normal", {
		slidesPerView: 'auto',
		spaceBetween: 20,
		pagination: {
			el: ".swiper-pagination",
		}
	});

	let totalElements = $("img, video").length;
	let loadedElements = 0;
	let $progressBar = $(".bar");
	let $percentage = $(".percent");

	$(".section1 .inner").height($(".section1 .video-wrap video").outerHeight());

	if (totalElements === 0) {
		completeLoading();
	} else {
		$("img, video").each(function () {
			let $element = $(this);
			if ($element.is("img")) {
				$("<img>")
					.on("load error", function () {
						progress();
					})
					.attr("src", $element.attr("src"));
			} else if ($element.is("video")) {
				$element.on("loadeddata error", function () {
					progress();
				});
			}
		});
	}

	function progress() {
		loadedElements++;
		let progress = Math.floor((loadedElements / totalElements) * 100);
		let formattedProgress = String(progress).padStart(3, "0");

		$progressBar.stop().animate({ height: progress + "vh" }, 300);
		$percentage.text(formattedProgress);

		if (loadedElements === totalElements) {
			setTimeout(function () {
				completeLoading();
			}, 1000);
		}
	}

	function completeLoading() {
		$(".loading").fadeOut(500, function () {
			setTimeout(function () {
				$(".header").addClass("shrink");

				$(".header").one("transitionend animationend", function () {
					$(".sky-text-inner .first div").each(function (subIndex) {
						setTimeout(() => {
							$(this).addClass("on");
							wAnimate.isLoading = true;
						}, subIndex * 100);
					});
				});
			}, 500);
		});
	}

	// 네비게이션 메뉴 클릭 이벤트
	$(".modal-list a").on("click", function(e) {
		e.preventDefault();
		const index = $(this).index();
		$("#modal").removeClass("active"); // 모달 닫기

		if (index === 0) { // 브랜드 슬로건: data-step="2"
			wAnimate.step = 2;
			wAnimate.upDown = "up";
			wAnimate.isEnd = false;
			$("body").css("overflow", "hidden");
			$("html, body").css("touch-action", "none");
			$(window).scrollTop(0);
			$(".animateWrap").attr("data-step", wAnimate.step).attr("data-upDown", wAnimate.upDown);
			wAnimate.isAnimated = true;
			wAnimate.play[wAnimate.step]();
			$('.symbol-inner').addClass('is-active');
			$('.symbol').addClass('small');
		} else if (index === 1) { // 기업 철학: data-step="5"
			wAnimate.step = 5;
			wAnimate.upDown = "up";
			wAnimate.isEnd = false;
			$("body").css("overflow", "hidden");
			$("html, body").css("touch-action", "none");
			$(window).scrollTop(0);
			$(".animateWrap").attr("data-step", wAnimate.step).attr("data-upDown", wAnimate.upDown);
			wAnimate.isAnimated = true;
			wAnimate.play[wAnimate.step]();
			$('.symbol-inner').addClass('is-active is-big is-up');
			$('.symbol').addClass('small is-up-done');
			$('.section3').css('top','0');
			$('.section3 .sec1 .video-wrap').css('height: 100vh', 'width: 100%');
			$('.section3 .sec1 .text-wrap div').addClass('on');
			$('.section3 .sec2').removeClass('toggle');
			$('.section3 .sec2 .text-wrap div').removeClass('on');
			$('.ani-wrap div').addClass('up-up');
		} else if (index === 2) { // 합리적 서비스: section31 top-wrap
			wAnimate.step = 6;
			wAnimate.upDown = "up";
			wAnimate.isEnd = false;
			$(window).scrollTop(0);
			$(".animateWrap").attr("data-step", wAnimate.step).attr("data-upDown", wAnimate.upDown);
			wAnimate.isAnimated = true;
			wAnimate.play[wAnimate.step]();
			$('.symbol-inner').addClass('is-active is-big is-up');
			$('.symbol').addClass('small is-up-done');
			$('.section3').css('top','0');
			$('.section3 .sec1').addClass('toggle');
			$('.section3 .sec1 .video-wrap').css('height: 100vh', 'width: 100%');
			$('.section3 .sec1 .text-wrap div').addClass('on');
			$('.section3 .sec2').addClass('toggle');
			$('.section3 .sec2 .text-wrap div').addClass('on');
			$("body").css("overflow", "auto");
			$("html, body").css("touch-action", "pan-y");
			const targetOffset = $(".section31 .top-wrap").offset().top;
			$("html, body").animate({ scrollTop: targetOffset }, 500);
			$('.ani-wrap div').addClass('up-up');
		} else if (index === 3) { // 진심 어린 서비스: section31 bottom-wrap
			wAnimate.step = 6;
			wAnimate.upDown = "up";
			wAnimate.isEnd = true;
			$(window).scrollTop(0);
			$(".animateWrap").attr("data-step", wAnimate.step).attr("data-upDown", wAnimate.upDown);
			wAnimate.isAnimated = true;
			wAnimate.play[wAnimate.step]();
			$('.symbol-inner').addClass('is-active is-big is-up');
			$('.symbol').addClass('small is-up-done');
			$('.section3').css('top','0');
			$('.section3 .sec1').addClass('toggle');
			$('.section3 .sec1 .video-wrap').css('height: 100vh', 'width: 100%');
			$('.section3 .sec1 .text-wrap div').addClass('on');
			$('.section3 .sec2').addClass('toggle');
			$('.section3 .sec2 .text-wrap div').addClass('on');
			$("body").css("overflow", "auto");
			$("html, body").css("touch-action", "pan-y");
			const targetOffset = $(".section31 .bottom-wrap").offset().top;
			$("html, body").animate({ scrollTop: targetOffset }, 500);
			$('.ani-wrap div').addClass('up-up');
		} else if (index === 4) { // 브랜드 네이밍: section5
			wAnimate.step = 6;
			wAnimate.upDown = "up";
			wAnimate.isEnd = true;
			$(window).scrollTop(0);
			$(".animateWrap").attr("data-step", wAnimate.step).attr("data-upDown", wAnimate.upDown);
			wAnimate.isAnimated = true;
			wAnimate.play[wAnimate.step]();
			$('.symbol').addClass('small is-up-done');
			$('.section3').css('top','0');
			$('.section3 .sec1').addClass('toggle');
			$('.section3 .sec1 .video-wrap').css('height: 100vh', 'width: 100%');
			$('.section3 .sec1 .text-wrap div').addClass('on');
			$('.section3 .sec2').addClass('toggle');
			$('.section3 .sec2 .text-wrap div').addClass('on');
			$("body").css("overflow", "auto");
			$("html, body").css("touch-action", "pan-y");
			const targetOffset = $(".section5").offset().top;
			$("html, body").animate({ scrollTop: targetOffset }, 500);
			$('.ani-wrap div').addClass('up-up');
		}
	});
});

$(document).on("click", ".common-popup__bg", function (e) {
	$(e.target).closest(".common-popup__bg").length || toggleCommonPopup()
})

function toggleCommonPopup(e) {
	var t = $("#" + e);
	e ? (t.toggleClass("popup-on"),
		$(".common-popup__bg").fadeIn(),
		$("body").css({
			height: "100vh",
			overflow: "hidden"
		})) : ($(".common-popup").removeClass("popup-on"),
		$(".common-popup__bg").fadeOut(),
		$("body").css({
			height: "auto",
			overflow: "unset"
		}))
}

function debounce(func, wait) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}

$(window).resize(function(){
	prata.winWidth =  $(window).width()
	prata.winHeight =  $(window).outerHeight()
	prata.setSize()
})

$(window).on("load", function(){
	prata.init()
})

let isAnimating = false;

$(window).scroll(function(){
	prata.scrollTop = $(document).scrollTop()
	prata.winHeight =  $(window).outerHeight()
	prata.set()
})

var prata = {
	scrollTop : 0,
	winWidth : $(window).width(),
	winHeight : $(window).outerHeight(),
	init: function(){
		this.scrollTop = $(document).scrollTop();
		this.setSize()
		this.set()
	},
	setSize : function(){
		// 섹션 크기 설정 (기존 코드 유지)
	},
	set : function(){
		this.sectionFixed()
	},
	sectionFixed: function(){
		// 기존 sectionFixed 코드 유지
		var section5 = $(".section5").offset().top;
		var expandHeight = Math.max(100, this.scrollTop - section5);
		var dynamicPadding = Math.max(16 - (this.scrollTop - section5) / 10);

		if(this.scrollTop >= section5 ) {
			$(".section5").addClass("is-fixed");
			$(".navTxt").text(((lang=="ko")?"브랜드 네이밍":"Brand Naming"));
		}

		let sec5Bound = document.querySelector(".section5").getBoundingClientRect();
		if(sec5Bound.top < 0 && sec5Bound.bottom - $(window).height() > 0){
			const videoTerm = 2000
			let videoPer = Math.abs(sec5Bound.top) / videoTerm
			if(videoPer > 1){
				videoPer = 1
			}
			$(".section5 .video-wrap").css("bottom", (1 - videoPer) * 16)
			$(".section5 .video-wrap").css("width", ((videoPer) * 32) + ($(window).width() - 32) )
			$(".section5 .video-wrap").css("top", $(window).height() - 213 - ((videoPer) * ($(window).height() - 213)) )

			if(Math.abs(sec5Bound.top)  >  videoTerm + 500){
				$(".video-logo").addClass("on");
			}else{
				$(".video-logo").removeClass("on");
			}
		}

		let sec5FirstText = document.querySelector(".section5 .title .first").getBoundingClientRect();
		let sec5SecondText = document.querySelector(".section5 .title .second").getBoundingClientRect();

		if(sec5FirstText.top <= $(window).height() * 0.85){
			$(".section5 .title .first div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100);
			});
		}else{
			$(".section5 .title .first div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100);
			});
		}

		if(sec5SecondText.top <= $(window).height() * 0.85){
			$(".section5 .title .second div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100);
			});
		}else{
			$(".section5 .title .second div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100);
			});
		}

		var section31 = $(".section31").offset()?.top || 0;
		if (this.scrollTop >= section31) {
			if ($(window).scrollTop() >= $(".section31 .top-wrap").offset().top) {
				$(".navTxt").text(lang === "ko" ? "03. 합리적 서비스" : "03. Reasonable");
			}
			if ($(window).scrollTop() >= $(".section31 .bottom-wrap").offset().top) {
				$(".navTxt").text(lang === "ko" ? "04. 진심어린 서비스" : "04. Mindful Service");
			}
		}

		let sec31Bound = document.querySelector(".section31")?.getBoundingClientRect();
		let textSelectors = [
			".section31 .navSubTxt",
			".section31 .top-wrap .text-wrap .first",
			".section31 .top-wrap .text-wrap .second",
			".section31 .top-wrap .text-wrap .third",
			".section31 .top-wrap .text-wrap .fourth",
			".section31 .top-wrap .text-wrap .fifth",
			".section31 .top-wrap .text-wrap .sixth",
			".section31 .top-wrap .text-wrap .seventh",
			".section31 .bottom-wrap .first",
			".section31 .bottom-wrap .second",
			".section31 .bottom-wrap .third",
			".section31 .bottom-wrap .fourth",
			".section31 .bottom-wrap .fifth",
			".section31 .bottom-wrap .sixth"
		];

		if (sec31Bound?.top < 400) {
			$(".section31 .top-wrap .navSubTxt").addClass("on");
		}else{
			$(".section31 .top-wrap .navSubTxt").removeClass("on");
		}

		if (sec31Bound?.top < 300) {
			$(".section31 .top-text-inner .title").addClass("on");
		} else {
			$(".section31 .top-text-inner .title").removeClass("on");
		}

		if (sec31Bound?.top < 200) {
			$(".section31 .top-text-inner .title-sub").addClass("on");
		} else {
			$(".section31 .top-text-inner .title-sub").removeClass("on");
		}

		textSelectors.forEach(selector => {
			let element = document.querySelector(selector)?.getBoundingClientRect();
			if (element?.top <= $(window).height() * 0.85) {
				$(selector + " div").each(function(index) {
					setTimeout(() => $(this).addClass("on"), index * 100);
				});
			} else {
				$(selector + " div").each(function(index) {
					setTimeout(() => $(this).removeClass("on"), index * 100);
				});
			}
		});
	}
}
