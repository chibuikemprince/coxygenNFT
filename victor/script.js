import { Lucid, Blockfrost } from "https://unpkg.com/lucid-cardano/web/mod.js";

let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let retry = 1;

const numberWords = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
  "twenty-one",
  "twenty-two",
  "twenty-three",
  "twenty-four",
  "twenty-five",
  "twenty-six",
  "twenty-seven",
  "twenty-eight",
  "twenty-nine",
  "thirty",
  "thirty-one",
  "thirty-two",
  "thirty-three",
  "thirty-four",
  "thirty-five",
  "thirty-six",
  "thirty-seven",
  "thirty-eight",
  "thirty-nine",
  "forty",
  "forty-one",
  "forty-two",
  "forty-three",
  "forty-four",
  "forty-five",
  "forty-six",
  "forty-seven",
  "forty-eight",
  "forty-nine",
  "fifty",
  "fifty-one",
  "fifty-two",
  "fifty-three",
  "fifty-four",
  "fifty-five",
  "fifty-six",
  "fifty-seven",
  "fifty-eight",
  "fifty-nine",
  "sixty",
  "sixty-one",
  "sixty-two",
  "sixty-three",
  "sixty-four",
  "sixty-five",
  "sixty-six",
  "sixty-seven",
  "sixty-eight",
  "sixty-nine",
  "seventy",
  "seventy-one",
  "seventy-two",
  "seventy-three",
  "seventy-four",
  "seventy-five",
  "seventy-six",
  "seventy-seven",
  "seventy-eight",
  "seventy-nine",
  "eighty",
  "eighty-one",
  "eighty-two",
  "eighty-three",
  "eighty-four",
  "eighty-five",
  "eighty-six",
  "eighty-seven",
  "eighty-eight",
  "eighty-nine",
  "ninety",
  "ninety-one",
  "ninety-two",
  "ninety-three",
  "ninety-four",
  "ninety-five",
  "ninety-six",
  "ninety-seven",
  "ninety-eight",
  "ninety-nine",
  "one hundred",
];

function createHint(word) {
  return word.split("").join("*");
}

document.getElementById("submitGuess").addEventListener("click", function () {
  const guessInput = document.getElementById("guessInput");
  const guess = parseInt(guessInput.value);
  const feedback = document.getElementById("feedback");
  const attemptsText = document.getElementById("attempts");
  const hintText = document.getElementById("hint");

  if (retry === 0) {
    feedback.textContent =
      "Please pay 4 ADA to get another chance to try again.";
    return;
  }

  attempts++;
  retry = 0;

  if (isNaN(guess)) {
    feedback.textContent = "Please enter a valid number!";
    hintText.textContent = "";
  } else if (guess < 1 || guess > 100) {
    feedback.textContent = "Please guess a number between 1 and 100.";
    hintText.textContent = "";
  } else if (guess < randomNumber) {
    feedback.textContent = "Too low! Try again.";
    attemptsText.textContent = `Attempts: ${attempts}`;
    hintText.textContent = `Hint: ${createHint(numberWords[randomNumber])}`;
  } else if (guess > randomNumber) {
    feedback.textContent = "Too high! Try again.";
    attemptsText.textContent = `Attempts: ${attempts}`;
    hintText.textContent = `Hint: ${createHint(numberWords[randomNumber])}`;
  } else {
    feedback.textContent = `Congratulations! You've guessed the number ${randomNumber} in ${attempts} attempts.`;
    attemptsText.textContent =
      "The game has been reset, kindly play again, for a new guess";
    hintText.textContent = "";
    resetGame();
  }
});

function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  retry = 1;
  document.getElementById("guessInput").value = "";
}

// Attach the recharge function to the button using an event listener
document.getElementById("recharge").addEventListener("click", recharge);

async function recharge() {
  try {
    const lucid = await Lucid.new(
      new Blockfrost(
        "https://cardano-preprod.blockfrost.io/api/v0",
        env.BLOCKFROST_PROJECT_ID
      ),
      env.BLOCKFROST_NETWORK
    );

    const api = await window.cardano.nami.enable(); // Assuming Nami wallet is used
    await lucid.selectWallet(api);

    const walletAddress = await lucid.wallet.address();
    console.log("Wallet Connected:", walletAddress);

    const tx = await lucid
      .newTx()
      .payToAddress(
        "addr_test1qq2f55vt3n3tpgj8lf95rt0c766w3dzq97hsj8gnvg6dx409lz0wlck7zc47f4u4drf84trj45mf656jmg8pqgjqxghs8z8sdv",
        { lovelace: 4000000n }
      )
      .complete();

    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();
    console.log("Transaction submitted:", txHash);
    retry += 1;
  } catch (err) {
    alert("Wallet interaction error occurred, please refresh the page.");
  }
}
