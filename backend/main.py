from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
app = FastAPI()

@app.get("/")
def root():
    return {"missatge": "Hola, món!"}

@app.get("/cartas/{id}")
def obtenir_carta(id: int):
    # Dades simulades (més endavant es llegiran de fitxer)
    cartes = [
        {"id": 1, "remitent": "Maria", "contingut": "Hola, com estàs?"},
        {"id": 2, "remitent": "Joan", "contingut": "T'escric des del passat."}
    ]
    for c in cartes:
        if c["id"] == id:
            return c
    #return {"error": "Carta no trobada"}, 404
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Carta no trobada")

@app.get("/cartas")
def llistar_cartes(limit: int = 3, offset: int = 3):
    cartes = [
        {"id": 1, "remitent": "Maria", "contingut": "Hola, com estàs?"},
        {"id": 2, "remitent": "Joan", "contingut": "T'escric des del passat."},
        {"id": 3, "remitent": "Anna", "contingut": "Espero que estiguis bé."},
        {"id": 4, "remitent": "Pere", "contingut": "Tinc una sorpresa per a tu."},
        {"id": 5, "remitent": "Laura", "contingut": "Recorda el nostre viatge."},
        {"id": 6, "remitent": "Marc", "contingut": "T'espero a la festa."},
        {"id": 7, "remitent": "Sofia", "contingut": "He trobat una cosa interessant."},
        {"id": 8, "remitent": "David", "contingut": "No oblidis la reunió de demà."},
        {"id": 9, "remitent": "Clara", "contingut": "T'envio una foto del lloc."},
        {"id": 10, "remitent": "Jordi", "contingut": "Ens veiem aviat!"}
        # Afegeix més dades de prova si vols
    ]
    return cartes[offset:offset+limit]

class Carta(BaseModel):
    remitent: str
    destinatari: str
    contingut: str
    personatge: str    # per a la IA (de moment pot ser opcional)

cartes = []

@app.post("/cartas")
def crear_carta(carta: Carta):
    nova_carta = carta.dict()          # converteix el model a diccionari
    nova_carta["id"] = len(cartes) + 1  # assigna un ID únic
    cartes.append(nova_carta)
    return nova_carta
