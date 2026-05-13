let spiele = JSON.parse(
    localStorage.getItem("spiele")
) || []

let spielListe = JSON.parse(
    localStorage.getItem("spielListe")
) || [
    "Phase10",
    "Skijo"
]

let spielerListe = JSON.parse(
    localStorage.getItem("spielerListe")
) || [
    "Noé",
    "Sina"
]

let freigeschaltet = JSON.parse(
    localStorage.getItem(
        "freigeschaltet"
    )
) || []

start()

function start(){

    dropdownsNeuLaden()

    statistikAnzeigen()

    verlaufAnzeigen()

    homeAnzeigen()

    achievementsAnzeigen()

    profilbilderLaden()
}

// TABS
function zeigeTab(tabName){

    document
    .querySelectorAll(".tab")
    .forEach(tab => {

        tab.style.display = "none"

    })

    document.getElementById(
        tabName
    ).style.display = "block"

    let buttons =
        document.querySelectorAll(
            ".tabButton"
        )

    buttons.forEach(btn => {

        btn.classList.remove(
            "active"
        )

    })

    if(tabName == "home"){
        buttons[0].classList.add(
            "active"
        )
    }

    if(tabName == "schreiben"){
        buttons[1].classList.add(
            "active"
        )
    }

    if(tabName == "statistik"){
        buttons[2].classList.add(
            "active"
        )
    }

    if(tabName == "verlauf"){
        buttons[3].classList.add(
            "active"
        )
    }

    if(tabName == "achievements"){
        buttons[4].classList.add(
            "active"
        )
    }
}

// DROPDOWNS
function dropdownsNeuLaden(){

    let spielSelect =
        document.getElementById(
            "spielSelect"
        )

    spielSelect.innerHTML = ""

    spielListe.forEach(spiel => {

        spielSelect.innerHTML += `
            <option>${spiel}</option>
        `
    })

    let gewinner =
        document.getElementById(
            "gewinner"
        )

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
        "Neues Spiel hinzufügen"
    )

    if(!neuesSpiel){
        return
    }

    spielListe.push(neuesSpiel)

    localStorage.setItem(
        "spielListe",
        JSON.stringify(spielListe)
    )

    dropdownsNeuLaden()
}

// SPIELER HINZUFÜGEN
function spielerHinzufuegenPopup(){

    let neuerSpieler = prompt(
        "Neuen Spieler hinzufügen"
    )

    if(!neuerSpieler){
        return
    }

    spielerListe.push(neuerSpieler)

    localStorage.setItem(
        "spielerListe",
        JSON.stringify(spielerListe)
    )

    dropdownsNeuLaden()
}

