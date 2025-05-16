CREATE DATABASE FilmsAndSeries;

USE FilmsAndSeries;

CREATE TABLE Film
(
	FilmId INT IDENTITY(1,1) PRIMARY KEY,
	[Name] VARCHAR(50),
	Picture VARBINARY(MAX),
	[Year] INT,
	[Length] INT,
	Director VARCHAR(50)
);

CREATE TABLE Actor
(
	ActorId INT IDENTITY(1,1) PRIMARY KEY,
	Firstname VARCHAR(50),
	Lastname VARCHAR(50),
	Gender CHAR(1),
	Age INT
);

CREATE TABLE Series
(
	SeriesId INT IDENTITY(1,1) PRIMARY KEY,
	[Name] VARCHAR(50),
	Picture VARBINARY(MAX),
	Director VARCHAR(50)
);

CREATE TABLE Episode
(
	EpisodeId INT IDENTITY(1,1) PRIMARY KEY,
	[Name] VARCHAR(50),
	Picture VARBINARY(MAX),
	[Year] INT,
	[Length] INT,
	SeriesId INT FOREIGN KEY REFERENCES Series(SeriesId)
);

CREATE TABLE Actor2Film
(
	ActorId INT FOREIGN KEY REFERENCES Actor(ActorId),
	FilmId INT FOREIGN KEY REFERENCES Film(FilmId)
);

CREATE TABLE Actor2Series
(
	ActorId INT FOREIGN KEY REFERENCES Actor(ActorId),
	SeriesId INT FOREIGN KEY REFERENCES Series(SeriesId)
);

INSERT INTO Film ([Name], [Year], [Length], Director)
VALUES ('Star Wars: Episode I – Die dunkle Bedrohung', 1999, 136, 'George Lucas');