let wheelEnabled = false;

// 📌 섹션 ID 목록
const sectionIds = [
    "animationSection1",
    "animationSection2",
    "animationSection3",
    "animationSection4",
    "animationSection5",
    "animationSection6",
    "animationSection7"
];

// 📌 현재 상태 저장
let currentSectionIndex = 0;
let currentSubIndex = 0;
let isScrolling = false;
const scrollDelay = 800; // 스크롤 처리 간격 (ms)
let currentImageIndex = 1; // 섹션 3 이미지

// 📌 페이지 로드 시 프로그레스 바 애니메이션 시작
window.addEventListener("load", function() {
    const duration = 5;
    const totalValue = 100;
    const progressActive = document.querySelector(".progressActive");
    const percentElement = document.querySelector(".percent");
    const progressContainer = document.getElementById("progress");

    // 📌 GSAP 애니메이션 (width 애니메이션)
    gsap.fromTo(progressActive,
        { width: "0%" },
        {
            width: "100%",
            duration: duration,
            ease: "linear",
            onComplete: () => {
                gsap.to(progressContainer, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        progressContainer.style.display = "none";
                        // ✅ 다음 애니메이션 시작
                        startNextAnimations();
                        // ✅ 휠 이벤트 활성화
                        wheelEnabled = true;
                    }
                });
            }
        }
    );

    // 📌 숫자 증가 로직
    let currentValue = 0;
    const updatePercent = () => {
        const progress = parseFloat(getComputedStyle(progressActive).width) / progressActive.parentElement.offsetWidth;
        const newValue = Math.min(totalValue, Math.floor(progress * totalValue));

        if (newValue !== currentValue) {
            currentValue = newValue;
            percentElement.textContent = currentValue.toString().padStart(3, "0");
        }

        if (currentValue < totalValue) {
            requestAnimationFrame(updatePercent);
        }
    };

    requestAnimationFrame(updatePercent);

});

// 📌 마우스 커서 효과
window.addEventListener("DOMContentLoaded", () => {
    const polyline = document.querySelector('.drawing_line_polyline');
    const circle = document.querySelector('.drawing_line_circle');
    const points = [];
    const totalPoints = 14;
    let debounceCounter = 0;
    let isMouseDown = false;

    const pointer = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        tx: window.innerWidth / 2,
        ty: window.innerHeight / 2,
        dist: 0,
        scale: 1,
        baseRadius: 12,
        clickedRadius: 8,
        speed: 0.15,
        updateCrds: function () {
            this.dist = Math.hypot(this.x - this.tx, this.y - this.ty);
            this.tx += (this.x - this.tx) * this.speed;
            this.ty += (this.y - this.ty) * this.speed;
            const targetRadius = isMouseDown ? this.clickedRadius : this.baseRadius;
            this.scale += (targetRadius - this.scale) * 0.15;
        },
        getRadius: function () {
            return this.scale;
        }
    };

    function drawLine() {
        pointer.updateCrds();
        points.push({ x: pointer.tx, y: pointer.ty });
        while (points.length > totalPoints) {
            points.shift();
        }
        polyline.setAttribute('points', points.map(point => `${point.x},${point.y}`).join(' '));
        circle.setAttribute('cx', pointer.tx);
        circle.setAttribute('cy', pointer.ty);
        circle.setAttribute('r', pointer.getRadius());

        if (debounceCounter > 0) {
            debounceCounter--;
            requestAnimationFrame(drawLine);
        }
    }

    window.addEventListener('mousemove', (e) => {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        debounceCounter = 12;
        drawLine();
    });

    window.addEventListener('mousedown', () => {
        isMouseDown = true;
        drawLine();
    });

    window.addEventListener('mouseup', () => {
        isMouseDown = false;
        drawLine();
    });
});

// 📌 다음 애니메이션 (GSAP 기본)
function startNextAnimations() {
    const sections = document.querySelectorAll(".animationSection");
    sections.forEach((section, index) => {
        const headers = section.querySelectorAll(".animationText h4");
        const paragraphs = section.querySelectorAll(".animationText p");
        const images = section.querySelectorAll(".animationImg img");

        headers.forEach((header, i) => {
            gsap.fromTo(header,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: i * 0.3, ease: "power3.out" }
            );
        });

        paragraphs.forEach((paragraph, i) => {
            gsap.fromTo(paragraph,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.6 + i * 0.3, ease: "power3.out" }
            );
        });
    });
}

