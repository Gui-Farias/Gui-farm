import { Link } from 'react-router-dom';
import beHero from '../assets/bgHero.webp'; // certifique-se que está no caminho certo

export default function Hero() {
  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center text-center text-white px-6"
      style={{
        backgroundImage: `url(${beHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          O Futuro da Produção Rural Inteligente
        </h1>
        <p className="text-lg mb-6">
          Monitore vendas, produção e metas com tecnologia de ponta, na palma da sua mão.
        </p>
        <Link
          to="/login"
          className="inline-block px-6 py-3 bg-nature-green text-white font-semibold rounded-lg hover:bg-nature-green/90 transition"
        >
          Entrar na Plataforma
        </Link>
      </div>
    </section>
  );
}