document.addEventListener('DOMContentLoaded', function() {
    // Elemek begyűjtése
    const szamolasGomb = document.getElementById('szamolas-gomb');

    // HIBAJAVÍTÁS: Ha nincs kalkulátor az oldalon, álljon le
    if (!szamolasGomb) {
        return;
    }

    const eredmenyDiv = document.getElementById('szamolas-eredmeny');
    const teruletInput = document.getElementById('szamolo-terulet');
    const tipusSelect = document.getElementById('szamolo-tipus');
    const videoCheckbox = document.getElementById('opcio-video');
    const rawCheckbox = document.getElementById('opcio-nyers');

    // Konstansok az árazáshoz
    const ALAP_AR_PER_NM = 250; // ft/nm
    const MINIMUM_DIJ = 30000; 

    // Gombnyomásra indul a számolás
    szamolasGomb.addEventListener('click', function() {
        let terulet = Number(teruletInput.value);
        let tipusSzorzo = Number(tipusSelect.value); 
        
        // Ellenőrzés
        if (terulet <= 0) {
            eredmenyDiv.textContent = "Hiba: Kérjük adjon meg valós területet!";
            eredmenyDiv.style.backgroundColor = "#e74c3c";
            return; 
        }

        // Alap költség kiszámolása
        let alapKoltseg = (terulet * ALAP_AR_PER_NM) * tipusSzorzo;

        // Ha túl kicsi az összeg, akkor a minimum díjat számoljuk
        if (alapKoltseg < MINIMUM_DIJ) {
            alapKoltseg = MINIMUM_DIJ;
        }

        // Extrák hozzáadása
        let extraKoltseg = 0;
        if (videoCheckbox.checked) {
            extraKoltseg += Number(videoCheckbox.value); 
        }
        if (rawCheckbox.checked) {
            extraKoltseg += Number(rawCheckbox.value); 
        }

        // Végösszeg és kiírás
        let vegosszeg = alapKoltseg + extraKoltseg;
        let formazottAr = vegosszeg.toLocaleString('hu-HU');
        
        eredmenyDiv.textContent = `Becsült ár: ${formazottAr} Ft`;
        eredmenyDiv.style.backgroundColor = "#2c3e50"; 
        
        // Kis animáció
        eredmenyDiv.style.transform = "scale(1.05)";
        setTimeout(() => {
            eredmenyDiv.style.transform = "scale(1)";
        }, 200);
    });
});