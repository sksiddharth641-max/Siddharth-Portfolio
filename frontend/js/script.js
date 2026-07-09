const pl = document.getElementById('pointer-light');
document.addEventListener('mousemove', e => {
  pl.style.left = e.clientX + 'px';
  pl.style.top = e.clientY + 'px';
}, {passive:true});

// ========== BG CANVAS (Editing themed) ==========
(function(){
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, nodes=[], lines=[], filmStrips=[], particles=[];

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  // Floating timeline nodes
  for(let i=0;i<18;i++){
    nodes.push({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-.5)*.3, vy: (Math.random()-.5)*.3,
      r: 2+Math.random()*3,
      color: Math.random()>.5?'rgba(59,130,246,':'rgba(139,92,246,',
      opacity: .1+Math.random()*.2
    });
  }

  // Film strip horizontal lines
  for(let i=0;i<6;i++){
    filmStrips.push({
      y: Math.random()*H, speed: .15+Math.random()*.25,
      opacity: .03+Math.random()*.04, width: 80+Math.random()*120
    });
  }

  // Floating particles (frame-like)
  for(let i=0;i<30;i++){
    particles.push({
      x: Math.random()*W, y: Math.random()*H,
      vy: -.2-Math.random()*.4,
      vx: (Math.random()-.5)*.15,
      size: 1+Math.random()*2,
      opacity: 0, maxOp: .15+Math.random()*.2,
      life: Math.random(),
    });
  }

  function draw(){
    ctx.clearRect(0,0,W,H);

    // Grid lines (timeline grid)
    ctx.strokeStyle='rgba(59,130,246,0.025)';
    ctx.lineWidth=1;
    for(let x=0;x<W;x+=80){
      ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();
    }
    for(let y=0;y<H;y+=80){
      ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();
    }

    // Film strip tracks at bottom
    filmStrips.forEach(fs=>{
      fs.y -= fs.speed;
      if(fs.y < -20) fs.y = H + 20;
      ctx.fillStyle=`rgba(59,130,246,${fs.opacity})`;
      for(let x=0;x<W;x+=fs.width+16){
        ctx.fillRect(x,fs.y,fs.width,8);
        // Sprocket holes
        ctx.clearRect(x+4,fs.y+1,10,6);
        ctx.clearRect(x+fs.width-14,fs.y+1,10,6);
      }
    });

    // Floating keyframe dots
    nodes.forEach(n=>{
      n.x+=n.vx; n.y+=n.vy;
      if(n.x<0||n.x>W) n.vx*=-1;
      if(n.y<0||n.y>H) n.vy*=-1;
      ctx.beginPath();
      ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
      ctx.fillStyle=n.color+n.opacity+')';
      ctx.fill();
      // Diamond keyframe marker
      ctx.save();ctx.translate(n.x+n.r*3,n.y);ctx.rotate(Math.PI/4);
      ctx.fillStyle=n.color+(n.opacity*.7)+')';
      ctx.fillRect(-3,-3,6,6);
      ctx.restore();
    });

    // Draw connections between close nodes
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<200){
          const op = (1-dist/200)*.04;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x,nodes[i].y);
          ctx.lineTo(nodes[j].x,nodes[j].y);
          ctx.strokeStyle=`rgba(59,130,246,${op})`;
          ctx.lineWidth=1;ctx.stroke();
        }
      }
    }

    // Particles
    particles.forEach(p=>{
      p.y+=p.vy; p.x+=p.vx; p.life+=.004;
      p.opacity = Math.sin(p.life*Math.PI)*p.maxOp;
      if(p.life>=1){p.life=0;p.x=Math.random()*W;p.y=H+10;}
      ctx.fillStyle=`rgba(139,92,246,${Math.max(0,p.opacity)})`;
      ctx.fillRect(p.x,p.y,p.size,p.size);
    });

    // Waveform at bottom
    const wfY = H-30;
    ctx.strokeStyle='rgba(6,182,212,0.06)';
    ctx.lineWidth=1.5;
    ctx.beginPath();
    for(let x=0;x<W;x+=4){
      const amp = 12*Math.sin(x*.05+Date.now()*.001);
      if(x===0) ctx.moveTo(x,wfY+amp); else ctx.lineTo(x,wfY+amp);
    }
    ctx.stroke();

    requestAnimationFrame(draw);
  }
  draw();
})();

