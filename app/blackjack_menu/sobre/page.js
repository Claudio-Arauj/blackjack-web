"use client";

import { useRouter } from "next/navigation";

export default function Sobre() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-start text-white bg-cover bg-center mt-16" style={{ backgroundImage: "url('/background.jpg')" }}>
      <h1 className="text-4xl font-bold mb-5">Sobre o Jogo</h1>
      <p className="text-xl max-w-2xl text-center mb-10">
        Este jogo de Blackjack foi desenvolvido como um projeto para praticar React e Next.js, utilizando a API de cartas para a mecânica do jogo.
      </p>
      <button
        onClick={() => router.push("/blackjack_menu")}
        className="px-6 py-3 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
      >
        Voltar ao Menu
      </button>
    </div>
  );
}
