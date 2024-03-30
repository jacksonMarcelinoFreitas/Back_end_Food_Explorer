require ("dotenv/config");
const migrations = require("./database/sqlite/migrations");
const uploadConfig = require("./configs/upload");
const AppError = require('./utils/appError');
const express = require("express");
const cors = require("cors");

const routes = require("./routes");

// const { request } = require('./routes/users.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

//Faz a conexão com o banco, e executa a migration
migrations();

//tratamento de excessões
app.use((error, request, response, next) => {
  //verificar se é erro do lado do Cliente
  console.log(error);

  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })

})

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));


/*
-- GET
  ROUTE PARAMS
  -- exige os parametros na rota
  -- rota só é reconhecida com os parâmetros
  -- localhost:3333/message/5/Jackson

  app.get('/message/:id/:user', (request, response) => {
    const {id, user} = request.params;
    response.send(`Id da mesnsagem : ${id} Para o usuário ${user}`);
  });

QUERY PARAMS
  -- parâmetros ficam opcionais
  -- existência da rota independe dos parâmetros
  -- localhost:3333/message/user?page=5&limit=10

  app.get('/message/user', (request, response) => {
    const {page, limit} = request.query;
    response.send(`Id da pagina : ${page} Com limite de ${limit} paginas!`);
  });


-- POST
  -- os valores vem pelo body
  -- response como HTML
  app.post('/user', (request, response) => {
    const {user, age, graduate} = request.body;

    response.send(`Seja bem vindo ${user}. Voce tem ${age} e estuda ${graduate}!`);
  });

  -- response como JSON
  app.post('/user', (request, response) => {
    const {user, age, graduate} = request.body;

    response.json({user, age, graduate});
  });

*/
