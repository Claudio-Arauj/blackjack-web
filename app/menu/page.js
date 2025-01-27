"use client";

import { useRouter } from "next/navigation";
import { handleGo } from "../componentes/components";

export default function Menu() {
  const router = useRouter();

  return (
    <div 
      className="h-screen flex flex-col items-center justify-start text-white bg-cover bg-center mt-16" 
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <h1 className="text-5xl font-bold mb-10" style={{ textShadow: '3px 3px 6px #000000' }}>
        Escolha Um Jogo
      </h1>
      <div className="flex flex-col gap-5">
        <button
          onClick={() => handleGo(router,"","blackjack")}
          className="px-8 py-4 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
        >
          Jogar Blackjack
        </button>
        <button
          onClick={() => handleGo(router,"","war")}
          className="px-8 py-4 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
        >
          Jogar War
        </button>
        <button
          onClick={() => handleGo(router,"","adivinha")}
          className="px-8 py-4 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
        >
          Jogar Advinhação
        </button>
        <button
            onClick={() => handleGo(router,"","start")}
            className="px-6 py-3 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
        >
            Voltar ao Início
        </button>
      </div>
    </div>
  );
}
