"use client";

import { useRouter } from "next/navigation";
import { tutorialPageData, handleGo } from "@/app/componentes/components";
import React from "react";

export default function ComoJogar({ params }) {
  
  //React.use() para lidar com a Promise de params
  const { id } = React.use(params);
  //caminho de volta
  const router = useRouter();

  // Obtendo os dados correspondentes ao id da URL
  const tutorial = tutorialPageData.tutorial[id];

  return (
    <div className="h-screen flex flex-col items-center justify-start text-white bg-cover bg-center mt-16" style={{ backgroundImage: "url('/background.jpg')" }}>
      <h1 className="text-4xl font-bold mb-5">{tutorial.titulo}</h1>
      <p className="text-xl max-w-2xl text-center mb-10">
        {tutorial.descricao}
      </p>
      <button
        onClick={() => handleGo(router,"",`${id}`)}
        className="px-6 py-3 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
      >
        Voltar ao Menu
      </button>
    </div>
  );
}
