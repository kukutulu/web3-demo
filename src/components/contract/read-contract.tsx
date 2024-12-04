import { bep20Abi } from 'public/abis/bep_20';
import { configEvmChain } from 'src/jotai/wallet/config';
import { useAccount, useReadContract } from 'wagmi';
import { readContracts, sendTransaction } from 'wagmi/actions';

export default function ReadContract() {
  const { address } = useAccount();

  async function test() {
    if (!address) return;
    const balance = await readContracts(configEvmChain, {
      contracts: [
        {
          address: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
          abi: bep20Abi,
          functionName: 'balanceOf',
          args: [address],
        },
      ],
    });

    console.log(window.ethereum);
    console.log(balance);
  }

  test();

  const { data, isError, isLoading } = useReadContract({
    abi: bep20Abi,
    functionName: 'balanceOf',
    address: address || '0x0000000000000000000000000000000000000000', // Fallback address
  });

  console.log('🚀 ~ ReadContract ~ data:', data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Read Contract</h1>
      <p>Address: {address}</p>
      <p>Balance: {data ? data.toString() : 'N/A'}</p>
    </div>
  );
}
