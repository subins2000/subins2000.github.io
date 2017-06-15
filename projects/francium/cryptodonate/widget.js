/*!
 * CryptoDonate <https://subinsb.com/cryptodonate>
 * Copyright Subin Siby
 * Released under the MIT license <https://goo.gl/aPHGJm>
 */
!function(){var t="//lab.subinsb.com/projects/francium/cryptodonate/";window.Fr=window.Fr||{},Fr.loadCD=function(e,n){function o(e){var n=document.createElement("link");n.rel="stylesheet",n.href=t+"/css/"+e,n.id="loadCD-css",document.head.appendChild(n)}"string"==typeof e&&(e=document.getElementById(e)),document.getElementById("loadCD-css")||(o("cryptodonate.css"),void 0!==n.buttonClass&&n.buttonClass.match("dark")&&o("cryptodonate.dark.css")),function(e){if(void 0===Fr.CryptoDonate){var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.onload=e,n.src=t+"cryptodonate.js";var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(n,o)}else e()}(function(){new Fr.CryptoDonate(n).appendTo(e)})}}();
