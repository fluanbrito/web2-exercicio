const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

function generateRandomNumbers(quantity, min, max) {
  const numbers = new Set();
  while (numbers.size < quantity) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(randomNum);
  }
  return Array.from(numbers);
}

app.get('/sorteio', async (req, res) => {
  try {
    const randomNumbers = generateRandomNumbers(10, 1, 100);
    res.json({ numbers: randomNumbers });
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao gerar os números aleatórios.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