// ========== TICKER ==========
const tickerItems = [
  'Video Editing','Color Grading','Motion Graphics','Sound Design',
  'Wedding Films','YouTube Content','Commercial Ads','Instagram Reels',
  'Corporate Videos','After Effects','DaVinci Resolve','Adobe Premiere',
  'Cinematic Cuts','4K Exports','Fast Delivery','Client Satisfaction',
];
(function buildTicker(){
  const track = document.getElementById('tickerTrack');
  if(!track) return;
  const doubled = [...tickerItems,...tickerItems,...tickerItems,...tickerItems];
  track.innerHTML = doubled.map(t=>`<span class="ticker-item">${t}<span class="ticker-dot">◆</span></span>`).join('');
})();

// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled',window.scrollY>60);
},{passive:true});

// ========== MOBILE MENU ==========
document.getElementById('navToggle').addEventListener('click',()=>document.getElementById('mobileMenu').classList.add('open'));
document.getElementById('mobileClose').addEventListener('click',()=>document.getElementById('mobileMenu').classList.remove('open'));
function closeMobile(){document.getElementById('mobileMenu').classList.remove('open');}

// ========== SCROLL REVEAL ==========
const revObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis');});
},{threshold:.08});
document.querySelectorAll('.rev').forEach(el=>revObs.observe(el));

// ========== SKILL RINGS (animate on reveal) ==========
const skillObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.sk-fill').forEach(ring=>{
        const target = parseInt(ring.getAttribute('data-offset'));
        setTimeout(()=>{ring.style.strokeDashoffset=target;},100);
      });
    }
  });
},{threshold:.2});
document.querySelectorAll('.sk-card').forEach(c=>skillObs.observe(c));

// ========== PLAYHEAD ANIMATION ==========
const ph = document.getElementById('playhead');
if(ph){let pos=5,dir=1;setInterval(()=>{pos+=dir*.5;if(pos>92||pos<5)dir*=-1;ph.style.left=pos+'%';},50);}

// ========== WAVEFORM CLIPS ==========
const wfc = document.getElementById('wf-clips');
if(wfc){
  const heights=[6,10,14,8,12,16,10,8,14,12,6,10,14,8,12,16,10,8,14,12,6,10,14,8,12,16,10,8,14,12,6,10,14,8,12,16,10,8];
  wfc.innerHTML=heights.map(h=>`<span style="display:inline-block;width:2px;height:${h}px;background:rgba(6,182,212,.7);margin:0 .5px;border-radius:1px;vertical-align:middle"></span>`).join('');
}

// ========== GALLERY ==========
const galleryData=[
  {cat:'wedding',title:'Lake Como Wedding',emoji:'💍',h:200},
  {cat:'youtube',title:'Tech Channel Intro',emoji:'▶',h:160},
  {cat:'commercial',title:'Sneaker Drop Ad',emoji:'👟',h:220},
  {cat:'instagram',title:'Coffee Brand Reel',emoji:'☕',h:180},
  {cat:'travel',title:'Iceland Adventure',emoji:'🌋',h:240},
  {cat:'music',title:'Indie Single MV',emoji:'🎵',h:200},
  {cat:'corporate',title:'Startup Profile',emoji:'🏢',h:160},
  {cat:'motion',title:'Logo Animation',emoji:'✨',h:180},
  {cat:'wedding',title:'Bali Destination',emoji:'🌺',h:220},
  {cat:'youtube',title:'Cooking Channel',emoji:'🍳',h:200},
  {cat:'commercial',title:'Watch Campaign',emoji:'⌚',h:170},
  {cat:'instagram',title:'Fashion Week Reel',emoji:'👗',h:240},
  {cat:'travel',title:'Southeast Asia',emoji:'🏝️',h:190},
  {cat:'music',title:'Hip-Hop MV',emoji:'🎤',h:210},
];
const grads=[
  'linear-gradient(135deg,#0f2027,#203a43)','linear-gradient(135deg,#1a1a2e,#0f3460)',
  'linear-gradient(135deg,#200122,#6f0000)','linear-gradient(135deg,#0a3d0a,#145214)',
  'linear-gradient(135deg,#2d1b69,#5b21b6)','linear-gradient(135deg,#0f0c29,#302b63)',
  'linear-gradient(135deg,#1c1c1c,#3a3a3a)','linear-gradient(135deg,#0d1117,#1a2332)',
];

