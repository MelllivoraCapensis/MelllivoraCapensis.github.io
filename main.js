!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="dist/",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var o=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.requestValue=t,this.pageToken="",this.items=[],this.size=null,this.restOfClips=null,this.width=null,this.leftScroll=0,this.itemWidth=280,this.itemMarginRight=30,document.body.onresize=function(){n.setSize(document.body.offsetWidth),n.setRestOfClips()},this.createItemsBoxDom(),this.createItemsWrapperDom()}var t,n,o;return t=e,(n=[{key:"createInterface",value:function(e){this.addItems(e),this.setSize(document.body.offsetWidth),this.setMouseSwipe(),this.setMobileSwipe(),this.setRestOfClips()}},{key:"createItemsBoxDom",value:function(){this.itemsBoxDom=document.createElement("div"),this.itemsBoxDom.id="itemsBoxDom"}},{key:"createItemsWrapperDom",value:function(){this.itemsWrapperDom=document.createElement("div"),this.itemsWrapperDom.id="itemsWrapperDom",this.itemsBoxDom.appendChild(this.itemsWrapperDom)}},{key:"addItems",value:function(e){var t=this;e.forEach(function(e){t.items.push(e);var n=function(e){var t=document.createElement("div");t.classList.add("itemDom");var n=document.createElement("a");n.href="https://youtube.com/watch?v=".concat(e.id),n.innerHTML=e.title,n.target="_blank",n.classList.add("itemTitle"),t.appendChild(n);var i=document.createElement("img");i.src=e.imageUrl,i.classList.add("itemImage"),t.appendChild(i);var o=document.createElement("div");o.classList.add("itemChannel"),o.innerHTML="Канал: "+e.channelTitle,t.appendChild(o);var s=document.createElement("div");s.innerHTML=e.description.slice(0,160),s.classList.add("itemDescription"),t.appendChild(s);var r=document.createElement("div");r.classList.add("itemViewCount");var a=new Intl.NumberFormat("ru");r.innerHTML=a.format(e.viewCount),t.appendChild(r);var u=document.createElement("a");return u.classList.add("itemButton"),u.innerHTML="Перейти",u.href="https://youtube.com/watch?v=".concat(e.id),u.target="_blank",t.appendChild(u),t}(e);t.itemsWrapperDom.appendChild(n)})}},{key:"stopSwiping",value:function(){this.itemsWrapperDom.onmousedown=null,this.itemsWrapperDom.ontouchstart=null,document.body.onresize=null}},{key:"startSwiping",value:function(){var e=this;this.setMouseSwipe(),this.setMobileSwipe(),document.body.onresize=function(){e.setSize(document.body.offsetWidth),e.setRestOfClips()}}},{key:"setSize",value:function(e){this.size=Math.min(4,Math.floor(e/(this.itemWidth+this.itemMarginRight))),this.width=this.size*(this.itemWidth+this.itemMarginRight)-this.itemMarginRight,this.itemsBoxDom.style.width="".concat(this.width,"px")}},{key:"setRestOfClips",value:function(){this.restOfClips=this.items.length-this.size+this.leftScroll,this.restOfClips<this.size&&this.makeRequest()}},{key:"setMouseSwipe",value:function(){var e=this,t=this.itemsWrapperDom,n=0;t.ondragstart=function(){return!1},t.onmousedown=function(i){var o=e.leftScroll,s=i.pageX;t.onmousemove=function(i){n=i.pageX-s;var r=function(){n=e.size*Math.sign(n)*(Math.abs(n)>20?1:0),e.leftScroll=Math.min(0,o+n),new Promise(function(t){e.setRestOfClips(),t()}).then(function(){t.style.left="".concat(e.leftScroll*(e.itemWidth+e.itemMarginRight),"px")}),t.onmousemove=null,t.onmouseleave=null,window.onmouseup=null};t.onmouseleave=r,window.onmouseup=r},t.onmouseup=function(){t.onmousemove=null}}}},{key:"setMobileSwipe",value:function(){var e=this,t=this.itemsWrapperDom;t.ontouchstart=function(n){var i=e.leftScroll,o=n.touches[0].pageX;t.ontouchmove=function(n){var s=n.touches[0].pageX-o;t.ontouchend=function(){s=Math.abs(s)>10?e.size*Math.sign(s):0,e.leftScroll=Math.min(0,i+s),t.ontouchend=null,t.ontouchmove=null,new Promise(function(t){e.setRestOfClips(),t()}).then(function(){t.style.left="".concat(e.leftScroll*(e.itemWidth+e.itemMarginRight),"px")})}}}}},{key:"makeRequest",value:function(){var e,t,n,i,o=this;this.stopSwiping(),(e=this.requestValue,t=this.pageToken,n={},i=function(e,t,n,i){return"https://www.googleapis.com/youtube/v3/".concat(t,"?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=").concat(e,"&maxResults=8&q=").concat(n,"&pageToken=").concat(i)}("snippet","search",e,t),fetch(i).then(function(e){return e.json()}).then(function(e){n.pageToken=e.nextPageToken,n.itemsArr=e.items.map(function(e){return{title:e.snippet.title,description:e.snippet.description,channelId:e.snippet.channelId,channelTitle:e.snippet.channelTitle,id:e.id.videoId,imageUrl:e.snippet.thumbnails.medium.url}});var t=function(e,t){return"https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=".concat(e,"&part=").concat(t)}(n.itemsArr.reduce(function(e,t,n){return e+=(0===n?"":",")+t.id},""),"snippet,statistics");return fetch(t)}).then(function(e){return e.json()}).then(function(e){var t=e.items;return n.itemsArr.forEach(function(e,n){e.viewCount=t[n].statistics.viewCount}),n})).then(function(e){o.pageToken=e.pageToken,0===o.items.length?o.createInterface(e.itemsArr):o.items.length>0&&o.addItems(e.itemsArr),o.startSwiping()})}}])&&i(t.prototype,n),o&&i(t,o),e}();!function(){var e=document.createElement("div");e.id="searchBox";var t=document.createElement("input");t.id="searchField",e.appendChild(t);var n=document.createElement("input");n.type="button",n.value="Искать",n.id="searchButton",e.appendChild(n),document.body.appendChild(e)}();var s=document.getElementById("searchField"),r=document.getElementById("searchButton"),a=document.createElement("div");document.body.appendChild(a),r.onclick=function(){a.innerHTML="";var e=new o(s.value);a.appendChild(e.itemsBoxDom),e.makeRequest()}}]);