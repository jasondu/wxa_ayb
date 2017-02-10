//app.js
const AV = require('./libs/leancloud/av-weapp-min.js');
App({
  onLaunch: function () {
    AV.init({
      appId: 'I0j7ktVKS8It7VRU8iEfQF2f-gzGzoHsz',
      appKey: 'HQnWJgW74MBMDCB7Es43nzQy',
    });
  }
})