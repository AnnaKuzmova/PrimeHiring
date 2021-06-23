if(window.localStorage.getItem("developers") == null) {
    window.localStorage.setItem("developers", "[]")
}

if(window.localStorage.getItem("hiredDevelopers") == null ) {
    window.localStorage.setItem("hiredDevelopers", "[]")
    
}

let allDevelopers = JSON.parse(window.localStorage.getItem("developers"))
let hiredDevelopers = JSON.parse(window.localStorage.getItem("hiredDevelopers"))

//Selecting the confirmation modal for deleting a developer
let confirmationModal = document.querySelector("#confirmation-modal")
let confirmationContant = document.querySelector(".cofirmation-content")
let deleteDeveloprButton = document.querySelector(".delete-developer-button")
let cancelRemovalButton = document.querySelector(".cancel-removal")

//Selecting the container that informs the user for already hired developer and the close button for this modal
let modalForHiredDev = document.querySelector('#modal-hired-developer')
let closeModalForHiredDev = document.querySelector('#modal-hired-developer a')
let modalHiredDevText = document.querySelector('#modal-hired-developer .dev-name')

closeModalForHiredDev.addEventListener('click', () => {
    modalForHiredDev.style.display = 'none'
})



//Function for rendering every developer into an html card 
//Getting the container/holder first, to push the developer card in the end
let developersContainer = document.querySelector('.all-developers-holder')

//Function for creating article element, that hold data (dislayed, using social icons)
//Grouped it with function to avoid wrtiting the same pice of code multiple time
function createSocials(iClasses, devText) {
    let article = document.createElement('article')
    article.classList.add('info-icons')
    let iEl = document.createElement('i')
    iClasses.forEach(className => {
        iEl.classList.add(className)
    })
    article.appendChild(iEl)
    let paragraphElement = document.createElement('p')
    let paragraphText = document.createTextNode(`${devText}`)
    paragraphElement.appendChild(paragraphText)
    article.appendChild(paragraphElement)

    return article;
}

//Function for creating p element, that hold data about the developer
function createInfo(title, text) {
    let titleText = document.createTextNode(title)
    let textNode = document.createTextNode(`${text}`)
    let pElement = document.createElement('p')
    pElement.appendChild(titleText)
    let spanEl = document.createElement('span')
    spanEl.appendChild(textNode)
    pElement.appendChild(spanEl)

    return pElement;
}

