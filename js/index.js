//Creating array of objects, that store data about divverent developers
//Then push it to the localStorage object so that it will be easy to work later with it


let developers = [
    {
        developerName : "Sandra Bullock",
        email : 'sandy@gmail.com',
        phoneNumber : '089654332',
        location : 'Sofia, Bulgaria',
        profilePicture : 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=749&q=80',
        pricePerHour : '50',
        technology : 'PHP',
        description : 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.',
        yearsOfExpirience: '8',
        nativeLanguage : 'Bulgarian',
        linkedInProfile : 'https://www.linkedin.com/'
    },
    {
        developerName : "Alexander Newmann",
        email : 'allexx@gmail.com',
        phoneNumber : '09865433',
        location : 'San Francisco, USA',
        profilePicture : 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80',
        pricePerHour : '30',
        technology : 'Javascript',
        description : 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.',
        yearsOfExpirience: '5',
        nativeLanguage : 'English',
        linkedInProfile : 'https://www.linkedin.com/'
    },   {
        developerName : "Sasha Lopez",
        email : 'sashhhhh@gmail.com',
        phoneNumber : '089654332',
        location : 'Mexico City, Mexico',
        profilePicture : 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        pricePerHour : '45',
        technology : 'C#',
        description : 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.',
        yearsOfExpirience: '2',
        nativeLanguage : 'Mexican',
        linkedInProfile : 'https://www.linkedin.com/'
    }
]

let developersSerialized = JSON.stringify(developers)
window.localStorage.setItem('developers', developersSerialized)

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


