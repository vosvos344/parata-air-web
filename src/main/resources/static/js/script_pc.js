let defaultHeight = 4000;
let sectionMidHeight = 6000;
let sectionLongHeight = 10000;
let headStep = 0;
let isAnimating = false;
let headName = "";
let headProgress = 0;

$(window).on("load", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
});
$(document).ready(function () {
    let bodyWrap = $("body");
    let animationTopSection = $(".animationTopSection");
    bodyWrap.css({
        overflow: "hidden",
    })
    animationTopSection.css({
        height: $(window).height(),
    })
    $("#animationSection3").css({
        height: sectionLongHeight+"px",
    });
    $("#animationSection4").css({
        height: sectionMidHeight+"px",
    });
    $("#animationSection5").css({
        height: sectionMidHeight+"px",
    });
    $("#animationSection6").css({
        height: defaultHeight+"px",
    });
    $("#animationSection7").css({
        height: defaultHeight+"px",
    });
    $("#animationSection4 .animationTextInner").css({
        height: $(window).height()+"px",
    });



    document.addEventListener('wheel', function(e) {

        if(isAnimating || headStep === "end") return;
        e.preventDefault();
        const deltaY = e.deltaY;

        if(deltaY > 0){
            animation.headMoveStep("Next");
        }else if(deltaY < 0) {
            animation.headMoveStep("Prev");
        }


    }, { passive: false });



    //wheel 애니메이션 끝나고 스크롤 시작
    $(window).on("scroll", function () {
        if ($(window).scrollTop() === 0) {
            $("body").css("overflow", "hidden");
            $("#animationSection2").css({
                position : "fixed",
                bottom : "unset",
                top: "0",
            });
            headStep = 7;
            animation.headMoveStep("Prev");
        }

        let scrollTop = $(this).scrollTop();
        let windowHeight = $(window).height();
        animation.section3(scrollTop, windowHeight);
        animation.section4(scrollTop, windowHeight);
        animation.section5(scrollTop, windowHeight);
        animation.section6(scrollTop, windowHeight);
        animation.section7(scrollTop, windowHeight);

    });


})

