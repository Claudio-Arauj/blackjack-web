"use client";

import { useState, useEffect } from "react";
import { useNavigation } from "@/app/componentes/clientComponents";
import { getCardBackImage, starterDeck, drawCards } from "@/app/componentes/serverComponents";

export default function Home() {
  const [deckId, setDeckId] = useState(null);
  const [playerCard, setPlayerCard] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [roundResult, setRoundResult] = useState("");
  const [cardBackImage, setCardBackImage] = useState(null); // Verso da carta
  const [guessType, setGuessType] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [hasGuessed, setHasGuessed] = useState(false);

  const navigation = useNavigation()

  // Função para pegar o verso da carta
  const fetchCardBackImage = async () => {
    try {
      const imageUrl = await getCardBackImage(); // Chama a server action
      setCardBackImage(imageUrl); // Atualiza o estado com o URL do verso
    } catch (error) {
      console.error("Erro ao pegar o verso da carta:", error);
    }
  };

  const initializeGame = async () => {
    try {
      const response = await starterDeck();
      setDeckId(response.deck_id);
      setPlayerCard(null);
      setPlayerScore(0);
      setRoundResult("");
      fetchCardBackImage()
      setGuessType("");
      setIsFormVisible(false);
      setHasGuessed(false);
    } catch (error) {
      console.error("Erro ao criar baralho:", error);
    }
  };

  const draw = async () => {
    try {
      const response = await drawCards(deckId, 1);
      const drawnCard = response[0];
      setPlayerCard(drawnCard);
      fetchCardBackImage()
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
          {!isFormVisible && !hasGuessed && (
            <button
              onClick={draw}
              className="mt-3 px-4 py-2 bg-gold text-dark rounded hover:bg-dark hover:text-gold transition"
            >
              {playerCard ? "Continuar" : "Começar"}
            </button>
          )}

          {hasGuessed && (
            <div className="flex justify-center gap-4 mt-3">
              <button
                onClick={draw}
                className="mt-3 px-4 py-2 bg-gold text-dark rounded hover:bg-dark hover:text-gold transition"
              >
                Continuar
              </button>
              <button
                onClick={() => navigation("","adivinha")}
                className="mt-3 px-4 py-2 bg-gray-500 text-white rounded hover:bg-dark hover:text-gold transition"
              >
                Voltar ao Menu
              </button>
            </div>
          )}
        </div>

        {isFormVisible && !hasGuessed && (
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