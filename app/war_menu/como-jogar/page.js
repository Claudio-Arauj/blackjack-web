"use client";

import { useRouter } from "next/navigation";

export default function ComoJogar() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-start text-white bg-cover bg-center mt-16" style={{ backgroundImage: "url('/background.jpg')" }}>
      <h1 className="text-4xl font-bold mb-5">Como Jogar</h1>
      <p className="text-xl max-w-2xl text-center mb-10">
      O War é jogado entre dois jogadores com um baralho de 52 cartas.
       As cartas são embaralhadas e distribuídas igualmente entre os jogadores.
        Em cada rodada, ambos viram a carta do topo de seu monte,
         e quem tiver a carta de maior valor ganha um ponto.
          Em caso de empate (mesmo valor),
           ninguem ganha ponto. O jogo continua até que passe 6 rodadas, quem tiver mais ponto ganha
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
