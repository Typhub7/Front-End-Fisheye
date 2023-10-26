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

function checkMessageSize(message) {
  if (!messageSize.test(message)) {
    messageError.innerText = formErrors.badSize;
    errorDetected = true;
  } 
  else {
    messageError.innerText = "";
  }
}

// Submission control on change event
tagFirst.addEventListener('change', () => {checkName(tagFirst.value,messageFirst);});
tagLast.addEventListener('change', () => {checkName(tagLast.value,messageName);});
tagEmail.addEventListener('change', () => {checkEmail(tagEmail.value);});
tagMessage.addEventListener('change', () => {checkMessageSize(tagMessage.value);});


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
    console.log("Formulaire correctement rempli")
 
    const submissionForm = { 
      fistName : tagFirst.value,
      lastName : tagLast.value,
      email : tagEmail.value,
      message : tagMessage.value
      }
      console.log("Données renvoyée par le formulaire :", submissionForm)
    form.reset();     // Remove It when validation fetch will be ok
    closeModal();
    console.log("close Modal Ok")


  } catch(error) {
      console.error("Erreur lors de la soumission du formulaire")
  }
}

// ------ Submit ------ 
form.addEventListener("submit", event => submitAndFetch(event))