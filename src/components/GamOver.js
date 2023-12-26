import "./GameOver.css";

export const GameOver = ({ retry,score }) => {
  return (
    <div>
      <h1>Game Over</h1>
      <h2>Sua pontuação foi: <span>{score}</span></h2>
      <button onClick={retry}>Resetar Jogo</button>
    </div>
  );
};
