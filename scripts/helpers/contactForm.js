import { activerNavigationArrierePlan } from '../pages/photographer.js'

// ----- Contact Form Modal Open/Close -----
export function displayModal() {
  const modal = document.querySelector("#contact_modal");
	modal.style.display = "block";
}

export function closeModal() {
  const modal = document.querySelector("#contact_modal");
  modal.style.display = "none";
}

// ------ DOM Elements ------
const form = document.querySelector("form")
const tagFirst = document.querySelector("#first")
const tagLast = document.querySelector("#last")
const tagEmail = document.querySelector("#email")
const tagMessage = document.querySelector("#message")

const messageFirst = document.querySelector("#message-first")
const messageName = document.querySelector("#message-name")
const messageMail = document.querySelector("#message-mail")
const messageError = document.querySelector("#message-error")
let errorDetected = false
const formErrors = { shortName : "Il faut au minimum 2 charactères.",
                   badName : "Un caractère n'est pas reconnu. Merci de corriger.",
                   badEmail : "Veuillez renseigner une adresse mail valide.",
                   badSize : "Entre 10 et 300 caractères et pas de charactères spéciaux."
}  
                   
// ------ Regular Expression RegEx ------
const nameFirstRegEx = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$") 
const emailRegEx = new RegExp("^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$")
const twoOrMoreRegEx = /.{2,}/;
const messageSize = /^[a-zA-Z0-9\s.,!?-]{10,300}$/;

// ----- Contact Form Check informations Function -----
/**
 * Validates a first or last name and displays an error message if it doesn't meet the criteria.
 * @function
 * @param {string} firstOrName - The first or last name to validate.
 * @param {HTMLElement} messageLoc - The HTML element where the error message should be displayed (Name or Firstname).
 */
function checkName(firstOrName,messageLoc) {
  if (!twoOrMoreRegEx.test(firstOrName)) {
    messageLoc.innerText = formErrors.shortName;
    errorDetected = true;
  } else if (!nameFirstRegEx.test(firstOrName)) {
      messageLoc.innerText = formErrors.badName;
      errorDetected = true;
    }
  else {
    messageLoc.innerText = "";
  }
}

/** Validates an email address and displays an error message if it doesn't meet the criteria.
 * @function
 * @param {string} email - The email address to validate.
 */
function checkEmail(email) {
    if (!emailRegEx.test(email)) {
      messageMail.innerText = formErrors.badEmail;
      errorDetected = true;
  }
  else {
    messageMail.innerText = "";
  }
}

/** Validates the size and characters of a message and displays an error message if it doesn't meet the criteria.
 * @function
 * @param {string} message - The message text to validate.
 */
function checkMessageSize(message) {
  if (!messageSize.test(message)) {
    messageError.innerText = formErrors.badSize;
    errorDetected = true;
  } 
  else {
    messageError.innerText = "";
  }
}

// ----- Contact Form Event Listeneer on change -----
tagFirst.addEventListener('change', () => {checkName(tagFirst.value,messageFirst);});
tagLast.addEventListener('change', () => {checkName(tagLast.value,messageName);});
tagEmail.addEventListener('change', () => {checkEmail(tagEmail.value);});
tagMessage.addEventListener('change', () => {checkMessageSize(tagMessage.value);});


/**
 * Submit the form and retrieve the data using validation functions.
 * @param {Event} event - Form Submit Event
 */
function submitAndFetch(event) {
  event.preventDefault()
  errorDetected = false 

  try {
    checkName(tagFirst.value,messageFirst);
    checkName(tagLast.value,messageName);
    checkEmail(tagEmail.value);
    checkMessageSize(tagMessage.value);

    if (errorDetected) {
      console.log("Le formulaire contient des erreurs. Veuillez les corriger.");
      return;
    }
 
    const submissionForm = { 
      fistName : tagFirst.value,
      lastName : tagLast.value,
      email : tagEmail.value,
      message : tagMessage.value
      }
    console.log("Données renvoyée par le formulaire :", submissionForm)
    form.reset();
    closeModal();
    activerNavigationArrierePlan();

  } catch(error) {
      console.error("Erreur lors de la soumission du formulaire")
  }
}

// ------ Form Submit Event Listeneer ------ 
form.addEventListener("submit", event => submitAndFetch(event))