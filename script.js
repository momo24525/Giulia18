
const envelope = document.querySelector("#envelope");
const letter = envelope.querySelector(".letter");
const flap = envelope.querySelector(".envelope-flap");
const scrollSpace = document.querySelector(".scroll-space");


function updateLetter() {
    const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollY = window.scrollY;

    const progress = Math.min(
        Math.max(scrollY / maxScroll, 0),
        1
    );

    // Fase 1: apertura della linguetta
    const flapProgress = Math.min(progress / 0.3, 1);
    const flapAngle = 180 * flapProgress;

    flap.style.transform = `rotateX(${-flapAngle}deg)`;

    // Quando è aperta, la linguetta passa dietro al foglio
    flap.style.zIndex = flapProgress >= 1 ? "1" : "5";

    // Fase 2: uscita graduale della lettera
    const letterProgress = Math.min(
        Math.max((progress - 0.3) / 0.7, 0),
        1
    );

    const distance = 370;
    const translateY = -distance * letterProgress;

    letter.style.transform = `translateY(${translateY}px)`;

    // Il foglio resta dietro al davanti della busta
    letter.style.zIndex = "3";
}

window.addEventListener("scroll", updateLetter, {
    passive: true
});

window.addEventListener("resize", updateLetter);

updateLetter();
