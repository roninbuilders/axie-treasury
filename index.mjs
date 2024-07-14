import { defineChain, createPublicClient, http, erc20Abi, formatEther } from 'viem'
import fs from 'fs';

const TREASURY_ADDRESS = "0x245db945c485b68fdc429e4f7085a1761aa4d45d";
const WETH_ADDRESS = "0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5";
const AXS_ADDRESS = "0x97a9107c1793bc407d6f527b77e7fff4d812bece";

const ronin = defineChain({
  id: 2020,
  name: 'Ronin',
  network: 'ronin',
  nativeCurrency: {
    decimals: 18,
    name: 'RON',
    symbol: 'RON'
  },
  rpcUrls: {
    public: {
      http: ["$RPC_URL"]
    },
    default: { http: ["$RPC_URL"] }
  },
  blockExplorers: {
    default: { name: 'Ronin Explorer', url: 'https://app.roninchain.com/' }
  }
})

const publicClient = createPublicClient({
  chain: ronin,
  transport: http()
})

async function getBalance(tokenAddress, walletAddress, blockNumber) {
  const contract = {
    address: tokenAddress,
    abi: erc20Abi,
    blockNumber
  };

  try {
    const balanceWei = await publicClient.readContract({ ...contract, functionName: 'balanceOf', args: [walletAddress] });
    const balanceEther = formatEther(balanceWei, "wei");
    return { balanceEther, balanceWei };
  } catch (error) {
    console.error("Error fetching balance:", error);
    return null;
  }
}

async function getTreasuryBalancesAndTransfers(fromBlock, toBlock) {
  // Create filters for ETH and AXS transfers
  const ethFilter = await publicClient.createContractEventFilter({
    abi: erc20Abi,
    address: WETH_ADDRESS,
    args: {
      to: TREASURY_ADDRESS,
    },
    eventName: 'Transfer',
    fromBlock,
    toBlock
  });

  const axsFilter = await publicClient.createContractEventFilter({
    abi: erc20Abi,
    address: AXS_ADDRESS,
    args: {
      to: TREASURY_ADDRESS,
    },
    eventName: 'Transfer',
    fromBlock,
    toBlock
  });

  // Fetch logs for both filters
  const ethLogs = await publicClient.getFilterLogs({ filter: ethFilter });
  const axsLogs = await publicClient.getFilterLogs({ filter: axsFilter });

  // Process logs to inflow balances and group by block
  const blocks = {};
  const uniqueBlockNumbers = new Set([...ethLogs, ...axsLogs].map(log => log.blockNumber));

  // Prepare to fetch balances for each unique block
  const balancePromises = Array.from(uniqueBlockNumbers).map(async blockNumber => {
    const ethBalancePromise = getBalance(WETH_ADDRESS, TREASURY_ADDRESS, blockNumber);
    const axsBalancePromise = getBalance(AXS_ADDRESS, TREASURY_ADDRESS, blockNumber);
    const blockPromise = publicClient.getBlock({
      includeTransactions: false,
      blockNumber: blockNumber
    });

    const [blockRPC, ethBalance, axsBalance] = await Promise.all([blockPromise, ethBalancePromise, axsBalancePromise]);
    return { blockNumber: blockNumber.toString(), blockTimestamp: blockRPC?.timestamp.toString(), ethBalance, axsBalance };
  });

  const results = await Promise.all(balancePromises);

  // Map fetched results back to blocks
  results.forEach(({ blockNumber, blockTimestamp, ethBalance, axsBalance }) => {
    if (!blocks[blockNumber]) {
      blocks[blockNumber] = {
        blockNumber,
        blockTimestamp,
        balance: {
          ethEther: ethBalance?.balanceEther || '0',
          ethWei: ethBalance?.balanceWei.toString() || '0',
          axsEther: axsBalance?.balanceEther || '0',
          axsWei: axsBalance?.balanceWei.toString() || '0'
        },
        inflow: {
          ethEther: '0',
          ethWei: '0',
          axsEther: '0',
          axsWei: '0'
        },
        transfers: [],
      };
    }
  });

  [...ethLogs, ...axsLogs].forEach(log => {
    const blockNumber = log.blockNumber;

    if (!blocks[blockNumber]) {
      throw new Error(`Block ${blockNumber} not found in blocks`);
    }

    const transfer = {
      from: log.args.from,
      to: log.args.to,
      value: log.args.value.toString(),
      valueEther: formatEther(log.args.value, "wei"),
      token: log.address === WETH_ADDRESS ? 'WETH' : 'AXS',
      hash: log.transactionHash,
      source: 'other', // Placeholder for future use
      address: log.address,
      blockHash: log.blockHash,
      logIndex: log.logIndex,
      transactionIndex: log.transactionIndex,
      topics: log.topics,
    };

    // Update inflow balances based on transfers
    if (transfer.token === 'WETH') {
      blocks[blockNumber].inflow.ethWei = (BigInt(blocks[blockNumber].inflow.ethWei) + BigInt(transfer.value)).toString();
      blocks[blockNumber].inflow.ethEther = formatEther(BigInt(blocks[blockNumber].inflow.ethWei), "wei");
    } else {
      blocks[blockNumber].inflow.axsWei = (BigInt(blocks[blockNumber].inflow.axsWei) + BigInt(transfer.value)).toString();
      blocks[blockNumber].inflow.axsEther = formatEther(BigInt(blocks[blockNumber].inflow.axsWei), "wei");
    }

    // Add transfer to block
    blocks[blockNumber].transfers.push(transfer);
  });

  // Convert blocks object to array and sort by block number
  return Object.keys(blocks).map(blockNumber => ({
    blockNumber,
    transfersCount: blocks[blockNumber].transfers.length,
    ...blocks[blockNumber]
  })).sort((a, b) => a.blockNumber - b.blockNumber);
}

