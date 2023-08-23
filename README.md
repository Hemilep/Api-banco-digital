# API REST - Banco Digital

<h4 align="center"> 
	🚧 Banco Digital 🚧
</h4>

<p align="center">
	<img alt="Status Em Desenvolvimento" src="https://img.shields.io/badge/STATUS-EM%20DESENVOLVIMENTO-green">
</p>


## 📄 Sobre o projeto 

Esse projeto é fruto do **Desafio do Módulo 2** (Turma B2BT05) do curso de Desenvolvimento de Software com foco em back-end, ofertado pela Cubos Academy. 

### - Objetivo 

O presente projeto tem como objetivo o desenvolvimento de uma API para um Banco Digital. Sendo um projeto piloto, ele estará preparado para receber novas funcionalidades ao longo do tempo.

## ⚙️ Funcionalidades
- [x] Contas:
  - [x] Criar conta bancária
  - [x] Listar contas bancárias
  - [x] Atualizar os dados do usuário da conta bancária
  - [x] Excluir uma conta bancária
  - [x] Consultar saldo da conta bancária
  - [x] Emitir extrato bancário

- [x] Transações:
  - [x] Depositar em uma conta bancária
  - [x] Sacar de uma conta bancária
  - [x] Transferir valores entre contas bancárias

### 📝 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

## 💻 Execução do projeto

### Criar conta bancária
#### `POST` `/contas`

Esse endpoint criará uma conta bancária, onde será gerado um número único para identificação da conta (número da conta).

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades:

    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha
      
-   **Resposta**

A atualização será visualizada ao se listar as contas.

#### Demonstração:

![image](https://github.com/Hemilep/desafio-backend-m02-b2bt05/assets/64170089/4edd9fab-4efb-4ab0-9c97-1ec426fe873b)

#

### Listar contas bancárias

#### `GET` `/contas?senha_banco=Cubos123Bank`

Esse endpoint irá listar todas as contas bancárias existentes.

-   **Requisição** - query params
    -   senha_banco

-   **Resposta**

  listagem de todas as contas bancárias existentes
      
#### Demonstração:

![image](https://github.com/Hemilep/desafio-backend-m02-b2bt05/assets/64170089/fb1bef00-9860-4767-8f69-e61c0cdaedd9)

#

### Atualizar usuário da conta bancária

#### `PUT` `/contas/:numeroConta/usuario`

Esse endpoint irá atualizar apenas os dados do usuário de uma conta bancária.

-   **Requisição** - O corpo (body) deverá possuir um objeto com todas as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

O número da conta deverá ser informado na URL (query params).

-   **Resposta**

A atualização será visualizada ao se listar as contas novamente. 

#### Demonstração:

![image](https://github.com/Hemilep/desafio-backend-m02-b2bt05/assets/64170089/8ef38367-d1d5-40cb-bc16-95463be3dd63)

![image](https://github.com/Hemilep/desafio-backend-m02-b2bt05/assets/64170089/a85547cc-810f-422f-b3d0-f1301135ac54)

#

### Excluir Conta

#### `DELETE` `/contas/:numeroConta`

Esse endpoint irá excluir uma conta bancária existente.

-   **Requisição**

Numero da conta bancária (passado como parâmetro na rota)

-   **Resposta**

A exclusão será visualizada ao se listar as contas novamente. 

#### Demonstração:

![image](https://github.com/Hemilep/desafio-backend-m02-b2bt05/assets/64170089/e2197353-2996-4c89-b54c-9d2dce607fc6)

![image](https://github.com/Hemilep/desafio-backend-m02-b2bt05/assets/64170089/bfe6ae38-3526-416c-9ae9-e646fae1f0ca)

#

### Depositar

#### `POST` `/transacoes/depositar`

Esse endpoint irá somar o valor do depósito ao saldo de uma conta válida e registrar essa transação.

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades:

    -   numero_conta
    -   valor

-   **Resposta**

A atualização será visualizada ao se listar as contas novamente.

#### Demonstração:

![image](https://github.com/Hemilep/desafio-backend-m02-b2bt05/assets/64170089/062aafad-c05a-4362-8668-e58c89553e8e)

![image](https://github.com/Hemilep/desafio-backend-m02-b2bt05/assets/64170089/54419457-d749-4bba-a468-ed6924d27791)

#

### Sacar

#### `POST` `/transacoes/sacar`

Esse endpoint irá realizar o saque de um valor em uma determinada conta bancária e registrar essa transação.

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor
    -   senha

-   **Resposta**

A atualização será visualizada ao se listar as contas novamente.

#### Demonstração:

![image](https://github.com/Hemilep/desafio-backend-m02-b2bt05/assets/64170089/dcd8aa27-c5e4-4643-a00b-b9451a27a7b1)

![image](https://github.com/Hemilep/desafio-backend-m02-b2bt05/assets/64170089/7444425d-3a7e-40ee-997e-74eb93c015b7)

#

### Tranferir

#### `POST` `/transacoes/transferir`

Esse endpoint permitirá a transferência de recursos de uma conta bancária para outra e registrar essa transação.

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta_origem
    -   numero_conta_destino
    -   valor
    -   senha

-   **Resposta**

A atualização será visualizada ao se listar as contas novamente.

#### Demonstração:

![image](https://github.com/Hemilep/desafio-backend-m02-b2bt05/assets/64170089/11a765e5-2234-49e9-9686-8d8d73912e50)

![image](https://github.com/Hemilep/desafio-backend-m02-b2bt05/assets/64170089/50c0788e-218b-4036-a07d-b1b9f0edc490)

#

### Saldo

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Esse endpoint retornará o saldo de uma conta bancária.

-   **Requisição** - query params

    -   numero_conta
    -   senha

-   **Resposta**

  Saldo da conta

#### Demonstração:

  ![image](https://github.com/Hemilep/desafio-backend-m02-b2bt05/assets/64170089/aa9b015c-5ee8-4da2-9938-94b701748fcb)

#

### Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Esse endpoint listará as transações realizadas de uma conta específica.

-   **Requisição** - query params

    -   numero_conta
    -   senha

-   **Resposta**
  
  Relatório da conta

  #### Demonstração:

  ![image](https://github.com/Hemilep/desafio-backend-m02-b2bt05/assets/64170089/38bda858-168e-4a67-9ebc-311af1d50068)

#

  ## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
-   Teste de API:  **[Insomnia](https://insomnia.rest/)**

#

  ## 🧙‍♂️ Autora
  
  Hemile Paixão 
  
  [Entre em contato!](https://www.linkedin.com/in/hemile-petala-da-paixao/)


