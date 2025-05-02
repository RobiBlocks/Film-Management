CREATE DATABASE SavePicturesDB;

Create TABLE PicturesWithDescription
(
	Picture_Id INT IDENTITY(1,1) PRIMARY KEY,
	Filmname VARCHAR(50),
	Episode INT
);

INSERT INTO PicturesWithDescription (Filmname) VALUES ('Szymon');
INSERT INTO PicturesWithDescription (Filmname, Episode) VALUES ('Arvin', 2);
INSERT INTO PicturesWithDescription (Filmname, Episode) VALUES ('Robin', 1);