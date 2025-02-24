const ethers = require("ethers")

const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/5896e8bc16534def929788608aaa7d3b')
const contractAddress = '0x292d3806078964903B03e3d69e57503d2D7a4Fb8'
const ABI = [
    "function marquerPresence(uint256 idExam, address etudiant)",
    "function verifierPresence(uint256 idExam, address etudiant) view returns (uint8)"
]
const privateKey = '55b018eabb58b4be56464defbfa0925d92e9502fa23df880cb8a627acc84f7e4'
const signer = new ethers.Wallet(privateKey, provider)
const contract = new ethers.Contract(contractAddress, ABI, signer)


const marquerPresence = async (idExam, etudiant) => {
    const tx = await contract.marquerPresence(idExam, etudiant)
    const receipt = await tx.wait();
    const presence = await contract.verifierPresence(idExam, etudiant)
    if (presence) {
        console.log('presence marquee')
        return 1
    } else {
        console.log("presence a echouee")
        return 0
    }
}


module.exports = {
    post: async (req, res) => {
        const idExam = req.body.idExam
        const etudiant = req.session.WALLET_CONNECTED
        try {
            if (await marquerPresence(idExam, etudiant)) {
                res.status(201)
                res.end()
            } else {
                res.status(400)
                res.end()
            }
        } catch (e) {
            res.status(500)
            res.end()
            console.log(e)
            
        }

    }
}