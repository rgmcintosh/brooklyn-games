(function(){
var VC='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
var m=document.querySelector('meta[name=viewport]');if(!m){m=document.createElement('meta');m.name='viewport';document.head.appendChild(m)}m.content=VC;
var s=document.createElement('style');s.textContent='*{touch-action:manipulation}canvas{touch-action:none}html,body{-webkit-text-size-adjust:100%;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}'+
'#zoomReset{position:fixed;right:12px;bottom:12px;z-index:99999;width:64px;height:64px;border-radius:50%;border:3px solid #fff;background:#ff4f9a;color:#fff;font-size:30px;box-shadow:0 4px 12px #0005;display:none;align-items:center;justify-content:center;touch-action:manipulation}';
document.head.appendChild(s);
var opt={passive:false,capture:true};
['gesturestart','gesturechange','gestureend'].forEach(function(e){window.addEventListener(e,function(ev){ev.preventDefault()},opt)});
window.addEventListener('touchstart',function(e){if(e.touches.length>1)e.preventDefault()},opt);
window.addEventListener('touchmove',function(e){if(e.touches.length>1||(e.scale&&e.scale!==1))e.preventDefault()},opt);
var last=0,lx=0,ly=0;window.addEventListener('touchend',function(e){var t=e.changedTouches[0],n=Date.now();
 if(n-last<350&&Math.abs(t.clientX-lx)<40&&Math.abs(t.clientY-ly)<40){e.preventDefault();if(e.target&&e.target.click&&e.target.tagName!=='CANVAS')e.target.click()}
 last=n;lx=t.clientX;ly=t.clientY},opt);
window.addEventListener('dblclick',function(e){e.preventDefault()},opt);
function resetZoom(){m.content=VC.replace('maximum-scale=1','maximum-scale=1.01');setTimeout(function(){m.content=VC;window.scrollTo(0,0)},60)}
window.resetZoom=resetZoom;
function addBtn(){var b=document.createElement('button');b.id='zoomReset';b.textContent='🔍';b.title='Reset zoom';b.setAttribute('aria-label','Reset zoom');
 b.addEventListener('click',function(e){e.stopPropagation();resetZoom()});document.body.appendChild(b);
 var vv=window.visualViewport;function upd(){var z=vv&&vv.scale>1.02;b.style.display=z?'flex':'none';if(z){b.style.transform='scale('+(1/vv.scale)+')';b.style.transformOrigin='bottom right';b.style.left=(vv.offsetLeft+vv.width-76/vv.scale)+'px';b.style.top=(vv.offsetTop+vv.height-76/vv.scale)+'px';b.style.right='auto';b.style.bottom='auto'}}
 if(vv){vv.addEventListener('resize',upd);vv.addEventListener('scroll',upd)}upd()}
// reset-zoom button disabled (auto snap-back below handles zoom)
})();

// Auto snap-back: if Safari ever zooms (or restores a zoomed state on reload), reset to 100%
(function(){var vv=window.visualViewport;if(!vv)return;var busy=false;
function snap(){if(busy||vv.scale<=1.01)return;busy=true;var mm=document.querySelector('meta[name=viewport]');
 mm.content='width=device-width, initial-scale=1, maximum-scale=1.01';
 setTimeout(function(){mm.content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';window.scrollTo(0,0);busy=false;if(vv.scale>1.01)setTimeout(snap,300)},80)}
vv.addEventListener('resize',function(){setTimeout(snap,250)});
window.addEventListener('pageshow',function(){setTimeout(snap,200)});window.addEventListener('load',function(){setTimeout(snap,200)});
document.addEventListener('visibilitychange',function(){if(!document.hidden)setTimeout(snap,200)});})();