const animation = {


    headMoveStep: function (direction) {
        if(isAnimating) return;

        if (direction === "Next" && headStep < 7) {
            headStep += 1;
        } else if (direction === "Prev" && headStep > 0) {
            headStep -= 1;
        }else {
            if (headStep === 7) {
                $("body").css("overflow", "auto");
                headStep = "end";
            }
            return;
        }

        animation.headExecuteStep(headStep, direction);

    },
    headExecuteStep: function (step, direction) {
        const animationHeaderOriginal = $(".animationHeaderOriginal");
        const animationSection1 = $("#animationSection1");
        const animationSection2 = $("#animationSection2");
        const animationLogo = $(".animationLogoOuter");

        isAnimating = true;

        console.log(step);

        switch (step) {
            case 0:
                //다음 아이들
                animationSection1.removeClass("animateHead11Next animateHead11Prev");



                animationSection1.addClass("animateHead10"+direction);

                setTimeout(() => {
                    isAnimating = false;
                }, 2000);

                break;
            case 1:
                //해당 섹션에 Prev만 지고 Next는 그 전섹션 진입시~
                animationSection1.removeClass("animateHead11Prev");

                //다음 아이들
                animationSection1.removeClass("animateHead12Next animateHead12Prev");
                animationSection2.removeClass("animateSec21Next animateSec21Prev");

                animationSection1.addClass("animateHead11"+direction);

                headName = "브랜드 슬로건";
                headProgress = 14;
                //첫번째 애니메이션에서 transition 2초 사용
                setTimeout(() => {
                    isAnimating = false;
                }, 3000);

                break;
            case 2:
                //이번 아이들
                animationSection1.removeClass("animateHead12Prev");
                animationSection2.removeClass("animateSec21Prev");

                //다음 아이들
                animationSection2.removeClass("animateSec22Next animateSec22Prev");


                animationSection1.addClass("animateHead12"+direction);
                animationSection2.addClass("animateSec21"+direction);
                animationHeaderOriginal.show();
                setTimeout(() => {
                    isAnimating = false;
                }, 2000);

                break;
            case 3:

                //이번 아이들
                animationSection2.removeClass("animateSec21Prev animateSec22Prev");

                //다음 아이들
                animationSection2.removeClass("animateSec23Next animateSec23Prev");



                animationSection2.addClass("animateSec22"+direction);
                setTimeout(() => {
                    isAnimating = false;
                }, 1000);



                break;
            case 4:
                //이번 아이들
                animationSection2.removeClass("animateSec23Prev");

                //다음 아이들
                animationSection2.removeClass("animateSec24Next animateSec24Prev");


                animationSection2.addClass("animateSec23"+direction);

                setTimeout(() => {
                    isAnimating = false;
                }, 1000);
                break;


            case 5:

                //이번 아이들
                animationSection2.removeClass("animateSec24Prev");

                //다음 아이들
                animationSection2.removeClass("animateSec25Next animateSec25Prev");

                animationSection2.addClass("animateSec24"+direction);
                headName = "기업 철학";
                headProgress = 14 * 2;
                setTimeout(() => {
                    isAnimating = false;
                }, 2000);
                break;


            case 6:

                //이번 아이들
                animationSection2.removeClass("animateSec25Prev");

                //다음 아이들
                animationSection2.removeClass("animateSec26Next animateSec26Prev");


                animationSection2.addClass("animateSec25"+direction);

                setTimeout(() => {
                    isAnimating = false;
                }, 2000);
                break;

            case 7:

                //이번 아이들
                animationSection2.removeClass("animateSec26Prev");

                //다음 아이들
                animationSection2.addClass("animateSec26"+direction);

                setTimeout(() => {
                    isAnimating = false;
                    $("body").css("overflow", "auto");
                    headStep = "end";
                    $("#animationSection2").css({
                        position: "absolute",
                    });
                }, 2000);
                break;


            default:
                console.log("Error");
                isAnimating = false;
        }

        $(".animationHeaderToc .sectionTitle").html(headName);
        $(".progressHeaderLine").css({
            width: headProgress+"%",
        })
    },

    section3 : function(scrollTop, windowHeight){
        let setHeight = defaultHeight;
        let animationSection3 = $("#animationSection3");
        let animationSection3Top = animationSection3.offset().top;
        let animationSection4Top = $("#animationSection4").offset().top;
        let animation3End = animationSection4Top - windowHeight;
        let aniThirdMainImg = $("#animationSection3 .animationImgMain");
        let aniThirdInfoWrap = $("#animationSection3 .animationInfoWrap");
        let setPart1 = $("#animationSection3 .animationInfo");
        let infoTwoTitle = $("#animationSection3 .animationInfo.two .animationInfoTitle");
        var animationImgCont = $("#animationSection3 .animationImgCont");



        if(scrollTop > animationSection3Top && scrollTop < animation3End){
            if(lang === "en"){
                $(".sectionTitle").html("Reasonable premium");
            }else{
                $(".sectionTitle").html("합리적 프리미엄");
                $(".animationHeaderToc").removeClass("black");
            }

            $(".progressHeaderLine").css({
                width: "calc(14% * 3)",
            })
            aniThirdInfoWrap.css({
                position: "fixed",
                top: "0",
            });
            let aniThirdProgress = (scrollTop - animationSection3Top) / (animation3End - animationSection3Top);
            let aniThirdSubSectionSize = 1 / 3;
            imgWidth = 100;
            setPart1.css({height: windowHeight,});
            if (aniThirdProgress < aniThirdSubSectionSize) {


                let aniThirdMainImgWidth = Math.max(50, Math.min(80, 80 - (aniThirdProgress / aniThirdSubSectionSize) * (80 - 50)));
                let aniThirdLeftValue = Math.max(0, 50 - (aniThirdProgress / aniThirdSubSectionSize) * 50);
                let aniThirdTranslateXValue = Math.min(0, -50 + (aniThirdProgress / aniThirdSubSectionSize) * 50);

                aniThirdMainImg.css({
                    position: "fixed",
                    left: `${aniThirdLeftValue}%`,
                    top: "0",
                    transform: `translateX(${aniThirdTranslateXValue}%)`,
                    width: `${aniThirdMainImgWidth}%`,
                    height: "100vh",
                });

                $("#animationSection3 .animationInfo.one").removeClass("activeOne");
                $("#animationSection3 .animationInfo.one").removeClass("activeTwo");
                $("#animationSection3 .animationInfo.two").removeClass("ready");
                $("#animationSection3 .animationInfo.two").css({
                    transform: `translateY(100%)`,
                    transition: 'all ease-out .5s',
                });



            } else {
                if(aniThirdProgress < aniThirdSubSectionSize * 2){

                    const progressInSecondSection = (aniThirdProgress - aniThirdSubSectionSize * 1) / (aniThirdSubSectionSize);

                    $("#animationSection3 .animationInfo.two.ready").css({
                        transform: `translateY(94%)`,
                    });
                    $("#animationSection3 .animationInfo.two").removeClass("activeOne");
                    $("#animationSection3 .animationInfo.two").removeClass("activeTwo");
                    aniThirdInfoWrap.css({
                        opacity: "1",
                    });
                    if (progressInSecondSection < 1 / 3) {

                        $("#animationSection3 .animationInfo.one").addClass("activeOne");
                        $("#animationSection3 .animationInfo.two").addClass("ready");
                        $("#animationSection3 .animationInfo.one").removeClass("activeTwo");

                        animationImgCont.eq(1).css({
                            transform: `translateY(100%)`,
                        });

                    } else if (progressInSecondSection <= 3) {
                        $("#animationSection3 .animationInfo.one").addClass("activeTwo");
                        const translateYValue = 100 - ((progressInSecondSection - 1 / 3) / (1 - 1 / 3)) * 100;

                        animationImgCont.eq(1).css({
                            transform: `translateY(${translateYValue}%)`,
                        });
                    }


                }else if(aniThirdProgress < aniThirdSubSectionSize * 3){
                    if(lang === "en"){
                        $(".sectionTitle").html("Reasonable premium");
                    }else{
                        $(".sectionTitle").html("진심 어린 서비스");
                        $(".animationHeaderToc").addClass("black");
                    }
                    const progressInThirdSection = (aniThirdProgress - aniThirdSubSectionSize * 2) / aniThirdSubSectionSize;

                    if (progressInThirdSection < 1 / 6) {
                        const translateYValue = 94 - (progressInThirdSection / (1 / 6)) * 94;
                        $("#animationSection3 .animationInfo.two.ready").css({
                            transform: `translateY(${translateYValue}%)`,
                        });
                        infoTwoTitle.css({
                            opacity: '1',
                            transition: 'all ease .5s',
                        });
                    } else if (progressInThirdSection < 2 / 6) {
                        infoTwoTitle.css({
                            opacity: '0',
                            transition: 'all ease .5s',
                        });
                        $("#animationSection3 .animationInfo.two.ready").css({
                            transform: `translateY(0%)`,
                        });
                        $("#animationSection3 .animationInfo.two").addClass("activeOne");
                    } else if (progressInThirdSection < 3 / 6) {
                        animationImgCont.eq(2).css({
                            transform: `translateY(100%)`,
                        });
                        $("#animationSection3 .animationInfo.two").addClass("activeOne");



                    } else if (progressInThirdSection < 4 / 6) {
                        const thirdTranslateYValue = 100 - ((progressInThirdSection - 3 / 6) / (1 / 6)) * 100;
                        animationImgCont.eq(2).css({
                            transform: `translateY(${thirdTranslateYValue}%)`,
                        });


                        if(lang === "en"){
                            $(".sectionTitle").html("Reasonable premium");
                        }else{
                            $(".sectionTitle").html("진심 어린 서비스");
                            $(".animationHeaderToc").addClass("black");
                        }

                        $(".progressHeaderLine").css({
                            width: "calc(14% * 3)",
                        })

                    }else if (progressInThirdSection < 5 / 6) {
                        animationImgCont.eq(2).css({
                            transform: `translateY(0%)`,
                        });
                        $("#animationSection3 .animationInfo.two").addClass("activeOne");

                        animationImgCont.eq(3).css({
                            transform: `translateY(100%)`,
                        });

                        if(lang === "en"){
                            $(".sectionTitle").html("Reasonable premium");
                        }else{
                            $(".sectionTitle").html("진심 어린 서비스");
                        }



                    }else if (progressInThirdSection < 6) {
                        const lastTranslateYValue = 100 - ((progressInThirdSection - 5 / 6) / (1 / 6)) * 100;
                        animationImgCont.eq(3).css({
                            transform: `translateY(${lastTranslateYValue}%)`,
                        });
                        $("#animationSection3 .animationInfo.two").addClass("activeTwo");
                        if(lang === "en"){
                            $(".sectionTitle").html("Reasonable premium");
                        }else{
                            $(".sectionTitle").html("진심 어린 서비스");
                            $(".animationHeaderToc").addClass("black");
                        }

                        $(".progressHeaderLine").css({
                            width: "calc(14% * 3)",
                        })
                    }

                    animationImgCont.eq(1).css({
                        transform: `translateY(0%)`,
                    });
                }
                aniThirdMainImg.css({
                    position: "fixed",
                    left: "0",
                    top: "0",
                    transform: "translateX(0)",
                    width: "50%",
                    height: "100vh",
                });
            }


        } else if (scrollTop <= animationSection3Top) {
            // animationSection3Top 이전
            aniThirdInfoWrap.css({
                position: "absolute",
                top: "0",
                bottom: "unset",
            });
            aniThirdMainImg.css({
                position: "absolute",
                left: "50%",
                top: "0",
                transform: "translateX(-50%)",
                width: "80%",
                height: "100vh",
            });
        } else if (scrollTop >= animation3End) {
            // animation3End 이후

            animationImgCont.eq(1).css({
                transform: `translateY(0%)`,
            });
            animationImgCont.eq(2).css({
                transform: `translateY(0%)`,
            });
            animationImgCont.eq(3).css({
                transform: `translateY(0%)`,
            });
            aniThirdInfoWrap.css({
                position: "absolute",
                top: "unset",
                bottom: "0",
            });
            aniThirdMainImg.css({
                position: "absolute",
                left: "0",
                bottom: "0",
                top: "unset",
                transform: "translateX(0)",
                width: "50%",
                height: "100vh",
            });
            aniThirdInfoWrap.css({
                opacity: "1",
            });
            $("#animationSection3 .animationInfo.two").css({
                transform: `translateY(0%)`,
            });

        }

    },


    section4 : function(scrollTop, windowHeight, event){
        let animationSection4 = $("#animationSection4");
        let animationSection4Top = $("#animationSection4").offset().top;
        let animationSection5Top = $("#animationSection5").offset().top;
        let animation4End = animationSection5Top - windowHeight;
        let animationTextWrap = animationSection4.find(".animationTextWrap");
        let animationList = animationSection4.find(".animationList");
        let animationListItems = animationList.find("ul li");
        let animationTextNumber = animationSection4.find(".animationTextNumberInner .count");

        let liHeight = animationListItems.eq(0).outerHeight();
        let liGap = 136;
        let lastScrollTop = 0;

        let aniFourthProgress = (scrollTop - animationSection4Top) / (animation4End - animationSection4Top);
        let aniFourthSubSectionSize = 1 / 5;

        if(scrollTop > animationSection4Top){
            $(".animationHeaderToc").removeClass("black");
        }

        if(scrollTop > animationSection4Top && scrollTop < animationSection5Top) {

            if (lang === "en") {
                $(".sectionTitle").html("Brand Value");
            } else {
                $(".sectionTitle").html("브랜드 가치");
                $(".animationHeaderToc").removeClass("black");
            }

            $(".progressHeaderLine").css({
                width: "calc(14% * 4)",
            })


        }else if(scrollTop < animationSection4Top && scrollTop > (animationSection4Top - windowHeight)){
            if (lang === "en") {
                $(".sectionTitle").html("Brand Value");
            } else {
                $(".sectionTitle").html("진심 어린 서비스");
                $(".animationHeaderToc").addClass("black");
            }

            $(".progressHeaderLine").css({
                width: "calc(14% * 4)",
            })
        }

        if(scrollTop > animationSection4Top && scrollTop < animation4End) {
            animationTextWrap.css({
                position: "fixed",
                left: "0",
                top: "0",
                bottom: "unset",
                transform: `translateY(0)`,
            });

            let isScrollingDown = scrollTop > lastScrollTop;
            lastScrollTop = scrollTop;

            if (isScrollingDown) {
                if (aniFourthProgress < aniFourthSubSectionSize) {
                } else if (aniFourthProgress < aniFourthSubSectionSize * 2) {
                    animationListItems.removeClass("listOn");
                    animationListItems.eq(0).addClass("listOn");
                } else if (aniFourthProgress < aniFourthSubSectionSize * 3) {
                    animationListItems.removeClass("listOn");
                    animationListItems.eq(1).addClass("listOn");
                } else if (aniFourthProgress < aniFourthSubSectionSize * 4) {
                    animationListItems.removeClass("listOn");
                    animationListItems.eq(2).addClass("listOn");
                } else if (aniFourthProgress < aniFourthSubSectionSize * 5) {

                }
            } else {

                if (aniFourthProgress < aniFourthSubSectionSize) {

                } else if (aniFourthProgress < aniFourthSubSectionSize * 2) {
                    animationListItems.removeClass("listOn");
                    animationListItems.eq(2).addClass("listOn");

                } else if (aniFourthProgress < aniFourthSubSectionSize * 3) {
                    animationListItems.removeClass("listOn");
                    animationListItems.eq(1).addClass("listOn");
                } else if (aniFourthProgress < aniFourthSubSectionSize * 4) {
                    animationListItems.removeClass("listOn");
                    animationListItems.eq(0).addClass("listOn");
                } else if (aniFourthProgress < aniFourthSubSectionSize * 5) {

                }
            }

        } else if (scrollTop <= animationSection4Top) {
            animationListItems.removeClass("listOn");
            animationTextWrap.css({
                position: "absolute",
                left: "0",
                top: "0",
                bottom: 'unset',
            });
        }else if (scrollTop >= animation4End) {
            let bottomOffset = parseInt(animationTextWrap.css("padding-top"), 10) || 0;
            animationListItems.eq(2).addClass("listOn");
            animationTextWrap.css({
                position: "absolute",
                left: "0",
                top: "unset",
                bottom: '0',
            });
        }
    },

    section5 : function(scrollTop, windowHeight){
        var setHeight = defaultHeight;
        let animationSection5 = $("#animationSection5");
        let animationSection5TextInner = animationSection5.find(".animationSectionTextInner");
        let animationSection5Video = animationSection5.find(".animationSectionVideo");
        let animationSection5Top = animationSection5.offset().top;
        let animationSection6Top = $("#animationSection6").offset().top;
        let animation5End = animationSection6Top - windowHeight;
        let animationSection5Inner = animationSection5.find(".animationSectionInner");




        if(scrollTop >= animationSection5Top && scrollTop < animationSection6Top){
            if(lang === "en"){
                $(".sectionTitle").html("Brand Naming");
            }else{
                $(".sectionTitle").html("브랜드 네이밍");
            }

            $(".progressHeaderLine").css({
                width: "calc(14% * 5)",
            })
        }

        if(scrollTop >= animationSection5Top && scrollTop < animation5End){

            let aniFifthProgress = (scrollTop - animationSection5Top) / (animation5End - animationSection5Top);
            let aniFifthSubSectionSize = 1 / 3;

            animationSection5Inner.css({
                position: "fixed",
                top: "0",
                bottom: "unset",
            })

            if (aniFifthProgress < aniFifthSubSectionSize * 1.1) {
                let parentHeight = animationSection5Inner.outerHeight();
                let topValue = aniFifthProgress * parentHeight;
                // animationSection5TextInner.css({
                //     top: `${topValue}px`,
                //     left: 0,
                // });
                // animationSection5TextInner.addClass("txtActive");


                let progressRatio = aniFifthProgress / aniFifthSubSectionSize;
                let newBottom = `${Math.floor(2 - progressRatio * 2)}%`;
                let newRight = `${Math.floor(2 - progressRatio * 2)}%`;
                let newWidth = `${Math.floor(30 + progressRatio * 20)}%`;
                let newHeight = `${Math.floor(30 + progressRatio * 70)}%`;

                console.log(progressRatio);
                if(progressRatio > 1){
                    newBottom = "0%";
                    newRight = "0%";
                    newWidth = "50%";
                    newHeight = "100%";
                }
                animationSection5Video.css({
                    bottom: newBottom,
                    right: newRight,
                    width: newWidth,
                    height: newHeight,
                });



            }else if (aniFifthProgress < aniFifthSubSectionSize * 2.1) {

                let progressRatio = Math.min(1, Math.max(0, (aniFifthProgress - aniFifthSubSectionSize) / aniFifthSubSectionSize));
                let newLeft = `${Math.min(0, Math.max(-100, -100 * progressRatio))}%`;
                let newOpacity = Math.min(1, Math.max(0, 1 - progressRatio));
                let newVideoWidth = `${Math.min(100, Math.max(50, 50 + progressRatio * 50))}%`;

                // animationSection5TextInner.css({
                //     left: newLeft,
                //     opacity: newOpacity,
                // });

                if(progressRatio > 1){
                    newVideoWidth = "100%";
                }

                animationSection5Video.css({
                    width: newVideoWidth,
                });



                $(".animationSectionLogo").removeClass("active");
            }else if (aniFifthProgress < aniFifthSubSectionSize * 3) {


                $(".animationSectionLogo").addClass("active");


            }


        }else if(scrollTop < animationSection5Top){
            $(".animationSectionLogo").removeClass("active");
            animationSection5TextInner.removeClass("txtActive");
            animationSection5Inner.css({
                position: "absolute",
                top: "0",
                bottom: "unset",
            })
            animationSection5TextInner.css({
                position: "absolute",
                top: "0",
                left: 0,
            });


        }else if(scrollTop >= animation5End){
            $(".animationSectionLogo").addClass("active");
            animationSection5Inner.css({
                position: "absolute",
                top: "unset",
                bottom: "0",
            })
            animationSection5TextInner.css({
                position: "absolute",
                left: "-98%",
            });

            animationSection5Video.css({
                width: "100%",
                height: "100%",
                bottom: 0,
                right: 0,
            });

        }



    },


    section6 : function(scrollTop, windowHeight){
        var setHeight = defaultHeight;
        let animationSection6 = $("#animationSection6");
        let animationSection6Left = animationSection6.find(".animationSectionLeft");
        let animationSection6RightInner = animationSection6.find(".animationSectionRightInner");
        let animationSection6Top = animationSection6.offset().top;
        let animationSection7Top = animationSection6Top + setHeight;
        let animation6End = animationSection7Top - windowHeight;
        let animation6TextStart = animationSection6Top - (windowHeight / 3);
        let animation6TextEnd = animationSection7Top - windowHeight;



        if(scrollTop >= animation6TextStart && scrollTop < animation6TextEnd){
            animationSection6Left.addClass("txt6On");
        }else if(scrollTop < animation6TextStart){
            animationSection6Left.removeClass("txt6On");
        }else if(scrollTop < animation6TextEnd){
            animationSection6Left.addClass("txt6On");
        }


        animationSection6RightInner.each(function(index){

            if(index === 0)
            {
                $(this).css({
                    height: "300px",
                })
            }else{
                $(this).css({
                    height: setHeight / 6,
                })
            }

        })
        if(scrollTop >= animationSection6Top && scrollTop < animationSection7Top) {
            if (lang === "en") {
                $(".sectionTitle").html("Brand Color");
            } else {
                $(".sectionTitle").html("브랜드 컬러");
            }

            $(".progressHeaderLine").css({
                width: "calc(14% * 6)",
            })
        }


        if(scrollTop >= animationSection6Top && scrollTop < animation6End){
            animationSection6Left.css({
                position: "fixed",
                top: "0",
                bottom: "unset",
            })

            animationSection6RightInner.each(function (index) {
                if(!$(this).hasClass("active")){
                    const currentBox = $(this);
                    const boxHeight = currentBox.outerHeight();
                    const boxTop = currentBox.offset().top - 300;

                    if(scrollTop > boxTop && scrollTop <= boxTop + boxHeight){
                        animationSection6RightInner.removeClass('active');
                        currentBox.addClass('active');
                    }

                }
            });

        }else if(scrollTop < animationSection6Top){
            animationSection6RightInner.removeClass('active');
            animationSection6Left.css({
                position: "absolute",
                top: "0",
                bottom: "unset",
            })
        }else if(scrollTop >= animation6End){
            animationSection6Left.css({
                position: "absolute",
                top: "unset",
                bottom: "0",

            })
        }
    },

    section7 : function(scrollTop, windowHeight){

        const animation7 = $('#animationSection7');
        const animation7Top = animation7.offset().top;
        const animation7Height = animation7.outerHeight();
        const animation7Inner = animation7.find(".animationSectionInner");
        const animation7Title = animation7.find(".animationSectionTitle");
        const animationImgList = animation7.find('.animationSectionImgList');
        const animationRecriut = animation7.find('.animationSectionRecruit');
        const animationImgListHeight = animationImgList.outerHeight();
        const animationInnerHeight = animation7Inner.outerHeight();
        const animationImgListTop = animationImgList.offset().top;
        const imageWidth = $('.animationSectionImgCont img').width();
        const centralOffset = animation7Top + ((windowHeight - animationImgListHeight) / 2) ;
        const fixedTopValue = animation7Top - centralOffset ;
        const endPoint = animation7Top + animation7Height - animationInnerHeight - fixedTopValue;

        const totalImages = 6;
        const maxTransformValue = -(imageWidth * (totalImages - 1));

        if(scrollTop >= (animation7Top - (windowHeight / 3)) && scrollTop < endPoint){
            animation7Title.addClass("txtActiveOn");
        }else if(scrollTop < (animation7Top - (windowHeight / 3))){
            animation7Title.removeClass("txtActiveOn");
        }


        if(scrollTop >= animation7Top){
            if(lang === "en"){
                $(".sectionTitle").html("Brand Assets");
            }else{
                $(".sectionTitle").html("브랜드 에셋");
            }


            $(".progressHeaderLine").css({
                width: "calc(100%)",
            })
        }




        let botTxtAniHead = animationImgListTop - (windowHeight / 2);
        if(scrollTop >= botTxtAniHead){
            $(".animationHeaderOriginal").css({
                background: "#161626",
            });
        }else{
            $(".animationHeaderOriginal").css({
                background: "transparent",
            });;
        }



        let botTxtAni = animationImgListTop + (animationImgListHeight / 2) - 100;
        if(scrollTop >= botTxtAni){
            animationRecriut.addClass("txtActiveOn");
        }else{
            animationRecriut.removeClass("txtActiveOn");
        }


        if(scrollTop >= centralOffset && scrollTop < endPoint){

            animation7Inner.css({
                position: "fixed",
                top: fixedTopValue,
                bottom: "unset",
            })

            let aniSevenProgress = (scrollTop - centralOffset) / (endPoint - centralOffset) ;
            let aniSevenSubSectionSize = 1 / (totalImages - 1);
            let currentImageIndex = Math.floor(aniSevenProgress / aniSevenSubSectionSize);
            let progressWithinSection = (aniSevenProgress % aniSevenSubSectionSize) / aniSevenSubSectionSize;

            if (currentImageIndex < totalImages - 1) {
                const ulTransformValue = -imageWidth * currentImageIndex - (progressWithinSection * imageWidth);
                $('.animationSectionImgList ul').css({
                    transform: `translateX(${ulTransformValue}px)`,
                });
            } else {
                const ulTransformValue = -imageWidth * (totalImages - 1);
                const adjustedTransformValue = ulTransformValue + maxTransformValue
                $('.animationSectionImgList ul').css({
                    transform: `translateX(${maxTransformValue}px)`,
                });
            }


        }else if (scrollTop < centralOffset) {
            animation7Inner.css({
                position: "absolute",
                top: 0,
                bottom: "unset",
            });
            $('.animationSectionImgList ul').css({
                transform: `translateX(0px)`,
            });
        } else if (scrollTop >= endPoint) {
            animation7Inner.css({
                position: "absolute",
                top: "unset",
                bottom: "0",
            });
            $('.animationSectionImgList ul').css({
                transform: `translateX(${maxTransformValue}px)`,
            });
        }


    },






}


