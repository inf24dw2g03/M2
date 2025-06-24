Drop schema if exists `zoologico`;
Create schema zoologico;
use zoologico;

DROP TABLE IF EXISTS `Funcionario`;
CREATE TABLE `Funcionario` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `googleId` VARCHAR(255) UNIQUE,
    `email` VARCHAR(255),
    `cargo` VARCHAR(50),
    `salario` DECIMAL(10,2),
    `datacontrato` DATE
);

DROP TABLE IF EXISTS `Jaula`;
CREATE TABLE `Jaula` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `localizacao` VARCHAR(100),
  `tamanho` VARCHAR(50),
  `funcionarioId` INT,
  FOREIGN KEY (`funcionarioId`) REFERENCES Funcionario(`id`)
);

DROP TABLE IF EXISTS `Animal`;
CREATE TABLE `Animal` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `especie` VARCHAR(100) NOT NULL,
  `idade` INT,
  `jaulaId` INT,
  FOREIGN KEY (`jaulaId`) REFERENCES Jaula(`id`)
);

INSERT INTO `Funcionario` (`name`, `googleId`, `email`, `cargo`, `salario`, `datacontrato`) VALUES
('Carlos Mendes', 'google-uid-001', 'carlos.mendes@zoo.com', 'Administrador', 2500.00, '2020-05-10'),
('Ana Oliveira', 'google-uid-002', 'ana.oliveira@zoo.com', 'Cuidadora', 1800.00, '2018-08-21'),
('Joao Silva', 'google-uid-003', 'joao.silva@zoo.com', 'Seguranca', 1600.00, '2019-03-15'),
('Mariana Costa', 'google-uid-004', 'mariana.costa@zoo.com', 'Biologa', 3000.00, '2021-06-12'),
('Ricardo Santos', 'google-uid-005', 'ricardo.santos@zoo.com', 'Porteiro', 1400.00, '2017-11-30'),
('Fernanda Lima', 'google-uid-006', 'fernanda.lima@zoo.com', 'Cuidadora', 1850.00, '2016-09-10'),
('Pedro Rocha', 'google-uid-007', 'pedro.rocha@zoo.com', 'Veterinario', 2600.00, '2015-12-05'),
('Sofia Almeida', 'google-uid-008', 'sofia.almeida@zoo.com', 'Seguranca', 1650.00, '2019-10-17'),
('Miguel Ferreira', 'google-uid-009', 'miguel.ferreira@zoo.com', 'Porteiro', 1500.00, '2018-07-20'),
('Rafael Nunes', 'google-uid-010', 'rafael.nunes@zoo.com', 'Biologo', 3100.00, '2022-02-14'),
('Tatiane Alves', 'google-uid-011', 'tatiane.alves@zoo.com', 'Cuidadora', 1900.00, '2017-04-22'),
('Gustavo Teixeira', 'google-uid-012', 'gustavo.teixeira@zoo.com', 'Veterinario', 2700.00, '2014-11-25'),
('Bruna Carvalho', 'google-uid-013', 'bruna.carvalho@zoo.com', 'Porteiro', 1450.00, '2020-01-30'),
('Daniel Lopes', 'google-uid-014', 'daniel.lopes@zoo.com', 'Seguranca', 1550.00, '2021-08-05'),
('Luiza Barros', 'google-uid-015', 'luiza.barros@zoo.com', 'Biologa', 3200.00, '2023-03-18'),
('Fernando Ribeiro', 'google-uid-016', 'fernando.ribeiro@zoo.com', 'Veterinario', 2800.00, '2013-06-28'),
('Camila Martins', 'google-uid-017', 'camila.martins@zoo.com', 'Cuidadora', 1950.00, '2019-05-10'),
('Leandro Souza', 'google-uid-018', 'leandro.souza@zoo.com', 'Porteiro', 1550.00, '2020-07-19'),
('Paula Mendes', 'google-uid-019', 'paula.mendes@zoo.com', 'Biologa', 3300.00, '2024-01-12'),
('Vinícius Moreira', 'google-uid-020', 'vinicius.moreira@zoo.com', 'Veterinario', 2900.00, '2012-09-03'),
('Carolina Duarte', 'google-uid-021', 'carolina.duarte@zoo.com', 'Cuidadora', 2000.00, '2015-10-14'),
('Thiago Neves', 'google-uid-022', 'thiago.neves@zoo.com', 'Seguranca', 1700.00, '2015-12-01'),
('Larissa Campos', 'google-uid-023', 'larissa.campos@zoo.com', 'Biologa', 3400.00, '2025-06-07'),
('Eduardo Gomes', 'google-uid-024', 'eduardo.gomes@zoo.com', 'Veterinario', 3000.00, '2026-05-21'),
('Gabriela Fonseca', 'google-uid-025', 'gabriela.fonseca@zoo.com', 'Cuidadora', 2100.00, '2027-11-30'),
('Rodrigo Almeida', 'google-uid-026', 'rodrigo.almeida@zoo.com', 'Porteiro', 1600.00, '2028-02-14'),
('Isabela Pinto', 'google-uid-027', 'isabela.pinto@zoo.com', 'Biologa', 3500.00, '2029-02-25'),
('Felipe Vasconcelos', 'google-uid-028', 'felipe.vasconcelos@zoo.com', 'Veterinario', 3100.00, '2040-04-19'),
('Vanessa Couto', 'google-uid-029', 'vanessa.couto@zoo.com', 'Cuidadora', 2200.00, '2030-09-10'),
('Anderson Cardoso', 'google-uid-030', 'anderson.cardoso@zoo.com', 'Seguranca', 1750.00, '2025-12-31'),
('Apipetfinder', '115832230518361460824','apipetfinder@gmail.com', 'admin', 3000.00, '2022-10-03' ),
('Antonio Ferreira', '116102739148495583587', 'antoniofscf@gmail.com', 'Funcionario', 20.00, '2022-12-10');


