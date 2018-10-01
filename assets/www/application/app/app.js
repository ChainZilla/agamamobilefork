var require = meteorInstall({"client":{"main.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/main.html                                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.watch(require("./template.main.js"), {
  "*": module.makeNsSetter(true)
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.main.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/template.main.js                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.body.addContent((function() {
  var view = this;
  return HTML.Raw('<div id="app"></div>');
}));
Meteor.startup(Template.body.renderToDocument);
Meteor.startup(function() {
  var attrs = {"id":"body"};
  for (var prop in attrs) {
    document.body.setAttribute(prop, attrs[prop]);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"init.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/init.js                                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
global.Buffer = global.Buffer || require('buffer').Buffer;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/main.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var render;
module.watch(require("react-dom"), {
  render: function (v) {
    render = v;
  }
}, 1);
var Provider;
module.watch(require("react-redux"), {
  Provider: function (v) {
    Provider = v;
  }
}, 2);
var createStore, applyMiddleware, compose;
module.watch(require("redux"), {
  createStore: function (v) {
    createStore = v;
  },
  applyMiddleware: function (v) {
    applyMiddleware = v;
  },
  compose: function (v) {
    compose = v;
  }
}, 3);
var thunk;
module.watch(require("redux-thunk"), {
  "default": function (v) {
    thunk = v;
  }
}, 4);
module.watch(require("./main.html"));
var appReducer;
module.watch(require("../imports/ui/reducers"), {
  "default": function (v) {
    appReducer = v;
  }
}, 5);
var App;
module.watch(require("../imports/ui/App"), {
  "default": function (v) {
    App = v;
  }
}, 6);
var initialState = {
  foo: {}
};
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
var store = createStore(appReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
Meteor.startup(function () {
  render(React.createElement(Provider, {
    store: store
  }, React.createElement(App, null)), document.getElementById('app'));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"imports":{"ui":{"lib":{"agama-wallet-lib":{"build":{"crypto":{"passphrasegenerator.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/lib/agama-wallet-lib/build/crypto/passphrasegenerator.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';
/******************************************************************************
 * Copyright © 2016 The Waves Core Developers.                             	  *
 *                                                                            *
 * See the LICENSE files at     											  											*
 * the top-level directory of this distribution for the individual copyright  *
 * holder information and the developer policies on copyright and licensing.  *
 *                                                                            *
 * Unless otherwise agreed in a custom licensing agreement, no part of the    *
 * Waves software, including this file, may be copied, modified, propagated,  *
 * or distributed except according to the terms contained in the LICENSE.txt  *
 * file.                                                                      *
 *                                                                            *
 * Removal or modification of this copyright notice is prohibited.            *
 *                                                                            *
 ******************************************************************************/

var bip39 = require('bip39');

var passphraseGenerator = {
  generatePassPhrase: function () {
    function generatePassPhrase(bitsval) {
      return bip39.generateMnemonic(bitsval);
    }

    return generatePassPhrase;
  }(),
  // checks if it's possible that the pass phrase words supplied as the first parameter
  // were generated with the number of bits supplied as the second parameter
  isPassPhraseValid: function () {
    function isPassPhraseValid(passPhraseWords, bits) {
      // the required number of words based on the number of bits
      // mirrors the generatePassPhrase function above
      var wordsCount = bits / 32 * 3;
      return passPhraseWords && passPhraseWords.length === wordsCount;
    }

    return isPassPhraseValid;
  }(),
  arePassPhraseWordsValid: function () {
    function arePassPhraseWordsValid(passphrase) {
      return bip39.validateMnemonic(passphrase);
    }

    return arePassPhraseWordsValid;
  }()
};
module.exports = passphraseGenerator;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"bitcoinjs-networks.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/lib/agama-wallet-lib/build/bitcoinjs-networks.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';

var _networks;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
/*
  Bitcoinjs-lib network params file
*/
// TODO: runtime extend for kmd assets


var bitcoin = require('bitcoinjs-lib');

var networks = (_networks = {
  pgt: {
    messagePrefix: '\x19Komodo Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x55,
    wif: 0xbc,
    dustThreshold: 1000,
    isZcash: true,
    kmdInterest: false
  },
  lime: {
    messagePrefix: '\x19Komodo Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x55,
    wif: 0xbc,
    dustThreshold: 1000,
    isZcash: true,
    kmdInterest: false
  },
  // ..
  btc: bitcoin.networks.bitcoin,
  ltc: {
    messagePrefix: '\x19Litecoin Signed Message:\n',
    bip32: {
      "public": 0x019da462,
      "private": 0x019d9cfe
    },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0,
    dustThreshold: 0 // https://github.com/litecoin-project/litecoin/blob/v0.8.7.2/src/main.cpp#L360-L365

  },
  dnr: {
    messagePrefix: '\x19Denarius Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x5a,
    wif: 0x9e,
    dustThreshold: 1000,
    isPoS: true
  },
  doge: {
    messagePrefix: '\x19Dogecoin Signed Message:\n',
    bip32: {
      "public": 0x02facafd,
      "private": 0x02fac398
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x16,
    wif: 0x9e,
    dustThreshold: 0 // https://github.com/dogecoin/dogecoin/blob/v1.7.1/src/core.h#L155-L160

  },
  // https://github.com/monacoinproject/monacoin/blob/master-0.10/src/chainparams.cpp#L161
  mona: {
    messagePrefix: '\x19Monacoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x32,
    scriptHash: 0x05,
    wif: 0xB2,
    dustThreshold: 546 // https://github.com/bitcoin/bitcoin/blob/v0.9.2/src/core.h#L151-L162

  },
  game: {
    messagePrefix: '\x19GameCredits Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x26,
    scriptHash: 0x5,
    wif: 0xA6,
    dustThreshold: 546
  },
  // https://github.com/dashpay/dash/blob/master/src/chainparams.cpp#L171
  dash: {
    messagePrefix: '\x19DarkCoin Signed Message:\n',
    bip32: {
      "public": 0x02fe52f8,
      "private": 0x02fe52cc
    },
    pubKeyHash: 0x4c,
    scriptHash: 0x10,
    wif: 0xcc,
    dustThreshold: 5460 // https://github.com/dashpay/dash/blob/v0.12.0.x/src/primitives/transaction.h#L144-L155

  },
  // https://github.com/zcoinofficial/zcoin/blob/c93eccb39b07a6132cb3d787ac18be406b24c3fa/src/base58.h#L275
  xzc: {
    messagePrefix: '\x19ZCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x52,
    scriptHash: 0x07,
    wif: 0x52 + 128,
    dustThreshold: 1000,
    // https://github.com/zcoinofficial/zcoin/blob/f755f95a036eedfef7c96bcfb6769cb79278939f/src/main.h#L59,
    isZcash: true
  },
  // https://raw.githubusercontent.com/jl777/komodo/beta/src/chainparams.cpp
  kmd: {
    messagePrefix: '\x19Komodo Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x55,
    wif: 0xbc,
    dustThreshold: 1000,
    isZcash: true,
    kmdInterest: true
  },
  via: {
    messagePrefix: '\x19Viacoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x47,
    scriptHash: 0x21,
    wif: 0xc7,
    dustThreshold: 1000
  },
  vtc: {
    messagePrefix: '\x19Vertcoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x47,
    scriptHash: 0x5,
    wif: 0x80,
    dustThreshold: 1000
  },
  nmc: {
    messagePrefix: '\x19Namecoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x34,
    scriptHash: 0xd,
    wif: 0xb4,
    dustThreshold: 1000
  },
  fair: {
    messagePrefix: '\x19Faircoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x5f,
    scriptHash: 0x24,
    wif: 0xdf,
    dustThreshold: 1000
  },
  dgb: {
    messagePrefix: '\x19Digibyte Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x5,
    wif: 0x80,
    dustThreshold: 1000
  },
  crw: {
    messagePrefix: '\x19Crown Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x0,
    scriptHash: 0x1c,
    wif: 0x80,
    dustThreshold: 1000
  },
  arg: {
    messagePrefix: '\x19Argentum Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x17,
    scriptHash: 0x5,
    wif: 0x97,
    dustThreshold: 1000
  },
  chips: {
    messagePrefix: '\x19Chips Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x55,
    wif: 0xbc,
    dustThreshold: 1000
  },
  btg: {
    messagePrefix: '\x19BitcoinGold Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x26,
    scriptHash: 0x17,
    wif: 0x80,
    dustThreshold: 1000,
    forkName: 'btg',
    isBtcFork: true
  },
  bch: {
    messagePrefix: '\x19BitcoinCash Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x0,
    scriptHash: 0x5,
    wif: 0x80,
    dustThreshold: 1000,
    forkName: 'bch',
    isBtcFork: true
  },
  blk: {
    messagePrefix: '\x19BlackCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x19,
    scriptHash: 0x55,
    wif: 0x99,
    dustThreshold: 1000,
    isPoS: true
  },
  sib: {
    messagePrefix: '\x19SibCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3f,
    scriptHash: 0x28,
    wif: 0x80,
    dustThreshold: 1000
  },
  zec: {
    messagePrefix: '\x19Zcash Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x05358394
    },
    pubKeyHash: 0x1cb8,
    scriptHash: 0x1cbd,
    wif: 0x80,
    dustThreshold: 1000,
    isZcash: true
  },
  hush: {
    messagePrefix: '\x19Hush Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1cb8,
    scriptHash: 0x1cbd,
    wif: 0x80,
    dustThreshold: 1000,
    isZcash: true
  },
  zcl: {
    messagePrefix: '\x19Zclassic Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1cb8,
    scriptHash: 0x1cbd,
    wif: 0x80,
    dustThreshold: 1000,
    isZcash: true
  },
  sng: {
    messagePrefix: '\x19Snowgem Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x05358394
    },
    pubKeyHash: 0x1c28,
    scriptHash: 0x1c2D,
    wif: 0x80,
    dustThreshold: 1000,
    isZcash: true
  },
  xmy: {
    messagePrefix: '\x19Myriad Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x32,
    scriptHash: 0x9,
    wif: 0xB2,
    dustThreshold: 1000
  },
  hodlc: {
    messagePrefix: '\x19Hodlc Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x28,
    scriptHash: 0x5,
    wif: 0x28 + 128,
    dustThreshold: 1000
  },
  qtum: {
    messagePrefix: '\x19Qtum Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3A,
    scriptHash: 0x32,
    wif: 0x80,
    dustThreshold: 1000
  },
  btx: {
    messagePrefix: '\x19Bitcore Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x0,
    scriptHash: 0x5,
    wif: 0x80,
    dustThreshold: 1000
  },
  btcz: {
    messagePrefix: '\x19BitcoinZ Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1cb8,
    scriptHash: 0x1cbd,
    wif: 0x80,
    dustThreshold: 1000,
    isZcash: true
  },
  grs: {
    // fails to gen a proper addr
    messagePrefix: '\x19Groestlcoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x24,
    scriptHash: 0x5,
    wif: 0x80,
    dustThreshold: 1000
  },
  aby: {
    messagePrefix: '\x19ArtByte Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x17,
    scriptHash: 0x5,
    wif: 0x97,
    dustThreshold: 1000
  },
  mac: {
    messagePrefix: '\x19Machinecoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x32,
    scriptHash: 0x5,
    wif: 0xB2,
    dustThreshold: 1000
  },
  vot: {
    messagePrefix: '\x19VoteCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x05358394
    },
    pubKeyHash: 0x1cb8,
    scriptHash: 0x1cbd,
    wif: 0x80,
    dustThreshold: 1000,
    isZcash: true
  },
  iop: {
    messagePrefix: '\x19IOP Signed Message:\n',
    bip32: {
      "public": 0x2780915F,
      "private": 0xAE3416F6
    },
    pubKeyHash: 0x75,
    scriptHash: 0xAE,
    wif: 0x31,
    dustThreshold: 1000
  },
  bdl: {
    messagePrefix: '\x19Bitdeal Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x26,
    scriptHash: 0x5,
    wif: 0xB0,
    dustThreshold: 1000
  },
  btcp: {
    messagePrefix: '\x18BitcoinPrivate Signed Message:\n',
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x1325,
    scriptHash: 0x13AF,
    wif: 0x80,
    dustThreshold: 1000 // isZcash: true,

  },
  // https://github.com/zencashio/zen/blob/master/src/chainparams.cpp#L118
  zen: {
    // new address type
    messagePrefix: '\x19Zencas Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x2089,
    scriptHash: 0x2086,
    wif: 0x80,
    dustThreshold: 1000,
    isZcash: true
  },
  sys: {
    // zec based
    messagePrefix: '\x19Syscoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3F,
    scriptHash: 0x5,
    // wif: 0x80,
    wif: 0xbf,
    dustThreshold: 1000,
    isZcash: true
  },
  emc2: {
    messagePrefix: '\x18Einsteinium Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x21,
    scriptHash: 0x05,
    wif: 0xa1
  },
  // https://github.com/BTA-BATA/BATA-SOURCE/blob/master/src/chainparams.cpp#L156
  bta: {
    messagePrefix: '\x19Bata Signed Message:\n',
    bip32: {
      "public": 0xA40C86FA,
      "private": 0xA40B91BD
    },
    pubKeyHash: 0x19,
    scriptHash: 0x5,
    wif: 0x55,
    dustThreshold: 1000
  },
  // https://github.com/lbryio/lbrycrd/blob/master/src/chainparams.cpp#L176

  /*lbc: {
    messagePrefix: '\x19LBRY Credits Signed Message:\n',
    bip32: {
      public: 0x019C354f,
      private: 0x019C3118,
    },
    pubKeyHash: 0x55,
    scriptHash: 0x7a,
    wif: 0x1c,
    dustThreshold: 1000,
  },*/
  lbc: {
    messagePrefix: '\x18LBRYcrd Signed Message:\n',
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x55,
    scriptHash: 0x7a,
    wif: 0x1c
  },
  // https://github.com/LIMXTEC/BitSend/blob/master/src/chainparams.cpp#L136
  bsd: {
    messagePrefix: '\x19Bitsend Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x66,
    scriptHash: 0x5,
    wif: 0xCC,
    dustThreshold: 1000
  },
  // https://github.com/gobytecoin/gobyte/blob/master/src/chainparams.cpp#L127
  gbx: {
    messagePrefix: '\x19GoByte Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x26,
    scriptHash: 0xA,
    // scriptHash: 0x0a,
    wif: 0xC6,
    dustThreshold: 1000
  },
  // https://github.com/Electronic-Gulden-Foundation/egulden/blob/master/src/chainparams.cpp#L139
  efl: {
    messagePrefix: '\x19E-Gulden Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x30,
    scriptHash: 0x5,
    wif: 0xB0,
    dustThreshold: 1000
  },
  wc: {
    // xwc
    messagePrefix: '\x18Whitecoin Signed Message:\n',
    bip32: {
      "public": 0x04887F1E,
      "private": 0x048894ED
    },
    pubKeyHash: 0x49,
    scriptHash: 0x57,
    wif: 0xc9,
    dustThreshold: 1000
  },
  // https://github.com/vivocoin/vivo/blob/master/src/chainparams.cpp#L133
  vivo: {
    messagePrefix: '\x19Vivo Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x46,
    scriptHash: 0xA,
    wif: 0xC6,
    dustThreshold: 1000
  },
  xvg: {
    messagePrefix: '\x18VERGE Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x21,
    wif: 0x9e,
    dustThreshold: 1000
  },
  smart: {
    // wrong address generated
    messagePrefix: '\x19Smartcash Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3F,
    scriptHash: 0x12,
    wif: 0xBF,
    dustThreshold: 1000,
    isZcash: true
  },
  // https://github.com/reddcoin-project/reddcoin/blob/master/src/chainparams.cpp#L79
  rdd: {
    messagePrefix: '\x19Reddcoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3D,
    scriptHash: 0x5,
    wif: 0xBD,
    dustThreshold: 1000
  },
  // https://github.com/PIVX-Project/PIVX/blob/master/src/chainparams.cpp#L180
  pivx: {
    messagePrefix: '\x19Pivx Signed Message:\n',
    bip32: {
      "public": 0x022D2533,
      "private": 0x0221312B
    },
    pubKeyHash: 0x1E,
    scriptHash: 0xD,
    wif: 0xD4,
    dustThreshold: 1000
  },
  // https://github.com/OmniLayer/omnicore/blob/master/src/chainparams.cpp#L128
  omni: {
    messagePrefix: '\x19OmniLayer Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x0,
    scriptHash: 0x5,
    wif: 0x80,
    dustThreshold: 1000
  },
  ok: {
    messagePrefix: '\x19OKCash Signed Message:\n',
    bip32: {
      "public": 0x03CC23D7,
      "private": 0x03CC1C73
    },
    pubKeyHash: 0x37,
    scriptHash: 0x1C,
    // wif: 0xB7,
    wif: 0x03,
    dustThreshold: 1000
  },
  neos: {
    messagePrefix: '\x19Neoscoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x35,
    scriptHash: 0x5,
    wif: 0xB1,
    dustThreshold: 1000
  },
  // https://github.com/NAVCoin/navcoin-core/blob/master/src/chainparams.cpp#L160
  nav: {
    messagePrefix: '\x19Navcoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x35,
    scriptHash: 0x55,
    wif: 0x96,
    dustThreshold: 1000
  },
  // https://github.com/minexcoin/minexcoin/blob/master/src/chainparams.cpp#L259
  mnx: {
    messagePrefix: '\x19Minexcoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x4B,
    scriptHash: 0x5,
    // scriptHash: 0x05,
    wif: 0x80,
    dustThreshold: 1000
  },

  /*lcc: {
    messagePrefix: '\x19Litecoin Cash Signed Message:\n',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    pubKeyHash: 0x1C,
    scriptHash: 0x5,
    wif: 0x32,
    dustThreshold: 1000,
  },*/
  lcc: {
    messagePrefix: '\x18Litecoin Cash Signed Message:\n',
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x1c,
    scriptHash: 0x05,
    wif: 0xb0,
    dustThreshold: 1000
  },
  // https://github.com/Gulden/gulden-official/blob/master/src/chainparams.cpp#L128
  nlg: {
    messagePrefix: '\x19Gulden Cash Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x26,
    scriptHash: 0x62,
    wif: 0x26 + 128,
    // wif: 0x62,
    dustThreshold: 1000
  },
  // https://github.com/fujicoin/fujicoin/blob/master/src/chainparams.cpp#L132
  fjc: {
    messagePrefix: '\x19Fujicoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x24,
    scriptHash: 0x10,
    wif: 0xA4,
    dustThreshold: 1000
  },
  // https://github.com/flash-coin/bitcore-lib/commit/97d72267f3577173ee90d46b43553af801b214f2#diff-014a66be6f0ee0e90f9357d497267195R144
  flash: {
    messagePrefix: '\x19Flash Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x44,
    scriptHash: 0x82,
    wif: 0xc4,
    dustThreshold: 1000
  },
  // https://github.com/FeatherCoin/Feathercoin/blob/master-0.13/src/chainparams.cpp#L132
  ftc: {
    messagePrefix: '\x19FeatherCoin Signed Message:\n',
    bip32: {
      "public": 0x048BC26,
      "private": 0x0488DAEE
    },
    pubKeyHash: 0xE,
    // pubKeyHash: 0x0e,
    scriptHash: 0x5,
    wif: 0x8E,
    dustThreshold: 1000
  },
  // https://github.com/exclfork/ExclusiveCoin/blob/master/src/chainparams.cpp#L82
  excl: {
    messagePrefix: '\x19ExclusiveCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x21,
    scriptHash: 0x89,
    wif: 0xA1,
    dustThreshold: 1000
  },
  // https://github.com/DMDcoin/Diamond/blob/master/src/chainparams.cpp#L166
  dmd: {
    messagePrefix: '\x19Diamond Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x5A,
    scriptHash: 0x8,
    wif: 0xDA,
    dustThreshold: 1000
  },
  // https://github.com/CooleRRSA/crave/blob/master/src/chainparams.cpp#L99
  crave: {
    messagePrefix: '\x19Crave Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x46,
    scriptHash: 0x55,
    wif: 0x99,
    dustThreshold: 1000
  },
  // https://github.com/BitClubDev/ClubCoin/blob/master/src/chainparams.cpp#L114
  club: {
    messagePrefix: '\x19ClubCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1C,
    scriptHash: 0x55,
    wif: 0x99,
    dustThreshold: 1000
  },
  // https://github.com/nochowderforyou/clams/blob/master/src/chainparams.cpp#L93
  clam: {
    messagePrefix: '\x19Clams Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x89,
    scriptHash: 0xD,
    wif: 0x85,
    dustThreshold: 1000
  },
  // https://github.com/bitcoin-atom/bitcoin-atom/blob/master/src/chainparams.cpp#L168
  bca: {
    messagePrefix: '\x19Bitcoin Atom Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x17,
    scriptHash: 0xA,
    wif: 0x80,
    dustThreshold: 1000
  },
  // https://github.com/aurarad/Auroracoin/blob/master/src/chainparams.cpp#L77
  aur: {
    messagePrefix: '\x19Auroracoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x17,
    scriptHash: 0xA,
    wif: 0xB0,
    dustThreshold: 1000
  },
  // https://github.com/adcoin-project/AdCoin/blob/master/src/chainparams.cpp#L129
  acc: {
    messagePrefix: '\x19AdCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x17,
    scriptHash: 0x5,
    wif: 0xB0,
    dustThreshold: 1000
  },
  bcbc: {
    messagePrefix: '\x19Bitcoin CBC Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x0,
    scriptHash: 0x5,
    wif: 0x80,
    dustThreshold: 1000
  },
  // https://raw.githubusercontent.com/iancoleman/bip39/master/src/js/bitcoinjs-extensions.js
  sdc: {
    messagePrefix: '\x18ShadowCash Signed Message:\n',
    bip32: {
      "public": 0xEE80286A,
      "private": 0xEE8031E8
    },
    pubKeyHash: 0x3f,
    scriptHash: 0x7d,
    wif: 0xbf
  },
  mzc: {
    messagePrefix: '\x18Mazacoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x32,
    scriptHash: 0x09,
    wif: 0xe0
  },
  ppc: {
    messagePrefix: '\x18Peercoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x37,
    scriptHash: 0x00,
    // TODO set this correctly
    wif: 0xb7
  },
  axe: {
    messagePrefix: '\x18AXE Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x37,
    scriptHash: 0x10,
    // TODO set this correctly
    wif: 0xcc
  },
  slm: {
    messagePrefix: '\x18Slimcoin Signed Message:\n',
    bip32: {
      "public": 0xef6adf10,
      "private": 0xef69ea80
    },
    pubKeyHash: 0x3f,
    scriptHash: 0x7d,
    wif: 0x46
  },
  nebl: {
    messagePrefix: '\x18Neblio Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x35,
    scriptHash: 0x70,
    wif: 0xb5
  },
  jbs: {
    messagePrefix: '\x19Jumbucks Signed Message:\n',
    bip32: {
      "public": 0x037a689a,
      "private": 0x037a6460
    },
    pubKeyHash: 0x2b,
    scriptHash: 0x05,
    wif: 0xab
  },
  zet: {
    messagePrefix: '\x18Zetacoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x50,
    scriptHash: 0x09,
    wif: 0xe0
  },
  onx: {
    messagePrefix: '\x18Onixcoin Signed Message:\n',
    bip32: {
      "public": 0x049d7cb2,
      "private": 0x049d7878
    },
    pubKeyHash: 0x4B,
    scriptHash: 0x05,
    wif: 0x80
  },
  usnbt: {
    messagePrefix: '\x18Nu Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x19,
    scriptHash: 0x1a,
    wif: 0x96
  },
  beet: {
    messagePrefix: '\x19Beetlecoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1A,
    scriptHash: 0x55,
    wif: 0x99
  },
  ac: {
    messagePrefix: '\x18AsiaCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x17,
    scriptHash: 0x08,
    wif: 0x97
  },
  bela: {
    messagePrefix: '\x18BelaCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x19,
    scriptHash: 0x05,
    wif: 0x99
  },
  xbc: {
    messagePrefix: '\x18BitcoinPlus Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x19,
    scriptHash: 0x08,
    wif: 0x99
  },
  brit: {
    messagePrefix: '\x18BritCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x19,
    scriptHash: 0x55,
    wif: 0x99
  },
  cdn: {
    messagePrefix: '\x18Canada eCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1c,
    scriptHash: 0x05,
    wif: 0x9c
  },
  ccn: {
    messagePrefix: '\x18Cannacoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1c,
    scriptHash: 0x05,
    wif: 0x9c
  },
  cmp: {
    messagePrefix: '\x18CompCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1c,
    scriptHash: 0x55,
    wif: 0x9c
  },
  defc: {
    // get servers
    messagePrefix: '\x18Defcoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x05,
    wif: 0x9e
  },
  dgc: {
    messagePrefix: '\x18Digitalcoin Signed Message:\n',
    bip32: {
      "public": 0x9e0488B2,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x05,
    wif: 0x9e
  },
  ecn: {
    messagePrefix: '\x18eCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x5c,
    scriptHash: 0x14,
    wif: 0xdc
  },
  edrc: {
    messagePrefix: '\x18EDRcoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x5d,
    scriptHash: 0x1c,
    wif: 0xdd
  },
  erc: {
    messagePrefix: '\x18Europecoin Signed Message:\n',
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x21,
    scriptHash: 0x05,
    wif: 0xa8
  },
  frst: {
    messagePrefix: '\x18FirstCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x23,
    scriptHash: 0x05,
    wif: 0xa3
  },
  gcr: {
    messagePrefix: '\x18GCR Signed Message:\n',
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x26,
    scriptHash: 0x61,
    wif: 0x9a
  },
  grc: {
    messagePrefix: '\x18Gridcoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3e,
    scriptHash: 0x55,
    wif: 0xbe
  },
  hnc: {
    messagePrefix: '\x18helleniccoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x30,
    scriptHash: 0x05,
    wif: 0xb0
  },
  thc: {
    messagePrefix: '\x18Hempcoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x28,
    scriptHash: 0x08,
    wif: 0xa8
  },
  insn: {
    messagePrefix: '\x18INSaNe Signed Message:\n',
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x66,
    scriptHash: 0x39,
    wif: 0x37
  },
  ixc: {
    messagePrefix: '\x18Ixcoin Signed Message:\n',
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x8a,
    scriptHash: 0x05,
    wif: 0x80
  },
  kobo: {
    messagePrefix: '\x18Kobocoin Signed Message:\n',
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x23,
    scriptHash: 0x1c,
    wif: 0xa3
  },
  ldcn: {
    messagePrefix: '\x18Landcoin Signed Message:\n',
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x30,
    scriptHash: 0x7a,
    wif: 0xb0
  },
  linx: {
    messagePrefix: '\x18LinX Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x4b,
    scriptHash: 0x05,
    wif: 0xcb
  },
  lynx: {
    messagePrefix: '\x18Lynx Signed Message:\n',
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x2d,
    scriptHash: 0x32,
    wif: 0xad
  },
  nro: {
    messagePrefix: '\x18PPCoin Signed Message:\n',
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x35,
    scriptHash: 0x75,
    wif: 0xb5
  },
  nyc: {
    messagePrefix: '\x18Newyorkc Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x16,
    wif: 0xbc
  },
  nvc: {
    messagePrefix: '\x18NovaCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x08,
    scriptHash: 0x14,
    wif: 0x88
  },
  nsr: {
    messagePrefix: '\x18Nu Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3f,
    scriptHash: 0x40,
    wif: 0x95
  },
  psb: {
    messagePrefix: '\x18Pesobit Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x37,
    scriptHash: 0x55,
    wif: 0xb7
  },
  pink: {
    messagePrefix: '\x18Pinkcoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x03,
    scriptHash: 0x1c,
    wif: 0x83
  },
  posw: {
    messagePrefix: '\x18Poswcoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x37,
    scriptHash: 0x55,
    wif: 0xb7
  },
  pot: {
    messagePrefix: '\x18Potcoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x37,
    scriptHash: 0x05,
    wif: 0xb7
  },
  put: {
    messagePrefix: '\x18PutinCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x37,
    scriptHash: 0x14,
    wif: 0xb7
  },
  vox: {
    // rvr
    messagePrefix: '\x18Voxels Signed Message:\n',
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x46,
    scriptHash: 0x05,
    wif: 0xc6
  },
  rby: {
    messagePrefix: '\x18Rubycoin Signed Message:\n',
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x55,
    wif: 0xbc
  },
  smly: {
    messagePrefix: '\x18Smileycoin Signed Message:\n',
    bip32: {
      "public": 0x1E562D9A,
      "private": 0x1E5631BC
    },
    pubKeyHash: 0x19,
    scriptHash: 0x05,
    wif: 0x05
  },
  slr: {
    messagePrefix: '\x18SolarCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x12,
    scriptHash: 0x05,
    wif: 0x92
  },
  strat: {
    messagePrefix: '\x18Stratis Signed Message:\n',
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x3f,
    scriptHash: 0x7d,
    wif: 0xbf
  },
  toa: {
    messagePrefix: '\x18TOA Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x41,
    scriptHash: 0x17,
    wif: 0xc1
  },
  usc: {
    messagePrefix: '\x18UltimateSecureCash Signed Message:\n',
    bip32: {
      "public": 0xEE80286A,
      "private": 0xEE8031E8
    },
    pubKeyHash: 0x44,
    scriptHash: 0x7d,
    wif: 0xbf
  },
  uno: {
    messagePrefix: '\x18Unobtanium Signed Message:\n',
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x82,
    scriptHash: 0x1e,
    wif: 0xe0
  },
  xvc: {
    messagePrefix: '\x18Vcash Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x47,
    scriptHash: 0x08,
    wif: 0xc7
  },
  vpn: {
    messagePrefix: '\x18VpnCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x47,
    scriptHash: 0x05,
    wif: 0xc7
  }
}, _defineProperty(_networks, 'wc', {
  messagePrefix: '\x18WinCoin Signed Message:\n',
  bip32: {
    "public": 0x0488b21e,
    "private": 0x0488ade4
  },
  pubKeyHash: 0x49,
  scriptHash: 0x1c,
  wif: 0xc9
}), _defineProperty(_networks, 'xuez', {
  messagePrefix: '\x18Xuez Signed Message:\n',
  bip32: {
    "public": 0x022d2533,
    "private": 0x0221312b
  },
  pubKeyHash: 0x4b,
  scriptHash: 0x12,
  wif: 0xd4
}), _defineProperty(_networks, 'nrg', {
  // etk?
  messagePrefix: '\x18Energicoin Signed Message:\n',
  bip32: {
    "public": 0x03B8C856,
    "private": 0xD7DC6E9F
  },
  pubKeyHash: 0x21,
  scriptHash: 0x35,
  wif: 0x6a
}), _networks);
module.exports = networks;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"coin-helpers.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/lib/agama-wallet-lib/build/coin-helpers.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';

var _komodoAssetChains = ['TEST2', 'TEST2', 'SUPERNET', 'REVS', 'PANGEA', 'DEX', 'JUMBLR', 'BET', 'CRYPTO', 'COQUI', 'HODL', 'MSHARK', 'BOTS', 'MGW', 'MVP', 'KV', 'CEAL', 'MESH', 'WLC', 'MNZ', 'AXO', 'ETOMIC', 'BTCH', 'BEER', 'PIZZA', 'OOT', 'NINJA', 'VOTE2018', 'GLXT', 'EQL', 'BNTN', 'PRLPAY', 'CHAIN', 'ZILLA', 'DSEC', 'VRSC'];

var _komodoCoins = _komodoAssetChains.concat(['CHIPS', 'KMD', 'KOMODO']);

var isKomodoCoin = function () {
  function isKomodoCoin(coin, skipKMD) {
    return _komodoCoins.find(function (element) {
      if (skipKMD) {
        return element === coin.toUpperCase() && coin.toUpperCase() !== 'KMD' && coin.toUpperCase() !== 'KOMODO';
      } else {
        return element === coin.toUpperCase();
      }
    });
  }

  return isKomodoCoin;
}(); // TODO: add at least 2 explorers per coin


var explorerList = {
  KMD: 'https://kmd.komodo.build',
  PGT: 'https://pgt.komodo.build',
  KV: 'https://kv.kmdexplorer.io',
  OOT: 'http://explorer.utrum.io',
  BNTN: 'http://chain.blocnation.io',
  CHAIN: 'http://explorer.chainmakers.co',
  GLXT: 'http://glx.info',
  PRLPAY: 'http://explorer.prlpay.com',
  MSHARK: 'https://mshark.kmdexplorer.io',
  REVS: 'https://revs.kmdexplorer.io',
  SUPERNET: 'https://supernet.kmdexplorer.io',
  DEX: 'https://dex.kmdexplorer.io',
  PANGEA: 'https://pangea.kmdexplorer.io',
  JUMBLR: 'https://jumblr.kmdexplorer.io',
  BET: 'https://bet.kmdexplorer.io',
  CRYPTO: 'https://crypto.kmdexplorer.io',
  HODL: 'https://hodl.kmdexplorer.io',
  SHARK: 'http://SHARK.explorer.supernet.org',
  BOTS: 'https://bots.kmdexplorer.io',
  MGW: 'https://mgw.kmdexplorer.io',
  WLC: 'https://wlc.kmdexplorer.io',
  CHIPS: 'https://explorer.chips.cash',
  COQUI: 'https://explorer.coqui.cash',
  EQL: 'http://178.62.240.191',
  MNZ: 'https://mnz.kmdexplorer.io',
  BTCH: 'https://btch.kmdexplorer.io',
  BTC: 'https://blockchain.info',
  HUSH: 'https://explorer.myhush.org',
  PIZZA: 'http://pizza.komodochainz.info',
  BEER: 'http://beer.komodochainz.info',
  NINJA: 'https://ninja.kmdexplorer.io',
  VOTE2018: 'http://88.99.226.252',
  DSEC: 'https://dsec.kmdexplorer.io',
  VRSC: 'https://vrsc.kmdexplorer.io',
  QTUM: 'https://explorer.qtum.org',
  DNR: 'http://denarius.name',
  LTC: 'https://live.blockcypher.com/ltc/tx/',
  DOGE: 'https://live.blockcypher.com/doge/tx/',
  DASH: 'https://live.blockcypher.com/dash/tx/',
  MONA: 'https://bchain.info/MONA',
  VIA: 'https://explorer.viacoin.org',
  VTC: 'http://explorer.vertcoin.info',
  NMC: 'https://namecha.in',
  DGB: 'https://digiexplorer.info',
  CRW: 'http://ex.crownlab.eu',
  ABY: 'http://explorer.artbyte.me',
  GAME: 'https://blockexplorer.gamecredits.com/transactions/',
  MAC: 'http://explorer.machinecoin.org',
  IOP: 'http://mainnet.iop.cash',
  BTG: 'https://btgexplorer.com',
  BCH: 'https://bitcoincash.blockexplorer.com',
  ZCL: 'http://explorer.zclmine.pro',
  SNG: 'https://explorer.snowgem.org/',
  ZMY: 'https://myriadexplorer.com',
  BTX: 'http://explorer.bitcore.cc',
  BTCZ: 'https://explorer.bitcoinz.site',
  HODLC: 'http://www.fuzzbawls.pw/explore/HOdlcoin/tx.php?tx=',
  SIB: 'https://chain.sibcoin.net/en/tx/',
  ZEC: 'https://explorer.zcha.in/transactions/',
  BLK: 'https://explorer.coinpayments.net/transaction.php?chain=4&hash=',
  ARG: 'https://prohashing.com/explorer/Argentum/',
  FAIR: 'https://chain.fair.to/transaction?transaction=',
  CRAVE: 'http://explorer.craveproject.net',
  FTC: 'https://explorer.feathercoin.com',
  NLG: 'https://guldenchain.com',
  PIVX: 'http://www.presstab.pw/phpexplorer/PIVX/tx.php?tx=',
  DMD: 'https://chainz.cryptoid.info/dmd/search.dws?q=',
  EFL: 'https://chainz.cryptoid.info/efl/search.dws?q=',
  BSD: 'https://chainz.cryptoid.info/bsd/search.dws?q=',
  ERC: 'https://chainz.cryptoid.info/erc/search.dws?q=',
  SYS: 'https://chainz.cryptoid.info/sys/search.dws?q=',
  EMC2: 'https://chainz.cryptoid.info/emc2/search.dws?q=',
  IXC: 'https://chainz.cryptoid.info/ixc/search.dws?q=',
  DGC: 'https://chainz.cryptoid.info/dgc/search.dws?q=',
  VOX: 'http://206.189.74.116:3001',
  AUR: 'http://insight.auroracoin.is',
  LBC: 'https://explorer.lbry.io',
  ACC: 'http://explorer.getadcoin.com:5000',
  VIVO: 'http://vivo.explorerz.top:3003',
  GBX: 'http://explorer.gobyte.network:5001',
  FJC: 'http://explorer.fujicoin.org',
  LINX: 'http://explorer.mylinx.io/?',
  CDN: 'https://explorer.canadaecoin.ca',
  FLASH: 'https://explorer.flashcoin.io',
  ZILLA: 'http://zilla.explorer.dexstats.info',
  XZC: 'https://explorer.zcoin.io'
};
var explorerListExt = {
  DEX: 'http://dex.explorer.komodo.services',
  SUPERNET: 'http://supernet.explorer.komodo.services'
};
module.exports = {
  isKomodoCoin: isKomodoCoin,
  explorerList: explorerList,
  explorerListExt: explorerListExt,
  kmdAssetChains: _komodoAssetChains,
  kmdCoins: _komodoCoins // all coins that share R-addresses

};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"electrum-servers.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/lib/agama-wallet-lib/build/electrum-servers.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';

var electrumServers = {
  kmd: {
    txfee: 10000,
    serverList: ['electrum1.komodo.build:10001:tcp']
  },
  btc: {
    serverList: ['electrum1.komodo.build:10000:tcp']
  },
  test2: {
    txfee: 10000,
    serverList: ['159.65.113.156:10009:tcp']
  } // ..
  // zilla: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10028:tcp', 'electrum2.cipig.net:10028:tcp']
  // },
  // prlpay: {
  //   txfee: 10000,
  //   serverList: ['electrum1.prlpay.com:9681:tcp', 'electrum2.prlpay.com:9681:tcp']
  // },
  // kv: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10016:tcp', 'electrum2.cipig.net:10016:tcp']
  // },
  // bntn: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10026:tcp', 'electrum2.cipig.net:10026:tcp']
  // },
  // eql: {
  //   txfee: 10000,
  //   serverList: ['159.65.91.235:10801:tcp', '167.99.204.42:10801:tcp']
  // },
  // oot: {
  //   txfee: 10000,
  //   serverList: ['electrum1.utrum.io:10088:tcp', 'electrum2.utrum.io:10088:tcp']
  // },
  // coqui: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10011:tcp', 'electrum2.cipig.net:10011:tcp']
  // },
  // chain: {
  //   txfee: 10000,
  //   serverList: ['electrum1.chainmakers.co:55417:tcp', 'electrum2.chainmakers.co:55417:tcp']
  // },
  // glxt: {
  //   txfee: 10000,
  //   serverList: ['electrum1.glx.co:60012:tcp', 'electrum2.glx.co:60012:tcp']
  // },
  // revs: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10003:tcp', 'electrum2.cipig.net:10003:tcp']
  // },
  // supernet: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10005:tcp', 'electrum2.cipig.net:10005:tcp']
  // },
  // dex: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10006:tcp', 'electrum2.cipig.net:10006:tcp']
  // },
  // bots: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10007:tcp', 'electrum2.cipig.net:10007:tcp']
  // },
  // crypto: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10008:tcp', 'electrum2.cipig.net:10008:tcp']
  // },
  // dnr: {
  //   txfee: 10000,
  //   serverList: ['144.202.95.223:50001:tcp', '45.77.137.111:50001:tcp']
  // },
  // hodl: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10009:tcp', 'electrum2.cipig.net:10009:tcp']
  // },
  // pangea: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10010:tcp', 'electrum2.cipig.net:10010:tcp']
  // },
  // bet: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10012:tcp', 'electrum2.cipig.net:10012:tcp']
  // },
  // mshark: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10013:tcp', 'electrum2.cipig.net:10013:tcp']
  // },
  // mnz: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10002:tcp', 'electrum2.cipig.net:10002:tcp']
  // },
  // wlc: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10014:tcp', 'electrum2.cipig.net:10014:tcp']
  // },
  // mgw: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10015:tcp', 'electrum2.cipig.net:10015:tcp']
  // },
  // btch: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10020:tcp', 'electrum2.cipig.net:10020:tcp']
  // },
  // beer: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10022:tcp', 'electrum2.cipig.net:10022:tcp']
  // },
  // pizza: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10024:tcp', 'electrum2.cipig.net:10024:tcp']
  // },
  // vote2018: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10021:tcp', 'electrum2.cipig.net:10021:tcp']
  // },
  // ninja: {
  //   txfee: 10000,
  //   serverList: ['electrum1.fund.ninja:50001:tcp', 'electrum2.fund.ninja:50001:tcp']
  // },
  // jumblr: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10004:tcp', 'electrum2.cipig.net:10004:tcp']
  // },
  // // kmd: {
  // //   txfee: 10000,
  // //   serverList: ['electrum1.cipig.net:10001:tcp', 'electrum2.cipig.net:10001:tcp']
  // // },
  // doge: {
  //   txfee: 100000000,
  //   serverList: ['electrum1.cipig.net:10060:tcp', 'electrum2.cipig.net:10060:tcp']
  // },
  // via: {
  //   txfee: 100000,
  //   serverList: ['electrum1.cipig.net:10067:tcp', 'electrum2.cipig.net:10067:tcp']
  // },
  // vtc: {
  //   txfee: 100000,
  //   serverList: ['electrum1.cipig.net:10071:tcp', 'electrum2.cipig.net:10071:tcp']
  // },
  // nmc: {
  //   txfee: 100000,
  //   serverList: ['electrum1.cipig.net:10066:tcp', 'electrum2.cipig.net:10066:tcp']
  // },
  // mona: {
  //   txfee: 100000,
  //   serverList: ['electrumx1.monacoin.nl:50001:tcp', 'electrumx2.monacoin.nl:50001:tcp', 'electrumx1.monacoin.ninja:50001:tcp', 'electrumx2.monacoin.ninja:50001:tcp']
  // },
  // ltc: {
  //   txfee: 100000,
  //   serverList: ['electrum1.cipig.net:10065:tcp', 'electrum2.cipig.net:10065:tcp']
  // },
  // fair: {
  //   txfee: 1000000,
  //   serverList: ['electrum1.cipig.net:10063:tcp', 'electrum2.cipig.net:10063:tcp']
  // },
  // dgb: {
  //   txfee: 100000,
  //   serverList: ['electrum1.cipig.net:10059:tcp', 'electrum2.cipig.net:10059:tcp']
  // },
  // dash: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10061:tcp', 'electrum2.cipig.net:10061:tcp']
  // },
  // crw: {
  //   txfee: 10000,
  //   serverList: ['sgp-crwseed.crowndns.info:50001:tcp', 'blr-crwseed.crowndns.info:50001:tcp', 'sfo-crwseed.crowndns.info:50001:tcp', 'nyc-crwseed.crowndns.info:50001:tcp', 'ams-crwseed.crowndns.info:50001:tcp', 'tor-crwseed.crowndns.info:50001:tcp', 'lon-crwseed.crowndns.info:50001:tcp', 'fra-crwseed.crowndns.info:50001:tcp']
  // },
  // // btc: {
  // //   serverList: ['electrum1.cipig.net:10000:tcp', 'electrum2.cipig.net:10000:tcp', 'electrum3.cipig.net:10000:tcp']
  // // },
  // btg: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10052:tcp', 'electrum2.cipig.net:10052:tcp', 'electrum3.cipig.net:10052:tcp']
  // },
  // blk: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10054:tcp', 'electrum2.cipig.net:10054:tcp']
  // },
  // sib: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10050:tcp', 'electrum2.cipig.net:10050:tcp']
  // },
  // bch: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10051:tcp', 'electrum2.cipig.net:10051:tcp']
  // },
  // arg: {
  //   txfee: 50000,
  //   serverList: ['electrum1.cipig.net:10068:tcp', 'electrum2.cipig.net:10068:tcp']
  // },
  // chips: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10053:tcp', 'electrum2.cipig.net:10053:tcp']
  // },
  // zec: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10058:tcp', 'electrum2.cipig.net:10058:tcp']
  // },
  // hush: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10064:tcp', 'electrum2.cipig.net:10064:tcp']
  // },
  // sng: {
  //   txfee: 10000,
  //   serverList: ['electrumsvr.snowgem.org:50001:tcp', 'electrumsvr2.snowgem.org:50001:tcp', 'electrumsvr.snowgem.org:50002:ssl', 'electrumsvr2.snowgem.org:50002:ssl']
  // },
  // xmy: {
  //   txfee: 5000,
  //   serverList: ['cetus.cryptap.us:50004:ssl', 'kraken.cryptap.us:50004:ssl']
  // },
  // zcl: {
  //   txfee: 1000,
  //   serverList: ['electrum1.cipig.net:10055:tcp', 'electrum2.cipig.net:10055:tcp']
  // },
  // hodlc: {
  //   txfee: 5000,
  //   serverList: ['hodl.amit177.cf:17989:tcp', 'hodl2.amit177.cf:17898:tcp']
  // },
  // btx: {
  //   txfee: 50000,
  //   serverList: ['electrum1.cipig.net:10057:tcp', 'electrum2.cipig.net:10057:tcp']
  // },
  // btcz: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10056:tcp', 'electrum2.cipig.net:10056:tcp']
  // },
  // grs: {
  //   txfee: 50000,
  //   serverList: ['electrum10.groestlcoin.org:50001:tcp', 'electrum11.groestlcoin.org:50001:tcp']
  // },
  // qtum: {
  //   txfee: 400000,
  //   serverList: ['s1.qtum.info:50001:tcp', 's2.qtum.info:50001:tcp']
  // },
  // btcp: {
  //   txfee: 10000,
  //   serverList: ['electrum.btcprivate.org:5222:tcp', 'electrum2.btcprivate.org:5222:tcp']
  // },
  // emc2: {
  //   txfee: 100000,
  //   serverList: ['electrum1.cipig.net:10062:tcp', 'electrum2.cipig.net:10062:tcp']
  // },
  // bcbc: {
  //   txfee: 10000,
  //   serverList: ['bsmn0.cleanblockchain.io:50001:tcp', 'bsmn1.cleanblockchain.io:50001:tcp']
  // },
  // game: {
  //   txfee: 100000,
  //   serverList: ['electrum1.cipig.net:10072:tcp', 'electrum2.cipig.net:10072:tcp']
  // },
  // fjc: {
  //   txfee: 100000,
  //   serverList: ['electrumx1.fujicoin.org:50001:tcp', 'electrumx2.fujicoin.org:50001:tcp', 'electrumx3.fujicoin.org:50001:tcp']
  // },
  // ftc: {
  //   txfee: 1000000,
  //   serverList: ['electrum1.cipig.net:10074:tcp', 'electrum2.cipig.net:10074:tcp', 'electrum3.cipig.net:10074:tcp']
  // },
  // polis: {
  //   txfee: 0, // fix
  //   serverList: ['electrum1.cipig.net:10075:tcp', 'electrum2.cipig.net:10075:tcp', 'electrum3.cipig.net:10075:tcp']
  // },
  // xmcc: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10076:tcp', 'electrum2.cipig.net:10076:tcp', 'electrum3.cipig.net:10076:tcp']
  // },
  // xzc: {
  //   txfee: 10000,
  //   serverList: ['electrumx01.zcoin.io:50001:tcp', 'electrumx02.zcoin.io":50001:tcp', '45.63.92.224:50001:tcp', '45.77.67.235:50001:tcp']
  // },
  // gbx: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10073:tcp', 'electrum2.cipig.net:10073:tcp', 'electrum3.cipig.net:10073:tcp']
  // },
  // mac: {
  //   txfee: 100000,
  //   serverList: ['electrum1.cipig.net:10077:tcp', 'electrum2.cipig.net:10077:tcp', 'electrum3.cipig.net:10077:tcp']
  // },
  // mnx: {
  //   txfee: 10000,
  //   serverList: ['electrum1.cipig.net:10079:tcp', 'electrum2.cipig.net:10079:tcp', 'electrum3.cipig.net:10079:tcp']
  // }

};
module.exports = electrumServers;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"keys.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/lib/agama-wallet-lib/build/keys.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';

var sha256 = require('js-sha256');

var crypto = require('crypto');

var bigi = require('bigi');

var bitcoinZcash = require('bitcoinjs-lib-zcash');

var bitcoin = require('bitcoinjs-lib');

var bitcoinPos = require('bitcoinjs-lib-pos');

var bs58check = require('bs58check');

var bip39 = require('bip39');

var addressVersionCheck = function () {
  function addressVersionCheck(network, address) {
    try {
      var _b58check = network.isZcash ? bitcoinZcash.address.fromBase58Check(address) : bitcoin.address.fromBase58Check(address);

      if (_b58check.version === network.pubKeyHash || _b58check.version === network.scriptHash) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return 'Invalid pub address';
    }
  }

  return addressVersionCheck;
}();

var wifToWif = function () {
  function wifToWif(wif, network) {
    var key = void 0;

    if (network.isZcash) {
      key = new bitcoinZcash.ECPair.fromWIF(wif, network, true);
    } else {
      key = new bitcoin.ECPair.fromWIF(wif, network, true);
    }

    return {
      pub: key.getAddress(),
      priv: key.toWIF()
    };
  }

  return wifToWif;
}();

var seedToWif = function () {
  function seedToWif(seed, network, iguana) {
    var hash = sha256.create().update(seed);
    var bytes = hash.array();

    if (iguana) {
      bytes[0] &= 248;
      bytes[31] &= 127;
      bytes[31] |= 64;
    }

    var d = bigi.fromBuffer(bytes);
    var keyPair = void 0;

    if (network.isZcash) {
      keyPair = new bitcoinZcash.ECPair(d, null, {
        network: network
      });
    } else {
      keyPair = new bitcoin.ECPair(d, null, {
        network: network
      });
    }

    var keys = {
      pub: keyPair.getAddress(),
      priv: keyPair.toWIF()
    };
    return keys;
  }

  return seedToWif;
}(); // login like function


var stringToWif = function () {
  function stringToWif(string, network, iguana) {
    var _wifError = false;
    var isWif = false;
    var keys = void 0; // watchonly

    if (string.match('^[a-zA-Z0-9]{34}$')) {
      return {
        priv: string,
        pub: string
      };
    } else {
      try {
        bs58check.decode(string);
        isWif = true;
      } catch (e) {}

      if (isWif) {
        try {
          if (network.isZcash) {
            key = new bitcoinZcash.ECPair.fromWIF(string, network, true);
          } else {
            key = new bitcoin.ECPair.fromWIF(string, network, true);
          }

          keys = {
            priv: key.toWIF(),
            pub: key.getAddress()
          };
        } catch (e) {
          _wifError = true;
        }
      } else {
        keys = seedToWif(string, network, iguana);
      }
    }

    return _wifError ? 'error' : keys;
  }

  return stringToWif;
}();

var bip39Search = function () {
  function bip39Search(seed, network, matchPattern, addressDepth, accountsCount, includeChangeAddresses, addressDepthOffset, accountCountOffset) {
    seed = bip39.mnemonicToSeed(seed);
    var hdMaster = bitcoin.HDNode.fromSeedBuffer(seed, network);
    var _defaultAddressDepth = addressDepth;
    var _defaultAccountCount = accountsCount;
    var _addresses = [];

    var _matchingKey = matchPattern ? [] : {};

    accountCountOffset = !accountCountOffset ? 0 : accountCountOffset;
    addressDepthOffset = !addressDepthOffset ? 0 : addressDepthOffset;

    for (var i = Number(accountCountOffset); i < Number(accountCountOffset) + Number(_defaultAccountCount); i++) {
      for (var j = 0; j < (includeChangeAddresses ? 2 : 1); j++) {
        for (var k = Number(addressDepthOffset); k < Number(addressDepthOffset) + Number(_defaultAddressDepth); k++) {
          var _key = hdMaster.derivePath('m/44\'/141\'/' + i + '\'/' + j + '/' + k);

          if (!matchPattern) {
            _matchingKey.push({
              path: 'm/44\'/141\'/' + i + '\'/' + j + '/' + k,
              pub: _key.keyPair.getAddress(),
              priv: _key.keyPair.toWIF()
            });
          } else {
            if (_key.keyPair.getAddress() === matchPattern) {
              _matchingKey = {
                pub: _key.keyPair.getAddress(),
                priv: _key.keyPair.toWIF()
              };
            }
          }
        }
      }
    }

    return _matchingKey ? _matchingKey : 'address is not found';
  }

  return bip39Search;
}();

module.exports = {
  bip39Search: bip39Search,
  addressVersionCheck: addressVersionCheck,
  wifToWif: wifToWif,
  seedToWif: seedToWif,
  stringToWif: stringToWif
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"komodo-interest.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/lib/agama-wallet-lib/build/komodo-interest.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict"; // TODO: tiptime != 0 && nLockTime < tiptime

module.exports = function (locktime, value, height) {
  // value in sats
  var KOMODO_ENDOFERA = 7777777;
  var LOCKTIME_THRESHOLD = 500000000;
  var timestampDiff = Math.floor(Date.now() / 1000) - locktime - 777;
  var hoursPassed = Math.floor(timestampDiff / 3600);
  var minutesPassed = Math.floor((timestampDiff - hoursPassed * 3600) / 60);
  var secondsPassed = timestampDiff - hoursPassed * 3600 - minutesPassed * 60;
  var timestampDiffMinutes = timestampDiff / 60;
  var interest = 0; // calc interest

  if (height < KOMODO_ENDOFERA && locktime >= LOCKTIME_THRESHOLD) {
    if (timestampDiffMinutes >= 60) {
      if (height >= 1000000 && timestampDiffMinutes > 31 * 24 * 60) {
        timestampDiffMinutes = 31 * 24 * 60;
      } else {
        if (timestampDiffMinutes > 365 * 24 * 60) {
          timestampDiffMinutes = 365 * 24 * 60;
        }

        timestampDiffMinutes -= 59; // TODO: check if interest is > 5% yr
        // calc ytd and 5% for 1 yr
        // const hoursInOneYear = 365 * 24;
        // const hoursDiff = hoursInOneYear - hoursPassed;

        interest = (Number(value) * 0.00000001 / 10512000 * timestampDiffMinutes).toFixed(8);
      }
    }
  }

  return interest;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"time.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/lib/agama-wallet-lib/build/time.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';

var secondsToString = function () {
  function secondsToString(seconds, skipMultiply, showSeconds) {
    var a = new Date(seconds * (skipMultiply ? 1 : 1000));
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + (showSeconds ? ':' + sec : '');
    return time;
  }

  return secondsToString;
}();

var checkTimestamp = function () {
  function checkTimestamp(dateToCheck) {
    var currentEpochTime = Date.now() / 1000;
    var secondsElapsed = Number(currentEpochTime) - Number(dateToCheck / 1000);
    return Math.floor(secondsElapsed);
  }

  return checkTimestamp;
}();

var secondsElapsedToString = function () {
  function secondsElapsedToString(timestamp) {
    // in seconds
    var secondsElapsed = checkTimestamp(timestamp);
    var hours = Math.floor(timestamp / 3600);
    var minutes = Math.floor((timestamp - hours * 3600) / 60);
    var seconds = timestamp - hours * 3600 - minutes * 60;
    var returnTimeVal = (hours > 0 ? hours + ' hour(s) ' : '') + (minutes > 0 ? minutes + ' minute(s) ' : '') + (seconds > 0 ? seconds + ' second(s) ' : '');
    return returnTimeVal;
  }

  return secondsElapsedToString;
}();

module.exports = {
  secondsToString: secondsToString,
  checkTimestamp: checkTimestamp,
  secondsElapsedToString: secondsElapsedToString
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"transaction-builder.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/lib/agama-wallet-lib/build/transaction-builder.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';

var bitcoinJSForks = require('bitcoinforksjs-lib');

var bitcoinZcash = require('bitcoinjs-lib-zcash');

var bitcoinPos = require('bitcoinjs-lib-pos');

var bitcoin = require('bitcoinjs-lib');

var utils = require('./utils');

var coinselect = require('coinselect'); // single sig


var transaction = function () {
  function transaction(sendTo, changeAddress, wif, network, utxo, changeValue, spendValue, opreturn) {
    var key = network.isZcash ? bitcoinZcash.ECPair.fromWIF(wif, network) : bitcoin.ECPair.fromWIF(wif, network);
    var tx = void 0;
    var btcFork = {};

    if (network.isZcash) {
      tx = new bitcoinZcash.TransactionBuilder(network);
    } else if (network.isPoS) {
      tx = new bitcoinPos.TransactionBuilder(network);
    } else if (network.isBtcFork) {
      tx = new bitcoinJSForks.TransactionBuilder(network);
      var keyPair = bitcoinJSForks.ECPair.fromWIF(wif, network);
      btcFork = {
        keyPair: keyPair,
        pk: bitcoinJSForks.crypto.hash160(keyPair.getPublicKeyBuffer()),
        spk: bitcoinJSForks.script.pubKeyHash.output.encode(bitcoinJSForks.crypto.hash160(keyPair.getPublicKeyBuffer()))
      };
    } else {
      tx = new bitcoin.TransactionBuilder(network);
    }

    for (var i = 0; i < utxo.length; i++) {
      if (network.isBtcFork) {
        tx.addInput(utxo[i].txid, utxo[i].vout, bitcoinJSForks.Transaction.DEFAULT_SEQUENCE, btcFork.spk);
      } else {
        tx.addInput(utxo[i].txid, utxo[i].vout);
      }
    }

    if (network.isPoS) {
      tx.addOutput(sendTo, Number(spendValue), network);
    } else {
      tx.addOutput(sendTo, Number(spendValue));
    }

    if (changeValue > 0) {
      if (network.isPoS) {
        tx.addOutput(changeAddress, Number(changeValue), network);
      } else {
        tx.addOutput(changeAddress, Number(changeValue));
      }
    }

    if (opreturn) {
      var _data = Buffer.from(opreturn, 'utf8');

      var dataScript = bitcoin.script.nullData.output.encode(_data);
      tx.addOutput(dataScript, 1000);
    }

    if (network.forkName && network.forkName === 'btg') {
      tx.enableBitcoinGold(true);
      tx.setVersion(2);
    } else if (network.forkName && network.forkName === 'bch') {
      tx.enableBitcoinCash(true);
      tx.setVersion(2);
    }

    if (network.kmdInterest) {
      var _locktime = Math.floor(Date.now() / 1000) - 777;

      tx.setLockTime(_locktime);
    }

    for (var _i = 0; _i < utxo.length; _i++) {
      if (network.isPoS) {
        tx.sign(network, _i, key);
      } else if (network.isBtcFork) {
        var hashType = bitcoinJSForks.Transaction.SIGHASH_ALL | bitcoinJSForks.Transaction.SIGHASH_BITCOINCASHBIP143;
        tx.sign(_i, btcFork.keyPair, null, hashType, utxo[_i].value);
      } else {
        tx.sign(_i, key);
      }
    }

    var rawtx = tx.build().toHex();
    return rawtx;
  }

  return transaction;
}(); // TODO: merge sendmany


var data = function () {
  function data(network, value, fee, outputAddress, changeAddress, utxoList) {
    var btcFee = fee.perbyte ? fee.value : null; // TODO: coin non specific switch static/dynamic fee

    if (btcFee) {
      fee = 0;
    } else {
      fee = fee.value;
    }

    if (utxoList && utxoList.length && utxoList[0] && utxoList[0].txid) {
      var utxoListFormatted = [];
      var totalInterest = 0;
      var totalInterestUTXOCount = 0;
      var interestClaimThreshold = 200;
      var utxoVerified = true;

      for (var i = 0; i < utxoList.length; i++) {
        if (network.kmdInterest) {
          utxoListFormatted.push({
            txid: utxoList[i].txid,
            vout: utxoList[i].vout,
            value: Number(utxoList[i].amountSats),
            interestSats: Number(utxoList[i].interestSats),
            verified: utxoList[i].verified ? utxoList[i].verified : false
          });
        } else {
          utxoListFormatted.push({
            txid: utxoList[i].txid,
            vout: utxoList[i].vout,
            value: Number(utxoList[i].amountSats),
            verified: utxoList[i].verified ? utxoList[i].verified : false
          });
        }
      }

      var _maxSpendBalance = Number(utils.maxSpendBalance(utxoListFormatted));

      var targets = [{
        address: outputAddress,
        value: value > _maxSpendBalance ? _maxSpendBalance : value
      }];
      targets[0].value = targets[0].value + fee; // default coin selection algo blackjack with fallback to accumulative
      // make a first run, calc approx tx fee
      // if ins and outs are empty reduce max spend by txfee

      var firstRun = coinselect(utxoListFormatted, targets, btcFee ? btcFee : 0);
      var inputs = firstRun.inputs;
      var outputs = firstRun.outputs;

      if (btcFee) {
        fee = firstRun.fee;
      }

      if (!outputs) {
        targets[0].value = targets[0].value - fee;
        var secondRun = coinselect(utxoListFormatted, targets, 0);
        inputs = secondRun.inputs;
        outputs = secondRun.outputs;
        fee = fee ? fee : secondRun.fee;
      }

      var _change = 0;

      if (outputs && outputs.length === 2) {
        _change = outputs[1].value - fee;
      }

      if (!btcFee && _change === 0) {
        outputs[0].value = outputs[0].value - fee;
      }

      if (btcFee) {
        value = outputs[0].value;
      } else {
        if (_change > 0) {
          value = outputs[0].value - fee;
        }
      } // check if any outputs are unverified


      if (inputs && inputs.length) {
        for (var _i2 = 0; _i2 < inputs.length; _i2++) {
          if (!inputs[_i2].verified) {
            utxoVerified = false;
            break;
          }
        }

        for (var _i3 = 0; _i3 < inputs.length; _i3++) {
          if (Number(inputs[_i3].interestSats) > interestClaimThreshold) {
            totalInterest += Number(inputs[_i3].interestSats);
            totalInterestUTXOCount++;
          }
        }
      }

      var _maxSpend = utils.maxSpendBalance(utxoListFormatted);

      if (value > _maxSpend) {
        return 'Spend value is too large. Max available amount is ' + Number((_maxSpend * 0.00000001).toFixed(8));
      } else {
        // account for KMD interest
        if (network.kmdInterest && totalInterest > 0) {
          // account for extra vout
          if (_maxSpend - fee === value) {
            _change = totalInterest - _change;

            if (outputAddress === changeAddress) {
              value += _change;
              _change = 0;
            }
          } else {
            _change += totalInterest;
          } // double check kmd interest is combined into 1 output


          if (outputAddress === changeAddress && _change > 0) {
            value += _change - fee;
            _change = 0;
          }
        }

        if (!inputs && !outputs) {
          return 'Can\'t find best fit utxo. Try lower amount.';
        } else {
          var vinSum = 0;

          for (var _i4 = 0; _i4 < inputs.length; _i4++) {
            vinSum += inputs[_i4].value;
          }

          var _estimatedFee = vinSum - outputs[0].value - _change; // double check no extra fee is applied


          if (vinSum - value - _change > fee) {
            _change += fee;
          } else if (vinSum - value - _change === 0) {
            // max amount spend edge case
            value = value - fee;
          } // TODO: use individual dust thresholds


          if (_change > 0 && _change <= 1000) {
            _change = 0;
          }

          return {
            outputAddress: outputAddress,
            changeAddress: changeAddress,
            network: network,
            change: _change,
            value: value,
            inputs: inputs,
            outputs: outputs,
            targets: targets,
            fee: fee,
            estimatedFee: _estimatedFee,
            balance: _maxSpendBalance,
            totalInterest: totalInterest,
            utxoVerified: utxoVerified
          };
        }
      }
    } else {
      return 'no valid utxos';
    }
  }

  return data;
}();

module.exports = {
  data: data,
  transaction: transaction
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"transaction-decoder.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/lib/agama-wallet-lib/build/transaction-decoder.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
/*
MIT License

Copyright (c) 2017 Yuki Akiyama, SuperNET

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Supported coin types: bitcoin, bitcoin forks BTG and BCH, zcash based coins, PoS type coins

*/


var bitcoinLib = {
  bitcoinPos: {
    main: require('bitcoinjs-lib-pos'),
    script: require('bitcoinjs-lib-pos/src/script'),
    address: require('bitcoinjs-lib-pos/src/address')
  },
  bitcoinZcash: require('bitcoinjs-lib-zcash'),
  bitcoin: require('bitcoinjs-lib')
};
var bitcoin = void 0; // zcash tx decode fallback

var Buffer = require('safe-buffer').Buffer;

var _require = require('tx-decoder/src/buffer-utils'),
    readSlice = _require.readSlice,
    readInt32 = _require.readInt32,
    readUInt32 = _require.readUInt32;

var _require2 = require('tx-decoder/src/compose'),
    compose = _require2.compose,
    addProp = _require2.addProp;

var _require3 = require('tx-decoder/src/tx-decoder'),
    readInputs = _require3.readInputs,
    readInput = _require3.readInput,
    readOutput = _require3.readOutput;

var crypto = require('crypto');

var _sha256 = function () {
  function _sha256(data) {
    return crypto.createHash('sha256').update(data).digest();
  }

  return _sha256;
}();

var decodeFormat = function () {
  function decodeFormat(tx) {
    var result = {
      txid: tx.getId(),
      version: tx.version,
      locktime: tx.locktime
    };
    return result;
  }

  return decodeFormat;
}();

var decodeInput = function () {
  function decodeInput(tx, network) {
    var result = [];
    tx.ins.forEach(function (input, n) {
      var vin = {
        txid: !input.hash.reverse ? input.hash : input.hash.reverse().toString('hex'),
        n: input.index,
        script: network.isPoS ? bitcoinLib.bitcoinPos.script.fromHex(input.hash) : bitcoin.script.toASM(input.script),
        sequence: input.sequence
      };
      result.push(vin);
    });
    return result;
  }

  return decodeInput;
}();

var decodeOutput = function () {
  function decodeOutput(tx, network) {
    var format = function () {
      function format(out, n, network) {
        var vout = {
          satoshi: out.value,
          value: (1e-8 * out.value).toFixed(8),
          n: n,
          scriptPubKey: {
            asm: network.isPoS ? bitcoinLib.bitcoin.script.toASM(out.script.chunks) : bitcoin.script.toASM(out.script),
            hex: network.isPoS ? out.script.toHex() : out.script.toString('hex'),
            type: network.isPoS ? bitcoin.scripts.classifyOutput(out.script) : bitcoin.script.classifyOutput(out.script),
            addresses: []
          }
        };

        switch (vout.scriptPubKey.type) {
          case 'pubkeyhash':
            if (network.isPoS) {
              vout.scriptPubKey.addresses.push(bitcoinLib.bitcoinPos.address.fromOutputScript(out.script, network));
            } else {
              vout.scriptPubKey.addresses.push(bitcoin.address.fromOutputScript(out.script, network));
            }

            break;

          case 'pubkey':
            var pubKeyBuffer = new Buffer(vout.scriptPubKey.asm.split(' ')[0], 'hex');
            vout.scriptPubKey.addresses.push(bitcoin.ECPair.fromPublicKeyBuffer(pubKeyBuffer, network).getAddress());
            break;

          case 'scripthash':
            if (network.isPoS) {
              vout.scriptPubKey.addresses.push(bitcoinLib.bitcoinPos.address.fromOutputScript(out.script, network));
            } else {
              vout.scriptPubKey.addresses.push(bitcoin.address.fromOutputScript(out.script, network));
            }

            break;
        }

        return vout;
      }

      return format;
    }();

    var result = [];
    tx.outs.forEach(function (out, n) {
      result.push(format(out, n, network));
    });
    return result;
  }

  return decodeOutput;
}();

var transactionDecoder = function () {
  function transactionDecoder(rawtx, network, debug) {
    if (network.isPoS) {
      bitcoin = bitcoinLib.bitcoinPos.main;
    } else if (network.isZcash) {
      bitcoin = bitcoinLib.bitcoinZcash;
    } else {
      bitcoin = bitcoinLib.bitcoin;
    }

    if (debug) {
      var _tx = bitcoin.Transaction.fromHex(rawtx);

      return {
        tx: _tx,
        network: network,
        format: decodeFormat(_tx),
        inputs: decodeInput(_tx, network),
        outputs: decodeOutput(_tx, network)
      };
    } else {
      if (network.isZcash) {
        var buffer = Buffer.from(rawtx, 'hex');

        var decodeTx = function () {
          function decodeTx(buffer) {
            return compose([addProp('version', readInt32), // 4 bytes
            addProp('ins', readInputs(readInput)), // 1-9 bytes (VarInt), Input counter; Variable, Inputs
            addProp('outs', readInputs(readOutput)), // 1-9 bytes (VarInt), Output counter; Variable, Outputs
            addProp('locktime', readUInt32) // 4 bytes
            ])({}, buffer);
          }

          return decodeTx;
        }();

        var readHash = function () {
          function readHash(buffer) {
            var _readSlice = readSlice(32)(_sha256(_sha256(buffer))),
                _readSlice2 = _slicedToArray(_readSlice, 2),
                res = _readSlice2[0],
                bufferLeft = _readSlice2[1];

            var hash = Buffer.from(res, 'hex').reverse().toString('hex');
            return [hash, bufferLeft];
          }

          return readHash;
        }();

        var decodedtx = decodeTx(buffer);

        decodedtx[0].getId = function () {
          return readHash(buffer)[0];
        };

        return {
          tx: decodedtx[0],
          network: network,
          format: decodeFormat(decodedtx[0]),
          inputs: !decodedtx[0].ins.length ? [{
            txid: '0000000000000000000000000000000000000000000000000000000000000000'
          }] : decodeInput(decodedtx[0], network),
          outputs: decodeOutput(decodedtx[0], network)
        };
      } else {
        try {
          var _tx2 = network.isPoS ? bitcoin.Transaction.fromHex(rawtx, network) : bitcoin.Transaction.fromHex(rawtx);

          return {
            tx: _tx2,
            network: network,
            format: decodeFormat(_tx2),
            inputs: decodeInput(_tx2, network),
            outputs: decodeOutput(_tx2, network)
          };
        } catch (e) {
          return false;
        }
      }
    }
  }

  return transactionDecoder;
}();

module.exports = transactionDecoder;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"transaction-type.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/lib/agama-wallet-lib/build/transaction-type.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return Array.from(arr);
  }
}

var transactionType = function () {
  function transactionType(tx, targetAddress, isKomodo, skipTargetAddress) {
    // TODO: - sum vins / sum vouts to the same address
    //       - multi vin multi vout
    //       - detect change address
    //       - double check for exact sum input/output values
    var result = [];
    var _parse = {
      inputs: {},
      outputs: {}
    };
    var _sum = {
      inputs: 0,
      outputs: 0
    };
    var _total = {
      inputs: 0,
      outputs: 0
    };
    var _addresses = {
      inputs: [],
      outputs: []
    };

    if (tx.format === 'cant parse') {
      return {
        type: 'unknown',
        amount: 'unknown',
        address: targetAddress,
        timestamp: tx.timestamp,
        txid: tx.format.txid,
        confirmations: tx.confirmations
      };
    }

    for (var key in meteorBabelHelpers.sanitizeForInObject(_parse)) {
      if (!tx[key].length) {
        _parse[key] = [];

        _parse[key].push(tx[key]);
      } else {
        _parse[key] = tx[key];
      }

      for (var i = 0; i < _parse[key].length; i++) {
        _total[key] += Number(_parse[key][i].value); // ignore op return outputs

        if (_parse[key][i].scriptPubKey && _parse[key][i].scriptPubKey.addresses && _parse[key][i].scriptPubKey.addresses[0] && _parse[key][i].scriptPubKey.addresses[0] === targetAddress && _parse[key][i].value) {
          _sum[key] += Number(_parse[key][i].value);
        }

        if (_parse[key][i].scriptPubKey && _parse[key][i].scriptPubKey.addresses && _parse[key][i].scriptPubKey.addresses[0]) {
          _addresses[key].push(_parse[key][i].scriptPubKey.addresses[0]);

          if (_parse[key][i].scriptPubKey.addresses[0] === targetAddress && skipTargetAddress) {
            _addresses[key].pop();
          }
        }
      }
    }

    _addresses.inputs = [].concat(_toConsumableArray(new Set(_addresses.inputs)));
    _addresses.outputs = [].concat(_toConsumableArray(new Set(_addresses.outputs)));
    var isSelfSend = {
      inputs: false,
      outputs: false
    };

    for (var _key in meteorBabelHelpers.sanitizeForInObject(_parse)) {
      for (var _i = 0; _i < _addresses[_key].length; _i++) {
        if (_addresses[_key][_i] === targetAddress && _addresses[_key].length === 1) {
          isSelfSend[_key] = true;
        }
      }
    }

    if (_sum.inputs > 0 && _sum.outputs > 0) {
      // vin + change, break into two tx
      // send to self
      if (isSelfSend.inputs && isSelfSend.outputs) {
        result = {
          type: 'self',
          amount: Number(_sum.inputs - _sum.outputs).toFixed(8),
          address: targetAddress,
          timestamp: tx.timestamp,
          txid: tx.format.txid,
          confirmations: tx.confirmations
        };

        if (isKomodo) {
          // calc claimed interest amount
          var vinVoutDiff = _total.inputs - _total.outputs;

          if (vinVoutDiff < 0) {
            result.interest = Number(vinVoutDiff.toFixed(8));
          }
        }
      } else {
        result = [{
          // reorder since tx sort by default is from newest to oldest
          type: 'sent',
          amount: Number(_sum.inputs.toFixed(8)),
          address: _addresses.outputs[0],
          timestamp: tx.timestamp,
          txid: tx.format.txid,
          confirmations: tx.confirmations,
          inputAddresses: _addresses.inputs,
          outputAddresses: _addresses.outputs
        }, {
          type: 'received',
          amount: Number(_sum.outputs.toFixed(8)),
          address: targetAddress,
          timestamp: tx.timestamp,
          txid: tx.format.txid,
          confirmations: tx.confirmations,
          inputAddresses: _addresses.inputs,
          outputAddresses: _addresses.outputs
        }];

        if (isKomodo) {
          // calc claimed interest amount
          var _vinVoutDiff = _total.inputs - _total.outputs;

          if (_vinVoutDiff < 0) {
            result[1].interest = Number(_vinVoutDiff.toFixed(8));
          }
        }
      }
    } else if (_sum.inputs === 0 && _sum.outputs > 0) {
      result = {
        type: 'received',
        amount: Number(_sum.outputs.toFixed(8)),
        address: targetAddress,
        timestamp: tx.timestamp,
        txid: tx.format.txid,
        confirmations: tx.confirmations,
        inputAddresses: _addresses.inputs,
        outputAddresses: _addresses.outputs
      };
    } else if (_sum.inputs > 0 && _sum.outputs === 0) {
      result = {
        type: 'sent',
        amount: Number(_sum.inputs.toFixed(8)),
        address: isSelfSend.inputs && isSelfSend.outputs ? targetAddress : _addresses.outputs[0],
        timestamp: tx.timestamp,
        txid: tx.format.txid,
        confirmations: tx.confirmations,
        inputAddresses: _addresses.inputs,
        outputAddresses: _addresses.outputs
      };
    } else {
      // (?)
      result = {
        type: 'other',
        amount: 'unknown',
        address: 'unknown',
        timestamp: tx.timestamp,
        txid: tx.format.txid,
        confirmations: tx.confirmations
      };
    }

    return result;
  }

  return transactionType;
}();

module.exports = transactionType;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"utils.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/lib/agama-wallet-lib/build/utils.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';

var sort = function () {
  function sort(data, sortKey, desc) {
    if (!desc) {
      return data.sort(function (a, b) {
        if (a[sortKey] < b[sortKey]) {
          return -1;
        }

        if (a[sortKey] > b[sortKey]) {
          return 1;
        }

        return 0;
      });
    } else {
      return data.sort(function (b, a) {
        if (a[sortKey] < b[sortKey]) {
          return -1;
        }

        if (a[sortKey] > b[sortKey]) {
          return 1;
        }

        return 0;
      });
    }
  }

  return sort;
}();

var getRandomIntInclusive = function () {
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // the maximum is inclusive and the minimum is inclusive
  }

  return getRandomIntInclusive;
}();

var getRandomElectrumServer = function () {
  function getRandomElectrumServer(servers, excludeServer) {
    var randomServer = void 0;
    var _servers = [];

    for (var i = 0; i < servers.length; i++) {
      if (excludeServer !== servers[i]) {
        _servers.push(servers[i]);
      }
    } // pick a random server to communicate with


    if (_servers && _servers.length > 0) {
      var _randomServerId = getRandomIntInclusive(0, _servers.length - 1);

      var _randomServer = _servers[_randomServerId];

      var _serverDetails = _randomServer.split(':');

      if (_serverDetails.length === 3) {
        return {
          ip: _serverDetails[0],
          port: _serverDetails[1],
          proto: _serverDetails[2]
        };
      }
    } else {
      var _serverDetails2 = _servers[0].split(':');

      return {
        ip: _serverDetails2[0],
        port: _serverDetails2[1],
        proto: _serverDetails2[2]
      };
    }
  }

  return getRandomElectrumServer;
}();

var isNumber = function () {
  function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  return isNumber;
}();

var isPositiveNumber = function () {
  function isPositiveNumber(value) {
    return isNumber(value) && +value > 0;
  }

  return isPositiveNumber;
}(); // display rounding


var formatValue = function () {
  function formatValue(_formatValue) {
    var _valueToStr = _formatValue.toString();

    if (_valueToStr.indexOf('.') === -1) {
      return _formatValue;
    } else {
      if (_valueToStr) {
        var _decimal = _valueToStr.substr(_valueToStr.indexOf('.') + 1, _valueToStr.length);

        var newVal = _valueToStr.substr(0, _valueToStr.indexOf('.') + 1);

        for (var i = 0; i < _decimal.length; i++) {
          if (_decimal[i] === '0') {
            newVal = newVal + _decimal[i];
          } else {
            newVal = newVal + _decimal[i];
            break;
          }
        }

        return newVal;
      }
    }
  }

  return formatValue;
}();

var formatBytes = function () {
  function formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }

    var k = 1000;
    var dm = decimals + 1 || 3;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  return formatBytes;
}();

var estimateTxSize = function () {
  function estimateTxSize(numVins, numOuts) {
    // in x 180 + out x 34 + 10 plus or minus in
    return numVins * 180 + numOuts * 34 + 11;
  }

  return estimateTxSize;
}();

var maxSpendBalance = function () {
  function maxSpendBalance(utxoList, fee) {
    var maxSpendBalance = 0;

    for (var i = 0; i < utxoList.length; i++) {
      maxSpendBalance += Number(utxoList[i].value);
    }

    if (fee) {
      return Number(maxSpendBalance) - Number(fee);
    } else {
      return maxSpendBalance;
    }
  }

  return maxSpendBalance;
}();

var fromSats = function () {
  function fromSats(value) {
    return value * 0.00000001;
  }

  return fromSats;
}();

var toSats = function () {
  function toSats(value) {
    return Number(value).toFixed(8) * 100000000;
  }

  return toSats;
}();

module.exports = {
  formatValue: formatValue,
  formatBytes: formatBytes,
  sort: sort,
  getRandomIntInclusive: getRandomIntInclusive,
  getRandomElectrumServer: getRandomElectrumServer,
  estimateTxSize: estimateTxSize,
  maxSpendBalance: maxSpendBalance,
  fromSats: fromSats,
  toSats: toSats,
  isNumber: isNumber,
  isPositiveNumber: isPositiveNumber
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"react-toast":{"index.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/lib/react-toast/index.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';

var _interopRequireDefault2 = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault2(require("@babel/runtime/helpers/typeof"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastContainer = exports.ToastStore = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in meteorBabelHelpers.sanitizeForInObject(source)) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _templateObject = _taggedTemplateLiteral(['\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n'], ['\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  position: fixed;\n  overflow: hidden;\n  z-index: 9999;\n  max-height: calc(100vh - 10px);\n  text-align: right;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n'], ['\n  position: fixed;\n  overflow: hidden;\n  z-index: 9999;\n  max-height: calc(100vh - 10px);\n  text-align: right;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  font-family: \'Montserrat\', Helvetica, Arial, serif;\n  display: flex;\n  align-items: center;\n  text-align: center;\n  padding: 5px 15px;\n  white-space: pre-line;\n  min-height: 50px;\n  margin-bottom: 15px;\n  border-radius: 0px;\n  animation-name: ', ';\n  animation-duration: 1s;\n  animation-fill-mode: both;\n'], ['\n  font-family: \'Arial\';\n  display: flex;\n  align-items: center;\n  text-align: center;\n  padding: 5px 15px;\n  white-space: pre-line;\n  min-height: 50px;\n  margin-bottom: 15px;\n  border-radius: 0px;\n  animation-name: ', ';\n  animation-duration: 1s;\n  animation-fill-mode: both;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _watchableStores = require('watchable-stores');

var _watchableStores2 = _interopRequireDefault(_watchableStores);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((0, _typeof2.default)(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (0, _typeof2.default)(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var FadeInUp = (0, _styledComponents.keyframes)(_templateObject);

var Toasts = _styledComponents2.default.div(_templateObject2);

var Toast = _styledComponents2.default.div(_templateObject3, FadeInUp);

var BackgroundColor = {
  success: {
    backgroundColor: '#666666' // backgroundColor: "rgba(46, 204, 113, 1)"

  },
  info: {
    backgroundColor: '#666666' // backgroundColor: "rgba(236, 240, 241, 1)"

  },
  warning: {
    backgroundColor: '#666666' // backgroundColor: "rgba(241, 196, 15, 1)"

  },
  error: {
    backgroundColor: '#666666' // backgroundColor: "rgba(231, 76, 60, 1)"

  }
};
var LightBackgroundColor = {
  success: {
    color: '#468847',
    // backgroundColor: '#dff0d8',
    backgroundColor: '#666666' // borderColor: '#d6e9c6'

  },
  info: {
    color: '#3a87ad',
    backgroundColor: '#666666',
    // backgroundColor: '#d9edf7',
    borderColor: '#666666',
    // borderColor: '#bce8f1'
    borderRadius: 0
  },
  warning: {
    color: '#c09853',
    // backgroundColor: '#fcf8e3',
    backgroundColor: '#666666' // borderColor: '#fbeed5'

  },
  error: {
    color: '#b94a48',
    // backgroundColor: '#f2dede',
    backgroundColor: '#666666' // borderColor: '#eed3d7'

  }
};

var Store = function () {
  function Store() {
    var store = (0, _watchableStores2.default)({
      action: '',
      message: ''
    });
    ['success', 'info', 'warning', 'error'].forEach(function (status) {
      store[status] = function (message, timer, classNames) {
        store.data = {
          status: status,
          message: message,
          timer: timer,
          classNames: classNames
        };
      };
    });
    return store;
  }

  return Store;
}();

var Container = function (_Component) {
  _inherits(Container, _Component);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    _this.state = {
      styles: {},
      toasts: []
    };
    return _this;
  }

  _createClass(Container, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        var _this2 = this;

        this.storeSubscription = this.props.store.watch(function (data) {
          var toast = Object.assign({}, _extends({}, data, {
            id: Math.random()
          }));

          _this2.setState({
            toasts: [toast].concat(_this2.state.toasts)
          });

          setTimeout(function () {
            _this2.setState({
              toasts: _this2.state.toasts.filter(function (t) {
                return t.id !== toast.id;
              })
            });
          }, data.timer || 3000);
        });
        var styles = {};

        switch (this.props.position) {
          case Container.POSITION.TOP_LEFT:
            styles.top = 10;
            styles.left = 10;
            break;

          case Container.POSITION.TOP_RIGHT:
            styles.top = 10;
            styles.right = 10;
            break;

          case Container.POSITION.TOP_CENTER:
            styles.top = 10;
            styles.left = '50%';
            styles.transform = 'translateX(-50%)';
            break;

          case Container.POSITION.BOTTOM_LEFT:
            styles.bottom = 10;
            styles.left = 10;
            break;

          case Container.POSITION.BOTTOM_RIGHT:
            styles.bottom = 10;
            styles.right = 10;
            break;

          case Container.POSITION.BOTTOM_CENTER:
            styles.bottom = 10;
            styles.left = '50%';
            styles.transform = 'translateX(-50%)';
            break;

          default:
            styles.bottom = 10;
            styles.right = 10;
            break;
        }

        this.setState({
          styles: styles
        });
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentWillUnmount',
    value: function () {
      function componentWillUnmount() {
        this.props.store.unwatch(this.storeSubscription);
      }

      return componentWillUnmount;
    }()
  }, {
    key: '_renderContainer',
    value: function () {
      function _renderContainer() {
        var style = this.props.lightBackground ? LightBackgroundColor : BackgroundColor;
        return _react2.default.createElement(Toasts, {
          style: this.state.styles
        }, this.state.toasts.map(function (toast) {
          return _react2.default.createElement(Toast, {
            key: toast.id,
            className: 'toast toast-' + toast.status + ' ' + toast.classNames,
            style: style[toast.status]
          }, toast.message);
        }));
      }

      return _renderContainer;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        return _reactDom2.default.createPortal(this._renderContainer(), document.body);
      }

      return render;
    }()
  }]);

  return Container;
}(_react.Component);

Container.POSITION = {
  TOP_LEFT: "top_left",
  TOP_RIGHT: "top_right",
  BOTTOM_LEFT: "bottom_left",
  BOTTOM_RIGHT: "bottom_right",
  TOP_CENTER: "top_center",
  BOTTOM_CENTER: "bottom_center"
};
Container.propTypes = {
  store: _propTypes2.default.object.isRequired,
  position: _propTypes2.default.string
};
var ToastStore = exports.ToastStore = Store();
var ToastContainer = exports.ToastContainer = Container;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"actions":{"actions.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/actions/actions.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var Promise;
module.watch(require("meteor/promise"), {
  Promise: function (v) {
    Promise = v;
  }
}, 0);
var isKomodoCoin;
module.watch(require("./../lib/agama-wallet-lib/build/coin-helpers"), {
  isKomodoCoin: function (v) {
    isKomodoCoin = v;
  }
}, 1);
var getLocalStorageVar;
module.watch(require("./utils"), {
  getLocalStorageVar: function (v) {
    getLocalStorageVar = v;
  }
}, 2);
var wifToWif, seedToWif;
module.watch(require("./../lib/agama-wallet-lib/build/keys"), {
  wifToWif: function (v) {
    wifToWif = v;
  },
  seedToWif: function (v) {
    seedToWif = v;
  }
}, 3);
var proxyServers;
module.watch(require("./proxyServers"), {
  "default": function (v) {
    proxyServers = v;
  }
}, 4);
var electrumServers;
module.watch(require("./../conf/electrum-servers"), {
  "default": function (v) {
    electrumServers = v;
  }
}, 5);
var getKMDBalance;
module.watch(require("./getKMDBalance"), {
  "default": function (v) {
    getKMDBalance = v;
  }
}, 6);
var createtx;
module.watch(require("./createtx"), {
  "default": function (v) {
    createtx = v;
  }
}, 7);
var listtransactions;
module.watch(require("./listtransactions"), {
  "default": function (v) {
    listtransactions = v;
  }
}, 8);
var listunspent;
module.watch(require("./listunspent"), {
  "default": function (v) {
    listunspent = v;
  }
}, 9);
var fromSats, toSats, getRandomIntInclusive;
module.watch(require("./../lib/agama-wallet-lib/build/utils"), {
  fromSats: function (v) {
    fromSats = v;
  },
  toSats: function (v) {
    toSats = v;
  },
  getRandomIntInclusive: function (v) {
    getRandomIntInclusive = v;
  }
}, 10);
var electrumJSNetworks;
module.watch(require("./../lib/agama-wallet-lib/build/bitcoinjs-networks"), {
  "default": function (v) {
    electrumJSNetworks = v;
  }
}, 11);
var devlog;
module.watch(require("./dev"), {
  devlog: function (v) {
    devlog = v;
  }
}, 12);

var bs58check = require('bs58check');

var _cache = {}; // runtime cache wrapper functions

var getTransaction = function (txid, coin, httpParams) {
  return new Promise(function (resolve, reject) {
    if (!_cache[coin]) {
      _cache[coin] = {};
    }

    if (!_cache[coin].tx) {
      _cache[coin].tx = {};
    }

    if (!_cache[coin].tx[txid]) {
      devlog("raw input tx " + txid);
      HTTP.call('GET', httpParams.url, {
        params: httpParams.params
      }, function (error, result) {
        var _result = JSON.parse(result.content);

        if (_result.msg !== 'error') {
          _cache[coin].tx[txid] = result;
        }

        resolve(result);
      });
    } else {
      devlog("cached raw input tx " + txid);
      resolve(_cache[coin].tx[txid]);
    }
  });
};

var getBlockheader = function (height, coin, httpParams) {
  return new Promise(function (resolve, reject) {
    if (!_cache[coin]) {
      _cache[coin] = {};
    }

    if (!_cache[coin].blockheader) {
      _cache[coin].blockheader = {};
    }

    if (!_cache[coin].blockheader[height]) {
      devlog("blockheader " + height);
      HTTP.call('GET', httpParams.url, {
        params: httpParams.params
      }, function (error, result) {
        var _result = JSON.parse(result.content);

        if (_result.msg !== 'error') {
          _cache[coin].blockheader[height] = result;
        }

        resolve(result);
      });
    } else {
      devlog("cached blockheader " + height);
      resolve(_cache[coin].blockheader[height]);
    }
  });
};

var cache = {
  getTransaction: getTransaction,
  getBlockheader: getBlockheader
};
var electrumKeys = {};
var proxyServer = {}; // pick a random proxy server

var _getAnotherProxy = function () {
  var _randomServer = proxyServers[getRandomIntInclusive(0, proxyServers.length - 1)];
  proxyServer = {
    ip: _randomServer.ip,
    port: _randomServer.port
  };
  devlog("proxy " + proxyServer.ip + ":" + proxyServer.port);
};

var getAnotherProxy = function () {
  return function () {
    function _callee(dispatch) {
      return _regenerator.default.async(function () {
        function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _getAnotherProxy();

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }

        return _callee$;
      }(), null, this);
    }

    return _callee;
  }();
};

_getAnotherProxy();

var getServersList = function () {
  return function () {
    function _callee2(dispatch) {
      return _regenerator.default.async(function () {
        function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  resolve(electrumServers);
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }

        return _callee2$;
      }(), null, this);
    }

    return _callee2;
  }();
};

var setDefaultServer = function (network, port, ip, proto) {
  return function () {
    function _callee3(dispatch) {
      return _regenerator.default.async(function () {
        function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new Promise(function (resolve, reject) {
                  // HTTP.call('GET', `http://${proxyServer.ip}:${proxyServer.port}/api/server/version`, {
                  HTTP.call('GET', "https://" + proxyServer.ip + "/api/server/version", {
                    params: {
                      port: port,
                      ip: ip,
                      proto: proto
                    }
                  }, function (error, result) {
                    result = JSON.parse(result.content);

                    if (result.msg === 'error') {
                      resolve('error');
                    } else {
                      electrumServers[network].port = port;
                      electrumServers[network].ip = ip;
                      electrumServers[network].proto = proto;
                      resolve(true);
                    }
                  });
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }

        return _callee3$;
      }(), null, this);
    }

    return _callee3;
  }();
};

var clearKeys = function () {
  return function () {
    function _callee4(dispatch) {
      return _regenerator.default.async(function () {
        function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", new Promise(function (resolve, reject) {
                  electrumKeys = {};
                  resolve(true);
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }

        return _callee4$;
      }(), null, this);
    }

    return _callee4;
  }();
};

var sendtx = function (network, outputAddress, value, verify, push, btcFee) {
  return function () {
    function _callee5(dispatch) {
      return _regenerator.default.async(function () {
        function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", new Promise(function (resolve, reject) {
                  var changeAddress = electrumKeys[network].pub;
                  var _electrumServer = getLocalStorageVar('coins')[network].server;
                  _electrumServer.serverList = electrumServers[network].serverList;
                  console.log(">>>>>>>> 1", network);
                  console.log(">>>>>>>> 2", outputAddress);
                  console.log(">>>>>>>> 3", value);
                  console.log(">>>>>>>> 4", verify);
                  console.log(">>>>>>>> 5", push);
                  console.log(">>>>>>>> 6", btcFee);
                  console.log(">>>>>>>> 7", electrumServers);
                  console.log(">>>>>>>> 8", _electrumServer);
                  devlog("sendtx " + network);
                  var fee = {
                    perbyte: false,
                    value: 0
                  };

                  if (btcFee) {
                    fee.perbyte = true;
                    fee.value = btcFee;
                  } else {
                    v = isKomodoCoin(network) ? electrumServers.kmd.txfee : electrumServers[network].txfee;

                    if (v) {
                      fee.value = v;
                    }
                  } // console.log(">>>>>>>> RESULT", fee, fee.value, value);


                  createtx(proxyServer, _electrumServer, outputAddress, changeAddress, value, fee, electrumKeys[network].priv, network, verify, push, cache).then(function (res) {
                    resolve(res);
                  });
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }

        return _callee5$;
      }(), null, this);
    }

    return _callee5;
  }();
};

var transactions = function (network) {
  return function () {
    function _callee6(dispatch) {
      return _regenerator.default.async(function () {
        function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", new Promise(function (resolve, reject) {
                  var _electrumServer = getLocalStorageVar('coins')[network].server;
                  _electrumServer.serverList = electrumServers[network].serverList;
                  console.log("!!!!!!!!!!!!!!", network);
                  console.log("!!!!!!!!!!!!!!", electrumServers);
                  console.log("!!!!!!!!!!!!!!", _electrumServer, _electrumServer.serverList);
                  listtransactions(proxyServer, _electrumServer, electrumKeys[network].pub, network, true, cache).then(function (res) {
                    resolve(res);
                  });
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }

        return _callee6$;
      }(), null, this);
    }

    return _callee6;
  }();
};

var balance = function (network) {
  return function () {
    function _callee7(dispatch) {
      var address, _electrumServer;

      return _regenerator.default.async(function () {
        function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                address = electrumKeys[network].pub;
                _electrumServer = getLocalStorageVar('coins')[network].server;
                _electrumServer.serverList = electrumServers[network].serverList;
                return _context7.abrupt("return", new Promise(function (resolve, reject) {
                  // HTTP.call('GET', `http://${proxyServer.ip}:${proxyServer.port}/api/getbalance`, {
                  HTTP.call('GET', "https://" + proxyServer.ip + "/api/getbalance", {
                    params: {
                      port: _electrumServer.port,
                      ip: _electrumServer.ip,
                      proto: _electrumServer.proto,
                      address: address
                    }
                  }, function (error, result) {
                    if (!result) {
                      resolve('proxy-error');
                    } else {
                      if (network === 'kmd') {
                        getKMDBalance(address, JSON.parse(result.content).result, proxyServer, _electrumServer, cache).then(function (res) {
                          console.log(">> ballance result IF kmd:", res);
                          resolve(res);
                        });
                      } else {
                        var _balance = JSON.parse(result.content).result;
                        console.log(">> ballance result ELSE:", _balance);
                        resolve({
                          balance: Number(fromSats(_balance.confirmed).toFixed(8)),
                          unconfirmed: Number(fromSats(_balance.unconfirmed).toFixed(8))
                        });
                      }
                    }
                  });
                }));

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }

        return _callee7$;
      }(), null, this);
    }

    return _callee7;
  }();
};

var kmdUnspents = function () {
  return function () {
    function _callee8(dispatch) {
      var _electrumServer;

      return _regenerator.default.async(function () {
        function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _electrumServer = getLocalStorageVar('coins').kmd.server;
                _electrumServer.serverList = electrumServers.kmd.serverList;
                console.log(">>>>>>>>", network);
                console.log(">>>>>>>>", electrumServers);
                console.log(">>>>>>>>", _electrumServer);
                return _context8.abrupt("return", new Promise(function (resolve, reject) {
                  listunspent(proxyServer, _electrumServer, electrumKeys.kmd.pub, 'kmd', true, true, cache).then(function (res) {
                    resolve(res);
                  });
                }));

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }

        return _callee8$;
      }(), null, this);
    }

    return _callee8;
  }();
};

var auth = function (seed, coins) {
  return function () {
    function _callee9(dispatch) {
      return _regenerator.default.async(function () {
        function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", new Promise(function (resolve, reject) {
                  var _pubKeys = {};

                  for (var key in meteorBabelHelpers.sanitizeForInObject(coins)) {
                    var isWif = false;

                    var _seedToWif = void 0;

                    try {
                      bs58check.decode(seed);
                      isWif = true;
                    } catch (e) {}

                    if (isWif) {
                      _seedToWif = wifToWif(seed, isKomodoCoin(key) ? electrumJSNetworks.kmd : electrumJSNetworks[key.toLowerCase()]);
                    } else {
                      _seedToWif = seedToWif(seed, isKomodoCoin(key) ? electrumJSNetworks.kmd : electrumJSNetworks[key.toLowerCase()], true);
                    }

                    electrumKeys[key] = _seedToWif;
                    _pubKeys[key] = _seedToWif.pub;
                  } // console.warn(electrumKeys);


                  resolve(_pubKeys);
                }));

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }

        return _callee9$;
      }(), null, this);
    }

    return _callee9;
  }();
};

var addKeyPair = function (coin) {
  return function () {
    function _callee10(dispatch) {
      return _regenerator.default.async(function () {
        function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                return _context10.abrupt("return", new Promise(function (resolve, reject) {
                  var _wif = electrumKeys[Object.keys(electrumKeys)[0]].priv;
                  var _pubKeys = {};

                  var _wifToWif = wifToWif(_wif, isKomodoCoin(coin) ? electrumJSNetworks.kmd : electrumJSNetworks[coin]);

                  electrumKeys[coin] = _wifToWif;
                  _pubKeys[coin] = _wifToWif.pub; // console.warn(electrumKeys[coin]);

                  resolve(_pubKeys[coin]);
                }));

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }

        return _callee10$;
      }(), null, this);
    }

    return _callee10;
  }();
};

var getOverview = function (coins) {
  return function () {
    function _callee11(dispatch) {
      return _regenerator.default.async(function () {
        function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", new Promise(function (resolve, reject) {
                  var _keys = [];

                  for (var key in meteorBabelHelpers.sanitizeForInObject(coins)) {
                    _keys.push({
                      pub: electrumKeys[key].pub,
                      coin: key
                    });
                  }

                  Promise.all(_keys.map(function (pair, index) {
                    return new Promise(function (resolve, reject) {
                      var _electrumServer = getLocalStorageVar('coins')[pair.coin].server;
                      HTTP.call('GET', "https://" + proxyServer.ip + "/api/getbalance", {
                        params: {
                          port: _electrumServer.port,
                          ip: _electrumServer.ip,
                          proto: _electrumServer.proto,
                          address: pair.pub
                        }
                      }, function (error, result) {
                        if (!result) {
                          resolve('proxy-error');
                        } else {
                          var _balance = JSON.parse(result.content).result;
                          resolve({
                            coin: pair.coin,
                            pub: pair.pub,
                            balance: Number(fromSats(_balance.confirmed).toFixed(8)),
                            unconfirmed: Number(fromSats(_balance.unconfirmed).toFixed(8))
                          });
                        }
                      });
                    });
                  })).then(function (promiseResult) {
                    var _pricesUrl = ['https://www.atomicexplorer.com/api/rates/kmd', 'https://www.atomicexplorer.com/api/mm/prices'];
                    Promise.all(_pricesUrl.map(function (url, index) {
                      return new Promise(function (resolve, reject) {
                        HTTP.call('GET', url, {}, function (error, result) {
                          if (!result) {
                            resolve('prices-error');
                          } else {
                            var _prices = JSON.parse(result.content).result;
                            resolve(_prices);
                          }
                        });
                      });
                    })).then(function (pricesResult) {
                      console.log("-- pricing fetch result: ", promiseResult);

                      if (pricesResult[0] === 'prices-error') {
                        resolve('error');
                      } else {
                        var _kmdRates = {
                          BTC: 0,
                          USD: 0
                        };

                        if (pricesResult[0].BTC && pricesResult[0].USD) {
                          _kmdRates.BTC = pricesResult[0].BTC;
                          _kmdRates.USD = pricesResult[0].USD;
                        }

                        var _overviewItems = [];

                        for (var i = 0; i < promiseResult.length; i++) {
                          var _coinKMDPrice = 0;
                          var _usdPricePerItem = 0;

                          if (pricesResult[1][promiseResult[i].coin.toUpperCase() + "/KMD"]) {
                            _coinKMDPrice = pricesResult[1][promiseResult[i].coin.toUpperCase() + "/KMD"].low;
                          } else if (promiseResult[i].coin === 'kmd') {
                            _coinKMDPrice = 1;
                          }

                          if (!promiseResult[i].balance) {
                            promiseResult[i].balance = 0;
                          }

                          _overviewItems.push({
                            coin: promiseResult[i].coin,
                            balanceNative: promiseResult[i].balance,
                            balanceKMD: promiseResult[i].balance * _coinKMDPrice,
                            balanceBTC: promiseResult[i].balance * _kmdRates.BTC,
                            balanceUSD: promiseResult[i].balance * _coinKMDPrice * _kmdRates.USD,
                            usdPricePerItem: _coinKMDPrice * _kmdRates.USD
                          });
                        }

                        resolve(_overviewItems);
                      }
                    });
                  });
                }));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }

        return _callee11$;
      }(), null, this);
    }

    return _callee11;
  }();
};

var getBtcFees = function () {
  return function () {
    function _callee12(dispatch) {
      return _regenerator.default.async(function () {
        function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt("return", new Promise(function (resolve, reject) {
                  HTTP.call('GET', "https://www.atomicexplorer.com/api/btc/fees", {
                    params: {}
                  }, function (error, result) {
                    if (!result) {
                      resolve('error');
                    } else {
                      var _btcFees = JSON.parse(result.content).result;
                      devlog('btc fees');
                      devlog(_btcFees);

                      if (_btcFees.recommended && _btcFees.recommended.fastestFee, _btcFees.recommended.halfHourFee, _btcFees.recommended.hourFee) {
                        resolve(_btcFees.recommended);
                      } else {
                        resolve('error');
                      }
                    }
                  });
                }));

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }

        return _callee12$;
      }(), null, this);
    }

    return _callee12;
  }();
};

module.exportDefault({
  auth: auth,
  getOverview: getOverview,
  clearKeys: clearKeys,
  balance: balance,
  transactions: transactions,
  sendtx: sendtx,
  getServersList: getServersList,
  setDefaultServer: setDefaultServer,
  addKeyPair: addKeyPair,
  kmdUnspents: kmdUnspents,
  getBtcFees: getBtcFees,
  getAnotherProxy: getAnotherProxy
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"createtx.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/actions/createtx.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Promise;
module.watch(require("meteor/promise"), {
  Promise: function (v) {
    Promise = v;
  }
}, 0);
var devlog;
module.watch(require("./dev"), {
  devlog: function (v) {
    devlog = v;
  }
}, 1);
var listunspent;
module.watch(require("./listunspent"), {
  "default": function (v) {
    listunspent = v;
  }
}, 2);
var isKomodoCoin;
module.watch(require("./../lib/agama-wallet-lib/build/coin-helpers"), {
  isKomodoCoin: function (v) {
    isKomodoCoin = v;
  }
}, 3);
var electrumServers;
module.watch(require("./../conf/electrum-servers"), {
  "default": function (v) {
    electrumServers = v;
  }
}, 4);
var electrumJSNetworks;
module.watch(require("./../lib/agama-wallet-lib/build/bitcoinjs-networks"), {
  "default": function (v) {
    electrumJSNetworks = v;
  }
}, 5);
var transactionBuilder;
module.watch(require("./../lib/agama-wallet-lib/build/transaction-builder"), {
  "default": function (v) {
    transactionBuilder = v;
  }
}, 6);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 7);
var CONNECTION_ERROR_OR_INCOMPLETE_DATA = 'connection error or incomplete data';

var createtx = function (proxyServer, electrumServer, outputAddress, changeAddress, value, fee, wif, network, verify, push, cache) {
  devlog('createrawtx =>');
  return new Promise(function (resolve, reject) {
    listunspent(proxyServer, electrumServer, changeAddress, network, true, verify, cache).then(function (utxoList) {
      if (utxoList && utxoList.length) {
        var networkName = isKomodoCoin(network) ? 'kmd' : network;
        var _network = electrumJSNetworks[networkName]; // console.log(networkName, _network)

        var _data = transactionBuilder.data(_network, value, fee, outputAddress, changeAddress, utxoList);

        devlog('send data', _data);

        if (_data.balance) {
          if (!push) {
            resolve({
              msg: 'success',
              result: _data
            });
          }
        } else {
          resolve({
            msg: 'error',
            result: _data
          });
        }

        var _tx = transactionBuilder.transaction(outputAddress, changeAddress, wif, _network, _data.inputs, _data.change, _data.value); // push to network


        if (push) {
          // HTTP.call('POST', `http://${proxyServer.ip}:${proxyServer.port}/api/pushtx`, {
          HTTP.call('POST', "https://" + proxyServer.ip + "/api/pushtx", {
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              rawtx: _tx,
              port: electrumServer.port,
              ip: electrumServer.ip,
              proto: electrumServer.proto
            }
          }, function (error, result) {
            result = JSON.parse(result.content);

            if (result.msg === 'error') {
              resolve({
                msg: 'error',
                result: translate('API.CON_ERROR')
              });
            } else {
              var txid = result.result;
              _data.raw = _tx;
              _data.txid = txid;
              _data.utxoSet = utxoList;

              if (txid && txid.indexOf('bad-txns-inputs-spent') > -1) {
                var successObj = {
                  msg: 'error',
                  result: translate('API.BAD_TX_INPUTS_SPENT_ERR'),
                  raw: _data
                };
                resolve(successObj);
              } else {
                if (txid && txid.length === 64) {
                  if (txid.indexOf('bad-txns-in-belowout') > -1) {
                    var _successObj = {
                      msg: 'error',
                      result: translate('API.BAD_TX_INPUTS_SPENT_ERR'),
                      raw: _data
                    };
                    resolve(_successObj);
                  } else {
                    var _successObj2 = {
                      msg: 'success',
                      result: _data
                    };
                    resolve(_successObj2);
                  }
                } else {
                  if (txid && txid.indexOf('bad-txns-in-belowout') > -1) {
                    var _successObj3 = {
                      msg: 'error',
                      result: translate('API.BAD_TX_INPUTS_SPENT_ERR'),
                      raw: _data
                    };
                    resolve(_successObj3);
                  } else {
                    var _successObj4 = {
                      msg: 'error',
                      result: translate('API.CANT_BROADCAST_TX_ERR'),
                      raw: _data
                    };
                    resolve(_successObj4);
                  }
                }
              }
            }
          });
        }
      } else {
        resolve({
          msg: 'error',
          result: translate('API.NO_UTXO_ERR')
        });
      }
    });
  });
};

module.exportDefault(createtx);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dev.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/actions/dev.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  config: function () {
    return config;
  },
  devlog: function () {
    return devlog;
  }
});
var config = {
  dev: true
};

var devlog = function (msg, data) {
  if (config.dev) {
    if (data) {
      console.warn(msg, data);
    } else {
      console.warn(msg);
    }
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"getKMDBalance.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/actions/getKMDBalance.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  getKMDBalance: function () {
    return getKMDBalance;
  }
});
var Promise;
module.watch(require("meteor/promise"), {
  Promise: function (v) {
    Promise = v;
  }
}, 0);
var devlog;
module.watch(require("./dev"), {
  devlog: function (v) {
    devlog = v;
  }
}, 1);
var kmdCalcInterest;
module.watch(require("./../lib/agama-wallet-lib/build/komodo-interest"), {
  "default": function (v) {
    kmdCalcInterest = v;
  }
}, 2);
var fromSats, toSats;
module.watch(require("./../lib/agama-wallet-lib/build/utils"), {
  fromSats: function (v) {
    fromSats = v;
  },
  toSats: function (v) {
    toSats = v;
  }
}, 3);
var electrumJSNetworks;
module.watch(require("./../lib/agama-wallet-lib/build/bitcoinjs-networks"), {
  "default": function (v) {
    electrumJSNetworks = v;
  }
}, 4);
var electrumJSTxDecoder;
module.watch(require("./../lib/agama-wallet-lib/build/transaction-decoder"), {
  "default": function (v) {
    electrumJSTxDecoder = v;
  }
}, 5);
var CONNECTION_ERROR_OR_INCOMPLETE_DATA = 'connection error or incomplete data';

