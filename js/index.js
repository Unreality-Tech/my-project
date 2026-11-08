document.addEventListener('DOMContentLoaded', () => {
    
    const dynamicText = document.querySelector('.hero p');

    const words = [
        "Experience the next generation of holograms.",
        "Connect with people like never before.",
        "Step into the future of virtual presence."
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            dynamicText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;

        } else {
            dynamicText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause de 2 secondes à la fin de la phrase
            isDeleting = true;
        } 
        
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Passe à la phrase suivante
            typeSpeed = 500; // Petite pause avant d'écrire la suivante
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
});