INSERT INTO `Jaula` (`localizacao`, `tamanho`, `funcionarioId`) VALUES
('Setor A', 'Grande', 2),
('Setor B', 'Media', 2),
('Setor C', 'Pequena', 11),
('Setor D', 'Grande', 4),
('Setor E', 'Media', 17),
('Setor F', 'Pequena', 6),
('Setor G', 'Grande', 7),
('Setor H', 'Media', 19),
('Setor I', 'Pequena', 25),
('Setor J', 'Grande', 16),
('Setor K', 'Media', 14),
('Setor L', 'Pequena', 23),
('Setor M', 'Grande', 20),
('Setor N', 'Media', 15),
('Setor O', 'Pequena', 27),
('Setor P', 'Grande', 28),
('Setor Q', 'Media', 25),
('Setor R', 'Pequena', 6),
('Setor S', 'Grande', 24),
('Setor T', 'Media', 19),
('Setor U', 'Pequena', 21),
('Setor V', 'Grande', 17),
('Setor W', 'Media', 2),
('Setor X', 'Pequena', 11),
('Setor Y', 'Grande', 4),
('Setor Z', 'Media', 14),
('Setor AA', 'Pequena', 16),
('Setor AB', 'Grande', 20),
('Setor AC', 'Media', 31),
('Setor AD', 'Pequena', 31);


INSERT INTO `Animal` (`name`,`especie`, `idade`,`jaulaId`) VALUES
('Leao', 'Leao africano', 5, 30),
('Tigre', 'Tigre siberiano', 4, 30),
('Elefante', 'Elefante savana', 10,29),
('Girafa', 'Girafa do sul', 7, 1),
('Zebra', 'Zebra planicies', 6, 3),
('Zebra', 'Zebra planicies', 7,  3),
('Crocodilo', 'Crocodilo americano', 8,  6),
('Urso', 'Urso pardo', 9, 4),
('Lobo', 'Lobo cinzento', 5, 5),
('Panda', 'Panda pequeno', 6, 4),
('Macaco', 'Macaco rabo vermelho', 2, 9),
('Cobras', 'Cobra de escada', 5, 7),
('Cobras', 'Cobra de capuz', 4, 7),
('Aranhas', 'Brown recluse', 10, 8),
('Macaco', 'Macaco', 8, 9),


('Leao','Leao nubio', 5, 11),
('Tigre','Tigre bengala', 4,12),
('Elefante','Elefante asiático', 10, 13),
('Girafa', 'Girafa reticulada', 7, 14),
('Zebra', 'Zebras das montanhas', 6,15),
('Macaco', 'Macaco aranha', 3,16),
('Crocodilo', 'Crocodilo filipino', 8,17 ),
('Urso', 'Urso polar', 9, 18),
('Lobo', 'Lobo dourado', 5,19),
('Panda', 'Panda vermelho', 6,20),

('Leao', 'Leao atlas', 5, 21),
('Tigre', 'Tigre malaio', 4, 22),
('Elefante', 'Elefante floresta', 10, 23),
('Girafa', 'Girafa masai', 7, 24),
('Zebra', 'Zebras grevy', 6, 25),
('Macaco', 'Macaco prego', 3, 26),
('Crocodilo', 'Crocodilo focinho delgado', 8, 27),
('Urso', 'Urso negro', 9, 28),
('Lobo', 'Lobo etiope', 5,29),
('Panda', 'Panda gigante', 6,30);

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED WITH mysql_native_password BY '12345678';
FLUSH PRIVILEGES;