var getKMDBalance = function (address, json, proxyServer, electrumServer, cache) {
  return new Promise(function (resolve, reject) {
    // HTTP.call('GET', `http://${proxyServer.ip}:${proxyServer.port}/api/listunspent`, {
    HTTP.call('GET', "https://" + proxyServer.ip + "/api/listunspent", {
      params: {
        port: electrumServer.port,
        ip: electrumServer.ip,
        proto: electrumServer.proto,
        address: address
      }
    }, function (error, result) {
      result = JSON.parse(result.content);

      if (result.msg === 'error') {
        resolve('error');
      } else {
        var utxoList = result.result;

        if (utxoList && utxoList.length) {
          // filter out < 10 KMD amounts
          var _utxo = [];

          for (var i = 0; i < utxoList.length; i++) {
            devlog("utxo " + utxoList[i]['tx_hash'] + " sats " + utxoList[i].value + " value " + Number(fromSats(utxoList[i].value)));

            if (Number(fromSats(utxoList[i].value)) >= 10) {
              _utxo.push(utxoList[i]);
            }
          }

          devlog('filtered utxo list =>');
          devlog(_utxo);

          if (_utxo && _utxo.length) {
            var interestTotal = 0;
            Promise.all(_utxo.map(function (_utxoItem, index) {
              return new Promise(function (resolve, reject) {
                cache.getTransaction(_utxoItem['tx_hash'], 'kmd', {
                  // url: `http://${proxyServer.ip}:${proxyServer.port}/api/gettransaction`,
                  url: "https://" + proxyServer.ip + "/api/gettransaction",
                  params: {
                    port: electrumServer.port,
                    ip: electrumServer.ip,
                    proto: electrumServer.proto,
                    txid: _utxoItem['tx_hash']
                  }
                }).then(function (result) {
                  devlog('gettransaction =>');
                  devlog(result);
                  result = JSON.parse(result.content);

                  if (result.msg !== 'error') {
                    var _rawtxJSON = result.result;
                    devlog('electrum gettransaction ==>');
                    devlog(index + " | " + (_rawtxJSON.length - 1));
                    devlog(_rawtxJSON); // decode tx

                    var _network = electrumJSNetworks.kmd;
                    var decodedTx = electrumJSTxDecoder(_rawtxJSON, _network);

                    if (decodedTx && decodedTx.format && decodedTx.format.locktime > 0) {
                      interestTotal += Number(kmdCalcInterest(decodedTx.format.locktime, _utxoItem.value, _utxoItem.height));
                    }

                    devlog('decoded tx =>');
                    devlog(decodedTx);
                    resolve(true);
                  }
                });
              });
            })).then(function (promiseResult) {
              resolve({
                balance: Number(fromSats(json.confirmed).toFixed(8)),
                unconfirmed: Number(fromSats(json.unconfirmed).toFixed(8)),
                unconfirmedSats: json.unconfirmed,
                balanceSats: json.confirmed,
                interest: Number(interestTotal.toFixed(8)),
                interestSats: Math.floor(toSats(interestTotal)),
                total: interestTotal > 0 ? Number((fromSats(json.confirmed) + interestTotal).toFixed(8)) : 0,
                totalSats: interestTotal > 0 ? json.confirmed + Math.floor(toSats(interestTotal)) : 0
              });
            });
          } else {
            resolve({
              balance: Number(fromSats(json.confirmed).toFixed(8)),
              unconfirmed: Number(fromSats(json.unconfirmed).toFixed(8)),
              unconfirmedSats: json.unconfirmed,
              balanceSats: json.confirmed,
              interest: 0,
              interestSats: 0,
              total: 0,
              totalSats: 0
            });
          }
        } else {
          resolve({
            balance: Number(fromSats(json.confirmed).toFixed(8)),
            unconfirmed: Number(fromSats(json.unconfirmed).toFixed(8)),
            unconfirmedSats: json.unconfirmed,
            balanceSats: json.confirmed,
            interest: 0,
            interestSats: 0,
            total: 0,
            totalSats: 0
          });
        }
      }
    });
  });
};

