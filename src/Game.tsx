import React, { useState } from 'react';

function generateRandomNumber(): number {
    return Math.floor(Math.random() * 100) + 1;
}

function Game(): JSX.Element {
    const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState(10);
    const [outcome, setOutcome] = useState('');

    function handleGuessChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setGuess(event.target.value);
    }

    function handleGuessSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const guessNumber = parseInt(guess);
        setGuess('');

        if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
            setOutcome('Please enter a valid number between 1 and 100');
        } else if (guessNumber === randomNumber) {
            setOutcome('You win!');
        } else if (guessNumber > randomNumber) {
            setOutcome('Too high!');
        } else {
            setOutcome('Too low!');
        }

        setAttempts((prevAttempts) => prevAttempts - 1);
    }

    function handlePlayAgain(): void {
        setRandomNumber(generateRandomNumber());
        setGuess('');
        setAttempts(10);
        setOutcome('');
    }

    return (
        <div className="game">
            <h1>Number Game</h1>
            <h2>Guess the Number</h2>
            <p style={{ color: "red" }}>{outcome}</p>
            <form onSubmit={handleGuessSubmit}>
                <input type="text" style={{ width: 250 }} value={guess} onChange={handleGuessChange} />
                <div style={{ marginTop: 10 }}>
                    <button type="submit">Guess</button>
                    <button style={{ marginLeft: 10 }} onClick={handlePlayAgain}>Play Again</button>
                </div>
            </form>
            <p>{attempts} attempts remaining</p>

        </div>
    );
}

export default Game