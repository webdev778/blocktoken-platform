import crowdsaleAbi from '../contracts/CrowdsaleAbi';

export default (state, setState) => {
  const {crowdsaleAddress, tokenAddress} = state;

  const clientAddress = window.web3.eth.defaultAccount;
  const ICOContract = window.web3.eth.contract(crowdsaleAbi);
  const ICOHandle = ICOContract.at(crowdsaleAddress);

  let contractDeploymentStatus = 'Initializing token...';
  setState({
    contractDeploymentStatus
  });
  console.log(contractDeploymentStatus);

  return new Promise((resolve, reject) => {
    ICOHandle.initializeToken(tokenAddress, {
      from: clientAddress,
      gasPrice: 40000000000,
      gas: 3000000
    }, function (error, result) {

      if (error) {
        setState({
          contractDeploymentStatus: 'Error while initializing token...'
        });
        console.log(error);
        reject(error);
        return;
      }

      console.log(result)
      const log = ICOHandle.ContractUpdated({
        done: true
      });

      log.watch(function (error, res) {
        let contractDeploymentStatus = 'Token contract updated...';
        setState({
          contractDeploymentStatus
        });
        console.log(contractDeploymentStatus);

        log.stopWatching(function (error, res){
          if (!error) {
            console.log(res)
          }
        });
        resolve();
      });
    });
  });
}