module.exportDefault(getKMDBalance);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"listtransactions.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/actions/listtransactions.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Promise;
module.watch(require("meteor/promise"), {
  Promise: function (v) {
    Promise = v;
  }
}, 0);
var devlog;
module.watch(require("./dev"), {
  devlog: function (v) {
    devlog = v;
  }
}, 1);
var isKomodoCoin;
module.watch(require("./../lib/agama-wallet-lib/build/coin-helpers"), {
  isKomodoCoin: function (v) {
    isKomodoCoin = v;
  }
}, 2);
var parseTransactionAddresses;
module.watch(require("./../lib/agama-wallet-lib/build/transaction-type"), {
  "default": function (v) {
    parseTransactionAddresses = v;
  }
}, 3);
var electrumJSNetworks;
module.watch(require("./../lib/agama-wallet-lib/build/bitcoinjs-networks"), {
  "default": function (v) {
    electrumJSNetworks = v;
  }
}, 4);
var electrumJSTxDecoder;
module.watch(require("./../lib/agama-wallet-lib/build/transaction-decoder"), {
  "default": function (v) {
    electrumJSTxDecoder = v;
  }
}, 5);
var CONNECTION_ERROR_OR_INCOMPLETE_DATA = 'connection error or incomplete data';

var listtransactions = function (proxyServer, electrumServer, address, network, full, cache) {
  console.log("list transactions: ", electrumServer); // server = electrumServer.serverList[0].split(':');
  // electrumServer.ip

  return new Promise(function (resolve, reject) {
    // get current height
    // HTTP.call('GET', `http://${proxyServer.ip}:${proxyServer.port}/api/getcurrentblock`, {
    HTTP.call('GET', "https://" + proxyServer.ip + "/api/getcurrentblock", {
      params: {
        port: electrumServer.port,
        ip: electrumServer.ip,
        proto: electrumServer.proto
      }
    }, function (error, result) {
      result = JSON.parse(result.content);

      if (result.msg === 'error') {
        resolve('error');
      } else {
        var currentHeight = result.result;
        devlog('currentHeight =>');
        devlog(currentHeight); // HTTP.call('GET', `http://${proxyServer.ip}:${proxyServer.port}/api/listtransactions`, {

        HTTP.call('GET', "https://" + proxyServer.ip + "/api/listtransactions", {
          params: {
            port: electrumServer.port,
            ip: electrumServer.ip,
            proto: electrumServer.proto,
            address: address,
            raw: true // maxlength: 2,

          }
        }, function (error, result) {
          result = JSON.parse(result.content);

          if (result.msg !== 'error') {
            var _transactions = []; // parse listtransactions

            var json = result.result;

            if (json && json.length) {
              var _rawtx = [];
              Promise.all(json.map(function (transaction, index) {
                return new Promise(function (resolve, reject) {
                  cache.getBlockheader(transaction.height, network, {
                    // url: `http://${proxyServer.ip}:${proxyServer.port}/api/getblockinfo`,
                    url: "https://" + proxyServer.ip + "/api/getblockinfo",
                    params: {
                      port: electrumServer.port,
                      ip: electrumServer.ip,
                      proto: electrumServer.proto,
                      height: transaction.height
                    }
                  }).then(function (result) {
                    devlog('getblock =>');
                    devlog(result);
                    result = JSON.parse(result.content);

                    if (result.msg !== 'error') {
                      var blockInfo = result.result;
                      devlog('electrum gettransaction ==>');
                      devlog(index + " | " + (transaction.raw.length - 1));
                      devlog(transaction.raw); // decode tx

                      var _network = electrumJSNetworks[isKomodoCoin(network) || network === 'kmd' ? 'kmd' : network];
                      var decodedTx = electrumJSTxDecoder(transaction.raw, _network);
                      var txInputs = [];
                      devlog('decodedtx =>');
                      devlog(decodedTx.outputs);

                      if (decodedTx && decodedTx.inputs) {
                        Promise.all(decodedTx.inputs.map(function (_decodedInput, index) {
                          return new Promise(function (_resolve, _reject) {
                            if (_decodedInput.txid !== '0000000000000000000000000000000000000000000000000000000000000000') {
                              cache.getTransaction(_decodedInput.txid, network, {
                                // url: `http://${proxyServer.ip}:${proxyServer.port}/api/gettransaction`,
                                url: "https://" + proxyServer.ip + "/api/gettransaction",
                                params: {
                                  port: electrumServer.port,
                                  ip: electrumServer.ip,
                                  proto: electrumServer.proto,
                                  txid: _decodedInput.txid
                                }
                              }).then(function (result) {
                                devlog('gettransaction =>');
                                devlog(result);
                                result = JSON.parse(result.content);

                                if (result.msg !== 'error') {
                                  var decodedVinVout = electrumJSTxDecoder(result.result, _network);
                                  devlog('electrum raw input tx ==>');

                                  if (decodedVinVout) {
                                    devlog(decodedVinVout.outputs[_decodedInput.n], true);
                                    txInputs.push(decodedVinVout.outputs[_decodedInput.n]);

                                    _resolve(true);
                                  } else {
                                    _resolve(true);
                                  }
                                }
                              });
                            } else {
                              _resolve(true);
                            }
                          });
                        })).then(function (promiseResult) {
                          var _parsedTx = {
                            network: decodedTx.network,
                            format: decodedTx.format,
                            inputs: txInputs,
                            outputs: decodedTx.outputs,
                            height: transaction.height,
                            timestamp: Number(transaction.height) === 0 ? Math.floor(Date.now() / 1000) : blockInfo.timestamp,
                            confirmations: Number(transaction.height) === 0 ? 0 : currentHeight - transaction.height
                          };
                          var formattedTx = parseTransactionAddresses(_parsedTx, address, network === 'kmd' ? true : false);

                          if (formattedTx.type) {
                            formattedTx.height = transaction.height;
                            formattedTx.blocktime = blockInfo.timestamp;
                            formattedTx.timereceived = blockInfo.timereceived;
                            formattedTx.hex = transaction.raw;
                            formattedTx.inputs = decodedTx.inputs;
                            formattedTx.outputs = decodedTx.outputs;
                            formattedTx.locktime = decodedTx.format.locktime;

                            _rawtx.push(formattedTx);
                          } else {
                            formattedTx[0].height = transaction.height;
                            formattedTx[0].blocktime = blockInfo.timestamp;
                            formattedTx[0].timereceived = blockInfo.timereceived;
                            formattedTx[0].hex = transaction.raw;
                            formattedTx[0].inputs = decodedTx.inputs;
                            formattedTx[0].outputs = decodedTx.outputs;
                            formattedTx[0].locktime = decodedTx.format.locktime;
                            formattedTx[1].height = transaction.height;
                            formattedTx[1].blocktime = blockInfo.timestamp;
                            formattedTx[1].timereceived = blockInfo.timereceived;
                            formattedTx[1].hex = transaction.raw;
                            formattedTx[1].inputs = decodedTx.inputs;
                            formattedTx[1].outputs = decodedTx.outputs;
                            formattedTx[1].locktime = decodedTx.format.locktime;

                            _rawtx.push(formattedTx[0]);

                            _rawtx.push(formattedTx[1]);
                          }

                          resolve(true);
                        });
                      } else {
                        var _parsedTx = {
                          network: decodedTx.network,
                          format: 'cant parse',
                          inputs: 'cant parse',
                          outputs: 'cant parse',
                          height: transaction.height,
                          timestamp: Number(transaction.height) === 0 ? Math.floor(Date.now() / 1000) : blockInfo.timestamp,
                          confirmations: Number(transaction.height) === 0 ? 0 : currentHeight - transaction.height
                        };
                        var formattedTx = parseTransactionAddresses(_parsedTx, address, network === 'kmd' ? true : false);

                        _rawtx.push(formattedTx);

                        resolve(true);
                      }
                    } else {
                      var _parsedTx2 = {
                        network: 'cant parse',
                        format: 'cant parse',
                        inputs: 'cant parse',
                        outputs: 'cant parse',
                        height: transaction.height,
                        timestamp: 'cant get block info',
                        confirmations: Number(transaction.height) === 0 ? 0 : currentHeight - transaction.height
                      };

                      var _formattedTx = parseTransactionAddresses(_parsedTx2, address, network === 'kmd' ? true : false);

                      _rawtx.push(_formattedTx);

                      resolve(true);
                    }
                  });
                });
              })).then(function (promiseResult) {
                resolve(_rawtx);
              });
            } else {
              // empty history
              resolve([]);
            }
          } else {
            resolve('error');
          }

          devlog(result);
        });
      }
    });
  });
};

