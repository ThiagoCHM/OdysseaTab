 <figure>
   <img src="https://i.ibb.co/yWDBkYJ/logo.png" alt="Odyssea Tab">
 </figure>



API Rest de Gerenciamento de Viagens com apresentação Multiplataforma (Web e Mobile)

## Funcionalidades:

- [x] Criação de Viagem
- [x] Confirmação de Viagem
- [x] Atualização das Dados da Viagem
- [x] Visualização dos Dados da Viagem

- [x] Convite de Novo Participante
- [x] Atualização das Dados do Participante (Em Desenvolvimento)
- [x] Visualização dos Dados do Participante
- [x] Listagem de Todos os Participantes da Viagem

- [x] Criação de Atividades
- [x] Listagem Atividades

- [x] Criação de Links Importantes (Em Desenvolvimento)
- [x] Listagem dos Links Importantes (Em Desenvolvimento)

### Ferramentas Utilizadas:
- **NodeJs**
- **Fastify**
- **Prisma**
- **Zod**
- **Cors**
- **Dayjs**
- **Nodemailer**
- **FakerJs**
- **Docker** (Opcional)

### Como Usar? Pré-Requisitos:
- **Node.js**
- **npm**

## Instalação
### Clone o Repositório:
`git clone https://github.com/ThiagoCHM/OdysseaTab`

### No Terminal:
`cd backend`

### Instale as Dependências:
`npm i`

### Inicie a Aplicação:
`npm run dev`

A API estará Disponível em http://localhost:3333.

### Comandos Uteis:

>#### Abre o Prisma Studio, qual permite manipular o Banco de Dados
>`npx prisma studio`
>#### Povoa/Preenche o Banco de Dados Fictícios (FakerJs)
>`npx prisma db seed`
>#### Apaga e Recria com Banco de Dados com Novas Informações
>`npx prisma migrate reset`
>#### Executa os Testes Unitários (Pendência Técnica)
>`npm run test`
>#### Executa a Aplicação empregando o Docker
>`docker compose up -d`
