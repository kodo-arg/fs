import { ArrowRight, Trophy, Flame, Star, Play } from "lucide-react";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <div className="bg-primary/20 border border-primary/50 rounded-full px-4 py-2 text-sm font-semibold text-primary mb-6">
              🔥 Torneo de esports más intenso del año
            </div>
          </div>

          <h1 className="hero-title text-white">
            1V1 <span className="text-primary">CS2</span>{" "}
            <br className="hidden sm:block" /> CHAMPIONSHIP
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Compite contra los mejores jugadores en duelos 1v1 de Counter-Strike
            2. Premio de <span className="font-bold text-accent">$50,000</span>{" "}
            en juego. ¿Te atreves?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-secondary transition font-bold text-lg flex items-center justify-center gap-2 group">
              Registrarse Ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
            <button className="border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary/10 transition font-bold text-lg flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Ver Trailer
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-12 max-w-2xl mx-auto">
            <div className="stat-box">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                512
              </div>
              <div className="text-sm text-muted-foreground">Jugadores</div>
            </div>
            <div className="stat-box">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                $50K
              </div>
              <div className="text-sm text-muted-foreground">En Premios</div>
            </div>
            <div className="stat-box">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                Live
              </div>
              <div className="text-sm text-muted-foreground">
                Streaming 24/7
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Format Section */}
      <section id="format" className="py-20 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-12">Cómo Funciona</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Trophy,
                title: "Clasificación",
                desc: "512 jugadores en bracket de eliminación directa",
              },
              {
                icon: Flame,
                title: "Duelos 1v1",
                desc: "Mapas aleatorios - Mejor de 3 rondas",
              },
              {
                icon: Star,
                title: "Campeón",
                desc: "El ganador se lleva el grand prize",
              },
            ].map((item, i) => (
              <div key={i} className="tournament-card p-6 group">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">
                  {item.title}
                </h3>
                <p className="text-center text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-12">Agenda del Torneo</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                date: "Dec 15",
                time: "10:00 AM",
                event: "Inscripción cierra",
                icon: "📋",
              },
              {
                date: "Dec 20",
                time: "4:00 PM",
                event: "Ronda de 16 - Grupo A",
                icon: "⚔️",
              },
              {
                date: "Dec 22",
                time: "4:00 PM",
                event: "Ronda de 16 - Grupo B",
                icon: "⚔️",
              },
              {
                date: "Dec 25",
                time: "7:00 PM",
                event: "GRAN FINAL EN VIVO",
                icon: "🏆",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="tournament-card p-6 border-primary/50 hover:border-primary"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <div className="text-sm text-primary font-semibold">
                      {item.date} • {item.time}
                    </div>
                    <div className="text-lg font-bold mt-1">{item.event}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Section */}
      <section id="prizes" className="py-20 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-12">
            Distribución de Premios
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                place: "🥇 1er Lugar",
                amount: "$25,000",
                desc: "Campeón del torneo",
              },
              {
                place: "🥈 2do Lugar",
                amount: "$12,500",
                desc: "Final runner-up",
              },
              { place: "🥉 3er Lugar", amount: "$7,500", desc: "Semifinal" },
            ].map((prize, i) => (
              <div
                key={i}
                className="tournament-card p-8 text-center border-primary/30 hover:border-accent hover:shadow-lg hover:shadow-accent/20"
              >
                <div className="text-4xl mb-3">{prize.place.split(" ")[0]}</div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {prize.amount}
                </div>
                <p className="text-muted-foreground">{prize.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-primary/10 border border-primary/50 rounded-lg p-8 text-center">
            <p className="text-lg text-muted-foreground">
              Los 100 mejores jugadores también ganarán acceso exclusivo a la
              temporada pro.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="section-title">¿Listo para Competir?</h2>
          <p className="text-lg text-muted-foreground">
            Inscríbete ahora y demuestra que eres el mejor jugador 1v1 de CS2
          </p>
          <button className="bg-linear-to-r from-primary to-accent text-primary-foreground px-10 py-4 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition font-bold text-lg">
            Registrarse Gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="border-t border-border py-12 px-4 bg-card/30"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="font-bold">CS2 CLASH</span>
              </div>
              <p className="text-sm text-muted-foreground">
                El mayor torneo 1v1 de CS2 en Latinoamérica
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navegación</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#format" className="hover:text-primary transition">
                    Formato
                  </a>
                </li>
                <li>
                  <a href="#schedule" className="hover:text-primary transition">
                    Agenda
                  </a>
                </li>
                <li>
                  <a href="#prizes" className="hover:text-primary transition">
                    Premios
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Términos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Reglas
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: info@cs2clash.com</li>
                <li>Discord: CS2Clash</li>
                <li>Twitch: cs2clash</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>
              © 2025 CS2 CLASH. Todos los derechos reservados. | Counter-Strike
              es propiedad de Valve Corporation.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
