// ===========================================================
// home.js — only for index.html
// 1) typing effect in the hero   2) show 4 featured products
// ===========================================================

// ---------- 1) Typing effect ----------
var sentences = [
  "Beam a friend into your living room.",
  "Or beam over to theirs — one tap.",
  "Distance changes. The bond stays."
];
var sentenceIndex = 0;   // which sentence we are on
var letterIndex = 0;     // how many letters are showing
var deleting = false;    // are we typing or erasing?
var typedText = document.getElementById("typed");

function type() {
  var sentence = sentences[sentenceIndex];

  if (deleting) {
    letterIndex--;
  } else {
    letterIndex++;
  }
  typedText.textContent = sentence.substring(0, letterIndex);

  var speed = deleting ? 30 : 70;

  if (!deleting && letterIndex === sentence.length) {
    deleting = true;          // finished typing: wait, then erase
    speed = 1500;
  } else if (deleting && letterIndex === 0) {
    deleting = false;         // finished erasing: go to next sentence
    sentenceIndex = (sentenceIndex + 1) % sentences.length;
    speed = 400;
  }
  setTimeout(type, speed);
}
type();

// ---------- 2) Featured products ----------
var featured = document.getElementById("featured");
for (var i = 0; i < 4; i++) {
  featured.innerHTML += makeCard(products[i]);
}
