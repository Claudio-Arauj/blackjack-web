"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Importa o useRouter para navegação
import { handleGo } from "@/app/componentes/components";

export default function Home() {
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [playerWins, setPlayerWins] = useState(0); 
  const [dealerWins, setDealerWins] = useState(0); 
  const [playerStopped, setPlayerStopped] = useState(false); 
  const [playerOver21, setPlayerOver21] = useState(false); 
  const [dealerOver21, setDealerOver21] = useState(false); 
  const [showSaveModal, setShowSaveModal] = useState(false); 
  const [playerName, setPlayerName] = useState(""); // Nome do jogador
  const [existingPlayerIndex, setExistingPlayerIndex] = useState(null); // Índice do jogador existente
  const router = useRouter(); 

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
      setPlayerOver21(true);
      setPlayerStopped(true); 
      handleDealerTurn(); 
    }
  };

  const handleDealerTurn = async () => {
    let updatedDealerCards = [...dealerCards];
    let newScore = dealerScore;

    while (newScore < 17) {
      const newCards = await drawCards(1);
      updatedDealerCards = [...updatedDealerCards, ...newCards];
      newScore = calculateScore(updatedDealerCards);
      setDealerCards(updatedDealerCards);
      setDealerScore(newScore);

      await new Promise((resolve) => setTimeout(resolve, 1000)); 
    }

    if (newScore > 21) {
      setDealerOver21(true);
    }

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
    handleDealerTurn(); 
  };

  const handleBackToMenu = () => {
    setShowSaveModal(true); // Exibe a modal para inserir o nome do jogador
  };

  const saveScore = () => {
    if (playerName) {
      const rankings = JSON.parse(localStorage.getItem("rankings")) || [];
  
      const existingPlayerIndex = rankings.findIndex(player => player.name === playerName);
  
      if (existingPlayerIndex !== -1) {
        // Se o jogador já existe, mostramos a modal de confirmação para sobrescrever
        setExistingPlayerIndex(existingPlayerIndex);
        setShowSaveModal(true); // Mostrar a modal de sobrescrever
      } else {
        rankings.push({ name: playerName, score: playerWins });
        rankings.sort((a, b) => b.score - a.score);
        localStorage.setItem("rankings", JSON.stringify(rankings));
        router.push("/blackjack_menu");
      }
    } else {
      alert("Por favor, insira um nome para salvar a pontuação.");
    }
  };

  const handleOverwriteScore = (overwrite) => {
    const rankings = JSON.parse(localStorage.getItem("rankings")) || [];
    
    if (overwrite) {
      rankings[existingPlayerIndex].score = playerWins;
    }

    rankings.sort((a, b) => b.score - a.score);
    localStorage.setItem("rankings", JSON.stringify(rankings));
    handleGo(router,"","blackjack")
    setShowSaveModal(false);
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

      {/* Modal de salvar ou sobrescrever pontuação */}
      {showSaveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-black p-5 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Salvar Pontuação</h3>
            <p className="mb-4">Digite seu nome para salvar a pontuação:</p>
            <input
              type="text"
              placeholder="Seu nome"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="p-2 border rounded mb-4 text-black bg-white"
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  saveScore();
                }}
                className="px-4 py-2 bg-gold text-dark rounded hover:bg-dark hover:text-gold"
              >
                Salvar
              </button>
              <button
                onClick={() => {
                  setShowSaveModal(false);
                  handleGo(router,"","blackjack");
                }}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
            {/* Pergunta se quer sobrescrever a pontuação existente */}
            {existingPlayerIndex !== null && (
              <div className="mt-4">
                <p className="text-red-500">Nome já existe. Deseja sobrescrever?</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleOverwriteScore(true)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Sobrescrever
                  </button>
                  <button
                    onClick={() => {
                      handleOverwriteScore(false),
                      handleGo(router,"","blackjack");
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
