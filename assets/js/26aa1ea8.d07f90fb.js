"use strict";(self.webpackChunkcashstack_info=self.webpackChunkcashstack_info||[]).push([[936],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return u}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),s=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),h=s(n),u=r,f=h["".concat(l,".").concat(u)]||h[u]||d[u]||i;return n?a.createElement(f,o(o({ref:t},p),{},{components:n})):a.createElement(f,o({ref:t},p))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=h;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var s=2;s<i;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},2871:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return l},default:function(){return u},frontMatter:function(){return c},metadata:function(){return s},toc:function(){return d}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],c={sidebar_position:3},l="Local Back End",s={unversionedId:"local-back-end",id:"local-back-end",title:"Local Back End",description:"The concept of a 'local' back end does not apply to the web 2 paradigm. It's a new concept that only applies in the realm of web 3.",source:"@site/docs/local-back-end.md",sourceDirName:".",slug:"/local-back-end",permalink:"/cashstack.info/docs/local-back-end",editUrl:"https://github.com/Permissionless-Software-Foundation/cashstack.info/tree/main/docs/local-back-end.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Front End",permalink:"/cashstack.info/docs/front-end"},next:{title:"Global Back End",permalink:"/cashstack.info/docs/global-back-end"}},p={},d=[{value:"ipfs-bch-wallet-consumer",id:"ipfs-bch-wallet-consumer",level:2},{value:"bch-consumer",id:"bch-consumer",level:2},{value:"psf-bch-wallet",id:"psf-bch-wallet",level:2},{value:"Wallets and Rapid Prototyping",id:"wallets-and-rapid-prototyping",level:3},{value:"Controlling ipfs-bch-wallet-consumer",id:"controlling-ipfs-bch-wallet-consumer",level:3},{value:"Network Diagnostics",id:"network-diagnostics",level:3},{value:"Encrypted Messaging",id:"encrypted-messaging",level:3},{value:"Pay-to-Write Database",id:"pay-to-write-database",level:3}],h={toc:d};function u(e){var t=e.components,c=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},h,c,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"local-back-end"},"Local Back End"),(0,i.kt)("p",null,"The concept of a 'local' back end does not apply to the web 2 paradigm. It's a new concept that only applies in the realm of web 3."),(0,i.kt)("p",null,"As illustrated in the ",(0,i.kt)("a",{parentName:"p",href:"intro"},"introduction"),", web 2 architecture has a centralized back end which the front end interacts with directly. In our web3 architecture, apps connect to a light-weight 'local' back end, which then proxies the communication over ",(0,i.kt)("a",{parentName:"p",href:"https://ipfs.io"},"IPFS")," to a 'global' back end."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"The main advantages of the web 3 architecture is reducing cost and improving censorship resistance.")),(0,i.kt)("h2",{id:"ipfs-bch-wallet-consumer"},"ipfs-bch-wallet-consumer"),(0,i.kt)("p",null,"The core piece of software making up the local back end is ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/Permissionless-Software-Foundation/ipfs-bch-wallet-consumer"},"ipfs-bch-wallet-consumer"),". This app provides a ",(0,i.kt)("a",{parentName:"p",href:"https://free-bch.fullstack.cash/#api-REST_BCH"},"REST API")," interface for front end apps to query data about the blockchain (and broadcast transactions)."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"ipfs-bch-wallet-consumer")," is configured to connect to one-of-many global back end services. This connection can change on-the-fly during operation in order to optimize performance. ",(0,i.kt)("inlineCode",{parentName:"p"},"ipfs-bch-wallet-consumer")," connects to its mirror-image on the global back end: ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/Permissionless-Software-Foundation/ipfs-bch-wallet-service"},"ips-bch-wallet-service"),". This connection happens by passing end-to-end encrypted (e2ee) messages over the ",(0,i.kt)("a",{parentName:"p",href:"https://ipfs.io"},"IPFS")," network."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Web 3 Architecture",src:n(7113).Z,width:"1343",height:"903"}),"\nA dependency graph, showing how front end apps connect to Web 3 back end services."),(0,i.kt)("h2",{id:"bch-consumer"},"bch-consumer"),(0,i.kt)("p",null,"Front end apps can connect directly to ",(0,i.kt)("inlineCode",{parentName:"p"},"ipfs-bch-wallet-consumer")," via its ",(0,i.kt)("a",{parentName:"p",href:"https://free-bch.fullstack.cash/#api-REST_BCH"},"REST API"),". This is the best option for non-JavaScript applications. But JavaScript applications can leverage the ",(0,i.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/bch-consumer"},"bch-consumer npm library"),"."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"bch-consumer")," is a JavaScript library which provides an easy interface for interacting with ",(0,i.kt)("inlineCode",{parentName:"p"},"ipfs-bch-wallet-consumer"),". It was inspired by the older ",(0,i.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@psf/bch-js"},"bch-js")," JavaScript library, which has similar functionality for the older web 2 architecture."),(0,i.kt)("h2",{id:"psf-bch-wallet"},"psf-bch-wallet"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/Permissionless-Software-Foundation/psf-bch-wallet"},"psf-bch-wallet")," is a command-line interface (CLI) application. It is the 'power tool' for Cash Stack developers. ",(0,i.kt)("inlineCode",{parentName:"p"},"psf-bch-wallet")," is..."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"A wallet for managing cryptocurrency and tokens."),(0,i.kt)("li",{parentName:"ul"},"A rapid prototyping tool for trying out new ideas."),(0,i.kt)("li",{parentName:"ul"},"An app for controlling and configuring ",(0,i.kt)("inlineCode",{parentName:"li"},"ipfs-bch-wallet-consumer"),"."),(0,i.kt)("li",{parentName:"ul"},"A diagnostic tool for debugging network issues."),(0,i.kt)("li",{parentName:"ul"},"A encrypted message app."),(0,i.kt)("li",{parentName:"ul"},"An interface to the pay-to-write database (",(0,i.kt)("a",{parentName:"li",href:"https://github.com/Permissionless-Software-Foundation/ipfs-p2wdb-service"},"P2WDB"),").")),(0,i.kt)("h3",{id:"wallets-and-rapid-prototyping"},"Wallets and Rapid Prototyping"),(0,i.kt)("p",null,"The obvious use of ",(0,i.kt)("inlineCode",{parentName:"p"},"psf-bch-wallet")," is to manage wallets containing BCH and SLP tokens. The CLI app contains all the features available in ",(0,i.kt)("a",{parentName:"p",href:"https://bchn-wallet.fullstack.cash"},"wallet.fullstack.cash"),", plus many additional features. Because there is no cumbersome user interface to deal with, it's much faster for JavaScript developers to hack on the CLI wallet and rapidly prototype new ideas."),(0,i.kt)("h3",{id:"controlling-ipfs-bch-wallet-consumer"},"Controlling ipfs-bch-wallet-consumer"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"psf-bch-wallet")," is the primary way for issuing commands and controlling the network behavior of ",(0,i.kt)("inlineCode",{parentName:"p"},"ipfs-bch-wallet-consumer"),". The ",(0,i.kt)("inlineCode",{parentName:"p"},"wallet-service")," command will list all the global back ends that ",(0,i.kt)("inlineCode",{parentName:"p"},"ipfs-bch-wallet-consumer")," can see on the network. The same command with a ",(0,i.kt)("inlineCode",{parentName:"p"},"-s")," flag can instruct ",(0,i.kt)("inlineCode",{parentName:"p"},"ipfs-bch-wallet-consumer")," to connect to a different global back end. Once connected, the ",(0,i.kt)("inlineCode",{parentName:"p"},"wallet-service-test")," command will run diagnostic tests to ensure the global back end is fully functional and responsive."),(0,i.kt)("p",null,"By default, ",(0,i.kt)("inlineCode",{parentName:"p"},"psf-bch-wallet")," connects to ",(0,i.kt)("a",{parentName:"p",href:"https://free-bch.fullstack.cash"},"free-bch.fullstack.cash"),", which is a publically available instance of ",(0,i.kt)("inlineCode",{parentName:"p"},"ipfs-bch-wallet-consumer"),", but its uptime is not guaranteed. The ",(0,i.kt)("inlineCode",{parentName:"p"},"conf")," command is used to switch to a local instance of ",(0,i.kt)("inlineCode",{parentName:"p"},"ipfs-bch-wallet-consumer"),". Here is an example for switching to a local instance of ",(0,i.kt)("inlineCode",{parentName:"p"},"ipfs-bch-wallet-consumer")," running on port 5005:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"./bin/run conf -k restServer -v http://localhost:5005"))),(0,i.kt)("h3",{id:"network-diagnostics"},"Network Diagnostics"),(0,i.kt)("p",null,"The different ",(0,i.kt)("inlineCode",{parentName:"p"},"ipfs-*")," commands are used for running diagnostics on the IPFS network. These commands are used to interrogate the IPFS node connected to ",(0,i.kt)("inlineCode",{parentName:"p"},"ipfs-bch-wallet-consumer"),". You can list all the connected IPFS peers, and get information on connected ",(0,i.kt)("a",{parentName:"p",href:"https://docs.libp2p.io/concepts/circuit-relay/"},"Circuit Relays"),". Circuit Relays are a critical element in networking and censorship resistance."),(0,i.kt)("h3",{id:"encrypted-messaging"},"Encrypted Messaging"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"psf-bch-wallet")," can send encrypted messages to any other ",(0,i.kt)("inlineCode",{parentName:"p"},"bitcoincash:")," address. It can also decrypt and display any encrypted messages sent to your wallet. These messages are end-to-end encrypted (e2ee) using the same eliptic-curve encryption used to make Bitcoin payments."),(0,i.kt)("h3",{id:"pay-to-write-database"},"Pay-to-Write Database"),(0,i.kt)("p",null,"The pay-to-write database (",(0,i.kt)("a",{parentName:"p",href:"https://github.com/Permissionless-Software-Foundation/ipfs-p2wdb-service"},"P2WDB"),") is a censorship-resistant database. It's similar in many ways to a blockchain, but better optimized for storing data. ",(0,i.kt)("inlineCode",{parentName:"p"},"psf-bch-wallet")," can read and write data to the P2WDB. Raw data can be reviewed at ",(0,i.kt)("a",{parentName:"p",href:"https://explorer.fullstack.cash"},"explorer.fullstack.cash"),"."))}u.isMDXComponent=!0},7113:function(e,t,n){t.Z=n.p+"assets/images/local-back-end-dependencies-c1c2c9341e7a7966b13c2c32328d9e88.png"}}]);