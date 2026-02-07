import { Confetti } from "./confetti.js";
const confetti = new Confetti("confettiCanvas");
const button = document.getElementById("celebrateBtn");
let buttonCount = 0;
const cheersText = document.getElementById("cheers");
const questionSection = document.getElementById("questionSection");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

button.addEventListener("click", () => {
    const cheersTexts = ["Celebration Time!",
        "Whoop!",
        "Let's Celebrate!",
        "Cheers!",
        "Hooray!",
        "Cheers! 🎉",
        "🎉🎉🎉",
        "You're a party animal!",
        "Keep the party going!",
        "Dance Dance Dance!",
        "Woohoo!",
        "Shake your booty!",
        "Shake Shake Shake!",
        "Let's Get It!"
    ];
    const cheersButtonText = ["Celebrate Again!",
        "More Celebration!",
        "Keep Celebrating!",
        "Another Round!",
        "Celebrate More!",
        "Celebrate Even More!",
        "Whoop Whoop Whoop!",
        "Yay! More!",
        "🎉🎉🎉",
        "Confetti!"];
    const cheersExcessiveButtonText = [
        "🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉",
        "🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊",
        "Keep it coming!",
        "Non-stop celebration!",
        "Are you a party animal?",
        "Can't get enough of this!",
        "Celebration overload!",
        "You really like celebrating, huh?",
        "Okay, that's enough!",
        "Let's take a break with the confetti :)",
        "I think you've pressed it enough!",
        "Okay I'm warning you!",
        ">:("
    ];
    cheersText.innerText = cheersTexts[Math.floor(Math.random() * cheersTexts.length)];
    cheersText.classList.add("show");
    confetti.start();
    // Stop after .25 second (250 ms)
    button.disabled = true;
    const confettiDuration = 2500
    const fallDuraction = 3000
    setTimeout(() => {
        confetti.stop();
        setTimeout(() => {
            button.disabled = false;
            // Show the question section after confetti falls
            questionSection.classList.remove("hidden");
            setTimeout(() => {
                questionSection.classList.add("show");
            }, 50);
        }, fallDuraction);
    }, confettiDuration);
    

    buttonCount += 1;
    if (buttonCount > 5 && buttonCount <= 5 + cheersExcessiveButtonText.length) {
        button.textContent = cheersExcessiveButtonText[buttonCount - 6];
    } else if (buttonCount > 5 + cheersExcessiveButtonText.length) {
        button.disabled = true;
    } else {
        console.log(`Button clicked ${buttonCount} times`);
        button.textContent = cheersButtonText[Math.floor(Math.random() * cheersButtonText.length)];
    }
});

// Yes button - navigate to next page
yesBtn.addEventListener("click", () => {
    // Change this URL to your next page
    window.location.href = "valentines.html";
});

// No button - move away from cursor
noBtn.addEventListener("mousemove", (e) => {
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
        Math.pow(e.clientX - btnCenterX, 2) + 
        Math.pow(e.clientY - btnCenterY, 2)
    );
    
    // If mouse gets close, make button move away
    if (distance < 200) {
        const angle = Math.atan2(btnCenterY - e.clientY, btnCenterX - e.clientX);
        const moveDistance = 200 - distance;
        const newX = btnCenterX + Math.cos(angle) * moveDistance;
        const newY = btnCenterY + Math.sin(angle) * moveDistance;
        
        noBtn.style.position = "relative";
        noBtn.style.left = (newX - btnCenterX) + "px";
        noBtn.style.top = (newY - btnCenterY) + "px";
    }
});

// Also move away on click attempt
noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const randomX = (Math.random() - 0.23) * 300;
    const randomY = (Math.random() - 0.23) * 300;
    
    noBtn.style.position = "relative";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
});
