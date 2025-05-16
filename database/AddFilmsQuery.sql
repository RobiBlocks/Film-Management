-- Episode I
INSERT INTO Film ([Name], Picture, [Year], [Length], Director)
SELECT
	'Star Wars: Episode I – The Phantom Menace',
	BULKColumn,
	1999,
	136,
	'George Lucas'
FROM OPENROWSET(BULK N'C:\Users\robin\OneDrive - BBBaden\Lernatelier\Lernperiode 10 - Filme node.js\database\pictures\starwarsepisode1.jpg', SINGLE_BLOB) AS BildData

-- Episode II
INSERT INTO Film ([Name], Picture, [Year], [Length], Director)
SELECT 
    'Star Wars: Episode II – Attack of the Clones',
    BulkColumn,
    2002,
    142,
    'George Lucas'
FROM OPENROWSET(BULK N'C:\Users\robin\OneDrive - BBBaden\Lernatelier\Lernperiode 10 - Filme node.js\database\pictures\starwarsepisode2.jpg', SINGLE_BLOB) AS BildData;

-- Episode III
INSERT INTO Film ([Name], Picture, [Year], [Length], Director)
SELECT 
    'Star Wars: Episode III – Revenge of the Sith',
    BulkColumn,
    2005,
    140,
    'George Lucas'
FROM OPENROWSET(BULK N'C:\Users\robin\OneDrive - BBBaden\Lernatelier\Lernperiode 10 - Filme node.js\database\pictures\starwarsepisode3.jpg', SINGLE_BLOB) AS BildData;

-- Episode IV
INSERT INTO Film ([Name], Picture, [Year], [Length], Director)
SELECT 
    'Star Wars: Episode IV – A New Hope',
    BulkColumn,
    1977,
    121,
    'George Lucas'
FROM OPENROWSET(BULK N'C:\Users\robin\OneDrive - BBBaden\Lernatelier\Lernperiode 10 - Filme node.js\database\pictures\starwarsepisode4.jpg', SINGLE_BLOB) AS BildData;