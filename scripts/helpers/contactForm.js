function displayModal() {
  const modal = document.querySelector("#contact_modal");
	modal.style.display = "block";
}

function closeModal() {
  const modal = document.querySelector("#contact_modal");
  modal.style.display = "none";
}


// ------ DOM Elements ------
const form = document.querySelector("form")
const modal = document.querySelector(".modal")
const contactModal = document.querySelector("#contact_modal")

// ID for form informations
const tagFirst = document.querySelector("#first")
const tagLast = document.querySelector("#last")
const tagEmail = document.querySelector("#email")

// ID for error alert Message
const messageFirst = document.querySelector("#message-first")
const messageName = document.querySelector("#message-name")
const messageMail = document.querySelector("#message-mail")

// ----- Other Variable ------
let errorDetected = false
const formErrors = { shortName : "Il faut au minimum 2 charactères.",
                   badName : "Un caractère n'est pas reconnu. Merci de corriger.",
                   badEmail : "Veuillez renseigner une adresse mail valide.",
                   badQuantity : "Veuillez renseigner un nombre.",
}  
                   
// ------ Regular Expression RegEx ------
const nameFirstRegEx = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$") 
const emailRegEx = new RegExp("^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$")
const twoOrMoreRegEx = /.{2,}/;

// ------ Event listener for open and close modal  ------

document.addEventListener('DOMContentLoaded', () => {
  const modalBtn = document.querySelector(".contact_button");
  modalBtn.addEventListener("click", displayModal); })

/** All Check informations Function **/
// This function check that the name and firstname  
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

// This function Check that email is correct 
function checkEmail(email) {
    if (!emailRegEx.test(email)) {
      messageMail.innerText = formErrors.badEmail;
      errorDetected = true;
  }
  else {
    messageMail.innerText = "";
  }
}


/**  ALL other function **/

/** This function :
 * Check the value of the form buy calling individual checking function 
 * Control on Event change, that the new form value is valid (same check)
*/
const globalValidation = () => {
  // 1st form control on submission event
  checkName(tagFirst.value,messageFirst);
  checkName(tagLast.value,messageName);
  checkEmail(tagEmail.value);

  // Submission control on change event
  tagFirst.addEventListener('change', () => {checkName(tagFirst.value,messageFirst);});
  tagLast.addEventListener('change', () => {checkName(tagLast.value,messageName);});
  tagEmail.addEventListener('change', () => {checkEmail(tagEmail.value);});
  
}

const validationFetch = async () => {
    // Adding form info object
    const submissionForm = { 
      fistName : tagFirst.value,
      lastName : tagLast.value,
      email : tagEmail.value,
      }
      console.log("Données renvoyée par le formulaire :", submissionForm)
  
    // Form destination fake URL add for example
    const url = 'https://OCGameon.com/submit-form';

    // Fetch parameters 
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(submissionForm)
    };

    const response = await fetch(url, requestOptions)

    if (response.ok) {
      form.reset()        // If Ok, Clean the form au lieu de formBody
      console.log('Réponse du serveur :', response)
      return response.json(); // If answer is ok, response can be add here         } else {    
    } else {
      throw new Error('Échec de la requête');
    } 
}
function submitAndFetch(event) {
  event.preventDefault()
  
  errorDetected = false 
  
  try {
    globalValidation()

    if (errorDetected) {
      console.log("Le formulaire contient des erreurs. Veuillez les corriger.");
      return;
    }
    console.log("Formulaire correctement rempli")
 
    validationFetch()
    console.log("ValidationFetch OK")
    form.reset();     // Remove It when validation fetch will be ok
    closeModal();
    console.log("close Modal Ok")


  } catch(error) {
      console.error("Erreur lors de la soumission du formulaire")
  }
}

// ------ Submit ------ 
form.addEventListener("submit", event => submitAndFetch(event))