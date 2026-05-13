function showWinAnimation(){

    let animation =
        document.getElementById(
            "winAnimation"
        )

    animation.classList.remove(
        "hidden"
    )

    setTimeout(() => {

        animation.classList.add(
            "hidden"
        )

    }, 2000)
}

function showAchievement(text){

    let popup =
        document.getElementById(
            "achievementPopup"
        )

    let achievementText =
        document.getElementById(
            "achievementText"
        )

    achievementText.innerHTML = `

        🏆 Achievement freigeschaltet:

        <br><br>

        ${text}

    `

    popup.classList.remove(
        "hidden"
    )

    setTimeout(() => {

        popup.classList.add(
            "hidden"
        )

    }, 3000)
}