"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@/app/componentes/clientComponents";
import { starterDeck, drawCards } from "@/app/componentes/serverComponents";

export default function Home() {
  const [deckId, setDeckId] = useState(null);
  const [playerCard, setPlayerCard] = useState(null);
  const [computerCard, setComputerCard] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [roundResult, setRoundResult] = useState("");
  
  const navigation = useNavigation()

  const initializeGame = async () => {
    try {
      // Criar um novo baralho
      const response = await starterDeck();
      setDeckId(response.deck_id);
      setPlayerCard(null);
      setComputerCard(null);
      setPlayerScore(0);
      setComputerScore(0);
      setGameOver(false);
      setRoundResult("");
    } catch (error) {
      console.error("Erro ao criar baralho:", error);
    }
  };

  const draw = async () => {
    try {
      const response = await drawCards(deckId, 2);
      const drawnCards = response;
      const playerCard = drawnCards[0];
      const computerCard = drawnCards[1];

      setPlayerCard(playerCard);
      setComputerCard(computerCard);

      // Calcular os valores das cartas
      const playerCardValue = getCardValue(playerCard.value);
      const computerCardValue = getCardValue(computerCard.value);

      // Comparar as cartas
      if (playerCardValue > computerCardValue) {
        setPlayerScore(prevScore => prevScore + 1);
        setRoundResult("Você venceu esta rodada!");
      } else if (computerCardValue > playerCardValue) {
        setComputerScore(prevScore => prevScore + 1);
        setRoundResult("O computador venceu esta rodada!");
      } else {
        setRoundResult("Empate!");
      }

      if (playerScore + computerScore >= 5) { // Vamos terminar o jogo após 5 rodadas.
        setGameOver(true);
      }
    } catch (error) {
      console.error("Erro ao puxar cartas:", error);
    }
  };

  const getCardValue = (cardValue) => {
    if (cardValue === "KING") return 13;
    if (cardValue === "QUEEN") return 12;
    if (cardValue === "JACK") return 11;
    if (cardValue === "ACE") return 14;
    return parseInt(cardValue); // Para cartas numéricas (2-10)
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className="text-center p-5 text-white">
      {gameOver ? (
        <div>
          <h2 className="text-3xl font-semibold text-gold" style={{ textShadow: '3px 3px 6px #000000' }}>Jogo Acabado!</h2>
          <p className="text-xl">Vitórias Jogador: {playerScore} | Vitórias Computador: {computerScore}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={initializeGame}
              className="mt-3 px-4 py-2 bg-gold text-dark rounded hover:bg-dark hover:text-gold transition"
            >
              Jogar Novamente
            </button>
            <button
              onClick={() => navigation("","war")}
              className="mt-3 px-4 py-2 bg-gray-500 text-white rounded hover:bg-dark hover:text-gold transition"
            >
              Voltar ao Menu
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="my-5">
            <h2 className="text-2xl font-semibold text-gold" style={{ textShadow: '3px 3px 6px #000000' }}>Jogador</h2>
            <div className="flex justify-center">
              {playerCard && <img src={playerCard.image} alt="Carta do Jogador" className="w-32 h-auto mx-2" />}
            </div>
            <p className="text-lg">Pontuação: {playerScore}</p>
          </div>

          <div className="my-5">
            <h2 className="text-2xl font-semibold text-gold" style={{ textShadow: '3px 3px 6px #000000' }}>Computador</h2>
            <div className="flex justify-center">
              {computerCard && <img src={computerCard.image} alt="Carta do Computador" className="w-32 h-auto mx-2" />}
            </div>
            <p className="text-lg">Pontuação: {computerScore}</p>
          </div>

          <div className="my-5">
            <p className="text-xl">{roundResult}</p>
            <button
              onClick={draw}
              className="mt-3 px-4 py-2 bg-gold text-dark rounded hover:bg-dark hover:text-gold transition"
            >
              Comprar Carta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
