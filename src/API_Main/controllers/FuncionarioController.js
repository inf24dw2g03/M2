const Funcionario = require('../models/Funcionario');

exports.getAllFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    res.json(funcionarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar funcionários.' });
  }
};

exports.createFuncionario = async (req, res) => {
  try {
    const { name, cargo, salario, datacontrato, googleId, email } = req.body;
    const funcionario = await Funcionario.create({
      name,cargo,salario,datacontrato,googleId,email
    });
    res.status(201).json(funcionario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar funcionário.' });
  }
};

exports.getFuncionarioById = async (req, res) => {
    try {
      const { id } = req.params;
      const funcionario = await Funcionario.findByPk(id);
      if (!funcionario) {
        return res.status(404).json({ error: 'Funcionário não encontrado.' });
      }
      res.json(funcionario);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar funcionário.' });
    }
  };
  
exports.updateFuncionario = async (req, res) => {
  try {
    const { id } = req.params;
    const {name ,cargo, salario, datacontrato, googleId,email } = req.body;
    await Funcionario.update(
       {name, cargo, salario, datacontrato, googleId, email},
       { where: { id } }
      );
    res.json({ message: 'Funcionário atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar funcionário.' });
  }
};

exports.deleteFuncionario = async (req, res) => {
  try {
    const { id } = req.params;
    await Funcionario.destroy({ where: { id } });
    res.json({ message: 'Funcionário removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover funcionário.' });
  }
};
