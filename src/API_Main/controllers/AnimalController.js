const { Op } = require('sequelize');
const Animal = require('../models/Animal');
const Jaula = require('../models/Jaula')

exports.getAllAnimals = async (req, res) => {
  try {
    const search = req.query.search || "";

    if (req.user.cargo === 'admin') {
      // Admin vê todos os animais, filtrados pelo nome se search existir
      const todos = await Animal.findAll({ 
        include: Jaula,
        where: search ? { name: { [Op.like]: `${search}%` } } : undefined
      });
      return res.json(todos);
    }

    // Funcionário vê só animais nas jaulas atribuídas a ele, e com filtro search
    const jaulas = await Jaula.findAll({
      where: { funcionarioId: req.user.id },
      attributes: ['id'],
    });

    const idsJaulas = jaulas.map(j => j.id);

    const animais = await Animal.findAll({
      where: {
        jaulaId: idsJaulas,
        ...(search && { name: { [Op.like]: `${search}%` } })
      },
      include: Jaula,
    });

    res.json(animais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar animais.' });
  }
};

exports.createAnimal = async (req, res) => {
  try {
    console.log("Dados recebidos:", req.body);
    const { name, especie, idade, jaulaId } = req.body;
    const newAnimal = await Animal.create({
      name,
      especie,
      idade,
      jaulaId
    });
    console.log("Animal criado com sucesso:",newAnimal)
    res.status(201).json(newAnimal);
  } catch (err) {
    console.error("Erro ao criar animal:", err);
    res.status(500).json({ error: 'Erro ao criar animal.' });
  }
};

exports.getAnimalById = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findByPk(id);
    if (!animal) {
      return res.status(404).json({ error: 'Animal não encontrado.' });
    }
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar Animal.' });
  }
};

exports.updateAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, especie, idade, jaulaId } = req.body;
    await Animal.update(
      { name, especie, idade, jaulaId },
      { where: { id } }
    );
    res.json({ message: 'Animal atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar animal.' });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    await Animal.destroy({ where: { id } });
    res.json({ message: 'Animal removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover animal.' });
  }
};
