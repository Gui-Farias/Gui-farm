import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

function sanitizeCPF(cpf: string) {
  return cpf.replace(/\D/g, '');
}

function isValidCPF(cpf: string) {
  const cleaned = sanitizeCPF(cpf);
  if (cleaned.length !== 11 || /^(\d)\1+$/.test(cleaned)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cleaned.charAt(i)) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cleaned.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cleaned.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;

  return resto === parseInt(cleaned.charAt(10));
}

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      if (!name.trim()) throw new Error('Nome obrigatório');
      if (!email.trim()) throw new Error('Email obrigatório');
      if (!isValidCPF(cpf)) throw new Error('CPF inválido');
      if (senha.trim().length < 6) throw new Error('A senha deve ter pelo menos 6 caracteres');

      const userCred = await createUserWithEmailAndPassword(auth, email.trim(), senha.trim());
      const uid = userCred?.user?.uid;
      if (!uid) throw new Error('Erro ao recuperar UID do usuário');

      console.log('Dados a salvar:', {
        nome: name.trim(),
        cpf: cpf,
        email: email.trim(),
        criadoEm: serverTimestamp(),
      });

      // Gravar no Firestore
      await setDoc(doc(db, 'Users', uid), {
        name: name.trim(),
        cpf: sanitizeCPF(cpf),
        email: email.trim(),
        createdAt: serverTimestamp(),
      });

      navigate('/dashboard');

    } catch (err: any) {
      console.error('[Cadastro]', err);

      if (err.code === 'auth/email-already-in-use') {
        setErro('Este e-mail já está em uso.');
      } else if (err.code === 'auth/weak-password') {
        setErro('Senha muito fraca. Use pelo menos 6 caracteres.');
      } else if (err.code === 'auth/invalid-email') {
        setErro('E-mail inválido.');
      } else if (err.message?.includes('CPF')) {
        setErro(err.message);
      } else {
        setErro('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-sun-light px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-nature-green text-center mb-6">Criar Conta</h1>

        {erro && <p className="text-red-600 text-sm mb-4">{erro}</p>}

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome completo
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border rounded border-nature-green text-gray-700 px-3 py-2"
            required
            autoComplete="name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border rounded border-nature-green text-gray-700 px-3 py-2"
            required
            autoComplete="email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
            CPF
          </label>
          <input
            id="cpf"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="000.000.000-00"
            className="mt-1 w-full border rounded border-nature-green text-gray-700 px-3 py-2"
            required
            inputMode="numeric"
            autoComplete="off"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="mt-1 w-full border rounded border-nature-green text-gray-700 px-3 py-2"
            required
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-nature-green text-white py-2 rounded hover:bg-nature-green-dark transition disabled:opacity-50"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="text-sm text-gray-700 text-center mt-4">
          Já tem conta?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-nature-green hover:underline"
          >
            Entrar
          </button>
        </p>
      </form>
    </main>
  );
}