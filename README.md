# FarmCheck

FarmCheck este o platformă ce urmareşte rezolvarea problemelor de comunicare în cadrul unui teren agricol, dar şi monitorizarea şi automatizarea procesului de a îl întreţine. În cadrul proiectului FarmCheck, utilizatorii au acces de a îşi indexa personalul fermelor sale şi a organiza sarciniile acestora, prin sistemul de chat sau cel de taskuri.

Pentru a monitoriza un teren agricol, oferim o soluţie IoT, printr-un senzor care trimite în timp real date cum ar fi temperatura sau umiditatea a solului şi a aerului, informaţiile fiind afişate pe aplicaţia platformei.
Datorită interfeţei intuitive, publicul nostru ţintă este orice persoana care deţine un teren agricol şi îşi doreşte să beneficieze de funcţionalităţiile şi soluţiile noastre pentru administrarea acestuia.

De asemenea, FarmCheck devine un ajutor semnificativ pentru cineva nou în agricultură, întrucât oferim informaţii generale, dar şi despre cultivarea a 40 de plante.

FarmCheck reprezintă o inovaţie în cadrul digitalizării agriculturi, întrucât nimeni nu a mai dezvoltat un produs cu un cost atât de mic, dar o utilitate atât de mare şi o aplicaţie care poate fi folosită de oricine.

## Funcţionalităţi
* Conectarea cu un senzor şi primirea de date în timp real
* Administrarea angajaţiilor unei ferme
* Atribuirea de sarcini a angajaţiilor
* Camere de chat în cadrul unei ferme
* Pagina "CropWiki", unde oferim informaţii referitoare la o mulţime de plante

## Cum instalezi un senzor unei ferme
În primul rând, va trebui sa creezi un nou senzor fermei unde doreşti să instalezi senzorul. Odată creat in baza de date, vei primi codul de acces.

Odată deschis, daca produsul nu este conectat, acesta va deschide un punct de acces. Odată conectat la punctul de acces, vei fi redirecţionat pe o pagină web, unde eşti nevoit să conectezi senzorul la o reţea WiFi şi să introduci codul generat mai devreme. Odată ce trimiţi formularul, senzorul va începe să trimită date.

## Tehnologii folosite
* Backend: Spring Boot, întrucât este un framework ce oferă un mod uşor de a te folosi de cele mai noi tehnologii, cum ar fi WebSockets
* Bază de date:
    1. PostgreSQL - folosită pentru persistenţa de date cu o importanţă mai mare, cum ar fi informaţiile unui utilizator. Această bază de date relaţională este una dintre cele mai populare alegeri când vine vorba de persistenţa de date, având titlul de "cea mai avansată bază de date"
    2. Redis - folosită pentru stocarea datelor care necesită persistenţă într-un volum mai mare şi au o importanţă redusă. Redis oferă o modalitate mai rapidă de salvare, folosindu-se de hashuri, astfel devine opţiunea optimă pentru stocarea datelor primite de la senzor, sau al mesajelor din camerele de chat.
* Frontend: React Native, scris în limbajul TypeScript, pentru dezvoltarea aplicaţiei de mobil. Acest framework oferă o modalitate scalabilă de a devolta aplicaţii cross-platform (Android & IOS) pentru telefoane inteligente.
* Arduino IDE: Un environment sigur, stabil, dar şi intuitiv pentru a dezvolta codul pus pe microcontrollerul ESP32 al senzorului.

## Experienţa personală cu acest proiect

Tatăl meu a avut nevoie de o modalitate de a îşi administra terenul agricol de la distanţă. Astfel, acesta a experimentat utilitatea proiectului Farmcheck, instalându-şi un senzor şi visualizând informaţiile trimise direct de acasă, terenul aflându-se la o distanţă de aproximativ 20 de kilometri de casa noastră. Acesta mi-a oferit încrederea în a considera proiectul o adevărată inovaţie, spunându-mi cât de uşor a fost de folosit, dar şi cât de util.