module.exportDefault(listtransactions);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"listunspent.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/actions/listunspent.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Promise;
module.watch(require("meteor/promise"), {
  Promise: function (v) {
    Promise = v;
  }
}, 0);
var devlog;
module.watch(require("./dev"), {
  devlog: function (v) {
    devlog = v;
  }
}, 1);
var kmdCalcInterest;
module.watch(require("./../lib/agama-wallet-lib/build/komodo-interest"), {
  "default": function (v) {
    kmdCalcInterest = v;
  }
}, 2);
var isKomodoCoin;
module.watch(require("./../lib/agama-wallet-lib/build/coin-helpers"), {
  isKomodoCoin: function (v) {
    isKomodoCoin = v;
  }
}, 3);
var verifyMerkleByCoin;
module.watch(require("./merkle"), {
  "default": function (v) {
    verifyMerkleByCoin = v;
  }
}, 4);
var fromSats, toSats;
module.watch(require("./../lib/agama-wallet-lib/build/utils"), {
  fromSats: function (v) {
    fromSats = v;
  },
  toSats: function (v) {
    toSats = v;
  }
}, 5);
var electrumJSNetworks;
module.watch(require("./../lib/agama-wallet-lib/build/bitcoinjs-networks"), {
  "default": function (v) {
    electrumJSNetworks = v;
  }
}, 6);
var electrumJSTxDecoder;
module.watch(require("./../lib/agama-wallet-lib/build/transaction-decoder"), {
  "default": function (v) {
    electrumJSTxDecoder = v;
  }
}, 7);
var CONNECTION_ERROR_OR_INCOMPLETE_DATA = 'connection error or incomplete data';

var listunspent = function (proxyServer, electrumServer, address, network, full, verify, cache) {
  var _atLeastOneDecodeTxFailed = false;

  if (full) {
    return new Promise(function (resolve, reject) {
      // HTTP.call('GET', `http://${proxyServer.ip}:${proxyServer.port}/api/listunspent`, {
      HTTP.call('GET', "https://" + proxyServer.ip + "/api/listunspent", {
        params: {
          port: electrumServer.port,
          ip: electrumServer.ip,
          proto: electrumServer.proto,
          address: address
        }
      }, function (error, result) {
        result = JSON.parse(result.content);

        if (result.msg === 'error') {
          resolve('error');
        } else {
          var _utxoJSON = result.result;

          if (_utxoJSON && _utxoJSON.length) {
            var formattedUtxoList = [];
            var _utxo = []; // get current height
            // HTTP.call('GET', `http://${proxyServer.ip}:${proxyServer.port}/api/getcurrentblock`, {

            HTTP.call('GET', "https://" + proxyServer.ip + "/api/getcurrentblock", {
              params: {
                port: electrumServer.port,
                ip: electrumServer.ip,
                proto: electrumServer.proto
              }
            }, function (error, result) {
              result = JSON.parse(result.content);

              if (result.msg === 'error') {
                resolve('cant get current height');
              } else {
                var currentHeight = result.result;

                if (currentHeight && Number(currentHeight) > 0) {
                  // filter out unconfirmed utxos
                  for (var i = 0; i < _utxoJSON.length; i++) {
                    if (Number(currentHeight) - Number(_utxoJSON[i].height) !== 0) {
                      _utxo.push(_utxoJSON[i]);
                    }
                  }

                  if (!_utxo.length) {
                    // no confirmed utxo
                    resolve('no valid utxo');
                  } else {
                    Promise.all(_utxo.map(function (_utxoItem, index) {
                      return new Promise(function (resolve, reject) {
                        cache.getTransaction(_utxoItem['tx_hash'], network, {
                          // url: `http://${proxyServer.ip}:${proxyServer.port}/api/gettransaction`,
                          url: "https://" + proxyServer.ip + "/api/gettransaction",
                          params: {
                            port: electrumServer.port,
                            ip: electrumServer.ip,
                            proto: electrumServer.proto,
                            txid: _utxoItem['tx_hash']
                          }
                        }).then(function (result) {
                          result = JSON.parse(result.content);
                          devlog('gettransaction =>');
                          devlog(result);

                          if (result.msg !== 'error') {
                            var _rawtxJSON = result.result;
                            devlog('electrum gettransaction ==>');
                            devlog(index + " | " + (_rawtxJSON.length - 1));
                            devlog(_rawtxJSON); // decode tx

                            var _network = electrumJSNetworks[isKomodoCoin(network) ? 'kmd' : network];
                            var decodedTx = electrumJSTxDecoder(_rawtxJSON, _network);
                            devlog('decoded tx =>');
                            devlog(decodedTx);

                            if (!decodedTx) {
                              _atLeastOneDecodeTxFailed = true;
                              resolve('cant decode tx');
                            } else {
                              if (network === 'kmd') {
                                var interest = 0;

                                if (Number(fromSats(_utxoItem.value)) >= 10 && decodedTx.format.locktime > 0) {
                                  interest = kmdCalcInterest(decodedTx.format.locktime, _utxoItem.value, _utxoItem.height);
                                }

                                var _resolveObj = {
                                  txid: _utxoItem['tx_hash'],
                                  vout: _utxoItem['tx_pos'],
                                  address: address,
                                  amount: Number(fromSats(_utxoItem.value)),
                                  amountSats: _utxoItem.value,
                                  interest: interest,
                                  interestSats: Math.floor(toSats(interest)),
                                  confirmations: Number(_utxoItem.height) === 0 ? 0 : currentHeight - _utxoItem.height,
                                  spendable: true,
                                  verified: false,
                                  locktime: decodedTx.format.locktime
                                }; // merkle root verification agains another electrum server

                                if (verify) {
                                  verifyMerkleByCoin(_utxoItem['tx_hash'], _utxoItem.height, electrumServer, proxyServer, cache, network).then(function (verifyMerkleRes) {
                                    if (verifyMerkleRes && verifyMerkleRes === CONNECTION_ERROR_OR_INCOMPLETE_DATA) {
                                      verifyMerkleRes = false;
                                    }

                                    _resolveObj.verified = verifyMerkleRes;
                                    resolve(_resolveObj);
                                  });
                                } else {
                                  resolve(_resolveObj);
                                }
                              } else {
                                var _resolveObj2 = {
                                  txid: _utxoItem['tx_hash'],
                                  vout: _utxoItem['tx_pos'],
                                  address: address,
                                  amount: Number(fromSats(_utxoItem.value)),
                                  amountSats: _utxoItem.value,
                                  confirmations: Number(_utxoItem.height) === 0 ? 0 : currentHeight - _utxoItem.height,
                                  spendable: true,
                                  verified: false
                                }; // merkle root verification agains another electrum server

                                if (verify) {
                                  verifyMerkleByCoin(_utxoItem['tx_hash'], _utxoItem.height, electrumServer, proxyServer, cache, network).then(function (verifyMerkleRes) {
                                    if (verifyMerkleRes && verifyMerkleRes === CONNECTION_ERROR_OR_INCOMPLETE_DATA) {
                                      verifyMerkleRes = false;
                                    }

                                    _resolveObj2.verified = verifyMerkleRes;
                                    resolve(_resolveObj2);
                                  });
                                } else {
                                  resolve(_resolveObj2);
                                }
                              }
                            }
                          }
                        });
                      });
                    })).then(function (promiseResult) {
                      if (!_atLeastOneDecodeTxFailed) {
                        devlog(promiseResult);
                        resolve(promiseResult);
                      } else {
                        devlog('listunspent error, cant decode tx(s)');
                        resolve('decode error');
                      }
                    });
                  }
                } else {
                  resolve('cant get current height');
                }
              }
            });
          } else {
            resolve(CONNECTION_ERROR_OR_INCOMPLETE_DATA);
          }
        }
      });
    });
  } else {
    return new Promise(function (resolve, reject) {
      // HTTP.call('GET', `http://${proxyServer.ip}:${proxyServer.port}/api/listunspent`, {
      HTTP.call('GET', "https://" + proxyServer.ip + "/api/listunspent", {
        params: {
          port: electrumServer.port,
          ip: electrumServer.ip,
          proto: electrumServer.proto,
          address: address
        }
      }, function (error, result) {
        result = JSON.parse(result.content);
        resolve(result.msg === 'error' ? 'error' : result.result);
      });
    });
  }
};

module.exportDefault(listunspent);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"merkle.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/actions/merkle.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var crypto;
module.watch(require("crypto"), {
  "default": function (v) {
    crypto = v;
  }
}, 0);
var reverse;
module.watch(require("buffer-reverse"), {
  "default": function (v) {
    reverse = v;
  }
}, 1);
var Promise;
module.watch(require("meteor/promise"), {
  Promise: function (v) {
    Promise = v;
  }
}, 2);
var devlog;
module.watch(require("./dev"), {
  devlog: function (v) {
    devlog = v;
  }
}, 3);
var getRandomIntInclusive;
module.watch(require("./../lib/agama-wallet-lib/build/utils"), {
  getRandomIntInclusive: function (v) {
    getRandomIntInclusive = v;
  }
}, 4);
var electrumJSNetworks;
module.watch(require("./../lib/agama-wallet-lib/build/bitcoinjs-networks"), {
  "default": function (v) {
    electrumJSNetworks = v;
  }
}, 5);
var CONNECTION_ERROR_OR_INCOMPLETE_DATA = 'connection error or incomplete data'; // get merkle root

var getMerkleRoot = function (txid, proof, pos) {
  var _sha256 = function (data) {
    return crypto.createHash('sha256').update(data).digest();
  };

  var hash = txid;
  var serialized;
  devlog("getMerkleRoot txid " + txid);
  devlog("getMerkleRoot pos " + pos);
  devlog('getMerkleRoot proof');
  devlog("getMerkleRoot " + proof);

  for (i = 0; i < proof.length; i++) {
    var _hashBuff = new Buffer(hash, 'hex');

    var _proofBuff = new Buffer(proof[i], 'hex');

    if ((pos & 1) == 0) {
      serialized = Buffer.concat([reverse(_hashBuff), reverse(_proofBuff)]);
    } else {
      serialized = Buffer.concat([reverse(_proofBuff), reverse(_hashBuff)]);
    }

    hash = reverse(_sha256(_sha256(serialized))).toString('hex');
    pos /= 2;
  }

  return hash;
};

var verifyMerkle = function (txid, height, serverList, electrumServer, proxyServer, cache, network) {
  console.log("verify markle: ", serverList, electrumServer); // select random server

  var _rnd = getRandomIntInclusive(0, serverList.length - 1);

  var randomServer = serverList[_rnd];

  var _randomServer = randomServer.split(':');

  var _currentServer = electrumServer;
  devlog("current server: " + _currentServer);
  devlog("verification server: " + randomServer);
  return new Promise(function (resolve, reject) {
    // HTTP.call('GET', `http://${proxyServer.ip}:${proxyServer.port}/api/getmerkle`, {
    HTTP.call('GET', "https://" + proxyServer.ip + "/api/getmerkle", {
      params: {
        port: electrumServer.port,
        ip: electrumServer.ip,
        proto: electrumServer.proto,
        txid: txid,
        height: height
      }
    }, function (error, result) {
      result = JSON.parse(result.content);

      if (result.msg === 'error') {
        resolve(CONNECTION_ERROR_OR_INCOMPLETE_DATA);
      } else {
        var merkleData = result.result;

        if (merkleData && merkleData.merkle && merkleData.pos) {
          devlog('electrum getmerkle =>');
          devlog(merkleData);

          var _res = getMerkleRoot(txid, merkleData.merkle, merkleData.pos);

          devlog(_res, true);
          cache.getBlockheader(height, network, {
            url: "https://" + proxyServer.ip + "/api/getblockinfo",
            params: {
              ip: _randomServer[0],
              port: _randomServer[1],
              proto: _randomServer[2],
              height: height
            }
          }).then(function (result) {
            result = JSON.parse(result.content);

            if (result.msg === 'error') {
              resolve(CONNECTION_ERROR_OR_INCOMPLETE_DATA);
            } else {
              var blockInfo = result.result;

              if (blockInfo && blockInfo['merkle_root']) {
                devlog('blockinfo =>');
                devlog(blockInfo);
                devlog(blockInfo['merkle_root']);

                if (blockInfo && blockInfo['merkle_root']) {
                  if (_res === blockInfo['merkle_root']) {
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                } else {
                  resolve(CONNECTION_ERROR_OR_INCOMPLETE_DATA);
                }
              } else {
                resolve(CONNECTION_ERROR_OR_INCOMPLETE_DATA);
              }
            }
          });
        } else {
          resolve(CONNECTION_ERROR_OR_INCOMPLETE_DATA);
        }
      }
    });
  });
};

var verifyMerkleByCoin = function (txid, height, electrumServer, proxyServer, cache, network) {
  var _serverList = electrumServer.serverList;
  devlog("verifyMerkleByCoin");
  devlog("server ip " + electrumServer.ip);
  devlog("server port " + electrumServer.port);
  devlog(electrumServer.serverList);
  return new Promise(function (resolve, reject) {
    if (_serverList !== 'none') {
      var _filteredServerList = [];
      console.log(_serverList);
      _filteredServerList = _serverList; // for (let i = 0; i < _serverList.length; i++) {
      //   if (_serverList[i] !== electrumServer.ip + ':' + electrumServer.port + ':' + electrumServer.proto) {
      //     _filteredServerList.push(_serverList[i]);
      //   }
      // }

      verifyMerkle(txid, height, _filteredServerList, electrumServer, proxyServer, cache, network).then(function (proof) {
        resolve(proof);
      });
    } else {
      resolve(false);
    }
  });
};

module.exportDefault(verifyMerkleByCoin);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"proxyServers.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/actions/proxyServers.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// TODO: random
// const proxyServers = [{
//   ip: '94.130.225.86',
//   port: 80,
// }, {
//   ip: '94.130.98.74',
//   port: 80,
// }];
var proxyServers = [{
  ip: 'electrum.pungo.network',
  port: 80
}];
module.exportDefault(proxyServers);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"seedCrypt.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/actions/seedCrypt.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  encryptkey: function () {
    return encryptkey;
  },
  decryptkey: function () {
    return decryptkey;
  }
});
var aes256;
module.watch(require("nodejs-aes256"), {
  "default": function (v) {
    aes256 = v;
  }
}, 0);

var encryptkey = function (cipherKey, string) {
  // test pin security
  // - at least 1 char in upper case
  // - at least 1 digit
  // - at least one special character
  // - min length 8
  // const _pinTest = _pin.match('^(?=.*[A-Z])(?=.*[^<>{}\"/|;:.,~!?@#$%^=&*\\]\\\\()\\[_+]*$)(?=.*[0-9])(?=.*[a-z]).{8}$');
  var encryptedString = aes256.encrypt(cipherKey, string);
  return encryptedString;
};

var decryptkey = function (cipherKey, string) {
  var encryptedKey = aes256.decrypt(cipherKey, string); // test if stored encrypted passphrase is decrypted correctly
  // if not then the key is wrong

  var _regexTest = encryptedKey.match(/^[0-9a-zA-Z ]+$/g);

  return !_regexTest ? false : encryptedKey;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"utils.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/actions/utils.js                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  maskPubAddress: function () {
    return maskPubAddress;
  },
  setLocalStorageVar: function () {
    return setLocalStorageVar;
  },
  getLocalStorageVar: function () {
    return getLocalStorageVar;
  },
  convertURIToImageData: function () {
    return convertURIToImageData;
  },
  coinsList: function () {
    return coinsList;
  }
});

var maskPubAddress = function (pub) {
  // keep 3 first and 3 last chars unmasked
  var masked = '';

  for (var i = 0; i < pub.length - 3 * 2; i++) {
    masked = masked + '*';
  }

  return pub[0] + pub[1] + pub[2] + masked + pub[pub.length - 3] + pub[pub.length - 2] + pub[pub.length - 1];
};

var setLocalStorageVar = function (name, json) {
  var _json = JSON.stringify(json);

  localStorage.setItem(name, _json);
};

function getLocalStorageVar(name) {
  var _var = localStorage.getItem(name);

  if (_var) {
    var _json = JSON.parse(_var);

    return _json;
  } else {
    return null;
  }
}

var convertURIToImageData = function (URI) {
  return new Promise(function (resolve, reject) {
    if (URI === null) {
      return reject();
    }

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var image = new Image();
    image.addEventListener('load', function () {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(context.getImageData(0, 0, canvas.width, canvas.height));
    }, false);
    image.src = URI;
  });
};

var coinsList = ['PGT', 'KMD', 'BTC'];
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"components":{"About.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/About.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React, Component;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  },
  Component: function (v) {
    Component = v;
  }
}, 0);
var getLocalStorageVar;
module.watch(require("../actions/utils"), {
  getLocalStorageVar: function (v) {
    getLocalStorageVar = v;
  }
}, 1);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 2);

var About =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(About, _Component);

  function About(props) {
    return _Component.call(this, props) || this;
  }

  var _proto = About.prototype;

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        className: "about-ui"
      }, React.createElement("div", {
        className: "about-inner"
      }, React.createElement("div", {
        className: "pungo-logo-container"
      }, React.createElement("img", {
        src: "images/template/about/pungo_wallet_about_logo.svg"
      }), React.createElement("div", {
        className: "app-details"
      }, React.createElement("span", {
        className: "build"
      }, "Build 56"), React.createElement("span", {
        className: "version"
      }, "Version 1.0"))), React.createElement("div", {
        className: "powered-by-logo-container",
        onClick: function () {
          return window.open("https://peer2.group", '_system');
        }
      }, React.createElement("img", {
        src: "images/template/about/powered_by_logo.svg"
      })), React.createElement("div", {
        className: "unilicense-container"
      }, React.createElement("p", null, "This is free and unencumbered software released into the public domain."), React.createElement("p", null, "Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means."), React.createElement("p", null, "In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law."), React.createElement("p", null, "THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE."), React.createElement("p", null, "more information, please refer to http://unlicense.org"), React.createElement("div", {
        className: "unilicense-logo",
        onClick: function () {
          return window.open("http://unlicense.org", '_system');
        }
      }, React.createElement("img", {
        src: "images/template/about/unlicense_icon.svg"
      }), React.createElement("span", null, "THE UNILICENSE"))), React.createElement("div", {
        className: "copyright-container"
      }, React.createElement("p", null, "BLOCKTECH LLC"))));
    }

    return render;
  }();

  return About;
}(Component);

module.exportDefault(About);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"AddCoin.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/AddCoin.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var setLocalStorageVar, getLocalStorageVar;
module.watch(require("../actions/utils"), {
  setLocalStorageVar: function (v) {
    setLocalStorageVar = v;
  },
  getLocalStorageVar: function (v) {
    getLocalStorageVar = v;
  }
}, 1);
var coinsList;
module.watch(require("../actions/utils"), {
  coinsList: function (v) {
    coinsList = v;
  }
}, 2);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 3);

var AddCoin =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(AddCoin, _React$Component);

  function AddCoin() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.state = {
      multiSelect: {},
      coinsArray: []
    };
    _this.addCoin = _this.addCoin.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.addCoins = _this.addCoins.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.toggleMultiSelectCoin = _this.toggleMultiSelectCoin.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = AddCoin.prototype;

  _proto.toggleMultiSelectCoin = function () {
    function toggleMultiSelectCoin(coin) {
      var multiSelect = this.state.multiSelect;

      if (multiSelect[coin]) {
        delete multiSelect[coin];
      } else {
        multiSelect[coin] = true;
      }

      this.setState({
        multiSelect: multiSelect
      });
    }

    return toggleMultiSelectCoin;
  }();

  _proto.addCoin = function () {
    function addCoin(coin) {
      var coinsArray = this.state.coinsArray;

      if (!coinsArray.includes(coin)) {
        this.setState({
          coinsArray: (0, _toConsumableArray2.default)(coinsArray).concat([coin])
        });
      } else {
        this.setState({
          coinsArray: coinsArray.filter(function (c) {
            return c !== coin;
          })
        });
      }
    }

    return addCoin;
  }();

  _proto.addCoins = function () {
    function addCoins() {
      var coinsArray = this.state.coinsArray;

      for (var key in meteorBabelHelpers.sanitizeForInObject(coinsArray)) {
        this.props.addCoin(coinsArray[key]);
      }

      if (Object.keys(this.props.coins).length) {
        var seed = getLocalStorageVar('seed'); // this should rewritten when we'll have time

        this.props.login(window.__seed);
        window.__seed = null; // this.props.changeActiveSection('dashboard');
        // this.props.changeActiveSection(this.props.auth ? 'dashboard' : 'create-seed');
      } else {// no action if no coins are selected
          // this.props.changeActiveSection(this.props.auth ? 'dashboard' : 'login');
        }
    }

    return addCoins;
  }();

  _proto._addCoin = function () {
    function _addCoin(coin) {
      if (coin === 'multi') {
        for (var key in meteorBabelHelpers.sanitizeForInObject(this.state.multiSelect)) {
          this.props.addCoin(key);
        }
      } else if (coin === 'kmd+chips') {
        this.props.addCoin('kmd');
        this.props.addCoin('chips');
      } else if (coin === 'kmd+revs+jumblr') {
        this.props.addCoin('kmd');
        this.props.addCoin('revs');
        this.props.addCoin('jumblr');
      } else if (coin === 'all') {
        for (var i = 0; i < coinsList.length; i++) {
          var _key = coinsList[i];
          this.props.addCoin(_key.toLowerCase());
        }
      } else {
        this.props.addCoin(coin);
      }

      if (Object.keys(this.props.coins).length) {
        this.props.changeActiveSection(this.props.auth ? 'dashboard' : 'create-seed');
      } else {
        this.props.changeActiveSection(this.props.auth ? 'dashboard' : 'login');
      }

      this.setState({
        multiSelect: {}
      });
    }

    return _addCoin;
  }();

  _proto.renderCoins = function () {
    function renderCoins(singleSelect) {
      var _this2 = this;

      var isCoinSelected = function (coin) {
        return coinsArray.includes(coin) ? ' selected' : '';
      };

      var coinsArray = this.state.coinsArray;
      var _coins = this.props.coins;
      var _items = [];

      var _loop = function (i) {
        var key = coinsList[i];

        var _coin = key.toLowerCase();

        _items.push(React.createElement("div", {
          onClick: function () {
            return _this2.addCoin(_coin);
          },
          key: "overview-coins-" + _coin,
          className: 'overview-coin' + (_coins[_coin] ? ' disabled' : '')
        }, React.createElement("div", {
          className: "btc " + isCoinSelected(_coin)
        }, React.createElement("img", {
          className: "oval4",
          src: "/images/cryptologo/" + _coin + ".svg"
        })), React.createElement("div", {
          className: "bitcoin " + isCoinSelected(_coin)
        }, key ? key.toUpperCase() : '')));
      };

      for (var i = 0; i < coinsList.length; i++) {
        _loop(i);
      }

      return _items;
    }

    return renderCoins;
  }();

  _proto.renderCoinShortcuts = function () {
    function renderCoinShortcuts() {
      var _this3 = this;

      var _coins = this.props.coins;
      return React.createElement("div", {
        className: "coins-list-shortcuts"
      }, React.createElement("div", {
        onClick: function () {
          return _this3.addCoin('kmd+chips');
        },
        className: "combination margin-left-25"
      }, React.createElement("img", {
        className: _coins.kmd ? 'disabled' : '',
        src: "/images/cryptologo/kmd.png"
      }), React.createElement("i", {
        className: "fa fa-plus margin-left-15 margin-right-15"
      }), React.createElement("img", {
        className: _coins.chips ? 'disabled' : '',
        src: "/images/cryptologo/chips.png"
      })), React.createElement("div", {
        onClick: function () {
          return _this3.addCoin('kmd+revs+jumblr');
        },
        className: "combination margin-left-25"
      }, React.createElement("img", {
        className: _coins.kmd ? 'disabled' : '',
        src: "/images/cryptologo/kmd.png"
      }), React.createElement("i", {
        className: "fa fa-plus margin-left-15 margin-right-15"
      }), React.createElement("img", {
        className: _coins.revs ? 'disabled' : '',
        src: "/images/cryptologo/revs.png"
      }), React.createElement("i", {
        className: _coins.jumblr ? 'disabled' : '',
        className: "fa fa-plus margin-left-15 margin-right-15"
      }), React.createElement("img", {
        src: "/images/cryptologo/jumblr.png"
      })), React.createElement("div", {
        className: "combination"
      }, React.createElement("button", {
        className: "btn btn-lg btn-primary btn-block ladda-button",
        onClick: function () {
          return _this3.addCoin('all');
        }
      }, React.createElement("span", {
        className: "ladda-label"
      }, translate('ADD_COIN.ADD_ALL_COINS')))));
    }

    return renderCoinShortcuts;
  }();

  _proto.render = function () {
    function render() {
      var _this4 = this;

      console.log('AddCoin', !Object.keys(this.props.coins).length);

      if (this.props.activeSection !== 'create-seed' && this.props.activeSection !== 'pin' && this.props.activeSection !== 'offlinesig') {
        return React.createElement("div", {
          className: "addcoin-ui"
        }, React.createElement("div", {
          className: "home"
        }, React.createElement("div", {
          className: "home-inner"
        }, React.createElement("p", {
          className: "addcoin-label"
        }, "Select the wallets you want to activate"), React.createElement("div", {
          className: "overview-coins"
        }, this.renderCoins()), React.createElement("div", {
          className: "form"
        }, React.createElement("div", {
          className: "group3"
        }, React.createElement("div", {
          className: "btn-inner"
        }, React.createElement("div", {
          className: "btn",
          onClick: function () {
            return _this4.addCoins();
          }
        }, translate('ADD_COIN.NEXT'))))))));
      } else {
        return null;
      }
    }

    return render;
  }();

  return AddCoin;
}(React.Component);

module.exportDefault(AddCoin);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Coinsale.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/Coinsale.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React, Component;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  },
  Component: function (v) {
    Component = v;
  }
}, 0);
var getLocalStorageVar;
module.watch(require("../actions/utils"), {
  getLocalStorageVar: function (v) {
    getLocalStorageVar = v;
  }
}, 1);

var Coinsale =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Coinsale, _Component);

  function Coinsale(props) {
    return _Component.call(this, props) || this;
  }

  var _proto = Coinsale.prototype;

  _proto.render = function () {
    function render() {
      var containerStyles = {
        height: "100%"
      };
      var frameStyles = {
        position: "absolute",
        top: "40px",
        left: "0",
        right: "0",
        bottom: "0",
        // height: "100%",
        paddingTop: "14px",
        border: "0",
        zIndex: "1000"
      };
      return React.createElement("div", {
        className: "container",
        style: containerStyles
      }, React.createElement("iframe", {
        src: "https://pungotoken.sale/sale",
        style: frameStyles,
        border: "0",
        width: "100%",
        height: "100%"
      }));
    }

    return render;
  }();

  return Coinsale;
}(Component);

module.exportDefault(Coinsale);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"CreateRecoverSeed.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/CreateRecoverSeed.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var QRCode;
module.watch(require("qrcode.react"), {
  "default": function (v) {
    QRCode = v;
  }
}, 1);
var setLocalStorageVar;
module.watch(require("../actions/utils"), {
  setLocalStorageVar: function (v) {
    setLocalStorageVar = v;
  }
}, 2);
var encryptkey;
module.watch(require("../actions/seedCrypt"), {
  encryptkey: function (v) {
    encryptkey = v;
  }
}, 3);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 4);
var config;
module.watch(require("../actions/dev"), {
  config: function (v) {
    config = v;
  }
}, 5);
var passphraseGenerator;
module.watch(require("./../lib/agama-wallet-lib/build/crypto/passphrasegenerator"), {
  "default": function (v) {
    passphraseGenerator = v;
  }
}, 6);

