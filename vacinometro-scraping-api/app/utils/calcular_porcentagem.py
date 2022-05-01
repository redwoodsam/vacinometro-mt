"""
Função responsável por conseguir a porcentagem de um valor dado um número total através da regra de 3 simples.
"""
def porcentagem (valor_especifico, valor_total) -> str:
    try:
        valor_especifico_convertido = int(valor_especifico)
        valor_total_convertido = int(valor_total)

        resultado = (valor_especifico_convertido * 100) / valor_total_convertido

        return "{:.2f}".format(resultado)

    except TypeError as e:
        raise e
