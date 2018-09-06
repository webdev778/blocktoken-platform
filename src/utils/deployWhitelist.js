import whitelistAbi from '../contracts/WhitelistAbi';
import whitelistBytecode from '../contracts/WhitelistBytecode';

export default (state, setState) => {
  let contractDeploymentStatus = 'Deploying whitelist contract...';
  setState({
    contractDeploymentStatus
  });
  console.log(contractDeploymentStatus);

  return new Promise((resolve, reject) => {
    const clientAddress = window.web3.eth.defaultAccount;

    if (state.isWhitelistingEnabled) {
      const contractWhiteList = window.web3.eth.contract(whitelistAbi);
      const contractTokenInstance = contractWhiteList.new({
        data: '0x' + whitelistBytecode,
        from: clientAddress,
        gas: 1000000 * 2
      }, (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        console.log(res.transactionHash);

        // If we have an address property, the contract was deployed
        if (res.address) {
          const {network} = state;

          let contractDeploymentStatus = 'Your contract has been deployed at http://' + network + '.etherscan.io/address/' + res.address;

          setState({
            contractDeploymentStatus
          });
          console.log(contractDeploymentStatus);
          console.log("Note that it might take 30 - 90 sceonds for the block to propagate befor it's visible in etherscan.io");
          resolve(res.address);

        } else {
          const contractDeploymentStatus = 'Waiting for a mined block to include your contract...';

          setState({
            contractDeploymentStatus
          });
          console.log(contractDeploymentStatus);
        }
      });
    } else {
      resolve();
    }
  });
}