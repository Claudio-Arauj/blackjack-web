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
        Escolha Uma Opção
      </h1>
      <div className="flex flex-col gap-5">
        <button
          onClick={() => handleGo(router,"blackjack","blackjack")}
          className="px-8 py-4 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
        >
          Jogar Blackjack
        </button>
        <button
          onClick={() => handleGo(router,"","ranking")}
          className="px-8 py-4 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
        >
          Ranking
        </button>
        <button
          onClick={() => handleGo(router,"como-jogar","blackjack")}
          className="px-8 py-4 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
        >
          Como Jogar
        </button>
        <button
          onClick={() => handleGo(router,"sobre","blackjack")}
          className="px-8 py-4 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
        >
          Sobre
        </button>
        <button
            onClick={() => handleGo(router,"","menu")}
            className="px-6 py-3 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
        >
            Voltar ao Menu
        </button>
      </div>
    </div>
  );
}
