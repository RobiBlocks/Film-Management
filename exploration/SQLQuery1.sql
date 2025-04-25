CREATE DATABASE SavePicturesDB;

Create TABLE PicturesWithDescription
(
	Picture_Id INT IDENTITY(1,1) PRIMARY KEY,
	Filmname VARCHAR(50),
	Picture VARBINARY(MAX)
);

INSERT INTO PicturesWithDescription (Filmname, Picture)
SELECT 'beispiel.jpg', *
FROM OPENROWSET(BULK N'C:\Users\robin\Desktop\bilder\beispiel.jpg', SINGLE_BLOB) AS BildData;
