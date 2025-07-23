import { Link } from 'react-router-dom';
import FieldIllustration from '../assets/casinha.webp';
import Logo from '../assets/iconLogo.webp';
import Hero from '../components/Hero';
import LineChart from '../components/LineChart';

export default function Home() {
  return (
    <main className="min-h-screen bg-sun-light text-gray-800">
      <Hero />
      <section className="flex flex-col-reverse md:flex-row items-center max-w-6xl mx-auto py-16 px-6sun-light">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-nature-green mb-4">
            O Futuro da Produção Rural Inteligente
          </h1>
          <p className="mb-6 text-lg">
            Acompanhe suas vendas, produção e metas em tempo real com tecnologia de ponta.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-nature-green text-white font-semibold rounded-lg hover:bg-nature-green/90 transition"
          >
            Ver o Dashboard
          </Link>
        </div>
        <div className="flex-1 mb-8 md:mb-0">
          <img src={FieldIllustration} alt="Ilustração de fazenda" />
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
          <div className="flex items-start gap-4">
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g fill="#4CAF50">
    <circle cx="32" cy="20" r="12"/>
    <circle cx="24" cy="26" r="10"/>
    <circle cx="40" cy="26" r="10"/>
    <rect x="28" y="32" width="8" height="20" fill="#8D6E63" rx="2"/>
  </g>
</svg>
            <div>
              <h3 className="font-semibold text-xl">Controle de vendas</h3>
              <p>Registre e acompanhe suas vendas com precisão.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g fill="#4CAF50">
    <path d="M32 6c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z"/>
    <path d="M26 16h12l2 6v3h-4v9h4v4H24v-4h4v-9h-4v-3l2-6z"/>
    <path d="M18 34h4v4l-6 8h4l5-6v6h6v-6l5 6h4l-6-8v-4h4v-2H18v2z"/>
    <path d="M48 44h-3v-3h3v3zm-6 0h-3v-3h3v3z"/>
    <path d="M54 38c-2.5 0-4 1.5-4 4s1.5 4 4 4 4-1.5 4-4-1.5-4-4-4zm0 2c1 0 2 .5 2 2s-1 2-2 2-2-.5-2-2 .5-2 2-2z"/>
    <path d="M49 35l-4-7h-2l2 7h4z"/>
  </g>
</svg>
            <div>
              <h3 className="font-semibold text-xl">Monitoramento da produção</h3>
              <p>Saiba em que fase cada atividade está.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 5H15V17H3V5Z" fill="#4CAF50"/>
  <path d="M15 9H19L21 13V17H15V9Z" fill="#81C784"/>
  <circle cx="7" cy="18" r="2" fill="#2E7D32"/>
  <circle cx="17" cy="18" r="2" fill="#2E7D32"/>
</svg>
            <div>
              <h3 className="font-semibold text-xl">Gestão de estoque</h3>
              <p>Tenha controle total do que você produz e vende.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 5H15V17H3V5Z" fill="#4CAF50"/>
  <path d="M15 9H19L21 13V17H15V9Z" fill="#81C784"/>
  <circle cx="7" cy="18" r="2" fill="#2E7D32"/>
  <circle cx="17" cy="18" r="2" fill="#2E7D32"/>
</svg>
            <div>
              <h3 className="font-semibold text-xl">Alertas de metas</h3>
              <p>Receba notificações quando atingir suas metas.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-nature-green-dark">
        <div className="max-w-4xl mx-auto px-6">
          <div className="min-h-[40vh] bg-white rounded-lg shadow-md flex items-center justify-center">
            <LineChart/>
          </div>
        </div>
      </section>
      
      <footer className="bg-white border-t border-gray-200 py-8 px-4">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Link to="/" className="hover:opacity-80 transition">
          <img
            src={Logo}
            alt="Logo"
            className="h-40 w-auto"
          />
        </Link>

        <hr className="w-full max-w-sm border-gray-300" />

        <p className="text-xs text-gray-500 text-center">
          &copy;{new Date().getFullYear()} GuiFarm. Todos os direitos reservados.
        </p>
      </div>
    </footer>
    </main>
    
  );
}