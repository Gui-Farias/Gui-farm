# GUI Farm 🌿

A **GUI Farm** é uma aplicação moderna desenvolvida com **React + TypeScript**, voltada para a visualização de dados e gestão agrícola. Ela utiliza o **Firebase Authentication** para login seguro e o **Cloud Firestore** como banco de dados em tempo real. Os dados são apresentados através de **gráficos interativos** usando a biblioteca **D3.js**, oferecendo uma experiência visual rica e responsiva para dashboards e análises.

https://gui-farm.vercel.app


---

## 🚀 Tecnologias utilizadas

- **React (TSX)** – Front-end moderno e reativo
- **TypeScript** – Tipagem estática para maior robustez
- **Firebase Authentication** – Sistema de autenticação de usuários
- **Cloud Firestore** – Banco de dados NoSQL em tempo real
- **D3.js** – Visualização de dados com gráficos interativos
- **pnpm** – Gerenciador de pacotes ultrarrápido
- **Vercel** – Hospedagem e deploy automático

---

## 🔐 Funcionalidades

- Cadastro e login de usuários com Firebase Auth
- Armazenamento de informações personalizadas dos usuários no Firestore
- Dashboard dinâmico com gráficos atualizados
- Visualização de dados com animações e interações (hover, tooltip, etc.)
- Responsividade completa (100% adaptável a diferentes dispositivos)

---

## 📦 Instalação e uso com pnpm

> Pré-requisitos: Node.js instalado e `pnpm` disponível (`npm install -g pnpm`)

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/gui-farm.git
cd gui-farm

# 2. Instale as dependências com pnpm
pnpm i

# 3. Configure as variáveis de ambiente
cp .env.example .env
# edite o .env com suas credenciais Firebase
VITE_FIREBASE_API_KEY=xxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxxxxxxxxxx
VITE_FIREBASE_PROJECT_ID=gui-farm-xxxxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxxxxxxxxxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxxxxx
VITE_FIREBASE_APP_ID=xxxxxxxxxxxxxxxx


# 4. Rode a aplicação localmente
pnpm run dev




Feito com 💚 por Guilherme Farias
