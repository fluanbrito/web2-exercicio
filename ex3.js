const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Array mock de carros
const carros = [];

// Rota POST para inserir um novo carro
app.post('/relatorio', async (req, res) => {
  try {
    const novoCarro = req.body; // Assume que o cliente envia os dados do carro como JSON no corpo da solicitação
    carros.push(novoCarro);

    const quantidadeCarros = carros.length;
    res.json({ message: 'Novo carro adicionado.', quantidadeCarros });
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao adicionar o novo carro.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