//
// $(window).on('scroll', function () {
//     const scrollTop = $(window).scrollTop();
//     const windowHeight = $(window).height();
//
//     const sections = [
//         { section: $('#animationSection1'), progress: $('.progressLine')},
//         { section: $('#animationSection2'), progress: $('.progressLine')},
//         { section: $('#animationSection3'), progress: $('.progressLine')},
//         { section: $('#animationSection4'), percent: "(100 / 4)", progress: $('.progressLine'), titleKo: "브랜드 가치", titleEn: "Brand Value" },
//         { section: $('#animationSection5'), percent: "(100 / 3)", progress: $('.progressLine'), titleKo: "브랜드 네이밍", titleEn: "Brand Naming" },
//         { section: $('#animationSection6'), percent: "(100 / 2)", progress: $('.progressLine'), titleKo: "브랜드 컬러", titleEn: "Brand Color" },
//         { section: $('#animationSection7'), percent: "(100 / 1)", progress: $('.progressLine'), titleKo: "브랜드 에셋", titleEn: "Brand Assets" },
//
//
//
//     ];
//
//     sections.forEach(({ section, progress, titleKo, titleEn, percent }, index) => {
//         const sectionTop = section.offset().top;
//         const sectionHeight = section.outerHeight();
//
//         const progressStart = index === 0 ? sectionTop : sectionTop - windowHeight;
//         const progressEnd = sectionTop + sectionHeight - windowHeight;
//
//         let progressWidth = 0;
//
//         if (scrollTop >= progressStart && scrollTop <= progressEnd) {
//             if(lang === "en") {
//                 $(".sectionTitle").html("");
//                 $(".sectionTitle").html(titleEn);
//             }else{
//                 $(".sectionTitle").html("");
//                 $(".sectionTitle").html(titleKo);
//             }
//             if(percent){
//                 progress.css({
//                     'width': `${percent}%`,
//                     'transition': 'width 0.3s ease-out',
//                 });
//             }
//
//         }
//     });
// });


