# Lern-Periode 10

25.4 bis 27.6

## Grob-Planung

1. Welche Programmiersprache möchten Sie verwenden? Was denken Sie, wo Ihre Zeit und Übung am sinnvollsten ist?
   - Ich möchte mich mit JavaScript und node.js arbeiten.
   
3. Welche Datenbank-Technologie möchten Sie üben? Fühlen Sie sich sicher mit SQL und möchten etwas Neues ausprobieren; oder möchten Sie sich weiter mit SQL beschäftigen?
   - Ich möchte mich weiter mit SQL beschäftigen, weil ich noch nicht so sattelfest bin und MongoDB im Moment noch sehr schwierig ist.
   
5. Was wäre ein geeignetes Abschluss-Projekt?
   - Als Abschluss-Projekt möchte ich eine Webseite erstellen, die Star Wars Filme und Serien, sowie deren Erscheinungsjahre und Beschreibungen aus einer SQL Datenbank lädt und auf einer Webseite anzeigt.
   - Auf der Webseite kann man neue Filme hinzufügen, bestehende bearbeiten oder löschen.
   - Auf der Webseite kann man nach Namen oder Erscheinungsjahr sortieren und filtern.

## 25.4

Welche 3 *features* sind die wichtigsten Ihres Projektes? Wie können Sie die Machbarkeit dieser in jeweils 45' am einfachsten beweisen?

- [ ] *make or break feature* 1: Kann ich Bilder in einer SQL speichern und laden?
- [ ] *make or break feature* 2: Kann ich mit JavaScript Inhalte nach Zahlen sortieren?
- [ ] *make or break feature* 3: Kann ich mit node.js Inhalte nach Worten filtern?

✍️ Heute habe ich viele Entscheidungen getroffen. Nachdem ich meine Idee aufgeschrieben habe, habe ich eine SQL DB erstellt und herausgefunden, wie ich darin Bilder speichern kann. Dann habe ich mit Herrn Colic besprochen, ob ich mit ASP.NET oder node.js programmieren soll. Ich habe mich für node.js entschieden und ein Einführung auf w3schools durchgelesen. Anschliesend fragte ich mich, ob ich SQL oder MongoDB verwenden soll. Nachdem ich dies mit Herrn Colic besprochen habe, habe ich mich mit MongoDB beschäftigt. Ich denke ich werde mit SQL arbeiten, weil wir noch keine Einführung in MongoDB hatten. (93 Wörter)

☝️ Vergessen Sie nicht, den Code von heute auf github hochzuladen. Ggf. bietet es sich an, für die Code-Schnipsel einen eigenen Ordner `exploration` zu erstellen.

## 2.5

Ausgehend von Ihren Erfahrungen vom 25.4, welche *features* brauchen noch mehr Recherche? (Sie können auch mehrere AP für ein *feature* aufwenden.)

- [x] Ich verbinde node.js mit der SQL Datenbank
- [ ] Ich lade mit node ein Bild aus der Datenbank und zeige es auf der Webseite an
- [ ] Ich filtere eine Charakter-Liste mit node.js nach Nachname
- [x] Ich skizziere die Film- und Serienansicht meiner Webseite (📵)

✍️ Heute habe ich zuerst meinen node.js Server mit der SQL Datenbank verbunden. Dabei habe ich ein paar Testdatensätze in die Datenbank eingegeben und diese in der Konsole ausgeben lassen. Das hat so weit funktioniert. Nach der Pause habe ich das Layout meiner Webeite skizziert. Anschliessend habe ich die Daten auf einem einfachen Frontend ausgeben lassen. (55 Wörter)

☝️ Vergessen Sie nicht, den Code von heute auf github hochzuladen.

## 9.5

Planen Sie nun Ihr Projekt, sodass die *Kern-Funktionalität* in 3 Sitzungen realisiert ist. Schreiben Sie dazu zunächst 3 solche übergeordneten Kern-Funktionalitäten auf:

1. Kern-Funktionalität: Datenbank mit node.js verbinden und auf Frontend ausgeben
2. Kern-Funktionalität: Filme auf der Webseite hinzufügen, bearbeiten und löschen
3. Kern-Funktionalität: Filme auf einfachem Frontend suchen, sortieren und filtern können


Diese Kern-Funktionalitäten brechen Sie nun in etwa 4 AP je herunter. Versuchen Sie jetzt bereits, auch die Sitzung vom 16.5 und 23.5 zu planen (im Wissen, dass Sie kleine Anpassungen an Ihrer Planung vornehmen können).

- [x] Ich erstelle ein UML-Diagramm für meine Filme und Serien Datenbank.
- [x] Ich erstelle eine Datenbank mit den notwendigen Tabellen und füge erste Filme und Serien hinzu.
- [ ] Ich verbinde das node.js mit der Datenbank und lese die Filme aus der Datenbank aus.

✍️ Heute habe ich ein UML-Diagramm mit vier Tabellen und zwei Zwischentabellen erstellt. Dazu musste ich die Unterlagen von M164 nochmals anschauen. Anschliessend habe ich den Code mit SQL im SQL Server Management Studio umgesetzt. Das schwierigste war das Implementieren des Fremdschlüssels. Dann habe ich angefangen die DB mit Daten zu befüllen. Mit dem richtigen Node.js konnte ich noch nicht beginnen. (60 Wörter)

☝️ Vergessen Sie nicht, den Code von heute auf github hochzuladen.

## 16.5

- [x] Ich schreibe eine node.js mit dem Ich Filme aus der DB auslesen kann.
- [x] Ich zeige die Filme und deren Bilder auf einem einfachen Frontend an.
- [ ] Ich programmiere node.js Code, um einen Neuen Film hinzuzufügen.
- [ ] Ich programmiere das Löschen von bestehenden Filmen.

