// Optional: put a photo file name/link here (e.g. "letter.jpg") to show it behind the letter text.
// Main photo in the round frame: put the file name here, e.g. "farkhanda.jpg". HERO_POS moves it up/down (0% = top).
const HERO_IMAGE="";
const HERO_POS="12%";
const LETTER_IMAGE="";
let letterImg=LETTER_IMAGE;
const gifts=[
 {env:1,card:1,e:"💌",t:"A Letter for You",m:"<p>Today isn't just another calendar date—it's a celebration of the day the world was blessed with you.</p><p>Ever since you came into my life, every moment has been brighter, warmer, and infinitely more meaningful. 🌹</p>"},
 {e:"💖",t:"Your Smile",m:"<p>Your smile is the easiest way to brighten even my most difficult days.</p>"},
 {e:"🌸",t:"Your Kindness",m:"<p>You possess a heart that is just as pure and beautiful as your smile.</p>"},
 {e:"🤝",t:"Your Support",m:"<p>Thank you for always understanding me and standing by my side.</p>"},
 {env:1,img:"promise.jpg",e:"🤲",t:"My Prayers",m:"<ul><li>🤲 May Allah bless you with long life, perfect health, and peace of mind.</li><li>🌟 May every dream and wish in your heart be fulfilled with ease and success.</li><li>😄 May your life be filled with endless joy, true happiness, and laughter.</li><li>✨ May Allah always protect you from every harm and keep your heart content.</li></ul><p><i>With all my love and prayers,<br>Regards, Asad ❤️</i></p>"},
 {env:1,img:"promise.jpg",e:"🤞",t:"My Promise",m:"<p>Farkhanda, I promise to always stand by you, to keep trying to understand you, and to keep you in my prayers every single day.</p><p>Your happiness will always matter to me. 💍✨</p>"},
 {scratch:1,e:"🎁",t:"Your Gift",m:"<p>Scratch the card with your finger to reveal your birthday gift!</p><div class='scr'><div class='prize'>🎉 A special gift is waiting for you!<br>Ask Asad to claim it 😄🎁</div><canvas id='sc' width='260' height='130'></canvas></div>"},
 {init:()=>meterInit(),e:"💗",t:"Love Meter",m:"<p>Let's measure how much I love you!</p><div class='meter'><div class='mfill' id='mf'></div></div><p id='mt' style='font-weight:600'>Tap the button to measure 💓</p><button class='btn' id='mb' style='margin-bottom:14px'>Measure my love 💗</button>"},
 {init:()=>cardsInit(),e:"🎴",t:"Pick a Card",m:"<p>Pick a card and see what is waiting for you!</p><div class='fcs'><div class='fc'>1</div><div class='fc'>2</div><div class='fc'>3</div></div><img class='pimg' id='pimg' alt='Your gift'><p id='fm' style='min-height:1.8em;font-weight:700'>Tap a card ✨</p><p id='fm2' style='min-height:1.6em;font-weight:600'></p><div id='lost'></div>"},
 {hide:1,init:()=>{fireworks();cannons();$('fimg').src=$('bcard').src},e:"🏆",t:"Grand Finale",m:"<img class='fcard' id='fimg' alt='Birthday card'><p><b>You opened every single surprise!</b></p><p>Farkhanda, you are loved far more than words can ever say. Thank you for being you.</p><p style='font-size:1.3rem'>Happy Birthday! 🎂💖</p><p><i>Forever yours,<br>Asad ❤️</i></p>"}
];
const opened=new Set(),TOTAL=gifts.filter(g=>!g.hide).length,FIN=gifts.findIndex(g=>g.hide);
function closeM(){$('modal').classList.remove('on');if(opened.size===TOTAL&&!window._fin){window._fin=1;setTimeout(()=>show(FIN),600)}}
const $=id=>document.getElementById(id);
gifts.forEach((g,i)=>{if(g.hide)return;const b=document.createElement('button');b.style.animationDelay=(i*.5)+'s';b.className='gift';b.innerHTML=`<span>${g.e}</span>${g.t}`;b.onclick=()=>{show(i);b.classList.add('done')};$('grid').appendChild(b)});
function card(i){const g=gifts[i];$('box').className='box swap'+(g.env&&!g.card?' pbox':'');const im=g.img||letterImg;$('box').style.setProperty('--img',im?'url('+im+')':'none');$('box').style.setProperty('--pos',g.img?'center 8%':'center');$('box').innerHTML=`<button class="x" id="xb" aria-label="Close">✕</button>${g.card?'<img class="fcard" id="ci" alt="Happy Birthday Farkhanda card">':`<div class="em">${g.e}</div>`}<h2 class="script">${g.t}</h2><div class="rv">${g.m}</div><button class="btn" id="cl">${i==4?'Thank you! 💝':'Close'}</button>${g.env&&!g.card&&!g.img?`<button class="addph" id="ap">📷 ${letterImg?'Change':'Add'} photo</button>`:''}`;confetti(70);if(g.card)$('ci').src=$('bcard').src;if(g.env&&!g.card&&!g.img)$('ap').onclick=()=>$('lpick').click();if(g.scratch)initScratch();if(g.init)g.init();$('cl').onclick=$('xb').onclick=closeM}
function show(i){const g=gifts[i];$('modal').classList.add('on');if(!g.hide)opened.add(i);if(!g.env){card(i);return}$('box').className='box envbox swap';$('box').innerHTML=`<div class="env" id="env"><div class="back"></div><div class="letter"></div><div class="front"></div><div class="flap"></div><div class="seal">💖</div></div><p style="font-weight:600;margin:0">Tap the envelope to open it</p>`;const pimg=g.card?$('bcard').src:(g.img||letterImg);if(pimg){const L=$('env').querySelector('.letter');L.style.backgroundImage='url('+pimg+')';L.style.backgroundSize='cover';L.style.backgroundPosition='center'}$('env').onclick=()=>{$('env').classList.add('open');setTimeout(()=>card(i),1500)}}
$('modal').onclick=e=>{if(e.target.id==='modal')closeM()};
function openSite(){$('gate').style.display='none';$('app').style.display='block';$('mute').style.display='block';flash();fireworks();cannons();typeTitle();watchReveal();setTimeout(()=>show(0),2600)}
$('go').onclick=()=>{playMusic();$('go').style.display='none';const c=$('cnt');c.style.display='block';let n=3;const tick=()=>{c.style.animation='none';c.offsetWidth;c.style.animation='pop2 .6s';c.textContent=n};tick();const iv=setInterval(()=>{n--;if(n>0)tick();else{clearInterval(iv);c.textContent='🎂';setTimeout(openSite,600)}},800)};
$('slot').onclick=()=>$('pic').click();
$('slot').onkeydown=e=>{if(e.key==='Enter')$('pic').click()};
$('pic').onchange=e=>{const f=e.target.files[0];if(!f)return;const im=new Image();im.src=URL.createObjectURL(f);$('slot').innerHTML='';$('slot').appendChild(im);$('adj').classList.add('on');$('phint').textContent='Tap the circle to change the photo. Use the sliders so her face fits.'};
$('py').oninput=()=>$('slot').style.setProperty('--py',$('py').value+'%');
$('zm').oninput=()=>$('slot').style.setProperty('--zm',$('zm').value/100);
const bgm=$('bgm');
function playMusic(){if(!bgm.getAttribute('src')||bgm.getAttribute('src').startsWith('PASTE'))return;bgm.volume=.7;bgm.play().then(()=>$('mute').textContent='🔊').catch(()=>$('mute').textContent='🔇')}
$('mute').onclick=()=>{if(bgm.paused){bgm.play();$('mute').textContent='🔊'}else{bgm.pause();$('mute').textContent='🔇'}};
const cols=['#ff5fa2','#ffd98a','#7be0ff','#b57bff','#ff7a59','#7dffb0'];
for(let i=0;i<14;i++){const b=document.createElement('div');b.className='balloon';b.style.left=Math.random()*96+'%';b.style.background=cols[i%6];b.style.animationDuration=(9+Math.random()*10)+'s';b.style.animationDelay=(-Math.random()*14)+'s';document.body.appendChild(b)}
// cake: one tap puts out ALL candles slowly (~2.8s), then celebration, then the final envelope opens
let cakeDone=false,cakeBusy=false;
function blowCake(){if(cakeBusy||cakeDone)return;cakeBusy=true;const cs=document.querySelectorAll('.cd i');cs.forEach(c=>c.classList.add('dying'));$('wmsg').textContent='Make a wish… 💨';
setTimeout(()=>{cs.forEach(c=>c.classList.add('off'));$('wmsg').textContent='May your wish come true, Farkhanda! ✨ Happy Birthday! 🥳';confetti(200);fireworks();cannons();
setTimeout(()=>{cakeDone=true;$('ehint').textContent='One last surprise… 💌';endReady()},5500)},3100)}
$('cake').onclick=blowCake;
for(let i=0;i<12;i++){const h=document.createElement('div');h.className='heart';h.textContent=['❤','💗','💖'][i%3];h.style.left=Math.random()*96+'%';h.style.fontSize=(14+Math.random()*18)+'px';h.style.animationDuration=(10+Math.random()*10)+'s';h.style.animationDelay=(-Math.random()*16)+'s';document.body.appendChild(h)}
const cv=$('fx'),cx=cv.getContext('2d');let P=[];
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();addEventListener('resize',rs);
function confetti(n){const e=P.length;for(let i=0;i<n;i++)P.push({x:innerWidth/2,y:innerHeight*.4,vx:(Math.random()-.5)*16,vy:-Math.random()*14-3,s:Math.random()*8+4,c:cols[i%6],r:Math.random()*6,l:120});if(!e)loop()}
function loop(){cx.clearRect(0,0,cv.width,cv.height);P=P.filter(p=>p.l-->0);P.forEach(p=>{p.vy+=p.f?.07:.35;p.x+=p.vx;p.y+=p.vy;p.r+=.2;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;if(p.f){cx.globalAlpha=Math.max(p.l/60,0);cx.beginPath();cx.arc(0,0,p.s/3,0,7);cx.fill()}else cx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);cx.restore()});if(P.length)requestAnimationFrame(loop)}

