async function welcome(request, response) {
  response.status(200).json({
    message: "Bem vindo a API ticket-service",
    api_reference: "Veja a documentção da api em /api-docs",
  });
}

const homeController = {
  welcome,
};

export default homeController;