// 📌 원스크롤 애니메이션
window.addEventListener("wheel", (event) => {
    if (!wheelEnabled || isScrolling) return;

    const direction = event.deltaY > 0 ? 1 : -1;
    const sectionTitle = document.querySelector('.sectionTitle');
    const sectionMenu = document.querySelectorAll('.sidebar-menu li');
    const currentSectionId = sectionIds[currentSectionIndex];
    const currentSection = document.getElementById(currentSectionId);
    const progressHeaderLine = document.querySelector('.progressHeaderLine');
    // 1 메인, 2 ~ 4 슬로건, 5 ~ 6 기업, 7 ~ 9 합리적 서비스, 10 ~ 11 서비스, 12 ~ 13 네이밍
    // 1 = 0, 2 ~ 7 = 1, 8 ~ 11 = 2, 12 ~ 13 = 3
    if (direction > 0) {
        // 📌 힐 다운 - 다음 단계로 이동
        if (currentSubIndex < 14) {
            currentSubIndex++;
            const currentClass = `animateHead${currentSectionIndex + 1}${currentSubIndex}Next`;
            const prevClass = `animateHead${currentSectionIndex + 1}${currentSubIndex}Prev`;
            const nextClass = `animateSec${currentSectionIndex + 1}${currentSubIndex - 1}Next`;

            // 타이틀 교체
            switch (currentSubIndex) {
                case 2:
                    document.querySelector('.animationHeaderOriginal').style.display = 'block';
                    sectionTitle.innerText = '01.브랜드 슬로건';
                    progressHeaderLine.style.width = '20%';
                    sectionMenu.forEach((item) => item.classList.remove('active'));
                    sectionMenu[0].classList.add('active');
                    break;
                case 5:
                    sectionTitle.innerText = '02.기업 철학';
                    progressHeaderLine.style.width = '40%';
                    sectionMenu.forEach((item) => item.classList.remove('active'));
                    sectionMenu[1].classList.add('active');
                    break;
                case 7:
                    sectionTitle.innerText = '03.합리적 서비스';
                    progressHeaderLine.style.width = '60%';
                    sectionMenu.forEach((item) => item.classList.remove('active'));
                    sectionMenu[2].classList.add('active');
                    break;
                case 10:
                    sectionTitle.classList.add('black');
                    sectionTitle.innerText = '04.진심 어린 서비스';
                    progressHeaderLine.style.width = '80%';
                    sectionMenu.forEach((item) => item.classList.remove('active'));
                    sectionMenu.forEach((item) => item.classList.add('black'));
                    sectionMenu[3].classList.add('active');
                    break;
                case 12:
                    sectionTitle.classList.remove('black');
                    sectionTitle.innerText = '05.브랜드 네이밍';
                    progressHeaderLine.style.width = '100%';
                    sectionMenu.forEach((item) => item.classList.remove('active'));
                    sectionMenu.forEach((item) => item.classList.remove('black'));
                    sectionMenu[4].classList.add('active');
                    break;
            }

            // 📌 섹션 1
            if (currentSectionIndex === 0 && currentSubIndex === 1) {
                console.log('로고가 여기가 아닌가?',);
                wheelEnabled = false;
                console.log('로고가 여기가 아닌가?',wheelEnabled);
                currentSection.classList.add(currentClass);
                currentSection.classList.add(prevClass);
                const logoAfterInner = document.querySelector(".animationLogoAfterInner");
                if (logoAfterInner) {
                    gsap.to(logoAfterInner, {
                        width: "580px",
                        duration: 1,
                        delay: 1, // 📌 3초 후 시작
                        ease: "linear",
                        onComplete: () => {
                            currentSectionIndex = 1;
                            wheelEnabled = true;
                        }
                    });
                }
            }

            // 섹션 2
            if (currentSectionIndex === 1 && currentSubIndex >= 2) {
                if(currentSubIndex === 2){
                    document.getElementById('animationSection1').classList.add('animateHead12Next');
                    document.getElementById('animationSection1').classList.add('animateHead12Prev');
                }
                currentSection.classList.add(nextClass);
            }

            if (currentSectionIndex === 1 && currentSubIndex === 7) {
                currentSection.classList.add(nextClass);
                currentSectionIndex = 2
            }

            // 섹션 3
            if (currentSectionIndex === 2 && currentSubIndex === 8) {
                wheelEnabled = false;
                currentSection.style.position = 'fixed';
                currentSection.style.zIndex = '98';
                currentSection.classList.add("animateSec31Next");

                // 약간의 지연 후 32 상태로 전환
                setTimeout(() => {
                    currentSection.classList.add("animateSec32Next");
                    const infoText = document.querySelector("#animationSection3 .animationInfoWrap .animationInfo");
                    infoText.classList.add('activeOne');
                    wheelEnabled = true;
                }, 1500);
            }

            if (currentSectionIndex === 2 && currentSubIndex > 8) {
                const imgContainers = document.querySelectorAll("#animationSection3 .animationImgCont");
                const infoSections = document.querySelectorAll("#animationSection3 .animationInfo");

                // 모든 info에서 activeOne 제거
                infoSections.forEach(section => section.classList.remove("activeOne"));

                // 현재 이미지 인덱스에 activeOne 추가
                if (currentImageIndex < infoSections.length) {
                    infoSections.forEach((container, index) => {
                        if (index === currentImageIndex) {
                            container.classList.add("activeOne");
                        } else {
                            container.classList.remove("activeOne");
                        }
                    });
                }

                // 이미지가 범위 내에 있을 때만 active 추가
                if (currentImageIndex < imgContainers.length) {
                    imgContainers.forEach((container, index) => {
                        if (index === currentImageIndex) {
                            container.classList.add("active");
                        } else {
                            container.classList.remove("active");
                        }
                    });
                    currentImageIndex++;
                }

                if(currentImageIndex === 4 && currentSubIndex === 11){
                    currentSectionIndex = 4;
                }
            }

            // 섹션 5
            if (currentImageIndex === 4 && currentSubIndex === 12) {
                wheelEnabled = false;
                currentSection.style.position = 'fixed';
                currentSection.style.zIndex = '98';
                currentSection.classList.add("animateSec51Next");
                setTimeout(() => {
                    currentSection.classList.add("animateSec52Next");
                    wheelEnabled = true;
                }, 1000)
            }
            if (currentImageIndex === 4 && currentSubIndex === 13) {
                wheelEnabled = false;
                currentSection.classList.add("animateSec53Next");
                setTimeout(() => {
                    currentSection.querySelector('.animationSectionLogo').classList.add('active');
                    currentSection.style.position = 'absolute';
                    document.body.style.overflow = "auto";
                    wheelEnabled = true;
                }, 500)
            }

        }
    } else {
        // 📌 힐 업 - 이전 단계로 이동
        if (currentSubIndex > 0) {
            // 타이틀 교체
            switch (currentSubIndex) {
                case 2:
                    document.querySelector('.animationHeaderOriginal').style.display = 'none';
                    document.querySelector('.animationHeaderOriginal').style.display = 'none';
                    progressHeaderLine.style.width = '0%';
                    break;
                case 5:
                    sectionTitle.innerText = '01.브랜드 슬로건';
                    progressHeaderLine.style.width = '20%';
                    sectionMenu.forEach((item) => item.classList.remove('active'));
                    sectionMenu[0].classList.add('active');
                    break;
                case 7:
                    sectionTitle.innerText = '02.기업 철학';
                    progressHeaderLine.style.width = '40%';
                    sectionMenu.forEach((item) => item.classList.remove('active'));
                    sectionMenu[1].classList.add('active');
                    break;
                case 10:
                    sectionTitle.classList.remove('black');
                    sectionTitle.innerText = '03.합리적 서비스';
                    progressHeaderLine.style.width = '60%';
                    sectionMenu.forEach((item) => item.classList.remove('active'));
                    sectionMenu.forEach((item) => item.classList.remove('black'));
                    sectionMenu[2].classList.add('active');
                    break;
                case 12:
                    sectionTitle.classList.add('black');
                    sectionTitle.innerText = '04.진심 어린 서비스';
                    progressHeaderLine.style.width = '80%';
                    sectionMenu.forEach((item) => item.classList.remove('active'));
                    sectionMenu.forEach((item) => item.classList.add('black'));
                    sectionMenu[3].classList.add('active');
                    break;
            }

            const currentClass = `animateHead${currentSectionIndex}${currentSubIndex}Next`;
            const nextClass = `animateSec${currentSectionIndex + 1}${currentSubIndex - 1}Next`;
            // 📌 애니메이션 시작 (애니메이션 섹션 1)
            if (currentSectionIndex === 1 && currentSubIndex === 1) {
                currentSectionIndex = 0;
                const logoAfterInner = document.querySelector(".animationLogoAfterInner");
                if (logoAfterInner) {
                    gsap.to(logoAfterInner, {
                        width: "133px",
                        duration: 1,
                        ease: "linear",
                        onComplete: () => {
                            document.getElementById('animationSection1').classList.remove('animateHead11Next');
                        }
                    });
                }
            }

            // 📌 섹션 2 -> 섹션 1
            if (currentSectionIndex === 1 && currentSubIndex >= 2) {
                if(currentSubIndex === 2){
                    document.getElementById('animationSection1').classList.remove('animateHead12Next');
                }
                currentSection.classList.remove(nextClass);
            }

            // 섹션 3 -> 섹션 2
            if (currentSectionIndex === 2 && currentSubIndex === 7) {
                document.getElementById('animationSection2').classList.remove('animateSec26Next');
                currentSectionIndex = 1;
            }

            if (currentSectionIndex === 2 && currentSubIndex === 8) {
                wheelEnabled = false;
                currentSection.classList.remove("animateSec32Next");
                const infoText = document.querySelector("#animationSection3 .animationInfoWrap .animationInfo");
                infoText.classList.remove('activeOne');

                // 약간의 지연 후 32 상태로 전환
                setTimeout(() => {
                    currentSection.classList.remove("animateSec31Next");
                    setTimeout(() => {
                        currentSection.style.position = 'absolute';
                        currentSection.style.zIndex = '1';
                        wheelEnabled = true;
                    },1500)
                }, 1500);
            }

            if(currentImageIndex === 4 && currentSubIndex === 11){
                currentSectionIndex = 2;
            }

            if (currentSectionIndex === 2 && currentSubIndex > 8) {
                const imgContainers = document.querySelectorAll("#animationSection3 .animationImgCont");
                const infoSections = document.querySelectorAll("#animationSection3 .animationInfo");
                //
                // 모든 info에서 activeOne 제거
                infoSections.forEach(section => section.classList.remove("activeOne"));

                // // 현재 이미지 인덱스에 activeOne 추가 (업)
                if (currentImageIndex > 0) {
                    // 현재 인덱스의 activeOne 제거
                    infoSections[currentImageIndex-1].classList.remove("activeOne");

                    // 이전 인덱스에 activeOne 추가
                    const prevIndex = currentImageIndex - 2;
                    infoSections[prevIndex].classList.add("activeOne");

                    // 이미지도 동일하게 처리
                    imgContainers[currentImageIndex-1].classList.remove("active");
                    imgContainers[prevIndex].classList.add("active");

                    // 인덱스 감소
                    currentImageIndex--;
                }
            }

            // 섹션 5
            if (currentImageIndex === 4 && currentSubIndex === 12) {
                wheelEnabled = false;
                currentSection.classList.remove("animateSec52Next");
                setTimeout(() => {
                    currentSection.classList.remove("animateSec51Next");
                    setTimeout(() => {
                        currentSection.style.position = 'relative';
                        currentSection.style.zIndex = '1';
                        wheelEnabled = true;
                    },1000)
                }, 1000)
            }

            if (currentImageIndex === 4 &&  currentSubIndex === 13) {
                wheelEnabled = false;
                currentSection.querySelector('.animationSectionLogo').classList.remove('active');
                currentSection.style.position = 'fixed';
                document.body.style.overflow = "hidden";
                setTimeout(() => {
                    currentSection.classList.remove("animateSec53Next");
                    wheelEnabled = true;
                }, 500)
            }
            // if (currentImageIndex === 4 && currentSubIndex === 14) {
            //     isScrolling = true;
            // }
            currentSubIndex--;
        }
    }

    // 📌 스크롤 잠금 (delay 적용)
    isScrolling = true;
    setTimeout(() => {
        isScrolling = false;
    }, scrollDelay);

    console.log(`현재 섹션: ${currentSectionIndex}, 서브 인덱스: ${currentSubIndex}`);
});

