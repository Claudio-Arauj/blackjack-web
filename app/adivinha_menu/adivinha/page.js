"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [deckId, setDeckId] = useState(null);
  const [playerCard, setPlayerCard] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [roundResult, setRoundResult] = useState("");
  const [cardBackImage, setCardBackImage] = useState("https://deckofcardsapi.com/static/img/back.png"); // Verso da carta
  const [guessType, setGuessType] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [hasGuessed, setHasGuessed] = useState(false);

  const router = useRouter();

  const initializeGame = async () => {
    try {
      const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      setDeckId(response.data.deck_id);
      setPlayerCard(null);
      setPlayerScore(0);
      setGameOver(false);
      setRoundResult("");
      setCardBackImage("https://deckofcardsapi.com/static/img/back.png");
      setGuessType("");
      setIsFormVisible(false);
      setHasGuessed(false);
    } catch (error) {
      console.error("Erro ao criar baralho:", error);
    }
  };

  const drawCard = async () => {
    try {
      const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const drawnCard = response.data.cards[0];
      setPlayerCard(drawnCard);
      setCardBackImage("https://deckofcardsapi.com/static/img/back.png");
      setIsFormVisible(true);
      setHasGuessed(false);
    } catch (error) {
      console.error("Erro ao puxar carta:", error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!guessType) {
      alert("Erro! Por favor, selecione o naipe da carta.");
      return;
    }

    const cardType = playerCard.suit;

    if (guessType.toLowerCase() === cardType.toLowerCase()) {
      setPlayerScore((prevScore) => prevScore + 1);
      setRoundResult("Você acertou o naipe da carta! Você ganhou um ponto.");
    } else {
      setRoundResult(`Erro! O naipe correto era ${cardType}.`);
    }

    setCardBackImage(playerCard.image); // Revela a carta
    setHasGuessed(true);
    setIsFormVisible(false);
    setGameOver(true);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className="text-center p-5 text-white">
      <div>
        <div className="my-5">
          <h2 className="text-2xl font-semibold text-gold" style={{ textShadow: "3px 3px 6px #000000" }}>Jogador</h2>
          <div className="flex justify-center">
            <img src={cardBackImage} alt="Verso da Carta" className="w-32 h-auto mx-2" />
          </div>
          <p className="text-lg">Pontuação: {playerScore}</p>
        </div>

        <div className="my-5">
          <p className="text-xl">{roundResult}</p>

          {!gameOver ? (
            <button
              onClick={drawCard}
              className="mt-3 px-4 py-2 bg-gold text-dark rounded hover:bg-dark hover:text-gold transition"
            >
              Começar
            </button>
          ) : (
            <div className="flex justify-center gap-4">
              <button
                onClick={initializeGame}
                className="mt-3 px-4 py-2 bg-gold text-dark rounded hover:bg-dark hover:text-gold transition"
              >
                Tentar Novamente
              </button>
              <button
                onClick={() => router.push("/adivinha_menu")}
                className="mt-3 px-4 py-2 bg-gray-500 text-white rounded hover:bg-dark hover:text-gold transition"
              >
                Voltar ao Menu
              </button>
            </div>
          )}
        </div>

        {isFormVisible && !gameOver && (
          <div className="my-5 bg-gray-800 p-5 rounded shadow-lg">
            <form onSubmit={handleFormSubmit} className="text-gray-900">
              <div className="mb-3">
                <label htmlFor="cardType" className="block text-lg text-gray-100">Adivinhe o Naipe</label>
                <div className="flex justify-around mt-3">
                  {["HEARTS", "DIAMONDS", "CLUBS", "SPADES"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setGuessType(type)}
                      className={`px-3 py-1 bg-gray-700 text-white rounded ${guessType === type ? "bg-gold" : ""}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="mt-3 px-4 py-2 bg-gold text-dark rounded hover:bg-dark hover:text-gold transition"
              >
                Adivinhar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
