import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import LineChart from '../components/LineChartDash';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';

type User = {
  name: string;
  email: string;
  cpf: string;
};

export default function Dashboard() {
  const navigate = useNavigate();
  
  const [dados, setDados] = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (users) => {
      if (!users) {
        navigate('/');
        return;
      }

      const docRef = doc(db, 'Users', users.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setDados({
          name: data.name,
          email: data.email,
          cpf: data.cpf,
        });
      }

      setCarregando(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (carregando) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-sun-light">
        <p className="text-gray-600 text-sm">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-sun-light p-6">
      <div className="bg-white   rounded-xl shadow-md w-full p-6 text-center">
        <h1 className="text-2xl font-bold mb-4 text-nature-green">Bem-vindo à Dashboard!</h1>

        <div className="flex justify-center items-center  gap-8">
          {dados &&(
            <>
              <p className="text-gray-700 text-lg">
                <strong>Nome:</strong> {dados.name}
              </p>
              <p className="text-gray-700 text-lg">
                <strong>CPF:</strong> {dados.cpf}
              </p>
               <p className="text-gray-700 text-lg">
                <strong>Email:</strong> {dados.email}
              </p>
            </>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition cursor-pointer"
          >
            Sair
          </button>
        </div>
          <br />
        <section className="grid grid-cols-1 gap-8 justify-center">
           <div className="w-full bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Valor em caixa</h2>
            <PieChart />
          </div>
          <br />
          <div className="w-full min-h-[50vh] bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Valor ganho em USD</h2>
            <LineChart />
          </div>
          <br />
          <div className="w-full bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Crescimento por Categoria</h2>
            <BarChart />
          </div>
        </section>
      </div>
    </main>
  );
}