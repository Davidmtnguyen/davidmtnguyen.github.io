import { Confetti } from "./confetti.js";
const confetti = new Confetti("confettiCanvas");
const button = document.getElementById("celebrateBtn");
let buttonCount = 0;
const cheersText = document.getElementById("cheers");

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
    const fallDuraction = 2500
    setTimeout(() => {
        confetti.stop();
        setTimeout(() => {
            button.disabled = false;;
        }, fallDuraction);
    }, confettiDuration);
    

    buttonCount += 1;
    if (buttonCount > 10 && buttonCount <= 10 + cheersExcessiveButtonText.length) {
        button.textContent = cheersExcessiveButtonText[buttonCount - 11];
    } else if (buttonCount > 10 + cheersExcessiveButtonText.length) {
        button.disabled = true;
    } else {
        console.log(`Button clicked ${buttonCount} times`);
        button.textContent = cheersButtonText[Math.floor(Math.random() * cheersButtonText.length)];
    }
});
