"use client";

import { useRouter } from "next/navigation";

export default function ComoJogar() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-start text-white bg-cover bg-center mt-16" style={{ backgroundImage: "url('/background.jpg')" }}>
      <h1 className="text-4xl font-bold mb-5">Como Jogar Adivinhe o Naipe</h1>
      <p className="text-xl max-w-2xl text-center mb-10">
        Neste jogo, você deve adivinhar o naipe (♠️ SPADES, ♥️ HEARTS, ♦️ DIAMONDS, ♣️ CLUBS) da próxima carta sorteada.
         A cada rodada, escolha um naipe e veja se acertou. Divirta-se testando sua sorte e intuição!
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
