import tokenAbi from '../contracts/TokenAbi';

export default (state, setState, crowdSaleAddress) => {
  const clientAddress = window.web3.eth.defaultAccount;
  const contract = window.web3.eth.contract(tokenAbi);
  const contractHandle = contract.at(state.tokenAddress);

  const {tokensForTeam} = state;

  let contractDeploymentStatus = 'Allocating tokens...';
  setState({
    contractDeploymentStatus
  });
  console.log(contractDeploymentStatus);

  return new Promise((resolve, reject) => {
    contractHandle.allocateTokens(crowdSaleAddress, tokensForTeam, {
      from: clientAddress,
      gas: 3000000,
      gasPrice: 40000000000
    }, (err, txAddr) => {

      if (err) {
        setState({
          contractDeploymentStatus: 'Error while allocating tokens...'
        });
        console.log(err);
        reject(err);
        return;
      }

      let logStarted = contractHandle.TokenAllocated({});

      logStarted.watch((error, res) => {
        resolve();
      });

      console.log("Note that it might take 30 - 90 sceonds for the block to propagate before tokens are allocated.");
    });
  });
}