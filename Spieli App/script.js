let spiele = JSON.parse(localStorage.getItem("spiele")) || []

let spielListe = JSON.parse(localStorage.getItem("spielListe")) || [
    "Phase10",
    "Skijo"
]

let spielerListe = JSON.parse(localStorage.getItem("spielerListe")) || [
    "Noé",
    "Sina"
]

dropdownsNeuLaden()
statistikAnzeigen()
verlaufAnzeigen()

// TABS
function zeigeTab(tabName){

    document.getElementById("schreiben").style.display = "none"
    document.getElementById("statistik").style.display = "none"
    document.getElementById("verlauf").style.display = "none"

    document.getElementById(tabName).style.display = "block"

    let buttons = document.querySelectorAll(".tabButton")

    buttons.forEach(btn => {
        btn.classList.remove("active")
    })

    if(tabName == "schreiben"){
        buttons[0].classList.add("active")
    }
    else if(tabName == "statistik"){
        buttons[1].classList.add("active")
    }
    else{
        buttons[2].classList.add("active")
    }
}

// DROPDOWNS
function dropdownsNeuLaden(){

    // SPIELE
    let spielSelect = document.getElementById("spielSelect")

    spielSelect.innerHTML = ""

    spielListe.forEach(spiel => {

        spielSelect.innerHTML += `
            <option>${spiel}</option>
        `
    })

    // SPIELER
    let gewinner = document.getElementById("gewinner")

    gewinner.innerHTML = ""

    spielerListe.forEach(spieler => {

        gewinner.innerHTML += `
            <option>${spieler}</option>
        `
    })
}

// SPIEL HINZUFÜGEN
function spielHinzufuegenPopup(){

    let neuesSpiel = prompt(
        "Wie heisst das neue Spiel?"
    )

    if(
        neuesSpiel == null ||
        neuesSpiel == ""
    ){
        return
    }

    spielListe.push(neuesSpiel)

    localStorage.setItem(
        "spielListe",
        JSON.stringify(spielListe)
    )

    dropdownsNeuLaden()

    document.getElementById(
        "spielSelect"
    ).value = neuesSpiel
}

// SPIELER HINZUFÜGEN
function spielerHinzufuegenPopup(){

    let neuerSpieler = prompt(
        "Wie heisst der neue Spieler?"
    )

    if(
        neuerSpieler == null ||
        neuerSpieler == ""
    ){
        return
    }

    spielerListe.push(neuerSpieler)

    localStorage.setItem(
        "spielerListe",
        JSON.stringify(spielerListe)
    )

    dropdownsNeuLaden()

    document.getElementById(
        "gewinner"
    ).value = neuerSpieler
}

// SPIEL LÖSCHEN
function spielLoeschenDropdown(){

    let spiel = document.getElementById(
        "spielSelect"
    ).value

    let sicher = confirm(
        "Willst du dieses Spiel wirklich löschen?"
    )

    if(!sicher){
        return
    }

    spielListe = spielListe.filter(
        s => s != spiel
    )

    localStorage.setItem(
        "spielListe",
        JSON.stringify(spielListe)
    )

    dropdownsNeuLaden()
    statistikAnzeigen()
}

// SPIELER LÖSCHEN
function spielerLoeschenDropdown(){

    let spieler = document.getElementById(
        "gewinner"
    ).value

    let sicher = confirm(
        "Willst du diesen Spieler wirklich löschen?"
    )

    if(!sicher){
        return
    }

    spielerListe = spielerListe.filter(
        s => s != spieler
    )

    localStorage.setItem(
        "spielerListe",
        JSON.stringify(spielerListe)
    )

    dropdownsNeuLaden()
    statistikAnzeigen()
}

// SPIEL SPEICHERN
function speichern(){

    let spiel = document.getElementById(
        "spielSelect"
    ).value

    let gewinner = document.getElementById(
        "gewinner"
    ).value

    spiele.push({
        spiel: spiel,
        gewinner: gewinner
    })

    localStorage.setItem(
        "spiele",
        JSON.stringify(spiele)
    )

    statistikAnzeigen()
    verlaufAnzeigen()

    alert("✅ Spiel gespeichert")
}

// STATISTIK
function statistikAnzeigen(){

    let gesamtHTML = ""

    spielerListe.forEach(spieler => {

        let siege = 0

        spiele.forEach(spiel => {

            if(spiel.gewinner == spieler){
                siege++
            }

        })

        gesamtHTML += `
            <div class="statBox">
                🏆 ${spieler}: ${siege} Siege
            </div>
        `
    })

    document.getElementById(
        "gesamtStats"
    ).innerHTML = gesamtHTML

    // PRO SPIEL
    let html = ""

    spielListe.forEach(spielname => {

        html += `
            <div class="statBox">

                <h3>🎮 ${spielname}</h3>
        `

        spielerListe.forEach(spieler => {

            let siege = 0

            spiele.forEach(spiel => {

                if(
                    spiel.spiel == spielname &&
                    spiel.gewinner == spieler
                ){
                    siege++
                }

            })

            html += `
                🏆 ${spieler}: ${siege} Siege<br>
            `
        })

        html += `
            </div>
        `
    })

    document.getElementById(
        "spielStats"
    ).innerHTML = html
}

// VERLAUF
function verlaufAnzeigen(){

    let container = document.getElementById(
        "verlaufListe"
    )

    container.innerHTML = ""

    spiele.forEach((eintrag, index) => {

        container.innerHTML += `

            <div class="statBox">

                🎮 ${eintrag.spiel}<br><br>

                🏆 Gewinner:
                ${eintrag.gewinner}

                <button
                    class="loeschButton"
                    onclick="spielLoeschen(${index})"
                >
                    🗑 Löschen
                </button>

            </div>

        `
    })
}

// VERLAUF LÖSCHEN
function spielLoeschen(index){

    let sicher = confirm(
        "Willst du diesen Eintrag wirklich löschen?"
    )

    if(!sicher){
        return
    }

    spiele.splice(index, 1)

    localStorage.setItem(
        "spiele",
        JSON.stringify(spiele)
    )

    statistikAnzeigen()
    verlaufAnzeigen()
}