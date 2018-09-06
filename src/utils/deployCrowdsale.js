import bytecode from '../contracts/CrowdsaleBytecode';
import abi from '../contracts/CrowdsaleAbi';

export default (state, setState, props) => {
  return new Promise((resolve, reject) => {
    const {decimalUnits, multisigETH, tokensForTeam, minContributionPreSale, minContributionMainSale, maxContributionETH, maxCap, minCap, tokenPriceWei, campaignDurationDays,
      firstPeriod, secondPeriod, thirdPeriod, firstBonus, secondBonus, thirdBonus, presaleBonus, network, isSpinnerVisible, tokenContractHash, vestingDuration,
      vestingCliff, vestingStart, isVestingEnabled} = state;

    const clientAddress = window.web3.eth.defaultAccount;
    const contractCrowdsale = window.web3.eth.contract(abi);
    const secondsInBlock = 14.05;
    const blocksInHour = 3600 / secondsInBlock;
    const calMinContributionPreSale = minContributionPreSale * Math.pow(10, 18);
    const calMinContributionMainSale = minContributionMainSale * Math.pow(10, 18);
    const calMaxContributionETH = maxContributionETH * Math.pow(10, 18);
    const calTokenPriceWei = tokenPriceWei * Math.pow(10, 18);
    const calFirstPeriod = firstPeriod * blocksInHour;
    const calSecondPeriod = secondPeriod * blocksInHour;
    const calThirdPeriod = thirdPeriod * blocksInHour;

    setState({
      isSpinnerVisible: true,
    });

    contractCrowdsale.new(
      decimalUnits,
      multisigETH,
      calMinContributionPreSale,
      calMinContributionMainSale,
      calMaxContributionETH,
      maxCap,
      minCap,
      calTokenPriceWei,
      campaignDurationDays,
      calFirstPeriod,
      calSecondPeriod,
      calThirdPeriod,
      firstBonus,
      secondBonus,
      thirdBonus,
      isVestingEnabled, {
        data: bytecode,
        from: clientAddress,
        gas: 5000000,
        gasPrice: 40000000000
      }, (err, res) => {

        if (err) {
          setState({
            contractDeploymentStatus: 'Error while deploying crowdsale contract...'
          });
          console.log(err);
          reject(err);
          return;
        }

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
      }
    );
  });
}