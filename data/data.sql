BEGIN;

INSERT INTO "article" ("title", "description") 
VALUES ('Pourquoi je suis nul en dev', 'Ben parce que je preferes jouer a des jeux super interessant'),
('Dois-je postuler', 'Absolument pas vu que tu es pas au top en ce moment');

COMMIT;

CREATE TABLE "user" (id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, username TEXT, password TEXT, isAdmin BOOLEAN);