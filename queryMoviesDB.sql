drop database if exists moviesdb;
create database moviesdb;

use moviesdb;

create table movies (
	id binary(16) primary key default(UUID_TO_BIN(UUID())),
    title varchar(255) not null,
    year int not null,
    director varchar(255) not null,
    duration int not null,
    poster text,
    rate decimal(2, 1) unsigned not null
);

create table genres (
	id int auto_increment primary key,
    name varchar(255) not null unique
);

create table movies_genres(
	movie_id binary(16) references movies(id),
    genre_id int references genres(id),
    primary key (movie_id, genre_id)
);

insert into genres(name) values ('Action'), ('Adventure'), ('Crime'), ('Drama'), ('Animation'), ('Biography'), ('Fantasy'), ('Romance'), ('Sci-Fi'), ('Comedy'), ('Music');

insert into movies(id, title, year, director, duration, poster, rate) values 
(uuid_to_bin(uuid()), "The Shawshank Redemption", 1994, "Frank Darabont", 142, "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp", 9.3),
(uuid_to_bin(uuid()), "The Social Network", 2010, "David Fincher", 120, "https://i.pinimg.com/originals/7e/37/b9/7e37b994b613e94cba64f307b1983e39.jpg", 7.7),
(uuid_to_bin(uuid()), "Jurassic Park", 1993, "Steven Spielberg", 127, "https://vice-press.com/cdn/shop/products/Jurassic-Park-Editions-poster-florey.jpg?v=1654518755&width=1024", 8.1),
(uuid_to_bin(uuid()), "La La Land", 2016, "Damien Chazele", 129, "https://pbs.twimg.com/media/F4xhGOiXgAAViqo.jpg", 8.0);

insert into movies_genres(movie_id, genre_id) values 
((select id from movies where title = 'Jurassic Park'), (select id from genres where name = 'Adventure') ),
((select id from movies where title = 'Jurassic Park'), (select id from genres where name = 'Sci-Fi') ),
((select id from movies where title = 'The Social Network'), (select id from genres where name = 'Biography') ),
((select id from movies where title = 'The Social Network'), (select id from genres where name = 'Drama') );

SELECT BIN_TO_UUID(id), title, year, director, duration, poster, rate FROM movies;