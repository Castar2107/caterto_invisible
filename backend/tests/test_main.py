import pytest
from httpx import ASGITransport, AsyncClient
from main import app
import json

@pytest.mark.asyncio
async def test_root():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/")
        assert response.status_code == 200
        assert response.json() == {"missatge": "Hola, món!"}

@pytest.mark.asyncio
async def test_obtenir_carta():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/cartas/1")
        assert response.status_code == 200
        assert response.json() == {"id": 1, "remitent": "Maria", "contingut": "Hola, com estàs?"}

@pytest.mark.asyncio
async def test_obtenir_carta_no_trobada():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/cartas/999")
        assert response.status_code == 404
        assert response.json() == {"detail": "Carta no trobada"}       

@pytest.mark.asyncio
async def test_get_cartes_paginades():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/cartas?limit=1&offset=0")
        assert response.status_code == 200
        assert len(response.json()) == 1
        
@pytest.mark.asyncio
async def test_get_carta_by_id():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/cartas/1")
        assert response.status_code == 200
        assert response.json()["id"] == 1

        response = await ac.get("/cartas/999")
        assert response.status_code == 404    
        


@pytest.mark.asyncio
async def test_persistencia_post():
    with open("cartas.json", "r") as f:
        dades_abans = json.load(f)

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        payload = {"remitent": "Test", "destinatari": "Test", "contingut": "Test", "personatge": "Test"}
        await ac.post("/cartas", json=payload)

    with open("cartas.json", "r") as f:
        dades_despres = json.load(f)

    assert len(dades_despres) == len(dades_abans) + 1

@pytest.mark.asyncio
async def test_delete_carta():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.delete("/cartas/1")
        assert response.status_code == 200

    with open("cartas.json", "r") as f:
        dades = json.load(f)
    assert not any(c["id"] == 1 for c in dades)    

@pytest.mark.asyncio
async def test_cors_headers():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/cartas", headers={"Origin": "http://127.0.0.1:5500"})
        assert "access-control-allow-origin" in response.headers

@pytest.mark.asyncio
async def test_get_cartes():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/cartas")
        assert response.status_code == 200
        assert isinstance(response.json(), list)