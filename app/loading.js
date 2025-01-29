export default function Loading() {
    return (
      <div
        className="h-screen flex flex-col items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div
          className="bg-gray-800 bg-opacity-90 p-10 rounded-lg shadow-lg border-4 flex flex-col items-center"
          style={{ borderColor: "#b8860b" }}
        >
          <div className="animate-spin h-16 w-16 border-4 border-gold border-t-transparent rounded-full"></div>
          <p
            className="text-3xl font-bold mt-5 text-center"
            style={{ textShadow: "3px 3px 6px #000000" }}
          >
            Carregando...
          </p>
        </div>
      </div>
    );
  }
  