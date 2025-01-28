"use client";

import { useRouter } from "next/navigation";
import { pageData } from "@/app/componentes/components";
import React from "react";

export default function Sobre({ params }) {
  // React.use() para lidar com a Promise de params
  const { id } = React.use(params);

  const router = useRouter();

  // Obtendo os dados correspondentes ao id da URL
  const sobre = pageData.sobre[id];

  return (
    <div
      className="h-screen flex flex-col items-center justify-start text-white bg-cover bg-center mt-16"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div
        className="bg-gray-800 bg-opacity-90 p-10 rounded-lg shadow-lg border-4"
        style={{ borderColor: "#b8860b" }}
      >
        <h1
          className="text-4xl font-bold mb-5 text-center"
          style={{ textShadow: "3px 3px 6px #000000" }}
        >
          {sobre.titulo}
        </h1>
        <p className="text-xl max-w-2xl text-center mb-10">{sobre.descricao}</p>
        <button
          onClick={() => router.push(sobre.path)}
          className="px-6 py-3 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}
