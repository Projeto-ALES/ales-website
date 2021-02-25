# ALES Website

## Descrição

Este é o repositório do site do ALES \o/ A ideia desse projeto é que ele nos ajude a não só divulgar o ALES para o público externo mas também para uso interno como controle de matérias, aulas e alunos, por exemplo.

## Repositório

O repositório possui a seguinte estrutura:

- `backend/` - essa é a pasta que contém toda a lógica do backend (onde usamos Express.js)
- `frontend/` - essa é a pasta que possui todos as páginas e componentes que utilizamos na nossa interface (onde usamos React.js)
- `.env/` - pasta com as variáveis de ambiente para os diversos ambientes possíveis
- `.github/` - pasta com o nosso template de Pull Request e pipelines de testes e deploy
- `.vscode/` - pasta com configurações do VS Code
- `docker-compose.yml` - arquivo que sobe todos os serviços (containers Docker) de uma vez

## Stack

É recomendado que você tenha pelo menos uma noção básica das seguintes tecnologias utilizadas no projeto (caso não conheça alguma, dê uma olhada rápida na documentação):

#### [Git](https://git-scm.com/)

É a ferramenta de controle de versão do projeto. Bastante usada no desenvolvimento de software.

#### [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

É a principal linguagem da web e vem sendo atualizada constantemente. No projeto, utilizamos a sintaxe da versão ES6 e mais recentes. É recomendado aprender e usar essa sintaxe mais recente.

#### [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

É a linguagem de marcação utilizada na web. Basicamente são os elementos que compõem as interfaces (botões, inputs, textos, imagens, etc).

#### [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

É a linguagem utilizada para estilizar os elementos HTML.

#### [React](https://reactjs.org/)

É a principal biblioteca utilizada para o desenvolvimento das interfaces. Tem sido bastante adotada por grandes empresas e possui uma boa documentação e vários tutoriais para se basear.

#### [Sass](https://sass-lang.com/)

Podemos pensar no Sass como uma extensão do CSS. É uma linguagem que adiciona algumas features no CSS como variáveis, regras aninhadas e funções.

#### [Docker](https://docs.docker.com/)

Docker é a plataforma que nos permite rodar aplicações em containers. Cada container em geral roda 1 serviço/processo e fica isolado dos outros serviços. O Docker é útil pra gente pois permite que cada serviço (backend, frontend e banco de dados) seja controlado separadamente e permite que esses serviços rodem da mesma maneira em qualquer lugar. Além disso, conseguimos ter diferentes versões de serviços para cada ambiente: `desenvolvimento`, `teste`, `ci` e `produção`.

#### [Express](https://expressjs.com/)

É o framework backend mais utilizado no ecossistema do Node.js. É bem flexível e se encaixa bem com o nosso banco de dados.

#### [MongoDB](https://www.mongodb.com/)

É um banco de dados NoSQL (baseado em documentos) e é super flexível para aceitar mudanças no schema dos modelos do banco, por exemplo, o que evita problemas de migração que ocorrem com bancos de dados relacionais.

## Decisões de Design

