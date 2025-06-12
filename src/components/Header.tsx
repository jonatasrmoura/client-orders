import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Order System
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/orders"
            className="hidden md:flex px-3 py-2 text-gray-700 hover:text-blue-600"
          >
            Pedidos
          </Link>
          <Link
            to="/orders/new"
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Novo Pedido
          </Link>
        </div>
      </nav>
    </header>
  );
}
