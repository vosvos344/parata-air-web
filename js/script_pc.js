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
const scrollDelay = 800; // 📌 스크롤 처리 간격 (ms)

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
    const gradient = document.querySelector('#lineGradient');
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

        // images.forEach((image, i) => {
        //     gsap.fromTo(image,
        //         { y: 100, opacity: 0 },
        //         { y: 0, opacity: 1, duration: 1, delay: 0.9 + i * 0.3, ease: "power3.out" }
        //     );
        // });
    });
}

// 📌 휠 이벤트 리스너 추가
window.addEventListener("wheel", (event) => {
    if (!wheelEnabled || isScrolling) return;

    const currentSectionId = sectionIds[currentSectionIndex];
    if (currentSectionId === "animationSection3") {
        console.log("섹션 3부터는 휠 이벤트 비활성화");
        return;
    }

    const direction = event.deltaY > 0 ? 1 : -1;
    const currentSection = document.getElementById(currentSectionId);
    const nextSectionId = sectionIds[currentSectionIndex + 1];
    const nextSection = document.getElementById(nextSectionId);
    const section2 = document.getElementById("animationSection2");
    const sections = ["animateSec22Next", "animateSec23Next", "animateSec24Next", "animateSec25Next"];
    const activeClasses = sections.filter(cls => section2.classList.contains(cls));
    const nextIndex = activeClasses.length;

    if (direction > 0) {
        // 📌 힐 다운 - 다음 단계로 이동
        if (currentSubIndex < 8) {
            window.scrollTo(0, 0);
            currentSubIndex++;
            const currentClass = `animateHead${currentSectionIndex + 1}${currentSubIndex}Next`;
            const nextClass = `animateSec${currentSectionIndex + 2}${currentSubIndex - 1}Next`;
            const prevClass = `animateHead${currentSectionIndex + 1}${currentSubIndex}Prev`;
            // 📌 현재 섹션에 클래스 추가
            if (currentSectionIndex === 0 && currentSubIndex < 3){
                currentSection.classList.add(currentClass);
                currentSection.classList.add(prevClass);
                console.log(`섹션 ${currentSectionIndex + 1}에 ${currentClass} 추가`);
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
                            console.log("로고 확장 애니메이션 완료");
                        }
                    });
                }
            }

            if (nextSection && currentSubIndex >= 2 && nextSection && currentSubIndex < 7) {
                nextSection.classList.add(nextClass);
                console.log(`다음 섹션 ${currentSubIndex}에서 ${nextSection} 추가`);
            }

            if (nextSection && currentSubIndex === 7) {
                nextSection.classList.add(nextClass);
                nextSection.classList.add('nextSection3');
                currentSectionIndex = 2;
                setTimeout(() => {
                    document.body.style.overflow = "auto";
                },1000);
            }
            // 섹션2 fly new -> 서비스 제공
            // if (nextSection && currentSubIndex >= 3) {
            //     const nextStage = sections[nextIndex];
            //     section2.classList.add(nextStage);
            //     console.log(`✅ ${nextStage} 추가`);
            //     // section2.classList.add(sections[0]);
            //     // activeTimeouts.forEach(timeout => clearTimeout(timeout));
            //     // activeTimeouts = []
            //     // // 📌 남은 단계를 순차적으로 추가
            //     // sections.slice(nextIndex).forEach((stage, index) => {
            //     //     const timeout = setTimeout(() => {
            //     //         section2.classList.add(stage);
            //     //         console.log(`✅ ${stage} 추가`);
            //     //
            //     //         // 모든 단계가 추가되면 애니메이션 잠금 해제
            //     //         if (index === sections.length - nextIndex - 1) {
            //     //             isAnimating = false;
            //     //         }
            //     //     }, (index) * 1000); // 1초 간격
            //     //
            //     //     activeTimeouts.push(timeout);
            //     //
            //     // });
            // }
        }
    } else {
        // 📌 힐 업 - 이전 단계로 이동
        if (currentSubIndex > 0) {
            const currentClass = `animateHead${currentSectionIndex + 1}${currentSubIndex}Next`;
            const nextClass = `animateSec${currentSectionIndex + 2}${currentSubIndex - 1}Next`;

            // 📌 현재 섹션에서 클래스 제거
            console.log(`섹션 ${currentSectionIndex + 1}에서 ${currentClass} 제거`);

            // 📌 애니메이션 복원 (애니메이션 섹션 1)
            if (currentSectionIndex+1 === 1 && currentSubIndex === 1) {
                const logoAfterInner = document.querySelector(".animationLogoAfterInner");
                if (logoAfterInner) {
                    gsap.to(logoAfterInner, {
                        width: "133px",
                        duration:1,
                        ease: "linear",
                        onComplete: () => {
                            console.log("로고 축소 애니메이션 완료");
                            currentSection.classList.remove(currentClass);
                        }
                    });
                }
            }
            else{
                console.log(`섹션 ${currentSectionIndex + 1}에서 ${currentClass} 제거`);
                currentSection.classList.remove(currentClass);
            }

            // 📌 이전 섹션에서도 동시 제거
            if (nextSection && currentSubIndex >= 2 && nextSection && currentSubIndex < 7) {
                nextSection.classList.remove(nextClass);
                console.log(`다음 섹션 ${currentSubIndex}에서 ${nextSection} 제거`);
            }

            if (nextSection && currentSubIndex === 7) {
                nextSection.classList.remove(nextClass);
                nextSection.classList.remove('nextSection3');
                document.body.style.overflow = "hidden";
            }
            // 섹션2 서비스 제공 -> fly new
            // if (direction < 0 && nextIndex > 0) {
            //     const lastStage = sections[nextIndex - 1];
            //     section2.classList.remove(lastStage);
            //     console.log(`❌ ${lastStage} 제거`);
            //     // activeTimeouts.forEach(timeout => clearTimeout(timeout));
            //     // activeTimeouts = [];
            //     // for (let i = nextIndex - 1; i >= 0; i--) {
            //     //     sections.slice(0, nextIndex).reverse().forEach((cls, idx) => {
            //     //         setTimeout(() => {
            //     //             section2.classList.remove(cls);
            //     //             console.log(`섹션2 - ${cls} 제거`);
            //     //         }, idx * 1000); // 1초 간격
            //     //     });
            //     // }
            // }

            currentSubIndex--;
        }
    }

    // 📌 스크롤 잠금 (delay 적용)
    isScrolling = true;
    setTimeout(() => {
        isScrolling = false;
    }, scrollDelay);

    console.log(`현재 섹션: ${currentSectionIndex + 1}, 서브 인덱스: ${currentSubIndex}`);
});