const main = async () => {
  console.time("Total Operation Time");

  const finalBlock = (await publicClient.getBlock()).number;
  // let startBlock = 36370765n; // Treasury wallet creation block
  let startBlock = 16377111n; // Treasury wallet creation block

  if (finalBlock < startBlock) {
    console.error(`Start block number must be less than or equal to the latest block number: ${finalBlock}`);
    res.status(400).send('Invalid start block');
    return;
  }

  const blockRange = 125n;
  const filename = `transfers_since_${startBlock.toString()}.json`;

  let data = [];
  if (fs.existsSync(filename)) {
    data = fs.readFileSync(filename, { encoding: 'utf8' });
    data = JSON.parse(data);
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format');
    }
    // console.log(`Loaded ${data.length} data from file`);
    // console.log(data);
    const lastBlockProcessed = data.length > 0 ? BigInt(data[data.length - 1].blockNumber) : startBlock;
    startBlock = lastBlockProcessed;
    // console.log(`Resuming from block ${startBlock.toString()}`);
  }

  // console.log(`Starting to fetch transfers from block ${startBlock.toString()} to ${finalBlock.toString()}`);

  for (let blockNumber = startBlock;blockNumber <= finalBlock;blockNumber += blockRange) {
    let endBlock = blockNumber + blockRange - 1n;
    if (endBlock > endBlock) {
      endBlock = endBlock;
    }

    try {
      // returns an array of blocks with balances and transfers
      // console.log(`Fetching data for block ${blockNumber.toString()} to ${endBlock.toString()}`);
      const res = await getTreasuryBalancesAndTransfers(blockNumber, endBlock);
      // console.log(`Fetched ${res.length} logs for block ${blockNumber.toString()} to ${endBlock.toString()}`);

      if (res && res.length > 0) {
        data.push(...res);
        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
      }
    } catch (error) {
      console.error(`Failed to write to file: ${error}`);
      // retry block
      blockNumber -= blockRange;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  console.timeEnd("Total Operation Time");
}

main().then(() => {
  // console.log('Done');
}).catch(error => {
  console.error(`Error: ${error}`);
});
