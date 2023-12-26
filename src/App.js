// CSS
import "./App.css";

// REACT
import { useCallback, useEffect, useState } from "react";

// data
import { wordslist } from "./data/words";

// components
import { StartScreen } from "./components/StartScreen";
import { GameOver } from "./components/GamOver";
import { Game } from "./components/Game";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordslist);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3); // chances do usuário.
  const [score, setScore] = useState(0); //Pontuação.

  const pickWordAndCategory = useCallback(() => {
    // pegando uma categoria aleatória
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    console.log(category);

    // pegando palavra aleatoria
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);

    return { word, category };
  }, [words]);

  // INICIAR O JOGO
  const startGame = useCallback(() => {
    //irá limpar TUDO:
    clearLetterStates();

    // pegar palavra e categoria
    const { word, category } = pickWordAndCategory();
    // criar array de letas
    let wordLetters = word.split(""); //está fatiando a palavra ['C','a','s','a']

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(word, category);
    console.log(wordLetters);

    // Preencher os estatos
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // PROCESSAR LETRA DIGITADA PELO USUÁRIO
  const verifyLetter = (letter) => {
    //padronizando
    const normalizedLetter = letter.toLowerCase();

    //verficar se a letra já foi utilizada
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }
    //puxar as letras acertadas e as letras erradas
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]); //está complementando a lista de letras corretas
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]); //está complementando a lista de letras erradas
      // Essa linha de baixo, irá  reduzir o n° de tentativas.
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };
  // Irá limpar todos os campos, quando usuário for começar outro game.
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };
  // Monitora algum dado quando é alterado.
  useEffect(() => {
    if (guesses <= 0) {
      // resetar todos os estados
      clearLetterStates(); //limpa as letras
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // Verificando condição de VITORIA:
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]; //está criando um vetor, para receber as letras que são repetidas na palavra

    //condição de vitória:
    if (guessedLetters.length === uniqueLetters.length) {
      //adiciona pontos:
      setScore((actualScore) => (actualScore += 100));
      //reinicia o jogo com o novo record
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  // RESETAR O GAME
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        /> // esses pick, letters, guesse, ... vão fazer a ligação das informações
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