var CreateRecoverSeed =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(CreateRecoverSeed, _React$Component);

  function CreateRecoverSeed() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.state = {
      createPin: true,
      pinOverride: config.preload ? config.preload.pin : null,
      pinOverrideTooShort: false,
      pin: config.preload ? config.preload.pin : '',
      pinConfirm: false,
      confirmSeedSaved: false,
      seed: "",
      // seed: passphraseGenerator.generatePassPhrase(256),
      pristine: true,
      showQrCode: false,
      isPastedTheSamePhrase: false
    };
    _this.defaultState = JSON.parse(JSON.stringify(_this.state));
    _this.updateInput = _this.updateInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.login = _this.login.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.toggleCreatePin = _this.toggleCreatePin.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.toggleConfirmSeed = _this.toggleConfirmSeed.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.pasteKey = _this.pasteKey.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.copyKey = _this.copyKey.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.reactToPasteAction = _this.reactToPasteAction.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = CreateRecoverSeed.prototype;

  _proto.componentWillMount = function () {
    function componentWillMount() {
      this.setState({
        seed: "" // seed: passphraseGenerator.generatePassPhrase(256),

      });
    }

    return componentWillMount;
  }();

  _proto.componentWillReceiveProps = function () {
    function componentWillReceiveProps(props) {// console.warn(props);
    }

    return componentWillReceiveProps;
  }();

  _proto.updateInput = function () {
    function updateInput(e) {
      var _this$setState;

      this.setState((_this$setState = {}, _this$setState[e.target.name] = e.target.value, _this$setState.pinOverrideTooShort = false, _this$setState));
    }

    return updateInput;
  }();

  _proto.login = function () {
    function login() {
      if (!this.state.confirmSeedSaved && this.state.pristine) {
        this.setState({
          pristine: false
        });
      } else {
        if (this.state.createPin) {
          if (this.state.pinOverride && this.state.pinOverride.length >= 6) {
            var _encryptedKey = encryptkey(this.state.pinOverride, this.state.seed);

            setLocalStorageVar('seed', {
              encryptedKey: _encryptedKey
            }); // this should rewritten when we'll have time

            window.__seed = this.state.seed;
            this.props.login(this.state.seed);
            this.setState(this.defaultState);
          } else {
            this.setState({
              pinOverrideTooShort: true,
              wrongPin: false
            });
          }
        } else {
          this.props.login(this.state.seed);
          this.setState(this.defaultState);
        }
      }
    }

    return login;
  }();

  _proto.toggleCreatePin = function () {
    function toggleCreatePin() {
      this.setState({
        createPin: !this.state.createPin
      });
    }

    return toggleCreatePin;
  }();

  _proto.toggleConfirmSeed = function () {
    function toggleConfirmSeed() {
      this.setState({
        confirmSeedSaved: !this.state.confirmSeedSaved
      });
    }

    return toggleConfirmSeed;
  }();

  _proto.pasteKey = function () {
    function pasteKey() {// console.log('-- paste key');
    }

    return pasteKey;
  }();

  _proto.copyKey = function () {
    function copyKey() {
      var copyText = document.getElementById("seed");
      copyText.select();
      document.execCommand("copy"); // document.execCommand("paste");

      window.getSelection().removeAllRanges();
    }

    return copyKey;
  }(); // the idea is to disable the 'Generate' button when pasting an existing passphrase.
  // so, we need to react to pasting from the clipboard and setting isPastedTheSamePhrase to true and disable the button


  _proto.reactToPasteAction = function () {
    function reactToPasteAction(event) {
      if (event.type === 'paste' && event.target.name === 'seed') {
        this.setState({
          isPastedTheSamePhrase: true
        });
      }
    }

    return reactToPasteAction;
  }();

  _proto.componentDidMount = function () {
    function componentDidMount() {
      document.addEventListener("paste", this.reactToPasteAction);
    }

    return componentDidMount;
  }();

  _proto.componentWillUnmount = function () {
    function componentWillUnmount() {
      document.removeEventListener("paste", this.reactToPasteAction);
    }

    return componentWillUnmount;
  }();

  _proto.render = function () {
    function render() {
      console.log('Create recover Seed');

      if (this.props.activeSection === 'create-recover-seed') {
        var isSeedExist = this.state.seed && this.state.seed.length > 0;
        var isPastedTheSamePhrase = this.state.isPastedTheSamePhrase;
        return React.createElement("div", {
          className: "form create-seed"
        }, React.createElement("p", {
          className: "seed-label"
        }, "Paste an existing passphrase or WIF"), React.createElement("div", {
          className: "textarea-wrap edit"
        }, React.createElement("textarea", {
          className: "edit-field recover",
          id: "seed",
          name: "seed",
          style: {
            "height": "80px"
          },
          onChange: this.updateInput,
          value: this.state.seed
        })), React.createElement("div", {
          className: "margin-bottom-25 margin-top-20"
        }, React.createElement("label", {
          className: "switch hide"
        }, React.createElement("input", {
          type: "checkbox",
          value: "on",
          checked: this.state.createPin
        }), React.createElement("div", {
          className: "slider",
          onClick: this.toggleCreatePin
        })), React.createElement("div", {
          className: "toggle-label pointer hide",
          onClick: this.toggleCreatePin
        }, translate('LOGIN.OVERRIDE_PIN')), React.createElement("p", {
          className: "seed-label"
        }, "Introduce a new PIN to access to your wallet"), this.state.createPin && React.createElement("div", {
          className: "edit edit-field"
        }, React.createElement("input", {
          type: "password",
          className: "form-password",
          name: "pinOverride",
          onChange: this.updateInput,
          placeholder: translate('LOGIN.ENTER_6_DIGIT_PIN'),
          value: this.state.pinOverride || ''
        })), this.state.createPin && this.state.pinOverrideTooShort && React.createElement("div", {
          className: "error margin-top-15 sz350"
        }, React.createElement("i", {
          className: "fa fa-warning"
        }), " ", translate('LOGIN.PIN_TOO_SHORT'))), React.createElement("div", {
          className: "margin-top-30 margin-bottom-25 sz350"
        }, React.createElement("label", {
          className: "switch"
        }, React.createElement("input", {
          type: "checkbox",
          value: "on",
          checked: this.state.confirmSeedSaved
        }), React.createElement("div", {
          className: "slider",
          onClick: this.toggleConfirmSeed
        })), React.createElement("div", {
          className: "toggle-label pointer " + (this.state.confirmSeedSaved ? 'active' : ''),
          onClick: this.toggleConfirmSeed
        }, translate('LOGIN.I_CONFIRM_I_SAVED_SEED')), !this.state.confirmSeedSaved && !this.state.pristine && React.createElement("div", {
          className: "error margin-top-15"
        }, React.createElement("i", {
          className: "fa fa-warning"
        }), " ", translate('LOGIN.CONFIRMATION_REQUIRED'))), React.createElement("div", {
          className: "group3"
        }, React.createElement("div", {
          className: "btn-inner",
          onClick: this.login
        }, React.createElement("div", {
          className: "btn"
        }, translate('LOGIN.DONE')))));
      } else {
        return null;
      }
    }

    return render;
  }();

  return CreateRecoverSeed;
}(React.Component);

module.exportDefault(CreateRecoverSeed);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"CreateSeed.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/CreateSeed.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var QRCode;
module.watch(require("qrcode.react"), {
  "default": function (v) {
    QRCode = v;
  }
}, 1);
var setLocalStorageVar;
module.watch(require("../actions/utils"), {
  setLocalStorageVar: function (v) {
    setLocalStorageVar = v;
  }
}, 2);
var encryptkey;
module.watch(require("../actions/seedCrypt"), {
  encryptkey: function (v) {
    encryptkey = v;
  }
}, 3);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 4);
var config;
module.watch(require("../actions/dev"), {
  config: function (v) {
    config = v;
  }
}, 5);
var passphraseGenerator;
module.watch(require("./../lib/agama-wallet-lib/build/crypto/passphrasegenerator"), {
  "default": function (v) {
    passphraseGenerator = v;
  }
}, 6);
var ToastContainer, ToastStore;
module.watch(require("./../lib/react-toast"), {
  ToastContainer: function (v) {
    ToastContainer = v;
  },
  ToastStore: function (v) {
    ToastStore = v;
  }
}, 7);

var CreateSeed =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(CreateSeed, _React$Component);

  function CreateSeed() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.state = {
      createPin: true,
      pinOverride: config.preload ? config.preload.pin : null,
      pinOverrideTooShort: false,
      pin: config.preload ? config.preload.pin : '',
      pinConfirm: false,
      confirmSeedSaved: false,
      seed: passphraseGenerator.generatePassPhrase(256),
      pristine: true,
      showQrCode: false,
      isPastedTheSamePhrase: false
    };
    _this.defaultState = JSON.parse(JSON.stringify(_this.state));
    _this.updateInput = _this.updateInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.login = _this.login.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.toggleCreatePin = _this.toggleCreatePin.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.toggleConfirmSeed = _this.toggleConfirmSeed.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.generateKey = _this.generateKey.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.copyKey = _this.copyKey.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.reactToPasteAction = _this.reactToPasteAction.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = CreateSeed.prototype;

  _proto.componentWillMount = function () {
    function componentWillMount() {
      this.setState({
        seed: passphraseGenerator.generatePassPhrase(256)
      });
    }

    return componentWillMount;
  }();

  _proto.componentWillReceiveProps = function () {
    function componentWillReceiveProps(props) {// console.warn(props);
    }

    return componentWillReceiveProps;
  }();

  _proto.updateInput = function () {
    function updateInput(e) {
      var _this$setState;

      this.setState((_this$setState = {}, _this$setState[e.target.name] = e.target.value, _this$setState.pinOverrideTooShort = false, _this$setState));
    }

    return updateInput;
  }();

  _proto.login = function () {
    function login() {
      if (!this.state.confirmSeedSaved && this.state.pristine) {
        this.setState({
          pristine: false
        });
      } else {
        if (this.state.createPin) {
          if (this.state.pinOverride && this.state.pinOverride.length >= 6) {
            var _encryptedKey = encryptkey(this.state.pinOverride, this.state.seed);

            setLocalStorageVar('seed', {
              encryptedKey: _encryptedKey
            }); // this should rewritten when we'll have time

            window.__seed = this.state.seed;
            this.props.login(this.state.seed);
            this.setState(this.defaultState);
          } else {
            this.setState({
              pinOverrideTooShort: true,
              wrongPin: false
            });
          }
        } else {
          this.props.login(this.state.seed);
          this.setState(this.defaultState);
        }
      }
    }

    return login;
  }();

  _proto.toggleCreatePin = function () {
    function toggleCreatePin() {
      this.setState({
        createPin: !this.state.createPin
      });
    }

    return toggleCreatePin;
  }();

  _proto.toggleConfirmSeed = function () {
    function toggleConfirmSeed() {
      this.setState({
        confirmSeedSaved: !this.state.confirmSeedSaved
      });
    }

    return toggleConfirmSeed;
  }();

  _proto.generateKey = function () {
    function generateKey() {
      this.setState({
        seed: passphraseGenerator.generatePassPhrase(256)
      });
    }

    return generateKey;
  }();

  _proto.copyKey = function () {
    function copyKey() {
      var copyText = document.getElementById("seed");
      copyText.select();
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      ToastStore.info("Copied to clipboard", 2000, "toast-message");
    }

    return copyKey;
  }(); // the idea is to disable the 'Generate' button when pasting an existing passphrase.
  // so, we need to react to pasting from the clipboard and setting isPastedTheSamePhrase to true and disable the button


  _proto.reactToPasteAction = function () {
    function reactToPasteAction(event) {
      if (event.type === 'paste' && event.target.name === 'seed') {
        this.setState({
          isPastedTheSamePhrase: true
        });
      }
    }

    return reactToPasteAction;
  }();

  _proto.componentDidMount = function () {
    function componentDidMount() {
      document.addEventListener("paste", this.reactToPasteAction);
    }

    return componentDidMount;
  }();

  _proto.componentWillUnmount = function () {
    function componentWillUnmount() {
      document.removeEventListener("paste", this.reactToPasteAction);
    }

    return componentWillUnmount;
  }();

  _proto.render = function () {
    function render() {
      console.log('Create Seed');

      if (this.props.activeSection === 'create-seed') {
        var isSeedExist = this.state.seed && this.state.seed.length > 0;
        var isPastedTheSamePhrase = this.state.isPastedTheSamePhrase;
        return React.createElement("div", {
          className: "form create-seed"
        }, React.createElement("p", {
          className: "seed-label"
        }, "Generate new passphrase"), React.createElement("div", {
          className: "textarea-wrap"
        }, React.createElement("textarea", {
          className: "edit-field",
          id: "seed",
          name: "seed",
          style: {
            "height": "80px"
          },
          onChange: this.updateInput,
          value: this.state.seed
        }), React.createElement("button", {
          className: "button-copy",
          onClick: this.copyKey
        })), React.createElement("div", {
          className: "group3"
        }, React.createElement("div", {
          className: "btn-inner",
          onClick: this.generateKey
        }, React.createElement("div", {
          className: "btn " + (isSeedExist && !isPastedTheSamePhrase ? '' : 'disabled-btn')
        }, translate('LOGIN.GENERATE')))), React.createElement("div", {
          className: "text-center margin-top-25"
        }, React.createElement(QRCode, {
          value: this.state.seed,
          size: 230
        })), React.createElement("div", {
          className: "margin-bottom-25 margin-top-25"
        }, React.createElement("label", {
          className: "switch hide"
        }, React.createElement("input", {
          type: "checkbox",
          value: "on",
          checked: this.state.createPin
        }), React.createElement("div", {
          className: "slider",
          onClick: this.toggleCreatePin
        })), React.createElement("div", {
          className: "toggle-label pointer hide",
          onClick: this.toggleCreatePin
        }, translate('LOGIN.OVERRIDE_PIN')), React.createElement("p", {
          className: "seed-label"
        }, "Introduce a new PIN to access to your wallet"), this.state.createPin && React.createElement("div", {
          className: "edit edit-field"
        }, React.createElement("input", {
          type: "password",
          className: "form-password",
          name: "pinOverride",
          onChange: this.updateInput,
          placeholder: translate('LOGIN.ENTER_6_DIGIT_PIN'),
          value: this.state.pinOverride || ''
        })), this.state.createPin && this.state.pinOverrideTooShort && React.createElement("div", {
          className: "error margin-top-15 sz350"
        }, React.createElement("i", {
          className: "fa fa-warning"
        }), " ", translate('LOGIN.PIN_TOO_SHORT'))), React.createElement("div", {
          className: "margin-top-30 margin-bottom-25 sz350"
        }, React.createElement("label", {
          className: "switch"
        }, React.createElement("input", {
          type: "checkbox",
          value: "on",
          checked: this.state.confirmSeedSaved
        }), React.createElement("div", {
          className: "slider",
          onClick: this.toggleConfirmSeed
        })), React.createElement("div", {
          className: "toggle-label pointer " + (this.state.confirmSeedSaved ? 'active' : ''),
          onClick: this.toggleConfirmSeed
        }, translate('LOGIN.I_CONFIRM_I_SAVED_SEED')), !this.state.confirmSeedSaved && !this.state.pristine && React.createElement("div", {
          className: "error margin-top-15"
        }, React.createElement("i", {
          className: "fa fa-warning"
        }), " ", translate('LOGIN.CONFIRMATION_REQUIRED'))), React.createElement("div", {
          className: "group3"
        }, React.createElement("div", {
          className: "btn-inner",
          onClick: this.login
        }, React.createElement("div", {
          className: "btn"
        }, translate('LOGIN.DONE')))), React.createElement(ToastContainer, {
          store: ToastStore,
          position: ToastContainer.POSITION.BOTTOM_CENTER,
          className: "toast-message"
        }));
      } else {
        return null;
      }
    }

    return render;
  }();

  return CreateSeed;
}(React.Component);

module.exportDefault(CreateSeed);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"KMDInterest.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/KMDInterest.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var Spinner;
module.watch(require("./Spinner"), {
  "default": function (v) {
    Spinner = v;
  }
}, 1);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 2);
var secondsToString;
module.watch(require("./../lib/agama-wallet-lib/build/time"), {
  secondsToString: function (v) {
    secondsToString = v;
  }
}, 3);
var formatValue;
module.watch(require("./../lib/agama-wallet-lib/build/utils"), {
  formatValue: function (v) {
    formatValue = v;
  }
}, 4);

var KMDInterest =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(KMDInterest, _React$Component);

  function KMDInterest() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.state = {
      spvVerificationWarning: false,
      spvPreflightSendInProgress: false,
      failed: false,
      success: false
    };
    _this.confirmClaimInterest = _this.confirmClaimInterest.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.cancelClaimInterest = _this.cancelClaimInterest.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.preflightClaim = _this.preflightClaim.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = KMDInterest.prototype;

  _proto.preflightClaim = function () {
    function preflightClaim() {
      var _this2 = this;

      this.setState({
        spvPreflightSendInProgress: true
      });
      this.props.sendtx(this.props.coin, this.props.address, this.props.balance.balanceSats, true, false).then(function (sendPreflight) {
        if (sendPreflight && sendPreflight.msg === 'success') {
          _this2.setState({
            spvVerificationWarning: !sendPreflight.result.utxoVerified
          });

          _this2.confirmClaimInterest();
        } else {
          _this2.setState({
            spvPreflightSendInProgress: false
          });
        }
      });
    }

    return preflightClaim;
  }();

  _proto.confirmClaimInterest = function () {
    function confirmClaimInterest() {
      var _this3 = this;

      this.props.sendtx(this.props.coin, this.props.address, Number(this.props.balance.balanceSats) - 10000, null, true).then(function (res) {
        if (res && res.msg === 'success') {
          _this3.setState({
            failed: false,
            success: true,
            spvPreflightSendInProgress: false
          });

          setTimeout(function () {
            _this3.props.changeActiveSection('dashboard');
          }, 10000);
        } else {
          _this3.setState({
            failed: true,
            success: false,
            spvPreflightSendInProgress: false
          });
        }
      });
    }

    return confirmClaimInterest;
  }();

  _proto.cancelClaimInterest = function () {
    function cancelClaimInterest() {
      this.setState({
        spvVerificationWarning: false,
        spvPreflightSendInProgress: false,
        failed: false,
        success: false
      });
    }

    return cancelClaimInterest;
  }();

  _proto.renderUTXO = function () {
    function renderUTXO() {
      var _utxo = this.props.utxo;
      var _items = [];

      for (var i = 0; i < _utxo.length; i++) {
        _items.push(React.createElement("tr", {
          key: "kmd-interest-utxo-" + i
        }, React.createElement("td", {
          className: _utxo[i].amount >= 10 ? 'green bold' : ''
        }, formatValue(_utxo[i].amount)), React.createElement("td", {
          className: _utxo[i].interest > 0 ? 'green bold' : ''
        }, formatValue(_utxo[i].interest)), React.createElement("td", null, _utxo[i].locktime && React.createElement("i", {
          className: "fa fa-check-circle green locktime-icon"
        }), !_utxo[i].locktime && React.createElement("i", {
          className: "fa fa-exclamation-circle red locktime-icon"
        }))));
      }

      return _items;
    }

    return renderUTXO;
  }();

  _proto.render = function () {
    function render() {
      if (this.props.activeSection === 'claim') {
        return React.createElement("div", {
          className: "form claim-interest"
        }, React.createElement("div", {
          className: "margin-top-40"
        }, React.createElement("p", null, React.createElement("strong", {
          className: "green"
        }, translate('CLAIM.REQ_TO_CLAIM_P1'), ":"), " ", translate('CLAIM.REQ_TO_CLAIM_P2'), ".")), React.createElement("div", {
          className: "text-center margin-top-35"
        }, React.createElement("div", {
          className: "group3 margin-bottom-30 claim-btn"
        }, React.createElement("div", {
          onClick: this.preflightClaim,
          className: "btn-inner"
        }, React.createElement("div", {
          className: "btn"
        }, React.createElement("span", null, translate('CLAIM.CLAIM'), " ", formatValue(this.props.balance.interest), " KMD ", translate('CLAIM.INTEREST_SM'))), React.createElement("div", {
          className: "group2"
        }, React.createElement("i", {
          className: "fa fa-dollar"
        }))))), this.state.spvPreflightSendInProgress && React.createElement("div", {
          className: "text-center"
        }, translate('SEND.SPV_VERIFYING'), "..."), this.state.spvVerificationWarning && React.createElement("div", null, React.createElement("div", {
          className: "margin-left-10"
        }, React.createElement("strong", {
          className: "warning"
        }, translate('CLAIM.WARNING'), ":"), " ", translate('CLAIM.WARNING_SPV_P1'), " ", translate('SEND.WARNING_SPV_P2')), React.createElement("div", {
          className: "margin-top-30 text-center"
        }, React.createElement("button", {
          className: "btn btn-confirm",
          onClick: this.confirmClaimInterest
        }, translate('CLAIM.CONFIRM'), React.createElement("i", {
          className: "fa fa-check"
        })), React.createElement("button", {
          className: "btn btn-cancel margin-left-60",
          onClick: this.cancelClaimInterest
        }, translate('CLAIM.CANCEL'), React.createElement("i", {
          className: "fa fa-close"
        })))), this.state.failed && React.createElement("div", {
          className: "padding-bottom-10 text-center red bold"
        }, translate('CLAIM.FAILED_TO_CLAIM_INTEREST')), this.state.success && React.createElement("div", {
          className: "padding-bottom-10 text-center green bold"
        }, translate('CLAIM.YOU_SUCCESFULLY_CLAIMED'), " ", formatValue(this.props.balance.interest), " KMD"), !this.props.utxo && React.createElement(Spinner, null), this.props.utxo && this.props.utxo.length && this.props.utxo.length > 0 && React.createElement("div", {
          className: "margin-top-40 margin-bottom-20 text-center"
        }, React.createElement("strong", null, "UTXO ", translate('CLAIM.LIST_SM'))), this.props.utxo && this.props.utxo.length && this.props.utxo.length > 0 && React.createElement("table", {
          className: "table table-hover dataTable table-striped margin-top-10"
        }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, translate('CLAIM.AMOUNT')), React.createElement("th", null, translate('CLAIM.INTEREST')), React.createElement("th", null, "Locktime"))), React.createElement("tbody", null, this.renderUTXO())));
      } else {
        return null;
      }
    }

    return render;
  }();

  return KMDInterest;
}(React.Component);

module.exportDefault(KMDInterest);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Login.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/Login.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var jsQR;
module.watch(require("jsqr"), {
  "default": function (v) {
    jsQR = v;
  }
}, 1);
var maskPubAddress, setLocalStorageVar, getLocalStorageVar, convertURIToImageData;
module.watch(require("../actions/utils"), {
  maskPubAddress: function (v) {
    maskPubAddress = v;
  },
  setLocalStorageVar: function (v) {
    setLocalStorageVar = v;
  },
  getLocalStorageVar: function (v) {
    getLocalStorageVar = v;
  },
  convertURIToImageData: function (v) {
    convertURIToImageData = v;
  }
}, 2);
var encryptkey, decryptkey;
module.watch(require("../actions/seedCrypt"), {
  encryptkey: function (v) {
    encryptkey = v;
  },
  decryptkey: function (v) {
    decryptkey = v;
  }
}, 3);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 4);
var devlog, config;
module.watch(require("../actions/dev"), {
  devlog: function (v) {
    devlog = v;
  },
  config: function (v) {
    config = v;
  }
}, 5);

var Login =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Login, _React$Component);

  function Login() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.state = {
      passphrase: config.preload ? config.preload.seed : null,
      createPin: false,
      pinOverride: config.preload ? config.preload.pin : null,
      pinOverrideTooShort: false,
      pin: config.preload ? config.preload.pin : '',
      wrongPin: false,
      qrScanError: false
    };
    _this.defaultState = JSON.parse(JSON.stringify(_this.state));
    _this.updateInput = _this.updateInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.triggerKey = _this.triggerKey.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.login = _this.login.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.toggleCreatePin = _this.toggleCreatePin.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.scanQR = _this.scanQR.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Login.prototype;

  _proto.updateInput = function () {
    function updateInput(e) {
      var _this$setState;

      this.setState((_this$setState = {}, _this$setState[e.target.name] = e.target.value, _this$setState.wrongPin = false, _this$setState.qrScanError = false, _this$setState.pinOverrideTooShort = false, _this$setState));
    }

    return updateInput;
  }();

  _proto.scanQR = function () {
    function scanQR() {
      var _this2 = this;

      MeteorCamera.getPicture({
        quality: 100
      }, function (error, data) {
        if (error) {
          _this2.setState({
            qrScanError: true
          });

          setTimeout(function () {
            _this2.setState({
              qrScanError: false
            });
          }, 5000);
        } else {
          convertURIToImageData(data).then(function (imageData) {
            var decodedQR = jsQR.decodeQRFromImage(imageData.data, imageData.width, imageData.height);

            if (!decodedQR) {
              _this2.setState({
                qrScanError: true
              });

              setTimeout(function () {
                _this2.setState({
                  qrScanError: false
                });
              }, 5000);
            } else {
              _this2.setState({
                qrScanError: false,
                passphrase: decodedQR
              });
            }
          });
        }
      });
    }

    return scanQR;
  }();

  _proto.login = function () {
    function login(isPinAccess) {
      if (isPinAccess) {
        // decrypt
        var _encryptedKey = getLocalStorageVar('seed');

        if (_encryptedKey && _encryptedKey.encryptedKey && this.state.pin && this.state.pin.length >= 6) {
          var _decryptedKey = decryptkey(this.state.pin, _encryptedKey.encryptedKey);

          if (_decryptedKey) {
            this.props.loginAfterSelectCoin(_decryptedKey);
            this.setState(this.defaultState);
          } else {
            this.setState({
              pinOverrideTooShort: false,
              wrongPin: true
            });
          }
        } else {
          this.setState({
            pinOverrideTooShort: false,
            wrongPin: true
          });
        }
      } else {
        if (this.state.createPin) {
          if (this.state.pinOverride && this.state.pinOverride.length >= 6) {
            var _encryptedKey2 = encryptkey(this.state.pinOverride, this.state.passphrase);

            setLocalStorageVar('seed', {
              encryptedKey: _encryptedKey2
            });
            this.props.loginAfterSelectCoin(this.state.passphrase); // this.props.login(this.state.passphrase);

            this.setState(this.defaultState);
          } else {
            this.setState({
              pinOverrideTooShort: true,
              wrongPin: false
            });
          }
        } else {
          this.props.loginAfterSelectCoin(this.state.passphrase); // this.props.login(this.state.passphrase);

          this.setState(this.defaultState);
        }
      }
    }

    return login;
  }();

  _proto.toggleCreatePin = function () {
    function toggleCreatePin() {
      this.setState({
        createPin: !this.state.createPin
      });
    }

    return toggleCreatePin;
  }();

  _proto.triggerKey = function () {
    function triggerKey(key) {
      if (key === 'back') {
        this.setState({
          pin: this.state.pin.slice(0, -1),
          wrongPin: false
        });
      } else if (key === 'remove') {
        this.setState({
          pin: '',
          wrongPin: false
        });
      } else {
        this.setState({
          pin: this.state.pin + key,
          wrongPin: false
        });
      }
    }

    return triggerKey;
  }();

  _proto.renderKeyPad = function () {
    function renderKeyPad() {
      var _this3 = this;

      var _items = [];

      var _loop = function (i) {
        _items.push(React.createElement("button", {
          key: "login-keypad-" + i,
          className: "btn btn-lg btn-primary",
          onClick: function () {
            return _this3.triggerKey(i);
          }
        }, React.createElement("span", {
          className: "ladda-label"
        }, i)));
      };

      for (var i = 0; i < 10; i++) {
        _loop(i);
      }

      _items.push(React.createElement("button", {
        key: "login-keypad-back",
        className: "btn btn-lg btn-primary",
        onClick: function () {
          return _this3.triggerKey('back');
        }
      }, React.createElement("span", {
        className: "ladda-label padding-fix"
      }, React.createElement("i", {
        className: "fa fa-long-arrow-left"
      }))));

      _items.push(React.createElement("button", {
        key: "login-keypad-remove",
        className: "btn btn-lg btn-primary",
        onClick: function () {
          return _this3.triggerKey('remove');
        }
      }, React.createElement("span", {
        className: "ladda-label padding-fix"
      }, React.createElement("i", {
        className: "fa fa-remove"
      }))));

      return _items;
    }

    return renderKeyPad;
  }();

  _proto.componentDidMount = function () {
    function componentDidMount() {
      this.inputPin.focus();
    }

    return componentDidMount;
  }();

  _proto.render = function () {
    function render() {
      var _this4 = this;

      var _this$props = this.props,
          goToCreateSeedPage = _this$props.goToCreateSeedPage,
          goToCreateRecoverSeedPage = _this$props.goToCreateRecoverSeedPage;
      var styles = {// backgroundColor: "#f68d1f",
        // height: "100%",
      };
      console.log('Login'); // if ((this.props.activeSection === 'login' || (!this.props.auth && this.props.activeSection !== 'addcoin')) &&

      if (this.props.activeSection === 'login' && // this.props.coins &&
      // Object.keys(this.props.coins).length &&
      // this.props.activeSection !== 'create-seed' &&
      // this.props.activeSection !== 'offlinesig' &&
      // this.props.activeSection !== 'pin' &&
      true) {
        return React.createElement("div", {
          className: "container",
          style: styles
        }, React.createElement("img", {
          className: "img_wrap",
          src: "/images/pungo_logo_splash.svg",
          width: 180,
          height: 90
        }), React.createElement("div", {
          className: "form-wrap"
        }, React.createElement("p", {
          className: "login-label"
        }, "login with pin"), React.createElement("div", {
          className: "input-wrap"
        }, React.createElement("input", {
          ref: function (input) {
            _this4.inputPin = input;
          },
          type: "password",
          className: "form-input",
          name: "pin",
          onChange: this.updateInput,
          placeholder: translate('LOGIN.ENTER_PIN'),
          value: this.state.pin
        }), React.createElement("img", {
          className: "login-action",
          src: "/images/template/login/circle_right_arrow.svg",
          onClick: function () {
            return _this4.login(true);
          },
          align: "right"
        })), React.createElement("button", {
          className: "button action",
          onClick: function () {
            return goToCreateSeedPage();
          }
        }, translate('LOGIN.CREATE_WALLET').toUpperCase()), React.createElement("button", {
          className: "button action",
          onClick: function () {
            return goToCreateRecoverSeedPage();
          }
        }, translate('LOGIN.RECOVER_WALLET').toUpperCase())));
      } else {
        return null;
      }
    }

    return render;
  }();

  return Login;
}(React.Component);

module.exportDefault(Login);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ManageCoins.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/ManageCoins.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var coinsList, setLocalStorageVar;
module.watch(require("../actions/utils"), {
  coinsList: function (v) {
    coinsList = v;
  },
  setLocalStorageVar: function (v) {
    setLocalStorageVar = v;
  }
}, 1);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 2);

var ManageCoins =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ManageCoins, _React$Component);

  function ManageCoins(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      coinsArray: []
    };
    console.log('props.coins', props.coins);
    _this.addCoin = _this.addCoin.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.saveCoins = _this.saveCoins.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = ManageCoins.prototype;

  _proto.componentWillMount = function () {
    function componentWillMount() {
      this.setState({
        coinsArray: ManageCoins.findSelectedCoins(this.props.coins)
      });
    }

    return componentWillMount;
  }();

  _proto.addCoin = function () {
    function addCoin(coin) {
      var coinsArray = this.state.coinsArray;

      if (!coinsArray.includes(coin)) {
        this.setState({
          coinsArray: (0, _toConsumableArray2.default)(coinsArray).concat([coin])
        });
      } else {
        this.setState({
          coinsArray: coinsArray.filter(function (c) {
            return c !== coin;
          })
        });
      }
    }

    return addCoin;
  }();

  _proto.saveCoins = function () {
    function saveCoins() {
      var coinsArray = this.state.coinsArray;
      this.props.addCoins(coinsArray);

      if (Object.keys(this.props.coins).length) {
        this.props.changeActiveSection(this.props.auth ? 'dashboard' : 'create-seed');
      } else {
        this.props.changeActiveSection(this.props.auth ? 'dashboard' : 'login');
      }
    }

    return saveCoins;
  }();

  ManageCoins.findSelectedCoins = function () {
    function findSelectedCoins(coinObjects) {
      var coinsArray = [];
      var keys = Object.keys(coinObjects);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var coin = key.toLowerCase();
        coinsArray.push(coin);
      }

      return coinsArray;
    }

    return findSelectedCoins;
  }();

  _proto.renderCoins = function () {
    function renderCoins() {
      var _this2 = this;

      var isCoinSelected = function (coin) {
        return coinsArray.includes(coin) ? ' selected' : '';
      };

      var coinsArray = this.state.coinsArray;
      var _coins = this.props.coins;
      var _items = [];

      var _loop = function (i) {
        var key = coinsList[i];

        var _coin = key.toLowerCase();

        _items.push(React.createElement("div", {
          onClick: function () {
            return _this2.addCoin(_coin);
          },
          key: "overview-coins-" + _coin,
          className: "overview-coin"
        }, React.createElement("div", {
          className: "btc " + isCoinSelected(_coin)
        }, React.createElement("img", {
          className: "oval4",
          src: "/images/cryptologo/" + _coin + ".svg"
        })), React.createElement("div", {
          className: "bitcoin " + isCoinSelected(_coin)
        }, key ? key.toUpperCase() : '')));
      };

      for (var i = 0; i < coinsList.length; i++) {
        _loop(i);
      }

      return _items;
    }

    return renderCoins;
  }();

  _proto.render = function () {
    function render() {
      var _this3 = this;

      console.log('ManageCoins state', this.state);

      if (this.props.activeSection !== 'create-seed' && this.props.activeSection !== 'pin' && this.props.activeSection !== 'offlinesig') {
        return React.createElement("div", {
          className: "addcoin-ui"
        }, React.createElement("div", {
          className: "home"
        }, React.createElement("div", {
          className: "home-inner"
        }, React.createElement("p", {
          className: "addcoin-label"
        }, "Select the wallets you want to activate"), React.createElement("div", {
          className: "overview-coins"
        }, this.renderCoins()), React.createElement("div", {
          className: "form"
        }, React.createElement("div", {
          className: "group3"
        }, React.createElement("div", {
          className: "btn-inner"
        }, React.createElement("div", {
          className: "btn",
          onClick: function () {
            return _this3.saveCoins();
          }
        }, translate('SETTINGS.SAVE'))))))));
      } else {
        return null;
      }
    }

    return render;
  }();

  return ManageCoins;
}(React.Component);

module.exportDefault(ManageCoins);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"OfflineSigning.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/OfflineSigning.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 1);
var jsQR;
module.watch(require("jsqr"), {
  "default": function (v) {
    jsQR = v;
  }
}, 2);
var QRCode;
module.watch(require("qrcode.react"), {
  "default": function (v) {
    QRCode = v;
  }
}, 3);
var getLocalStorageVar, convertURIToImageData;
module.watch(require("../actions/utils"), {
  getLocalStorageVar: function (v) {
    getLocalStorageVar = v;
  },
  convertURIToImageData: function (v) {
    convertURIToImageData = v;
  }
}, 4);
var isKomodoCoin;
module.watch(require("./../lib/agama-wallet-lib/build/coin-helpers"), {
  isKomodoCoin: function (v) {
    isKomodoCoin = v;
  }
}, 5);
var fromSats, toSats;
module.watch(require("./../lib/agama-wallet-lib/build/utils"), {
  fromSats: function (v) {
    fromSats = v;
  },
  toSats: function (v) {
    toSats = v;
  }
}, 6);
var encryptkey, decryptkey;
module.watch(require("../actions/seedCrypt"), {
  encryptkey: function (v) {
    encryptkey = v;
  },
  decryptkey: function (v) {
    decryptkey = v;
  }
}, 7);
var wifToWif, seedToWif;
module.watch(require("./../lib/agama-wallet-lib/build/keys"), {
  wifToWif: function (v) {
    wifToWif = v;
  },
  seedToWif: function (v) {
    seedToWif = v;
  }
}, 8);
var devlog;
module.watch(require("../actions/dev"), {
  devlog: function (v) {
    devlog = v;
  }
}, 9);
var electrumJSNetworks;
module.watch(require("./../lib/agama-wallet-lib/build/bitcoinjs-networks"), {
  "default": function (v) {
    electrumJSNetworks = v;
  }
}, 10);
var buildSignedTxForks, buildSignedTx;
module.watch(require("../actions/createtx"), {
  buildSignedTxForks: function (v) {
    buildSignedTxForks = v;
  },
  buildSignedTx: function (v) {
    buildSignedTx = v;
  }
}, 11);

