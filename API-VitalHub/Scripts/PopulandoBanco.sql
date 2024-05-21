SELECT * FROM MedicosClinicas


 INSERT INTO TiposUsuario VALUES (NEWID(), 'Paciente'), (NEWID(), 'Medico');
 
 INSERT INTO Enderecos VALUES 
	--Clinicas
	(NEWID(), '09510-200', 'Rua Niterói', 180, -46.5707, -23.6150, 'São Caetano do Sul'),
	(NEWID(), '03117-000', 'Rua Oratório', 215, -46.5984, -23.5566,'São Paulo'),
	(NEWID(), '09861-790', 'Rua Vitória Maria Médice Ramos', 330 , -46.5767, -23.7117, 'São Bernardo do Campo'),
	--Paciente
	(NEWID(), '07114-300', 'Rua Poá', 365, -46.5327, -23.4466, 'Guarulhos'),
	(NEWID(), '09030-640', 'Av. Doze de Outubro', 229, -46.5301, -23.6681,'Santo André'),
	--Medico
	(NEWID(), '07110-040', 'Avenida Monteiro Lobato', 1234, -46.522768, -23.455819, 'Guarulhos'),
	(NEWID(), '09561-030', 'Alameda São Caetano', 1039, -46.566576, -23.622719, 'São Caetano do Sul'),
    (NEWID(), '07094-000', 'Rua Felício Marcondes', 210, -46.539319, -23.444393, 'Guarulhos'),
    (NEWID(), '09770-330', 'Rua Campo Grande', 140, -46.534423, -23.678433, 'São Bernardo do Campo'),
    (NEWID(), '09401-010', 'Rua Helena', 224, -46.417953, -23.668133, 'Ribeirão Pires');

 SELECT * FROM Enderecos;
 INSERT INTO Clinicas VALUES
	(NEWID(), 'Hospital Linda Vida', '50417508000168', 'Clínica Paulo Skaf', 'clinica.pauloskaf@gmail.com', 'DF95861D-53FD-4A60-87A1-341D4535A624'),
	(NEWID(), 'Hospital Vita', '88508348000135', 'Clínica Mario Amato', 'clinica.marioamato@gmail.com', '2C007F73-9EA5-4A05-BB74-0C7322BB6C70'),
	(NEWID(), 'Hospital Flor da Vida', '87661772000152', 'Clínica Morvan Figueiredo', 'clinica.morvanfigueiredo@gmail.com', '7CB8D1B9-23B8-4068-A304-6298738790FC');

INSERT INTO Especialidades
VALUES 
    (NEWID(), 'Cardiologia'),
    (NEWID(), 'Dermatologia'),
    (NEWID(), 'Ortopedia'),
    (NEWID(), 'Pediatria'),
    (NEWID(), 'Oncologia');