// 📌 초기 상태 설정
let section3Activated = false;

// 📌 스크롤 이벤트 리스너
window.addEventListener("scroll", () => {
    const currentSectionId = sectionIds[currentSectionIndex];
    if (currentSectionId !== "animationSection3") {
        return;
    }

    const section3 = document.getElementById("animationSection3");
    const imgMain = document.querySelector("#animationSection3 .animationImgMain");
    const infoWrap = document.querySelector("#animationSection3 .animationInfoWrap");
    const infoText = document.querySelector("#animationSection3 .animationInfoWrap .animationInfo");

    const section3Top = section3.offsetTop;
    const section3Height = section3.offsetHeight;
    const scrollY = window.scrollY;

    if(scrollY === 0){
        currentSectionIndex = 0;
    }

    // 📌 섹션 3 시작점 (이미지 크기 전환 시작)
    const endTransition = section3Top + section3Height / 2;
    const transitionRange = endTransition - section3Top;

    if (scrollY >= section3Top) {
        const progress = (scrollY - section3Top) / transitionRange;
        const width = Math.max(50, 80 - (progress * 50));
        if(section3Activated) {return;}
        // 📌 이미지 이동
        imgMain.style.top = "0";
        imgMain.style.width = `${width}%`;
        imgMain.style.position = "fixed";
        if (width <= 50) {
            imgMain.style.left = `${Math.max(0, 50 - (progress * 100))}%`;
            imgMain.style.transform = `translateX(${Math.min(0, -50 + (progress * 100))}%)`;
            imgMain.style.width = "50%";
            infoWrap.style.opacity = 1;
            infoWrap.style.position = "fixed";

            setTimeout(() => {
                infoText.classList.add('activeOne');
            },100);
            section3Activated = true;
        }
    }

    if(!section3Activated) {return;}
    const imgContainers = document.querySelectorAll("#animationSection3 .animationImgCont");
    const infoSections = document.querySelectorAll("#animationSection3 .animationInfo");

    let currentImageIndex = 1;
    let currentProgress = 0;
    const scrollThreshold = 0.05;
    window.addEventListener("wheel", (event) => {
        const direction = event.deltaY > 0 ? 1 : -1;
        if (direction > 0) {
            if (currentProgress < 1) {
                currentProgress += scrollThreshold;
                if (currentProgress >= 1) {
                    currentProgress = 1;

                    // 📌 이미지가 완전히 0%에 도달했을 때 텍스트 활성화
                    if (currentImageIndex < infoSections.length) {
                        infoSections.forEach(section => section.classList.remove("activeOne"));
                        infoSections[currentImageIndex].classList.add("activeOne");
                    }
                }
                imgContainers[currentImageIndex].style.transform = `translateY(${(1 - currentProgress) * 100}%)`;
            } else if (currentImageIndex < imgContainers.length) {
                // 다음 이미지로 전환
                currentImageIndex++;
                currentProgress = 0;
                imgContainers[currentImageIndex].style.transform = `translateY(${(1 - currentProgress) * 100}%)`;
            }
        } else {
            // 📌 스크롤 업
            if (currentProgress > 0) {
                currentProgress -= scrollThreshold;
                if (currentProgress <= 0) {
                    currentProgress = 0;

                    // 📌 이미지가 완전히 100%로 돌아갔을 때 텍스트 비활성화
                    if (currentImageIndex < infoSections.length) {
                        infoSections[currentImageIndex].classList.remove("activeOne");
                    }
                }
                imgContainers[currentImageIndex].style.transform = `translateY(${(1 - currentProgress) * 100}%)`;
            } else if (currentImageIndex > 0) {
                // 이전 이미지로 전환
                currentImageIndex--;
                currentProgress = 1;
                imgContainers[currentImageIndex].style.transform = `translateY(${(1 - currentProgress) * 100}%)`;

                // 📌 이전 텍스트 비활성화
                if (currentImageIndex < infoSections.length) {
                    infoSections[currentImageIndex].classList.add("activeOne");
                }
            }
            if(currentImageIndex + 1 === 1){
                console.log('여길 타면 다시 시작?');
                section3Activated = false
            }
        }
        console.log('ee2',currentImageIndex + 1 === 1);
        console.log('ee',currentProgress.toFixed(2) === 1.00);
        console.log(`이미지 ${currentImageIndex + 1} 이동 중 (progress: ${currentProgress.toFixed(2)})`);

    });
});
