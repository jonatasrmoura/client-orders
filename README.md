Visão Geral
Este projeto é um frontend desenvolvido em ReactJS com Vite, utilizando TypeScript, Tailwind CSS, React Hook Form e Axios para consumo de APIs. O objetivo é demonstrar boas práticas de desenvolvimento em um ambiente local para o Desafio TMB.
---

Pré-requisitos
Node.js (versão 16 ou superior)

npm ou yarn

Backend do Desafio TMB rodando localmente para o consumo da API
---

Tecnologias Utilizadas
ReactJS: Biblioteca JavaScript para construção de interfaces

Vite: Ferramenta de build rápida para desenvolvimento moderno

TypeScript: Superset JavaScript com tipagem estática

Tailwind CSS: Framework CSS utilitário

React Hook Form: Biblioteca para gerenciamento de formulários

Axios: Cliente HTTP para consumo de APIs

ESLint/Prettier: Ferramentas para padronização de código

---

Boas Práticas Implementadas
Componentização e reutilização de código

Tipagem estática com TypeScript

Separação de preocupações (serviços, componentes, páginas)

Formulários controlados com React Hook Form

Estilização com Tailwind CSS seguindo padrões consistentes

Tratamento de erros nas chamadas API

Variáveis de ambiente para configurações sensíveis

---

Observações
Este projeto está configurado apenas para ambiente de desenvolvimento local. Certifique-se de que o backend do Desafio TMB esteja rodando na porta configurada (normalmente 3000) antes de iniciar o frontend.

Para qualquer problema com CORS, verifique a configuração do proxy no arquivo vite.config.ts e as configurações do seu backend.
