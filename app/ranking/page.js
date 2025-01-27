"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleGo } from "@/app/componentes/components";

export default function Ranking() {
  const [rankings, setRankings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Recuperar os rankings do localStorage
    const savedRankings = JSON.parse(localStorage.getItem("rankings")) || [];
    setRankings(savedRankings);
  }, []);

  return (
    <div className="text-center p-5 text-white">
      <h1 className="text-3xl font-semibold text-gold" style={{ textShadow: '3px 3px 6px #000000' }}>Ranking de Vitórias</h1>
      <div className="mt-5">
        {rankings.length === 0 ? (
          <p className="text-xl">Nenhum ranking registrado ainda.</p>
        ) : (
          <table className="mx-auto text-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Vitórias</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((player, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{player.name}</td>
                  <td className="px-4 py-2">{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button
        onClick={() => handleGo(router,"","blackjack")}
        className="px-6 py-3 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition"
      >
        Voltar ao Menu
      </button>
    </div>
  );
}