# Příručka
### Testovací aplikace 
(Heroku uspává aplikaci po delší neaktivitě, takže první požadavek může trvat déle)

#### Frontend
https://project-apollo-dp.herokuapp.com/

**Testovací uživatel**
- Uživatelské jméno: test 
- Heslo: test

##### Přidání senzoru
Podporované formáty JSON, TEXT a hexadecimální binární podoba.

1. Přidání senzoru, vyplnění identifikátoru a nastavení mapperů.
2. Nastavení sensorIdMapper pro rozponání sensoru. Určuje jak má aplikace najít indentificator, aby byl senzor rozpoznán.

#### Backend API 
https://project-icarus-dp.herokuapp.com/

##### Struktura API 
https://app.swaggerhub.com/apis-docs/mmericus/diplomova-prace/1.0.0

##### Zasílání dat
Data se zasílají na endpoint POST APIURL/datasource s jedním z podporovaných Content-Type v hlavičce (text/plain, application/json, application/octet-stream) a data v body podle definovaných mapperů.

**Příklad**
~~~~
POST http://project-icarus-dp.herokuapp.com/datasource
Content-Type application/json
{ "id": "test123456", "value": 10}
~~~~

## Instalace
### Požadavky
Node.js v8.12.0

npm 6.4.1

yarn 1.12.3

MongoDB
### Backend
Mapa API: https://app.swaggerhub.com/apis-docs/mmericus/diplomova-prace/1.0.0
#### Nastavit promenne v app/config/env nebo v prostředí
    OPT_APP_PORT (na jakem portu poběží aplikace)
    IOT_APP_JWT_SECRET (secret pro JSON web token)
    IOT_APP_JWT_EXPIRATION (životnost tokenu)
    IOT_APP_MONGO_URL (mongodb://localhost:PORT/myapp nebo produkce například mongodb+srv://USERNAME:PASSWORD@URL_CLUSTERU/test?retryWrites=true) 

Pro vytvoření hlavního administrátora lze jednou provolat endpoint /create-init. Následně bude vytvořen účet s následujícími údaji:

- uživatelské jméno: administrator                                                                                                           
- heslo: rE$eeb4w45

!!! Tento endpoint lze zavolat pouze jednou a neprodleně poté je nutné změnit heslo !!!!

#### Instalace 
    yarn
#### Spuštění
    yarn build
    yarn start
    yarn dev // development
#### Testy
    yarn eslint
    yarn flow
    yarn test

### Frontend
Nastavit proměnné buď v .env souboru nebo v prostředí
   
    API_BASE_URL (URL backend API)
    
    #Stačí vyplnit jeden z tokenů pro mapu
    GOOGLE_MAP_TOKEN (Google map token)
    MAPBOX_TOKEN (Mapbox token)

#### Instalace 
    yarn
#### Spuštění
    yarn build
    yarn start
    yarn dev // development
#### Testy
    yarn eslint
    yarn flow
    yarn test
License
----

MIT