var OfflineSigning =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(OfflineSigning, _React$Component);

  function OfflineSigning() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.state = {
      pin: null,
      wrongPin: false,
      qrScanError: false,
      sendTo: null,
      sendFrom: null,
      amount: 0,
      change: 0,
      network: null,
      utxo: null,
      signedTx: null,
      failedToSign: false
    };
    _this.defaultState = JSON.parse(JSON.stringify(_this.state));
    _this.scanQR = _this.scanQR.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.sign = _this.sign.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.updateInput = _this.updateInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = OfflineSigning.prototype;

  _proto.updateInput = function () {
    function updateInput(e) {
      var _this$setState;

      this.setState((_this$setState = {}, _this$setState[e.target.name] = e.target.value, _this$setState));
    }

    return updateInput;
  }();

  _proto.sign = function () {
    function sign() {
      // decrypt
      var _encryptedKey = getLocalStorageVar('seed');

      if (_encryptedKey && _encryptedKey.encryptedKey && this.state.pin && this.state.pin.length >= 6) {
        var _decryptedKey = decryptkey(this.state.pin, _encryptedKey.encryptedKey);

        if (_decryptedKey) {
          this.setState({
            wrongPin: false
          });
          devlog(_decryptedKey);
          var network = this.state.network.toLowerCase();
          var wif = seedToWif(_decryptedKey, isKomodoCoin(network) || network === 'kmd' ? electrumJSNetworks.kmd : electrumJSNetworks[key.toLowerCase()], true).wif;

          var _rawtx;

          if (network === 'btg' || network === 'bch') {
            _rawtx = buildSignedTxForks(this.state.sendTo, this.state.sendFrom, wif, network, this.state.utxo, this.state.change, this.state.amount);
          } else {
            _rawtx = buildSignedTx(this.state.sendTo, this.state.sendFrom, wif, network, this.state.utxo, this.state.change, this.state.amount);
          }

          console.warn(_rawtx);

          if (_rawtx) {
            this.setState({
              signedTx: network + ":" + _rawtx
            });
          } else {
            this.setState({
              failedToSign: true
            });
          }
        } else {
          this.setState({
            wrongPin: true
          });
        }
      } else {
        this.setState({
          wrongPin: true
        });
      }
    }

    return sign;
  }();

  _proto.scanQR = function () {
    function scanQR() {
      var _this2 = this;

      var width = 1920;
      var height = 1080;
      this.setState(this.defaultState);
      MeteorCamera.getPicture({
        quality: 100,
        width: width,
        height: height
      }, function (error, data) {
        if (error) {
          _this2.setState({
            qrScanError: true
          });
        } else {
          convertURIToImageData(data).then(function (imageData) {
            var decodedQR = jsQR.decodeQRFromImage(imageData.data, imageData.width, imageData.height);

            if (!decodedQR || decodedQR && decodedQR.indexOf('agtx') === -1) {
              _this2.setState({
                qrScanError: true
              });
            } else {
              var _tx = decodedQR.split(':');

              var _network = _tx[1];
              var _sendTo = _tx[2];
              var _changeTo = _tx[3];

              var _amount = parseInt(_tx[4]);

              var _change = parseInt(_tx[5]);

              devlog(decodedQR);
              devlog(_tx);

              var _utxo = decodedQR.split(':u:')[1].split('-');

              var _formattedUTXO = [];

              for (var i = 0; i < _utxo.length; i++) {
                var _utxoData = _utxo[i].split(':');

                _formattedUTXO.push({
                  txid: _utxoData[0],
                  value: parseInt(_utxoData[1]),
                  vout: parseInt(_utxoData[2])
                });
              }

              _this2.setState({
                qrScanError: false,
                sendTo: _sendTo,
                sendFrom: _changeTo,
                amount: _amount,
                change: _change,
                network: _network,
                utxo: _formattedUTXO
              });
            }
          });
        }
      });
    }

    return scanQR;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        className: "margin-top-20 margin-left-10"
      }, React.createElement("h4", {
        className: "padding-bottom-10"
      }, translate('OFFLINE.OFFLINE_TX_SIG')), React.createElement("button", {
        className: "btn btn-default btn-scan-qr margin-bottom-30",
        onClick: this.scanQR
      }, React.createElement("i", {
        className: "fa fa-qrcode"
      }), translate('SEND.SCAN_QR')), this.state.qrScanError && React.createElement("div", {
        className: "col-lg-12"
      }, React.createElement("div", {
        className: "error margin-top-15"
      }, React.createElement("i", {
        className: "fa fa-warning"
      }), " ", translate('SEND.QR_SCAN_ERR'))), this.state.sendFrom && React.createElement("div", null, React.createElement("div", {
        className: "margin-bottom-20"
      }, React.createElement("div", null, React.createElement("div", null, React.createElement("strong", null, translate('OFFLINE.SEND_FROM'))), this.state.sendFrom), React.createElement("div", {
        className: "margin-top-10"
      }, React.createElement("div", null, React.createElement("strong", null, translate('OFFLINE.SEND_TO'))), this.state.sendTo), React.createElement("div", {
        className: "margin-top-10"
      }, React.createElement("div", null, React.createElement("strong", null, translate('OFFLINE.AMOUNT'))), fromSats(this.state.amount), " ", this.state.network)), React.createElement("hr", null), React.createElement("h5", {
        className: "margin-bottom-25"
      }, translate('OFFLINE.TX_PIN_CONFIRM')), React.createElement("input", {
        type: "password",
        className: "form-control margin-bottom-30",
        name: "pin",
        onChange: this.updateInput,
        placeholder: translate('LOGIN.ENTER_6_DIGIT_PIN'),
        value: this.state.pin || ''
      }), this.state.wrongPin && React.createElement("div", {
        className: "error margin-bottom-25"
      }, React.createElement("i", {
        className: "fa fa-warning"
      }), " ", translate('LOGIN.WRONG_PIN')), React.createElement("button", {
        className: "btn btn-lg btn-primary btn-block ladda-button",
        onClick: this.sign
      }, React.createElement("span", {
        className: "ladda-label"
      }, translate('OFFLINE.CONFIRM'))), this.state.failedToSign && React.createElement("div", {
        className: "error margin-bottom-25 margin-top-20"
      }, React.createElement("i", {
        className: "fa fa-warning"
      }), " ", translate('OFFLINE.TX_SIG_FAIL')), this.state.signedTx && React.createElement("div", {
        className: "margin-top-50 margin-bottom-50"
      }, React.createElement("hr", null), React.createElement(QRCode, {
        value: this.state.signedTx,
        size: 320
      }))));
    }

    return render;
  }();

  return OfflineSigning;
}(React.Component);

module.exportDefault(OfflineSigning);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Overview.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/Overview.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var Spinner;
module.watch(require("./Spinner"), {
  "default": function (v) {
    Spinner = v;
  }
}, 1);
var formatValue;
module.watch(require("./../lib/agama-wallet-lib/build/utils"), {
  formatValue: function (v) {
    formatValue = v;
  }
}, 2);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 3);

var Overview =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Overview, _React$Component);

  function Overview() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.state = {};
    return _this;
  }

  var _proto = Overview.prototype;

  _proto.renderOverview = function () {
    function renderOverview() {
      var _this2 = this;

      if (this.props.overview) {
        var _ret = function () {
          var _overview = _this2.props.overview;
          var _items = [];
          var _totalUSDBalance = 0;
          var _totalBTCBalance = 0;

          for (var i = 0; i < _overview.length; i++) {
            _totalUSDBalance += _overview[i].balanceUSD;
            _totalBTCBalance += _overview[i].balanceBTC;
          }

          var _loop = function (_i) {
            _items.push(React.createElement("div", {
              key: "overview-coins-" + _overview[_i].coin,
              className: "overview-coin",
              onClick: function () {
                return _this2.props.switchCoin(_overview[_i].coin, true);
              }
            }, React.createElement("div", {
              className: "coin-icon"
            }, React.createElement("img", {
              src: "/images/cryptologo/" + _overview[_i].coin + "_icon.svg"
            })), React.createElement("div", {
              className: "coin-details"
            }, React.createElement("div", {
              className: "coin-balance"
            }, Number(_overview[_i].balanceNative).toFixed(4), " ", React.createElement("span", null, " ", _overview[_i].coin.toUpperCase())), React.createElement("div", {
              className: "coin-balance-usd"
            }, Number(_overview[_i].balanceUSD).toFixed(2), " ", React.createElement("span", null, " EUR")))));
          };

          for (var _i = 0; _i < _overview.length; _i++) {
            _loop(_i);
          }

          return {
            v: React.createElement("div", null, React.createElement("div", {
              className: "coins-container"
            }, _items), React.createElement("div", {
              className: "total-coins"
            }, React.createElement("div", {
              className: "yourcoins"
            }, translate('OVERVIEW.YOUR_COINS')), React.createElement("div", {
              className: "coins-value"
            }, " ~ ", Number(_totalUSDBalance).toFixed(2), React.createElement("span", null, " EUR"))), React.createElement("button", {
              key: "manage-coins",
              className: "manage-coins-btn",
              onClick: function () {
                return _this2.props.changeActiveSection('manage_coins');
              }
            }, React.createElement("img", {
              src: "/images/template/home/managecoins_icon.svg"
            }), "manage coins"))
          };
        }();

        if ((0, _typeof2.default)(_ret) === "object") return _ret.v;
      } else {
        return React.createElement(Spinner, null);
      }
    }

    return renderOverview;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        className: "overview-ui"
      }, React.createElement("div", {
        className: "home"
      }, this.props.overview === 'error' && React.createElement("div", {
        className: "con-error"
      }, React.createElement("i", {
        className: "fa fa-warning error"
      }), " ", React.createElement("span", {
        className: "error"
      }, translate('OVERVIEW.PRICES_ERROR'))), this.props.overview !== 'error' && React.createElement("div", {
        className: "home-inner"
      }, this.renderOverview())));
    }

    return render;
  }();

  return Overview;
}(React.Component);

module.exportDefault(Overview);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Pin.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/Pin.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var jsQR;
module.watch(require("jsqr"), {
  "default": function (v) {
    jsQR = v;
  }
}, 1);
var setLocalStorageVar, getLocalStorageVar, convertURIToImageData;
module.watch(require("../actions/utils"), {
  setLocalStorageVar: function (v) {
    setLocalStorageVar = v;
  },
  getLocalStorageVar: function (v) {
    getLocalStorageVar = v;
  },
  convertURIToImageData: function (v) {
    convertURIToImageData = v;
  }
}, 2);
var encryptkey, decryptkey;
module.watch(require("../actions/seedCrypt"), {
  encryptkey: function (v) {
    encryptkey = v;
  },
  decryptkey: function (v) {
    decryptkey = v;
  }
}, 3);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 4);
var devlog, config;
module.watch(require("../actions/dev"), {
  devlog: function (v) {
    devlog = v;
  },
  config: function (v) {
    config = v;
  }
}, 5);

var Pin =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Pin, _React$Component);

  function Pin() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.state = {
      passphrase: config.preload ? config.preload.seed : null,
      passphraseTooShort: false,
      pinOverride: config.preload ? config.preload.pin : null,
      pinOverrideTooShort: false,
      pinSet: false,
      qrScanError: false
    };
    _this.defaultState = JSON.parse(JSON.stringify(_this.state));
    _this.updateInput = _this.updateInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.scanQR = _this.scanQR.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.save = _this.save.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Pin.prototype;

  _proto.updateInput = function () {
    function updateInput(e) {
      var _this$setState;

      this.setState((_this$setState = {}, _this$setState[e.target.name] = e.target.value, _this$setState.passphraseTooShort = false, _this$setState.pinOverrideTooShort = false, _this$setState.qrScanError = false, _this$setState));
    }

    return updateInput;
  }();

  _proto.scanQR = function () {
    function scanQR() {
      var _this2 = this;

      MeteorCamera.getPicture({
        quality: 100
      }, function (error, data) {
        if (error) {
          _this2.setState({
            qrScanError: true
          });

          setTimeout(function () {
            _this2.setState({
              qrScanError: false
            });
          }, 5000);
        } else {
          convertURIToImageData(data).then(function (imageData) {
            var decodedQR = jsQR.decodeQRFromImage(imageData.data, imageData.width, imageData.height);

            if (!decodedQR) {
              _this2.setState({
                qrScanError: true
              });

              setTimeout(function () {
                _this2.setState({
                  qrScanError: false
                });
              }, 5000);
            } else {
              _this2.setState({
                qrScanError: false,
                passphrase: decodedQR
              });
            }
          });
        }
      });
    }

    return scanQR;
  }();

  _proto.save = function () {
    function save() {
      var _this3 = this;

      if (!this.state.passphrase) {
        this.setState({
          passphraseTooShort: true
        });
      } else {
        if (this.state.pinOverride && this.state.pinOverride.length >= 6) {
          var _encryptedKey = encryptkey(this.state.pinOverride, this.state.passphrase);

          setLocalStorageVar('seed', {
            encryptedKey: _encryptedKey
          });
          this.setState({
            pinSet: true,
            pinOverrideTooShort: false,
            qrScanError: false,
            passphraseTooShort: false
          });
          setTimeout(function () {
            _this3.setState(_this3.defaultState);

            _this3.props.changeActiveSection('login');
          }, 500);
        } else {
          this.setState({
            pinOverrideTooShort: true,
            qrScanError: false,
            passphraseTooShort: false
          });
        }
      }
    }

    return save;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        className: "form pin-override"
      }, React.createElement("div", {
        className: "margin-top-40 padding-bottom-30 text-center fs14 sz350"
      }, translate('PIN.PROVIDE_A_SEED')), React.createElement("div", {
        onClick: this.scanQR,
        className: "group3 margin-bottom-20"
      }, React.createElement("div", {
        className: "btn-inner"
      }, React.createElement("div", {
        className: "btn"
      }, translate('SEND.SCAN_QR')), React.createElement("div", {
        className: "group2"
      }, React.createElement("i", {
        className: "fa fa-qrcode"
      })))), this.state.qrScanError && React.createElement("div", {
        className: "error margin-top-5 margin-bottom-15 sz350"
      }, React.createElement("i", {
        className: "fa fa-warning"
      }), " ", translate('SEND.QR_SCAN_ERR')), React.createElement("div", {
        className: "edit margin-bottom-10"
      }, React.createElement("input", {
        type: "password",
        name: "passphrase",
        onChange: this.updateInput,
        placeholder: translate('LOGIN.ENTER_PASSPHRASE') + " " + translate('LOGIN.OR_WIF'),
        value: this.state.passphrase || ''
      })), this.state.passphraseTooShort && React.createElement("div", {
        className: "error margin-top-15 sz350"
      }, React.createElement("i", {
        className: "fa fa-warning"
      }), " ", translate('PIN.PROVIDE_A_PASSPHRASE')), React.createElement("div", {
        className: "margin-bottom-25 margin-top-40 edit"
      }, React.createElement("input", {
        type: "password",
        name: "pinOverride",
        onChange: this.updateInput,
        placeholder: translate('LOGIN.ENTER_6_DIGIT_PIN'),
        value: this.state.pinOverride || ''
      })), this.state.pinOverrideTooShort && React.createElement("div", {
        className: "error margin-top-15 sz350"
      }, React.createElement("i", {
        className: "fa fa-warning"
      }), " ", translate('LOGIN.PIN_TOO_SHORT')), this.state.pinSet && React.createElement("div", {
        className: "margin-bottom-15 margin-top-15 sz350"
      }, translate('PIN.SEED_IS_ENCRYPTED')), React.createElement("div", {
        onClick: this.save,
        className: "group3 margin-top-40"
      }, React.createElement("div", {
        className: "btn-inner"
      }, React.createElement("div", {
        className: "btn"
      }, translate('PIN.SAVE')), React.createElement("div", {
        className: "group2"
      }, React.createElement("i", {
        className: "fa fa-save"
      })))));
    }

    return render;
  }();

  return Pin;
}(React.Component);

module.exportDefault(Pin);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Recovery.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/Recovery.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var getLocalStorageVar;
module.watch(require("../actions/utils"), {
  getLocalStorageVar: function (v) {
    getLocalStorageVar = v;
  }
}, 1);
var decryptkey;
module.watch(require("../actions/seedCrypt"), {
  decryptkey: function (v) {
    decryptkey = v;
  }
}, 2);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 3);
var QRCode;
module.watch(require("qrcode.react"), {
  "default": function (v) {
    QRCode = v;
  }
}, 4);
var devlog, config;
module.watch(require("../actions/dev"), {
  devlog: function (v) {
    devlog = v;
  },
  config: function (v) {
    config = v;
  }
}, 5);
var ToastContainer, ToastStore;
module.watch(require("./../lib/react-toast"), {
  ToastContainer: function (v) {
    ToastContainer = v;
  },
  ToastStore: function (v) {
    ToastStore = v;
  }
}, 6);

var Recovery =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Recovery, _React$Component);

  function Recovery() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.state = {
      passphrase: config.preload ? config.preload.seed : null,
      pin: config.preload ? config.preload.pin : null,
      wrongPin: false
    };
    _this.defaultState = JSON.parse(JSON.stringify(_this.state));
    _this.updateInput = _this.updateInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.decodeSeed = _this.decodeSeed.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.copyKey = _this.copyKey.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Recovery.prototype;

  _proto.componentWillReceiveProps = function () {
    function componentWillReceiveProps(props) {
      if (props.activeSection !== 'recovery' && this.state.passphrase) {
        this.setState(this.defaultState);
      }
    }

    return componentWillReceiveProps;
  }();

  _proto.updateInput = function () {
    function updateInput(e) {
      var _this$setState;

      this.setState((_this$setState = {}, _this$setState[e.target.name] = e.target.value, _this$setState.wrongPin = false, _this$setState));
    }

    return updateInput;
  }();

  _proto.decodeSeed = function () {
    function decodeSeed() {
      var _encryptedKey = getLocalStorageVar('seed');

      var _decryptedKey = decryptkey(this.state.pin, _encryptedKey.encryptedKey);

      if (_decryptedKey) {
        this.setState({
          wrongPin: false,
          pin: null,
          passphrase: _decryptedKey
        });
      } else {
        this.setState({
          wrongPin: true
        });
      }
    }

    return decodeSeed;
  }();

  _proto.copyKey = function () {
    function copyKey() {
      var range = document.createRange();
      range.selectNode(document.getElementById("seed"));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      ToastStore.info("Copied to clipboard", 2000, "toast-message");
    }

    return copyKey;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        className: "form recovery"
      }, React.createElement("div", {
        className: "margin-top-45 text-center pin-label"
      }, translate('RECOVERY.PROVIDE_YOUR_PIN')), React.createElement("div", {
        className: "margin-bottom-25"
      }, React.createElement("div", {
        className: "edit"
      }, React.createElement("input", {
        type: "password",
        className: "form-control",
        name: "pin",
        onChange: this.updateInput,
        placeholder: translate('LOGIN.ENTER_PIN'),
        value: this.state.pin || ''
      })), this.state.wrongPin && React.createElement("div", {
        className: "error margin-top-15 sz350"
      }, React.createElement("i", {
        className: "fa fa-warning"
      }), " ", translate('LOGIN.WRONG_PIN'))), React.createElement("div", {
        disabled: !this.state.pin,
        onClick: this.decodeSeed,
        className: "group3 margin-top-10"
      }, React.createElement("div", {
        className: "btn-inner"
      }, React.createElement("div", {
        className: "btn"
      }, translate('RECOVERY.SHOW')))), this.state.passphrase && React.createElement("div", null, React.createElement("div", {
        className: "textarea-wrap"
      }, React.createElement("textarea", {
        className: "edit-field",
        id: "seed",
        name: "seed",
        style: {
          "height": "80px"
        },
        onChange: this.updateInput,
        value: this.state.passphrase
      }), React.createElement("button", {
        className: "button-copy",
        onClick: this.copyKey
      })), React.createElement("div", {
        className: "text-center margin-top-30"
      }, React.createElement(QRCode, {
        value: this.state.passphrase,
        size: 230
      }))), React.createElement(ToastContainer, {
        store: ToastStore,
        position: ToastContainer.POSITION.BOTTOM_CENTER,
        className: "toast-message"
      }));
    }

    return render;
  }();

  return Recovery;
}(React.Component);

module.exportDefault(Recovery);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SendCoin.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/SendCoin.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var bindActionCreators;
module.watch(require("redux"), {
  bindActionCreators: function (v) {
    bindActionCreators = v;
  }
}, 1);
var connect;
module.watch(require("react-redux"), {
  connect: function (v) {
    connect = v;
  }
}, 2);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 3);
var convertURIToImageData, getLocalStorageVar;
module.watch(require("../actions/utils"), {
  convertURIToImageData: function (v) {
    convertURIToImageData = v;
  },
  getLocalStorageVar: function (v) {
    getLocalStorageVar = v;
  }
}, 4);
var decryptkey;
module.watch(require("../actions/seedCrypt"), {
  decryptkey: function (v) {
    decryptkey = v;
  }
}, 5);
var jsQR;
module.watch(require("jsqr"), {
  "default": function (v) {
    jsQR = v;
  }
}, 6);
var devlog, config;
module.watch(require("../actions/dev"), {
  devlog: function (v) {
    devlog = v;
  },
  config: function (v) {
    config = v;
  }
}, 7);
var fromSats, toSats, formatValue, isNumber;
module.watch(require("./../lib/agama-wallet-lib/build/utils"), {
  fromSats: function (v) {
    fromSats = v;
  },
  toSats: function (v) {
    toSats = v;
  },
  formatValue: function (v) {
    formatValue = v;
  },
  isNumber: function (v) {
    isNumber = v;
  }
}, 8);
var explorerList, isKomodoCoin;
module.watch(require("./../lib/agama-wallet-lib/build/coin-helpers"), {
  explorerList: function (v) {
    explorerList = v;
  },
  isKomodoCoin: function (v) {
    isKomodoCoin = v;
  }
}, 9);
var addressVersionCheck;
module.watch(require("./../lib/agama-wallet-lib/build/keys"), {
  addressVersionCheck: function (v) {
    addressVersionCheck = v;
  }
}, 10);
var electrumServers;
module.watch(require("./../lib/agama-wallet-lib/build/electrum-servers"), {
  "default": function (v) {
    electrumServers = v;
  }
}, 11);
var electrumJSNetworks;
module.watch(require("./../lib/agama-wallet-lib/build/bitcoinjs-networks"), {
  "default": function (v) {
    electrumJSNetworks = v;
  }
}, 12);
var secondsToString;
module.watch(require("../lib/agama-wallet-lib/build/time"), {
  secondsToString: function (v) {
    secondsToString = v;
  }
}, 13);

var SendCoin =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(SendCoin, _React$Component);

  function SendCoin() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.state = {
      sendAmount: config.preload ? config.preload.send.amount : 0,
      sendTo: config.preload ? config.preload.send.address : '',
      sendCurrentStep: 0,
      sendResult: {},
      spvVerificationWarning: false,
      spvPreflightSendInProgress: false,
      spvPreflightResult: null,
      validNan: false,
      validTooMuch: false,
      validIncorrectAddress: false,
      qrScanError: false,
      wrongPin: false,
      pin: config.preload ? config.preload.pin : '',
      processing: false,
      btcFee: 'halfHourFee',
      fee: null
    };
    _this.defaultState = JSON.parse(JSON.stringify(_this.state));
    _this.changeSendCoinStep = _this.changeSendCoinStep.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.updateInput = _this.updateInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.scanQR = _this.scanQR.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.validate = _this.validate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.decodeSeed = _this.decodeSeed.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.openExternalURL = _this.openExternalURL.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.goToDashboard = _this.goToDashboard.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.txSendResultDate = _this.txSendResultDate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = SendCoin.prototype;

  _proto.txSendResultDate = function () {
    function txSendResultDate() {
      // secondsToString(this.state.sendResult.result.timestamp).toUpperCase()
      return "just now";
    }

    return txSendResultDate;
  }();

  _proto.goToDashboard = function () {
    function goToDashboard() {
      this.props.goToDashboard();
    }

    return goToDashboard;
  }();

  _proto.renderTxID = function () {
    function renderTxID() {
      var _txid1 = this.state.sendResult.result.txid.substr(0, 31);

      var _txid2 = this.state.sendResult.result.txid.substr(31, 64);

      return React.createElement("div", null, React.createElement("div", null, _txid1), React.createElement("div", null, _txid2));
    }

    return renderTxID;
  }();

  _proto.decodeSeed = function () {
    function decodeSeed() {
      var _encryptedKey = getLocalStorageVar('seed');

      var _decryptedKey = decryptkey(this.state.pin, _encryptedKey.encryptedKey);

      if (_decryptedKey) {
        this.setState({
          wrongPin: false
        });
        return true;
      } else {
        this.setState({
          wrongPin: true
        });
        return false;
      }
    }

    return decodeSeed;
  }();

  _proto.openExternalURL = function () {
    function openExternalURL(url) {
      window.open(url, '_system');
    }

    return openExternalURL;
  }();

  _proto.scanQR = function () {
    function scanQR() {
      var _this2 = this;

      var width = 480;
      var height = 640;
      MeteorCamera.getPicture({
        quality: 100
      }, function (error, data) {
        if (error) {
          devlog(error);

          _this2.setState({
            qrScanError: true
          });

          setTimeout(function () {
            _this2.setState({
              qrScanError: false
            });
          }, 5000);
        } else {
          convertURIToImageData(data).then(function (imageData) {
            devlog(imageData.data);
            devlog(imageData.height);
            devlog(imageData.width);
            var decodedQR = jsQR.decodeQRFromImage(imageData.data, imageData.width, imageData.height);
            devlog(decodedQR);

            if (!decodedQR) {
              _this2.setState({
                qrScanError: true
              });

              setTimeout(function () {
                _this2.setState({
                  qrScanError: false
                });
              }, 5000);
            } else {
              _this2.setState({
                qrScanError: false,
                sendTo: decodedQR
              });
            }
          });
        }
      });
    }

    return scanQR;
  }();

  _proto.componentWillReceiveProps = function () {
    function componentWillReceiveProps(props) {
      if (props && (props.activeSection !== 'send' || this.props.coin !== props.coin)) {
        // reset form state
        this.setState(this.defaultState);
      }
    }

    return componentWillReceiveProps;
  }();

  _proto.updateInput = function () {
    function updateInput(e) {
      var _this$setState;

      this.setState((_this$setState = {}, _this$setState[e.target.name] = e.target.value, _this$setState.spvVerificationWarning = false, _this$setState.spvPreflightSendInProgress = false, _this$setState.validNan = false, _this$setState.validTooMuch = false, _this$setState.validIncorrectAddress = false, _this$setState.qrScanError = false, _this$setState.wrongPin = false, _this$setState.wrongAddress = false, _this$setState.fee = null, _this$setState));
    }

    return updateInput;
  }();

  _proto.validate = function () {
    function validate() {
      var _isFailed = false;
      var validTooMuch = false;
      var validIncorrectAddress = false;
      var validNan = false;

      if (this.state.sendAmount > this.props.balance.balance) {
        validTooMuch = true;
        _isFailed = true;
      }

      if (!addressVersionCheck(electrumJSNetworks[isKomodoCoin(this.props.coin) ? 'kmd' : this.props.coin], this.state.sendTo) || addressVersionCheck(electrumJSNetworks[isKomodoCoin(this.props.coin) ? 'kmd' : this.props.coin], this.state.sendTo) === 'Invalid pub address') {
        validIncorrectAddress = true;
        _isFailed = true;
      }

      if (!isNumber(this.state.sendAmount)) {
        validNan = true;
        _isFailed = true;
      }

      if (this.state.sendCurrentStep === 1 && (getLocalStorageVar('settings') && getLocalStorageVar('settings').requirePin || config.preload && config.enablePinConfirm) && !this.decodeSeed()) {
        _isFailed = true;
      }

      this.setState({
        validTooMuch: validTooMuch,
        validIncorrectAddress: validIncorrectAddress,
        validNan: validNan
      });
      return _isFailed;
    }

    return validate;
  }();

  _proto.changeSendCoinStep = function () {
    function changeSendCoinStep(step, back) {
      var _this3 = this;

      if (step === 0 && this.props.coin === 'btc') {
        this.props.getBtcFees();
        this.setState({
          btcFee: 'halfHourFee'
        });
      }

      if (back) {
        this.setState({
          sendCurrentStep: step,
          validIncorrectAddress: false,
          validTooMuch: false,
          validNan: false,
          pin: '',
          wrongPin: false,
          fee: null
        });
      } else {
        if (!this.validate()) {
          switch (step) {
            case 0:
              this.setState(this.defaultState);
              break;

            case 1:
              this.setState({
                spvPreflightSendInProgress: true,
                currentStep: step
              }); // spv pre tx push request

              this.props.sendtx(this.props.coin, this.state.sendTo, Math.abs(toSats(this.state.sendAmount)), true, false, this.props.coin === 'btc' ? this.props.btcFees[this.state.btcFee] : null).then(function (sendPreflight) {
                if (sendPreflight && sendPreflight.msg === 'success') {
                  _this3.setState({
                    spvVerificationWarning: !sendPreflight.result.utxoVerified,
                    spvPreflightSendInProgress: false,
                    spvPreflightResult: sendPreflight
                  });
                } else {
                  _this3.setState({
                    spvPreflightSendInProgress: false,
                    spvPreflightResult: sendPreflight
                  });
                }
              });
              this.setState({
                sendCurrentStep: 1
              });
              break;

            case 2:
              this.setState({
                sendCurrentStep: 2,
                processing: true
              });
              this.props.sendtx(this.props.coin, this.state.sendTo, Math.abs(toSats(this.state.sendAmount)), null, true, this.props.coin === 'btc' ? this.props.btcFees[this.state.btcFee] : null).then(function (res) {
                devlog('sendtx result');
                devlog(res);

                _this3.setState({
                  sendResult: res,
                  processing: false
                });
              });
              break;
          }
        }
      }
    }

    return changeSendCoinStep;
  }();

  _proto.sendFormRender = function () {
    function sendFormRender() {
      var _this4 = this;

      return React.createElement("form", {
        method: "post",
        autoComplete: "off"
      }, React.createElement("div", {
        className: "sender-details"
      }, React.createElement("div", {
        className: "address"
      }, React.createElement("div", {
        className: "label"
      }, translate('SEND.FROM')), React.createElement("div", {
        className: "value"
      }, this.props.address)), React.createElement("div", {
        className: "balance"
      }, React.createElement("div", {
        className: "label"
      }, translate('SEND.BALANCE')), React.createElement("div", {
        className: "value"
      }, formatValue(this.props.balance.balance), " ", this.props.coin.toUpperCase()))), React.createElement("div", {
        className: "margin-top-40"
      }, React.createElement("label", {
        className: "section-label",
        htmlFor: "kmdWalletSendTo"
      }, translate('SEND.TO')), React.createElement("div", {
        className: "receiver-details"
      }, React.createElement("input", {
        type: "text",
        className: "form-control",
        name: "sendTo",
        onChange: this.updateInput,
        value: this.state.sendTo,
        id: "kmdWalletSendTo",
        placeholder: translate('SEND.ENTER_AN_ADDRESS'),
        autoComplete: "off",
        required: true
      }), React.createElement("div", {
        onClick: this.scanQR,
        className: "scan-qr"
      }, React.createElement("i", {
        className: "fa fa-qrcode"
      }))), this.state.validIncorrectAddress && React.createElement("div", {
        className: "error"
      }, React.createElement("i", {
        className: "fa fa-warning"
      }), " ", translate('SEND.ADDRESS_IS_INCORECT')), this.state.qrScanError && React.createElement("div", {
        className: "error"
      }, React.createElement("i", {
        className: "fa fa-warning"
      }), " ", translate('SEND.QR_SCAN_ERR'))), React.createElement("div", {
        className: "margin-top-40"
      }, React.createElement("label", {
        className: "section-label",
        htmlFor: "kmdWalletAmount"
      }, translate('SEND.AMOUNT')), React.createElement("div", {
        className: "transaction-amount"
      }, React.createElement("input", {
        type: "text",
        className: "form-control",
        name: "sendAmount",
        value: this.state.sendAmount !== 0 ? this.state.sendAmount : '',
        onChange: this.updateInput,
        id: "kmdWalletAmount",
        placeholder: '0.000 ' + this.props.coin.toUpperCase(),
        autoComplete: "off"
      })), this.state.validNan && React.createElement("div", {
        className: "error"
      }, React.createElement("i", {
        className: "fa fa-warning"
      }), " ", translate('SEND.NAN')), this.state.validTooMuch && React.createElement("div", {
        className: "error"
      }, React.createElement("i", {
        className: "fa fa-warning"
      }), " ", translate('SEND.TOO_MUCH', this.props.balance.balance + " " + this.props.coin.toUpperCase()))), this.props.coin === 'btc' && this.props.btcFees && this.props.btcFee !== 'error' && React.createElement("div", {
        className: "margin-top-40"
      }, React.createElement("label", {
        className: "section-label",
        htmlFor: "btcTransactionFee"
      }, translate('SEND.FEE')), React.createElement("div", null, React.createElement("div", {
        className: "btc-transaction-fee"
      }, React.createElement("select", {
        className: "fee-select",
        name: "btcFee",
        id: "btcTransactionFee",
        value: this.state.btcFee,
        onChange: function (event) {
          return _this4.updateInput(event);
        }
      }, React.createElement("option", {
        value: "fastestFee"
      }, translate('SEND.BTC_FEE_FAST')), React.createElement("option", {
        value: "halfHourFee"
      }, translate('SEND.BTC_FEE_AVG')), React.createElement("option", {
        value: "hourFee"
      }, translate('SEND.BTC_FEE_SLOW')))))), this.props.coin === 'btc' && !this.props.btcFees && React.createElement("div", {
        className: "margin-top-40 text-center"
      }, translate('SEND.BTC_FEES_FETCHING')), this.props.coin === 'btc' && this.props.btcFees && this.props.btcFees === 'error' && React.createElement("div", {
        className: "error"
      }, translate('SEND.BTC_FEES_FETCHING_FAILED')), React.createElement("div", {
        disabled: !this.state.sendTo || !this.state.sendAmount || this.props.coin === 'btc' && (!this.props.btcFees || this.props.btcFees === 'error'),
        onClick: function () {
          return _this4.changeSendCoinStep(1);
        },
        className: "send-step-btn-container"
      }, React.createElement("img", {
        className: "",
        src: "/images/template/transactions/send_icon.svg"
      }), translate('SEND.SEND').toUpperCase()));
    }

    return sendFormRender;
  }();

  _proto.render = function () {
    function render() {
      var _this5 = this;

      if (this.props.activeSection === 'send') {
        return React.createElement("div", {
          className: "send-ui"
        }, React.createElement("div", {
          className: "steps-container"
        }, React.createElement("img", {
          src: "/images/template/transactions/progress" + (this.state.sendCurrentStep + 1) + "_icon.svg"
        })), React.createElement("div", {
          className: "form send"
        }, React.createElement("div", {
          className: 'send-step' + (this.state.sendCurrentStep === 0 ? '' : ' hide')
        }, React.createElement("div", {
          className: "send-step1"
        }, this.sendFormRender())), React.createElement("div", {
          className: 'send-step' + (this.state.sendCurrentStep === 1 ? '' : ' hide')
        }, React.createElement("div", {
          className: "send-step2"
        }, React.createElement("div", {
          className: "section-label"
        }, translate('SEND.TO')), React.createElement("div", {
          className: "receiver-address margin-bottom-25"
        }, this.state.sendTo), React.createElement("div", {
          className: "section-label"
        }, translate('SEND.AMOUNT')), React.createElement("div", {
          className: "send-amount margin-bottom-25"
        }, React.createElement("strong", null, this.state.sendAmount, " "), " ", this.props.coin.toUpperCase()), this.state.spvPreflightResult && this.state.spvPreflightResult.msg === 'success' && React.createElement("div", null, React.createElement("div", {
          className: "section-label"
        }, translate('SEND.FEE')), React.createElement("div", {
          className: "transaction-fee margin-bottom-25"
        }, React.createElement("strong", null, Number(fromSats(this.state.spvPreflightResult.result.fee)), " "), " ", this.props.coin.toUpperCase()), React.createElement("div", {
          className: "section-label"
        }, translate('SEND.TOTAL')), React.createElement("div", {
          className: "transaction-total margin-bottom-40"
        }, React.createElement("strong", null, Number(fromSats(this.state.spvPreflightResult.result.value)) + Number(fromSats(this.state.spvPreflightResult.result.fee)), " "), " ", this.props.coin.toUpperCase())), (getLocalStorageVar('settings') && getLocalStorageVar('settings').requirePin || config.preload && config.enablePinConfirm) && React.createElement("div", {
          className: "pin-confirm"
        }, React.createElement("input", {
          type: "password",
          className: "form-control",
          name: "pin",
          value: this.state.pin,
          onChange: this.updateInput,
          placeholder: translate('SEND.ENTER_YOUR_PIN'),
          autoComplete: "off"
        }), this.state.wrongPin && React.createElement("div", {
          className: "error"
        }, React.createElement("i", {
          className: "fa fa-warning"
        }), " ", translate('LOGIN.WRONG_PIN'))), this.state.spvPreflightSendInProgress && React.createElement("div", {
          className: "padding-top-20 fs14 text-center"
        }, translate('SEND.SPV_VERIFYING'), "..."), this.state.spvVerificationWarning && React.createElement("div", {
          className: "padding-top-20 fs14 lh25"
        }, React.createElement("i", {
          className: "fa fa-warning warning"
        }), " ", React.createElement("strong", {
          className: "warning"
        }, translate('SEND.WARNING'), ":"), " ", translate('SEND.WARNING_SPV_P1'), React.createElement("br", null), translate('SEND.WARNING_SPV_P2')), React.createElement("div", {
          className: "send-step-btn-container"
        }, React.createElement("div", {
          onClick: function () {
            return _this5.changeSendCoinStep(0, true);
          },
          className: "back-btn"
        }, translate('SEND.BACK').toUpperCase()), React.createElement("div", {
          onClick: function () {
            return _this5.changeSendCoinStep(2);
          },
          className: "send-btn"
        }, React.createElement("img", {
          className: "",
          src: "/images/template/transactions/send_icon.svg"
        }), translate('SEND.SEND').toUpperCase())))), React.createElement("div", {
          className: 'send-step' + (this.state.sendCurrentStep === 2 ? '' : ' hide')
        }, React.createElement("div", {
          className: "send-step3"
        }, React.createElement("div", {
          className: "send-result"
        }, React.createElement("div", {
          className: "section-label"
        }, translate('SEND.FROM')), React.createElement("div", {
          className: "sender-address margin-bottom-25"
        }, this.props.address), React.createElement("div", {
          className: "section-label"
        }, translate('SEND.TO')), React.createElement("div", {
          className: "receiver-address margin-bottom-25"
        }, this.state.sendTo), React.createElement("div", {
          className: "section-label"
        }, translate('SEND.AMOUNT')), React.createElement("div", {
          className: "send-amount margin-bottom-25"
        }, React.createElement("strong", null, this.state.sendAmount, " "), " ", this.props.coin.toUpperCase()), this.state.sendResult && this.state.sendResult.result && this.state.sendResult.result.txid && React.createElement("div", {
          className: "transactions-list"
        }, React.createElement("div", {
          className: "section-label success"
        }, translate('SEND.SUCCESS')), React.createElement("div", {
          onClick: function () {
            return _this5.openExternalURL(explorerList[_this5.props.coin.toUpperCase()] + "/tx/" + _this5.state.sendResult.result.txid);
          },
          className: "item sent"
        }, React.createElement("div", {
          className: "direction"
        }, React.createElement("div", {
          className: "transaction-direction"
        }, React.createElement("img", {
          className: "transaction-arrow",
          src: "/images/template/transactions/out_icon.svg"
        }), translate('TRANSACTIONS.OUT').toUpperCase())), React.createElement("div", {
          className: "date"
        }, this.txSendResultDate()), React.createElement("div", {
          className: "amount-native"
        }, this.state.sendAmount), React.createElement("div", {
          className: "right-arrow"
        }, React.createElement("img", {
          src: "/images/template/transactions/rightarrow_icon.svg"
        }))))), (!this.state.sendResult || this.state.processing) && React.createElement("div", {
          className: "send-result"
        }, translate('SEND.PROCESSING_TX')), this.state.sendResult && this.state.sendResult.msg && this.state.sendResult.msg === 'error' && React.createElement("div", {
          className: "send-result"
        }, React.createElement("div", {
          className: "error"
        }, translate('SEND.ERROR'), " ", React.createElement("i", {
          className: "fa fa-close"
        })), React.createElement("div", {
          className: "padding-bottom-15"
        }, React.createElement("div", {
          className: "shade"
        }, this.state.sendResult.result), this.state.sendResult.raw && this.state.sendResult.raw.txid && React.createElement("div", {
          className: "shade"
        }, this.state.sendResult.raw.txid.replace(/\[.*\]/, '')))), React.createElement("div", {
          disabled: !this.state.sendResult || this.state.processing,
          onClick: function () {
            return _this5.goToDashboard();
          },
          className: "margin-top-50"
        }, React.createElement("div", {
          className: "go-to-dashboard-btn"
        }, translate('DASHBOARD.DASHBOARD').toUpperCase()))))));
      } else {
        return null;
      }
    }

    return render;
  }();

  return SendCoin;
}(React.Component);