// SPIEL LÖSCHEN
function spielLoeschenDropdown(){

    let spiel =
        document.getElementById(
            "spielSelect"
        ).value

    let sicher = confirm(
        "Spiel wirklich löschen?"
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
}

// SPIELER LÖSCHEN
function spielerLoeschenDropdown(){

    let spieler =
        document.getElementById(
            "gewinner"
        ).value

    let sicher = confirm(
        "Spieler wirklich löschen?"
    )

    if(!sicher){
        return
    }

    spielerListe =
        spielerListe.filter(
            s => s != spieler
        )

    localStorage.setItem(
        "spielerListe",
        JSON.stringify(spielerListe)
    )

    dropdownsNeuLaden()
}

// SPIEL SPEICHERN
function speichern(){

    let spiel =
        document.getElementById(
            "spielSelect"
        ).value

    let gewinner =
        document.getElementById(
            "gewinner"
        ).value

    let datum = new Date()

    spiele.unshift({

        spiel: spiel,

        gewinner: gewinner,

        datum:
            datum.toLocaleDateString(),

        zeit:
            datum.toLocaleTimeString()

    })

    localStorage.setItem(
        "spiele",
        JSON.stringify(spiele)
    )

    showWinAnimation()

    statistikAnzeigen()

    verlaufAnzeigen()

    homeAnzeigen()

    achievementsPruefen()
}

// HOME
function homeAnzeigen(){

    let letzterGewinner =
        spiele[0]?.gewinner
        || "Noch niemand"

    let fuehrend =
        "Noch keine Spiele"

    let siege = {}

    spielerListe.forEach(spieler => {

        siege[spieler] = 0

    })

    spiele.forEach(spiel => {

        siege[spiel.gewinner]++

    })

    let max = 0

    for(let spieler in siege){

        if(siege[spieler] > max){

            max = siege[spieler]

            fuehrend = spieler
        }
    }

    let meist =
        "Noch keine Spiele"

    let spielCounter = {}

    spiele.forEach(spiel => {

        if(
            !spielCounter[spiel.spiel]
        ){

            spielCounter[
                spiel.spiel
            ] = 0
        }

        spielCounter[
            spiel.spiel
        ]++
    })

    let maxSpiele = 0

    for(let spiel in spielCounter){

        if(
            spielCounter[spiel]
            > maxSpiele
        ){

            maxSpiele =
                spielCounter[spiel]

            meist = spiel
        }
    }

    document.getElementById(
        "homeStats"
    ).innerHTML = `

        <div class="statBox">

            🏆 Letzter Gewinner:

            <br><br>

            ${letzterGewinner}

        </div>

        <div class="statBox">

            👑 Aktuell führend:

            <br><br>

            ${fuehrend}

        </div>

        <div class="statBox">

            🎲 Meistgespieltes Spiel:

            <br><br>

            ${meist}

        </div>

        <div class="statBox">

            📈 Gesamtspiele:

            <br><br>

            ${spiele.length}

        </div>
    `
}

// STATISTIK
function statistikAnzeigen(){

    let html = ""

    spielerListe.forEach(spieler => {

        let siege = 0

        spiele.forEach(spiel => {

            if(
                spiel.gewinner
                == spieler
            ){
                siege++
            }
        })

        html += `
            <div class="statBox">
                🏆 ${spieler}:
                ${siege} Siege
            </div>
        `
    })

    document.getElementById(
        "gesamtStats"
    ).innerHTML = html

    // GEWINNCHANCEN
    let chanceHTML = ""

    spielListe.forEach(spielname => {

        chanceHTML += `
            <div class="statBox">

                <h3>
                    🎮 ${spielname}
                </h3>
        `

        let total = 0

        spiele.forEach(spiel => {

            if(
                spiel.spiel
                == spielname
            ){
                total++
            }
        })

        spielerListe.forEach(spieler => {

            let wins = 0

            spiele.forEach(spiel => {

                if(

                    spiel.spiel
                    == spielname

                    &&

                    spiel.gewinner
                    == spieler

                ){
                    wins++
                }
            })

            let chance = 0

            if(total > 0){

                chance = Math.round(
                    (wins / total) * 100
                )
            }

            chanceHTML += `
                ${spieler}:
                ${chance}% Gewinnchance
                <br>
            `
        })

        chanceHTML += `
            </div>
        `
    })

    document.getElementById(
        "chanceStats"
    ).innerHTML = chanceHTML

    // SIEGE PRO SPIEL
    let spielHTML = ""

    spielListe.forEach(spielname => {

        spielHTML += `

            <div class="statBox">

                <h3>
                    🎮 ${spielname}
                </h3>
        `

        spielerListe.forEach(spieler => {

            let siege = 0

            spiele.forEach(spiel => {

                if(

                    spiel.spiel
                    == spielname

                    &&

                    spiel.gewinner
                    == spieler

                ){
                    siege++
                }
            })

            spielHTML += `
                🏆 ${spieler}:
                ${siege} Siege
                <br>
            `
        })

        spielHTML += `
            </div>
        `
    })

    document.getElementById(
        "spielStats"
    ).innerHTML = spielHTML
}

// VERLAUF
function verlaufAnzeigen(){

    let container =
        document.getElementById(
            "verlaufListe"
        )

    container.innerHTML = ""

    spiele.forEach((eintrag,index)=>{

        container.innerHTML += `

            <div class="statBox">

                🎮 ${eintrag.spiel}

                <br><br>

                🏆 Gewinner:
                ${eintrag.gewinner}

                <br>

                📅 ${eintrag.datum}

                <br>

                ⏰ ${eintrag.zeit}

                <button

                    class="loeschButton"

                    onclick="
                        spielLoeschen(
                            ${index}
                        )
                    "

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
        "Eintrag wirklich löschen?"
    )

    if(!sicher){
        return
    }

    spiele.splice(index,1)

    localStorage.setItem(
        "spiele",
        JSON.stringify(spiele)
    )

    start()
}

// PROFILBILD ÄNDERN
function profilbildAendern(
    event,
    bildId,
    storageName
){

    let file =
        event.target.files[0]

    if(!file){
        return
    }

    let reader = new FileReader()

    reader.onload = function(e){

        let bild =
            e.target.result

        document.getElementById(
            bildId
        ).src = bild

        localStorage.setItem(
            storageName,
            bild
        )
    }

    reader.readAsDataURL(file)
}

// PROFILBILDER LADEN
function profilbilderLaden(){

    let bild1 =
        localStorage.getItem(
            "bild1"
        )

    let bild2 =
        localStorage.getItem(
            "bild2"
        )

    if(bild1){

        document.getElementById(
            "profilbild1"
        ).src = bild1
    }

    if(bild2){

        document.getElementById(
            "profilbild2"
        ).src = bild2
    }
}

// ACHIEVEMENTS PRÜFEN
function achievementsPruefen(){

    achievementListe.forEach(
        achievement => {

        if(

            achievement.check()

            &&

            !freigeschaltet.includes(
                achievement.name
            )

        ){

            freigeschaltet.push(
                achievement.name
            )

            localStorage.setItem(

                "freigeschaltet",

                JSON.stringify(
                    freigeschaltet
                )
            )

            showAchievement(
                achievement.name
            )
        }
    })

    achievementsAnzeigen()
}

// ACHIEVEMENTS
function achievementsAnzeigen(){

    let html = ""

    achievementListe.forEach(
        achievement => {

        let unlocked =

            freigeschaltet.includes(
                achievement.name
            )

        html += `

            <div class="statBox">

                ${achievement.icon}

                ${achievement.name}

                <br><br>

                ${
                    unlocked

                    ? "✅ Freigeschaltet"

                    : "🔒 Gesperrt"
                }

            </div>
        `
    })

    document.getElementById(
        "achievementListe"
    ).innerHTML = html
}