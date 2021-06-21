if(window.localStorage.getItem("developers") == null) {
    window.localStorage.setItem("developers", "[]")
}

//Function for rendering every developer into an html card 
//Getting the container/holder first, to push the developer card in the end
let developersContainer = document.querySelector('.all-developers-holder.flex.center')

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

function renderDeveloperHTML(array) {
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

        //Creating the button for hiring a single developer

        let buttonHire = document.createElement('a')
        buttonHire.classList.add("button-light")
        let hireText = document.createTextNode("hire")
        buttonHire.appendChild(hireText)
        articleRelatdInfo.appendChild(buttonHire)

        cardHolder.appendChild(articleRelatdInfo)
        developersContainer.appendChild(cardHolder)
    })
}

let allDevelopers = JSON.parse(window.localStorage.getItem("developers"))
renderDeveloperHTML(allDevelopers)