// fireworks
function burst(x,y){const e=P.length,c=cols[Math.floor(Math.random()*6)];for(let i=0;i<70;i++){const a=Math.PI*2*i/70,v=2+Math.random()*5;P.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,s:9,c,r:0,l:90,f:1})}if(!e)loop()}
function fireworks(){for(let i=0;i<7;i++)setTimeout(()=>burst(innerWidth*(.15+Math.random()*.7),innerHeight*(.15+Math.random()*.4)),i*380)}
// typewriter title
function typeTitle(){const t=$('title'),full=t.textContent;t.textContent='';let i=0;const iv=setInterval(()=>{t.textContent=full.slice(0,++i);if(i>=full.length)clearInterval(iv)},70)}
// birthday countdown
(function(){const t=new Date(2026,9,15),n=new Date(),d=Math.round((t-new Date(n.getFullYear(),n.getMonth(),n.getDate()))/864e5),el=$('cdn');
if(d>1)el.textContent=`Only ${d} days to your special day, 15th October 🎉`;else if(d===1)el.textContent='Tomorrow is your special day! 🎉';else if(d===0)el.textContent='Today is your special day! 🎉'})();
// scroll reveal
function watchReveal(){const els=document.querySelectorAll('.panel,.reasons,.polas,.grid,.sign,.cardwrap');if(!('IntersectionObserver' in window)){return}const io=new IntersectionObserver(en=>en.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.15});els.forEach(e=>{e.classList.add('rev');io.observe(e)})}
// sparkle trail
let lastSp=0;addEventListener('pointermove',e=>{const n=Date.now();if(n-lastSp<60)return;lastSp=n;const s=document.createElement('div');s.className='sp';s.textContent=['✦','✧','♥'][Math.floor(Math.random()*3)];s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';s.style.fontSize=(10+Math.random()*10)+'px';document.body.appendChild(s);setTimeout(()=>s.remove(),900)});

// scratch card
function initScratch(){const c=$('sc'),x=c.getContext('2d');const g=x.createLinearGradient(0,0,260,130);g.addColorStop(0,'#c9c9d6');g.addColorStop(1,'#8f8fa3');x.fillStyle=g;x.fillRect(0,0,260,130);x.fillStyle='#fff';x.font='600 18px system-ui';x.textAlign='center';x.fillText('✨ Scratch here ✨',130,72);
let down=false,n=0,done=false;const pos=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*260/r.width,(e.clientY-r.top)*130/r.height]};
const sc=e=>{if(!down||done)return;const[px,py]=pos(e);x.globalCompositeOperation='destination-out';x.beginPath();x.arc(px,py,16,0,7);x.fill();if(++n%8===0)check()};
const check=()=>{const d=x.getImageData(0,0,260,130).data;let t=0;for(let i=3;i<d.length;i+=16)if(d[i]===0)t++;if(t/(d.length/16)>.45){done=true;c.style.opacity=0;c.style.pointerEvents='none';confetti(160)}};
c.onpointerdown=e=>{down=true;c.setPointerCapture(e.pointerId);sc(e)};c.onpointermove=sc;c.onpointerup=()=>down=false}

