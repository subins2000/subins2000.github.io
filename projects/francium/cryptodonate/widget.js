/*!
 * CryptoDonate <https://subinsb.com/cryptodonate>
 * Copyright Subin Siby
 * Released under the MIT license <https://goo.gl/aPHGJm>
 */
!function(){var e="//lab.subinsb.com/projects/francium/cryptodonate/";window.Fr=window.Fr||{},Fr.loadCD=function(t,n){function o(t){var n=document.createElement("link");n.rel="stylesheet",n.href=e+"/css/"+t,n.id="loadCD-css",document.head.appendChild(n)}"string"==typeof t&&(t=document.getElementById(t)),document.getElementById("loadCD-css")||(o("cryptodonate.css"),n.buttonClass.match("dark")&&o("cryptodonate.dark.css")),function(t){var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.onload=t,n.src=e+"cryptodonate.js";var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(n,o)}(function(){new Fr.CryptoDonate(n).appendTo(t)})}}();
