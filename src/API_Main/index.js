const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require('./db/zoo'); 
const funcionarioRoutes = require('./routes/funcionario.js');
const animalRoutes = require('./routes/animal.js');
const jaulaRoutes = require('./routes/jaula.js');
const Funcionario = require('./models/Funcionario.js');
const swaggerSpec = require("./controllers/swaggerSpecs");
const swaggerUi = require("swagger-ui-express");
const port=3000;
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes.js');
require('./middlewares/auth');

const yaml = require('js-yaml');

const sessionOptions = {
  secret: "default_secret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, 
};

//Conexao com o react
app.use(cors({origin: "http://localhost:3006",credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar passport
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);

const auth = function (req, res, next) {
    if (req.isAuthenticated()) {
    // Detalhe do utilizador autenticado
    console.log('Utilizador autenticado: Nome:', req.user.name, " Email: ", req.user.email, " GoogleID: ", req.user.googleId);
    return next();
    }
    return res.status(401).json({ error: 'Não autenticado' });
   };

// Rota para obter o arquivo Swagger JSON
app.get("/docs/swagger.json", (req, res) => res.json(swaggerSpec));

app.get('/docs/download/swagger.yaml', (req, res) => {
  try {
    const swaggerYaml = yaml.dump(swaggerSpec);
    res.setHeader('Content-Disposition', 'attachment; filename=swagger.yaml');
    res.setHeader('Content-Type', 'application/x-yaml');
    res.send(swaggerYaml);
  } catch (e) {
    res.status(500).send("Erro a gerar o ficheiro YAML");
  }
});

app.get('/auth/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

// Rota para servir a documentação Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/Funcionario', auth, funcionarioRoutes);
app.use('/Animal', auth, animalRoutes);
app.use('/Jaula', auth, jaulaRoutes);

// Sincroniza a base de dados com o Sequelize e cria a tabela de utilizadores, se não existir
sequelize.sync()
  .then(() => {
      console.log("Tabelas criadas com sucesso!");

      // Só inicia o servidor depois das tabelas estarem prontas
      app.listen(port, function () {
          console.log(`app running on localhost:${port}`);
      });
  })
  .catch(err => {
      console.error("Erro ao criar as tabelas: ", err);
  });

