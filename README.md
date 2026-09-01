# 💊 Farmácia Vida+

Farmácia Vida+ é o frontend de um sistema de e-commerce farmacêutico, onde é possível gerenciar categorias e produtos (medicamentos, cosméticos e itens de bem-estar), consumindo uma API REST própria. Projeto desenvolvido como avaliação final do Bloco 03.

🔗 **Deploy:** [projeto-final-bloco-03-95gm.vercel.app](https://projeto-final-bloco-03-95gm.vercel.app/)

## ✨ Funcionalidades

- CRUD completo de **Categoria** (listar, cadastrar, editar, deletar)
- CRUD completo de **Produto** (listar, cadastrar, editar, deletar), com seleção de categoria já cadastrada
- Busca de categorias por nome, integrada à API
- Prevenção de categorias duplicadas ao cadastrar
- Página inicial com produtos em destaque
- Página "Sobre Nós"
- Layout responsivo (mobile, tablet e desktop), com menu hambúrguer no mobile

## 🚀 Tecnologias utilizadas

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/) — consumo da API REST
- [React Spinners](https://www.davidhu.io/react-spinners/) — loading
- [Phosphor Icons](https://phosphoricons.com/) — ícones

## 🔌 API

O front-end consome a API REST disponível em:
```
https://farmacia-ug0p.onrender.com
```
Documentação (Swagger): [farmacia-ug0p.onrender.com/swagger-ui/swagger-ui/index.html](https://farmacia-ug0p.onrender.com/swagger-ui/swagger-ui/index.html)

> ⚠️ A API está hospedada no plano gratuito do Render, então a primeira requisição depois de um tempo sem uso pode demorar alguns segundos (o servidor "acorda"). O backend não possui autenticação/Security.

## 💻 Como rodar o projeto localmente

Pré-requisitos: [Node.js](https://nodejs.org/) instalado.

```bash
# Clone o repositório
git clone <url-do-seu-repositorio>

# Acesse a pasta do projeto
cd projeto_final_bloco_03

# Instale as dependências
npm install

# Rode o projeto em modo de desenvolvimento
npm run dev
```

O projeto vai rodar em `http://localhost:5173` (porta padrão do Vite).

## 📁 Estrutura do projeto

```
src/
├── components/
│   ├── navbar/          # Navbar (com busca e menu responsivo)
│   ├── footer/
│   ├── categorias/      # ListaCategorias, FormCategoria, DeletarCategoria, CardCategorias
│   └── produtos/         # ListaProdutos, FormProduto, DeletarProduto, CardProdutos
├── models/               # Tipagens (Categoria, Produto)
├── pages/                # Home, Sobre
└── services/             # Comunicação com a API (Axios)
```

## 🌿 Organização das branches

```
main
 ├─ 01_Componente_Home_navbar_footer   # Etapa 1 — estrutura inicial e estilização
 ├─ 02_Rotas                            # Etapa 2 — rotas / e /home
 ├─ 03_CRUD_Categoria                   # Etapa 3 — CRUD completo de Categoria
 └─ 04_Extras                           # Recursos extras: CRUD de Produto, busca, Sobre Nós
```

## 👩‍💻 Autora

Desenvolvido por **Sara Carlenis Hurtado Cortes**

- [LinkedIn](https://www.linkedin.com/in/sara-hurtado-cortes/)
- [Instagram](https://www.instagram.com/s.corte_/)