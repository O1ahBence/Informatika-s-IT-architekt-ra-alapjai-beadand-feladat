document.addEventListener('DOMContentLoaded', function() {
    // Űrlap elemek kiválasztása
    const urlap = document.getElementById('kapcsolatUrlap');

    // HIBAJAVÍTÁS: Ha nincs űrlap az oldalon (pl. Kezdőlap), akkor álljon le a script
    if (!urlap) {
        return; 
    }

    const nevInput = document.getElementById('nev');
    const emailInput = document.getElementById('email');
    const telefonInput = document.getElementById('telefon');
    const datumInput = document.getElementById('datum');
    const szolgaltatasInput = document.getElementById('szolgaltatas');
    
    // Hibaüzenet mezők
    const hibaNev = document.getElementById('hiba-nev');
    const hibaEmail = document.getElementById('hiba-email');
    const hibaTelefon = document.getElementById('hiba-telefon');
    const hibaDatum = document.getElementById('hiba-datum');
    const hibaSzolgaltatas = document.getElementById('hiba-szolgaltatas');

    // Ha megnyomják a küldés gombot
    urlap.addEventListener('submit', function(esemeny) {
        let mindenRendben = true;
        hibakTorlese();

        // Név ellenőrzése
        if (nevInput.value.trim().length < 3) {
            hibaMutat(nevInput, hibaNev, "A név megadása kötelező (min. 3 karakter)!");
            mindenRendben = false;
        }

        // Email ellenőrzése regex-szel
        const emailMinta = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailMinta.test(emailInput.value)) {
            hibaMutat(emailInput, hibaEmail, "Kérjük, adjon meg egy érvényes email címet!");
            mindenRendben = false;
        }

        // Telefon
        if (telefonInput.value.trim() === "") {
            hibaMutat(telefonInput, hibaTelefon, "A telefonszám megadása kötelező!");
            mindenRendben = false;
        }

        // Dátum
        if (datumInput.value === "") {
            hibaMutat(datumInput, hibaDatum, "Kérjük, válasszon időpontot!");
            mindenRendben = false;
        }

        // Szolgáltatás kiválasztása
        if (szolgaltatasInput.value === "") {
            hibaMutat(szolgaltatasInput, hibaSzolgaltatas, "Kérjük, válasszon szolgáltatást!");
            mindenRendben = false;
        }

        // Ha valami nem volt jó, ne küldje el
        if (!mindenRendben) {
            esemeny.preventDefault();
            console.log("Valami nem stimmel az űrlappal.");
        } else {
            alert("Köszönjük megkeresését! Hamarosan felvesszük Önnel a kapcsolatot.");
        }
    });

    // Segédfüggvény a hiba megjelenítésre
    function hibaMutat(inputMezo, hibaMezo, uzenet) {
        inputMezo.classList.add('beviteli-hiba'); 
        hibaMezo.textContent = uzenet;
    }

    // Hibák törlése újbóli próbálkozásnál
    function hibakTorlese() {
        const hibasInputok = document.querySelectorAll('.beviteli-hiba');
        hibasInputok.forEach(input => input.classList.remove('beviteli-hiba'));
        
        const uzenetek = document.querySelectorAll('.hiba-uzenet');
        uzenetek.forEach(msg => msg.textContent = "");
    }
});