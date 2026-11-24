-- Banco novo para o exercicio. Nao remove nem migra o schema antigo mydb.
CREATE DATABASE IF NOT EXISTS saep_clinica
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE saep_clinica;

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
