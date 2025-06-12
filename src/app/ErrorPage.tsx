import { useRouteError, Link } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError() as Error;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg mb-2">Desculpe, ocorreu um erro inesperado.</p>
      <p className="text-gray-500 mb-6">{error.message}</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}
