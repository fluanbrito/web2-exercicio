const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Função para verificar a aptidão para aposentadoria
function checkAposentadoria(genero, idade, tempoContrib) {
  const idadeMinima = genero === 'F' ? 70 : 75;
  const somaIdadeContrib = idade + tempoContrib;

  if ((genero === 'F' && somaIdadeContrib >= 90) || (genero === 'M' && somaIdadeContrib >= 95)) {
    return true;
  }
  return false;
}

// Rota GET para verificar a aposentadoria
app.get('/aposentadoria', async (req, res) => {
  try {
    const genero = req.query.genero.toUpperCase();
    const idade = parseInt(req.query.idade);
    const tempoContrib = parseInt(req.query.tempoContrib);

    if (isNaN(idade) || isNaN(tempoContrib) || (genero !== 'F' && genero !== 'M')) {
      return res.status(400).json({ error: 'Parâmetros inválidos.' });
    }

    const aptoParaAposentar = checkAposentadoria(genero, idade, tempoContrib);

    res.json({ aptoParaAposentar });
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao verificar a aposentadoria.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