// 사이드 메뉴 선택
document.addEventListener("DOMContentLoaded", () => {
    const sectionMenuItems = document.querySelectorAll('.sidebar-menu li');
    const sections = document.querySelectorAll('.animationSection');
    const sectionTitles = [
        '01.브랜드 슬로건',
        '02.기업 철학',
        '03.합리적 서비스',
        '04.진심 어린 서비스',
        '05.브랜드 네이밍'
    ];
    const progressPercentages = [20, 40, 60, 80, 100];
    const currentSectionId = sectionIds[currentSectionIndex];
    const currentSection = document.getElementById(currentSectionId);
    const sectionTitle = document.querySelector('.sectionTitle');
    const progressHeaderLine = document.querySelector('.progressHeaderLine');

    sectionMenuItems.forEach((menuItem, index) => {
        menuItem.addEventListener('click', () => {
            // 섹션 2 초기화
            const animationSection2 = document.getElementById('animationSection2');
            animationSection2.classList.remove(
                'animateSec22Next', 'animateSec23Next',
                'animateSec24Next', 'animateSec25Next', 'animateSec26Next'
            );

            // 섹션 3 초기화
            const animationSection3 = document.getElementById('animationSection3');
            const imgContainers = document.querySelectorAll('#animationSection3 .animationImgCont');
            const infoSections = document.querySelectorAll('#animationSection3 .animationInfo');
            animationSection3.classList.remove('animateSec31Next', 'animateSec32Next');
            animationSection3.style.position = 'absolute';
            animationSection3.style.zIndex = '1';
            imgContainers.forEach(container => container.classList.remove('active'));
            infoSections.forEach(section => section.classList.remove('activeOne'));

            // 섹션 5 초기화
            const animationSection5 = document.getElementById('animationSection5');
            const animationSectionLogo = animationSection5.querySelector('.animationSectionLogo');
            animationSection5.classList.remove('animateSec51Next', 'animateSec52Next', 'animateSec53Next');
            animationSection5.style.position = 'relative';
            animationSection5.style.zIndex = '1';

            window.scrollTo({
                top: 0,
                behavior: 'smooth' // 부드럽게 이동
            });

            animationSectionLogo.classList.remove('active');
            document.body.style.overflow = 'hidden'; // 초기 스크롤 상태
            console.log('menuItem',menuItem);
            console.log('sections',sections);
            sectionMenuItems.forEach(item => item.classList.remove('black'));
            sectionMenuItems.forEach(item => item.classList.remove('active'));
            menuItem.classList.add('active');
            currentImageIndex = 1;
            sectionTitle.classList.remove('black');
            sectionTitle.innerText = sectionTitles[index];
            progressHeaderLine.style.width = `${progressPercentages[index]}%`;

            currentSectionIndex = [1, 1, 2, 2, 4][index];
            currentSubIndex = [2, 5, 7, 10, 12][index];

            if(currentSectionIndex === 1 && currentSubIndex === 2){
                currentSection.classList.add('animateSec21Next');
            }
            if(currentSectionIndex === 1 && currentSubIndex === 5){
                currentSection.classList.add('animateSec21Next');
                animationSection2.classList.add(
                    'animateSec22Next', 'animateSec23Next',
                    'animateSec24Next'
                );
            }
            if(currentSectionIndex === 2 && currentSubIndex === 7){
                currentSection.classList.add('animateSec21Next');
                animationSection2.classList.add(
                    'animateSec22Next', 'animateSec23Next',
                    'animateSec24Next','animateSec25Next',
                    'animateSec26Next'
                );
            }
            if(currentSectionIndex === 2 && currentSubIndex === 10){
                currentSection.classList.add('animateSec21Next');
                animationSection2.classList.add(
                    'animateSec22Next', 'animateSec23Next',
                    'animateSec24Next','animateSec25Next',
                    'animateSec26Next'
                );
                currentImageIndex = 3;
                animationSection3.classList.add('animateSec31Next', 'animateSec32Next');
                animationSection3.style.position = 'fixed';
                animationSection3.style.zIndex = '98';
                imgContainers[2].classList.add('active');
                infoSections[2].classList.add('activeOne');
                sectionMenuItems[3].classList.add('black');
                sectionTitle.classList.add('black');
            }
            if(currentSectionIndex === 4 && currentSubIndex === 12){
                currentImageIndex = 4;
                currentSection.classList.add('animateSec21Next');
                animationSection2.classList.add(
                    'animateSec22Next', 'animateSec23Next',
                    'animateSec24Next','animateSec25Next',
                    'animateSec26Next'
                );
                animationSection3.classList.add('animateSec31Next', 'animateSec32Next');
                animationSection3.style.position = 'fixed';
                animationSection3.style.zIndex = '98';
                imgContainers[2].classList.add('active');
                infoSections[2].classList.add('activeOne');
                animationSection5.classList.add('animateSec51Next');
                setTimeout(() => {
                    animationSection5.classList.add("animateSec52Next");
                }, 1000)
                animationSection5.style.position = 'fixed';
                animationSection5.style.zIndex = '98';
            }
        });
    });
});
