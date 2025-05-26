const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ERD-Mobile Backend API",
      version: "1.0.0",
      description: "Dokumentasi otomatis untuk REST API berdasarkan ERD-Mobile",
    },
    servers: [
      { url: "http://localhost:3000/api", description: "Local server" },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
