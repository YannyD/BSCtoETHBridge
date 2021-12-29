import { useActiveWeb3React } from "./utilities/index.js";
import { ethers } from "ethers";
import { chainIdMap } from "./utilities/constants";

export default () => {
    let mockMtc
    let bridge
    const { account, library, chainId } = useActiveWeb3React();
    const signer = library.getSigner(account);
    const networkName = chainIdMap[chainId];
    if (chainId == 3) {
        const mockMtcEthJson = require("./deployments/" + networkName + "/MockMtcEth.json")
        const bridgeEthJson = require("./deployments/" + networkName + "/BridgeEth.json")
        mockMtc = new ethers.Contract(mockMtcEthJson.address, mockMtcEthJson.abi, signer)
        bridge = new ethers.Contract(bridgeEthJson.address, bridgeEthJson.abi, signer)
    }
    else if (chainId == 97) {
        const mockMtcBscJson = require("./deployments/" + networkName + "/MockMtcBsc.json")
        mockMtc = new ethers.Contract(mockMtcBscJson.address, mockMtcBscJson.abi, signer)
        const bridgeBscJson = require("./deployments/bsctestnet/BridgeBsc.json")
        bridge = new ethers.Contract(bridgeBscJson.address, bridgeBscJson.abi, signer)
    }

    return { mockMtc, bridge, signer };
};