// Build filter tabs
const cats=['all','wedding','corporate','youtube','commercial','instagram','travel','music','motion'];
const filterDiv=document.getElementById('filterTabs');
cats.forEach(c=>{
  const b=document.createElement('button');
  b.className='ftab'+(c==='all'?' act':'');b.dataset.filter=c;
  b.textContent=c==='all'?'All':c.charAt(0).toUpperCase()+c.slice(1);
  filterDiv.appendChild(b);
  b.addEventListener('click',()=>{
    document.querySelectorAll('.ftab').forEach(t=>t.classList.remove('act'));
    b.classList.add('act');
    document.querySelectorAll('.mi').forEach(item=>{
      const show = c==='all'||item.dataset.cat===c;
      item.style.transition='opacity .4s ease,transform .4s ease';
      item.style.opacity=show?'1':'0.12';
      item.style.transform=show?'':'scale(.94)';
    });
  });
});

// Build gallery items
const grid=document.getElementById('galleryGrid');
galleryData.forEach((item,i)=>{
  const div=document.createElement('div');
  div.className='mi rev';div.dataset.cat=item.cat;
  div.innerHTML=`
    <div class="mi-thumb" style="height:${item.h}px;background:${grads[i%8]}">
      <div class="mi-thumb-in">${item.emoji}</div>
      <div class="mi-play">▶</div>
      <div class="mi-overlay">
        <div class="mi-cat">${item.cat}</div>
        <div class="mi-title">${item.title}</div>
      </div>
    </div>`;
  grid.appendChild(div);
  revObs.observe(div);

  // 3D tilt effect
  div.addEventListener('mousemove',e=>{
    const rect=div.getBoundingClientRect();
    const cx=rect.left+rect.width/2;
    const cy=rect.top+rect.height/2;
    const rx=((e.clientY-cy)/rect.height)*12;
    const ry=-((e.clientX-cx)/rect.width)*12;
    div.style.transform=`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    div.style.animationPlayState='paused';
  });
  div.addEventListener('mouseleave',()=>{
    div.style.transform='';div.style.animationPlayState='running';
  });
});

// ========== FORM HANDLERS ==========
// Contact Form
  async function submitContact(event) {

    console.log("Submit button clicked!");

    event.preventDefault();

    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = "Sending...";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const projectType = document.getElementById("projectType").value;
    const budget = document.getElementById("budget").value;
    const message = document.getElementById("message").value.trim();

    try {

        const response = await fetch("https://siddharth-portfolio-o283.onrender.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email, 
                phone,
                projectType,
                budget,
                message
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {

            btn.innerHTML = "✓ Sent!";
            btn.style.background = "linear-gradient(135deg,#10b981,#06B6D4)";

            alert("✅ Thank you! Your inquiry has been sent successfully.");

            document.getElementById("contactForm").reset();

        } else {

            alert(data.message || "❌ Failed to send inquiry.");

            btn.innerHTML = originalText;

        }

    } catch (error) {

        console.error("Error:", error);

        alert("❌ Unable to connect to the server.");

        btn.innerHTML = originalText;

    }

    btn.disabled = false;

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = "";
    }, 3000);

}


// Review Form
function submitReview(event) {

    event.preventDefault();

    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = "✓ Review Submitted!";
    btn.style.background = "linear-gradient(135deg,#10b981,#06B6D4)";

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = "";
    }, 3000);

}
console.log("JavaScript Loaded Successfully");
