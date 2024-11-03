# UserCRUD 👤
Projeto de uma API RESTFull em Node.js com o framework Express, PRISMA ORM e PostgreSQL.

## ✏️ Packages
- Express.
- Prisma ORM.
- Tsx.
- TypeScript

## ▶️ Como rodar o projeto 
1. Clone o projeto.
2. Abra o projeto em sua IDE favorita.
3. Instale as dependências com o comando ``npm install``.
4. Configure a variável de ambiente. Para isso, use ``cp .envExample .env`` para criar o arquivo padrão e substitua com suas informações.
5. Configure o banco de dados. Certifique-se de criar o banco com o mesmo nome configurado no arquivo ``.env`` e aplique a migração com o comando ``npx prisma migrate dev``. 
6. Com o ambiente configurado, inicie o servidor com ``npm run dev``.

## 🚎 Rotas Implementadas:
  - __GET  /users__
  
    Esquema da resposta
    ```json
      {
      "status": 200,
      "data": [
          {
              "id": 1,
              "name": "Leandra Coutinho",
              "email": "leandra@gmail.com",
              "createdAt": "2024-11-02T01:08:16.779Z",
              "updatedAt": "2024-11-02T23:31:14.034Z"
          }
        ]
      }
     ```
<h1></h1>

  - __GET  /users/1__

    Esquema da resposta
    ```json
     {
      "status": 200,
      "data": {
          "id": 1,
          "name": "Leandra Coutinho",
          "email": "leandra@gmail.com",
          "createdAt": "2024-11-02T01:08:16.779Z",
          "updatedAt": "2024-11-02T23:31:14.034Z"
      }
    }
    ```
    - __ERROR__
    
      Esquema da resposta
      ```json
      {
      "status": 404,
      "message": "User not found."
      }
      ```
<h1></h1>
 
  - __POST  /users__

    Esquema da requisição
    ```json
    {
      "name": "Luísa Carvalho",
      "email": "luisacarvalho@gmail.com"
    }
    ```
    Esquema da resposta
    ```json
    {
      "status": 201,
      "data": {
          "id": 2,
          "name": "Luísa Carvalho",
          "email": "luisacarvalho@gmail.com",
          "createdAt": "2024-11-03T20:38:09.729Z",
          "updatedAt": "2024-11-03T20:38:09.729Z"
      },
      "message": "User created."
    }
    ```

    - __ERROR__
   
      Esquema da requisição
      ```json
        {
          "name": "Luísa Carvalho Fernandes",
          "email": "luisacarvalho@gmail.com"
        }
      ```
    
      Esquema da resposta
      ```json
      {
      "status": 400,
      "message": "Email already exists. Please use another email."
      }
      ```
<h1></h1>
  
  - __PUT  /users/1__

    Esquema de requisição
    ```json
    {
    "name": "Leandra Coutinho",
    "email": "leandracoutinho@gmail.com"
    }
    ```
    Esquema de resposta
    ```json
    {
    "status": 200,
    "data": {
        "id": 1,
        "name": "Leandra Coutinho",
        "email": "leandracoutinho@gmail.com",
        "createdAt": "2024-11-02T01:08:16.779Z",
        "updatedAt": "2024-11-03T20:42:41.001Z"
    },
    "message": "User updated successfully"
    }
    ```
    - __ERROR__
    
      Esquema da resposta
      ```json
      {
      "status": 404,
      "message": "User not found."
      }
      ```

      Esquema da requisição
      ```json
        {
          "name": "Leandra Coutinho Lima",
          "email": "leandracoutinho@gmail.com"
        }
      ```
      
      Esquema da resposta
       ```json
      {
      "status": 400,
      "message": "Email already exists. Please use another email."
      }
      ```
<h1></h1>

  - __DELETE  /users/2__

    Esquema de resposta
      ```json
      {
      "status": 200,
      "message": "User deleted successfully"
      }
      ```

      - __ERROR__
    
        Esquema da resposta
        ```json
        {
        "status": 404,
        "message": "User not found."
        }
        ```
    