// $(document).ready(function () {
//
//     var sectionHeight = $(window).height();
//     var sections = $(".animationSection");
//     // var sectionLong1 = $(".animationSection#animationSection1");
//     // var sectionLong2 = $(".animationSection#animationSection2");
//     // var sectionLong3 = $(".animationSection#animationSection3");
//     sections.each(function (index, section) {
//         var setHeight = defaultHeight;
//         $(section).css({"height": setHeight + "px",});
//
//     });
//     // sectionLong1.css({"height": defaultLongHeight + "px",});
//     //sectionLong2.css({"height": defaultMaxHeight + "px",});
//     //sectionLong3.css({"height": defaultMidHeight + "px",});
//
//
//     $(window).on("scroll", function () {
//         var scrollTop = $(this).scrollTop();
//         var windowHeight = $(window).height();
//         //animation.sectionHead(scrollTop, windowHeight);
//         // animation.section1(scrollTop, windowHeight);
//         // animation.section2(scrollTop, windowHeight);
//         // animation.section3(scrollTop, windowHeight);
//         // animation.section4(scrollTop, windowHeight);
//         // animation.section5(scrollTop, windowHeight);
//         // animation.section6(scrollTop, windowHeight);
//         // animation.section7(scrollTop, windowHeight);
//
//     });
// });
//
// const animation = {
//     sectionHead: function(scrollTop, windowHeight, event, deltaY) {
//         event.preventDefault();
//         if (isAnimating) return;
//
//
//         if (deltaY > 0) {
//             animation.headMoveStep("next");
//         } else if (deltaY < 0) {
//             animation.headMoveStep("prev");
//         }
//
//     },
//
//     headMoveStep : function(direction){
//         isAnimating = true;
//
//         if (direction === "next") {
//             if (headStep < 4) { // 4단계까지 진행 가능
//                 headStep += 1;
//                 console.log(`다음 단계: ${headStep}`);
//                 animation.headExecuteStep(headStep);
//             }
//         } else if (direction === "prev") {
//             if (headStep > 0) { // 0단계 이하로는 못 내려감
//                 headStep -= 1;
//                 console.log(`이전 단계: ${headStep}`);
//                 animation.headExecuteStep(headStep);
//             }
//         }
//
//         setTimeout(() => {
//             isAnimating = false;
//         }, 800);
//     },
//     headExecuteStep : function(step) {
//         let animationLogo = $(".animationLogoOuter");
//         switch (step) {
//             case 0:
//                 console.log("Step 0: 초기 상태");
//                 animationLogo.css({
//                     transform: "translate(-50%, -50%) scale(300)",
//                     transition: "transform 0.8s ease",
//                 });
//                 break;
//             case 1:
//                 console.log("Step 1: 로고 축소");
//                 animationLogo.css({
//                     transform: "translate(-50%, -50%) scale(1)",
//                     transition: "transform 0.8s ease",
//                 });
//                 break;
//             case 2:
//                 console.log("Step 2: 로고 더 축소");
//                 animationLogo.css({
//                     transform: "translate(-50%, -50%) scale(0.6)",
//                     transition: "transform 0.8s ease",
//                 });
//                 break;
//             case 3:
//                 console.log("Step 3: 로고 최소화");
//                 animationLogo.css({
//                     transform: "translate(-50%, -50%) scale(0.5)",
//                     transition: "transform 0.8s ease",
//                 });
//                 break;
//             case 4:
//                 console.log("Step 4: 최종 상태");
//                 animationLogo.css({
//                     transform: "translate(-50%, -50%) scale(0.3)",
//                     transition: "transform 0.8s ease",
//                 });
//                 break;
//             default:
//                 console.log("알 수 없는 단계");
//         }
//     },
//
//     section1 : function(scrollTop, windowHeight){
//         var setHeight = defaultHeight;
//         var animationSection1 = $("#animationSection1");
//         var animationSection1Img = $("#animationSection1 .animationImg");
//         var animationSection1Txt = $("#animationSection1 .animationText");
//         var animationSection2 = $("#animationSection2").offset().top;
//         var headerStartSec = animationSection2 - $(".animationHeaderOriginal").outerHeight();
//         var nextSection = animationSection2 - windowHeight;
//
//         if(scrollTop >= nextSection){
//             animationSection1Img.css({
//                 position: "absolute",
//                 top: "unset",
//                 bottom: "0",
//                 height: windowHeight,
//             })
//         }else{
//             animationSection1Img.css({
//                 position: "fixed",
//                 top: "0",
//                 bottom: "unset",
//                 height: "100%",
//             })
//         }
//
//         if(scrollTop >= 0 && scrollTop < 2000){
//             $("#animationSection1 .animationText").addClass("txtOn");
//         }else{
//             $("#animationSection1 .animationText").removeClass("txtOn");
//         }
//
//         if(scrollTop > headerStartSec){
//             $(".animationHeaderOriginal").show();
//             $(".animationLogoAfterInner").addClass("pa-fade");
//         }else{
//             $(".animationHeaderOriginal").hide();
//             $(".animationLogoAfterInner").removeClass("pa-fade");
//         }
//
//
//
//
//
//     },
//
//     section2 : function(scrollTop, windowHeight){
//         var animationSection2 = $("#animationSection2");
//         var animationImg = animationSection2.find(".animationImg");
//         var animationImgTextLeft = animationSection2.find(".animationImgTextLeft");
//         var animationImgTextRight = animationSection2.find(".animationImgTextRight");
//         var animationImgTextBottom = animationSection2.find(".animationImgTextBottom");
//         var animationSection2Top = animationSection2.offset().top;
//         var animationSectionInner = animationSection2.find(".animationSectionInner");
//         var animationSection3Top = $("#animationSection3").offset().top;
//         var animationSecondEnd = animationSection3Top - windowHeight;
//
//
//         $('.animationTextWrap').each(function(wrapIndex) {
//             let wrap = $(this);
//             let texts = wrap.find('.animatedText');
//             let baseDelay = 0.1;
//             let groupDelay;
//
//             if(wrap.hasClass("txtWrapThird")){
//                 groupDelay = wrapIndex * 0.8;
//             }else{
//                 groupDelay = wrapIndex * 0.5;
//             }
//             texts.each(function(index) {
//                 const delay = groupDelay + (index * baseDelay);
//                 $(this).css('animation-delay', `${delay}s`);
//             });
//         });
//
//         if(scrollTop >= animationSection2Top && scrollTop < animationSecondEnd){
//             animationSectionInner.css({
//                 position: "fixed",
//                 top: "0",
//                 bottom: "unset",
//                 height: "100%",
//             })
//
//             const totalHeight = animationSecondEnd - animationSection2Top;
//             const sectionHeight = totalHeight / 6;
//
//             const firstSecEnd = animationSection2Top + 400;
//             const secondSecEnd = firstSecEnd + 600;
//             const thirdSecEnd = secondSecEnd + 3000;
//             const fourthSecEnd = thirdSecEnd + 600;
//             const fifthSecEnd = fourthSecEnd + sectionHeight * 3;
//             const sixthSecEnd = animationSecondEnd;
//
//             if (scrollTop >= animationSection2Top && scrollTop <= thirdSecEnd) {
//
//                 if(lang === "en"){
//                     $(".sectionTitle").html("Brand Slogan");
//                 }else{
//                     $(".sectionTitle").html("브랜드 슬로건");
//                 }
//
//                 $(".progressHeaderLine").css({
//                     width: "calc(14%)",
//                 })
//
//             } else if (scrollTop >= thirdSecEnd && scrollTop <= animationSecondEnd) {
//
//
//                 if(lang === "en"){
//                     $(".sectionTitle").html("Corporate Philosophy");
//                 }else{
//                     $(".sectionTitle").html("기업 철학");
//                 }
//
//                 $(".progressHeaderLine").css({
//                     width: "calc(14% * 2)",
//                 })
//             }
//
//
//             if (scrollTop >= animationSection2Top && scrollTop < firstSecEnd) {
//
//                 animationSectionInner.addClass("first");
//                 animationSectionInner.removeClass("second");
//                 animationSectionInner.removeClass("third");
//                 animationSectionInner.removeClass("fourth");
//                 animationSectionInner.removeClass("fifth");
//                 animationSectionInner.removeClass("sixth");
//
//             } else if (scrollTop >= firstSecEnd && scrollTop < secondSecEnd) {
//                 animationSectionInner.addClass("first");
//                 animationSectionInner.addClass("second");
//                 animationSectionInner.removeClass("third");
//                 animationSectionInner.removeClass("fourth");
//                 animationSectionInner.removeClass("fifth");
//                 animationSectionInner.removeClass("sixth");
//                 // 위로 스크롤 시 애니메이션 플래그 초기화
//             } else if (scrollTop >= secondSecEnd && scrollTop < thirdSecEnd) {
//                 animationSectionInner.addClass("first second third");
//                 animationSectionInner.removeClass("fourth sixth fifth");
//             } else if (scrollTop >= thirdSecEnd && scrollTop <= fourthSecEnd) {
//                 animationSectionInner.addClass("first");
//                 animationSectionInner.addClass("second");
//                 animationSectionInner.addClass("third");
//                 animationSectionInner.addClass("fourth");
//                 animationImgTextLeft.removeClass("leftOn");
//                 animationImgTextBottom.removeClass("bottomOn");
//                 animationImg.removeClass("imageChange");
//                 animationImgTextRight.removeClass("firstOn");
//                 animationSectionInner.removeClass("fifth");
//                 animationSectionInner.removeClass("sixth");
//
//
//
//
//             } else if (scrollTop >= fourthSecEnd && scrollTop <= fifthSecEnd) {
//                 let aniSecProgress = (scrollTop - fourthSecEnd) / (fifthSecEnd - fourthSecEnd);
//                 let aniSecSubSectionSize = 1 / 3;
//                 animationSectionInner.addClass("first");
//                 animationSectionInner.addClass("second");
//                 animationSectionInner.addClass("third");
//                 animationSectionInner.addClass("fourth");
//                 animationImgTextLeft.addClass("leftOn");
//                 animationImgTextBottom.addClass("bottomOn");
//                 animationSectionInner.removeClass("fifth");
//                 animationSectionInner.removeClass("sixth");
//
//                 if (aniSecProgress < aniSecSubSectionSize) {
//                     animationImgTextRight.addClass("firstOn");
//                     animationImgTextRight.removeClass("secondOn");
//                     animationImg.removeClass("imageChange");
//                     animationImgTextBottom.removeClass("textChange");
//                 } else if (aniSecProgress < aniSecSubSectionSize * 2) {
//                     animationImg.addClass("imageChange");
//                     animationImgTextRight.addClass("secondOn");
//                     animationImgTextBottom.addClass("textChange");
//                 } else if (aniSecProgress < aniSecSubSectionSize * 3) {
//                     animationImg.addClass("imageChange");
//                     animationImgTextRight.addClass("secondOn");
//                     animationImgTextBottom.addClass("textChange");
//                     animationImgTextRight.removeClass("firstOn");
//
//                 }
//             } else if (scrollTop >= fifthSecEnd && scrollTop <= sixthSecEnd) {
//                 animationSectionInner.addClass("first");
//                 animationSectionInner.addClass("second");
//                 animationSectionInner.addClass("third");
//                 animationSectionInner.addClass("fourth");
//                 animationImg.addClass("imageChange");
//                 animationImgTextLeft.removeClass("leftOn");
//                 animationImgTextBottom.removeClass("bottomOn");
//                 animationImgTextRight.removeClass("firstOn");
//                 animationImgTextRight.removeClass("secondOn");
//                 let aniLastProgress = (scrollTop - fifthSecEnd) / (sixthSecEnd - fifthSecEnd);
//                 let aniLastSubSectionSize = 1 / 2;
//                 if(aniLastProgress < aniLastSubSectionSize){
//                     animationSectionInner.addClass("fifth");
//                     animationSectionInner.removeClass("sixth");
//                 }else if(aniLastProgress < aniLastSubSectionSize * 2){
//                     animationSectionInner.addClass("sixth");
//                 }
//
//
//                 $(".progressHeaderLine").css({
//                     width: "calc(14% * 3)",
//                 })
//
//             }
//
//         }else if(scrollTop > animationSecondEnd){
//
//             animationSectionInner.css({
//                 position: "absolute",
//                 top: "unset",
//                 bottom: "0",
//                 height: "100vh",
//             })
//
//
//             if(lang === "en"){
//                 $(".sectionTitle").html("Reasonable premium");
//             }else{
//                 $(".sectionTitle").html("합리적 프리미엄");
//             }
//
//             $(".progressHeaderLine").css({
//                 width: "calc(14% * 3)",
//             })
//
//
//         }else if(scrollTop < animationSection2Top){
//             animationSectionInner.css({
//                 position: "absolute",
//                 top: "0",
//                 bottom: "unset",
//                 height: "100vh",
//             })
//             animationSectionInner.removeClass("first");
//             animationImg.removeClass("imageChange");
//             $(".animationHeader").show();
//         }
//
//     },
//