**TL;DR** - O design do projeto pode ser acessado [aqui](https://www.figma.com/file/gVxe0hr8PU7uLFWkrlFDlA/Ales-Demo?node-id=0%3A1).

É bem recomendado dar uma olhada rápida pra ter uma noção melhor dos fluxos de páginas e utilização de componentes. Não está super atualizado mas ajuda a ter um panorama geral.

## Rodando Localmente

1. É recomendado rodar os serviços com [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/). Portanto, instale essas ferramentas na sua máquina. Caso prefira rodar sem Docker, será necessário instalar [Node.js](https://nodejs.org/en/) e [MongoDB](https://www.mongodb.com/3).

2. Clone o repositório

3. Crie uma pasta `.env` na raiz do projeto

4. Dentro de `.env`, crie uma pasta `dev` e adicione os seguintes arquivos com os seus respectivos conteúdos:

> Substitua o que estiver entre chaves {} com os valores corretos de acordo com o ambiente de desenvolvimento

- `db.env`

  - MONGO_INITDB_ROOT_USERNAME={username}
  - MONGO_INITDB_ROOT_PASSWORD={password}

- `db-admin.env`

  - ME_CONFIG_MONGODB_ADMINUSERNAME={admin_username}
  - ME_CONFIG_MONGODB_ADMINPASSWORD={admin_username}
  - MONGO_INITDB_DATABASE={db_name}

- `app.env`

  - MONGO_INITDB_ROOT_USERNAME={username}
  - MONGO_INITDB_ROOT_PASSWORD={username}

  - MONGO_DATABASE={database_name}
  - MONGO_HOSTNAME=db

  - TOKEN_SECRET={token-secret}
  - REFRESH_TOKEN_SECRET={refresh-token-secret}

    <!-- valores do usuário padrão criado ao subir o serviço -->

  - INIT_USER=alessauro
  - INIT_PASSWORD=admin
  - INIT_EMAIL=alessauro@mail

  - EMAIL_HOST={email-host}
  - EMAIL_PORT={email-port}
  - EMAIL_FROM={email-from}
  - EMAIL_USER={email-user}
  - EMAIL_PASSWORD={email-password}

  - PORT={port}
  - UI_URL={ui_url}
  - DOMAIN={domain}

  > As variáveis relacionadas a email só são necessárias se se pretende utilizar email no ambiente de desenvolvimento

  > EMAIL_HOST, EMAIL_PORT, EMAIL_USER and EMAIL_PASSWORD podem ser obtidos pelo [Mail Trap](https://mailtrap.io/). Crie uma conta sua pra obter esses dados

  > TOKEN_SECRET e REFRESH_TOKEN_SECRET podem ser gerados pelo comando `require('crypto').randomBytes(64).toString('hex')` no Node.js (ou em algum site que gere strings hexadecimais e aleatórias de pelo menos 64 caracteres)

- `ui.env`

  - REACT_APP_API_URL={api-url}

> Em desenvolvimento será http://localhost:8000/api

5. Builde os serviços rodando `docker-compose build` na raiz do projeto

6. Inicie os serviços rodando `docker-compose up`

> Adicione a flag `-d` para rodar os serviços em background

7. Se tudo parecer certo, abra o seu navegador em `localhost:3000` para acessar a interface. O backend deve estar rodando em `localhost:8000/api` e o painel admin do MongoDB em `localhost:9001`.

## Como posso contribuir?

### Ferramentas Recomendadas

#### [Visual Studio Code](https://code.visualstudio.com/)

#### Git

- [Git Bash](https://gitforwindows.org/) (se você usa Windows)
- Git Graph
- Git Lens

#### Code Linting (plugins do VS Code)

- Visual Studio IntelliCode
- ES Lint
- Prettier
- Auto Close Tag
- Bracket Pair Colorizer

### Primeiro Commit

Finalmente esse momento chegou \o/

Agora é a hora de botar a mão na massa! Nessa seção nós mostramos um exemplo muito simples do que poderia ser o seu primeiro commit no projeto. O exemplo apenas muda o título da aba da página aberta no navegador para `Meu Primeiro Commit`

1. Abra o projeto num editor de texto (recomendado utilizar o VS Code).

2. Veja em qual `branch` você está. Se você acabou de clonar o repositório, então você deve estar na `master`.

3. Tenha certeza que sua branch esteja atualizada rodando:

```
git pull
```

4. Agora crie uma nova branch a partir da `master` com:

```
git checkout -b ref/change-browser-window-name
```

> A flag `-b` permite que você crie e mude pra nova branch no mesmo comando

5. Agora abra o arquivo `frontend/public/index.html` e mude o conteúdo da tag `<title>` para `<title>Meu primeiro commit</title>`

6. Após isso você já pode commitar as suas mudanças. Pra fazer isso, primeiro faça:

```
git add .
```

para adicionar todas as mudanças (nesse caso apenas 1) para _staging_.

7. E agora faça:

```
git commit -m "ref: change browser window name in my first commit"
```

8. Agora suba a sua mudança pro Github:

```
git push --set-upstream origin ref/change-browser-window-name
```

> Obs: se você já deu rodou o comando acima em algum outro momento nessa branch, então apenas `git push` deve ser suficiente

### Primeiro Pull Request

Agora que temos nossas mudanças, precisamos mergeá-las na `master`. Fazemos isso com [Pull Requests](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests).

Assim que você subir as suas mudanças pro Github, abra a página do repositório no Github e clique em `Comparar & Pull Request`. Isto fará com que você seja redirecionado pra página de criação de um novo Pull Request.

É sempre legal adicionar uma descrição no seu Pull Request explicando sobre as mudanças que você fez e casos de testes pra quem for revisar seguir. Na pasta `.github` nós temos um template de descrição de Pull Request que é adicionado automaticamente ao abrir um Pull Request. Agora você só precisa atualizar as informações, criar o Pull Request e pedir pra alguém revisá-lo :) Aprovado o seu Pull Request, ele pode então ser mergeado na `master` e logo em seguida será atualizado automaticamente no servidor.

## Testes

Por enquanto, há apenas testes para o `backend`. Eles estão separados em:

- `models`
- `services`
- `controllers`

São usadas as seguintes dependências para escrever e rodar os testes:

- [Jest](https://jestjs.io/)
- [Sinon](https://sinonjs.org/)
- [Supertest](https://github.com/visionmedia/supertest)

`jest` é responsável por rodar de fato os testes. `sinon` e `supertest` são usados para testar _mocking_ de funções e simular chamadas _http_.

Todos os testes devem estar dentro de uma pasta `__tests__`, porque são nessas pastas que o `jest` vai procurar pelos testes (tente sempre colocar junto com os arquivos que estão sendo testados).

Você pode rodar os testes localmente na sua máquina ou pelo Github Actions.

### Localmente

Para rodar os testes localmente, há um arquivo [docker-compose](https://docs.docker.com/compose/) chamado `docker-compose.test.yml`. Como precisamos de uma instância do `MongoDB` pra rodar todos os testes, esse arquivo facilita na hora de subir os serviços.

Então tudo o que precisamos é:

1. Crie uma pasta `test/` dentro de `.env/`

2. Crie os arquivos `app.env` e `db.env` dentro de `test/`. `db.env` deve ter as variáveis `MONGO_INITDB_ROOT_USERNAME` e `MONGO_INITDB_ROOT_PASSWORD` e o arquivo `app.env` deve ter as variáveis:

- MONGO_INITDB_ROOT_USERNAME={username}
- MONGO_INITDB_ROOT_PASSWORD={password}

- MONGO_DATABASE={database_name}
- MONGO_HOSTNAME=db

- TOKEN_SECRET={token-secret}
- REFRESH_TOKEN_SECRET={refresh-token-secret}
- PORT={port}

3. Rode o comando:

```sh
docker-compose -f docker-compose.test.yml up backend
```

> Esse comando vai subir uma instância (container) de cada serviço (MongoDB e backend) e vai executar o comando `yarn test`, que por sua vez roda o `jest`

> Você deve ser capaz de ver no log a execução dos testes e os seus resultados

### Integração Contínua

O repositório também está configurado para rodar os testes de forma automática. Nós usamos o [Github Actions](https://docs.github.com/en/actions) para isso.

Por enquanto, uma nova pipeline de testes será executada a cada novo Pull Request aberto (que aponte para a `master`). Se o Pull Request é atualizado com novos commits, então uma nova pipeline será executada.

> A configuração da pipeline é feita no arquivo `.github/workflows/ci.yml`.
