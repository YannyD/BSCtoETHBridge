pragma solidity ^0.8.0;

import './BridgeBase.sol';

contract BridgeBsc is BridgeBase {
    //to build the bridge, we define the address of the token on BSC 
    //and the owner of that contract
  constructor(address token, address owner) BridgeBase(token, owner) {}
}