# Status Page

### Project overview

Status page is website that check the server and the backend data seanding like Server is offline, Server is down,monitor offline etc...
Full responsive page. 

### Installation

npm install 
nodemon to run the app

### Frontend
Status page front end is constructed using Handlebars Templates. and has a simple interface to view:
1) Updated Status
2) list of incident 

Clicking on Stndby on the sidebar will take the user to the mian page of the company.

### Backend
Status page backend is written in NodeJs and Uses the Mongo database server to store incident and serve them to the frontend.
There are two backend processes:

1) A user webapp that communicates with the frontend using JSON to display articles
  - This app supports two HTTP verbs:
  1) GET - to get incidents from the database
  
  2) POST - to add incidents to the database
  
  3) PUT - to update incidents in the database (optional until we know if we need to update incidents)
  
2) A background webapp that requests new incidents from the selected sources and if they are appropriate adds them to the database
  - This app is responsible for:
  
   1) Getting incidents from our server API 
   
   2) Checking if there is new incidents
   
   3) Check if the incidents is ongoing incidents 
   
   4) If incidents ongoing then `POST` to our user webapp to add the incidents
   
   ### Developer Environment
   
   there are special environment for developers that allowed to add and remove incident encrypted with special authority password
   
   ## Fronted & Backend Sketch
![img_20170913_124601](https://user-images.githubusercontent.com/18512695/30393957-ee995eee-98c1-11e7-92ac-ad75a78cd5b2.jpg)
![img_20170913_124609](https://user-images.githubusercontent.com/18512695/30393962-f13fa658-98c1-11e7-8b7c-89c418bb7c7b.jpg)


   
