# Frontend do Desafio Logzz

<p align="center">
    <a href="https://logzz.com.br/" target="_blank"> 
        <img src="./src/assets/images/logzz-green.svg" width="200" style="margin-bottom: 30px;">    
    </a>
</p>

## 📝 Introdução

Este repositório contém a solução para o desafio da Logzz. Trata-se de um sistema simples de cadastro de produtos, construído com Next.js, utilizando uma API Node.js como backend.

Versão em produção: [Acesse aqui]()

## 🚀 Começando

Siga as **instruções** abaixo para configurar o ambiente e rodar o front-end do projeto localmente.

### 📋 Pré-requisitos

- [Git](https://git-scm.com/downloads)
- [Node (20.15.0)](https://nodejs.org/en/)
- [NPM (8.5.5)](https://www.npmjs.com/)

### 🔧 Instalação

Após ter configurado o ambiente, siga as etapas para instalar o projeto:

1. Clone o repositório:

   ```bash
   git clone https://github.com/GustavoGFG/logzz-frontend.git
   ```

2. Navegue até a pasta do projeto e execute o comando abaixo para instalar todas as dependências necessárias:

```
npm install
```

3. Após a conclusão da instalação, crie o arquivo de configuração com o comando a seguir na raiz do projeto:

```
copy .env.example .env
```

4. Abra o arquivo `.env` e configure as variáveis de ambiente conforme necessário. Certifique-se de especificar a porta onde o backend está rodando:

```
# Altere conforme necessidade
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
```

5. Pronto! Agora você pode executar o projeto usando os seguinte comando:

```
npm run dev
```
