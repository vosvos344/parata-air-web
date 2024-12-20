$(document).ready(function () {
	let stopScrolling = false;

	window.addEventListener("touchmove", handleTouchMove, {
		passive: false
	});

	function handleTouchMove(e) {
		if (!stopScrolling) {
			return;
		}
		e.preventDefault();
	}

	function pagePlay(){
		console.log("fullpage play")
		fullpage_api.setAllowScrolling(true);
	}
	function pageStop(){
		console.log("fullpage stop")
		fullpage_api.setAllowScrolling(false);
	}

	let navTxt = gsap.timeline();
	navTxt.to(".navTxt", {
		opacity:1,
		duration: 0.5,
		delay:2.5
	})

	let logoEffect = gsap.timeline({
		paused: true,
		onStart: () => {
			pageStop();
		},
		onComplete: () => {
			pagePlay();
		}
	});

	logoEffect
		.to(".symbol-wrap", {
			scale: 0.38, top: '50%', duration: 1, visibility:"visible", opacity:1
		})
		.to(".logo-effect", {
			opacity: 1, duration: 0.5,
		})
		.to(".symbol-wrap", {
			background: '#fff', duration: 0
		})
		.to(".logo-effect .cover", {
			left: '100%', duration: 1,
		})
		.to(".logo-effect", {
			left: '50%',
			duration: 0.6,
		}, "<")
		.to(".symbol-wrap", {
			position: 'absolute',
		})
		.to("#section2", {
			overflow: 'hidden'
		});

	let videoView = gsap.timeline({ paused: true });
	videoView.to("#section3 .video-wrap", {
		duration: 1, height: "122px",
	});

	const viewProp = {duration: 0.5, y: 0, opacity: 1, stagger: 0.1, ease: "power2.out"}
	const removeProp = {duration: 0.5, y: -50, opacity: 0, stagger: 0.1, ease: "power2.out"}

	let textNew = gsap.timeline({ paused: true,
		onComplete: () => {
			console.log("Animation completed!");
			// 여기에 다른 작업을 추가할 수 있습니다.
		}
	});
	textNew.fromTo("#section3 .text-new span", {
		y: 50,
	}, {...viewProp, delay: 0.7});

	let removeTextNew = gsap.timeline({ paused: true });
	removeTextNew.fromTo("#section3 .text-new span", {
		y: 0,
	}, {...removeProp});

	let textHappy = gsap.timeline({ paused: true });
	textHappy.fromTo("#section3 .text-happy span", {
		y: 50,
	}, {...viewProp});

	let removeTextHappy = gsap.timeline({ paused: true });
	removeTextHappy.fromTo("#section3 .text-happy span", {
		y: 0,
	}, {...removeProp});

	let textTogether = gsap.timeline({ paused: true });
	textTogether.fromTo("#section3 .text-together span", {
		y: 50,
	}, {...viewProp});

	let removeTextTogether = gsap.timeline({ paused: true });
	removeTextTogether.fromTo("#section3 .text-together span", {
		y: 0,
	}, {...removeProp});

	let t1 = gsap.timeline({ paused: true });
	let t2 = gsap.timeline({ paused: true });
	let t3 = gsap.timeline({ paused: true });
	let t4 = gsap.timeline({ paused: true });
	let img1 = gsap.timeline({ paused: true });
	let t5 = gsap.timeline({ paused: true });
	let t6 = gsap.timeline({ paused: true });
	let t7 = gsap.timeline({ paused: true });
	let t8 = gsap.timeline({ paused: true });
	let img2 = gsap.timeline({ paused: true });
	let t1_part2 = gsap.timeline({ paused: true });
	let t2_part2 = gsap.timeline({ paused: true });
	let t3_part2 = gsap.timeline({ paused: true });
	let img1_part2 = gsap.timeline({ paused: true });
	let img2_part2 = gsap.timeline({ paused: true });

	t1.fromTo(".section5 .part1 .t1", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });

	t2.fromTo(".section5 .part1 .t2", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });

	t3.fromTo(".section5 .part1 .t3", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });

	t4.fromTo(".section5 .part1 .t4", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });

	img1.fromTo(".section5 .part1 .img-top", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });

	t1.add(t2, "+=0.1")
		.add(t3, "+=0.6")
		.add(t4, "+=0.9")
		.add(img1, "+=1.2")

	t5.fromTo(".section5 .part1 .t5", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
	t6.fromTo(".section5 .part1 .t6", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
	t7.fromTo(".section5 .part1 .t7", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
	t8.fromTo(".section5 .part1 .t8", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
	img2.fromTo(".section5 .part1 .img-bottom", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });

	t1_part2.fromTo(".section5 .part2 .t1", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
	t2_part2.fromTo(".section5 .part2 .t2", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
	t3_part2.fromTo(".section5 .part2 .t3", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
	img1_part2.fromTo(".section5 .part2 img:nth-of-type(1)", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
	img2_part2.fromTo(".section5 .part2 img:nth-of-type(2)", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });


	const brandText = {y:0, opacity:1, stagger: 0.5, duration: 0.7, ease: "power2.out"}
	let skyZoom = gsap.timeline({ paused: true });
	skyZoom.
		to("#section3 .t1, #section3 .t2", {
			height: '0',
			opacity: 0,
			duration: 0.3,
		})
		.to("#section3 .video-wrap", {
			width: '100%',
			height: '100%',
			duration: 0.7,
		})
		.fromTo("#section3 .t3 .part1 p, #section3 .t3 .part2 p", {
			y: 10,
		}, {...brandText});

	let brandView = gsap.timeline({ paused: true });
	brandView.fromTo("#section4 .part1 p, #section4 .part2 p", {
			y: 10,
		}, {...brandText});

	function section3Reset(){
		console.log("reset")
		setTimeout(() => {
			skyZoom.time(0).reverse();
			videoView.time(0).reverse();
			removeTextHappy.time(0).reverse();
			textHappy.time(0).reverse();
			removeTextNew.time(0).reverse();
			textNew.time(0).reverse();
			textTogether.time(0).reverse();
		}, 1000);
	}


	function section3(section) {
		let intxCnt = 0; // 인터렉션 카운팅
		let startY = 0; // 터치 시작 위치
		let endY = 0;   // 터치 종료 위치

		textNew.play()

		$("#section3").on('touchstart', function (e) {
			startY = e.originalEvent.touches[0].clientY; // 터치 시작 위치 저장
		});

		$("#section3").on('touchend', function (e) {

			console.log("section3 sub cnt",intxCnt)
			endY = e.originalEvent.changedTouches[0].clientY; // 터치 종료 위치 저장
			if (startY - endY > 50)
			{
				console.log("down")
				if(intxCnt === 0)
				{
					videoView.play();
					intxCnt++;
				}
				else if(intxCnt === 1)
				{
					removeTextNew.play();
					textHappy.play();
					intxCnt++;
				}
				else if(intxCnt === 2)
				{
					removeTextHappy.play();
					textTogether.play();
					intxCnt++;
				}
				else if(intxCnt === 3)
				{
					$(".navTxt").text("기업 철학");
					skyZoom.play();
					intxCnt++;
				}
				else if(intxCnt === 4)
				{
					pagePlay()
					fullpage_api.moveTo(4)
					section3Reset()
					intxCnt = 0;
				}
			}
			else if (endY - startY > 50)
			{
				fullpage_api.moveTo(1)
				section3Reset()
				intxCnt = 0;
			}
		});
	}

	var myFullpage = new fullpage('#fullpage', {

		licenseKey: "MJMFH-9XT48-KX58H-0D9J9-QEEUN",
		anchors:[' ', '', '브랜드 슬로건','기업 철학','합리적 프리미엄'],
		verticalCentered: false,
		credits: { enabled: false },

		// scrollOverflow: true,
		// scrolloverflowmacstyle: false,

		fitToSectionDelay: 50,
		normalScrollElements: '#section5',
		scrollBar: true,
		autoScrolling: true,

		onScrollOverflow: function(section, slide, position, direction){

			let airplain = ".fly-bar-inner, .fly-line-wrap";
			if(position < 4240){
				console.log(1)
				$(airplain).removeClass("on")
				$(airplain).removeClass("stop")
			}
			else if(position > 4240 && position < 5720)
			{
				let sonicBoom = position - 4240;
				$(".fly-line-wrap").css('height', `${sonicBoom}px`);
				console.log(2)
				$(airplain).addClass("on")
				$(airplain).removeClass("stop")
			}
			else if(position > 5720)
			{
				console.log(3)
				$(airplain).removeClass("on")
				$(airplain).addClass("stop")
			}

			gsap.registerPlugin(ScrollTrigger);
			gsap.to(".ta1", {
				scrollTrigger: {
					trigger: ".ta1", start: "top 80%", end: "bottom 20%",
					// markers: true,
					onEnter: () => {
						$(".ta1").addClass("on");
					},
					onLeave: () => {
						$(".ta1").removeClass("on");
					},
					onLeaveBack: () => {
						$(".ta1").removeClass("on");
					}
				}
			});

			gsap.to(".ta2", {
				scrollTrigger: {
					trigger: ".ta2", start: "top 80%", end: "bottom 20%",
					// markers: true,
					onEnter: () => {
						$(".ta2").addClass("on");
					},
					onLeave: () => {
						$(".ta2").removeClass("on");
					},
					onLeaveBack: () => {
						$(".ta2").removeClass("on");
					}
				}
			});

			gsap.to(".ta3", {
				scrollTrigger: {
					trigger: ".ta3", start: "top 80%", end: "bottom 20%",
					// markers: true,
					onEnter: () => {
						$(".ta3").addClass("on");
					},
					onLeave: () => {
						$(".ta3").removeClass("on");
					},
					onLeaveBack: () => {
						$(".ta3").removeClass("on");
					}
				}
			});

			gsap.to("#section5 .section5 .part4 .video-wrap", {
				scrollTrigger: {
					trigger: "#section5 .section5 .part4 .video-wrap", start: "top 80%", end: "bottom 20%",
					// markers: true,
					onEnter: () => {
						$("#section5 .section5 .part4 .video-wrap").addClass("on");
					},
					onLeave: () => {
						$("#section5 .section5 .part4 .video-wrap").removeClass("on");
					},
					onLeaveBack: () => {
						$("#section5 .section5 .part4 .video-wrap").removeClass("on");
					}
				}
			});


			// t5.fromTo(".section5 .part1 .t5", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
			// t6.fromTo(".section5 .part1 .t6", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
			// t7.fromTo(".section5 .part1 .t7", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
			// t8.fromTo(".section5 .part1 .t8", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
			// img2.fromTo(".section5 .part1 .img-bottom", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
			//
			// t1_part2.fromTo(".section5 .part2 .t1", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
			// t2_part2.fromTo(".section5 .part2 .t2", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
			// t3_part2.fromTo(".section5 .part2 .t3", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
			// img1_part2.fromTo(".section5 .part2 img:nth-of-type(1)", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
			// img2_part2.fromTo(".section5 .part2 img:nth-of-type(2)", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });

			gsap.to(".section5 .part1 .t5", {
				scrollTrigger: {
					trigger: ".section5 .part1 .t5", start: "top 80%", end: "bottom 20%",
					onEnter: () => { t5.play(); },
					onLeave: () => { t5.reverse(); },  // onLeave: 화면을 벗어날 때 애니메이션 역방향 실행
					onLeaveBack: () => { t5.reverse(); }  // onLeaveBack: 뒤로 스크롤 시 애니메이션 역방향 실행
				}
			});

			gsap.to(".section5 .part1 .t6", {
				scrollTrigger: {
					trigger: ".section5 .part1 .t6", start: "top 80%", end: "bottom 20%",
					onEnter: () => { t6.play(); },
					onLeave: () => { t6.reverse(); },
					onLeaveBack: () => { t6.reverse(); }
				}
			});

			gsap.to(".section5 .part1 .t7", {
				scrollTrigger: {
					trigger: ".section5 .part1 .t7", start: "top 80%", end: "bottom 20%",
					onEnter: () => { t7.play(); },
					onLeave: () => { t7.reverse(); },
					onLeaveBack: () => { t7.reverse(); }
				}
			});

			gsap.to(".section5 .part1 .t8", {
				scrollTrigger: {
					trigger: ".section5 .part1 .t8", start: "top 80%", end: "bottom 20%",
					onEnter: () => { t8.play(); },
					onLeave: () => { t8.reverse(); },
					onLeaveBack: () => { t8.reverse(); }
				}
			});

			gsap.to(".section5 .part1 .img-bottom", {
				scrollTrigger: {
					trigger: ".section5 .part1 .img-bottom", start: "top 80%", end: "bottom 20%",
					onEnter: () => { img2.play(); },
					onLeave: () => { img2.reverse(); },
					onLeaveBack: () => { img2.reverse(); }
				}
			});

			gsap.to(".section5 .part2 .t1", {
				scrollTrigger: {
					trigger: ".section5 .part2 .t1", start: "top 80%", end: "bottom 20%",
					onEnter: () => { t1_part2.play(); },
					onLeave: () => { t1_part2.reverse(); },
					onLeaveBack: () => { t1_part2.reverse(); }
				}
			});

			gsap.to(".section5 .part2 .t2", {
				scrollTrigger: {
					trigger: ".section5 .part2 .t2", start: "top 80%", end: "bottom 20%",
					onEnter: () => { t2_part2.play(); },
					onLeave: () => { t2_part2.reverse(); },
					onLeaveBack: () => { t2_part2.reverse(); }
				}
			});

			gsap.to(".section5 .part2 .t3", {
				scrollTrigger: {
					trigger: ".section5 .part2 .t3", start: "top 80%", end: "bottom 20%",
					onEnter: () => { t3_part2.play(); },
					onLeave: () => { t3_part2.reverse(); },
					onLeaveBack: () => { t3_part2.reverse(); }
				}
			});

			gsap.to(".section5 .part2 img:nth-of-type(1)", {
				scrollTrigger: {
					trigger: ".section5 .part2 img:nth-of-type(1)", start: "top 80%", end: "bottom 20%",
					onEnter: () => { img1_part2.play(); },
					onLeave: () => { img1_part2.reverse(); },
					onLeaveBack: () => { img1_part2.reverse(); }
				}
			});

			gsap.to(".section5 .part2 img:nth-of-type(2)", {
				scrollTrigger: {
					trigger: ".section5 .part2 img:nth-of-type(2)", start: "top 80%", end: "bottom 20%",
					onEnter: () => { img2_part2.play(); },
					onLeave: () => { img2_part2.reverse(); },
					onLeaveBack: () => { img2_part2.reverse(); }
				}
			});



			// t5.play();
			// t6.play();
			// t7.play();
			// t8.play();
			// img2.play();
			// t1_part2.play();
			// t2_part2.play();
			// t3_part2.play();
			// img1_part2.play();
			// img2_part2.play();

			// console.log(position);
			// if(position < 3000){
			// 	console.log(1)
			// 	$(".video-wrap").removeClass("on")
			// }
			// else if(position > 3000 && position < 3635)
			// {
			// 	$(".video-wrap").addClass("on")
			// 	console.log(2)
			// }
			// else if(position > 3635)
			// {
			// 	console.log(3)
			// 	pageStop()
			// 	$(".video-wrap").removeClass("on")
			// }


		},
		onLeave: function (origin, destination, direction, trigger) {
			$(".navTxt").text(destination.anchor);

			if (destination.index === 1)
			{
				logoEffect.play();
			}
			else
			{
				// logoEffect.time(0).reverse();
				setTimeout(() => {
					logoEffect.time(0).reverse();
				}, 1000);
			}

			if (destination.index === 2)
			{
				pageStop()
				section3();
			}

			if(destination.index > 2)
			{
				$(".sky-video").fadeOut();
			}
			else
			{
				$(".sky-video").fadeIn();
			}

		},
		afterLoad: function (origin, destination, direction) {
			console.log(destination.index);
			if(destination.index === 0)
			{
				pagePlay()
			}

			if(destination.index === 3)
			{
				brandView.play()

			}
			else
			{
				setTimeout(() => {
					brandView.time(0).reverse();
				}, 700);
			}

			if(destination.index === 4)
			{
				t1.play();
				t2.play();
				t3.play();
				t4.play();
				img1.play();
			}

			if(origin.index === 4 && destination.index === 3)
			{
				console.log("rev")
				// t1.reverse();
				// t2.reverse();
				// t3.reverse();
				// t4.reverse();
				// img1.reverse();
			}

		},
	});

	let totalElements = $("img, video").length; // 이미지 및 동영상 총 개수
	let loadedElements = 0; // 로드된 요소 개수
	let $progressBar = $(".bar");
	let $percentage = $(".percent");

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
						}, subIndex * 100);
					});
				});
				$("body").css("overflow", "auto");
			}, 500);
		});
	}

	var Slide = new Swiper(".type-normal", {
		slidesPerView: 'auto',
		spaceBetween: 20,
		pagination: {
			el: ".swiper-pagination",
		}
	});

	$(document).on("click", ".common-popup__bg, .common-popup-close__btn", function (e) {
		$(e.target).closest(".common-popup__bg").length || toggleCommonPopup()
	})

	$(document).on("click", ".langChange", function (e) {
		toggleCommonPopup('popup-lang');
	})



	function toggleCommonPopup(e) {
		var t = $("#" + e);
		e ? (t.toggleClass("popup-on"),
			$(".common-popup__bg").fadeIn(),
			$("body").css({
				// height: "100vh",
				// overflow: "hidden"
			})) : ($(".common-popup").removeClass("popup-on"),
			$(".common-popup__bg").fadeOut(),
			$("body").css({
				// height: "auto",
				// overflow: "unset"
			}))
	}



});