// ---- extra effects ----
function flash(){const f=document.createElement('div');f.style.cssText='position:fixed;inset:0;background:#fff;z-index:90;pointer-events:none;animation:flash .9s forwards';document.body.appendChild(f);setTimeout(()=>f.remove(),900)}
function cannons(){let k=0;const iv=setInterval(()=>{const e=P.length;for(let s=0;s<2;s++)for(let i=0;i<10;i++)P.push({x:s?innerWidth:0,y:innerHeight,vx:(s?-1:1)*(4+Math.random()*9),vy:-(10+Math.random()*12),s:Math.random()*8+4,c:cols[i%6],r:Math.random()*6,l:130});if(!e)loop();if(++k>14)clearInterval(iv)},140)}
function heartsAt(x,y,n,set){for(let i=0;i<n;i++){const h=document.createElement('div');h.className='hb';const S=set||['❤','💖','✨','💗'];h.textContent=S[i%S.length];const a=Math.random()*6.28,d=40+Math.random()*80;h.style.left=x+'px';h.style.top=y+'px';h.style.setProperty('--dx',Math.cos(a)*d+'px');h.style.setProperty('--dy',(Math.sin(a)*d-30)+'px');document.body.appendChild(h);setTimeout(()=>h.remove(),1000)}}
addEventListener('pointerdown',e=>heartsAt(e.clientX,e.clientY,6));
for(let i=0;i<12;i++){const p=document.createElement('div');p.className='petal';p.textContent=['🌹','🌸','🌺'][i%3];p.style.left=Math.random()*94+'%';p.style.fontSize=(16+Math.random()*14)+'px';p.style.animationDuration=(9+Math.random()*8)+'s,'+(2.5+Math.random()*2)+'s';p.style.animationDelay=(-Math.random()*14)+'s,0s';document.body.appendChild(p)}
(function(){if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;const c=$('stars'),x=c.getContext('2d');let w,h,S=[],sh=null;function rz(){w=c.width=innerWidth;h=c.height=innerHeight;S=Array.from({length:Math.floor(w*h/9000)},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.4+.3,p:Math.random()*6}))}rz();addEventListener('resize',rz);
function f(t){x.clearRect(0,0,w,h);x.fillStyle='#fff';S.forEach(s=>{x.globalAlpha=.4+.6*Math.abs(Math.sin(t/900+s.p));x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.fill()});
if(!sh&&Math.random()<.006)sh={x:Math.random()*w*.7,y:Math.random()*h*.4,l:0};
if(sh){x.globalAlpha=1-sh.l/40;x.strokeStyle='#fff';x.lineWidth=2;x.beginPath();x.moveTo(sh.x,sh.y);x.lineTo(sh.x-60,sh.y-30);x.stroke();sh.x+=14;sh.y+=7;if(++sh.l>40)sh=null}
requestAnimationFrame(f)}requestAnimationFrame(f)})();
// love meter
function meterInit(){$('mb').onclick=()=>{$('mb').disabled=true;let v=0;const iv=setInterval(()=>{v+=2;const q=Math.min(v,100);$('mf').style.width=q+'%';$('mt').textContent=q+'% 💓';if(v>=100){clearInterval(iv);$('mt').textContent='∞ Infinite! My love for you can never be measured 💞';confetti(120);heartsAt(innerWidth/2,innerHeight/2,20)}},40)}}
// pick a card
function cardsInit(){const win={e:'💐',i:'gift_bouquet.jpg'},lost=[{e:'💍',t:'Gold Ring',i:'gift_ring.jpg'},{e:'✨',t:'Nose Pin',i:'gift_nose.jpg'}];let done=false;
const cards=[...document.querySelectorAll('.fc')],im=$('pimg');
const toBottom=()=>$('box').scrollTo({top:$('box').scrollHeight,behavior:'smooth'});
cards.forEach((c,k)=>c.onclick=()=>{if(done)return;done=true;
c.classList.add('flip');c.textContent=win.e;
im.style.display='block';im.src=win.i;im.style.animation='none';im.offsetWidth;im.style.animation='';
$('fm').textContent='🎉 Congratulations, Farkhanda! 🎉';$('fm').style.cssText='font-size:1.4rem;font-weight:700;color:#b3236b;min-height:1.8em';
$('fm2').textContent='You picked the lucky card! Your special gift is a Bouquet with Chocolates 💐🍫 A bouquet of happiness and sweetness. Happy Birthday! 💝';
confetti(220);fireworks();cannons();heartsAt(innerWidth/2,innerHeight/2,22);
const others=cards.filter((_,j)=>j!==k);
others.forEach((o,n)=>setTimeout(()=>{const it=lost[n];o.classList.add('flip','lost');o.textContent=it.e;
const d=document.createElement('div');d.className='sorry';d.innerHTML='<img src="'+it.i+'" alt="'+it.t+'"><div><b>Oh no, sorry! 😢</b><br>Unfortunately, you could not get the '+it.t+' this time.</div>';$('lost').appendChild(d);
const r=o.getBoundingClientRect();heartsAt(r.left+r.width/2,r.top+r.height/2,8,['😢','💔','🥺','😞']);if(n===0)setTimeout(()=>d.scrollIntoView({behavior:'smooth',block:'start'}),250);
if(n===others.length-1)setTimeout(()=>{const f=document.createElement('p');f.style.cssText='font-weight:700;margin:8px 0 14px;animation:fadeup .6s both';f.textContent='But your Bouquet with Chocolates is all yours! 💐🍫';$('lost').appendChild(f)},1200)},1600))})}

