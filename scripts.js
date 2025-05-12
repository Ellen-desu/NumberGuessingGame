"use strict";

let min;
let max;
let attempt;
let secret_number;
let guess;

const input_min_error = document.getElementById("input-min-error");
const input_max_error = document.getElementById("input-max-error");
const input_attempt_error = document.getElementById("input-attempt-error");
const guess_failure = document.getElementById("guess-failure");

const attempt_remain = document.getElementById("attempt-remain");

const end_title = document.getElementById("end-title");
const end_feedback = document.getElementById("end-feedback");

document.getElementById("play").addEventListener("click", () => {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("config").classList.remove("hidden");
});

document.getElementById("save").addEventListener("click", () => {
    let isValid = true;
    
    min = Number(document.getElementById("input-min").value);
    max = Number(document.getElementById("input-max").value);
    attempt = Number(document.getElementById("input-attempt").value);
    
    if (min > max) {
        input_max_error.textContent = "Minimum value can't be greater athan maximum value";
        isValid = false;
        
    } if (min < 1) {
        input_min_error.textContent = "Minimum value must be at least 1";
        isValid = false;
        
    } if (max < 1) {
        input_max_error.textContent = "Maximum value must be at least 1";
        isValid = false;
        
    } if (attempt < 1) {
        input_attempt_error.textContent = "Attempt must be at least 1";
        isValid = false;
        
    } if (isValid) {
        secret_number = Math.floor(Math.random() * (max - min + 1)) + min;
        ;
        document.getElementById("in-game-subtitle").textContent = `Enter a number between ${min} - ${max}`;
        
        attempt_remain.textContent = `${attempt} attempt(s) remaining`;
        
        document.getElementById("config").classList.add("hidden");
        document.getElementById("in-game").classList.remove("hidden");
    }
});


document.querySelectorAll(".main-input").forEach((input) => {
    input.addEventListener("change", () => {
        document.querySelectorAll(".error").forEach((error) => {
            error.textContent = "";
        });
    });
});

document.getElementById("guess").addEventListener("click", () => {
    guess = Number(document.getElementById("input-guess").value)
    attempt--;
    
    if (attempt < 1 || guess === secret_number) {
        document.getElementById("in-game").classList.add("hidden");
        document.getElementById("end-game").classList.remove("hidden");
        
        if (guess === secret_number) {
            end_title.textContent = "Awesome!";
            end_feedback.textContent = `Awesome! You nailed it — the number was ${secret_number}.`;
            
        } else {
            end_title.textContent = "Oops!";
            end_feedback.textContent = `You're out of guesses. The number was ${secret_number}. Better luck next time!`;
        }
        
    } else if (guess < secret_number) {
        attempt_remain.textContent = `${attempt} attempt(s) remaining`;
        guess_failure.textContent = "Too low!";
        
    } else if (guess > secret_number) {
        attempt_remain.textContent = `${attempt} attempt(s) remaining`;
        guess_failure.textContent = "Too high!";
    }
});

document.getElementById("back").addEventListener("click", () => {
    window.location.href = window.location.pathname + '?reload=' + new Date().getTime();
});





    