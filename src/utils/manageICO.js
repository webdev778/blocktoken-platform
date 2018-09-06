import crowdsaleAbi from '../contracts/CrowdsaleAbi';

const ICOContract = window.web3.eth.contract(crowdsaleAbi);
const clientAddress = window.web3.eth.defaultAccount;

export default {
  startICO: (crowdsaleAddress) => {
    return new Promise((resolve, reject) => {
      const ICOHandle = ICOContract.at(crowdsaleAddress);

      ICOHandle.start({
        from: clientAddress,
        gasPrice: 40000000000,
        gas: 3000000
      }, (error, result) => {
        if (error) {
          return reject(error);
        }

        const log = ICOHandle.LogStarted();
        log.watch((error, res) => {
          resolve('success');
        });
      });
    });
  },

  advanceMainSale: (crowdsaleAddress) => {
    return new Promise((resolve, reject) => {
      const ICOHandle = ICOContract.at(crowdsaleAddress);

      ICOHandle.advanceStep({
        from: clientAddress,
        gasPrice: 40000000000,
        gas: 3000000
      }, (error, result) => {
        if (error) {
          return reject(error);
        }

        const log = ICOHandle.LogStepAdvanced();
        log.watch((error, res) => {
          resolve('success');
        });
      });
    });
  },

  emergencyStop: (crowdsaleAddress) => {
    return new Promise((resolve, reject) => {
      const ICOHandle = ICOContract.at(crowdsaleAddress);

      ICOHandle.pause({
        from: clientAddress,
        gasPrice: 40000000000,
        gas: 3000000
      }, (error, result) => {
        if (error) {
          return reject(error);
        }

        const log = ICOHandle.Pause();
        log.watch((error, res) => {
          resolve('success');
        });
      });
    });
  },

  emergencyStart: (crowdsaleAddress) => {
    return new Promise((resolve, reject) => {
      const ICOHandle = ICOContract.at(crowdsaleAddress);

      ICOHandle.unpause({
        from: clientAddress,
        gasPrice: 40000000000,
        gas: 3000000
      }, (error, result) => {
        if (error) {
          return reject(error);
        }

        const log = ICOHandle.Unpause();
        log.watch((error, res) => {
          resolve('success');
        });
      });
    });
  },

  finalize: (crowdsaleAddress) => {
    return new Promise((resolve, reject) => {
      const ICOHandle = ICOContract.at(crowdsaleAddress);

      ICOHandle.finalize({
        from: clientAddress,
        gasPrice: 40000000000,
        gas: 3000000
      }, (error, result) => {
        if (error) {
          return reject(error);
        }

        const log = ICOHandle.LogFinalized();
        log.watch((error, res) => {
          if (error) {
            return reject(error);
          }

          resolve('success');
        });
      });
    });
  }
}