✍️ Heute habe ich zunächst manuell vier Star-Wars-Filme in meiner Datenbank gespeichert. Anschließend habe ich die Filme über das Backend aus der Datenbank geladen. Danach habe ich im Frontend eine einfache Tabelle erstellt, in der ich die Filme mithilfe des Frontends auslesen und anzeigen kann. Nach einer Pause habe ich einen Button hinzugefügt, durch den man zu einem Formular gelangt, in dem man Informationen zu einem neuen Film angeben kann. Momentan bereite ich das Backend und das Frontend für das Hinzufügen vor. (81 Wörter)

☝️ Vergessen Sie nicht, den Code von heute auf github hochzuladen.

## 23.5

- [x] Ich implementiere die CREATE-Schnittstelle von neuen Filmen im Backend
- [x] Ich programmiere die fetch-Anfrage im Frontend, um einen neuen Film hinzuzufügen
- [ ] Ich implementiere die DELETE-Schnittstelle im Backend
- [ ] Ich füge eine Spalte in der Tabelle hinzu und implementiere das Löschen von Filmen mit einer fetch-Anfrage

✍️ Heute habe ich mit dem Hinzufügen neuer Filme beschäftigt. Allerdings habe ich bemerkt, dass ich mit 'express' arbeiten sollte. Deshalb musste ich den Code von den GET Anfragen ein wenig überarbeiten. Danach habe ich den Code für die POST Anfrage geschrieben. Dabei hatte ich mit der Grösse des Bildes zu kämpfen, weil es immer zu einem Payload Fehler kam. Deswegen habe ich mich entschieden mit 'multer' zu arbeiten. Zudem habe ich meine html Datei in eine html, eine css und eine js Datei aufgeteilt. Zum Löschen der Filme bin ich nicht gekommen. (92 Wörter)

☝️ Vergessen Sie nicht, den Code von heute auf github hochzuladen.

## 6.6

Ihr Projekt sollte nun alle Funktionalität haben, dass man es benutzen kann. Allerdings gibt es sicher noch Teile, welche "schöner" werden können: Layout, Code, Architektur... beschreiben Sie kurz den Stand Ihres Projekts, und leiten Sie daraus 6 solche "kosmetischen" AP für den 6.6 und den 13.6 ab.

(Im Moment stecke ich in Kern-Funktionalität 2 und diese ist sehr wichtig. Deshalb werde ich sie in den nächsten APs noch abschliessen. Die letzten zwei APs werde ich für das css verwenden.)

- [x] Ich programmiere die DELETE-Schnittstelle im Backend mithilfe von express
- [x] Ich erweitere die Tabelle, um eine Löschen Spalte mit Buttons und verbinde das HTML mit der DELETE-Schnittstelle
- [x] Ich implementiere die PUT-Schnittstelle im Backend
- [x] Ich erstelle einen Button, der zu einem Formular führt, in welchem man einen Film bearbeiten kann und implementiere die PUT-Schnittstelle im Frontend

✍️ Heute habe ich sehr viel erreicht. Ich konnte alle APs erfolgreich erledigen. Nun sind die DELETE-Schnittstelle und die UPDATE-Schnittstelle implementiert. Man kann nun Filme löschen und bearbeiten. Da mir am Schluss sogar noch Zeit übrig blieb konnte ich sogar schon die Farben verändern. Dennoch bin ich mit den Farben und dem Layout noch nicht zufrieden. (55 Wörter)

☝️ Vergessen Sie nicht, den Code von heute auf github hochzuladen.

## 13.6

- [x] Ich erstelle einen Button, um zwischen Light- und Darkmode zu wechseln
- [x] Ich passe die Ansicht für das Smartphone an und zeige die Filme untereinander

✍️ Heute habe ich viel am Design gearbeitet. Ich habe einen Light- und Darkmode hinzugefügt und die Ansicht für das Handy angepasst und verfeinert. Da mir am Schluss noch Zeit übrig blieb habe ich die Farben beim hovern über die Buttons an CRUD angepasst. Die Webseite hat nun alle wichtigen Funktionen und ein schönes und cleanes Design. (56 Wörter)

☝️ Vergessen Sie nicht, den Code von heute auf github hochzuladen.

## 20.6

Was fehlt Ihrem fertigen Projekt noch, um es auszuliefern? Reicht die Zeit für ein *nice-to-have feature*?

- [x] Ich erstelle einen Button für "weitere Informationen" und erweitere die SQL-Tabelle um weitere Spalten, wie z.B. Trailer
- [x] Ich zeige auf der "weitere Informationen" Seite die zusätzliche Informationen über den jeweiligen Film an
- [ ] Ich mache kleine Ausbesserungen und betreibe refactoring
- [ ] Ich bereite die Materialien der Präsentation vor und übe sie

✍️ Heute habe ich mich vor allem um die Funktion "weitere Details" gekümmert. Zuerst habe ich die SQL-Tabelle um die Spalte "Trailer" erweitert. Anschliessend habe ich die Buttons "weiter Details" eingefügt und habe auf dieser Details Seite, viele Informationen über einen Film auflisten lassen. Auf der Hauptseite sind nun weniger Informationen zu sehen. Dann habe ich mich noch um einige kleiner Updates gekümmert. Den Button "Daten laden" habe ich gelöscht und der Button "Film hinzufügen" ist nur noch auf der Startseite zu sehen. Zum Schluss habe ich noch einige Fehler aus dem Hinzufügen und Updaten der Links behoben und einige Abstände angepasst. (101 Wörter)

☝️ Vergessen Sie nicht, die Unterlagen für Ihre Präsentation auf github hochzuladen.

## 27.6
