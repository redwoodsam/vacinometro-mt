# Vacinometro Covid-19 MT Web App
## Demo: https://vacinometro-mt.netlify.app/

Dashboard que mostra o progresso da campanha de vacinação da Covid-19 no estado de Mato-Grosso. Suas informações são atualizadas de forma automática através de um script Selenium que consulta diariamente os dados da Secretaria de Saúde do Estado.

Essa aplicação consiste em duas API's independentes e um front-end:

- Scraping API - Uma API feita com Flask que dispara um script Selenium que coleta os dados do site da Secretaria de Saúde do estado e o armazena em um banco de dados PostgreSQL.

- Fetch API - Uma API feita com Lumen que consulta os dados guardados no banco de dados, os processa e os disponibiliza em suas rotas para o front-end consumir.

- Front-end - A página principal do site, feita utilizando ReactJS.

----------------------------------------------------------------------------------------------

Dashboard that shows the progress of Covid-19 vaccination campaign in Brazil's State of Mato-Grosso. The information is automatically updated through  a Selenium web scraping that fetches local Health Secretary's Power BI public dashboard and stores the data in a database for history matters.

It consists of two independent APIs and a front-end:

- Scraping API - A API made with Flask that fires a Selenium script to retrieve the data from Mato-Grosso Health Secretary website and store in a PostgreSQL database.

- Fetch API - A API made with Lumen that retrieves the data stored on the database, processes and make it available to the frontend to get it.

- Front-End - The front-end page made with ReactJS.
