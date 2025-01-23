"use client";

import { useRouter } from "next/navigation";

export default function ComoJogar() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-start text-white bg-cover bg-center mt-16" style={{ backgroundImage: "url('/background.jpg')" }}>
      <h1 className="text-4xl font-bold mb-5">Como Jogar</h1>
      <p className="text-xl max-w-2xl text-center mb-10">
        O objetivo do Blackjack é alcançar uma pontuação o mais próximo possível de 21 sem ultrapassá-lo. Você pode comprar cartas ou parar a qualquer momento.
      </p>
      <button
        onClick={() => router.push("/..")}
        className="px-6 py-3 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
      >
        Voltar ao Menu
      </button>
    </div>
  );
}
