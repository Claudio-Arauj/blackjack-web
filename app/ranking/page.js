"use client";

import { useEffect, useState } from "react";
import { useNavigation } from "../componentes/clientComponents";

export default function Ranking() {
  const [rankings, setRankings] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const savedRankings = JSON.parse(localStorage.getItem("rankings")) || [];
    setRankings(savedRankings);
  }, []);

  return (
    <div
      className="h-screen flex flex-col items-center justify-start text-white bg-cover bg-center mt-16"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div
        className="bg-gray-800 bg-opacity-90 p-10 rounded-lg shadow-lg border-4"
        style={{ borderColor: "#b8860b", width: "90%", maxWidth: "700px" }}
      >
        <h1
          className="text-3xl font-semibold text-center mb-5 text-gold"
          style={{ textShadow: "3px 3px 6px #000000" }}
        >
          Ranking de Vitórias
        </h1>
        <div className="overflow-auto">
          {rankings.length === 0 ? (
            <p className="text-xl text-center text-gold">Nenhum ranking registrado ainda.</p>
          ) : (
            <table className="table-auto w-full text-center border-collapse text-gold bg-dark rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gold text-dark text-lg font-semibold">
                  <th className="px-4 py-2 border border-gold">Nome</th>
                  <th className="px-4 py-2 border border-gold">Vitórias</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((player, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-opacity-90" : "bg-dark bg-opacity-75"
                    }
                  >
                    <td className="px-4 py-2 border border-gold">{player.name}</td>
                    <td className="px-4 py-2 border border-gold">{player.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <button
          onClick={() => navigation("", "blackjack")}
          className="px-6 py-3 bg-gold text-dark text-2xl rounded hover:bg-dark hover:text-gold transition mt-5 w-full"
        >
          Voltar ao Menu
        </button>
      </div>
    </div>
  );
}
