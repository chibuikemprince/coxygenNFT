Here's a comprehensive user guide and documentation for the "Guess the Number" game codebase, explaining each part of the HTML, CSS, and JavaScript code. This guide will help you understand how the code was built from scratch and how it functions.

## User Guide for the "Guess the Number" Game using Lucid to interact with Cardano Wallet

### Overview

The "Guess the Number" game is a simple web application where users try to guess a randomly generated number between 1 and 100. The game provides feedback on whether the guess is too high or too low and offers hints using asterisks between the letters of the correct number in words. Additionally, users can recharge their attempts by interacting with a Cardano blockchain wallet.

### HTML Structure (index.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Guess the Number Game</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container">
      <h1>Guess the Number Game</h1>
      <p>
        I'm thinking of a number between 1 and 100. Can you guess what it is?
        You have a free try!
      </p>
      <input type="number" id="guessInput" placeholder="Enter your guess" />
      <button id="submitGuess">Submit Guess</button>
      <button id="recharge">Recharge Ticket</button>
      <div id="feedback"></div>
      <p id="attempts"></p>
      <p id="hint"></p>
    </div>
    <script src="env.js"></script>
    <script src="script.js" type="module"></script>
  </body>
</html>
```

#### Explanation of HTML Code

1. **Document Type Declaration**: `<!DOCTYPE html>` specifies that this document is an HTML5 document.
2. **HTML Tag**: `<html lang="en">` indicates the language of the document is English.
3. **Head Section**:
   - `<meta charset="UTF-8" />`: Sets the character encoding for the document to UTF-8.
   - `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`: Ensures the page is responsive on different devices.
   - `<title>Guess the Number Game</title>`: Sets the title of the webpage that appears in the browser tab.
   - `<link rel="stylesheet" href="styles.css" />`: Links the external CSS file for styling the webpage.
4. **Body Section**:
   - `<div class="container">`: A container for the game elements, providing structure and styling.
   - `<h1>`: Displays the main title of the game.
   - `<p>`: Provides instructions to the user.
   - `<input type="number" id="guessInput" placeholder="Enter your guess" />`: An input field for users to enter their guesses.
   - `<button id="submitGuess">Submit Guess</button>`: A button to submit the guess.
   - `<button id="recharge">Recharge Ticket</button>`: A button to recharge attempts.
   - `<div id="feedback"></div>`: A div to display feedback messages to the user.
   - `<p id="attempts"></p>`: A paragraph to show the number of attempts made.
   - `<p id="hint"></p>`: A paragraph to display hints.
5. **Scripts**:
   - `<script src="env.js"></script>`: Loads the environment configuration for blockchain interaction.
   - `<script src="script.js" type="module"></script>`: Loads the main JavaScript file for game logic.

### CSS Styling (styles.css)

```css
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
}

h1 {
  color: #333;
}

input {
  padding: 10px;
  width: 80%;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 10px 0;
}

button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

#feedback {
  margin-top: 20px;
  font-size: 18px;
  color: #333;
}

#attempts {
  margin-top: 10px;
  font-size: 16px;
}

