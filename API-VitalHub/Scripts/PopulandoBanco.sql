SELECT * FROM MedicosClinicas


 INSERT INTO TiposUsuario VALUES (NEWID(), 'Paciente'), (NEWID(), 'Medico');
 
 INSERT INTO Enderecos VALUES 
	--Clinicas
	(NEWID(), '09510-200', 'Rua Niter�i', 180, -46.5707, -23.6150, 'S�o Caetano do Sul'),
	(NEWID(), '03117-000', 'Rua Orat�rio', 215, -46.5984, -23.5566,'S�o Paulo'),
	(NEWID(), '09861-790', 'Rua Vit�ria Maria M�dice Ramos', 330 , -46.5767, -23.7117, 'S�o Bernardo do Campo'),
	--Paciente
	(NEWID(), '07114-300', 'Rua Po�', 365, -46.5327, -23.4466, 'Guarulhos'),
	(NEWID(), '09030-640', 'Av. Doze de Outubro', 229, -46.5301, -23.6681,'Santo Andr�'),
	--Medico
	(NEWID(), '07110-040', 'Avenida Monteiro Lobato', 1234, -46.522768, -23.455819, 'Guarulhos'),
	(NEWID(), '09561-030', 'Alameda S�o Caetano', 1039, -46.566576, -23.622719, 'S�o Caetano do Sul'),
    (NEWID(), '07094-000', 'Rua Fel�cio Marcondes', 210, -46.539319, -23.444393, 'Guarulhos'),
    (NEWID(), '09770-330', 'Rua Campo Grande', 140, -46.534423, -23.678433, 'S�o Bernardo do Campo'),
    (NEWID(), '09401-010', 'Rua Helena', 224, -46.417953, -23.668133, 'Ribeir�o Pires');

 SELECT * FROM Enderecos;
 INSERT INTO Clinicas VALUES
	(NEWID(), 'Hospital Linda Vida', '50417508000168', 'Cl�nica Paulo Skaf', 'clinica.pauloskaf@gmail.com', 'DF95861D-53FD-4A60-87A1-341D4535A624'),
	(NEWID(), 'Hospital Vita', '88508348000135', 'Cl�nica Mario Amato', 'clinica.marioamato@gmail.com', '2C007F73-9EA5-4A05-BB74-0C7322BB6C70'),
	(NEWID(), 'Hospital Flor da Vida', '87661772000152', 'Cl�nica Morvan Figueiredo', 'clinica.morvanfigueiredo@gmail.com', '7CB8D1B9-23B8-4068-A304-6298738790FC');

INSERT INTO Especialidades
VALUES 
    (NEWID(), 'Cardiologia'),
    (NEWID(), 'Dermatologia'),
    (NEWID(), 'Ortopedia'),
    (NEWID(), 'Pediatria'),
    (NEWID(), 'Oncologia');


 SELECT * FROM Especialidades;
 SELECT * FROM Enderecos;
 INSERT INTO Medicos VALUES
	(NEWID(), '4CA0467C-FBBA-4B0B-9E78-91C4436EEE5F', 'CRM', 'Endere�oID'),
	(NEWID(), '4CA0467C-FBBA-4B0B-9E78-91C4436EEE5F', 'CRM', 'Endere�oID'),
	(NEWID(), '4CA0467C-FBBA-4B0B-9E78-91C4436EEE5F', 'CRM', 'Endere�oID'),
	(NEWID(), '4CA0467C-FBBA-4B0B-9E78-91C4436EEE5F', 'CRM', 'Endere�oID'),
	(NEWID(), '4CA0467C-FBBA-4B0B-9E78-91C4436EEE5F', 'CRM', 'Endere�oID');

 SELECT * FROM Clinicas;
 SELECT * FROM Medicos;
 INSERT INTO MedicosClinicas VALUES
	(NEWID(), 'IDClinica', 'IDMedico'),
	(NEWID(), 'IDClinica', 'IDMedico'),
	(NEWID(), 'IDClinica', 'IDMedico'),
	(NEWID(), 'IDClinica', 'IDMedico'),
	(NEWID(), 'IDClinica', 'IDMedico');

 INSERT INTO NiveisPrioridade VALUES
	 (NEWID(), '(INT)Prioridade'),
	  (NEWID(), '(INT)Prioridade'),
	   (NEWID(), '(INT)Prioridade');

 INSERT INTO Receitas VALUES
	(NEWID(), 'Medicamento'),
	(NEWID(), 'Medicamento'),
	(NEWID(), 'Medicamento'),
	(NEWID(), 'Medicamento'),
	(NEWID(), 'Medicamento'),
	(NEWID(), 'Medicamento'),
	(NEWID(), 'Medicamento');

 SELECT * FROM Enderecos
 INSERT INTO Pacientes VALUES
	(NEWID(), 'YYYY-MM--DD', 'RG', 'CPF', 'IDEndereco'),
	(NEWID(), 'YYYY-MM--DD', 'RG', 'CPF', 'IDEndereco');

 INSERT INTO Situacoes VALUES
	(NEWID(), 'Situa��o'),
	(NEWID(), 'Situa��o'),
	(NEWID(), 'Situa��o');

 SELECT * FROM Situacoes
 SELECT * FROM Pacientes
 SELECT * FROM MedicosClinicas
 SELECT * FROM Receitas
 SELECT * FROM NiveisPrioridade
 INSERT INTO Consultas VALUES
	(NEWID(), 'SituacaoID', 'PacienteID', 'MedicoClinicaID', 'ReceitaID', 'PrioridadeID', 'YYYY-MM--DD', 'Descricao', 'Diagn�stico'),
	(NEWID(), 'SituacaoID', 'PacienteID', 'MedicoClinicaID', 'ReceitaID', 'PrioridadeID', 'YYYY-MM--DD', 'Descricao', 'Diagn�stico'),
	(NEWID(), 'SituacaoID', 'PacienteID', 'MedicoClinicaID', 'ReceitaID', 'PrioridadeID', 'YYYY-MM--DD', 'Descricao', 'Diagn�stico'),
	(NEWID(), 'SituacaoID', 'PacienteID', 'MedicoClinicaID', 'ReceitaID', 'PrioridadeID', 'YYYY-MM--DD', 'Descricao', 'Diagn�stico'),
	(NEWID(), 'SituacaoID', 'PacienteID', 'MedicoClinicaID', 'ReceitaID', 'PrioridadeID', 'YYYY-MM--DD', 'Descricao', 'Diagn�stico'),
	(NEWID(), 'SituacaoID', 'PacienteID', 'MedicoClinicaID', 'ReceitaID', 'PrioridadeID', 'YYYY-MM--DD', 'Descricao', 'Diagn�stico'),
	(NEWID(), 'SituacaoID', 'PacienteID', 'MedicoClinicaID', 'ReceitaID', 'PrioridadeID', 'YYYY-MM--DD', 'Descricao', 'Diagn�stico');

 SELECT * FROM Usuarios