SELECT * FROM TiposUsuario
INSERT INTO Usuarios VALUES
	(NEWID(), '748D63E2-6D0C-4CB2-85AB-102B3212C0A3', 'Matheus Alves', 'matheus.alves@gmail.com', 'medico123', 'foto', NULL),
	(NEWID(), '748D63E2-6D0C-4CB2-85AB-102B3212C0A3', 'Davi Peixoto', 'davipeixoto@gmail.com', 'medico123', 'foto', NULL),
	(NEWID(), '748D63E2-6D0C-4CB2-85AB-102B3212C0A3', 'Giovanna Monteiro', 'gi.monteiro@gmail.com', 'medico123', 'foto', NULL),
	(NEWID(), '748D63E2-6D0C-4CB2-85AB-102B3212C0A3', 'Elisa Barros', 'barros.elisa@gmail.com', 'medico123', 'foto', NULL),
	(NEWID(), '748D63E2-6D0C-4CB2-85AB-102B3212C0A3', 'Marcelo Raul', 'raul.marcelo@gmail.com', 'medico123', 'foto', NULL),
	--paciente
	(NEWID(), '2B90EF1A-EDF8-489F-824E-1AFA6C97DEAD', 'Luiz Lorenzo', 'luiz.lorenzo@gmail.com', 'paciente123', 'foto', NULL),
	(NEWID(), '2B90EF1A-EDF8-489F-824E-1AFA6C97DEAD', 'Bárbara Real', 'real.barbara@gmail.com', 'paciente123', 'foto', NULL);

 SELECT * FROM Usuarios;
 SELECT * FROM Enderecos;
 SELECT * FROM Especialidades;
 INSERT INTO Medicos VALUES
	('4AE950E9-EBE3-401F-B8D1-4FBDBB04BE09', 'E67FB7B5-BFF9-4BF5-AE04-1378847D7338', '37112', '595531C1-C71E-42EA-89F7-0D20AE21B9FE'),
	('5E2A40C7-4AF1-4B85-B0A4-68ED22929471', '8D933A7B-5350-4739-8C68-3720E60AE0EC', '09677', 'CFD63044-B30A-43CC-8E30-FF612FE34955'),
	('5509BDFF-C66C-4AD8-9BA8-9C430314919B', '7D7AEAA7-9029-4378-A880-3A3CBB9B3936', '13899', '7DA60DB9-D852-45CD-8307-FC73419B4118'),
	('39631BB4-3BB8-43CF-9E5B-A5F202217446', 'CCC31EB0-8767-4754-AF94-B466637615AD', '07331', '7E92501D-6F3A-43D9-8055-7DE6317E38B0'),
	('031F6240-67E1-4AB0-8D69-F1B68BBB4865', '2BC9C684-5F7B-44F8-BDC0-F51D81A59785', '25600', 'DED5B06B-A85B-41D0-A46A-8A83E3158B36');

 SELECT * FROM Clinicas;
 SELECT * FROM Medicos;
 INSERT INTO MedicosClinicas VALUES
	(NEWID(), 'F887FF1B-4BAA-4787-9A72-00A55032222A', '4AE950E9-EBE3-401F-B8D1-4FBDBB04BE09'),
	(NEWID(), 'F887FF1B-4BAA-4787-9A72-00A55032222A', '5E2A40C7-4AF1-4B85-B0A4-68ED22929471'),
	(NEWID(), 'AE60E35D-63BA-47A7-8252-26172082F443', '5509BDFF-C66C-4AD8-9BA8-9C430314919B'),
	(NEWID(), 'AB128280-938C-4E1B-BDF1-838192C71F98', '39631BB4-3BB8-43CF-9E5B-A5F202217446'),
	(NEWID(), 'AB128280-938C-4E1B-BDF1-838192C71F98', '031F6240-67E1-4AB0-8D69-F1B68BBB4865');

 INSERT INTO NiveisPrioridade VALUES
	 (NEWID(), 0),
	  (NEWID(), 1),
	   (NEWID(), 2);

 INSERT INTO Receitas VALUES
	(NEWID(), 'Ciprofloxacino 500mg, Tomar 1 comprimido via oral a cada 12horas por 7 dias.'),
	(NEWID(), 'Tylenol 200mg, Tomar 1 comprimido via oral a cada sempre que a dor persistir'),
	(NEWID(), 'Amoxicilina 500mg, Tomar 1 comprimido via oral a cada 8horas por 4 dias.'),
	(NEWID(), 'Dramim 20gotas, Tomar 1 comprimido via oral 1hora antes de dormir'),
	(NEWID(), 'Sertralina 500mg, Tomar 1 comprimido via oral após a primeira refeição do dia, até o retorno'),
	(NEWID(), 'Rivotril 2mg, Tomar 2 comprimido via oral a cada 12 horas'),
	(NEWID(), 'Cataflam 10mg, Tomar 1 comprimido via horal por dia até o retorno');

 SELECT * FROM Usuarios
 SELECT * FROM Enderecos
 INSERT INTO Pacientes VALUES
	('EFAACD6A-A127-47FD-8699-231EBD710069', '2002-07-01', '190765203', '95518120001', 'B905E338-105B-4CE5-9FC8-8F44B2AD65E4'),
	('A084E1A6-34CC-454D-884B-4740227115F1', '2003-04-03', '397090845', '98354737063', '013549CF-7DD0-4D24-BF99-AB4D7401BE2E');

 INSERT INTO Situacoes VALUES
	(NEWID(), 'Pendentes'),
	(NEWID(), 'Cancelados'),
	(NEWID(), 'Realizados');

 SELECT * FROM Situacoes
 SELECT * FROM Pacientes
 SELECT * FROM Usuarios
  SELECT * FROM Clinicas
 SELECT * FROM Enderecos
 SELECT * FROM Situacoes
 SELECT * FROM Receitas
 SELECT * FROM NiveisPrioridade
 INSERT INTO Consultas VALUES
	(NEWID(), '57ACD4ED-24F3-415F-AB42-42F0AF7506FC', 'EFAACD6A-A127-47FD-8699-231EBD710069', 'D9CA8F1B-A0B3-42A2-B14A-8378C253AF7A', '55D31DD0-FCB4-4454-B737-1893894F2541', '84A661AD-BAAE-4904-9522-2492CAAA2367', '2024-05-28T15:30:00', null , null),
	(NEWID(), '57ACD4ED-24F3-415F-AB42-42F0AF7506FC', 'EFAACD6A-A127-47FD-8699-231EBD710069', '89DA46F7-F069-457D-9FA6-FA6ED98F845F', 'D8918119-23EB-4280-BC6E-2B965E8C9D66', '34F0DAE4-4E4F-4E19-A94D-AEAADB309EDF', '2024-05-30T05:45:00', null , null),
	(NEWID(), '3535E097-6E11-4340-B46B-D64EA32F3EF1', 'EFAACD6A-A127-47FD-8699-231EBD710069', '0B28862A-CFF5-4077-B7E8-15963D9F2E9E', '31A324A8-111B-4DFE-A1A6-73F5A3EB6CED', '96C34BAB-D769-4BF7-9C83-F419635FBDD9', '2024-05-28T12:00:00', 'Prescrição de antiemético para controlar náuseas e vômitos associados ao enjoo.', 'Cinetose'),
	(NEWID(), 'C8DE418F-4013-471A-A953-83C07311CC61', 'EFAACD6A-A127-47FD-8699-231EBD710069', 'D9CA8F1B-A0B3-42A2-B14A-8378C253AF7A', '82B6DBBF-E519-4462-954E-E6ACED7D7B5F', '84A661AD-BAAE-4904-9522-2492CAAA2367', '2024-05-28T09:30:00', 'Prescrição de antibiótico para tratar infecção bacteriana.', 'Infecção urinária'),
	(NEWID(), '57ACD4ED-24F3-415F-AB42-42F0AF7506FC', 'A084E1A6-34CC-454D-884B-4740227115F1', 'ACF5FA5C-AAF5-4653-B6FE-32835DAE547E', '02AA6F49-3C10-4D33-856C-EBE5B37D7842', '34F0DAE4-4E4F-4E19-A94D-AEAADB309EDF', '2024-05-28T07:30:00', null , null),
	(NEWID(), '3535E097-6E11-4340-B46B-D64EA32F3EF1', 'A084E1A6-34CC-454D-884B-4740227115F1', '89DA46F7-F069-457D-9FA6-FA6ED98F845F', 'D8918119-23EB-4280-BC6E-2B965E8C9D66', '96C34BAB-D769-4BF7-9C83-F419635FBDD9', '2024-05-28T05:00:00', 'Prescrição de antidepressivo para tratar sintomas de depressão, como tristeza profunda e falta de energia.', 'Depressão maior.'),
	(NEWID(), 'C8DE418F-4013-471A-A953-83C07311CC61', 'A084E1A6-34CC-454D-884B-4740227115F1', 'ACF5FA5C-AAF5-4653-B6FE-32835DAE547E', '1426A10A-5874-4902-88F6-D6295602BC8B', '84A661AD-BAAE-4904-9522-2492CAAA2367', '2024-05-28T12:50:00', 'Prescrição de analgésico para aliviar dor de cabeça intensa.', 'Cefaleia tensional.');


	Select * from Consultas
	UPDATE dbo.Usuarios SET foto = '$2y$10$wXHOxKE4vD18Qv2O1N0bsu1IBrPCZ8TQCHY76BBdACVES0XI5NMPu' WHERE id = 'EFAACD6A-A127-47FD-8699-231EBD710069';

	--57ACD4ED-24F3-415F-AB42-42F0AF7506FC