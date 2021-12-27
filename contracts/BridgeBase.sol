//This contract is shared by bridges on each chain on which MTC is deployed
// It will be thus inherited by both the bridge on Eth and Bsc.

pragma solidity ^0.8.0;

import "./IMockMtc.sol";

contract BridgeBase {
    //  In a typical bridge, we only call two functions from the token: burn and mint
    //  Neither of these functions are accessible as external functions in MTC, since supply is fixed
    //  To burn, we transfer to 0x000000000000000000000000000000000000dEaD
    //  To mint, the owner address transfers tokens

    IMockMtc public mockMtc;
    address public burnAddress;
    address public owner;
    mapping(address => mapping(uint256 => bool)) public processedNonces;

    enum Step {
        Burn,
        Mint
    }
    event Transfer(
        address from,
        address to,
        uint256 amount,
        uint256 date,
        uint256 nonce,
        bytes signature,
        Step indexed step
    );

    constructor(address _token, address _owner) {
        mockMtc = IMockMtc(_token);
        burnAddress = 0x000000000000000000000000000000000000dEaD;
        owner = _owner;
    }


// to burn, the bridge contract must be given permission to move tokens from message sender
    function burn(
        address to,
        uint256 amount,
        uint256 nonce,
        bytes calldata signature
    ) external {
        require(
            processedNonces[msg.sender][nonce] == false,
            "transfer already processed"
        );
        processedNonces[msg.sender][nonce] = true;
        mockMtc.transferFrom(msg.sender, burnAddress, amount);
        emit Transfer(
            msg.sender,
            to,
            amount,
            block.timestamp,
            nonce,
            signature,
            Step.Burn
        );
    }

//subsequently, the owner must give the bridge contract permission to move tokens
    function mint(
        address from,
        address to,
        uint256 amount,
        uint256 nonce,
        bytes calldata signature
    ) external {
        bytes32 message = prefixed(
            keccak256(abi.encodePacked(from, to, amount, nonce))
        );
        require(recoverSigner(message, signature) == from, "wrong signature");
        require(
            processedNonces[from][nonce] == false,
            "transfer already processed"
        );
        processedNonces[from][nonce] = true;
        mockMtc.transferFrom(owner, to, amount);
        emit Transfer(
            from,
            to,
            amount,
            block.timestamp,
            nonce,
            signature,
            Step.Mint
        );
    }

    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
            );
    }

    function recoverSigner(bytes32 message, bytes memory sig)
        internal
        pure
        returns (address)
    {
        uint8 v;
        bytes32 r;
        bytes32 s;

        (v, r, s) = splitSignature(sig);

        return ecrecover(message, v, r, s);
    }

    function splitSignature(bytes memory sig)
        internal
        pure
        returns (
            uint8,
            bytes32,
            bytes32
        )
    {
        require(sig.length == 65);

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }
}
