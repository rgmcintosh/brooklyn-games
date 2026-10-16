(function(){var m=document.querySelector('meta[name=viewport]');if(!m){m=document.createElement('meta');m.name='viewport';document.head.appendChild(m)}m.content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover';
var s=document.createElement('style');s.textContent='html,body{touch-action:manipulation;-webkit-text-size-adjust:100%;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}';document.head.appendChild(s);
['gesturestart','gesturechange','gestureend'].forEach(function(e){document.addEventListener(e,function(ev){ev.preventDefault()},{passive:false})});
document.addEventListener('touchmove',function(e){if(e.touches.length>1)e.preventDefault()},{passive:false});
var last=0;document.addEventListener('touchend',function(e){var n=Date.now();if(n-last<300&&!e.target.closest('input,textarea'))e.preventDefault();last=n},{passive:false});})();
