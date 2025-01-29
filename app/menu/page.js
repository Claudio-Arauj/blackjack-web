"use client";

import { useNavigation } from "../componentes/clientComponents";

export default function Menu() {
  const navigation = useNavigation()

  return (
    <div
      className="h-screen flex flex-col items-center justify-start text-white bg-cover bg-center mt-16"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div
        className="bg-gray-800 bg-opacity-90 p-10 rounded-lg shadow-lg border-4"
        style={{ borderColor: "#b8860b" }}
      >
        <h1
          className="text-5xl font-bold mb-10 text-center"
          style={{ textShadow: "3px 3px 6px #000000" }}
        >
          Escolha Um Jogo
        </h1>

        <div className="flex flex-col gap-5">
          <button
            onClick={() => navigation("", "blackjack")}
            className="px-8 py-4 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
          >
            Jogar Blackjack
          </button>
          <button
            onClick={() => navigation("", "war")}
            className="px-8 py-4 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
          >
            Jogar War
          </button>
          <button
            onClick={() => navigation("", "adivinha")}
            className="px-8 py-4 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
          >
            Jogar Advinhação
          </button>
          <button
            onClick={() => navigation("", "start")}
            className="px-6 py-3 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}