module.exportDefault(SendCoin);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ServerSelect.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/ServerSelect.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 1);

var ServerSelect =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ServerSelect, _React$Component);

  function ServerSelect() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.state = {
      electrumServer: '',
      serverList: [],
      selectedOption: '',
      errorTestingServer: false,
      connecting: false
    };
    _this.updateInput = _this.updateInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setElectrumServer = _this.setElectrumServer.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = ServerSelect.prototype;

  _proto.componentWillMount = function () {
    function componentWillMount() {
      var _this2 = this;

      this.props.getServersList().then(function (res) {
        var _coin = _this2.props.coin;

        _this2.setState({
          selectedOption: res[_coin].ip + ':' + res[_coin].port + ':' + res[_coin].proto,
          electrumServer: res[_coin].ip + ':' + res[_coin].port + ':' + res[_coin].proto,
          serverList: res[_coin].serverList
        });
      });
    }

    return componentWillMount;
  }();

  _proto.updateInput = function () {
    function updateInput(e) {
      var _this$setState;

      this.setState((_this$setState = {}, _this$setState[e.target.name] = e.target.value, _this$setState.errorTestingServer = false, _this$setState.connecting = false, _this$setState));
    }

    return updateInput;
  }();

  _proto.setElectrumServer = function () {
    function setElectrumServer() {
      var _this3 = this;

      var _server = this.state.selectedOption.split(':');

      this.props.setDefaultServer(this.props.coin, _server[1], _server[0]).then(function (res) {
        if (res === 'error') {
          _this3.setState({
            errorTestingServer: true,
            connecting: false
          });
        } else {
          _this3.setState({
            errorTestingServer: false,
            connecting: true
          });

          _this3.props.dashboardRefresh();
        }
      });
    }

    return setElectrumServer;
  }();

  _proto.renderServerListSelectorOptions = function () {
    function renderServerListSelectorOptions() {
      var _items = [];
      var _spvServers = this.state.serverList;

      for (var i = 0; i < _spvServers.length; i++) {
        _items.push(React.createElement("option", {
          key: "spv-server-list-" + i,
          value: "" + _spvServers[i]
        }, "" + _spvServers[i]));
      }

      return _items;
    }

    return renderServerListSelectorOptions;
  }();

  _proto.render = function () {
    function render() {
      var _this4 = this;

      return React.createElement("div", {
        className: "margin-top-40 form server-select"
      }, React.createElement("div", {
        className: "bold text-center"
      }, React.createElement("i", {
        className: "fa fa-warning error"
      }), " ", React.createElement("span", {
        className: "error"
      }, translate('DASHBOARD.CON_ERROR', this.props.coin.toUpperCase()))), React.createElement("div", {
        className: "server-select-inner"
      }, React.createElement("div", null, React.createElement("select", {
        className: "form-control form-material",
        name: "selectedOption",
        value: this.state.selectedOption,
        onChange: function (event) {
          return _this4.updateInput(event);
        },
        autoFocus: true
      }, this.renderServerListSelectorOptions())), this.state.errorTestingServer && React.createElement("div", {
        className: "error margin-top-10 margin-bottom-10 text-center"
      }, translate('DASHBOARD.ERROR_TESTING_SERVER', this.state.selectedOption)), this.state.connecting && React.createElement("div", {
        className: "margin-top-20 margin-bottom-10 text-center"
      }, translate('DASHBOARD.CONNECTING_TO_NEW_SERVER')), React.createElement("div", {
        onClick: this.setElectrumServer,
        className: "group3 margin-top-50"
      }, React.createElement("div", {
        className: "btn-inner"
      }, React.createElement("div", {
        className: "btn"
      }, translate('DASHBOARD.SWITCH_SERVER')), React.createElement("div", {
        className: "group2"
      }, React.createElement("i", {
        className: "fa fa-eye"
      }))))));
    }

    return render;
  }();

  return ServerSelect;
}(React.Component);

module.exportDefault(ServerSelect);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Settings.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/Settings.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var setLocalStorageVar, getLocalStorageVar;
module.watch(require("../actions/utils"), {
  setLocalStorageVar: function (v) {
    setLocalStorageVar = v;
  },
  getLocalStorageVar: function (v) {
    getLocalStorageVar = v;
  }
}, 1);
var encryptkey, decryptkey;
module.watch(require("../actions/seedCrypt"), {
  encryptkey: function (v) {
    encryptkey = v;
  },
  decryptkey: function (v) {
    decryptkey = v;
  }
}, 2);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 3);
// TODO: reset settings/purge seed and pin
var SETTINGS_SAVED_MSG_TIMEOUT = 5000;

var Settings =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Settings, _React$Component);

  function Settings() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.state = {
      autoLockTimeout: 60000,
      requirePin: false,
      isSaved: false
    };
    _this.updateInput = _this.updateInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.toggleConfirmPin = _this.toggleConfirmPin.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.save = _this.save.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Settings.prototype;

  _proto.componentWillMount = function () {
    function componentWillMount() {
      var _settings = getLocalStorageVar('settings');

      if (_settings) {
        this.setState({
          autoLockTimeout: _settings.autoLockTimeout,
          requirePin: _settings.requirePin
        });
      }
    }

    return componentWillMount;
  }();

  _proto.updateInput = function () {
    function updateInput(e) {
      var _this$setState;

      this.setState((_this$setState = {}, _this$setState[e.target.name] = e.target.value, _this$setState));
    }

    return updateInput;
  }();

  _proto.toggleConfirmPin = function () {
    function toggleConfirmPin() {
      this.setState({
        requirePin: !this.state.requirePin
      });
    }

    return toggleConfirmPin;
  }();

  _proto.save = function () {
    function save() {
      var _this2 = this;

      setLocalStorageVar('settings', {
        autoLockTimeout: this.state.autoLockTimeout,
        requirePin: this.state.requirePin
      });
      this.setState({
        isSaved: true
      });
      setTimeout(function () {
        _this2.setState({
          isSaved: false
        });
      }, SETTINGS_SAVED_MSG_TIMEOUT);
    }

    return save;
  }();

  _proto.render = function () {
    function render() {
      var _this3 = this;

      return React.createElement("div", {
        className: "form settings"
      }, React.createElement("div", {
        className: "margin-top-10 item"
      }, React.createElement("div", {
        className: "select-label"
      }, translate('SETTINGS.AUTOLOCK_TIMEOUT')), React.createElement("div", {
        className: "selectWrapper"
      }, React.createElement("select", {
        className: "form-control form-material",
        name: "autoLockTimeout",
        value: this.state.autoLockTimeout,
        onChange: function (event) {
          return _this3.updateInput(event);
        },
        autoFocus: true
      }, React.createElement("option", {
        value: "600000",
        className: "select-option"
      }, "10 ", translate('SETTINGS.MINUTES')), React.createElement("option", {
        value: "1200000"
      }, "20 ", translate('SETTINGS.MINUTES')), React.createElement("option", {
        value: "1800000"
      }, "30 ", translate('SETTINGS.MINUTES'))))), React.createElement("div", {
        className: "item confirm_pin_wrapper"
      }, React.createElement("label", {
        className: "switch"
      }, React.createElement("input", {
        type: "checkbox",
        value: "on",
        checked: this.state.requirePin
      }), React.createElement("div", {
        className: "slider",
        onClick: this.toggleConfirmPin
      })), React.createElement("div", {
        className: "toggle-label confirm_pin_label " + (this.state.requirePin ? 'active' : ''),
        onClick: this.toggleConfirmPin
      }, translate('SETTINGS.REQUIRE_PIN_CONFIRM'))), this.state.isSaved && React.createElement("div", {
        className: "padding-bottom-20 text-center success"
      }, translate('SETTINGS.SAVED')), React.createElement("div", {
        onClick: this.save,
        className: "group3 margin-top-10"
      }, React.createElement("div", {
        className: "btn-inner"
      }, React.createElement("div", {
        className: "btn"
      }, translate('SETTINGS.SAVE')))), React.createElement("div", {
        onClick: function () {
          return _this3.props.onRecovery();
        },
        className: "group3 margin-top-10"
      }, React.createElement("div", {
        className: "btn-inner"
      }, React.createElement("div", {
        className: "btn"
      }, translate('SETTINGS.RECOVER')))), React.createElement("div", {
        onClick: function () {
          return _this3.props.onLogout();
        },
        className: "group3 margin-top-10"
      }, React.createElement("div", {
        className: "btn-inner"
      }, React.createElement("div", {
        className: "btn"
      }, translate('SETTINGS.LOGOUT')))));
    }

    return render;
  }();

  return Settings;
}(React.Component);

module.exportDefault(Settings);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Spinner.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/Spinner.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);

var Spinner =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Spinner, _React$Component);

  function Spinner() {
    return _React$Component.call(this) || this;
  }

  var _proto = Spinner.prototype;

  _proto.render = function () {
    function render() {
      var _paths = [];

      for (var i = 0; i < 4; i++) {
        _paths.push(React.createElement("circle", {
          className: i === 0 ? 'path' : "path" + (i + 1),
          cx: "50",
          cy: "50",
          r: "20",
          fill: "none",
          strokeWidth: "5",
          strokeMiterlimit: "10",
          key: "spinner-circle-" + i
        }));
      }

      return React.createElement("div", {
        className: "loader"
      }, React.createElement("svg", {
        className: "circle"
      }, _paths));
    }

    return render;
  }();

  return Spinner;
}(React.Component);

module.exportDefault(Spinner);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SplashScreen.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/SplashScreen.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React, Component;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  },
  Component: function (v) {
    Component = v;
  }
}, 0);
var getLocalStorageVar;
module.watch(require("../actions/utils"), {
  getLocalStorageVar: function (v) {
    getLocalStorageVar = v;
  }
}, 1);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 2);

var SplashScreen =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(SplashScreen, _Component);

  function SplashScreen(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.renderLoginButton = function (goToLogin) {
      // check if we have the existing seed value for login
      var _encryptedKey = getLocalStorageVar('seed');

      if (_encryptedKey) {
        return React.createElement("button", {
          className: "button action",
          onClick: function () {
            return goToLogin();
          }
        }, "login with pin");
      }

      return null;
    };

    return _this;
  }

  var _proto = SplashScreen.prototype;

  _proto.render = function () {
    function render() {
      var _this$props = this.props,
          goToLogin = _this$props.goToLogin,
          goToAddCoin = _this$props.goToAddCoin,
          goToCreateSeedPage = _this$props.goToCreateSeedPage,
          goToCreateRecoverSeedPage = _this$props.goToCreateRecoverSeedPage;
      var styles = {// backgroundColor: "#f68d1f",
        // height: "100%",
      };
      return React.createElement("div", {
        className: "container",
        style: styles
      }, React.createElement("img", {
        className: "img_wrap",
        src: "/images/pungo_logo_splash.svg",
        width: 180,
        height: 90
      }), React.createElement("div", {
        className: "form-wrap"
      }, this.renderLoginButton(goToLogin), React.createElement("button", {
        className: "button action",
        onClick: function () {
          return goToCreateSeedPage();
        }
      }, translate('LOGIN.CREATE_WALLET').toUpperCase()), React.createElement("button", {
        className: "button action",
        onClick: function () {
          return goToCreateRecoverSeedPage();
        }
      }, translate('LOGIN.RECOVER_WALLET').toUpperCase())));
    }

    return render;
  }();

  return SplashScreen;
}(Component);

module.exportDefault(SplashScreen);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Transactions.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/components/Transactions.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var formatValue;
module.watch(require("./../lib/agama-wallet-lib/build/utils"), {
  formatValue: function (v) {
    formatValue = v;
  }
}, 1);
var secondsToString;
module.watch(require("./../lib/agama-wallet-lib/build/time"), {
  secondsToString: function (v) {
    secondsToString = v;
  }
}, 2);
var explorerList, isKomodoCoin;
module.watch(require("./../lib/agama-wallet-lib/build/coin-helpers"), {
  explorerList: function (v) {
    explorerList = v;
  },
  isKomodoCoin: function (v) {
    isKomodoCoin = v;
  }
}, 3);
var translate;
module.watch(require("../translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 4);
var Spinner;
module.watch(require("./Spinner"), {
  "default": function (v) {
    Spinner = v;
  }
}, 5);
var QRCode;
module.watch(require("qrcode.react"), {
  "default": function (v) {
    QRCode = v;
  }
}, 6);
var ToastContainer, ToastStore;
module.watch(require("./../lib/react-toast"), {
  ToastContainer: function (v) {
    ToastContainer = v;
  },
  ToastStore: function (v) {
    ToastStore = v;
  }
}, 7);

var Transactions =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Transactions, _React$Component);

  function Transactions() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.state = {
      toggledTxDetails: null,
      showQR: false
    };
    _this.toggleTxDetails = _this.toggleTxDetails.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.openExternalURL = _this.openExternalURL.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.isInterestDefined = _this.isInterestDefined.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.toggleQR = _this.toggleQR.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.toggleHome = _this.toggleHome.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.showClaimButton = _this.showClaimButton.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.copyKey = _this.copyKey.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Transactions.prototype;

  _proto.copyKey = function () {
    function copyKey() {
      var range = document.createRange();
      range.selectNode(document.getElementById("hash-value"));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      ToastStore.info("Copied to clipboard", 2000, "toast-message");
    }

    return copyKey;
  }();

  _proto.toggleHome = function () {
    function toggleHome() {
      this.setState({
        showQR: false
      });
      this.props.dashboardRefresh();
      ToastStore.info("Synchronized", 2000, "toast-message");
    }

    return toggleHome;
  }();

  _proto.toggleQR = function () {
    function toggleQR() {
      this.setState({
        showQR: !this.state.showQR
      });
    }

    return toggleQR;
  }();

  _proto.showClaimButton = function () {
    function showClaimButton() {
      if (this.props.coin === 'kmd' && this.props.balance && this.props.balance.interest && this.props.balance.interest > 0) {
        return true;
      }
    }

    return showClaimButton;
  }();

  _proto.showSendButton = function () {
    function showSendButton() {
      if (this.props.balance && this.props.balance.balance && this.props.balance.balance > 0) {
        return true;
      }
    }

    return showSendButton;
  }();

  _proto.isInterestDefined = function () {
    function isInterestDefined() {
      if (this.props.balance && this.props.balance.interest && this.props.balance.interest > 0) {
        return true;
      }
    }

    return isInterestDefined;
  }();

  _proto.componentWillReceiveProps = function () {
    function componentWillReceiveProps(props) {
      if (props.coin !== this.props.coin) {
        this.setState({
          toggledTxDetails: null
        });
      }
    }

    return componentWillReceiveProps;
  }();

  _proto.toggleTxDetails = function () {
    function toggleTxDetails(index) {
      this.setState({
        toggledTxDetails: index === this.state.toggledTxDetails ? null : index
      });
    }

    return toggleTxDetails;
  }();

  _proto.openExternalURL = function () {
    function openExternalURL(url) {
      window.open(url, '_system');
    }

    return openExternalURL;
  }();

  _proto.renderTxAmount = function () {
    function renderTxAmount(tx, amountOnly) {
      var _amountNegative;

      if (tx.category === 'send' || tx.category === 'sent' || tx.type === 'send' || tx.type === 'sent') {
        _amountNegative = -1;
      } else {
        _amountNegative = 1;
      }

      if (Number(tx.interest) === Number(tx.amount)) {
        _amountNegative = -1;
      }

      return React.createElement("span", null, Number(tx.interest) === Number(tx.amount) && React.createElement("span", null, "+"), tx.amount * _amountNegative || translate('TRANSACTIONS.UNKNOWN'), " ", Number(tx.amount) === 0 ? '' : '', tx.interest && !amountOnly && Number(tx.interest) !== Number(tx.amount) && React.createElement("div", {
        className: "tx-interest"
      }, "+", formatValue(Math.abs(tx.interest))));
    }

    return renderTxAmount;
  }();

  _proto.renderSendReceiveBtn = function () {
    function renderSendReceiveBtn() {
      var _this2 = this;

      return (
        /*<div className={'send-receive-block' + (this.showClaimButton() ? ' three-btn' : '')}>*/
        React.createElement("div", {
          className: "send-receive-block"
        }, React.createElement("div", {
          className: "send-receive-block-inner"
        }, React.createElement("button", {
          disabled: !this.showSendButton(),
          type: "button",
          onClick: function () {
            return _this2.props.changeActiveSection('send');
          },
          className: "btn send-btn"
        }, React.createElement("img", {
          className: "",
          src: "/images/template/transactions/send_icon.svg"
        }), " ", translate('DASHBOARD.SEND').toUpperCase()), React.createElement("button", {
          type: "button",
          className: "btn receive-btn " + (this.state.showQR ? 'active' : ''),
          onClick: this.toggleQR
        }, React.createElement("img", {
          className: "",
          src: "/images/template/transactions/receive_icon.svg"
        }), " ", translate('DASHBOARD.RECEIVE').toUpperCase()), React.createElement("button", {
          type: "button",
          className: "btn sync-btn",
          onClick: this.toggleHome
        }, React.createElement("img", {
          className: "",
          src: "/images/template/transactions/sync_icon.svg"
        }), " ", translate('DASHBOARD.SYNC').toUpperCase())), this.state.showQR && React.createElement("div", {
          className: "qr-code-container"
        }, React.createElement("div", {
          className: "receive-qr"
        }, this.props.address && React.createElement("div", null, React.createElement(QRCode, {
          value: this.props.address,
          size: 198
        })))))
      );
    }

    return renderSendReceiveBtn;
  }();

  _proto.render = function () {
    function render() {
      var _this3 = this;

      if (this.props.activeSection === 'dashboard') {
        var _ret = function () {
          var _transactions = _this3.props.transactions;
          var _items = [];
          console.log(_this3.props);

          if (_transactions) {
            var _loop = function (i) {
              _items.push(React.createElement("div", {
                onClick: function () {
                  return _this3.openExternalURL(explorerList[_this3.props.coin.toUpperCase()] + "/tx/" + _transactions[i].txid);
                },
                className: "item " + (_transactions[i].interest && Math.abs(_transactions[i].interest) > 0 ? 'received' : _transactions[i].type),
                key: "transaction-" + i
              }, React.createElement("div", {
                className: "direction"
              }, React.createElement("div", {
                className: "transaction-direction"
              }, React.createElement("img", {
                className: "transaction-arrow",
                src: "/images/template/transactions/" + (_transactions[i].type === 'received' ? 'in' : 'out') + "_icon.svg"
              }), _transactions[i].type === 'received' ? translate('TRANSACTIONS.IN').toUpperCase() : translate('TRANSACTIONS.OUT').toUpperCase())), React.createElement("div", {
                className: "date"
              }, secondsToString(_transactions[i].timestamp).toUpperCase()), React.createElement("div", {
                className: "amount-native"
              }, _this3.renderTxAmount(_transactions[i])), React.createElement("div", {
                className: "right-arrow"
              }, React.createElement("img", {
                src: "/images/template/transactions/rightarrow_icon.svg"
              }))));
              /*_items.push(
                <div
                  className="txlist-transaction"
                  key={ `transaction-${i}` }>
                  <div>
                    { this.renderTxType(_transactions[i].type) }
                    <span className="margin-left-20">{ this.renderTxAmount(_transactions[i]) }</span>
                    <span className="margin-left-20">{ secondsToString(_transactions[i].timestamp) }</span>
                    <span
                      onClick={ () => this.toggleTxDetails(i) }
                      className={ 'details-toggle fa ' + (this.state.toggledTxDetails === i ? 'fa-caret-up' : 'fa-caret-down') }></span>
                  </div>
                  { this.state.toggledTxDetails !== i &&
                    <div className="margin-top-10 padding-bottom-10 txid-hash">
                    { _transactions[i].txid }
                    </div>
                  }
                  { this.state.toggledTxDetails === i &&
                    <div className="margin-top-10 padding-bottom-10 tx-details">
                      <div>{ translate('TRANSACTIONS.DIRECTION') }: { _transactions[i].type }</div>
                      <div>{ translate('TRANSACTIONS.AMOUNT') }: { this.renderTxAmount(_transactions[i], true) } { this.props.coin.toUpperCase() }</div>
                      { _transactions[i].interest &&
                        Math.abs(_transactions[i].interest) > 0 &&
                        <div>{ translate('TRANSACTIONS.INTEREST') }: { formatValue(Math.abs(_transactions[i].interest)) } KMD</div>
                      }
                      <div>{ translate('TRANSACTIONS.CONFIRMATIONS') }: { _transactions[i].confirmations }</div>
                      { this.props.coin === 'kmd' &&
                        <div>Locktime: { _transactions[i].locktime }</div>
                      }
                      <div>
                      { translate('TRANSACTIONS.TIME') }: { secondsToString(_transactions[i].timestamp) }
                        { isKomodoCoin(this.props.coin) &&
                          <button
                            onClick={ () => this.openExternalURL(`${explorerList[this.props.coin.toUpperCase()]}/tx/${_transactions[i].txid}`) }
                            className="margin-left-20 btn btn-sm white btn-dark waves-effect waves-light ext-link">
                            <i className="fa fa-external-link"></i>Explorer
                          </button>
                        }
                      </div>
                      <div>
                      { translate('TRANSACTIONS.TX_HASH') } <div className="txid-hash">{ _transactions[i].txid }</div>
                      </div>
                    </div>
                  }
                </div>
              );*/

            };

            for (var i = 0; i < _transactions.length; i++) {
              _loop(i);
            }
          }

          return {
            v: React.createElement("div", {
              className: "transactions-ui"
            }, React.createElement("div", {
              className: "individualportfolio"
            }, React.createElement("div", {
              className: "coin-address-container"
            }, React.createElement("div", {
              className: "section-label"
            }, _this3.props.coin.toUpperCase(), " ", translate('TRANSACTIONS.COIN_ADDRESS')), React.createElement("div", {
              className: "coin-hash"
            }, React.createElement("div", {
              id: "hash-value",
              className: "hash-value"
            }, _this3.props.address), React.createElement("div", {
              className: "copy-hash"
            }, React.createElement("button", {
              type: "button",
              className: "btn copy-icon",
              onClick: _this3.copyKey
            }, React.createElement("img", {
              src: "images/template/transactions/copy_icon.svg"
            }))))), React.createElement("div", {
              className: "individualportfolio-inner"
            }, React.createElement("div", {
              className: "coin-balance-container"
            }, React.createElement("div", {
              className: "section-label"
            }, translate('BALANCE.BALANCE')), React.createElement("div", {
              className: "coin-balance-value"
            }, React.createElement("strong", null, _this3.props.balance ? _this3.props.balance.balance : 0), " ", _this3.props.coin.toUpperCase())), _this3.renderSendReceiveBtn(), !_this3.state.showQR && React.createElement("div", {
              className: "latest-transactions-container"
            }, _this3.props.loading && !_this3.props.transactions && !_this3.state.showQR && React.createElement("div", {
              className: "section-label"
            }, translate('TRANSACTIONS.LOADING_HISTORY'), "..."), _this3.props.transactions && !_this3.state.showQR && React.createElement("div", {
              className: "section-label"
            }, !_items.length ? translate('TRANSACTIONS.NO_HISTORY') : translate('TRANSACTIONS.LAST_TX')), _items && _items.length > 0 && !_this3.state.showQR && React.createElement("div", {
              className: "transactions-list"
            }, _items)))), React.createElement(ToastContainer, {
              store: ToastStore,
              position: ToastContainer.POSITION.BOTTOM_CENTER,
              className: "toast-message"
            }))
          };
        }();

        if ((0, _typeof2.default)(_ret) === "object") return _ret.v;
      }
    }

    return render;
  }();

  return Transactions;
}(React.Component);

module.exportDefault(Transactions);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"conf":{"electrum-servers.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/conf/electrum-servers.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
'use strict';

var electrumServers = {
  kmd: {
    txfee: 10000,
    serverList: ['electrum1.komodo.build:10001:tcp']
  },
  btc: {
    serverList: ['electrum1.komodo.build:10000:tcp']
  },
  pgt: {
    serverList: ['electrum1.komodo.build:10002:tcp']
  },
  lime: {
    serverList: ['159.65.113.156:10010:tcp']
  }
};
module.exports = electrumServers;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"reducers":{"foo.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/reducers/foo.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  "default": function () {
    return reducer;
  }
});

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    default:
      return state;
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/reducers/index.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var combineReducers;
module.watch(require("redux"), {
  combineReducers: function (v) {
    combineReducers = v;
  }
}, 0);
var foo;
module.watch(require("./foo"), {
  "default": function (v) {
    foo = v;
  }
}, 1);
var appReducer = combineReducers({
  foo: foo
});
module.exportDefault(appReducer);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"translate":{"en.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/translate/en.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var lang = {
  EN: {
    API: {
      NO_UTXO_ERR: 'No available UTXO(s) or connection error',
      CANT_BROADCAST_TX_ERR: 'Can\'t broadcast transaction',
      BAD_TX_INPUTS_SPENT_ERR: 'Bad transaction inputs spent',
      CON_ERROR: 'Connection error. Please retry.'
    },
    SETTINGS: {
      SAVED: 'Settings are saved',
      AUTOLOCK_TIMEOUT: 'Auto lock timeout',
      MINUTES: 'minutes',
      SAVE: 'Save',
      RECOVER: 'recover passphrase',
      LOGOUT: 'logout',
      REQUIRE_PIN_CONFIRM: 'Require PIN to confirm transaction'
    },
    RECOVERY: {
      PROVIDE_YOUR_PIN: 'Provide your PIN number to unlock passphrase.',
      SHOW: 'Show'
    },
    PIN: {
      SAVE: 'Save',
      SEED_IS_ENCRYPTED: 'Seed is encrypted with provided PIN. Use the PIN to login or sign a transaction.',
      PROVIDE_A_PASSPHRASE: 'Provide passhprase or WIF',
      PROVIDE_A_SEED: 'Provide a seed and enter 6 digit PIN number in the form below.'
    },
    OVERVIEW: {
      PRICES_ERROR: 'Atomicexplorer.com is unreachable!',
      TOTAL_VALUE: 'Total Value',
      PER_COIN: 'per coin',
      YOUR_COINS: 'Your Coins'
    },
    OFFLINE: {
      TX_SIG_FAIL: 'failed to sign transaction',
      CONFIRM: 'Confirm',
      TX_PIN_CONFIRM: 'To confirm transaction provide PIN and press the button below.',
      OFFLINE_TX_SIG: 'Offline Transaction Signing',
      SEND_FROM: 'Send from',
      SEND_TO: 'Send to',
      AMOUNT: 'Amount'
    },
    LOGIN: {
      OR_WIF: 'or WIF',
      CREATE_A_PIN: 'Create a pin to Sign In.',
      SIGN_IN_TO_YOUR_ACC: 'Sign In to your Agama account.',
      SIGN_IN: 'Sign In',
      DONE: 'Done',
      GENERATE: 'Generate',
      PASTE: 'Paste',
      PIN_ACCESS: 'PIN access',
      WRONG_PIN: 'Wrong PIN!',
      LOGIN: 'Login',
      PASSPHRASE_ACCESS: 'Passphrase access',
      ENTER_PASSPHRASE: 'Enter a passphrase',
      OVERRIDE_PIN: 'Create / Override PIN',
      ENTER_6_DIGIT_PIN: 'Enter a PIN (min. 6 digits)',
      ENTER_PIN: 'Enter a PIN',
      PIN_TOO_SHORT: 'PIN is too short!',
      I_CONFIRM_I_SAVED_SEED: 'I confirm that I saved the seed',
      PLEASE_MAKE_SURE_TO: 'Please make sure to write it down and store in a safe place!',
      THIS_IS_YOUR_NEW_SEED: 'This is your new seed',
      CREATE_RECOVER_WALLET: 'Create / Recover Wallet',
      CONFIRMATION_REQUIRED: 'Confirmation is required',
      CREATE_WALLET: 'Create wallet',
      RECOVER_WALLET: 'Recover wallet'
    },
    SEND: {
      TOTAL: 'Total',
      FEE: 'Fee',
      BTC_FEE_SLOW: 'Slow (60 min)',
      BTC_FEE_AVG: 'Average (30 min)',
      BTC_FEE_FAST: 'Fast (< 30 min)',
      BTC_FEES_FETCHING: 'Fetching btc fees data...',
      BTC_FEES_FETCHING_FAILED: 'Failed to retrieve btc fees data. Retrying in 5s...',
      SUCCESS: 'Success',
      TXID: 'Transaction ID',
      OPEN_IN_EXPLORER: 'Open in explorer',
      ENTER_YOUR_PIN: 'Enter your PIN',
      SEND: 'Send',
      BACK: 'Back',
      SEND_FROM: 'Send from',
      SEND_TO: 'Send to',
      ENTER_AN_ADDRESS: 'Enter an address',
      AMOUNT: 'Amount',
      FILL_IN_DETAILS: 'Fill in details',
      CONFIRM: 'Confirm',
      TO: 'To',
      FROM: 'From',
      BALANCE: 'Balance',
      WARNING: 'Warning',
      WARNING_SPV_P1: 'your wallet data is verified only by a single server!',
      WARNING_SPV_P2: 'If you still want to continue press "Send".',
      SPV_VERIFYING: 'Verifying transaction data',
      TX_RESULT: 'Transaction result',
      KEY: 'Key',
      INFO: 'Info',
      RESULT: 'Result',
      SUCCESS: 'success',
      PROCESSING_SM: 'processing...',
      PROCESSING_TX: 'Processing transaction...',
      ERROR: 'Error',
      MAKE_ANOTHER_TX: 'Send another',
      NAN: 'Not a number',
      TOO_MUCH: 'Number is too big. Max. available amount is @template@',
      ADDRESS_IS_INCORECT: 'Address is incorrect',
      QR_SCAN_ERR: 'Unable to decode QR image. Please retry.',
      SCAN_QR: 'Scan QR code'
    },
    ADD_COIN: {
      ADD_ALL_COINS: 'Add all coins',
      SHORTCUTS: 'Shortcuts',
      MULTI_SELECT: 'Multi-select',
      ADD_SELECTED_COINS: 'Add selected coins',
      NEXT: 'Next'
    },
    BALANCE: {
      BALANCE: 'Balance',
      INTEREST: 'Rewards'
    },
    DASHBOARD: {
      MY: 'My',
      ADDRESS: 'address',
      TRANSACTIONS: 'Transactions',
      BACK: 'Back',
      LOGOUT: 'Logout',
      LOGIN: 'Login',
      LOCK: 'Lock',
      DASHBOARD: 'Dashboard',
      SEND: 'Send',
      RECEIVE: 'Receive',
      ADD_COIN: 'Add coin',
      CREATE_SEED: 'Create seed',
      CON_ERROR: 'Connection error. Please try another @template@ server.',
      SWITCH_SERVER: 'Switch server',
      ERROR_TESTING_SERVER: 'Error: server @template@ is unreachable!',
      CONNECTING_TO_NEW_SERVER: 'Connecting to a new server...',
      PROXY_ERROR: 'Proxy service is unreachable!',
      CLAIM: 'Claim',
      RETRY: 'Retry',
      SYNC: 'Sync'
    },
    TRANSACTIONS: {
      LAST_TX: 'Transactions',
      LOADING_HISTORY: 'Loading transactions history',
      OUT: 'out',
      IN: 'in',
      MINE: 'mine',
      IMMATURE: 'immature',
      UNKNOWN: 'unknown',
      NO_HISTORY: 'No history',
      DIRECTION: 'Direction',
      CONFIRMATIONS: 'Confirmations',
      INTEREST: 'Rewards',
      TX_HASH: 'Tx hash',
      AMOUNT: 'Amount',
      TIME: 'Time',
      COIN_ADDRESS: 'address'
    },
    CLAIM: {
      WARNING: 'Warning',
      WARNING_SPV_P1: 'your wallet data is verified only by a single server!',
      WARNING_SPV_P2: 'If you still want to continue press "Confirm".',
      SPV_VERIFYING: 'Verifying transaction data',
      CONFIRM: 'Confirm',
      CANCEL: 'Cancel',
      FAILED_TO_CLAIM_INTEREST: 'Failed to claim rewards! Please retry.',
      YOU_SUCCESFULLY_CLAIMED: 'You succesfully claimed',
      AMOUNT: 'Amount',
      INTEREST: 'Rewards',
      INTEREST_SM: 'rewards',
      LIST_SM: 'list',
      REQ_TO_CLAIM_P1: 'Requirements to accrue rewards',
      REQ_TO_CLAIM_P2: 'spend transaction was made at least 1 hour ago, locktime field is set and amount is greater than 10 KMD',
      CLAIM: 'Claim'
    },
    APP_TITLE: {
      MENU: 'Menu',
      PIN: 'Override PIN',
      LOGIN: 'Sign in',
      DASHBOARD: 'Dashboard',
      OVERVIEW: 'Overview',
      SETTINGS: 'Settings',
      RECOVERY: 'Recover passphrase',
      SEND: 'Send',
      OFFLINESIG: 'Offline signing',
      ADDCOIN: 'Add coin',
      COINSALE: 'Pungo token sale',
      'CREATE-SEED': 'Create wallet',
      'CREATE-RECOVER-SEED': 'Recover wallet',
      'RECOVER-SEED': 'Recover wallet',
      ABOUT: 'About',
      CLAIM: 'Claim rewards',
      MANAGE_COINS: 'Manage coins',
      RECENT_WALLETS: 'Recent wallets'
    },
    COINS: {
      PGT: 'Pungo Token',
      LIME: 'LIME coin',
      // asset chains
      BET: 'BET',
      BOTS: 'BOTS',
      CEAL: 'CEAL NET',
      COQUI: 'COQUI',
      CHAIN: 'Chainmakers',
      GLXT: 'GLXToken',
      EQL: 'Equaliser',
      CRYPTO: 'CRYPTO',
      HODL: 'HODL',
      DEX: 'DEX',
      JUMBLR: 'JUMBLR',
      KV: 'KV',
      MGW: 'MultiGateway',
      MVP: 'MVP Lineup',
      MNZ: 'Monaize',
      PANGEA: 'PANGEA',
      REVS: 'REVS',
      MSHARK: 'MSHARK',
      SHARK: 'SHARK',
      MESH: 'SpaceMesh',
      SUPERNET: 'SUPERNET',
      WLC: 'WIRELESS',
      AXO: 'AXO',
      ETOMIC: 'ETOMIC',
      BTCH: 'BTCH',
      BEER: 'BEER (Test coin)',
      PIZZA: 'PIZZA (Test coin)',
      VOTE2018: 'VOTE2018 (Notary Elections)',
      NINJA: 'NINJA',
      GLXT: 'GLXToken',
      BNTN: 'Blocnation',
      PRLPAY: 'Pearl Pay',
      OOT: 'Utrum',
      ZILLA: 'Chainzilla',
      // crypto
      CRW: 'Crown',
      STRAT: 'Stratis',
      TOA: 'TOA',
      USC: 'UltimateSecureCash',
      VPN: 'VpnCoin',
      WC: 'WinCoin',
      NRG: 'Energi',
      ABY: 'ArtByte',
      VOT: 'VoteCoin',
      BDL: 'Bitdeal',
      BTCP: 'BitcoinPrivate',
      MAC: 'Machinecoin',
      XWC: 'Whitecoin',
      XVC: 'Vcash',
      SMART: 'Smartcash',
      CRAVE: 'Crave',
      ACC: 'AdCoin',
      AC: 'AsiaCoin',
      AUR: 'Auroracoin',
      BCA: 'Bitcoin Atom',
      CLAM: 'Clams',
      CLUB: 'ClubCoin',
      DMD: 'Diamond',
      EXCL: 'ExclusiveCoin',
      FTC: 'FeatherCoin',
      FLASH: 'Flash',
      NLG: 'Gulden',
      LCC: 'Litecoin Cash',
      MNX: 'MinexCoin',
      NAV: 'NavCoin',
      NEOS: 'NeosCoin',
      OK: 'OKCash',
      OMNI: 'OmniLayer',
      PIVX: 'Pivx',
      RDD: 'Reddcoin',
      UNO: 'Unobtanium',
      XVG: 'Verge',
      VIVO: 'VIVO',
      EFL: 'E-Gulden',
      GBX: 'GoByte',
      BSD: 'Bitsend',
      LBC: 'LBRY Credits',
      ERC: 'Europecoin',
      BATA: 'Bata',
      EMC2: 'Einsteinium',
      SYS: 'Syscoin',
      IOP: 'Internet of People',
      ZEN: 'Zencash',
      XZC: 'Zcoin',
      FJC: 'Fujicoin',
      GAME: 'GameCredits',
      BCBC: 'Bitcoin CBC',
      BTG: 'BitcoinGold',
      BCH: 'BitcoinCash',
      BTC: 'Bitcoin',
      DASH: 'Dash',
      DNR: 'Denarius',
      DGB: 'DigiByte',
      FAIR: 'Faircoin',
      ARG: 'Argentum',
      LTC: 'Litecoin',
      MONA: 'Monacoin',
      NMC: 'Namecoin',
      VTC: 'Vertcoin',
      VIA: 'Viacoin',
      SIB: 'Sibcoin',
      BLK: 'Blackcoin',
      DOGE: 'Dogecoin',
      ZEC: 'Zcash',
      HUSH: 'Hush',
      SNG: 'SnowGem',
      ZCL: 'Zclassic',
      XMY: 'Myriad',
      GRS: 'Groestlcoin',
      HODLC: 'Hodl coin',
      BTX: 'Bitcore',
      QTUM: 'Qtum',
      BTCZ: 'BitcoinZ',
      KMD: 'KMD',
      CHIPS: 'Chips',
      MZC: 'Mazacoin',
      ZET: 'Zetacoin',
      SLR: 'Solarcoin',
      SMLY: 'Smileycoin',
      RBY: 'Rubycoin',
      VOX: 'RevolutionVR',
      PUT: 'PutinCoin',
      POT: 'Potcoin',
      POSW: 'Poswcoin',
      PINK: 'Pinkcoin',
      PSB: 'Pesobit',
      NSR: 'NuShares',
      NVC: 'Novacoin',
      NYC: 'NewYorkCoin',
      NRO: 'Neuro',
      LYNX: 'Lynx',
      LINX: 'Linx',
      LDCN: 'Landcoin',
      KOBO: 'Kobocoin',
      IXC: 'Ixcoin',
      INSN: 'InsaneCoin',
      THC: 'Hempcoin',
      HNC: 'Helleniccoin',
      GRC: 'Gridcoin',
      GCR: 'Global Currency Reserve',
      FRST: 'FirstCoin',
      ERC: 'Europecoin',
      EDRC: 'EDRcoin',
      ECN: 'eCoin',
      DGC: 'Digitalcoin',
      DEFC: 'Defcoin',
      CMP: 'CompCoin',
      CCN: 'Cannacoin',
      CDN: 'Canada eCoin',
      BRIT: 'BritCoin',
      XBC: 'BitcoinPlus',
      BELA: 'BelaCoin',
      USNBT: 'NuBits',
      ONX: 'Onixcoin',
      ZET: 'Zetacoin',
      JBS: 'Jumbucks',
      SLM: 'Slimcoin',
      AXE: 'Axe',
      PPC: 'Peercoin',
      MZC: 'Mazacoin',
      SDC: 'ShadowCash'
    }
  }
};
module.exportDefault(lang);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"translate.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/translate/translate.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var lang;
module.watch(require("./en"), {
  "default": function (v) {
    lang = v;
  }
}, 0);