function renderDeveloperHTML(container,array,type) {
    container.innerHTML = ""
    array.forEach(developer => {
        let cardHolder = document.createElement('article')
        cardHolder.classList.add('dev-card')
        let devImage = document.createElement('img')
        //Checking if the user has set image path, otherwise and incognito picture will be presented
        if(developer.profilePicture) {
            devImage.setAttribute('src', `${developer.profilePicture}`)
            
        }else {
            devImage.setAttribute('src', '/images/incognito.png')
        }

        cardHolder.appendChild(devImage)
        let nameHolder = document.createElement("h2")
        let developerName = document.createTextNode(`${developer.developerName}`)
        nameHolder.appendChild(developerName)
        cardHolder.appendChild(nameHolder)
        //Creating i tag for removing(deleting current developer)
        let iTag = document.createElement("i")
        iTag.classList.add("fas", "fa-times", "delete")
        iTag.setAttribute("developer", developer.id)
        //appending event listener to the delete icon
        if(type == 'default') {
        iTag.addEventListener("click", function(){
            deleteDeveloprButton.setAttribute("developer", this.getAttribute("developer"))
            confirmationModal.style.display = "block"
            confirmationModal.style.top = `${window.scrollY.toFixed(2)}px`
            confirmationContant.style.animation = "slideUp .5s ease-in-out forwards"
        })
        } else if (type == 'team') {
          iTag.addEventListener('click', function(){
              let devIndex
              team.forEach((dev,index) => {
                  if(dev.id == this.getAttribute('developer')) {
                      devIndex
                  }
              })
              team.splice(devIndex, 1)
              renderDeveloperHTML(devTeamContainer,team, 'team')
          })
        }
        cardHolder.appendChild(iTag)

        let flexDiv = document.createElement('div')
        flexDiv.classList.add('flex')

        let devEmailHTML = createSocials(['fas', 'fa-envelope'], developer.email)
        flexDiv.appendChild(devEmailHTML)

        let devPhoneNumberHTML = createSocials(['fas', 'fa-phone-alt'], developer.phoneNumber)
        flexDiv.appendChild(devPhoneNumberHTML)

        let devLocationHTML = createSocials(['fas', 'fa-map-marker-alt'], developer.location)
        flexDiv.appendChild(devLocationHTML)

        let devPriceHTML = createSocials(['fas', 'fa-dollar-sign'], developer.pricePerHour + "(per hour)")
        flexDiv.appendChild(devPriceHTML)

        cardHolder.appendChild(flexDiv)

        let articleRelatdInfo = document.createElement('article')
        articleRelatdInfo.classList.add('dev-related-info')
        
        //Checking if description is set for current element, otherwise description content is not shown
        if(developer.description) {
            let devDescriptionHTML = createInfo("description:", developer.description)
            articleRelatdInfo.appendChild(devDescriptionHTML)
        }

        let devYearsOfExpirienceHTML = createInfo("years of expirience:", developer.yearsOfExpirience)
        articleRelatdInfo.appendChild(devYearsOfExpirienceHTML)

        let devNativeLanguageHTML = createInfo("native language:", developer.nativeLanguage)
        articleRelatdInfo.appendChild(devNativeLanguageHTML)
        
        let devTechnologyHTML = createInfo("technology:", developer.technology) 
        articleRelatdInfo.appendChild(devTechnologyHTML)

        //Checking if linkedIN profile is set, otherwise we dont display it
        if(developer.linkedInProfile) {
            let linkedInProfileText = document.createTextNode(`${developer.linkedInProfile}`)
            let linkedInProfileTitle = document.createTextNode('linkedIn:')
            let pEl = document.createElement('p')
            pEl.appendChild(linkedInProfileTitle)
            let anchor = document.createElement('a')
            anchor.appendChild(linkedInProfileText)
            anchor.setAttribute('href', linkedInProfileText)
            pEl.appendChild(anchor)
            articleRelatdInfo.appendChild(pEl)
        }

        if(type == 'default') {
              //Creating the button for hiring a single developer
        let buttonHire = document.createElement('a')
        buttonHire.classList.add("button-light")
        let hireText = document.createTextNode("hire")
        buttonHire.appendChild(hireText)
        buttonHire.setAttribute('developer', `${developer.id}`)
        //appending an event listener on click
        //check is developer is hired
        buttonHire.addEventListener('click', function(){
            let dev = allDevelopers.find(dev => dev.id == this.getAttribute('developer'))
            hireButton.setAttribute('developer', developer.id)
                //We check if there are any hired developer
                //If there are then we check if out developer has been already hired
                if(hiredDevelopers.length == 0 || hiredDevelopers.filter(dev => dev.id == this.getAttribute('developer')).length == 0) {
                    //There were no hired developers or the developer hasnt been hired already
                    hireModalDevImage.setAttribute('src', dev.profilePicture)
                    hireModalDevName.innerHTML = dev.developerName
                    //We get the user's current height location and set it to the modal's top property
                    hireModal.style.top = `${window.scrollY.toFixed(2)}px`
                    hireModal.style.display = 'block'
                }else {
                    //The developer has been hired
                    //We display the apology-sorry modal
                    modalHiredDevText.innerHTML = dev.developerName
                    modalForHiredDev.style.top = `${window.scrollY.toFixed(2)}px`
                    modalForHiredDev.style.display = 'block'
                }
            }
        )
        articleRelatdInfo.appendChild(buttonHire)

        let buttonEdit = document.createElement('a')
        buttonEdit.classList.add("button-dark")
        let editText = document.createTextNode("edit")
        buttonEdit.appendChild(editText)
        buttonEdit.setAttribute("href", `edit.html?id=${developer.id}`)
        articleRelatdInfo.appendChild(buttonEdit)

        let buttonAddToTeam = document.createElement('a')
        buttonAddToTeam.classList.add('button-green', 'add-dev-to-team')
        let addTeamText = document.createTextNode('add to team')
        buttonAddToTeam.appendChild(addTeamText)
        buttonAddToTeam.setAttribute('developer', `${developer.id}`)
        articleRelatdInfo.appendChild(buttonAddToTeam)

        }

        cardHolder.appendChild(articleRelatdInfo)
        container.appendChild(cardHolder)
    })
}

