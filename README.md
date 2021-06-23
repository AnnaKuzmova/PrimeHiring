# PrimeHiring - task
# Description 
PrimeHiring is a system for hiring developers or team of developers for projects. The system tracks the date of the hiring day and the end date. If a developer has already been hired, he cannot be hired again until he is free. 

For the sake of simplicity the system does not recognize different types of users (like ``admin user``). This is why everyone can create, read, edit and delete developes.

For creating a new developer, there is a page (``create.html``) built to display and validate data of the new developer. To keep the code cleaned I have created an object ( in ``validate.js``), that holds different functions that validate developer's different kind of data.

When hovering the developer's card an icon for deleting the current developer shows up. When clicking it a confirmation modal display, asking the user if he wants to delete the selected developer. 

For storing records of the developers and the hired developers I have used the local storage via ``window.localStorage.getItem('yourItemName')`` - for getting the records and ``window.localStorage.setItem('yourItemName', 'yourItemStrigified')`` - for updating or creating a record.

# Used technologies :
* HTML5
* CSS3
* Javascript
* GSAP - Js animation library

# Technical description :
* Installation :
-To install the code you can open GitBash on a directory of your choice on your local device and type: ``git pull https://github.com/AnnaKuzmova/PrimeHiring.git`` 
- Creating a local repository of the project on your local device : ``git clone https://github.com/AnnaKuzmova/PrimeHiring.git``
-Downloading the ZIP file
* Setup - when openig the ``index.html`` the page will be blank (without taking the header and the few visible buttons in advance.). First thing you would want to do is to add developers by clicking the ADD DEVELOPERS button(anchor tag) from the navigation bar. 