//
//
// }
//
//
// function animateText($element, progress, direction) {
//     let translateX = direction === "rightToLeft" ? 100 - progress * 100 : progress * 100 - 100;
//     let opacity = progress;
//
//     $element.css({
//         transform: `translateX(${translateX}%)`,
//         opacity: opacity,
//         transition: "opacity .5 ease-out",
//     });
// }
//
// function resetText($elements) {
//     $elements.css({
//         transform: "translateX(100%)",
//         opacity: 0,
//         transition: "opacity .5 ease-out",
//     });
// }
//
var startTime = Date.now();
var minDisplayTime = 5000;
var progressCounter = setInterval(function () {
    var $progress = $("#progress");
    var $percent = $progress.find(".percent");
    var $progressActive = $progress.find(".progressActive");

    var images = $("img");
    var videos = $("video");
    var total = images.length + videos.length;

    $("body").css({
        overflow: "hidden",
    });

    if (total === 0) {
        $progress.fadeOut();
        clearInterval(progressCounter);
        return false;
    }

    var loaded = 0;

    images.each(function () {
        if (this.complete) loaded++;
    });

    videos.each(function () {
        if (this.readyState === 4) loaded++;
    });

    var percentage = Math.round((100 * loaded) / total);
    var elapsedTime = Date.now() - startTime;

    if (elapsedTime < minDisplayTime) {
        percentage = Math.min(100, Math.round((elapsedTime / minDisplayTime) * 100));
    }

    var currentPercent = parseInt($percent.text(), 10) || 0;
    var increment = function (from, to) {
        if (from < to) {
            var step = from + 1;
            $percent.text(step.toString().padStart(3, "0"));
            $progressActive.css("width", step + "%");
            setTimeout(function () {
                increment(step, to);
            }, 10);
        } else {
            $percent.text(to.toString().padStart(3, "0"));
            $progressActive.css("width", to + "%");
        }
    };

    increment(currentPercent, percentage);

    if (percentage === 100 && elapsedTime >= minDisplayTime) {
        $progress.fadeOut();
        clearInterval(progressCounter);
        $("html, body").scrollTop(0);
        headStep = 0;
        $("#animationSection1 .animationText").addClass("txtOn");
    }
}, 100);