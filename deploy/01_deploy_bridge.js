
module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const { deploy } = deployments;
    const { deployer, tokenOwner } = await getNamedAccounts();
    const chainId = await getChainId();

    if (chainId == 3) {
        const mockMtc = await deployments.get('MockMtcEth');
        await deploy("BridgeEth", {
            from: deployer,
            args: [mockMtc.address, deployer],
            log: true,
        });
    }
    if (chainId == 97) {
        const mockMtc = await deployments.get('MockMtcBsc');
        await deploy("BridgeBsc", {
            from: deployer,
            args: [mockMtc.address, deployer],
            log: true,
        });
    }
};

module.exports.tags = ['MockMtc'];