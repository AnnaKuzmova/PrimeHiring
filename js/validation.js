
//Creating then exporting validation object, with functions that validate developer's data
let validate = {
    //Function for validating the email data
    email : function (email) {
        if(email) {
            if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
                return "";
            }else {
                return "Incorrect email address."
            }
        } else {
            return "Email address cannot be empty."
        }
    },

    //Function for checking if the native language has been selected
    technology: function (tech) {
        if(tech == "none") {
            return "Technology is not selected."
        }else {
            return ""
        }
    },

    //Function for checking if the native language has been selected
    nativeLanguage : function(lang) {
        if(lang == "none") {
            return "Language is not selected."
        }else {
            return ""
        }
    },

    //Function for validating phone number data
    phoneNumber : function(phoneNumber) {
        if(phoneNumber) {
            if(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phoneNumber)) {
                return ""
            }else {
                return "Incorrect phone number."
            }
        }else {
            return "Phone number cannot be empty."
        }
    },
    //Function url is validation function for data that is in  the form url address
    //For data that is optional, we dont return error message in case it is not set
    url : function(url) {
        if(url) {
            if(/^(https:|http:|www\.)\S*/.test(url)) {
                return ""
            }else {
                return "Incorrect url address"
            }
        }else {
            return ""
        }
    },

    //Function for checking if the description text is more than 255 characters
    description : function(descriptionText) {
        if(descriptionText) {
            if(descriptionText.length <= 255) {
                return ""
            }else {
                return "Description is too long or doesnt start with uppercase letter."
            }
        }else {
            return ""
        }
    },

    //Function for checking if a string is valid number - used for price per hour and years of expirience data
    number : function(years) {
        if(years) {
            if(/^\d+$/.test(years)) {
                return ""
            }else {
                return "Incorrect format(Must be a valid number)."
            }
        }else {
            return "Years of expirience cannot be empty."
        }
    },

    //Function for validating the developer's name - it must consist of at least the first two name
    developerName : function(name) {
        if(name) {
            if(/(\w.+\s).+/i.test(name)) {
                return ""
            }else {
                return "Incorrect name format."
            }
        }else {
            return "Name cannot be empty."
        }
    },

    //Function for checking of the location is set, otherwise it returns error message
    location : function(location) {
        if(location) {
            return ""
        }else {
            return "Location cannot be empty."
        }
    }
}

export default validate