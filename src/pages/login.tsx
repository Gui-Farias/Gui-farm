import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import Logo from '../assets/iconLogo.webp';
import { auth } from '../lib/firebase';


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    setErro('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setErro('CPF ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Email de recuperação enviado!');
    } catch {
      alert('Erro ao enviar e-mail. Verifique o CPF.');
    }
  };

  const [mostrando, setMostrando] = useState(false);

  const toggleSenha = () => {
    setMostrando(!mostrando);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-sun-light px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <div className="flex flex-col items-center gap-8 text-center justify-center">

        <Link to="/" className="hover:opacity-80 transition">
          <img
            src={Logo}
            alt="Voltar pra home <-"
            title='Voltar pra home <-'
            className="h-22 w-auto"
          />
        </Link>
        <h1 className="text-2xl font-bold text-nature-green text-center mb-6">Entrar</h1>

        </div>

        {erro && <p className="text-red-600 text-sm mb-4">{erro}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@email.com"
            className="mt-1 w-full border border-nature-green text-gray-700 rounded px-3 py-2"
            required/>
        </div>

        <div className="mb-6 relative">
          <label htmlFor="senha" className="block text-sm font-medium  text-gray-700">
            Senha
          </label>
          <input
            id="senha"
            type={mostrando ? 'text' : 'password'}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="mt-1 w-full border border-nature-green text-gray-700 rounded px-3 py-2"
            required
          />
          <button type="button" id="toggleSenhaBtn" onClick={toggleSenha} className="absolute bottom-3 right-3 text-gray-500 cursor-pointer">
          <svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" fill="#999">
            {mostrando ? (
              <>
                <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/><circle cx="12" cy="12" r="2.5" fill="#999"/>
              </>
            ) : (
              <>
              <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/><circle cx="12" cy="12" r="2.5" fill="#999"/><line x1="3" y1="21" x2="21" y2="3" stroke="#999" stroke-width="2"/>
              </>
            )}
          </svg>
        </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-nature-green text-white py-2 rounded hover:bg-nature-green-dark cursor-pointer transition disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <div className="flex justify-between mt-4 text-sm">
          <button
            type="button"
            onClick={handleResetPassword}
            className="text-nature-green hover:underline cursor-pointer"
          >
            Esqueci minha senha
          </button>

          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-nature-green hover:underline cursor-pointer"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </main>
  );
}