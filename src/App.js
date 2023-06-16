import { useState } from "react";

import './App.css';
import Timer from './components/Timer';
import Scoreboard from './components/Scoreboard'
import GuessInput from './components/GuessInput';
import WordDisplay from "./components/WordDisplay";
import voiceBox from "./utils/speak";

import writtenNumber from "written-number";

writtenNumber.defaults.lang = 'es';


const MAX_MAG = 4;
const MAX_SIG_FIGS = 3;


function App() {
  const [currentWord, setCurrentWord] = useState();
  const [currentNumber, setCurrentNumber] = useState();
  const [score, setScore] = useState();
  const [playing, setPlaying] = useState(false);
  
  const generateNumber =  () => {
    const magnitude = Math.ceil(MAX_MAG * Math.random());
    const sigFigs = Math.ceil(MAX_SIG_FIGS * Math.random());
    let number = Math.ceil(10**magnitude * Math.random());

    if (magnitude > sigFigs) {
      const modulus = 10 ** (magnitude - sigFigs);
      number = number - (number % modulus);
    }

    setCurrentNumber(number);
    setCurrentWord(writtenNumber(number))
    voiceBox.speak(writtenNumber(number));
}

  const startGame = () => {
    setPlaying(true);
    setScore(0);
    generateNumber();
  }

  const endGame = () => {
    setPlaying(false);
    setCurrentNumber();
    setCurrentWord();
  }

  const makeGuess = (guess) => {
    if (guess == currentNumber) {
      setScore(score + 1);
    }
    generateNumber();

  }

  return (
    <div className="App">
      <Timer onStart={startGame} onTimeout={endGame}/>
      <Scoreboard score={score}/>
      {playing && <div>
          <WordDisplay word={currentWord}/>
          <GuessInput onGuess={makeGuess}/>
        </div>
      }
    </div>
  );
}

export default App;