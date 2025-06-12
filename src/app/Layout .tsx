import { Outlet, Link } from "react-router-dom";
import { Header } from "../components/Header";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <Outlet />
      </main>
    </div>
  );
}