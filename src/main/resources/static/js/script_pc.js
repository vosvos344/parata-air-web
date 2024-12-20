let defaultSmallHeight = 3000;
let defaultHeight = 4000;
let sectionMidHeight = 6000;
let sectionEmidHeight = 8000;
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

    //각 섹션별 높이 따로 지정하기
    animationTopSection.css({
        height: $(window).height(),
    })
    $("#animationSection3").css({
        height: sectionEmidHeight+"px",
    });
    $("#animationSection4").css({
        height: sectionMidHeight+"px",
    });
    $("#animationSection5").css({
        height: defaultSmallHeight+"px",
    });
    $("#animationSection6").css({
        height: defaultHeight+"px",
    });
    $("#animationSection7").css({
        height: sectionMidHeight+"px",
    });
    $("#animationSection4 .animationTextInner").css({
        height: $(window).height()+"px",
    });


    //휠 애니메이션 용
    document.addEventListener('wheel', function(e) {

        if(isAnimating || headStep === "end") return;
        e.preventDefault();
        const deltaY = e.deltaY;
        //델타 값에 따라 위 아래 방향 지정
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


                if(lang === "en"){
                    headName = "Brand Slogan";
                }else{
                    headName = "브랜드 슬로건";
                }

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
                if(lang === "en"){
                    headName = "Company Philosophy";
                }else{
                    headName = "기업 철학";
                }
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

            aniThirdMainImg.css({
                position: "fixed",
                top: "0",
            });


            if(lang === "en"){
                $(".sectionTitle").html("Reasonable premium");
                $(".animationHeaderToc").removeClass("black");
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
            let aniThirdSubSectionSize1 = 3 / 13;
            let aniThirdSubSectionSize2 = 4 / 13;
            let aniThirdSubSectionSize3 = 6 / 13;
            imgWidth = 100;
            setPart1.css({height: windowHeight,});
            if (aniThirdProgress < aniThirdSubSectionSize1) {
                let progressInFirstSection = aniThirdProgress / aniThirdSubSectionSize1;

                if (progressInFirstSection < 0.5) {
                    let widthProgress = progressInFirstSection * 2;
                    let aniThirdMainImgWidth = Math.max(50, 80 - widthProgress * (80 - 50));
                    if(progressInFirstSection > 0.485){
                        aniThirdMainImgWidth = 50;
                    }
                    if(progressInFirstSection < 0.015){
                        aniThirdMainImgWidth = 80;
                    }
                    aniThirdMainImg.css({
                        width: `${aniThirdMainImgWidth}%`,
                    });

                } else {


                    aniThirdMainImg.css({
                        width: `50%`,
                    });
                    let progressInSecondHalf = (progressInFirstSection - 0.5) * 2;
                    let aniThirdLeftValue = Math.max(0, 50 - progressInSecondHalf * 50);
                    let aniThirdTranslateXValue = Math.min(0, -50 + progressInSecondHalf * 50);
                    if(progressInFirstSection > 0.98){
                        aniThirdLeftValue = 0;
                        aniThirdTranslateXValue = 0;
                    }
                    if(progressInFirstSection < 0.52){
                        aniThirdLeftValue = 50;
                        aniThirdTranslateXValue = -50;
                    }
                    aniThirdMainImg.css({
                        position: "fixed",
                        left: `${aniThirdLeftValue}%`,
                        top: "0",
                        transform: `translateX(${aniThirdTranslateXValue}%)`,
                        height: "100vh",
                    });
                }




                $("#animationSection3 .animationInfo.one").removeClass("activeOne");
                $("#animationSection3 .animationInfo.one").removeClass("activeTwo");
                $("#animationSection3 .animationInfo.two").removeClass("ready");
                $("#animationSection3 .animationInfo.two").css({
                    transform: `translateY(100%)`,
                    transition: 'all ease-out .5s',
                });



            } else if(aniThirdProgress < aniThirdSubSectionSize1 + aniThirdSubSectionSize2) {


                aniThirdMainImg.css({
                    left: 0,
                    transform: "translateX(0)",
                    width: "50%",
                })

                let progressInSecondSection = (aniThirdProgress - aniThirdSubSectionSize1) / aniThirdSubSectionSize2;

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


            } else if (aniThirdProgress < aniThirdSubSectionSize1 + aniThirdSubSectionSize2 + aniThirdSubSectionSize3) {

                let progressInThirdSection = (aniThirdProgress - aniThirdSubSectionSize1 - aniThirdSubSectionSize2) / aniThirdSubSectionSize3;
                if(lang === "en"){
                    $(".sectionTitle").html("Reasonable premium");
                    $(".animationHeaderToc").addClass("black");
                }else{
                    $(".sectionTitle").html("진심 어린 서비스");
                    $(".animationHeaderToc").addClass("black");
                }

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
                    animationImgCont.eq(2).css({
                        transform: `translateY(100%)`,
                    });
                } else if (progressInThirdSection < 3 / 6) {
                    const thirdTranslateYValue = 100 - ((progressInThirdSection - 2 / 6) / (1 / 6)) * 100;
                    animationImgCont.eq(2).css({
                        transform: `translateY(${thirdTranslateYValue}%)`,
                    });


                    if(lang === "en"){
                        $(".sectionTitle").html("Reasonable premium");
                        $(".animationHeaderToc").addClass("black");
                    }else{
                        $(".sectionTitle").html("진심 어린 서비스");
                        $(".animationHeaderToc").addClass("black");
                    }

                    $(".progressHeaderLine").css({
                        width: "calc(14% * 3)",
                    })


                } else if (progressInThirdSection < 4 / 6) {
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

                }else if (progressInThirdSection < 5 / 6) {

                    const lastTranslateYValue = 100 - ((progressInThirdSection - 4 / 6) / (1 / 6)) * 100;
                    animationImgCont.eq(3).css({
                        transform: `translateY(${lastTranslateYValue}%)`,
                    });
                    $("#animationSection3 .animationInfo.two").addClass("activeTwo");
                    if(lang === "en"){
                        $(".sectionTitle").html("Reasonable premium");
                        $(".animationHeaderToc").addClass("black");
                    }else{
                        $(".sectionTitle").html("진심 어린 서비스");
                        $(".animationHeaderToc").addClass("black");
                    }

                    $(".progressHeaderLine").css({
                        width: "calc(14% * 3)",
                    })


                }else if (progressInThirdSection < 1) {
                    //텀을 조금 주기

                    animationImgCont.eq(3).css({
                        transform: `translateY(0%)`,
                    });
                }


                animationImgCont.eq(1).css({
                    transform: `translateY(0%)`,
                });

            }


        }else if (scrollTop <= animationSection3Top) {
            // animationSection3Top 이전
            aniThirdInfoWrap.css({
                position: "absolute",
                top: "0",
                bottom: "unset",
            });
            aniThirdMainImg.css({
                position: "absolute",
                top: "0",
            });
            animationImgCont.eq(0).css({
                transform: "translateY(0%)",
            })
            animationImgCont.eq(1).css({
                transform: "translateY(100%)",
            })
            animationImgCont.eq(2).css({
                transform: "translateY(100%)",
            })
            animationImgCont.eq(3).css({
                transform: "translateY(100%)",
            })
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
                bottom: "0",
                top: "unset",
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
                $(".animationHeaderToc").removeClass("black");
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
                $(".animationHeaderToc").addClass("black");
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
                let progressRatio = aniFifthProgress / aniFifthSubSectionSize;
                let newWidth = `${30 + progressRatio * 20}%`; // Math.floor 제거
                let newHeight = `${30 + progressRatio * 70}%`; // Math.floor 제거


                console.log(progressRatio);
                if(progressRatio > 1){
                    newWidth = "50%";
                    newHeight = "100%";
                }
                animationSection5Video.css({
                    width: newWidth,
                    height: newHeight,
                });


            }else if (aniFifthProgress < aniFifthSubSectionSize * 2.1) {

                let progressRatio = Math.min(1, Math.max(0, (aniFifthProgress - aniFifthSubSectionSize) / aniFifthSubSectionSize));
                let newLeft = `${-100 * progressRatio}%`; // 소수점 그대로 유지
                let newOpacity = 1 - progressRatio; // 소수점 그대로 유지
                let newVideoWidth = `${50 + progressRatio * 50}%`; // Math.floor 제거

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
        const centralOffset = animation7Top;
        //const centralOffset = animation7Top + ((windowHeight - animationImgListHeight) / 3) ;
        const fixedTopValue = animation7Top - centralOffset ;
        const endPoint = animation7Top + animation7Height - animationInnerHeight - fixedTopValue;

        const totalImages = 6;
        const maxTransformValue = -(imageWidth * (totalImages - 1));

        if(scrollTop >= (animation7Top - (windowHeight / 2)) && scrollTop < endPoint){
            animation7Title.addClass("txtActiveOn");
        }else if(scrollTop < (animation7Top - (windowHeight / 2))){
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