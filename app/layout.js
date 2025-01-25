import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BlackJack",
  description: "Jogo de cartas interativo, estilo Blackjack.",
};

// Layout raiz
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        style={{
          backgroundImage: "url('https://www.acquagreen.com.br/wp-content/uploads/2016/08/Fundo-verde-Home.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <header
          className="bg-gray-800 text-center py-4 shadow-lg"
          style={{ borderBottom: "2px solid #b8860b" }}
        >
          <h1
            className="text-4xl tracking-wide"
            style={{
              color: "#FFD700", // Dourado brilhante
              fontFamily: "Poker, sans-serif", // Usando a fonte personalizada Poker
            }}
          >
            Jogos de Baralho
          </h1>
        </header>
        <main
          className="container mx-auto px-4 py-6 min-h-screen"
          style={{
            color: "#F5F5F5", // Branco suave
            fontFamily: "Geist Sans, sans-serif",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
