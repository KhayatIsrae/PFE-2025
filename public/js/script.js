const url="http://localhost:3000/"


let connectButton = document.getElementById("connectButton")
connectButton.addEventListener("click",()=>{
    connectMetamask()
})


const connectMetamask= async ()=>{
    const provider= new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts",[])
    const signer=provider.getSigner()
    const WALLET_CONNECTED=await signer.getAddress()
    fetch(url,{
        method: "POST",
        body : JSON.stringify({WALLET_CONNECTED}),
        headers:{"Content-Type":"application/json"}
    })
    .then(response=>window.location.reload())
    .catch(e=>console.log(e))
}

