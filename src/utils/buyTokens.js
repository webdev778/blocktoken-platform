import crowdsaleAbi from '../contracts/CrowdsaleAbi';

export default (address, amount) => {
  const amountWei = Number(window.web3.toWei(amount, "ether"));
  const contract = window.web3.eth.contract(crowdsaleAbi);
  const contractHandle = contract.at(address);

  return new Promise((resolve, reject) => {
    window.web3.eth.sendTransaction({
      to: address,
      value: amountWei,
      gasPrice: 40000000000,
      gas: 3000000
    }, function(err, txn) {
      console.log(err, txn);

      let logStarted = contractHandle.LogReceivedETH({});

      logStarted.watch((error, res) => {
        logStarted.stopWatching((error, res) => {
          if (!error) {
            console.log(res)
          }
        });
        resolve();
      });
    });
  });
}