const Jaula = require('../models/Jaula');
const Animal = require('../models/Animal');

exports.getAllJaulas = async (req, res) => {
  try {
    let jaulas;

    if (req.user.cargo === 'admin') {
      
      jaulas = await Jaula.findAll();
    } else {
      
      jaulas = await Jaula.findAll({
        where: { funcionarioId: req.user.id }
      });
    }

    res.json(jaulas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar jaulas' });
  }
};

exports.createJaula = async (req, res) => {
  try {
    const {localizacao, tamanho, funcionarioId}= req.body;
    const jaula= await Jaula.create({
      localizacao,tamanho, funcionarioId
    });
    res.status(201).json(jaula);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar Jaula.' });
  }
};

exports.getJaulaById = async (req, res) => {
    try {
      const { id } = req.params;
      const jaula = await Jaula.findByPk(id);
      if (!jaula) {
        return res.status(404).json({ error: 'Jaula não encontrado.' });
      }
      res.json(jaula);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar Jaula.' });
    }
  };
  
exports.updateJaula = async (req, res) => {
  try {
    const { id } = req.params;
    const {localizacao, tamanho, funcionarioId } = req.body;
    await Jaula.update(
       {localizacao,tamanho,funcionarioId},
       { where: { id } }
      );
    res.json({ message: 'Jaula atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar Jaula.' });
  }
};

exports.deleteJaula = async (req, res) => {
  try {
    const { id } = req.params;
    await Jaula.destroy({ where: { id } });
    res.json({ message: 'Jaula removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover Jaula.' });
  }
};

exports.getAnimalsByJaula = async (req, res) => {
  try {
    const { jaulaId } = req.params;
    const jaula = await Jaula.findOne({
      where: { id: jaulaId },
      include: Animal 
    });

    if (!jaula) {
      return res.status(404).json({ message: 'Jaula não encontrada.' });
    }

    res.json(jaula.Animals); 
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar animais na jaula.' });
  }
};
