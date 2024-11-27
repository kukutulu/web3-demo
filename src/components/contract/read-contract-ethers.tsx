import { ethers } from 'ethers';
import { bep20Abi } from 'public/abis/bep_20';
import { useEthersProvider } from 'src/jotai/wallet/provider';
import { useAccount } from 'wagmi';

export default function ReadContractEthers() {
  const provider = useEthersProvider();
  const { address } = useAccount();
  const daiContract = new ethers.Contract('0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', bep20Abi, provider);

  async function test() {
    if (!address) return;
    const balance = await daiContract.balanceOf(address);
    console.log(balance);
  }

  test();

  return <></>;
}
