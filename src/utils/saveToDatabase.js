import axios from 'axios';

export default (state, props) => {
  const {multisigETH, tokensForTeam, minContributionPreSale, minContributionMainSale, maxContributionETH, maxCap, minCap, tokenPriceWei, campaignDurationDays, firstPeriod,
    secondPeriod, thirdPeriod, firstBonus, secondBonus, thirdBonus, presaleBonus, vestingDuration, vestingCliff, vestingStart, crowdsaleAddress, network, tokenAddress,
    isWhitelistingEnabled, isVestingEnabled, whitelistAddress} = state;

  axios.post('/api/v1.0/contract/crowdsale',
    {
      multisigETH,
      tokensForTeam,
      minContributionPreSale,
      minContributionMainSale,
      maxContributionETH,
      maxCap,
      minCap,
      tokenPriceWei,
      campaignDurationDays,
      firstPeriod,
      secondPeriod,
      thirdPeriod,
      firstBonus,
      secondBonus,
      thirdBonus,
      presaleBonus,
      vestingDuration,
      vestingCliff,
      vestingStart,
      contractAddress: crowdsaleAddress,
      network,
      tokenAddress,
      isWhitelistingEnabled,
      isVestingEnabled,
      whitelistAddress
    }
  ).then(() => {
    console.log("Okay");
  });
}