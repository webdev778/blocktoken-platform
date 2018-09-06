import crowdsaleAbi from '../contracts/CrowdsaleAbi';

export default (state, setState, whitelistAddress) => {
  const {crowdsaleAddress} = state;

  const clientAddress = window.web3.eth.defaultAccount;
  const ICOContract = window.web3.eth.contract(crowdsaleAbi);
  const ICOHandle = ICOContract.at(crowdsaleAddress);

  let contractDeploymentStatus = 'Initializing whitelist contract...';
  setState({
    contractDeploymentStatus
  });
  console.log(contractDeploymentStatus);

  console.log('Crowdsale Address ' + crowdsaleAddress);

  return new Promise((resolve, reject) => {
    if (state.isWhitelistingEnabled) {
      ICOHandle.initializeWhitelist(whitelistAddress, {
        from: clientAddress,
        gasPrice: 40000000000,
        gas: 3000000
      }, function (error, result) {

        if (error) {
          setState({
            contractDeploymentStatus: 'Error while initializing whitelist token...'
          });
          console.log(error);
          reject(error);
          return;
        }

        console.log(result)
        var log = ICOHandle.ContractUpdated({
          done: true
        });

        log.watch(function (error, res) {
          let contractDeploymentStatus = 'Whitelist contract updated...';
          setState({
            contractDeploymentStatus
          });
          console.log(contractDeploymentStatus);

          resolve();
        });
      });
    } else {
      resolve();
    }
  });
}