CREATE DATABASE IF NOT EXISTS saep_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE saep_db;

CREATE TABLE usuarios (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  senha_hash VARCHAR(200) NOT NULL,
  CONSTRAINT uq_usuarios_email UNIQUE (email)
) ENGINE=InnoDB;

CREATE TABLE tutores (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  endereco VARCHAR(200) NOT NULL,
  cpf_criptografado VARCHAR(128) NOT NULL,
  cpf_hash CHAR(64) NOT NULL,
  CONSTRAINT uq_tutores_cpf UNIQUE (cpf_hash)
) ENGINE=InnoDB;

CREATE TABLE pets (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  especie VARCHAR(50) NOT NULL,
  raca VARCHAR(80) NOT NULL,
  idade TINYINT UNSIGNED NOT NULL,
  tutor_id INT NOT NULL,
  INDEX ix_pets_tutor (tutor_id),
  CONSTRAINT ck_pets_idade CHECK (idade <= 99),
  CONSTRAINT fk_pets_tutor FOREIGN KEY (tutor_id)
    REFERENCES tutores(id) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE agendamentos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  data_hora DATETIME NOT NULL,
  procedimento VARCHAR(100) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  INDEX ix_agendamentos_pet (pet_id),
  INDEX ix_agendamentos_data (data_hora),
  CONSTRAINT ck_agendamentos_valor CHECK (valor >= 0),
  CONSTRAINT fk_agendamentos_pet FOREIGN KEY (pet_id)
    REFERENCES pets(id) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB;

START TRANSACTION;
INSERT INTO usuarios (nome,email,senha_hash) VALUES ('Ana Recepcao','ana@clinica.test','65029f0f52e98c4f2e6d2eaa1d746fb4:b087b818193d8e916dae6401f796a882d95763252e2617b534e01c3587a057f1f61ab2cbec353d37db1d5def83e25818168deb495a7bb8a4ff4974f80b88b45d');
INSERT INTO usuarios (nome,email,senha_hash) VALUES ('Bruno Recepcao','bruno@clinica.test','6afe88598ee06df42fe2e6c73a258a39:5c09ed3c527ac73eb0b3ef13abdf651df6fbc5b3b725e497fee84b868c1c9059a96d72f1f87280ae4b9dfc0bbe3d3dee8b4e3b07b3f1d9a2a2415ab627487c94');
INSERT INTO usuarios (nome,email,senha_hash) VALUES ('Carla Gestao','carla@clinica.test','bee2d444cd99286cd4ded08835d9356d:6cc6966f22d5df3e1cacdf7b04740a2e39aded809ed6c8a9373e80dce240f6932c0e111e133990329e4c55ffb605ab8e34997e460e49d921030101e003991032');
INSERT INTO tutores (nome,email,telefone,endereco,cpf_criptografado,cpf_hash)
    VALUES ('Tutor Exemplo A','tutor.a@example.test','(75) 90000-0001','Rua Exemplo A, 10','5b9d734d95cf6022f16dc40a:d236a5562438e29c7d58be0ffdb9b0a5:cf8cf65e437bda53343741','ebf5edfda503b3ffc17aed87311a55b7020a8b14eba0e4fe1d4dbd697f054ea4');
INSERT INTO tutores (nome,email,telefone,endereco,cpf_criptografado,cpf_hash)
    VALUES ('Tutor Exemplo B','tutor.b@example.test','(75) 90000-0002','Rua Exemplo B, 20','c8bab4e85c936a9845fce6f0:953c8ae1874d07970d6f33ee1b39d4f4:9189c831a2dc162365bc63','185aa682b44b70d99f3a321c230ae1cf1c9fc65dd3e83693c9d74942fbe479e6');
INSERT INTO tutores (nome,email,telefone,endereco,cpf_criptografado,cpf_hash)
    VALUES ('Tutor Exemplo C','tutor.c@example.test','(75) 90000-0003','Rua Exemplo C, 30','4d9444a8edabd7c2acd0ab04:9dc9fd6494ff16cda8e49d8958dd2345:a58b59a0a5165dc7536c9d','e91e046901612c37297c330d5492d1c284f601f6c101a7f67276293acd35a776');

INSERT INTO pets (nome,especie,raca,idade,tutor_id) VALUES
  ('Luna','Canina','Sem raca definida',3,1),
  ('Milo','Felina','Sem raca definida',2,2),
  ('Mel','Canina','Poodle',5,3);
INSERT INTO agendamentos (pet_id,data_hora,procedimento,valor) VALUES
  (1,'2026-12-02 09:00:00','Consulta',120.00),
  (2,'2026-12-01 10:00:00','Vacinacao',90.00),
  (3,'2026-12-01 08:30:00','Retorno',0.00);
COMMIT;
SELECT 'usuarios' AS tabela, COUNT(*) AS total FROM usuarios
UNION ALL SELECT 'tutores', COUNT(*) FROM tutores
UNION ALL SELECT 'pets', COUNT(*) FROM pets
UNION ALL SELECT 'agendamentos', COUNT(*) FROM agendamentos;
