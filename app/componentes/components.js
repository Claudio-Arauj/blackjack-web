// dados para guiar os router
export const pageData = {
  paths: {
    start: `..`,
    menu: `menu`,
    projeto: `projeto`,
    blackjack: `blackjack`,
    adivinha: `adivinha`,
    war: `war`,
  },

  // dados para construir a página sobre
  sobre: {
    projeto: {
      titulo: "Sobre o Projeto",
      descricao: 
        `Este projeto foi desenvolvido como parte da disciplina de Programação Web. 
        O objetivo do projeto foi aplicar os conceitos aprendidos na disciplina. 
        Os alunos responsáveis por este projeto são:
        Danilo Gabriel, Cláudio Pereira, Felipe Augusto.
        O projeto utiliza as tecnologias mais recentes em desenvolvimento web, incluindo React e Next.js.`,
      path: "/..",
    },
    blackjack: {
      titulo: "Sobre o Jogo BlackJack",
      descricao: 
        `Este jogo de Blackjack foi desenvolvido como um projeto para praticar React e Next.js, 
        utilizando a API de cartas para a mecânica do jogo.`,
      path: "/blackjack",
    },
    adivinha: {
      titulo: "Sobre o Jogo Adivinhe o Naipe",
      descricao: 
        `O jogo de adivinhação de naipe é inspirado na simplicidade das cartas de baralho, 
        que existem há séculos. Originado como uma forma de lazer e desafio de sorte, 
        este jogo traz uma experiência descontraída e rápida, ideal para qualquer momento.`,
      path: "/adivinha",
    },
    war: {
      titulo: "Sobre o Jogo War",
      descricao: 
        `O jogo de War com cartas é uma variação de um conceito clássico de disputa de "maior valor" 
        e tem suas raízes em jogos mais antigos, como "War" (semelhante ao jogo de tabuleiro). 
        Uma curiosidade interessante é que, enquanto é jogado de maneira simples, 
        o War pode envolver um pouco de sorte, já que não há muita estratégia envolvida — as cartas são jogadas de maneira aleatória.`,
      path: "/war",
    },
  },

  // dados para construir a página como_jogar
  tutorial: {
    blackjack: {
      titulo: "Como Jogar BlackJack",
      descricao: 
        `O objetivo do Blackjack é alcançar uma pontuação o mais próximo possível de 21 sem ultrapassá-lo. 
        Você pode comprar cartas ou parar a qualquer momento.`,
      path: "/blackjack_menu",
    },
    adivinha: {
      titulo: "Como Jogar Adivinhe o Naipe",
      descricao: 
        `Neste jogo, você deve adivinhar o naipe (♠️ SPADES, ♥️ HEARTS, ♦️ DIAMONDS, ♣️ CLUBS) 
        da próxima carta sorteada. A cada rodada, escolha um naipe e veja se acertou.`,
      path: "/adivinha_menu",
    },
    war: {
      titulo: "Como Jogar War",
      descricao: 
        `O War é jogado entre dois jogadores com um baralho de 52 cartas. As cartas são embaralhadas e distribuídas igualmente entre os jogadores. 
        Em cada rodada, ambos viram a carta do topo de seu monte, e quem tiver a carta de maior valor ganha um ponto. 
        Em caso de empate (mesmo valor), ninguém ganha ponto. O jogo continua até que passe 6 rodadas.`,
      path: "/war_menu",
    },
  },
};

// função que passa id
export const getPathId = (idName) => {
  return pageData?.paths?.[idName] || null; // Verifica o tipo e o idName, retornando o valor ou null
};

// Função reutilizável para navegação
// recebe o router, a direção (ir ou voltar) a key (nome do diretorio) e o id (diretorio final)
export const handleGo = (router, key, id) => {
  const pathId = getPathId(id); // Obtém o id real usando o método getPathId
  if (key === "") {
    router.push(`/${pathId}`); // Navega para a página com o id
  } else if (key !== "") {
    router.push(`${key}/${pathId}`); // Navega para a página da key com o id
  }
};
