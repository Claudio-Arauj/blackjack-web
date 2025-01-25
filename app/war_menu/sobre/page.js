"use client";

import { useRouter } from "next/navigation";

export default function Sobre() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-start text-white bg-cover bg-center mt-16" style={{ backgroundImage: "url('/background.jpg')" }}>
      <h1 className="text-4xl font-bold mb-5">Sobre o Jogo</h1>
      <p className="text-xl max-w-2xl text-center mb-10">
      O jogo de War com cartas é uma variação de um conceito clássico de disputa de "maior valor" e tem suas raízes em jogos mais antigos,
       como "War" (semelhante ao jogo de tabuleiro). Uma curiosidade interessante é que, enquanto é jogado de maneira simples,
        o War pode envolver um pouco de sorte, já que não há muita estratégia envolvida — as cartas são jogadas de maneira aleatória.
         Por conta disso, o jogo é uma excelente opção para quem quer uma experiência rápida e sem muitas complicações.
          Ao contrário de muitos outros jogos de cartas, que exigem habilidades táticas mais refinadas,
           War é amplamente um jogo de sorte e paciência.
      </p>
      <button
        onClick={() => router.push("/war_menu")}
        className="px-6 py-3 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
      >
        Voltar ao Menu
      </button>
    </div>
  );
}
