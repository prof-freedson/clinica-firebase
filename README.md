# 🏥 Clínica Firebase - Sistema de Gerenciamento de Pacientes

Sistema web desenvolvido em Next.js para gerenciamento de pacientes de clínica, utilizando Firebase como banco de dados.

## 🚀 Funcionalidades

- ✅ Cadastro de pacientes
- ✅ Listagem e busca de pacientes
- ✅ Edição de dados
- ✅ Exclusão lógica (soft delete)
- ✅ Interface responsiva e moderna

## 🛠️ Tecnologias

- **Frontend:** Next.js 15 + React 19
- **Banco de Dados:** Firebase Firestore
- **Estilização:** Tailwind CSS
- **Linguagem:** TypeScript

## 📋 Pré-requisitos

- Node.js 18+ 
- Conta no Firebase
- Projeto Firebase configurado

## ⚙️ Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd clinica-firebase
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o Firebase

Altere o arquivo `.env.local.example` para `.env.local` na raiz do projeto com as seguintes variáveis:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

**Para obter essas configurações:**
1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Selecione seu projeto
3. Vá em "Configurações do Projeto" (ícone de engrenagem)
4. Clique em "Configurações do SDK"
5. Copie as configurações para o `.env.local`

### 4. Configure as regras do Firestore

No Console do Firebase, vá em "Firestore Database" → "Regras" e configure:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /paciente/{document} {
      allow read, write: if true; // Para desenvolvimento
    }
  }
}
```

**⚠️ Importante:** Use `if true` apenas em desenvolvimento. Para produção, implemente autenticação.

## 🚀 Executando o projeto

### Desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Produção
```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas da aplicação
│   ├── pacientes/         # Gerenciamento de pacientes
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizáveis
├── lib/                   # Serviços e configurações
│   ├── firebase.ts        # Configuração do Firebase
│   ├── paciente-service.ts # Serviços de pacientes
│   └── types.ts           # Tipos TypeScript
└── globals.css            # Estilos globais
```

## 🔧 Desenvolvimento

### Criando novo paciente
- Acesse `/pacientes/criar`
- Preencha os dados obrigatórios
- Clique em "Cadastrar"

### Editando paciente
- Na lista de pacientes, clique no ícone de editar (✏️)
- Modifique os dados
- Salve as alterações

### Excluindo paciente
- Na lista de pacientes, clique no ícone de lixeira (🗑️)
- Confirme a exclusão
- O paciente será marcado como inativo

## 🚨 Solução de Problemas

### Erro "The query requires an index"
Se aparecer este erro, crie o índice composto no Firebase:
1. Clique no link fornecido no erro
2. Clique em "Criar" no modal
3. Aguarde o índice ser criado

### Pacientes não aparecem
1. Verifique se as regras do Firestore estão corretas
2. Confirme se o arquivo `.env.local` está configurado
3. Verifique o console do navegador para erros

