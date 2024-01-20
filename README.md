# MOVIES REST API
this api is a CRUD following the MVC architecture built with node.
it connects to a MYSQL database (currently hosted in planet scale) where you can add, delete and read the information.

you can make searches for all the movies or separate them by id. also when you wanna add a movie you'll have to introduce information according to what the api lets you.

stack:
- node js
- zod
- planet scale
- sql
- express
- cors

## usage

### vs code
you download or clone the repository into your computer and install the REST Client extension. then you go to the api.http file and use the premade requests that are in the file. 

### webstorm ide (jetbrains)
you download or clone the repository into your computer and visit the api.http file. there you can run the premade requests without the need for a extension. if you prefer using an extension is also valid.

### localhost
you download or clone the repository into your computer and in your terminal you run the following command: npm run start:mysql. with that command, you'll be able yo open the project in localhosto:1234/movies. this only works for fetching all the movies or looking them by id. if you want to look all the movies, you stay in that direction but if you want to look for an specific movie, you copy de id and paste it after a slash, following this format (/id) and you'll look at the data of the movie you selected.
