import { useEffect, useState } from "react";
import Logo from "@/assets/logoSF.png";
import LogoCS2 from "@/assets/logoCS2.webp";
import { NavLink, Outlet } from "react-router";
import { Menu, X, Bell, MessageCircle } from "lucide-react";
import logosteam from "@/assets/logo-steam.svg";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "../Loading";

const Header = () => {
  const [isMenuMovileOpen, setIsMenuMovileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { usuario, isAuthenticated, login, logout, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/torneos", label: "Torneos" },
    { to: "/partidas", label: "Partidas" },
    { to: "/rankings", label: "Rankings" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <nav
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-card backdrop-blur border-b border-border" : "bg-card"
        }`}
      >
        <div className="max-w-[70%] mx-auto py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="SF" className="w-12 h-12" />
            <div className="border-r border-border h-8 sm:h-12 mx-2 sm:mx-4"></div>
            <div className="flex items-center gap-2">
              <img src={LogoCS2} alt="CS2 Logo" className="w-5 h-5" />
              <span className="font-bold text-xl">CS2</span>
            </div>
          </div>
          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="hover:text-primary transition"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          {isAuthenticated && usuario ? (
            <div className="flex items-center gap-4">
              <button className="relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="relative">
                <MessageCircle className="w-6 h-6" />
                <span className="absolute -top-1 -right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  5
                </span>
              </button>
              <NavLink
                to={`/${usuario.id}/perfil`}
                className="cursor-pointer flex items-center gap-2"
              >
                <Avatar>
                  <AvatarImage
                    src={usuario.avatarUrl ?? "/path/to/avatar.jpg"}
                    alt={usuario.nombre}
                  />
                  <AvatarFallback>{usuario.nombre.charAt(0)}</AvatarFallback>
                </Avatar>
              </NavLink>
              <button className="hidden md:block cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <div className="hidden md:block">
              <button
                onClick={login}
                className="bg-secondary text-white px-6 py-2 rounded-lg transition font-bold hover:bg-secondary/90 flex items-center gap-2"
              >
                <img src={logosteam} alt="steam logo" />
                <span>Inicia sesión con Steam</span>
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuMovileOpen(!isMenuMovileOpen)}
          >
            {isMenuMovileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        {isMenuMovileOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur border-b border-border px-4 py-4 space-y-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="block hover:text-primary transition"
                onClick={() => setIsMenuMovileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <button className="w-full bg-secondary text-white px-6 py-2 rounded-lg transition font-bold hover:bg-primary/10">
              Iniciar sesión
            </button>
          </div>
        )}
      </nav>
      <main className="max-w-[70%] mx-auto grow w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Header;
