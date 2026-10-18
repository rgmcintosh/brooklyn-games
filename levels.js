// Gentle level-ups: no score, no timer, no fail. LV.up(name) shows a ~2s celebration then calls onScene.
(function(){
var unlocked=false;function unlock(){if(unlocked)return;unlocked=true;try{var u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u)}catch(e){}}
['pointerdown','touchstart','keydown'].forEach(function(ev){addEventListener(ev,unlock,{capture:true,passive:true})});
function say(t){if(!unlocked||!window.speechSynthesis)return;try{if(speechSynthesis.speaking||speechSynthesis.pending)speechSynthesis.cancel();setTimeout(function(){var u=new SpeechSynthesisUtterance(t);u.rate=.95;u.pitch=1.3;speechSynthesis.speak(u)},60)}catch(e){}}
var st=document.createElement('style');st.textContent='#lvInd{position:fixed;top:12px;left:50%;transform:translateX(-50%);font-size:30px;z-index:50;pointer-events:none;text-shadow:0 2px 4px rgba(0,0,0,.3)}#lvOv{position:fixed;inset:0;z-index:60;display:none;align-items:center;justify-content:center;pointer-events:none;overflow:hidden}#lvOv .msg{font:bold 13vmin sans-serif;color:#fff;text-shadow:0 4px 0 #e91e63,0 8px 16px rgba(0,0,0,.35);animation:lvPop .5s ease-out;text-align:center}#lvOv .cf{position:absolute;font-size:6vmin;animation:lvFly 1.8s ease-out forwards}@keyframes lvPop{0%{transform:scale(.2)}70%{transform:scale(1.15)}100%{transform:scale(1)}}@keyframes lvFly{to{transform:translate(var(--dx),var(--dy)) rotate(540deg);opacity:0}}';
document.head.appendChild(st);
var ind,ov,busy=false;
function ensure(){if(ind)return;ind=document.createElement('div');ind.id='lvInd';ov=document.createElement('div');ov.id='lvOv';document.body.appendChild(ind);document.body.appendChild(ov);draw()}
function draw(){if(ind)ind.textContent='⭐'.repeat(Math.min(LV.level,10))}
window.LV={level:1,msg:null,busy:function(){return busy},onScene:null,
 up:function(name){ensure();if(busy)return;busy=true;
  ov.innerHTML='<div class="msg">'+(LV.msg||'You did it! 🎉')+'</div>';ov.style.display='flex';
  var em=['⭐','🌟','🎉','✨','🎊','💖','🌈'];
  for(var i=0;i<40;i++){var s=document.createElement('div');s.className='cf';s.textContent=em[i%em.length];var a=Math.random()*6.28,r=30+Math.random()*50;
   s.style.left='50%';s.style.top='50%';s.style.setProperty('--dx',Math.cos(a)*r+'vw');s.style.setProperty('--dy',Math.sin(a)*r+'vh');s.style.animationDelay=(Math.random()*.3)+'s';ov.appendChild(s)}
  say('You did it! Yay! '+(name?"Let's go to the "+name+'!':''));
  setTimeout(function(){LV.level++;draw();if(LV.onScene)LV.onScene(LV.level);},1100);
  setTimeout(function(){ov.style.display='none';ov.innerHTML='';busy=false},2200)}};
addEventListener('DOMContentLoaded',ensure);if(document.readyState!=='loading')setTimeout(ensure,0);
})();
