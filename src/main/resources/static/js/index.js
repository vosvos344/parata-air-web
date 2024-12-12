$(document).ready(function () {

	$("html, body").animate({
		scrollTop : 0
	});

	let totalElements = $("img, video").length; // 이미지 및 동영상 총 개수
	let loadedElements = 0; // 로드된 요소 개수
	let $progressBar = $(".bar");
	let $percentage = $(".percent");


	//첫번째 섹션 비디오 absolute 높이 가져오기
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

		// 아이콘 위치 이동
		$progressBar.stop().animate({ height: progress + "vh" }, 300); // 300ms 애니메이션

		// 퍼센트 텍스트 업데이트
		$percentage.text(formattedProgress);

		if (loadedElements === totalElements) {
			setTimeout(function () {
				completeLoading();
			}, 1000);
		}
	}

	function completeLoading() {
		$(".loading").fadeOut(500, function () {
			// 5초 뒤 헤더 줄이기
		
			setTimeout(function () {
				$(".header").addClass("shrink");
			
				$(".header").one("transitionend animationend", function () {
					$(".sky-text-inner .first div").each(function (subIndex) {
						setTimeout(() => {
							$(this).addClass("on");
						}, subIndex * 100);
					});
				});
							
				$("body").css("overflow", "auto");
				
			}, 500);
			
			//$(".index").fadeIn(500);
			//$("body").css("overflow", "auto");
		});
	}


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
	console.log("scroll",prata.scrollTop)
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

		// $(".section5").height(($(".section5 .inner").outerHeight() * 2));

		/*$(".section1").height($(".section1 .inner").outerHeight())
		$(".section2").height($(".section2 .inner").outerHeight())


		$(".section6").height($(".section6 .inner").outerHeight())
		$(".section7").height($(".section7 .inner").outerHeight())
		$(".section8").height($(".section8 .inner").outerHeight())
		$(".section9").height($(".section9 .inner").outerHeight())*/


	},

	set : function(){
		this.sectionFixed()
	},

	sectionFixed: function(){

		/*섹션 3 구간*/
		var section3 = $(".section3").offset().top;
		if(this.scrollTop >= section3) {
			$(".section3").addClass("is-fixed");
		}else{
			$(".section3").removeClass("is-fixed");
			$(".navTxt").text("");
		}


		var sectionNext4 = $(".section4").offset().top;
		var sec3End = sectionNext4 - $(window).height();

		if(this.scrollTop >= section3 && $(window).scrollTop() <= sec3End) {
			$(".navTxt").text(((lang=="ko")?"브랜드 슬로건":"Brand Slogan"));
		}



		let sec3Bound = document.querySelector(".section3").getBoundingClientRect();
		let sec1Bound = document.querySelector(".section3 .sec1").getBoundingClientRect();

		if(sec3Bound.top < 300 && sec3Bound.bottom - $(window).height() > 0){

			const videoTerm = 4000
			const intermediateHeight = 122; // 초기 목표 높이

			let videoPer = (Math.abs(sec3Bound.top) - 1500) / videoTerm
			if(videoPer > 1){
				videoPer = 1
			}

			const calculatedHeight =
				videoPer <= 0.5
					? (videoPer * 2) * intermediateHeight // 0에서 intermediateHeight(122)까지
					: intermediateHeight + ((videoPer - 0.5) * 2 * ($(window).height() - intermediateHeight)); // intermediateHeight에서 디바이스 높이까지

			if(this.scrollTop >= section3 && !$(".section3 .ani-wrap .first").hasClass("up")) {
				$(".section3 .ani-wrap .first").removeClass().addClass("first up");
			}
			
			if(this.scrollTop <= section3 && $(".section3 .ani-wrap .first").hasClass("up")) {
				$(".section3 .ani-wrap .first").removeClass().addClass("first down");
				$(".section3 .ani-wrap .second").removeClass().addClass("second");
				$(".section3 .ani-wrap .third").removeClass().addClass("third");
			}

			if(sec3Bound.top < -800 && sec1Bound.height <= 0){
				$(".section3 .sec1 .video-wrap").css("height", "122");
			}else if(sec3Bound.top > -800 && sec1Bound.height == 122){
				$(".section3 .sec1 .video-wrap").css("height", "0");
			}
			
			if(sec3Bound.top < -1500 && ($(".section3 .ani-wrap .first").hasClass("up") && !$(".section3 .ani-wrap .second").hasClass("up"))){
				$(".section3 .ani-wrap .first").addClass(" up-up");
				$(".section3 .ani-wrap .second").removeClass().addClass("second up");
			}
			
			if(sec3Bound.top >= -1500 && $(".section3 .ani-wrap .first").hasClass("up-up")){
				$(".section3 .ani-wrap .second").removeClass().addClass("second down");
				$(".section3 .ani-wrap .first").removeClass().addClass("first down-down");


			}



			if(sec3Bound.top <= -2500 && $(".section3 .ani-wrap .second").hasClass("up")){
				
				$(".section3 .ani-wrap .second").removeClass().addClass("second up-up");
				$(".section3 .ani-wrap .third").removeClass().addClass("third up");
				$(".section3 .sec1 .video-wrap").css({"width":"100%", "height":"100vh", "transition-delay": "1.8s"});

				$(".navTxt").text(((lang == "ko") ? "기업 철학" : "philosophy"));

				$(".section3 .sec1 .video-wrap").on("transitionend", function (e) {
					$(".section3 .ani-wrap .third").removeClass().addClass("third down");
				});


		
			}else if(sec3Bound.top >= -2500 && sec1Bound.height > 122){
				$(".section3 .ani-wrap .third").removeClass().addClass("third down");
				$(".section3 .ani-wrap .second").removeClass().addClass("second down-down");

				$(".section3 .sec1 .video-wrap").css({"width":"calc(100% - 32px)","height":"122px","transition-delay": "0s"});
				$(".section3 .ani-wrap .second").removeClass().addClass("second down");
			}

			// console.log(sec1Bound);


			if (sec3Bound.top <= -3500 ) {
				if(sec1Bound.top == 0) {
					$(".section3 .sec1 .text-wrap .first, .section3 .sec1 .text-wrap .second, .section3 .sec1 .text-wrap .third").addClass("on");
				}
			}else{
				$(".section3 .sec1 .text-wrap div").removeClass("on");
			}

			if(sec3Bound.top < -5000) {
				$(".section3 .sec1").addClass("toggle");
				$(".section3 .sec2").addClass("toggle");
				
				$(".section3 .sec2 .text-wrap .first, .section3 .sec2 .text-wrap .second, .section3 .sec2 .text-wrap .third").addClass("on");
				
			}else{
				
				
				$(".section3 .sec2 .text-wrap .first, .section3 .sec2 .text-wrap .second, .section3 .sec2 .text-wrap .third").removeClass("on");
				
				$(".section3 .sec1").removeClass("toggle");
				$(".section3 .sec2").removeClass("toggle");
			}

			if(sec3Bound.top - $(window).height() < sec3Bound.top){
				$(".section3 .sec2").css({"position":"absolute", "bottom": "0"});
			}


		}else{
			/*$(".section3 .ani-wrap .first").removeClass("text-animation text-animation-up");
			$(".section3 .ani-wrap .second").removeClass("text-animation text-animation-up");
			$(".section3 .ani-wrap .third").removeClass("text-animation text-animation-up");*/
		}

		
		/*섹션 1 구간*/
		$(function(){
			const symbolInner = $(".symbol-inner");
			const section1Bound = document.querySelector(".section1").getBoundingClientRect();
			if(section1Bound.top < 0 && section1Bound.bottom > -200) {

				//
				const scaleStart = 0;
				const scaleEnd = $(".section1").outerHeight() * 0.4;
				let scaleRatio = Math.abs(section1Bound.top) / scaleEnd;
				if (scaleRatio > 1) {
					scaleRatio = 1;
				}

				let boxScale = ((4000 - 43) * (1 - Math.pow(scaleRatio, 1.5))) + 43;
				let boxTopMove = (70 * (1 - Math.pow(scaleRatio, 1.5))) + 50;
				symbolInner.find(".symbol").css({
					"width": boxScale,
					"height": boxScale,
					"top": boxTopMove + '%'
				});

				const textResizeStart = scaleEnd;
				const textResizeEnd = $(".section1").outerHeight() * 0.7;
				if (Math.abs(section1Bound.top) > textResizeStart) {
					symbolInner.addClass("is-active");
				} else {
					symbolInner.removeClass("is-active");
				}
					
					
					
				let textResizeRatio = (Math.abs(section1Bound.top) - textResizeStart) / (textResizeEnd - textResizeStart)
				
				
				if (textResizeRatio > 1) {
					textResizeRatio = 1;
				} else if (textResizeRatio < 0) {
					textResizeRatio = 0
				}
				
				
				let textSize = ((177 - 43) * textResizeRatio) + 43
				if (Math.abs(section1Bound.top) > textResizeStart) {
					symbolInner.find(".symbol").css("width", textSize + "px");
				}
				

				const textUpStart = textResizeEnd;
				const textUpEnd = $(".section1").outerHeight() - $(window).outerHeight()
				if (Math.abs(section1Bound.top) > textUpStart) {
					symbolInner.addClass("is-up")
				} else {
					symbolInner.removeClass("is-up")
				}
				let textUpRatio = (Math.abs(section1Bound.top) - textUpStart) / (textUpEnd - textUpStart)
				if (textUpRatio > 1) {
					textUpRatio = 1;
				} else if (textUpRatio < 0) {
					textUpRatio = 0
				}
				const textUpTerm = ($(window).outerHeight() / 2);
				const textUp = ((textUpTerm - 26) * (1 - textUpRatio)) + 26
				if (Math.abs(section1Bound.top) > textUpStart) {
					symbolInner.find(".symbol").css("top", textUp + "px");
				} else {
					//symbolInner.find(".symbol").css("top", "50%");
				}


				const textLeftStart = textUpEnd
				const textLeftEnd = textLeftStart + ($(window).outerHeight() * 0.9)
				if (Math.abs(section1Bound.top) > textLeftStart) {
					$(".symbol-wrap").css({
						position: "absolute",
						top: textLeftStart + "px"
					})
				} else {
					$(".symbol-wrap").css({
						position: "fixed",
						top: 0
					})
				}
				const textLeftTerm = ($(window).outerWidth() / 2);
				let textLeftRatio = (Math.abs(section1Bound.top) - textLeftStart) / (textLeftEnd - textLeftStart)
				if (textLeftRatio > 1) {
					textLeftRatio = 1;
				} else if (textLeftRatio < 0) {
					textLeftRatio = 0
				}

				const textLeft = ((textLeftTerm - 108) * (1 - textLeftRatio)) + 108
				if (Math.abs(section1Bound.top) > textLeftStart) {
					symbolInner.find(".symbol").css("left", textLeft + "px");
					$(".header").addClass("is-opacity")
				} else {
					symbolInner.find(".symbol").css("left", "50%");
					$(".header").removeClass("is-opacity")
				}
				if (section1Bound.bottom < 5) {
					symbolInner.find(".symbol").hide()
				} else {
					symbolInner.find(".symbol").show()
				}

			}
		})

		/*섹션 4 구간*/
		var section4 = $(".section4").offset().top;
		var sectionNext5 = $(".section5").offset().top;
		var sec4End = sectionNext5 - $(window).height();

		if(this.scrollTop >= section4 && $(window).scrollTop() <= sec4End) {
			$(".section4").addClass("is-fixed");
			$(".navTxt").text(((lang=="ko")?"브랜드 가치":"Brand Value"));
			//$(".section31").addClass("is-fixed");

		}else{
			$(".section4").removeClass("is-fixed");
		}




		let sec4Bound = document.querySelector(".section4").getBoundingClientRect();
		let sec4Inner =  document.querySelector(".section4 .inner").getBoundingClientRect();
		let sec4TextFirst = document.querySelector(".section4 .text-wrap.first").getBoundingClientRect();
		let sec4TextSecond = document.querySelector(".section4 .text-wrap.second").getBoundingClientRect();
		let sec4TextThird = document.querySelector(".section4 .text-wrap.third").getBoundingClientRect();

		if(sec4Bound.top < 0 && sec4Bound.bottom - $(window).height() > 0) {


			const videoTerm = 0
			let videoPer = Math.abs(sec4Bound.top) / videoTerm
			if (videoPer > 1) {
				videoPer = 1
			}


			//console.log(sec4Bound.top);
			//console.log(sec4Bound.top + $(window).height());

			//console.log(this.scrollTop);
			//console.log(sec4Bound.top);

			$(".section4 .text-wrap.first").addClass("on");
			$(".section4 .inner").css("top", sec4Bound.top);


			if(sec4TextFirst.bottom - 150 <= 0){

				$(".section4 .text-wrap.second").addClass("on");
			}else{
				$(".section4 .text-wrap.second").removeClass("on");
			}

			if(sec4TextSecond.bottom - 150 <= 0){
				$(".section4 .text-wrap.third").addClass("on");
			}else{
				$(".section4 .text-wrap.third").removeClass("on");
			}

		}else{
			$(".section4 .text-wrap.first").removeClass("on");
		}


		/*섹션 5 구간*/
		var section5 = $(".section5").offset().top;
		var expandHeight = Math.max(100, this.scrollTop - section5);
		var dynamicPadding = Math.max(16 - (this.scrollTop - section5) / 10); // padding 감소

		var sectionNext6 = $(".section6").offset().top;
		var sec5End = sectionNext4 - $(window).height();

		if(this.scrollTop >= section5 && $(window).scrollTop() <= sec5End) {
			$(".section5").addClass("is-fixed");
			$(".navTxt").text(((lang=="ko")?"브랜드 네이밍":"Brand Naming"));
			//$(".section31").addClass("is-fixed");

		}else{
			//$(".section31").removeClass("is-fixed");
		}





		let sec5Bound = document.querySelector(".section5").getBoundingClientRect();
		if(sec5Bound.top < 0 && sec5Bound.bottom - $(window).height() > 0){
			//console.log("sec5 실행")
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
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section5 .title .first div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}
		
		if(sec5SecondText.top <= $(window).height() * 0.85){
			$(".section5 .title .second div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section5 .title .second div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}



		/*섹션 31 구간*/
		var section31 = $(".section31").offset().top;
		var sectionNext4 = $(".section4").offset().top;
		var sec31End = sectionNext4 - $(window).height();

		if(this.scrollTop >= section31 && $(window).scrollTop() <= sec31End) {
			if($(window).scrollTop() >= $(".section31 .top-wrap").offset().top){
				$(".navTxt").text(((lang=="ko")?"합리적 프리미엄":"Reasonable"));
			}
			if($(window).scrollTop() >= $(".section31 .bottom-wrap").offset().top){

				$(".navTxt").text(((lang=="ko")?"진심어린 서비스":"Mindful Service"));
			}



			//$(".section31").addClass("is-fixed");
			
		}else{
			//$(".section31").removeClass("is-fixed");
		}
		
		
		
		let sec31Bound = document.querySelector(".section31").getBoundingClientRect();
		let sec31TopFirstText = document.querySelector(".section31 .top-wrap .text-wrap .first").getBoundingClientRect();
		let sec31TopSecondText = document.querySelector(".section31 .top-wrap .text-wrap .second").getBoundingClientRect();
		let sec31TopThirdText = document.querySelector(".section31 .top-wrap .text-wrap .third").getBoundingClientRect();
		let sec31TopFourthText = document.querySelector(".section31 .top-wrap .text-wrap .fourth").getBoundingClientRect();
		let sec31TopFifthText = document.querySelector(".section31 .top-wrap .text-wrap .fifth").getBoundingClientRect();

		let sec31BottomFirstText = document.querySelector(".section31 .bottom-wrap .first").getBoundingClientRect();
		let sec31BottomSecondText = document.querySelector(".section31 .bottom-wrap .second").getBoundingClientRect();
		let sec31BottomThirdText = document.querySelector(".section31 .bottom-wrap .third").getBoundingClientRect();
		let sec31BottomFourthText = document.querySelector(".section31 .bottom-wrap .fourth").getBoundingClientRect();
		let sec31BottomFifthText = document.querySelector(".section31 .bottom-wrap .fifth").getBoundingClientRect();


		if(sec31Bound.top < 300){

			$(".section31 .top-text-inner .title ").addClass("on");
		}else{
			$(".section31 .top-text-inner .title ").removeClass("on");
		}

		if(sec31Bound.top < 200){
			$(".section31 .top-text-inner .title-sub ").addClass("on");
		}else{
			$(".section31 .top-text-inner .title-sub ").removeClass("on");
		}


		if(sec31TopFirstText.top <= $(window).height() * 0.85){

			$(".section31 .top-wrap .text-wrap .first div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section31 .top-wrap .text-wrap .first div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}
		
		
		if(sec31TopSecondText.top <= $(window).height() * 0.85){
			$(".section31 .top-wrap .text-wrap .second div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section31 .top-wrap .text-wrap .second div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}
		
		
		if(sec31TopThirdText.top <= $(window).height() * 0.85){
			$(".section31 .top-wrap .text-wrap .third div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section31 .top-wrap .text-wrap .third div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}

		if(sec31TopFourthText.top <= $(window).height() * 0.85){
			$(".section31 .top-wrap .text-wrap .fourth div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section31 .top-wrap .text-wrap .fourth div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}
		
		if(sec31TopFifthText.top <= $(window).height() * 0.85){
			$(".section31 .top-wrap .text-wrap .fifth div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section31 .top-wrap .text-wrap .fifth div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}
		
		
		
		if(sec31BottomFirstText.top <= $(window).height() * 0.85){
			$(".section31 .bottom-wrap .first div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section31 .bottom-wrap .first div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}
		
		
		
		if(sec31BottomSecondText.top <= $(window).height() * 0.85){
			$(".section31 .bottom-wrap .second div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section31 .bottom-wrap .second div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}
		
		if(sec31BottomThirdText.top <= $(window).height() * 0.85){
			$(".section31 .bottom-wrap .third div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section31 .bottom-wrap .third div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}

		if(sec31BottomFourthText.top <= $(window).height() * 0.85){
			$(".section31 .bottom-wrap .fourth div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section31 .bottom-wrap .fourth div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}
		
		if(sec31BottomFifthText.top <= $(window).height() * 0.85){
			$(".section31 .bottom-wrap .fifth div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section31 .bottom-wrap .fifth div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}
		








		/*섹션 6 구간*/
		var section77 = $(".section7").offset().top;
		var section6 = $(".section6").offset().top;
		var sec6height = $(".section6").outerHeight() - 280;
		var sec6Start = section6 - $(window).height();
		
		var flightHalf = 12; /*비행기 위치 조정 높이 반*/
		
		var sec6End = section77 - $(window).height() - 140 + ($(window).height() / 2);
		
		var text1 = $(".depth1").offset().top;
		var text2 = $(".depth2").offset().top;
		var text3 = $(".depth3").offset().top;
		var text4 = $(".depth4").offset().top;
		var text5 = $(".depth5").offset().top;

		
		
		if(this.scrollTop >= section6) {
			$(".navTxt").text(((lang=="ko")?"브랜드 컬러":"Brand Color"));
			//$(".section31").addClass("is-fixed");
			
		}else{
			//$(".section31").removeClass("is-fixed");
		}
		
		
		/*
		if($(window).scrollTop() >= sec6Start && $(window).scrollTop() < sec6End){
			console.log(2)
		}else if($(window).scrollTop() < sec6Start){
			console.log(1)
		}else if($(window).scrollTop() >= sec6End){
			console.log(3)
		}*/
			




		var stopPoint = $(".stopPoint").offset().top;  
		var centerY = $(window).scrollTop() + $(window).height() / 2
		var move = centerY - $('.fly-bg').offset().top;
		
		let sec6 = document.querySelector(".fly-bg").getBoundingClientRect();
		
		//console.log(sec6.top);
		//console.log($(window).height() / 2 - sec6.top  );
		
		//console.log(sec6.bottom);
		//console.log(stopPoint);
		
		let sec6FirstText = document.querySelector(".section6 .title .first").getBoundingClientRect();
		
		if(sec6FirstText.top <= $(window).height() * 0.85){
			$(".section6 .title .first div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section6 .title .first div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}
		
		
		if(this.scrollTop >= section6){

			if(centerY >= text1){
				$(".depth1").css("opacity","1");
			}else{
				$(".depth1").css("opacity","0.2");
			}

			if(centerY >= text2){
				$(".depth2").css("opacity","1");
			}else{
				$(".depth2").css("opacity","0.2");
			}

			if(centerY >= text3){
				$(".depth3").css("opacity","1");
			}else{
				$(".depth3").css("opacity","0.2");
			}

			if(centerY >= text4){
				$(".depth4").css("opacity","1");
			}else{
				$(".depth4").css("opacity","0.2");
			}

			if(centerY >= text5){
				$(".depth5").css("opacity","1");
			}else{
				$(".depth5").css("opacity","0.2");
			}
		}
		
		
	
		if(centerY - $(window).height() / 2 >= sec6End){
			$(".fly-bar-inner").removeClass("on").addClass("stop");
			$(".fly-line-wrap").removeClass("on").addClass("stop");
		}else{
			if(move > 0){
				$(".fly-line-wrap").removeClass("stop");
				$(".fly-bar-inner").removeClass("stop").addClass("on");
				$(".fly-line-wrap").css('height', (move) + 'px'); // px로 높이 설정
			}else{
				$(".fly-bar-inner").removeClass("on");
				$(".fly-line-wrap").addClass("stop").css({"height":"0px"});
			}
			
		}
		
		

		
		
		
		
		
		
		
		/*섹션 7 구간*/
		var section7 = $(".section7").offset().top;
		var section7Recruit = $(".section7 .link-wrap").offset().top;
		if(this.scrollTop >= section7) {
			$(".navTxt").text(((lang=="ko")?"브랜드 에셋":"Brand assets"));
		}
		if(this.scrollTop >= section7Recruit) {
			$(".navTxt").text(((lang=="ko")?"인재 채용":"Recruit"));
		}
		

		let sec7FirstText = document.querySelector(".section7 .title-sub .first").getBoundingClientRect();
		let sec7SecondText = document.querySelector(".section7 .title-sub .second").getBoundingClientRect();
		let sec7ThirdText = document.querySelector(".section7 .title-sub .third").getBoundingClientRect();
		let sec7FourthText = document.querySelector(".section7 .title-sub .fourth").getBoundingClientRect();
		
		if(sec7FirstText.top <= $(window).height() * 0.85){
			$(".section7 .title-sub .first div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section7 .title-sub .first div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}
		
		
		if(sec7SecondText.top <= $(window).height() * 0.85){
			$(".section7 .title-sub .second div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section7 .title-sub .second div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}
		
		if(sec7ThirdText.top <= $(window).height() * 0.85){
			$(".section7 .title-sub .third div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section7 .title-sub .third div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}
		
		
		if(sec7FourthText.top <= $(window).height() * 0.85){
			$(".section7 .title-sub .fourth div").each(function (index) {
				setTimeout(() => {
					$(this).addClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}else{
			$(".section7 .title-sub .fourth div").each(function (index) {
				setTimeout(() => {
					$(this).removeClass("on");
				}, index * 100); // index에 따라 0.1초(100ms)씩 증가
			});
		}


	},


}



