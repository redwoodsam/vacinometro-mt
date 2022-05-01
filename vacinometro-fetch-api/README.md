## Vacinômetro MT - Fetch API

API responsável por servir o front-end com os dados extraídos  pela Scraping API.

# Rotas:

- GET /api/latestdata - Retorna os dados mais recentes da vacinação;
- GET /api/last24hours - Retorna a quantidade de doses aplicadas nas últimas 24 horas;
- GET /api/historydata - Retorna todos os dados da vacinação salvos no banco de dados desde o primeiro registro, em ordem decrescente.
 
# Requisitos para instalação

- PHP versão 8 (ou acima) instalado com as seguintes extensões habilitadas (para verificar, pode utilizar o phpinfo):
	- OpenSSL;
	- PDO;
 	- Mbstring;
 	
- Gerenciador de pacotes Composer instalado - https://getcomposer.org/doc/00-intro.md#system-requirements/


# Instalação:


- Clone o repositório;
- Dentro da pasta baixada, execute o comando **php composer.phar update** (ou **composer update**, dependendo de como a instalação foi realizada) para instalar todas as dependências do projeto;
- Renomeie o arquivo **.env.example** para **.env** e preencha os campos DB_* com os dados de acesso de seu banco de dados utilizado na Scraping API;
- Execute o comando **php -S localhost:<Porta de sua escolha> -t public** para iniciar a aplicação;
-------------------------------------------------------------------

API responsible for serving the front-end with the data extracted by the Scraping API.

# Routes:

- GET /api/latestdata - Returns the latest vaccination data;
- GET /api/last24hours - Returns the amount of shots given in the last 24 hours;
- GET /api/historydata - Returns all vaccination data saved in the database since the first record, in descending order.
 
# Installation requirements:

- PHP version 8 (or above) installed with the following extensions enabled (to check, you can use phpinfo):
	- OpenSSL;
	- PDO;
	- Mbstring;
 
- Composer package manager installed - https://getcomposer.org/doc/00-intro.md#system-requirements/


# Installation:

- Clone the repository;
- Inside the downloaded folder, run **php composer.phar update** (or **composer update**, depending on how the installation was performed) command  on your Terminal/CMD to install all project dependencies;
- Rename the **.env.example** file to **.env** and fill in the DB_* fields with the access data of the database database used by the Scraping API;
- Run **php -S localhost:<Port of your choice> -t public** command on your Terminal/CMD to start the application;


