"use server"
import { pageData } from "./pageData";
import axios from "axios";
//função de navegação server side
// função que passa id
const getPathId = (idName) => {
  return pageData?.paths?.[idName] || null; // Verifica o tipo e o idName, retornando o valor ou null
};

// Função reutilizável para navegação server side
export async function handleServerNavigation(key, id) {
  const pathId = getPathId(id);
  
  // faz o caminho
  if (key === "") {
    return `/${pathId}`;
  } else {
    return `${key}/${pathId}`;
  }
}
//função de chamada à api deckofcards, pega um baralho e embaralha pra poder começar o joguin
export async function starterDeck() {
  try {
    const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    return response.data; // Retorna apenas o corpo da resposta, que é o que interessa
  } catch (err) {
    return { error: `Erro na requisição: ${err.message || err}` }; // Captura erro com mais detalhes
  }
}
//função de comprar carta chamando a api
export async function drawCards(deckId, count) {
  try {
    const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
    return response.data.cards;  // Retorna as cartas puxadas
  } catch (error) {
    console.error("Erro ao puxar cartas:", error);
    return [];  // Retorna um array vazio em caso de erro
  }
}
//função pra retornar o verso da carta:
export async function getCardBackImage() {
  try {
    // URL do verso da carta (pode ser alterado dinamicamente no futuro)
    const cardBackImage = "https://deckofcardsapi.com/static/img/back.png";
    return cardBackImage; // Retorna o URL da imagem
  } catch (error) {
    console.error("Erro ao pegar o verso da carta:", error);
    return { error: "Erro ao pegar o verso da carta" };
  }
}