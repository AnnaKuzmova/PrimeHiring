import validate from "./validation.js";
import Developer from "./developer.js";

//Getting all the spans, that are holders for error messaged and getting the create button to add an event listener on click (submiting the form)
let errorMessagesContainers = Array.from(document.querySelectorAll('.error-message'))
let createDeveloperButton = document.querySelector("#create-developer")
let modal = document.querySelector(".modal-created-success")
let modalContent = document.querySelector(".modal-information-holder")

createDeveloperButton.addEventListener("click", function(){
    //Creating object where we will store the error messages, after validating them
    //Taking each span type and creating a property with its value in the object-errorMessages
    let errorMessages = {}
    errorMessagesContainers.forEach(span => {
        span.innerHTML = ""
        errorMessages[span.getAttribute('type')] = ""
    })
    
    //Getting all the data from the form
    let devName = document.querySelector('.dev-name').value;
    let devEmail = document.querySelector('.dev-email').value
    let devPhoneNumber = document.querySelector('.dev-phone-number').value
    let devLocation =  document.querySelector('.dev-location').value
    let devPrice = document.querySelector('.dev-price').value
    let devYearsOfXP = document.querySelector('.dev-years-of-expirience').value
    let devTechnology = document.querySelector('.dev-technology').value
    let devNativeLang =document.querySelector('.dev-language').value 
    let devDescription = document.querySelector('.dev-description').value
    let devLinkedIn = document.querySelector('.dev-linked-in').value
    let devImage = document.querySelector('.dev-img').value
    //Validating the data with the validation-functions from js/validation.js
    errorMessages.developerName = validate.developerName(devName)
    errorMessages.email = validate.email(devEmail)
    errorMessages.phoneNumber = validate.phoneNumber(devPhoneNumber)
    errorMessages.location = validate.location(devLocation)
    errorMessages.price = validate.number(devPrice)
    errorMessages.yearsOfEexpirience = validate.number(devYearsOfXP)
    errorMessages.technology = validate.technology(devTechnology)
    errorMessages.language = validate.nativeLanguage(devNativeLang)
    errorMessages.description = validate.description(devDescription)
    errorMessages.linkedIn = validate.url(devLinkedIn)
    errorMessages.image = validate.url(devImage)
    
    //Checking for errors. If true we will display the errors, otherwise we will save the data
    if(Array.from(Object.values(errorMessages)).filter(i => i.length > 0).length > 0) {
        //There are errors
            errorMessagesContainers.forEach(span => {
                span.innerHTML = errorMessages[span.getAttribute("type")]
            })
    }else {
        //No errors
        //Getting the developer's array from the local storage
        let developers = JSON.parse(window.localStorage.getItem("developers"))
        let newDeveloper = new Developer(devName,devEmail, devPhoneNumber, devImage,devPrice, devTechnology, devDescription, devYearsOfXP, devNativeLang, devLocation ,devLinkedIn)
        let id;
        //Using do while to ceate unique value, different from the other developers
        do {
            id = '_' + Math.random().toString(36).substr(2, 9)

        }while(developers.filter(dev => dev.id == id).length > 0)
        newDeveloper.id = id
        //Pushing the new developer to the other developers
        developers.push(newDeveloper)
        let developers_serialized = JSON.stringify(developers)
        window.localStorage.setItem("developers", developers_serialized)
        //Animation the success modal with GSAP
        const tl = new TimelineLite()
        
        modal.style.display = "block"
        modal.style.top = `${window.scrollY.toFixed(2)}px`

        tl.from(modal, 1, {
            opacity: 0
        })
        .from(modalContent, 1, {
            y : 200,
            opacity: 0
        })
        .to(modalContent, 1, {
            y: 0,
            opacity: 1
        })

    }

})

let addMoreDevelopersButton = document.querySelector('#add-more-developers')

addMoreDevelopersButton.addEventListener("click", function(){
    modal.style.display = "none"
    location.reload();
})