var translate = function (langID, interpolateStr) {
  var defaultLang = 'EN';

  if (langID && langID.indexOf('.') > -1) {
    var langIDComponents = langID.split('.');

    if (lang && langIDComponents && lang[defaultLang][langIDComponents[0]][langIDComponents[1]]) {
      if (interpolateStr) {
        return lang[defaultLang][langIDComponents[0]][langIDComponents[1]].replace('@template@', interpolateStr);
      } else {
        return lang[defaultLang][langIDComponents[0]][langIDComponents[1]];
      }
    } else {
      console.warn("Missing translation " + langID + " in js/" + defaultLang.toLowerCase() + ".js");
      return "--> " + langID + " <--";
    }
  } else {
    if (langID.length) {
      console.warn("Missing translation " + langID + " in js/" + defaultLang.toLowerCase() + ".js");
      return "--> " + langID + " <--";
    }
  }
};

module.exportDefault(translate);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"App.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/ui/App.js                                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var bindActionCreators;
module.watch(require("redux"), {
  bindActionCreators: function (v) {
    bindActionCreators = v;
  }
}, 1);
var connect;
module.watch(require("react-redux"), {
  connect: function (v) {
    connect = v;
  }
}, 2);
var electrumServers;
module.watch(require("./conf/electrum-servers"), {
  "default": function (v) {
    electrumServers = v;
  }
}, 3);
var actions;
module.watch(require("./actions/actions"), {
  "default": function (v) {
    actions = v;
  }
}, 4);
var getLocalStorageVar, setLocalStorageVar;
module.watch(require("./actions/utils"), {
  getLocalStorageVar: function (v) {
    getLocalStorageVar = v;
  },
  setLocalStorageVar: function (v) {
    setLocalStorageVar = v;
  }
}, 5);
var translate;
module.watch(require("./translate/translate"), {
  "default": function (v) {
    translate = v;
  }
}, 6);
var config, devlog;
module.watch(require("./actions/dev"), {
  config: function (v) {
    config = v;
  },
  devlog: function (v) {
    devlog = v;
  }
}, 7);
var getRandomIntInclusive, sort;
module.watch(require("./lib/agama-wallet-lib/build/utils"), {
  getRandomIntInclusive: function (v) {
    getRandomIntInclusive = v;
  },
  sort: function (v) {
    sort = v;
  }
}, 8);
var SendCoin;
module.watch(require("./components/SendCoin"), {
  "default": function (v) {
    SendCoin = v;
  }
}, 9);
var AddCoin;
module.watch(require("./components/AddCoin"), {
  "default": function (v) {
    AddCoin = v;
  }
}, 10);
var Transactions;
module.watch(require("./components/Transactions"), {
  "default": function (v) {
    Transactions = v;
  }
}, 11);
var ServerSelect;
module.watch(require("./components/ServerSelect"), {
  "default": function (v) {
    ServerSelect = v;
  }
}, 12);
var CreateSeed;
module.watch(require("./components/CreateSeed"), {
  "default": function (v) {
    CreateSeed = v;
  }
}, 13);
var CreateRecoverSeed;
module.watch(require("./components/CreateRecoverSeed"), {
  "default": function (v) {
    CreateRecoverSeed = v;
  }
}, 14);
var KMDInterest;
module.watch(require("./components/KMDInterest"), {
  "default": function (v) {
    KMDInterest = v;
  }
}, 15);
var OfflineSigning;
module.watch(require("./components/OfflineSigning"), {
  "default": function (v) {
    OfflineSigning = v;
  }
}, 16);
var Pin;
module.watch(require("./components/Pin"), {
  "default": function (v) {
    Pin = v;
  }
}, 17);
var Recovery;
module.watch(require("./components/Recovery"), {
  "default": function (v) {
    Recovery = v;
  }
}, 18);
var Overview;
module.watch(require("./components/Overview"), {
  "default": function (v) {
    Overview = v;
  }
}, 19);
var Settings;
module.watch(require("./components/Settings"), {
  "default": function (v) {
    Settings = v;
  }
}, 20);
var SplashScreen;
module.watch(require("./components/SplashScreen"), {
  "default": function (v) {
    SplashScreen = v;
  }
}, 21);
var Login;
module.watch(require("./components/Login"), {
  "default": function (v) {
    Login = v;
  }
}, 22);
var ManageCoins;
module.watch(require("./components/ManageCoins"), {
  "default": function (v) {
    ManageCoins = v;
  }
}, 23);
var Coinsale;
module.watch(require("./components/Coinsale"), {
  "default": function (v) {
    Coinsale = v;
  }
}, 24);
var About;
module.watch(require("./components/About"), {
  "default": function (v) {
    About = v;
  }
}, 25);
// import electrumServers from './lib/agama-wallet-lib/build/electrum-servers';
var DASHBOARD_UPDATE_INTERVAL = 120000; // 2m

var DEFAULT_LOCK_INACTIVE_INTERVAL = getLocalStorageVar('settings') && getLocalStorageVar('settings').autoLockTimeout ? getLocalStorageVar('settings').autoLockTimeout : 600000; // 10m
// // temporary android back button fix
// document.addEventListener("backbutton", onBackButtonDown, false);
// function onBackButtonDown(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     // ..
// }

var App =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(App, _React$Component);

  function App() {
    var _this2;

    _this2 = _React$Component.call(this) || this;

    _this2.renderApplicationHeader = function () {
      return React.createElement("div", null, React.createElement("div", {
        className: 'app-header' + (_this2.state.activeSection === 'dashboard' ? ' title-with-image' : '')
      }, _this2.state.history && !_this2.state.displayMenu && (_this2.state.auth && _this2.state.history !== 'login' && _this2.state.history !== 'create-seed' || !_this2.state.auth) && _this2.state.history !== _this2.state.activeSection && !_this2.state.proxyError && React.createElement("img", {
        onClick: _this2.historyBack,
        className: "menu-back",
        src: "/images/template/menu/arrow_back.svg"
      }), React.createElement("div", {
        className: "app-logo"
      }, React.createElement("img", {
        className: "header-logo",
        src: "/images/template/menu/pungo_logo_white.svg"
      })), _this2.state.activeSection != 'create-seed' && _this2.state.activeSection != 'create-recover-seed' && React.createElement("img", {
        onClick: _this2.toggleMenu,
        className: "menu-icon",
        src: "/images/template/home/home-combined-shape.png"
      }), _this2.state.activeSection != 'coinsale' && React.createElement("div", {
        className: "ui-title"
      }, _this2.state.activeSection !== 'dashboard' ? translate('APP_TITLE.' + _this2.state.activeSection.toUpperCase()) : React.createElement("img", {
        className: "title-coin-icon",
        src: "/images/cryptologo/" + _this2.state.coin + "_icon.svg"
      })), _this2.state.activeSection == 'coinsale' && React.createElement("div", null, React.createElement("div", {
        className: "ui-title-background"
      }, "\xA0"))), _this2.state.displayMenu && !_this2.state.proxyError && React.createElement("div", {
        className: "app-main"
      }, _this2.renderMenu()));
    };

    _this2.state = {
      address: null,
      balance: null,
      transactions: null,
      utxo: null,
      errors: null,
      displayMenu: false,
      loading: false,
      coin: null,
      coins: {},
      pubKeys: {},
      activeSection: 'splash',
      saveSeed: null,
      auth: false,
      updateInterval: null,
      conError: false,
      proxyError: false,
      overview: null,
      history: null,
      btcFees: null
    };
    _this2.defaultState = JSON.parse(JSON.stringify(_this2.state));
    _this2.login = _this2.login.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.loginAfterSelectCoin = _this2.loginAfterSelectCoin.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.logout = _this2.logout.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.lock = _this2.lock.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2))); // this.getKeys = this.getKeys.bind(this);

    _this2.getBalance = _this2.getBalance.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.getTransactions = _this2.getTransactions.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.toggleMenu = _this2.toggleMenu.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.dashboardRefresh = _this2.dashboardRefresh.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.switchCoin = _this2.switchCoin.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.addCoin = _this2.addCoin.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.changeActiveSection = _this2.changeActiveSection.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.toggleAutoRefresh = _this2.toggleAutoRefresh.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.toggleKMDInterest = _this2.toggleKMDInterest.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.toggleOverview = _this2.toggleOverview.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.toggleMenuOption = _this2.toggleMenuOption.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.globalClick = _this2.globalClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.globalClickTimeout = null;
    _this2.overviewInterval = null;
    _this2.historyBack = _this2.historyBack.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.scrollToTop = _this2.scrollToTop.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.getBtcFees = _this2.getBtcFees.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.retryProxy = _this2.retryProxy.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.goToLoginPage = _this2.goToLoginPage.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.goToDashboard = _this2.goToDashboard.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.goToAddCoinPage = _this2.goToAddCoinPage.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.goToCreateSeedPage = _this2.goToCreateSeedPage.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.goToCreateRecoverSeedPage = _this2.goToCreateRecoverSeedPage.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.updateApplicationStyle = _this2.updateApplicationStyle.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    _this2.addCoins = _this2.addCoins.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));
    return _this2;
  }

  var _proto = App.prototype;

  _proto.componentWillMount = function () {
    function componentWillMount() {
      var _this3 = this;

      var actions = this.props.actions;

      var _localStorageCoins = getLocalStorageVar('coins');

      if (_localStorageCoins) {
        this.setState({
          coins: _localStorageCoins
        });
      }

      actions.getOverview(this.state.coins).then(function (res) {
        _this3.setState({
          overview: res
        });
      }); // temporary android back button fix

      var __this = this;

      document.addEventListener("backbutton", function () {
        function onBackButtonDown(event) {
          event.preventDefault();
          event.stopPropagation();

          __this.historyBack();
        }

        return onBackButtonDown;
      }(), false); // function onBackButtonDown(event) {
      //     event.preventDefault();
      //     event.stopPropagation();
      //     // ..
      // }
    }

    return componentWillMount;
  }();

  _proto.retryProxy = function () {
    function retryProxy() {
      var actions = this.props.actions;
      actions.getAnotherProxy();
      this.dashboardRefresh();
    }

    return retryProxy;
  }();

  _proto.getBtcFees = function () {
    function getBtcFees() {
      var _this4 = this;

      var actions = this.props.actions;
      this.setState({
        btcFees: null
      });
      actions.getBtcFees().then(function (res) {
        _this4.setState({
          btcFees: res
        });

        if (res === 'error') {
          setTimeout(function () {
            _this4.getBtcFees();
          }, 5000);
        }
      });
    }

    return getBtcFees;
  }();

  _proto.historyBack = function () {
    function historyBack() {
      if (this.state.history && this.state.history != "") {
        this.setState({
          activeSection: this.state.history,
          history: null
        });
      }
    }

    return historyBack;
  }();

  _proto.scrollToTop = function () {
    function scrollToTop() {
      window.scrollTo(0, 0);
    }

    return scrollToTop;
  }();

  _proto.globalClick = function () {
    function globalClick() {
      var _this5 = this;

      if (this.state.auth) {
        if (this.globalClickTimeout) {
          clearTimeout(this.globalClickTimeout);
        }

        if (config.dev && config.preload && !config.preload.disableAutoLock) {
          this.globalClickTimeout = setTimeout(function () {
            devlog("logout after " + DEFAULT_LOCK_INACTIVE_INTERVAL + "ms inactivity");

            _this5.lock();
          }, DEFAULT_LOCK_INACTIVE_INTERVAL);
        } // devlog('global click', 'set timer');

      }
    }

    return globalClick;
  }();

  _proto.addCoin = function () {
    function addCoin(coin) {
      var _this6 = this;

      var server = electrumServers[coin];
      var coins = this.state.coins;

      var _this = this; // pick a random server to communicate with


      if (server.serverList && server.serverList.length > 0) {
        var randomServerId = getRandomIntInclusive(0, server.serverList.length - 1);
        var randomServer = server.serverList[randomServerId];
        var serverDetails = randomServer.split(':');

        if (serverDetails.length === 3) {
          server = {
            ip: serverDetails[0],
            port: serverDetails[1],
            proto: serverDetails[2]
          };
        }
      }

      coins[coin] = {
        server: server
      };
      setLocalStorageVar('coins', this.state.coins);

      if (!this.state.auth) {
        this.setState({
          coins: coins,
          history: null,
          activeSection: 'login'
        });
      } else {
        var _actions = this.props.actions;

        _actions.addKeyPair(coin).then(function (res) {
          var pubKeys = _this6.state.pubKeys;
          pubKeys[coin] = res;

          _this6.setState({
            pubKeys: pubKeys,
            coins: coins,
            history: null,
            activeSection: 'dashboard',
            coin: coin,
            address: res,
            loading: true,
            transactions: _this6.state.coins[coin] ? _this6.state.coins[coin].transactions : null,
            balance: _this6.state.coins[coin] ? _this6.state.coins[coin].balance : null
          }, function () {
            _this6.scrollToTop();

            _this6.dashboardRefresh();
          });
        });
      }
    }

    return addCoin;
  }();

  _proto.addCoins = function () {
    function addCoins(newCoins) {
      var _this7 = this;

      var stateCoins = this.state.coins;
      var pubKeys = this.state.pubKeys; // sift through the coins and leave the selected ones

      var temp = {};
      newCoins.forEach(function (value, i) {
        for (var coin in meteorBabelHelpers.sanitizeForInObject(stateCoins)) {
          if (value === coin) {
            temp[coin] = stateCoins[coin];
          }
        }
      });
      var activeCoin = "";
      var activeCoinKey = "";

      var _loop = function (i) {
        var currentCoin = newCoins[i];
        var server = electrumServers[currentCoin];

        if (i == newCoins.length - 1) {
          activeCoin = currentCoin;
        } // pick a random server to communicate with


        if (server.serverList && server.serverList.length > 0) {
          var randomServerId = getRandomIntInclusive(0, server.serverList.length - 1);
          var randomServer = server.serverList[randomServerId];
          var serverDetails = randomServer.split(':');

          if (serverDetails.length === 3) {
            server = {
              ip: serverDetails[0],
              port: serverDetails[1],
              proto: serverDetails[2]
            };
          }
        }

        temp[currentCoin] = {
          server: server
        };
        setLocalStorageVar('coins', temp);

        if (!_this7.state.auth) {
          _this7.setState({
            coins: temp,
            history: null,
            activeSection: 'login'
          });
        } else {
          var _actions2 = _this7.props.actions;

          _actions2.addKeyPair(currentCoin).then(function (res) {
            pubKeys[currentCoin] = res;

            if (i == newCoins.length - 1) {
              activeCoinKey = res;

              _this7.setState({
                pubKeys: pubKeys,
                coins: temp,
                history: null,
                activeSection: 'dashboard',
                coin: activeCoin,
                address: activeCoinKey,
                loading: true,
                transactions: _this7.state.coins[activeCoin] ? _this7.state.coins[activeCoin].transactions : null,
                balance: _this7.state.coins[activeCoin] ? _this7.state.coins[activeCoin].balance : null
              }, function () {
                _this7.scrollToTop();

                _this7.dashboardRefresh();
              });

              _actions2.getOverview(temp).then(function (res) {
                _this7.setState({
                  overview: res
                });
              });
            }
          });
        }
      };

      for (var i = 0; i < newCoins.length; i++) {
        _loop(i);
      }
    }

    return addCoins;
  }();

  _proto.toggleKMDInterest = function () {
    function toggleKMDInterest() {
      var _this8 = this;

      var actions = this.props.actions;
      this.setState({
        utxo: null,
        history: this.state.activeSection,
        activeSection: 'claim'
      });
      actions.kmdUnspents().then(function (res) {
        _this8.scrollToTop();

        _this8.setState({
          utxo: res
        });
      });
    }

    return toggleKMDInterest;
  }();

  _proto.changeActiveSection = function () {
    function changeActiveSection(section, toggleMenu) {
      if (toggleMenu) {
        this.setState({
          displayMenu: false,
          history: this.state.activeSection,
          activeSection: section
        });
      } else {
        this.setState({
          history: this.state.activeSection,
          activeSection: section
        });
      }

      if (this.state.coin === 'btc' && section === 'send') {
        this.getBtcFees();
      } // document.getElementById('body').style.overflowY = 'inherit';


      this.scrollToTop();
    }

    return changeActiveSection;
  }();

  _proto.switchCoin = function () {
    function switchCoin(coin, disableMenuToggle) {
      var _this9 = this;

      console.log("==== pubkeys", this.state.pubKeys);
      console.log("==== old status", this.state);
      this.setState({
        coin: coin,
        address: this.state.pubKeys[coin],
        history: this.state.activeSection,
        activeSection: this.state.activeSection !== 'send' ? 'dashboard' : 'send',
        transactions: this.state.coins[coin] ? this.state.coins[coin].transactions : null,
        balance: this.state.coins[coin] ? this.state.coins[coin].balance : null
      }, function () {
        // toggle refresh and update in-mem coins cache obj
        if (!disableMenuToggle) {
          _this9.toggleMenu();
        }

        _this9.dashboardRefresh();

        _this9.scrollToTop();

        console.log("==== new status", _this9.state);
      });
    }

    return switchCoin;
  }();

  _proto.toggleAutoRefresh = function () {
    function toggleAutoRefresh(disable) {
      var _this10 = this;

      if (disable) {
        clearInterval(this.state.updateInterval);
        clearInterval(this.state.overviewInterval);
        this.setState({
          updateInterval: null
        });
      } else {
        var _updateInterval = setInterval(function () {
          if (_this10.state.activeSection === 'dashboard') {
            _this10.dashboardRefresh();
          }
        }, DASHBOARD_UPDATE_INTERVAL);

        this.setState({
          updateInterval: _updateInterval
        });
      }
    }

    return toggleAutoRefresh;
  }();

  _proto.dashboardRefresh = function () {
    function dashboardRefresh() {
      var _this11 = this;

      this.setState({// balance: 0,
        // transactions: null,
      }, function () {
        _this11.getBalance();

        _this11.getTransactions();
      });
    }

    return dashboardRefresh;
  }();
  /*getKeys() {
    const { actions } = this.props;
     actions.getKeys()
    .then((res) => {
      console.warn(res);
    });
  }*/


  _proto.getBalance = function () {
    function getBalance() {
      var _this12 = this;

      var actions = this.props.actions;
      actions.balance(this.state.coin).then(function (res) {
        // .. !!!
        if (res && res === 'proxy-error') {
          _this12.setState({
            proxyError: true
          }); // .. !!!

        } else {
          if (res && !res.hasOwnProperty('balance') && res.indexOf('error') > -1) {
            _this12.setState({
              balance: null,
              transactions: null,
              conError: true
            });
          } else {
            console.log(">> balance result: ", res);

            _this12.setState({
              balance: res,
              conError: false,
              proxyError: false
            });
          }
        }
      });
    }

    return getBalance;
  }();

  _proto.getTransactions = function () {
    function getTransactions() {
      var _this13 = this;

      var actions = this.props.actions;
      this.setState({
        loading: true
      });
      actions.transactions(this.state.coin).then(function (res) {
        if (res && res.indexOf('error') > -1) {
          _this13.setState({
            balance: null,
            transactions: null,
            loading: false,
            conError: true
          });
        } else {
          res = sort(res, 'timestamp', true);

          _this13.setState({
            transactions: res,
            loading: false,
            conError: false,
            proxyError: false
          });

          console.log("==== IPDATE TX", _this13.state, res);
        }
      });
    }

    return getTransactions;
  }(); // purge keys and added coins


  _proto.logout = function () {
    function logout() {
      var _this14 = this;

      var actions = this.props.actions;
      actions.clearKeys().then(function (res) {
        _this14.toggleAutoRefresh(true); // setLocalStorageVar('coins', {});


        setTimeout(function () {
          _this14.toggleMenu();
        }, 10);
        setTimeout(function () {
          _this14.setState(_this14.defaultState);
        }, 20);

        _this14.scrollToTop();
      });
    }

    return logout;
  }(); // lock is logout when list of added coins is persistent


  _proto.lock = function () {
    function lock() {
      var _this15 = this;

      var actions = this.props.actions;
      actions.clearKeys().then(function (res) {
        var lockState = Object.assign({}, _this15.defaultState);
        lockState.coins = _this15.state.coins;

        _this15.toggleAutoRefresh(true);

        setTimeout(function () {
          _this15.toggleMenu();
        }, 10);
        setTimeout(function () {
          _this15.setState(lockState);
        }, 20);

        _this15.scrollToTop();
      });
    }

    return lock;
  }();

  _proto.login = function () {
    function login(passphrase) {
      var _this16 = this;

      var actions = this.props.actions;
      actions.auth(passphrase, this.state.coins).then(function (res) {
        // select a coin and an address
        var coin;
        var address;

        if (_this16.state.coins.kmd) {
          coin = 'kmd';
          address = res.kmd;
        } else {
          coin = Object.keys(_this16.state.coins)[0];
          address = res[coin];
        }

        if (config.preload && config.preload.activeCoin) {
          coin = config.preload.activeCoin;
          address = res[coin];
        }

        _this16.setState({
          auth: true,
          pubKeys: res,
          coin: coin,
          address: address,
          history: null,
          activeSection: 'addcoin' // activeSection: 'dashboard',

        });

        _this16.dashboardRefresh();

        _this16.toggleAutoRefresh();

        _this16.globalClick();

        _this16.scrollToTop();
      });
    }

    return login;
  }();

  _proto.loginAfterSelectCoin = function () {
    function loginAfterSelectCoin(passphrase) {
      var _this17 = this;

      var actions = this.props.actions;

      if (!this.state.coins || !this.state.coins.length) {
        this.state.coins = getLocalStorageVar("coins");
      }

      actions.auth(passphrase, this.state.coins).then(function (res) {
        // select a coin and an address
        var coin;
        var address;

        if (_this17.state.coins.pgt) {
          coin = 'pgt';
          address = res.pgt;
        } else {
          coin = Object.keys(_this17.state.coins)[0];
          address = res[coin];
        }

        console.log("=========== login coin", res, coin, address); // if (config.preload &&
        //     config.preload.activeCoin) {
        //     coin = config.preload.activeCoin;
        //     address = res[coin];
        // }
        // coin = config.preload.activeCoin;
        // address = res[coin];

        _this17.setState({
          auth: true,
          pubKeys: res,
          coin: coin,
          address: address,
          history: null,
          activeSection: 'dashboard'
        });

        actions.getOverview(_this17.state.coins).then(function (res) {
          _this17.setState({
            overview: res
          });
        });

        _this17.dashboardRefresh();

        _this17.toggleAutoRefresh();

        _this17.globalClick();

        _this17.scrollToTop();
      });
    }

    return loginAfterSelectCoin;
  }();

  _proto.toggleMenu = function () {
    function toggleMenu() {
      // document.getElementById('body').style.overflow = !this.state.displayMenu ? 'hidden' : 'inherit';
      this.setState({
        displayMenu: !this.state.displayMenu
      });
    }

    return toggleMenu;
  }();

  _proto.toggleOverview = function () {
    function toggleOverview() {
      var _this18 = this;

      var actions = this.props.actions;
      actions.getOverview(this.state.coins).then(function (res) {
        console.log("-- overview done", res);

        _this18.setState({
          overview: res
        });
      });

      if (!this.state.overviewInterval) {
        var _updateInterval = setInterval(function () {
          if (_this18.state.activeSection === 'overview') {
            actions.getOverview(_this18.state.coins).then(function (res) {
              _this18.setState({
                overview: res
              });
            });
          }
        }, DASHBOARD_UPDATE_INTERVAL);

        this.setState({
          overviewInterval: _updateInterval
        });
      }

      this.toggleMenuOption('overview');
    }

    return toggleOverview;
  }();

  _proto.toggleMenuOption = function () {
    function toggleMenuOption(optionName) {
      var _this19 = this;

      setTimeout(function () {
        _this19.toggleMenu();
      }, 10);
      this.setState({
        history: this.state.activeSection,
        activeSection: this.state.activeSection === optionName ? this.state.auth ? 'dashboard' : 'login' : optionName
      });
      this.scrollToTop();
    }

    return toggleMenuOption;
  }();

  _proto.renderActiveCoins = function () {
    function renderActiveCoins() {
      var _this20 = this;

      var _items = [];

      if (this.state.coins && this.state.coins.pgt) {
        _items.push(React.createElement("div", {
          onClick: function () {
            return _this20.switchCoin('pgt');
          },
          key: "active-coins-pgt",
          className: "active-coins " + (this.state.coin === "pgt" && this.state.activeSection == 'dashboard' ? "current-coin" : "")
        }, React.createElement("img", {
          src: "/images/cryptologo/pgt_icon.svg"
        }), " PGT"));
      } // if (this.state.coins &&
      //     this.state.coins.kmd) {
      //     _items.push(
      //         <div
      //             onClick={() => this.switchCoin('kmd')} key={`active-coins-kmd`}
      //             // onClick={() => this.state.coin !== 'kmd' ? this.switchCoin('kmd') : null} key={`active-coins-kmd`}
      //             className={`active-coins ${(this.state.coin === "kmd" && this.state.activeSection == 'dashboard') ? "current-coin" : ""}`}>
      //             <img src="/images/cryptologo/kmd_icon.svg"/> {translate('COINS.KMD').toUpperCase()}
      //         </div>
      //     );
      // }


      var _loop2 = function (key) {
        if (key !== 'pgt') {
          _items.push(React.createElement("div", {
            onClick: function () {
              return _this20.switchCoin(key);
            } // onClick={() => key !== this.state.coin ? this.switchCoin(key) : null}
            ,
            key: "active-coins-" + key,
            className: "active-coins " + (_this20.state.coin === key && _this20.state.activeSection == 'dashboard' ? "current-coin" : "")
          }, React.createElement("img", {
            src: "/images/cryptologo/" + key + "_icon.svg"
          }), " ", key.toUpperCase()));
        }
      };

      for (var key in meteorBabelHelpers.sanitizeForInObject(this.state.coins)) {
        _loop2(key);
      }

      return _items;
    }

    return renderActiveCoins;
  }();

  _proto.renderMenu = function () {
    function renderMenu() {
      var _this21 = this;

      if (this.state.displayMenu) {
        return React.createElement("div", {
          className: "menu-ui"
        }, React.createElement("div", {
          className: "overlay-menu",
          onClick: this.toggleMenu
        }), React.createElement("div", {
          className: "menu-header"
        }, React.createElement("div", {
          className: "menu-logo"
        }, React.createElement("img", {
          src: "/images/template/menu/pungo_logo_orange.svg"
        })), React.createElement("div", {
          className: "menu-icon"
        }, React.createElement("img", {
          onClick: this.toggleMenu,
          src: "/images/template/menu/orangemenu_icon.svg"
        })), React.createElement("div", {
          className: "lock-icon"
        }, React.createElement("img", {
          onClick: this.logout,
          src: "/images/template/menu/lock_icon.svg"
        }))), React.createElement("div", {
          className: "menu-items"
        }, React.createElement("span", {
          className: "single-menu-item",
          onClick: function () {
            return _this21.toggleOverview('overview');
          }
        }, translate('APP_TITLE.OVERVIEW').toUpperCase()), React.createElement("span", {
          className: "single-menu-item",
          onClick: function () {
            return _this21.toggleMenuOption('coinsale');
          }
        }, "PUNGO SALE"), React.createElement("span", {
          className: "single-menu-item",
          onClick: function () {
            return window.open("https://pungotoken.com", '_system');
          }
        }, "PUNGO INFO"), React.createElement("span", {
          className: "single-menu-item",
          onClick: function () {
            return _this21.toggleMenuOption('settings');
          }
        }, translate('APP_TITLE.SETTINGS').toUpperCase()), React.createElement("div", {
          className: "section-title"
        }, translate('APP_TITLE.RECENT_WALLETS').toUpperCase()), this.renderActiveCoins(), React.createElement("div", {
          className: "manage-coins-block",
          onClick: function () {
            return _this21.toggleMenuOption('manage_coins');
          }
        }, React.createElement("img", {
          className: "menu-logo",
          src: "/images/template/menu/managecoins_icon.svg"
        }), translate('APP_TITLE.MANAGE_COINS').toUpperCase()), React.createElement("div", {
          className: "about-menu-item",
          onClick: function () {
            return _this21.toggleMenuOption('about');
          }
        }, "About")));
      } else {
        return null;
      }
    }

    return renderMenu;
  }();

  _proto.goToLoginPage = function () {
    function goToLoginPage() {
      this.setState({
        history: this.state.activeSection,
        activeSection: 'login'
      });
    }

    return goToLoginPage;
  }();

  _proto.goToDashboard = function () {
    function goToDashboard() {
      var _this22 = this;

      this.setState({
        displayMenu: false,
        history: 'dashboard',
        activeSection: 'dashboard'
      }, function () {
        _this22.dashboardRefresh();

        _this22.scrollToTop();
      }); // this.props.changeActiveSection(this.props.auth ? 'dashboard' : 'login')
    }

    return goToDashboard;
  }();

  _proto.goToAddCoinPage = function () {
    function goToAddCoinPage() {
      this.setState({
        history: this.state.activeSection,
        activeSection: 'addcoin'
      });
    }

    return goToAddCoinPage;
  }();

  _proto.goToCreateSeedPage = function () {
    function goToCreateSeedPage() {
      this.setState({
        history: this.state.activeSection,
        activeSection: 'create-seed'
      });
    }

    return goToCreateSeedPage;
  }();

  _proto.goToCreateRecoverSeedPage = function () {
    function goToCreateRecoverSeedPage() {
      this.setState({
        history: this.state.activeSection,
        activeSection: 'create-recover-seed'
      });
    }

    return goToCreateRecoverSeedPage;
  }();

  _proto.updateApplicationStyle = function () {
    function updateApplicationStyle() {
      var classList = document.querySelector('body').classList;

      if (!this.state || !this.state.activeSection || this.state.activeSection === '' || this.state.activeSection === ' ' || this.state.activeSection === 'splash' || this.state.activeSection === 'login') {
        classList.remove('application-pages');
        classList.add('login-splash-pages');
      } else {
        classList.remove('login-splash-pages');
        classList.add('application-pages');
      }
    }

    return updateApplicationStyle;
  }();

  _proto.render = function () {
    function render() {
      var _this23 = this;

      console.log('App', this.state.coins);
      this.updateApplicationStyle();
      return React.createElement("div", {
        className: "app-container",
        onClick: this.globalClick
      }, this.state.activeSection === 'login' || this.state.activeSection === 'splash' ? null : this.renderApplicationHeader(), this.state.proxyError && React.createElement("div", {
        className: "app-main"
      }, React.createElement("div", {
        className: "con-error"
      }, React.createElement("i", {
        className: "fa fa-warning error"
      }), " ", React.createElement("span", {
        className: "error"
      }, translate('DASHBOARD.PROXY_ERROR'))), React.createElement("div", {
        className: "form proxy"
      }, React.createElement("div", {
        onClick: this.retryProxy,
        className: "group3"
      }, React.createElement("div", {
        className: "btn-inner"
      }, React.createElement("div", {
        className: "btn"
      }, translate('DASHBOARD.RETRY')), React.createElement("div", {
        className: "group2"
      }, React.createElement("i", {
        className: "fa fa-refresh"
      })))))), !this.state.proxyError && React.createElement("div", {
        className: 'app-main' + (this.state.activeSection === 'dashboard' ? ' title-with-image' : '')
      }, this.state.activeSection === 'splash' && React.createElement(SplashScreen, (0, _extends2.default)({}, this.state, {
        goToLogin: this.goToLoginPage,
        goToCreateSeedPage: this.goToCreateSeedPage,
        goToCreateRecoverSeedPage: this.goToCreateRecoverSeedPage,
        goToAddCoin: this.goToAddCoinPage
      })), this.state.activeSection === 'login' && (this.state.activeSection !== 'pin' || this.state.activeSection !== 'offlinesig') && React.createElement(Login, (0, _extends2.default)({}, this.state, {
        loginAfterSelectCoin: this.loginAfterSelectCoin,
        goToCreateSeedPage: this.goToCreateSeedPage,
        goToCreateRecoverSeedPage: this.goToCreateRecoverSeedPage,
        goToAddCoin: this.goToAddCoinPage
      })), this.state.activeSection === 'create-recover-seed' && React.createElement(CreateRecoverSeed, (0, _extends2.default)({}, this.state, {
        login: this.login,
        changeActiveSection: this.changeActiveSection
      })), this.state.activeSection === 'create-seed' && React.createElement(CreateSeed, (0, _extends2.default)({}, this.state, {
        login: this.login,
        changeActiveSection: this.changeActiveSection
      })), React.createElement(SendCoin, (0, _extends2.default)({}, this.state, {
        sendtx: this.props.actions.sendtx,
        goToDashboard: this.goToDashboard,
        dashboardRefresh: this.dashboardRefresh,
        scrollToTop: this.scrollToTop,
        changeActiveSection: this.changeActiveSection,
        getBtcFees: this.getBtcFees
      })), this.state.activeSection === 'addcoin' && React.createElement(AddCoin, (0, _extends2.default)({}, this.state, {
        addCoin: this.addCoin,
        login: this.loginAfterSelectCoin,
        changeActiveSection: this.changeActiveSection
      })), this.state.activeSection === 'manage_coins' && React.createElement(ManageCoins, (0, _extends2.default)({}, this.state, {
        addCoins: this.addCoins,
        changeActiveSection: this.changeActiveSection
      })), this.state.conError && React.createElement(ServerSelect, (0, _extends2.default)({}, this.state, {
        dashboardRefresh: this.dashboardRefresh,
        getServersList: this.props.actions.getServersList,
        setDefaultServer: this.props.actions.setDefaultServer
      })), React.createElement(KMDInterest, (0, _extends2.default)({}, this.state, {
        sendtx: this.props.actions.sendtx,
        changeActiveSection: this.changeActiveSection
      })), this.state.auth && this.state.activeSection === 'dashboard' && !this.state.proxyError && React.createElement(Transactions, (0, _extends2.default)({}, this.state, {
        dashboardRefresh: this.dashboardRefresh,
        changeActiveSection: this.changeActiveSection,
        toggleKMDInterest: this.toggleKMDInterest
      })), !this.state.auth && this.state.activeSection === 'offlinesig' && React.createElement(OfflineSigning, null), !this.state.auth && this.state.activeSection === 'pin' && React.createElement(Pin, {
        changeActiveSection: this.changeActiveSection
      }), this.state.auth && this.state.activeSection === 'recovery' && React.createElement(Recovery, this.state), this.state.auth && this.state.activeSection === 'overview' && React.createElement(Overview, (0, _extends2.default)({}, this.state, {
        overview: this.state.overview,
        switchCoin: this.switchCoin,
        changeActiveSection: this.changeActiveSection,
        toggleMenuOption: this.toggleMenuOption
      })), this.state.auth && this.state.activeSection === 'coinsale' && React.createElement(Coinsale, (0, _extends2.default)({}, this.state, {
        overview: this.state.overview,
        switchCoin: this.switchCoin,
        changeActiveSection: this.changeActiveSection,
        toggleMenuOption: this.toggleMenuOption
      })), this.state.activeSection === 'settings' && React.createElement(Settings, {
        onLogout: this.logout,
        onRecovery: function () {
          return _this23.changeActiveSection('recovery');
        }
      }), this.state.auth && this.state.activeSection === 'about' && React.createElement(About, (0, _extends2.default)({}, this.state, {
        overview: this.state.overview,
        switchCoin: this.switchCoin,
        changeActiveSection: this.changeActiveSection,
        toggleMenuOption: this.toggleMenuOption
      }))));
    }

    return render;
  }();

  return App;
}(React.Component);

function mapStateToProps(state) {
  return {
    keys: state.keys
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

module.exportDefault(connect(mapStateToProps, mapDispatchToProps)(App));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css",
    ".scss"
  ]
});
require("/client/template.main.js");
require("/client/lib/init.js");
require("/client/main.js");