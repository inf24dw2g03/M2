const swaggerJSDoc = require("swagger-jsdoc");
const port = 3000;

const swaggerDefinition = { openapi: "3.0.0",
    info: {
    title: "Zoologico",
    version: "1.0.0",
    description: "API de um Jardim Zoologico",
    contact: { name: "Your name" },
    },
    servers: [{ url: "http://localhost:" + port }],
   };

const options = {
 swaggerDefinition,
 apis: ["./docs/**/*.yaml"],
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;