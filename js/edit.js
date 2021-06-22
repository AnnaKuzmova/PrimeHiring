import validate from "./validation.js"

//Getting the passed id from the url (with get request)
let url_string = window.location.href
let url = new URL(url_string)
let developerId = url.searchParams.get("id");

//Getting the developers array from the local storage and finding the dev to be edited
let developers = JSON.parse(window.localStorage.getItem("developers"))
let devToEdit = developers.find(dev => dev.id == developerId)

//Getting the form elements to display the developer's data
let devImage = document.querySelector(".dev-image")
devImage.setAttribute('src', `${devToEdit.profilePicture}`)
let devName = document.querySelector('.dev-name')
devName.value = devToEdit.developerName;
let devEmail = document.querySelector('.dev-email')
devEmail.value = devToEdit.email
let devPhoneNumber = document.querySelector('.dev-phone-number')
devPhoneNumber.value = devToEdit.phoneNumber
let devLocation = document.querySelector('.dev-location')
devLocation.value = devToEdit.location
let devPrice = document.querySelector('.dev-price')
devPrice.value = devToEdit.pricePerHour
let devYearsOfExpirience = document.querySelector('.dev-years-of-expirience')
devYearsOfExpirience.value = devToEdit.yearsOfExpirience
let devTechnology = document.querySelector('.dev-technology')
devTechnology.value = devToEdit.technology
let devNativeLanguage = document.querySelector('.dev-language')
devNativeLanguage.value = devToEdit.nativeLanguage


//Checking if description is set for this developer
// If true - we set the texarea value to it
//Otherwise we continue
let devDescription = document.querySelector('.dev-description')
if(devToEdit.description) {
    devDescription.value = devToEdit.description
}

let devLinkedIn = document.querySelector('.dev-linked-in')
if(devToEdit.linkedInProfile) {
    devLinkedIn.value = devToEdit.linkedInProfile
}

let devImageUrl = document.querySelector('.dev-img')
if(devToEdit.profilePicture) {
    devImageUrl.value = devToEdit.profilePicture
}



//Getting the edit button
//Appending an event listener to it on click
//Validating the data, when edit-button has been clicked
//Redirecting the user then to the index.html
let editButton = document.querySelector('#edit-developer')
let errorMessagesSpans = document.querySelectorAll('.error-message')

editButton.addEventListener('click', function(){
    //Crating object that we will fill with properties for each developer type of data's error message
    let errorMessages = {}
    errorMessagesSpans.forEach(span => {
        errorMessages[span.getAttribute('type')] = ''
    })
    
   //Validating the data
   errorMessages.developerName = validate.developerName(devName.value)
   errorMessages.email = validate.email(devEmail.value)
   errorMessages.phoneNumber = validate.phoneNumber(devPhoneNumber.value)
   errorMessages.location = validate.location(devLocation.value)
   errorMessages.price = validate.number(devPrice.value)
   errorMessages.yearsOfEexpirience = validate.number(devYearsOfExpirience.value)
   errorMessages.technology = validate.technology(devTechnology.value)
   errorMessages.language = validate.nativeLanguage(devNativeLanguage.value)
   errorMessages.description = validate.description(devDescription.value)
   errorMessages.linkedIn = validate.url(devLinkedIn.value)
   errorMessages.image = validate.url(devImageUrl.value)

   if(Array.from(Object.values(errorMessages)).filter(i => i.length > 0).length > 0) {
       //There are erros
        errorMessagesSpans.forEach(span => {
        span.innerHTML = errorMessages[span.getAttribute("type")]
    })
   } else {
       //No errors
       /*
        We get the developers array from the local strage because
        at the time the user has clicked yhe edited button, other user may have added new developer.
       */
      developers = JSON.parse(window.localStorage.getItem("developers"))
      //We loop over the array, find the developer and edit its data 
      developers.forEach(developer => {
          if(developer.id == developerId) {
              developer.developerName = devName.value
              developer.description = devDescription.value
              developer.linkedInProfile = devLinkedIn.value
              developer.location = devLocation.value
              developer.nativeLanguage = devNativeLanguage.value
              developer.phoneNumber = devPhoneNumber.value
              developer.pricePerHour = devPrice.value
              developer.profilePicture = devImageUrl.value
              developer.technology = devTechnology.value
              developer.yearsOfExpirience = devYearsOfExpirience.value
          }
      })
      
      let developers_serialized = JSON.stringify(developers)
      window.localStorage.setItem("developers", developers_serialized)
      window.location.replace("index.html")
   }
   
})



