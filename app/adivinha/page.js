"use client";

import { useNavigation } from "../componentes/clientComponents";

export default function Menu() {
  const navigation = useNavigation();

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
          Escolha Uma Opção
        </h1>

        <div className="flex flex-col gap-5">
          <button
            onClick={() => navigation("adivinha", "adivinha")}
            className="px-8 py-4 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
          >
            Jogar Adivinha
          </button>
          <button
            onClick={() => navigation("como-jogar", "adivinha")}
            className="px-8 py-4 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
          >
            Como Jogar
          </button>
          <button
            onClick={() => navigation("sobre", "adivinha")}
            className="px-8 py-4 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
          >
            Sobre
          </button>
          <button
            onClick={() => navigation("", "menu")}
            className="px-6 py-3 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
          >
            Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
}
