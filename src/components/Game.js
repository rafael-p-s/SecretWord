import "./Game.css";
import { useState, useRef } from "react";
// useRef, ele cria uma refenrencia, que no caso será letterInputRef,
export const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);

    setLetter(""); //depois de enviado, irá limpar.

    letterInputRef.current.focus(); //está pegando a referencia criada e focando nela.
  };
  return (
    <>
      <div className="game">
        <p className="points">
          <span>Pontuação: {score}</span>
        </p>
        <h1>Advinhe a palavra:</h1>
        <h3 className="tip">
          Dica sobre a palavra: <span>{pickedCategory}.</span>
        </h3>
        <p>Você ainda tem {guesses} tentativa(s)</p>
        <div className="wordContainer">
          {letters.map((letter, i) =>
            guessedLetters.includes(letter) ? (
              <span key={i} className="letter">
                {letter}
              </span> //letra ok
            ) : (
              <span key={i} className="blankSquare"></span> //letra não existe
            )
          )}
        </div>
        <div className="letterContainer">
          <p>Tente advinhar uma letra da palavra:</p>
          <form onSubmit={handleSubmit}>
            <input
              action="text"
              name="letter"
              maxLength="1"
              required
              onChange={(e) => setLetter(e.target.value)}
              value={letter}
              ref={letterInputRef}
            />
            <button>Jogar</button>
          </form>
        </div>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {/* Irá exibir as letras que ja foram usadas */}
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter},</span>
        ))}
      </div>
    </>
  );
};
