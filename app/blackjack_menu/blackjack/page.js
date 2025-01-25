"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Importa o useRouter para navegação

export default function Home() {
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [playerWins, setPlayerWins] = useState(0); // Contagem de vitórias do jogador
  const [dealerWins, setDealerWins] = useState(0); // Contagem de vitórias do dealer
  const [playerStopped, setPlayerStopped] = useState(false); // Flag para indicar se o jogador parou
  const [playerOver21, setPlayerOver21] = useState(false); // Flag para indicar se o jogador ultrapassou 21
  const [dealerOver21, setDealerOver21] = useState(false); // Flag para indicar se o dealer ultrapassou 21
  const router = useRouter(); // Inicializa o useRouter para navegação

  const initializeGame = async () => {
    try {
      const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      setDeckId(response.data.deck_id);
      setPlayerCards([]);
      setDealerCards([]);
      setPlayerScore(0);
      setDealerScore(0);
      setGameOver(false);
      setWinner("");
      setPlayerStopped(false);
      setPlayerOver21(false);
      setDealerOver21(false);
    } catch (error) {
      console.error("Erro ao criar baralho:", error);
    }
  };

  const drawCards = async (count) => {
    try {
      const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
      return response.data.cards;
    } catch (error) {
      console.error("Erro ao puxar cartas:", error);
      return [];
    }
  };

  const calculateScore = (cards) => {
    let score = 0;
    let aceCount = 0;

    cards.forEach((card) => {
      if (["KING", "QUEEN", "JACK"].includes(card.value)) {
        score += 10;
      } else if (card.value === "ACE") {
        aceCount += 1;
        score += 11;
      } else {
        score += parseInt(card.value);
      }
    });

    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount -= 1;
    }

    return score;
  };

  const handlePlayerTurn = async () => {
    const newCards = await drawCards(1);
    const updatedPlayerCards = [...playerCards, ...newCards];
    const newScore = calculateScore(updatedPlayerCards);

    setPlayerCards(updatedPlayerCards);
    setPlayerScore(newScore);

    if (newScore > 21 && !playerOver21) {
      // Jogador ultrapassa 21, mas não perde imediatamente
      setPlayerOver21(true);
      setPlayerStopped(true); // Jogador não pode mais jogar
      handleDealerTurn(); // Passa imediatamente para o dealer
    }
  };

  const handleDealerTurn = async () => {
    let updatedDealerCards = [...dealerCards];
    let newScore = dealerScore;

    // O dealer vai puxar cartas enquanto a pontuação for abaixo de 17
    while (newScore < 17) {
      const newCards = await drawCards(1);
      updatedDealerCards = [...updatedDealerCards, ...newCards];
      newScore = calculateScore(updatedDealerCards);
      setDealerCards(updatedDealerCards);
      setDealerScore(newScore);

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Atraso para animar a jogada
    }

    // Verifica se o dealer ultrapassou 21
    if (newScore > 21) {
      setDealerOver21(true);
    }

    // Agora verificar se o jogo acabou e decidir o vencedor
    if (playerOver21 && dealerOver21) {
      setWinner("Empate! Ambos ultrapassaram 21.");
    } else if (newScore > 21 || playerScore > newScore) {
      setWinner("Jogador venceu!");
      setPlayerWins(playerWins + 1);
    } else if (playerScore === newScore) {
      setWinner("Empate!");
    } else {
      setWinner("Dealer venceu!");
      setDealerWins(dealerWins + 1);
    }

    setGameOver(true);
  };

  const handlePlayerStop = () => {
    setPlayerStopped(true);
    handleDealerTurn(); // Chama a vez do dealer depois que o jogador parar
  };

  const handleBackToMenu = () => {
    router.push("/blackjack_menu"); // Navega de volta para a página inicial
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className="text-center p-5 text-white">
      {!deckId ? (
        <p className="text-xl" style={{ textShadow: '3px 3px 6px #000000' }}>Carregando baralho...</p>
      ) : gameOver ? (
        <div>
          <h2 className="text-3xl font-semibold text-gold" style={{ textShadow: '3px 3px 6px #000000' }}>{winner}</h2>
          <p className="text-xl">Vitórias Jogador: {playerWins} | Vitórias Dealer: {dealerWins}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={initializeGame}
              className="mt-3 px-4 py-2 bg-gold text-dark rounded hover:bg-dark hover:text-gold transition"
            >
              Jogar Novamente
            </button>
            
            <button
              onClick={handleBackToMenu}
              className="mt-3 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
            >
              Voltar para o Menu
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="my-5">
            <h2 className="text-2xl font-semibold text-gold" style={{ textShadow: '3px 3px 6px #000000' }}>Jogador</h2>
            <div className="flex justify-center gap-3 my-3">
              {playerCards.map((card, index) => (
                <img key={index} src={card.image} alt="" className="w-20 h-auto" />
              ))}
            </div>
            <p className="text-lg">Pontuação: {playerScore}</p>
            {playerOver21 && (
              <p className="text-red-500 text-lg">Você ultrapassou 21!</p>
            )}
            <button
              onClick={handlePlayerTurn}
              className="mt-3 mr-3 px-4 py-2 bg-gold text-dark rounded hover:bg-dark hover:text-gold transition"
              disabled={playerStopped}
            >
              Comprar Carta
            </button>
            <button
              onClick={handlePlayerStop}
              className="mt-3 px-4 py-2 bg-gold text-dark rounded hover:bg-dark hover:text-gold transition"
              disabled={playerStopped || playerOver21}
            >
              Parar
            </button>
          </div>

          <div className="my-5">
            <h2 className="text-2xl font-semibold text-gold" style={{ textShadow: '3px 3px 6px #000000' }}>Dealer</h2>
            <div className="flex justify-center gap-3 my-3">
              {dealerCards.map((card, index) => (
                <img key={index} src={card.image} alt="" className="w-20 h-auto" />
              ))}
            </div>
            <p className="text-lg">Pontuação: {dealerScore}</p>
          </div>
        </div>
      )}
    </div>
  );
}