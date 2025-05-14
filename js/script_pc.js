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
    const currentSectionId = sectionIds[currentSectionIndex];
    const currentSection = document.getElementById(currentSectionId);

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
            if(currentSubIndex === 2){
                document.querySelector('.animationHeaderOriginal').style.display = 'block'
                sectionTitle.innerText = '01.브랜드 슬로건';
            }
            if(currentSubIndex === 5){
                sectionTitle.innerText = '02.기업 철학';
            }
            if(currentSubIndex === 7){
                sectionTitle.innerText = '03.합리적 서비스';
            }
            if(currentSubIndex === 10){
                sectionTitle.innerText = '04.진심 어린 서비스';
            }
            if(currentSubIndex === 12){
                sectionTitle.innerText = '05.브랜드 네이밍';
            }

            // 📌 섹션 1
            if (currentSectionIndex === 0 && currentSubIndex < 3){
                currentSection.classList.add(currentClass);
                currentSection.classList.add(prevClass);
            }

            // 📌 애니메이션 시작 (애니메이션 섹션 1)
            if (currentSectionIndex === 0 && currentSubIndex === 1) {
                const logoAfterInner = document.querySelector(".animationLogoAfterInner");
                if (logoAfterInner) {
                    gsap.to(logoAfterInner, {
                        width: "580px",
                        duration: 1,
                        delay: 1, // 📌 3초 후 시작
                        ease: "linear",
                        onComplete: () => {
                            currentSectionIndex = 1;
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
                currentSection.style.position = 'fixed';
                currentSection.style.zIndex = '99';
                currentSection.classList.add("animateSec31Next");

                // 약간의 지연 후 32 상태로 전환
                setTimeout(() => {
                    currentSection.classList.add("animateSec32Next");
                    const infoText = document.querySelector("#animationSection3 .animationInfoWrap .animationInfo");
                    infoText.classList.add('activeOne');
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
                currentSection.style.position = 'fixed';
                currentSection.style.zIndex = '99';
                currentSection.classList.add("animateSec51Next");
                setTimeout(() => {
                    currentSection.classList.add("animateSec52Next");
                }, 1000)
            }
            if (currentImageIndex === 4 && currentSubIndex === 13) {
                currentSection.classList.add("animateSec53Next");
                setTimeout(() => {
                    currentSection.querySelector('.animationSectionLogo').classList.add('active');
                    currentSection.style.position = 'absolute';
                    document.body.style.overflow = "auto";
                }, 500)
            }

        }
    } else {
        // 📌 힐 업 - 이전 단계로 이동
        if (currentSubIndex > 0) {
            // 타이틀 교체
            if(currentSubIndex === 1){
                document.querySelector('.animationHeaderOriginal').style.display = 'none'
            }
            if(currentSubIndex === 4){
                sectionTitle.innerText = '01.브랜드 슬로건';
            }
            if(currentSubIndex === 6){
                sectionTitle.innerText = '02.기업 철학';
            }
            if(currentSubIndex === 9){
                sectionTitle.innerText = '03.합리적 서비스';
            }
            if(currentSubIndex === 11){
                sectionTitle.innerText = '04.진심 어린 서비스';
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
                currentSection.classList.remove("animateSec32Next");
                const infoText = document.querySelector("#animationSection3 .animationInfoWrap .animationInfo");
                infoText.classList.remove('activeOne');

                // 약간의 지연 후 32 상태로 전환
                setTimeout(() => {
                    currentSection.classList.remove("animateSec31Next");
                    setTimeout(() => {
                        currentSection.style.position = 'absolute';
                        currentSection.style.zIndex = '1';
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
                currentSection.classList.remove("animateSec52Next");
                setTimeout(() => {
                    currentSection.classList.remove("animateSec51Next");
                    setTimeout(() => {
                        currentSection.style.position = 'relative';
                        currentSection.style.zIndex = '1';
                    },1000)
                }, 1000)
            }

            if (currentImageIndex === 4 &&  currentSubIndex === 13) {
                currentSection.querySelector('.animationSectionLogo').classList.remove('active');
                currentSection.style.position = 'fixed';
                document.body.style.overflow = "hidden";
                setTimeout(() => {
                    currentSection.classList.remove("animateSec53Next");
                }, 500)
            }
            if (currentImageIndex === 4 && currentSubIndex === 14) {
                isScrolling = true;
            }
            currentSubIndex--;
        }
    }

    // 📌 스크롤 잠금 (delay 적용)
    isScrolling = true;
    setTimeout(() => {
        isScrolling = false;
    }, scrollDelay);
});
