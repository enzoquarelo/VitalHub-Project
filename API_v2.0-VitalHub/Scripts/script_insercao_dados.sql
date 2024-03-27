USE VitalHub_M_G10;

-- Selecionando todos os endere�os
SELECT * FROM dbo.Enderecos;

INSERT INTO
	dbo.Enderecos
VALUES
	(NEWID(), '09510200', 'Rua Niter�i', 180, -23.615016, -46.570720);



-- Selecionando todos os tipos de usu�rios
SELECT * FROM dbo.TiposUsuario;

INSERT INTO dbo.TiposUsuario VALUES (NEWID(), 'Medico'), (NEWID(), 'Paciente');



-- Selecionando todos os usu�rios
SELECT * FROM dbo.Usuarios;

INSERT INTO
	dbo.Usuarios
VALUES
	(NEWID(), '7CB21A7C-9451-4F29-A40B-9FED58D71865', 'Carlos Roque', 'carlos.roque@gmail.com', 'medico123', 'string'),
	(NEWID(), '3179FF3C-B60C-421F-BABE-CA28910595A9', 'Enzo Quarelo', 'enzo.quarelo@gmail.com', 'paciente123', 'string');

UPDATE dbo.Usuarios SET senha = '$2y$10$kZROpWHidaGEbQdfvq3SpeVPGiNcpLQHAOcENJbblYV0aAqXoHnYO' WHERE id = 'F63A83C9-35C7-4BDE-940D-5B07303D8F02';


-- Selecionando todas as especialidades
SELECT * FROM dbo.Especialidades;

INSERT INTO
	dbo.Especialidades
VALUES
	(NEWID(), 'Pediatra');



-- Selecionando todos os m�dicos
SELECT * FROM dbo.Medicos;

INSERT INTO
	dbo.Medicos
VALUES
	('86DF82F9-0A26-4043-BA62-3EEED68F3671', 'BB3E9EEF-3F97-48C7-AA7B-3D520B22EBD8', '123456789', 'BB978B98-A357-4153-943B-966BAEA4285E');



-- Selecionando todos os pacientes
SELECT * FROM dbo.Pacientes;

INSERT INTO
	dbo.Pacientes
VALUES
	('D3F52089-4621-4598-AEEC-B0E860F721FA', '2007-01-07', '391166037', '01318181801', 'BB978B98-A357-4153-943B-966BAEA4285E');



-- Selecionando todos os niveis
SELECT * FROM dbo.NiveisPrioridade;

INSERT INTO 
	dbo.NiveisPrioridade
VALUES
	(NEWID(), 0), -- Rotina
	(NEWID(), 1), -- Exame
	(NEWID(), 2); -- Urgencia



-- Selecionando todas as situas�es
SELECT * FROM dbo.Situacoes;

INSERT INTO
	dbo.Situacoes
VALUES
	(NEWID(), 'Pendentes'),
	(NEWID(), 'Realizados'),
	(NEWID(), 'Cancelados');



-- Selecionando todas as cl�nicas
SELECT * FROM dbo.Clinicas;

INSERT INTO
	dbo.Clinicas
VALUES
	(NEWID(), 'Cl�nica M�dica Vida & Sa�de', '12345678000190', 'Cl�nica M�dica Vida & Sa�de', 'clinica.vidasaude@gmail.com', 'BB978B98-A357-4153-943B-966BAEA4285E');
