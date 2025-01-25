"use client";

import { useRouter } from "next/navigation";

export default function Sobre() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-start text-white bg-cover bg-center mt-16" style={{ backgroundImage: "url('/background.jpg')" }}>
      <h1 className="text-4xl font-bold mb-5">Sobre o Jogo</h1>
      <p className="text-xl max-w-2xl text-center mb-10">
        O jogo de adivinhação de naipe é inspirado na simplicidade das cartas de baralho,
         que existem há séculos. Originado como uma forma de lazer e desafio de sorte,
          este jogo traz uma experiência descontraída e rápida, ideal para qualquer momento.
           Quantos acertos você consegue em sequência?
      </p>
      <button
        onClick={() => router.push("/adivinha_menu")}
        className="px-6 py-3 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
      >
        Voltar ao Menu
      </button>
    </div>
  );
}
