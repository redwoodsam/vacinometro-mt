"""

Módulo responsável por realizar o Webscraping no site da SES e retornar os dados da população vacinada em JSON

"""
from dotenv import load_dotenv
load_dotenv()
from platform import platform
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import platform
import os
import time

operating_system = platform.system()

# Variables to run Heroku's Selenium buildpack
GOOGLE_CHROME_PATH = os.getenv('GOOGLE_CHROME_BIN')
CHROMEDRIVER_PATH = os.getenv('CHROMEDRIVER_PATH')

def _get_webdriver():
    if operating_system == 'Windows':
        return os.path.join(os.path.dirname(os.path.realpath(__file__)), 'webdriver', 'chromedriver_win.exe')

    elif operating_system == 'Linux':
        return os.path.join(os.path.dirname(os.path.realpath(__file__)), "webdriver","chromedriver_lnx")

    else:
        raise Exception("Sistema não compatível.")


async def scrape(url: str) -> dict:

    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument('--no-sandbox')

    driver = webdriver.Chrome(_get_webdriver(), options=options)

    try:
        result = {
            "quantidadePrimeiraDose": "",
            "porcentagemPrimeiraDose": "",
            "quantidadeSegundaDose": "",
            "porcentagemSegundaDose": "",
            "quantidadeDoseReforco": "",
            "porcentagemDoseReforco": ""
        }

        driver.get(url)
        time.sleep(5)
        
        dados_originais = driver.find_elements_by_xpath('//div[@class="card"]/div[@class="cardItemContainer"]/div[@class="caption"]')

        #Caso os dados venham vazios
        if not dados_originais:
            return "Erro ao obter dados da fonte: resposta vazia."

    
        #Tradando os dados, retirando os separadores de milhar.
        dados_tratados = []

        for dado in dados_originais:
            dado_tratado = dado.text.replace(',', '')
            dados_tratados.append(dado_tratado)


        result["quantidadePrimeiraDose"] = dados_tratados[0]
        result["quantidadeSegundaDose"] = dados_tratados[1]
        result["quantidadeDoseReforco"] = dados_tratados[2]


        driver.close()

        return result


    except Exception as e:
        driver.close()
        raise e

