const achievementListe = [

    {
        name: "Erste Schritte",
        icon: "🎮",

        check: () =>
            spiele.length >= 1
    },

    {
        name: "Brettspiel-Süchtig",
        icon: "🔥",

        check: () =>
            spiele.length >= 10
    },

    {
        name: "Marathonspieler",
        icon: "🏆",

        check: () =>
            spiele.length >= 100
    },

    {
        name: "Allrounder",
        icon: "🎲",

        check: () =>
            spielListe.length >= 10
    },

    {
        name: "Legende",
        icon: "👑",

        check: () =>
            spiele.length >= 1000
    },

    {
        name: "Glückspilz",
        icon: "🍀",

        check: () => {

            let heute =
                new Date()
                .toLocaleDateString()

            let heuteSpiele =
                spiele.filter(

                s => s.datum == heute

            )

            return heuteSpiele.length >= 3
        }
    },

    {
        name: "Nachtspieler",
        icon: "🌙",

        check: () => {

            return spiele.some(
                spiel => {

                let stunde =
                    parseInt(
                        spiel
                        .zeit
                        .split(":")[0]
                    )

                return (
                    stunde >= 0 &&
                    stunde <= 4
                )
            })
        }
    }
]