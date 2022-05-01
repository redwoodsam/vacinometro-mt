## Vacinometro Covid-19 MT - Scraping API

API responsável por acionar o script de Web Scraping para a consulta dos dados da vacinação contra o Covid-19 no Estado de Mato-Grosso.

Para executá-la, siga os seguintes passos:

- Clone o repositório;
- Verifique se o seu computador possui instalado o interpretador Python, de preferência a versão 3.7 e navegador Google Chrome versão 101. Caso negativo, instalar;
- Navegar até a pasta do projeto e executar o comando **pip install -r requirements.txt**;
- Renomear o arquivo **.env.example** para **.env** e inserir os dados de acesso ao seu banco de dados PostgreSQL.
- Por fim, executar o comando **gunicorn wsgi:app** para iniciar a aplicação;


API responsible for firing a Web Scraping script for getting the Covid-19 vaccination data in the State of Mato-Grosso(Brazil).

To run it, please follow the steps below:

- Clone repository;
- Make sure your computer has Python interpreter installed, preferably version 3.7 and Google Chrome browser version 101. If don't, please do install;
- Browse into the project folder and run *pip install -r requirements.txt** command;
- Rename **.env.example** to **.env** and fill it with your PostgreSQL database credentials.
- To finish, run **gunicorn wsgi:app** to start the application.