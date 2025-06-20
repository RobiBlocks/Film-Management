ALTER TABLE Film
ADD Trailer VARCHAR(225) NULL;

UPDATE Film
SET Trailer = 'https://www.youtube.com/watch?v=1uOWs2e7-wA&ab_channel=KinoCheckHeimkino'
WHERE FilmId = 15;

SELECT * FROM Film;