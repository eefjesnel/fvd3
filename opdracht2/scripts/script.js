// JavaScript Document
console.log("howdy");

// library --> https://sortablejs.github.io/Sortable/
// documentatie --> 

var kledingkast = document.querySelector("section:nth-of-type(1) ul:first-of-type");
var outfit = document.querySelector("section:nth-of-type(3) ul:last-of-type");
// Naam opslaan
var textField = document.querySelector('section:first-of-type form input')
// slider
var kledingstukken = document.getElementsByClassName('kledingstuk');
var huidigKledingstuk = 0;





// Sortable JS library
new Sortable(kledingkast, {
	group: {
		name: 'kleding',
		pull: true,
    // Revert clone zodat het item ook weer terug geplaatst kan worden.
    revertClone: true, 
	},
  sort: true,
	animation: 300,
});

new Sortable(outfit, {
	group: {
		name: 'kleding',
	},
	animation: 300,
  // Als je een item uit de lijst dragt is de lijst lin de slider leeg. onAdd is de class die op het item staat als deze uit de lijst wordt gedragt. 
  // Door hier de functie volgende() aan te geven, zal het volgende item in de lijst worden geplaatst. 
  onAdd: function(event){
    // haal het volgende kledingstuk op uit de kledingkast
    volgende()
  }
});







// functie voor het tekstveld en het opslaan van de naam
function verzendNaam(){
  // Variabele aanroepen
  var textField = document.querySelector('section:first-of-type form input')
  var opslaanButton = document.querySelector('section:first-of-type form button')
  var hierKomtDeNaam = document.querySelector('section:first-of-type div h2 div')
  console.log(textField.value)
  // Naam kledingkast plaatsen in div
  hierKomtDeNaam.innerHTML = textField.value

  // Textfield en opslaanbutton verwijderen voor een clean look
  textField.classList.add('hide')
  opslaanButton.classList.add('hide')
}

// Het opslaan van de naam met de enter key
textField.addEventListener("keydown", function(event) {
  // Om ervoor te zorgen dat je ook je naam kan opslaan met de enter key heb ik deze code geschreven.
  // https://www.youtube.com/watch?v=lNJMDTSkNXo en https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp hebben me hierbij geholpen.
  var textField = document.querySelector('section:first-of-type form input')
  var opslaanButton = document.querySelector('section:first-of-type form button')
  var hierKomtDeNaam = document.querySelector('section:first-of-type div h2 div')
  if (event.key === "Enter") {
    // Defaults uitschakelen.
    event.preventDefault();
    // Afspelen van de functie verzendNaam() bij het klikken van de enter toets
    verzendNaam()
  }
})







// slider
// Ik had al eerder een code geschreven met een for loop. Ik begreep er toen vrij weinig van, maar nu wel iets meer. Ik heb een deel van deze code overgenomen en vanalles opgezocht.
function wijzigKledingStuk(){
    // https://www.youtube.com/watch?v=y1LseZjSfRw Dit filmpje heeft me geholpen met het schrijven van de regel hieronder.
    // https://www.codecademy.com/forum_questions/521be7a080ff33604400099c In dit forum schreef iemand waarom je i < array.length 
    // moet gebruiken en dat ligt aan het feit dat array's bij 0 beginnen in plaats van 1.
    // Als ik het goed begrijp, zeg ik eigenlijk hier: Computer, ga elk item in de array af en verwijder de class toonKledingstuk als je die tegenkomt.
  for(var kledingstukInArray = 0; kledingstukInArray < kledingstukken.length; kledingstukInArray++){
    // haal overal de klasse weg, dus niet tonen van het kledingstuk
    kledingstukken[kledingstukInArray].classList.remove('toonKledingstuk')
  }
  
  // toon huidig kledingstuk
  // Hier zeg ik tegen de computer: ga elk item af en kijk of het het huidige kledingstuk is. Voeg dan de class toonKledingstuk toe.
  // Het huidige kledingstuk is in het begin nog 0 totdat je op vorige of volgende klikt en huidige kledingstuk-1 wordt. 
  kledingstukken[huidigKledingstuk].classList.add('toonKledingstuk')
}

function vorige(){
  // huidige kledingstuk-1, dus eentje terug.
  huidigKledingstuk = huidigKledingstuk-1

  // Hier heb ik code geschreven om te zorgen dat de slider als een soort carousel werkt. 
  // Als het huidige kledingstuk minder is dan 0 dan wordt het huidige kledingstuk het laatste item in de array.
  if(huidigKledingstuk < 0)
    huidigKledingstuk = kledingstukken.length-1

  wijzigKledingStuk()
}
function volgende(){
  // huidige kledingstuk+1, dus eentje verder.
  huidigKledingstuk = huidigKledingstuk+1

  // Als het huidige kledingstuk meer is dan de lengte van de array, in dit geval 20 dan wordt het huidige kledingstuk het eerste item in de array dus 0.
  if(huidigKledingstuk > (kledingstukken.length-1))
    huidigKledingstuk = 0
    
  wijzigKledingStuk()
}






// in het begin, zodat de slider niet leeg is aan het begin.
wijzigKledingStuk()







// Functie om je outfit uit te kiezen en te zorgen dat de slider weggaat en dat de "dit is mijn outfit" button veranderd in "wijzig outfit"
function kiesOutfit(){
  var sliderKnoppen = document.querySelector("section:nth-of-type(2)")
  var kiesOutfit = document.querySelector("section:nth-of-type(4) button:first-of-type")
  var wijzigOutfit = document.querySelector("section:nth-of-type(4) button:last-of-type")
  var outfit = document.querySelector("section:nth-of-type(3) ul:last-of-type");

  kledingkast.classList.add('hide')
  sliderKnoppen.classList.add('hide')
  kiesOutfit.classList.add('hide')
  outfit.classList.add('confetti')

  // button wijzig outfit toevoegen wanneer je op dit is mijn outfit klikt.
  wijzigOutfit.classList.remove('hide')
}

// Functie om je outfit te wijzigen.
function wijzigOutfit(){
  var sliderKnoppen = document.querySelector("section:nth-of-type(2)")
  var kiesOutfit = document.querySelector("section:nth-of-type(4) button:first-of-type")
  var wijzigOutfit = document.querySelector("section:nth-of-type(4) button:last-of-type")
  var outfit = document.querySelector("section:nth-of-type(3) ul:last-of-type");

  kledingkast.classList.remove('hide')
  sliderKnoppen.classList.remove('hide')
  kiesOutfit.classList.remove('hide')
  outfit.classList.remove('confetti')
  // button wijzig outfit toevoegen wanneer je op wijzig outfit klikt.
  wijzigOutfit.classList.add('hide')
}

