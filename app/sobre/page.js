"use client";

import { useRouter } from "next/navigation";

export default function Sobre() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-start text-white bg-cover bg-center mt-16" style={{ backgroundImage: "url('/background.jpg')" }}>
      <h1 className="text-4xl font-bold mb-5">Sobre O Projeto</h1>
      <p className="text-xl max-w-2xl text-center mb-10">
        Este projeto foi desenvolvido como parte da disciplina de Programação Web.
        O objetivo do projeto foi aplicar os conceitos aprendidos na disciplina.
        Os alunos responsáveis por este projeto são:

        Danilo Gabriel,
        Cláudio Pereira,
        Felipe Augusto.

        O projeto utiliza as tecnologias mais recentes em desenvolvimento web, incluindo React e Next.js.
        
      </p>
      <button
        onClick={() => router.push("/..")}
        className="px-6 py-3 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
      >
        Voltar ao Início
      </button>
    </div>
  );
}
