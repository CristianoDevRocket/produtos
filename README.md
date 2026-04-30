# Gerenciamento de Produtos

Aplicação web para gerenciamento de produtos com operações básicas de
CRUD (criar, listar, editar e excluir), utilizando uma API simulada com
json-server.

Repositório oficial: https://github.com/CristianoDevRocket/produtos.git

------------------------------------------------------------------------

## Como obter o projeto

### Clonar o repositório

git clone https://github.com/CristianoDevRocket/produtos.git

### Acessar a pasta

cd produtos

------------------------------------------------------------------------

## Pré-requisitos

-   Node.js (versão 18 ou superior)
-   npm

Verificar instalação: node -v npm -v

------------------------------------------------------------------------

## Como rodar o projeto

### 1. Instalar dependências

npm install

### 2. Rodar aplicação (frontend + API)

npm start

------------------------------------------------------------------------

## Acessar a aplicação

Frontend: http://localhost:5173

API: http://localhost:3001/produtos

------------------------------------------------------------------------

## Funcionalidades

-   Listar produtos
-   Criar produto
-   Editar produto
-   Excluir produto
-   Buscar e filtrar
-   Importar CSV

------------------------------------------------------------------------

## Regras de negócio

-   Nome não pode repetir
-   Localização não pode repetir
-   Quantidade não pode ser negativa
-   Não permite excluir produto com quantidade maior que zero

------------------------------------------------------------------------

## Estrutura do projeto

src/ pages/ components/ hooks/ services/ api/ utils/

------------------------------------------------------------------------

## Possíveis problemas

Tabela não carrega: Verifique se rodou npm start

Erro na API: Verifique se a porta 3001 está ativa

Erro no navegador: Abra o console (F12)

------------------------------------------------------------------------

## Observação

A API é simulada com json-server. Os dados ficam no arquivo db.json.