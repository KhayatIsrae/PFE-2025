const url = "http://localhost:3000/"

const connectMetamask = async () => {
    if (typeof window.ethereum === 'undefined') {
        let popUp = document.getElementById("popUp")
        popUp.setAttribute("class", "popUp")
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
const disconnectMetamask=()=>{
    fetch(url,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({WALLET_CONNECTED: "" })
    })
    .then(response=>window.location.reload())
    .catch(e=>console.error(e))
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
    });
} else {
    let connectButton = document.getElementById("connectButton")
    connectButton.addEventListener("click", () => {
        connectMetamask()
    })
}


