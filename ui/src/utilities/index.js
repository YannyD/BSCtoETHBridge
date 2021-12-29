import { useWeb3React as useWeb3ReactCore } from "@web3-react/core";

const { ethers } = require("ethers")

export function useActiveWeb3React() {
  const context = useWeb3ReactCore();
  return context.active ? context : null;
}

export const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function toBigNumber(n) {
  // Source: https://github.com/Uniswap/uniswap-v3-core/blob/main/test/shared/utilities.ts
  return ethers.utils.parseUnits(n.toString());
}

export function toDecimal(bigNumber, decimals = 6, roundDecimals = 2) {
  let regularNumber = parseFloat(ethers.utils.formatUnits(bigNumber, decimals))
  return Math.round(regularNumber * 10 ** roundDecimals) / 10 ** roundDecimals
}