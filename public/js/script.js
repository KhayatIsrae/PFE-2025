const url = "http://localhost:3000/"
const urlPresence = "http://localhost:3000/marquerPresence"

const hideElement = (Element) => {
    Element.setAttribute("class", "hide")
}
let popUp = document.getElementById("popUp");
let closeButton = popUp.querySelector(".btnAnnuller");
let message = document.createElement("p");
let link = document.getElementById("popUpA");
const connectMetamask = async () => {
    if (typeof window.ethereum === 'undefined') {
        popUp.setAttribute("class", "popUpErr")
        message.textContent = "MetaMask n'est pas installé.";
        link.setAttribute("href", "https://metamask.io/download/");
        link.setAttribute("target", "_blank")
        link.textContent = "Installer MetaMask";
        link.removeAttribute("class");
    } else {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", [])
            const signer = provider.getSigner()
            WALLET_CONNECTED = await signer.getAddress()
            fetch(url, {
                method: "POST",
                body: JSON.stringify({ WALLET_CONNECTED }),
                headers: { "Content-Type": "application/json" }
            })
                .then(response => window.location.reload())
                .catch(e => console.log(e))
        } catch (erreur) {
            console.error("Error connecting to MetaMask", error);
        }
    }
    return { WALLET_CONNECTED };
}
const disconnectMetamask = () => {
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ WALLET_CONNECTED: "" })
    })
        .then(response => window.location.reload())
        .catch(e => console.error(e))
}

if (isConnected) {
    let btnDeconnection = document.getElementById("btnDeconnection")
    btnDeconnection.setAttribute("class", "btnDeconnection")
    btnDeconnection.addEventListener("click", () => {
        disconnectMetamask()
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
        connectMetamask()
    })
}
popUp.appendChild(message);
popUp.insertBefore(message, closeButton);
popUp.insertBefore(link, closeButton);
