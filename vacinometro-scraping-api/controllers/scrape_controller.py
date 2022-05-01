import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(__file__)))


from app.scraper import scrape
from app.utils.calcular_porcentagem import porcentagem
from database.model.dado_model import DadoDiarioModel

async def controller():

    dado_diario =  DadoDiarioModel()

    scrape_result = await scrape('https://app.powerbi.com/view?r=eyJrIjoiZjcxYTg3NjUtNjZlZS00MDM0LWFlMmMtZGQwNWM2YTZmZmY0IiwidCI6ImNkMWVlZGQ2LTgyMjktNDM1Zi05YmQ1LWM2OWFiZDgxNzMzNyJ9&pageName=ReportSectiona873fea431fb7743d9b4')

    # Calculando a porcentagem das doses baseada na população total de MT.
    populacao_mt = 3567234
    scrape_result["porcentagemPrimeiraDose"] = str(porcentagem(scrape_result["quantidadePrimeiraDose"], populacao_mt))
    scrape_result["porcentagemSegundaDose"] = str(porcentagem(scrape_result["quantidadeSegundaDose"], populacao_mt))
    scrape_result["porcentagemDoseReforco"] = str(porcentagem(scrape_result["quantidadeDoseReforco"], populacao_mt))

    completion_message = await dado_diario.insert_data(scrape_result)

    return completion_message
