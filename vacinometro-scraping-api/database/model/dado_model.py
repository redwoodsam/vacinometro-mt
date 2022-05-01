from sqlalchemy import Column, BigInteger, Identity, REAL, DateTime, and_
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from database.db_engine_factory import generate_engine
import datetime

Base = declarative_base()

class DadoDiarioModel(Base):

    engine = generate_engine()

    __tablename__ = 'vacinacao_mt'

    id = Column(BigInteger, Identity(start=1, cycle=True), primary_key=True)
    qtdPrimeiraDose = Column(BigInteger, nullable=False)
    porcentagemPrimeiraDose = Column(REAL)
    qtdSegundaDose = Column(BigInteger, nullable=False)
    porcentagemSegundaDose = Column(REAL)
    qtdDoseReforco = Column(BigInteger, nullable=False)
    porcentagemDoseReforco = Column(REAL)
    dataAtualizacao = Column(DateTime, default=datetime.datetime.now())

    def __init__(self, **kwargs):
        super().__init__()
        Base.metadata.create_all(self.engine)

        if kwargs:
            self.qtdPrimeiraDose = kwargs['qtdPrimeiraDose']
            self.porcentagemPrimeiraDose = kwargs['porcentagemPrimeiraDose']
            self.qtdSegundaDose = kwargs['qtdSegundaDose']
            self.porcentagemSegundaDose = kwargs['porcentagemSegundaDose']
            self.qtdDoseReforco = kwargs['qtdDoseReforco']
            self.porcentagemDoseReforco = kwargs['porcentagemDoseReforco']

    async def insert_data(self, scrape_result: dict):

        Session = sessionmaker(bind=self.engine)
        session = Session()

        if not scrape_result:
            raise Exception("Erro ao inserir dados: o objeto scrape_result não pode ser nulo")

        result_message = {"message": "O banco de dados já está atualizado!"}

        try:

            dado_existente = session.query(DadoDiarioModel).filter( and_(

                DadoDiarioModel.qtdPrimeiraDose == scrape_result["quantidadePrimeiraDose"],
                DadoDiarioModel.porcentagemPrimeiraDose == scrape_result["porcentagemPrimeiraDose"], 
                DadoDiarioModel.qtdSegundaDose == scrape_result["quantidadeSegundaDose"], 
                DadoDiarioModel.porcentagemSegundaDose == scrape_result["porcentagemSegundaDose"], 
                DadoDiarioModel.qtdDoseReforco == scrape_result["quantidadeDoseReforco"], 
                DadoDiarioModel.porcentagemDoseReforco == scrape_result["porcentagemDoseReforco"]
            
            ) ).first()

            if not dado_existente:
                dado = DadoDiarioModel(
                    qtdPrimeiraDose=scrape_result["quantidadePrimeiraDose"], 
                    porcentagemPrimeiraDose=scrape_result["porcentagemPrimeiraDose"], 
                    qtdSegundaDose=scrape_result["quantidadeSegundaDose"], 
                    porcentagemSegundaDose=scrape_result["porcentagemSegundaDose"], 
                    qtdDoseReforco=scrape_result["quantidadeDoseReforco"], 
                    porcentagemDoseReforco=scrape_result["porcentagemDoseReforco"]
                )

                session.add(dado)

                # insert the data into the database
                session.commit()

                result_message["message"] = "Dados salvos com sucesso!"

            session.close()
            return result_message
        
        except Exception as e:
            session.close()
            raise Exception(f"Erro ao inserir dados no banco: {e.args}")


    
    


    