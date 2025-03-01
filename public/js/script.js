const url = "http://localhost:3000/"
const urlPresence = "http://localhost:3000/marquerPresence"

const hideElement = (Element) => {
    Element.setAttribute("class", "hide")
}
let popUp = document.getElementById("popUp");
let closeButton = popUp.querySelector(".btnAnnuller");
let message = document.createElement("p");
let link = document.getElementById("popUpA");

const logIn = (mail, mdp) => {
    fetch(url, {
        method: "POST",
        body: JSON.stringify({ mail, mdp }),
        headers: { "Content-Type": "application/json" }
    })
        .then(async (response) => {
            if (response.status >= 200 && response.status < 300) {
                return window.location.reload()
            } else {
                response = await response.json()
                message.textContent = response.msg
                popUp.setAttribute("class", "popUpErr");
            }
        })
        .catch(e => console.log("erreur:", e))
}
const disconnect = () => {
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disconnect: true })
    })
        .then(response => window.location.reload())
        .catch(e => console.error(e))
}
if (isConnected) {
    let btnDeconnection = document.getElementById("btnDeconnection")
    btnDeconnection.setAttribute("class", "btnDeconnection")
    btnDeconnection.addEventListener("click", () => {
        disconnect()
    })
    const loginBox = document.querySelector(".login-box ")
    loginBox.style.width = "500px"
    loginBox.style.height = "420px"
    const scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
            width: 250,
            height: 250,
        },
        fps: 20
    })
    scanner.render((result) => {
        //code du resultat
        let obj = { idExam: result }
        fetch(urlPresence, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    popUp.setAttribute("class", "popUpVal");
                    message.textContent = "Présence marquée avec succès";
                } else {
                    popUp.setAttribute("class", "popUpErr");
                    message.textContent = "Erreur, présence non marquée";
                }
            })

            .catch(e => console.log(e))
    });
} else {
    let connectButton = document.getElementById("connectButton")
    connectButton.addEventListener("click", () => {
        let email = document.getElementById("emailInput").value
        let password = document.getElementById("passwordInput").value
        logIn(email, password)
    })
}
popUp.appendChild(message);
popUp.insertBefore(message, closeButton);
popUp.insertBefore(link, closeButton);
