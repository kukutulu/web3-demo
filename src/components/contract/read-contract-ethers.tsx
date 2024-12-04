import { ethers } from 'ethers';
import { bep20Abi } from 'public/abis/bep_20';
import { useEthersProvider } from 'src/jotai/wallet/provider';
import { useAccount } from 'wagmi';
import BigNumber from 'bignumber.js';

export default function ReadContractEthers() {
  const provider = useEthersProvider();
  const { address, chainId } = useAccount();
  const daiContract = new ethers.Contract('0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', bep20Abi, provider);
  const daiDecimal = 18;

  console.error(12323);

  async function test() {
    if (!address) return;
    const balance = await daiContract.balanceOf(address);
    console.log(BigNumber(balance).div(BigNumber(10).pow(daiDecimal)).toString());
  }

  test();

  return (
    <div>
      <p>chain id: {chainId}</p>
    </div>
  );
}