//on clicking the cancel buton, we close the modal
cancelRemovalButton.addEventListener("click", function(){
    confirmationModal.style.display = "none"
})

//on clicking the delete button, we get the id value that was previously apended by perssing the  delete icon
//Then we search through the initial array of developers for a dev with matching id
//The  we delete it from the array
deleteDeveloprButton.addEventListener("click", function(){
    let developers = JSON.parse(window.localStorage.getItem("developers"))
    let devIndex;
     developers.forEach((dev,index) => {
        if(dev.id == this.getAttribute("developer")) {
            devIndex = index
        }
    })
    //After finding the dev's index, we use splice to remove the selected dev's object
    developers.splice(devIndex, 1)
    console.log(developers)
    //Saving the new array in the local store and rendering the developer's into the page
    let devSerialized = JSON.stringify(developers)
    window.localStorage.setItem("developers", devSerialized)
    //Closing the modal
    confirmationModal.style.display = "none"
    renderDeveloperHTML(developers)
})

//Selecting the buttons that display all the developers and hired developers
//Then we append event listener on click to display different contet according to their purpose
//Using GSAP to animate the content show and hide effect
let displayAllDevelopersButton = document.querySelector('#all-developers')
let displayHiredDevelopersButton = document.querySelector('#hired-developers')

displayAllDevelopersButton.addEventListener('click', function(){
    if(!this.hasAttribute('type')) {
        Array.from(document.querySelectorAll('.control-button')).forEach(btn => btn.removeAttribute('type'))
        this.setAttribute('type', 'active')
        let tl = new TimelineLite()

        tl.from(hiredDevelopersContainer, 0.3 ,{
            x : 0,
            opacity: 1,
            ease: "Power2"
        })
        .to(hiredDevelopersContainer, 0.3, {
            x:200,
            opacity: 0,
            onComplete: function(){
                hiredDevelopersContainer.style.display = 'none'
                developersContainer.style.display = 'flex'
            },
            ease: "Power2"
        })
        .to(developersContainer, 0.3, {
            x: 0,
            opacity: 1,
            ease: "Power2"
        })
    }
})

displayHiredDevelopersButton.addEventListener('click', function(){
    if(!this.hasAttribute('type')) {
        Array.from(document.querySelectorAll('.control-button')).forEach(btn => btn.removeAttribute('type'))
        this.setAttribute('type', 'active')
        let tl = new TimelineLite()

        tl.from(developersContainer, 0.3 ,{
            x : 0,
            opacity: 1,
            ease: "Power2"
        })
        .to(developersContainer, 0.3, {
            x: '-200',
            opacity: 0,
            onComplete : function() {
                developersContainer.style.display = 'none',
                hiredDevelopersContainer.style.display = 'flex'
            },
            ease: "Power2"
        })
        .to(hiredDevelopersContainer, 0.3, {
            x: 0,
            opacity: 1,
            ease: "Power2"
        })
    }
})

//Selecting the modal for hiring a developer
let hireModal = document.querySelector('#hire-developer-modal')
let hireModalDevImage = document.querySelector('.modal-content img')
let hireModalDevName = document.querySelector('.dev-name')
let cancelHireButton = document.querySelector('#cancel-hire-button')
let hireButton = document.querySelector('#hire-developer-button')
let hireStartDate = document.querySelector('.start-date')
let hireEndDate = document.querySelector('.end-date')
let errorMessage = document.querySelector('.error-message')

cancelHireButton.addEventListener('click', function(){
    hireModal.style.display = 'none'
})

//selecting the container for hired developers
let hiredDevelopersContainer = document.querySelector('.hired-developers')

