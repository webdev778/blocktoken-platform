import crowdsaleAbi from '../contracts/CrowdsaleAbi';

export default (state, setState) => {
  return new Promise((resolve, reject) => {
    const {vestingStart, vestingCliff, vestingDuration, presaleBonus, crowdsaleAddress} = state;

    const clientAddress = window.web3.eth.defaultAccount;
    const start = Date.parse(vestingStart) / 1000; // convert date to Unix format
    const cliff = vestingCliff * 3600; // convert time from hours to seconds
    const duration = vestingDuration * 3600; // convert time from hours to seconds

    const ICOContract = window.web3.eth.contract(crowdsaleAbi);
    const ICOHandle = ICOContract.at(crowdsaleAddress);

    if (state.isVestingEnabled) {
      ICOHandle.initializeVesting(start, cliff, duration, presaleBonus, {
        from: clientAddress,
        gasPrice: 40000000000,
        gas: 3000000
      }, (error, result) => {

        if (error) {
          setState({
            contractDeploymentStatus: 'Error while initializing vesting...'
          });
          console.log(error);
          reject(error);
          return;
        }

        console.log(result)
        const log = ICOHandle.ContractUpdated({
          done: true
        });

        log.watch((error, res) => {
          let contractDeploymentStatus = 'Vesting updated...';
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