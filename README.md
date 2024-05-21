# VitalHub

VitalHub é uma aplicação destinada ao ambiente hospitalar, no cenário urbano dinâmico e contemporâneo, onde a demanda por soluções inovadoras na área da saúde se intensifica, um grupo de estudantes do curso técnico em desenvolvimento de sistemas embarcou em uma missão para transformar a experiência de pacientes e profissionais da medicina. Surgiu então o projeto "VitalHub", uma iniciativa que busca integrar médicos, pacientes e clínicas de forma inovadora.

## Tecnologias Utilizadas

- **Frontend**: React Native com Styled Components
  - React Native: Plataforma móvel nativa para desenvolvimento de aplicações iOS e Android.
  - Styled Components: Biblioteca para estilização de componentes React, permitindo escrever CSS em JavaScript.
  - Outras bibliotecas: Utilizamos várias bibliotecas para adicionar funcionalidades específicas, como:
    - react-native-maps
    - react-native-calendars
    - expo-notifications
    - expo-camera
    - expo-media-library
    - expo-location
    - react-native-axios
    - react-native-dropdown-select-list
    - react-native-mask

- **Backend**: API em C#
  - Desenvolvida utilizando .NET Core, oferecendo funcionalidades integradas com Azure, como:
    - Azure Cognitive Services OCR: Para reconhecimento óptico de caracteres, facilitando o processamento de documentos digitais.
    - Azure Blob Storage: Para armazenamento seguro e escalável de dados, como imagens e arquivos de prontuário.

- **Banco de Dados**: SQL Server
  - Utilizado para armazenar e gerenciar dados relacionais, como informações de usuário, consultas médicas e prontuários.

## Desenvolvedores
Enzo Quarelo e Lucas Lacerda

### Pré-requisitos

Antes de começar, certifique-se de ter o seguinte software instalado na sua máquina:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/get-npm) (gerenciador de pacotes do Node.js)
- [Git](https://git-scm.com/downloads)

### Passo a passo

1. Clone este repositório para a sua máquina local usando `git clone`.
2. Navegue até o diretório do projeto.
3. Execute `npm install` para instalar as dependências do projeto..
4. Inicie o servidor executando `npx expo start`.
5. Para melhor vizualização instale o APP ExpoGo em seu aplicativo móvel e scanneie o QR Code gerado.
6. Caso não tenha como instalar o app você pode vizualizar de forma web apertando a tecla W assim que der start no projeto.

## Uso

Para que você consiga explorar da melhor forma o nosso app, você deve fazer seu cadastro como um paciente, você terá opções para alterar seus dados e sua foto na tela de perfil, e na home temos um botão ao lado direito em baixo onde você pode agendar uma consulta médica, ao agendar você vizualizará essa consulta na home de acordo com o dia que ela foi agendada, uma consulta Pendente pode ser Cancelado e você pode ver o local da consulta e ainda ter uma navegamilidade pelo google maps que o app te redireciona, após realizada você terá acesso ao prontuário da sua consulta com sua prescrição médica e um campo para você enviar futuros exames ao seu médico. Explore e se divirta!