hireButton.addEventListener('click', function(){
    errorMessage.innerHTML = ''
    let currentDay = new Date().toISOString().slice(0, 10).split('-')
    if(hireStartDate.value == "" && hireEndDate.value == ""){
        errorMessage.innerHTML = "To hire a developer there must be set a start and end date."
    }else {
        let chosenDate = hireStartDate.value.split('-')
        if(parseInt(currentDay[0]) > parseInt(chosenDate[0]) || parseInt(currentDay[1]) > parseInt(chosenDate[1]) || parseInt(currentDay[2]) > parseInt(chosenDate[2])) {
            errorMessage.innerHTML = 'Start date cannot be set to previous period of time.'
        } else {
            //Now we hire
            developer = allDevelopers.find(dev => dev.id == this.getAttribute('developer'))
            developer.startDate = hireStartDate.value
            developer.endDate = hireEndDate.value
            hiredDevelopers.push(developer)
            let hiredDevelopers_serialized = JSON.stringify(hiredDevelopers)
            window.localStorage.setItem('hiredDevelopers',hiredDevelopers_serialized)
            hireModal.style.display = 'none'
            renderDeveloperHTML(hiredDevelopersContainer, hiredDevelopers)
        }
    }
    
})

renderDeveloperHTML(developersContainer ,allDevelopers, 'default')
renderDeveloperHTML(hiredDevelopersContainer, hiredDevelopers, 'team')

//Selecting the button for opening thee hire section
let openHireTeamSection = document.querySelector('#hire-team-button')
let teamHireModal = document.querySelector('.developer-team-container')
let devTeamContainer = document.querySelector('.dev-team')
let allDeveloperAddButtons = document.querySelectorAll(".button-green.add-dev-to-team")
let cancelHireTeamButton = document.querySelector('#cancel-hire-team')
let hideModalBtn = document.querySelector('.close-modal')
let hireTeamBtn = document.querySelector('#hire-team-button.button-light')
let team = []

openHireTeamSection.addEventListener('click', function(){
    teamHireModal.style.left = '0'
    allDeveloperAddButtons.forEach(btn => {
        btn.style.display = 'inline-block'
        btn.addEventListener('click', () => {
            let dev = allDevelopers.find(dev => dev.id == btn.getAttribute('developer'))
            if(hiredDevelopers.length == 0 || hiredDevelopers.filter(dev => dev.id == btn.getAttribute('developer')).length == 0) {
                team.push(dev)
                renderDeveloperHTML(devTeamContainer, team, 'team')
                teamHireModal.style.left = '0'
            }else {
                modalHiredDevText.innerHTML = dev.developerName
                modalForHiredDev.style.top = `${window.scrollY.toFixed(2)}px`
                modalForHiredDev.style.display = 'block'
            }
        })
    })
})

cancelHireTeamButton.addEventListener('click', function(){
    team.length = 0
    teamHireModal.style.left = '-100%'
    allDeveloperAddButtons.forEach(btn => {
        btn.style.display = 'none'
    })
})

hideModalBtn.addEventListener('click', function(){
    teamHireModal.style.left = '-100%'
})

hireTeamBtn.addEventListener('click', function(){
    let startDate = document.querySelector('.team-start-date')
    let endDate = document.querySelector('.team-end-date')
    let message = document.querySelector('.message')
    let currentDay = new Date().toISOString().slice(0, 10).split('-')
    //Validating the team start and end date
    if(startDate.value == "" && endDate.value == ""){
        message.innerHTML = "To hire a developer there must be set a start and end date."
    }else {
        let chosenDate = startDate.value.split('-')
        if(parseInt(currentDay[0]) > parseInt(chosenDate[0]) || parseInt(currentDay[1]) > parseInt(chosenDate[1]) || parseInt(currentDay[2]) > parseInt(chosenDate[2])) {
            message.innerHTML = 'Start date cannot be set to previous period of time.'
        }else {
            //We hire if there are developers added in a tam
           if(team.length > 0) {
               let developer
                team.forEach(dev => {
                    developer = dev
                    developer.startDate = startDate.value
                    developer.endDate = endDate.value
                    hiredDevelopers.push(developer)
                })
                let hiredDevelopers_serialized = JSON.stringify(hiredDevelopers)
                window.localStorage.setItem('hiredDevelopers', hiredDevelopers_serialized)
                renderDeveloperHTML(hiredDevelopersContainer, hiredDevelopers)
                devTeamContainer.innerHTML = ''
                teamHireModal.style.left = '-100%'
                allDeveloperAddButtons.forEach(btn => {
                    btn.style.display = 'none'
                })
           }
        }
    }
})