#hint {
  margin-top: 10px;
  font-size: 16px;
  color: #007bff;
}
```

#### Explanation of CSS Code

1. **Body Styles**:
   - `font-family`: Sets the font for the entire page to Arial or a sans-serif fallback.
   - `background-color`: Sets a light gray background color.
   - `display`, `justify-content`, `align-items`, `height`, `margin`: Centers the container vertically and horizontally in the viewport.
2. **Container Styles**:

   - `background`: Sets a white background for the game container.
   - `border-radius`: Rounds the corners of the container.
   - `box-shadow`: Adds a subtle shadow effect for depth.
   - `padding`: Adds space inside the container.

3. **Heading Styles**:

   - `color`: Sets the color of the heading text.

4. **Input Field Styles**:

   - `padding`: Adds space inside the input field.
   - `width`: Sets the width of the input field to 80% of the container.
   - `border`, `border-radius`: Styles the border of the input field.

5. **Button Styles**:

   - `padding`: Adds space inside the buttons.
   - `background-color`: Sets the button color to green.
   - `color`: Sets the text color to white.
   - `border`, `border-radius`: Styles the button border.
   - `cursor`: Changes the cursor to a pointer when hovering over the button.
   - `button:hover`: Changes the background color when the button is hovered over.

6. **Feedback, Attempts, and Hint Styles**:
   - `margin-top`: Adds space above these elements.
   - `font-size`: Sets the font size for better readability.
   - `color`: Sets the text color for feedback and hints.

### JavaScript Logic (script.js)

Here's a detailed explanation of the JavaScript code used in the "Guess the Number" game. This section will break down the code line by line, explaining its purpose and functionality.

### JavaScript Code Breakdown (script.js)

```javascript
import { Lucid, Blockfrost } from "https://unpkg.com/lucid-cardano/web/mod.js";
```

- **Importing Libraries**: This line imports the `Lucid` and `Blockfrost` classes from the Lucid Cardano library. These classes are used for interacting with the Cardano blockchain, allowing the game to handle wallet connections and transactions.

```javascript
let randomNumber = Math.floor(Math.random() * 100) + 1;
```

- **Generating a Random Number**: This line generates a random integer between 1 and 100. `Math.random()` produces a floating-point number between 0 (inclusive) and 1 (exclusive). Multiplying by 100 gives a range from 0 to just below 100. `Math.floor()` rounds down to the nearest whole number, and adding 1 shifts the range to 1-100.

```javascript
let attempts = 0;
let retry = 1;
```

- **Initializing Variables**:
  - `attempts`: This variable tracks the number of guesses the user has made.
  - `retry`: This variable indicates whether the user has a free attempt (1 means they can guess, 0 means they need to recharge).

```javascript
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
```

- **Number Words Array**: This array contains the English words for numbers from 0 to 100. It is used to provide hints to the user by displaying the correct number in a word format.

```javascript
function createHint(word) {
  return word.split("").join("*");
}
```

- **Creating Hints**: This function takes a word (number in words) as input, splits it into individual characters, and joins them back together with asterisks (`*`) between each character. For example, "one" becomes "o*n*e". This hint format is displayed to the user to help them guess the number.

```javascript
document.getElementById("submitGuess").addEventListener("click", function () {
```

- **Event Listener for Guess Submission**: This line adds a click event listener to the "Submit Guess" button. When the button is clicked, the function defined within the listener will execute.

```javascript
const guessInput = document.getElementById("guessInput");
const guess = parseInt(guessInput.value);
const feedback = document.getElementById("feedback");
const attemptsText = document.getElementById("attempts");
const hintText = document.getElementById("hint");
```

- **Getting User Input and Elements**:
  - `guessInput`: Retrieves the input field where the user enters their guess.
  - `guess`: Converts the input value to an integer.
  - `feedback`, `attemptsText`, `hintText`: Retrieve the respective elements to display feedback, attempts, and hints.

```javascript
if (retry === 0) {
  feedback.textContent = "Please pay 4 ADA to get another chance to try again.";
  return;
}
```

- **Checking Retry Status**: If `retry` is 0, it means the user has exhausted their free attempts. The feedback message prompts them to recharge, and the function exits early using `return`.

```javascript
attempts++;
retry = 0;
```

- **Updating Attempt Count**: Increments the `attempts` variable by 1 and sets `retry` to 0, indicating that the user has used their free attempt.

```javascript
    if (isNaN(guess)) {
        feedback.textContent = "Please enter a valid number!";
        hintText.textContent = "";
    } else if (guess < 1 || guess > 100) {
        feedback.textContent = "Please guess a number between 1 and 100.";
        hintText.textContent = "";
```

- **Input Validation**:
  - Checks if the input is a valid number using `isNaN()`. If not, it displays an error message.
  - Checks if the guess is within the valid range (1 to 100). If not, it displays a corresponding message.

```javascript
    } else if (guess < randomNumber) {
        feedback.textContent = "Too low! Try again.";
        attemptsText.textContent = `Attempts: ${attempts}`;
        hintText.textContent = `Hint: ${createHint(numberWords[randomNumber])}`;
```

- **Guess Evaluation**:
  - If the guess is lower than the random number, it provides feedback indicating the guess was too low, updates the attempts count, and gives a hint using the `createHint` function.

```javascript
    } else if (guess > randomNumber) {
        feedback.textContent = "Too high! Try again.";
        attemptsText.textContent = `Attempts: ${attempts}`;
        hintText.textContent = `Hint: ${createHint(numberWords[randomNumber])}`;
```

- **Guess Evaluation (High)**: Similar to the previous block, but for guesses that are too high.

```javascript
    } else {
        feedback.textContent = `Congratulations! You've guessed the number ${randomNumber} in ${attempts} attempts.`;
        attemptsText.textContent = "";
        hintText.textContent = "";
        resetGame();
    }
});
```

- **Correct Guess Handling**: If the guess matches the random number, it congratulates the user, displays the number of attempts, clears the attempts and hint text, and calls the `resetGame()` function to start a new game.

```javascript
function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  document.getElementById("guessInput").value = "";
}
```

- **Resetting the Game**: This function resets the game state:
  - Generates a new random number.
  - Resets the attempts count to 0.
  - Clears the input field for the next guess.

```javascript
document.getElementById("recharge").addEventListener("click", recharge);
```

- **Recharge Button Event Listener**: This line adds a click event listener to the "Recharge Ticket" button, which calls the `recharge` function when clicked.

```javascript
async function recharge() {
    try {
        const lucid = await Lucid.new(
            new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", env.BLOCKFROST_PROJECT_ID),
            env.BLOCKFROST_NETWORK
        );
```

- **Recharge Function**: This asynchronous function handles the logic for recharging the user's attempts by interacting with the Cardano blockchain.
  - It creates a new instance of `Lucid` using the Blockfrost API for blockchain interaction.

```javascript
const api = await window.cardano.nami.enable(); // Assuming Nami wallet is used
await lucid.selectWallet(api);
```

- **Wallet Connection**: This code enables the Nami wallet and selects it for transactions.

```javascript
const walletAddress = await lucid.wallet.address();
console.log("Wallet Connected:", walletAddress);
```

- **Getting Wallet Address**: Retrieves the user's wallet address and logs it to the console for debugging.

```javascript
        const tx = await lucid
            .
```

s

```javascript
const tx = await lucid
  .newTx()
  .payToAddress(
    "addr_test1qq2f55vt3n3tpgj8lf95rt0c766w3dzq97hsj8gnvg6dx409lz0wlck7zc47f4u4drf84trj45mf656jmg8pqgjqxghs8z8sdv",
    { lovelace: 4000000n }
  )
  .complete();
```

- **Creating a Transaction**: This code creates a new transaction using the `lucid` instance.
  - `newTx()`: Initializes a new transaction.
  - `payToAddress(...)`: Specifies the recipient address and the amount of lovelace (4 ADA, which is 4,000,000 lovelace) to be sent. The address provided is a test address for the Cardano blockchain.
  - `complete()`: Finalizes the transaction setup.

```javascript
const signedTx = await tx.sign().complete();
```

- **Signing the Transaction**: This line signs the transaction with the user's wallet credentials.
  - `sign()`: Signs the transaction, ensuring that it is authorized by the wallet owner.
  - `complete()`: Finalizes the signing process.

```javascript
const txHash = await signedTx.submit();
console.log("Transaction submitted:", txHash);
```

- **Submitting the Transaction**: This code submits the signed transaction to the Cardano blockchain.
  - `submit()`: Sends the transaction to the network.
  - The transaction hash (`txHash`) is logged to the console for tracking purposes, allowing the developer to verify that the transaction was successfully submitted.

```javascript
    } catch (err) {
        alert("Wallet interaction error occurred, please refresh the page.");
    }
}
```

- **Error Handling**: This block catches any errors that occur during the recharge process. If an error is encountered (e.g., issues with wallet connection or transaction submission), an alert is displayed to the user, prompting them to refresh the page.

### Summary of JavaScript Functionality

1. **Game Initialization**: The game starts by generating a random number and initializing variables to track attempts and retry status.
2. **User Interaction**: The game listens for user input through button clicks, validating guesses and providing feedback based on the user's input.
3. **Hints and Feedback**: The game gives hints by displaying the correct number in a modified format (with asterisks) and tracks the number of attempts made by the user.
4. **Game Reset**: When the user guesses correctly, the game resets, allowing for a new round of guessing.
5. **Cardano Blockchain Interaction**: The recharge functionality allows users to interact with the Cardano blockchain, enabling them to pay for additional attempts through their wallet.

### Conclusion

This JavaScript code provides a complete interactive experience for the "Guess the Number" game, combining user input handling, game logic, and blockchain interaction. The modular structure of the code allows for easy maintenance and future enhancements, such as adding more features or improving the user interface. By understanding each part of the code, developers can modify and expand the game as needed.
