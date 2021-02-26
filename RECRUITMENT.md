# Recrutamento

### Descrição

Este documento visa explicar o fluxo básico e roadmap das funcionalidades pra automatizar os Processos Seletivos do ALES utilizando a API do Google Calendar.

### Por que?

Pelo que a gente já experienciou em Processos Seletivos passados, a parte mais estressante e cansativa sempre acaba sendo a alocação dos candidatos nos horários de entrevista disponíveis. Sempre há conflitos e imprevistos, o que acaba tornando o trabalho muito manual e repetitivo. Por isso a ideia de automatizar pelo menos essa parte (e quem sabe outras partes no futuro).

### Criando um novo Processo Seletivo

Aqui queremos apenas as informações básicas de um processo de recrutamento como: `nome`, `descrição`, `início` e `fim`.
Além disso, como usamos bastante o Google Calendar (não só para o processo mas para outros projetos do ALES), configuramos o site para que ele crie um novo calendário no Google Calendar com o mesmo nome do Processo Seletivo criado.

### Editando um Processo Seletivo

A única coisa configurada por enquanto é a possibilidade de editar o nome do calendário criado no Google Calendar. Como queremos criar e editar os eventos (as entrevistas no caso), então é muito mais fácil de fazer isso diretamente pelo Google Calendar do que refazer tudo isso no site. Então a ideia é que o site apenas puxe os dados da API do Calendar e mostre na interface do site.

## API do Google Calendar

### Criando um projeto

Pra ser capaz de interagir com a API do Google Calendar (com qualquer API do Google na verdade) você precisa criar um projeto no [Google Developer Console](https://console.developers.google.com/project). Depois disso, procure pela API do Calendar na biblioteca de APIs e ative essa API. E por fim, crie as credenciais para o `backend` do site poder acessar a API. Existem 2 tipos de credenciais: `OAuth2` e `Account Service`. OAuth2 é sempre associado com permissões de usuários (geralmente login ou leitura de dados) e faz sentido usar quando temos que lidar com esses tipos de permissões. Account Service é útil quando queremos que um serviço utilize e acesse alguma API do Google de forma transparente pro usuário, que é o que queremos aqui. Então crie uma credencial desse tipo (só é necessário fazer esse passo 1 vez).

### Listando os eventos

Na página de detalhe de um Processo Seletivo, são listados todos os eventos que foram criados no Calendar separados por data. Essa página foi pensada apenas como um lugar onde se consegue ter um panorama geral das entrevistas.

### Configurando as credenciais no site

Uma vez que você tem as credenciais, apenas faça o download como um arquivo `.json` e coloque esse arquivo na pasta `backend`. Feito isso, você vai precisar adicionar 2 novas variáveis de ambiente:

- GOOGLE_APPLICATION_CREDENTIALS=/usr/src/app/{file-name} (recomendado nomear como `google-credentials.json`, caso contrário mudar no `.gitignore`)
- CALENDAR_EMAIL={your-email}

> Adicione em `dev/app.env` pra testar e se deu certo e quiser testar em produção adicione em `prod/app.env`

> CALENDAR_EMAIL é o email que será owner de todos os calendários criados na aplicação (recomendado usar um email do ALES)

## Roadmap

Por enquanto ainda não resolvemos o problema de alocação de entrevistas. Então a ideia é continuar trabalhando nessas features para que no próximo PS já seja possível utilizar o site pra essa etapa. Como uma referência de roadmap (ideias pensadas mas não implementadas ainda e que podem ser mudadas), podemos ter:

1. Adição dos candidatos alocados pra entrevista (pode ser via anexo de uma planilha do Google Forms, por exemplo)

2. Com os candidatos adicionados e as entrevistas criadas (eventos no Calendar), podemos criar uma tela com todos os horários disponíveis (puxando os dados do Calendar) e mandar o link com um token único pros candidatos por email pra eles escolherem um desses horários. Escolhido um horário, o candidato já poderia ser convidado automaticamente no evento do Calendar.

3. Seria interessante também se o candidato pudesse de alguma forma indicar na página que nenhum dos horários listados é o ideal pra ele. Nesse caso o recrutador poderia combinar com ele de forma manual.
