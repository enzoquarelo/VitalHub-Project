USE VitalHub_G10Manha;

-- Selecionando todos os endereços
SELECT * FROM dbo.Enderecos;

INSERT INTO
	dbo.Enderecos
VALUES
	(NEWID(), '09510200', 'Rua Niterói', 180, -23.615016, -46.570720, 'São Caetano do Sul');



-- Selecionando todos os tipos de usuários
SELECT * FROM dbo.TiposUsuario;

INSERT INTO dbo.TiposUsuario VALUES (NEWID(), 'Medico'), (NEWID(), 'Paciente');



-- Selecionando todos os usuários
SELECT * FROM dbo.Usuarios;

INSERT INTO
	dbo.Usuarios
VALUES
	(NEWID(), '0973CF33-FEBA-4955-ACAC-10224E71933F', 'Carlos Roque', 'carlos.roque@gmail.com', 'medico123', 'string'),
	(NEWID(), 'D3468A23-AF5A-490C-84AD-99C73F017B96', 'Enzo Quarelo', 'enzo.quarelo@gmail.com', 'paciente123', 'string');

UPDATE dbo.Usuarios SET senha = '$2y$10$U/9tQyrW5/2ChJgSxEYvgeVCbLZrnZ7jYjqBI/P6vdexy6y/kI6FG' WHERE id = '4F2BAE19-FBA6-4BE1-A81B-9074EBBDFDB9';


-- Selecionando todas as especialidades
SELECT * FROM dbo.Especialidades;

INSERT INTO
	dbo.Especialidades
VALUES
	(NEWID(), 'Pediatra');



-- Selecionando todos os médicos
SELECT * FROM dbo.Medicos;

INSERT INTO
	dbo.Medicos
VALUES
	('95737722-DDC7-4801-B08C-ECA117FAC84C', 'C0FF61AF-1B23-4C9C-9D36-49BCC9799A0C', '123456789', '0587C24C-56AF-459C-BB17-471FFD4B0ACA');



-- Selecionando todos os pacientes
SELECT * FROM dbo.Pacientes;

INSERT INTO
	dbo.Pacientes
VALUES
	('4F2BAE19-FBA6-4BE1-A81B-9074EBBDFDB9', '2007-01-07', '391166037', '01318181801', '0587C24C-56AF-459C-BB17-471FFD4B0ACA');



-- Selecionando todos os niveis
SELECT * FROM dbo.NiveisPrioridade;

INSERT INTO 
	dbo.NiveisPrioridade
VALUES
	(NEWID(), 0), -- Rotina
	(NEWID(), 1), -- Exame
	(NEWID(), 2); -- Urgencia



-- Selecionando todas as situasões
SELECT * FROM dbo.Situacoes;

INSERT INTO
	dbo.Situacoes
VALUES
	(NEWID(), 'Pendentes'),
	(NEWID(), 'Realizados'),
	(NEWID(), 'Cancelados');



-- Selecionando todas as clínicas
SELECT * FROM dbo.Clinicas;

INSERT INTO
	dbo.Clinicas
VALUES
	(NEWID(), 'Clínica Médica Vida & Saúde', '12345678000190', 'Clínica Médica Vida & Saúde', 'clinica.vidasaude@gmail.com', '0587C24C-56AF-459C-BB17-471FFD4B0ACA');
