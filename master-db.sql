CREATE DATABASE "fresh-flix";
CREATE TABLE "users"
(
 "id"  SERIAL PRIMARY KEY,
 "username" VARCHAR(45) NOT NULL,
 "password" VARCHAR(45) NOT NULL
);

CREATE TABLE "watchlists"
(
 "id"              INT REFERENCES "users" ("id"),
 "movie_id"        INT NOT NULL ,
 "title"           TEXT NOT NULL ,
 "genre"           TEXT NOT NULL ,
 "synopsis"        TEXT NOT NULL ,
 "director"        TEXT NOT NULL ,
 "actors"          TEXT NOT NULL ,
 "length"          TEXT ,
 "mpaa_rating"     TEXT ,
 "release_year"    INT ,
 "rotten_tomatoes" TEXT ,
 "release_date"    DATE ,
 "website"         TEXT 
);