// letter photo picker
$('lpick').onchange=e=>{const f=e.target.files[0];if(!f)return;letterImg=URL.createObjectURL(f);$('box').style.setProperty('--img','url('+letterImg+')');const ap=$('ap');if(ap)ap.textContent='📷 Change photo'};


// last envelope: opens when you reach the end, closes again when you scroll away
let endTimers=[],endOpen=false;
function openEnd(){if(endOpen)return;if(!cakeDone){lockedHint();return}endOpen=true;const e=$('eenv');e.querySelector('.letter').style.cssText='background-image:url('+$('asadimg').src+');background-size:cover;background-position:top';e.classList.add('open');$('ehint').style.display='none';confetti(80);
endTimers.push(setTimeout(()=>{e.style.display='none';$('sigcard').classList.add('show');$('sigcard').scrollIntoView({behavior:'smooth',block:'center'});heartsAt(innerWidth/2,innerHeight/2,18);fireworks()},1600))}
function resetEnd(){if(!endOpen)return;endOpen=false;endTimers.forEach(clearTimeout);endTimers=[];const e=$('eenv');e.classList.remove('open');e.style.display='';$('sigcard').classList.remove('show');$('ehint').style.display='';$('ehint').textContent=cakeDone?'One last surprise… 💌':'First blow out the candles on the cake 🎂'}
$('eenv').onclick=openEnd;$('eenv').onkeydown=e=>{if(e.key==='Enter')openEnd()};
if('IntersectionObserver' in window){
new IntersectionObserver(en=>{if(en[0].isIntersecting&&!endOpen)endTimers.push(setTimeout(openEnd,700))},{threshold:.85}).observe($('eenv'));
new IntersectionObserver(en=>{if(!en[0].isIntersecting)resetEnd()},{threshold:0}).observe($('endwrap'))}

// preset main photo (from HERO_IMAGE above)
if(HERO_IMAGE){const im=new Image();im.src=HERO_IMAGE;$('slot').innerHTML='';$('slot').appendChild(im);$('slot').style.setProperty('--py',HERO_POS);$('phint').textContent='Tap the circle to change the photo'}

// final envelope stays locked until the cake celebration is finished
$('ehint').textContent='First blow out the candles on the cake 🎂';
function lockedHint(){$('ehint').textContent='First blow out the candles on the cake 🎂';const e=$('eenv');e.classList.add('shake');setTimeout(()=>e.classList.remove('shake'),480)}
function endReady(){$('eenv').scrollIntoView({behavior:'smooth',block:'center'});setTimeout(openEnd,1000)}
