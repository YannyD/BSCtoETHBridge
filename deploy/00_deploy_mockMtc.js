const { toBigNumber } = require('../utilities/index.js')

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const { deploy } = deployments;
    const { deployer, tokenOwner } = await getNamedAccounts();
    const chainId = await getChainId();
    console.log("Deploying to chainID ", chainId)
    console.log("setting owner to ", deployer)
    if (chainId == 3) {
        await deploy("MockMtcEth", {
            from: deployer,
            args: [toBigNumber('1000000000'), deployer],
            log: true,
        });
    }
    if (chainId == 97) {
        await deploy("MockMtcBsc", {
            from: deployer,
            args: [toBigNumber('1000000000'), deployer],
            log: true,
        });
    }
};

module.exports.tags = ['MockMtc'];