// ============================================================
// POINTER LIGHT
// ============================================================

const pl = document.getElementById('pointer-light');

if (pl) {
  document.addEventListener('mousemove', e => {
    pl.style.left = e.clientX + 'px';
    pl.style.top = e.clientY + 'px';
  }, { passive: true });
}


// ============================================================
// BACKGROUND CANVAS - EDITING THEMED
// ============================================================

(function () {

  const canvas = document.getElementById('bg-canvas');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  let W, H;
  let nodes = [];
  let filmStrips = [];
  let particles = [];

  function resize() {

    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;

  }

  resize();

  window.addEventListener('resize', resize, { passive: true });


  // Floating timeline nodes
  for (let i = 0; i < 18; i++) {

    nodes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: 2 + Math.random() * 3,
      color: Math.random() > 0.5
        ? 'rgba(59,130,246,'
        : 'rgba(139,92,246,',
      opacity: 0.1 + Math.random() * 0.2
    });

  }


  // Film strips
  for (let i = 0; i < 6; i++) {

    filmStrips.push({
      y: Math.random() * H,
      speed: 0.15 + Math.random() * 0.25,
      opacity: 0.03 + Math.random() * 0.04,
      width: 80 + Math.random() * 120
    });

  }


  // Floating particles
  for (let i = 0; i < 30; i++) {

    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vy: -0.2 - Math.random() * 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      size: 1 + Math.random() * 2,
      opacity: 0,
      maxOp: 0.15 + Math.random() * 0.2,
      life: Math.random()
    });

  }


  function draw() {

    ctx.clearRect(0, 0, W, H);


    // Grid
    ctx.strokeStyle = 'rgba(59,130,246,0.025)';
    ctx.lineWidth = 1;

    for (let x = 0; x < W; x += 80) {

      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();

    }

    for (let y = 0; y < H; y += 80) {

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();

    }


    // Film strips
    filmStrips.forEach(fs => {

      fs.y -= fs.speed;

      if (fs.y < -20) {
        fs.y = H + 20;
      }

      ctx.fillStyle = `rgba(59,130,246,${fs.opacity})`;

      for (let x = 0; x < W; x += fs.width + 16) {

        ctx.fillRect(x, fs.y, fs.width, 8);

        ctx.clearRect(x + 4, fs.y + 1, 10, 6);

        ctx.clearRect(
          x + fs.width - 14,
          fs.y + 1,
          10,
          6
        );

      }

    });


    // Floating keyframes
    nodes.forEach(n => {

      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      ctx.beginPath();

      ctx.arc(
        n.x,
        n.y,
        n.r,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = n.color + n.opacity + ')';

      ctx.fill();


      // Diamond
      ctx.save();

      ctx.translate(
        n.x + n.r * 3,
        n.y
      );

      ctx.rotate(Math.PI / 4);

      ctx.fillStyle =
        n.color +
        (n.opacity * 0.7) +
        ')';

      ctx.fillRect(-3, -3, 6, 6);

      ctx.restore();

    });


    // Connections
    for (let i = 0; i < nodes.length; i++) {

      for (let j = i + 1; j < nodes.length; j++) {

        const dx =
          nodes[i].x - nodes[j].x;

        const dy =
          nodes[i].y - nodes[j].y;

        const dist =
          Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {

          const op =
            (1 - dist / 200) * 0.04;

          ctx.beginPath();

          ctx.moveTo(
            nodes[i].x,
            nodes[i].y
          );

          ctx.lineTo(
            nodes[j].x,
            nodes[j].y
          );

          ctx.strokeStyle =
            `rgba(59,130,246,${op})`;

          ctx.lineWidth = 1;

          ctx.stroke();

        }

      }

    }


    // Particles
    particles.forEach(p => {

      p.y += p.vy;
      p.x += p.vx;

      p.life += 0.004;

      p.opacity =
        Math.sin(p.life * Math.PI) *
        p.maxOp;

      if (p.life >= 1) {

        p.life = 0;
        p.x = Math.random() * W;
        p.y = H + 10;

      }

      ctx.fillStyle =
        `rgba(139,92,246,${Math.max(0, p.opacity)})`;

      ctx.fillRect(
        p.x,
        p.y,
        p.size,
        p.size
      );

    });


    // Waveform
    const wfY = H - 30;

    ctx.strokeStyle =
      'rgba(6,182,212,0.06)';

    ctx.lineWidth = 1.5;

    ctx.beginPath();

    for (let x = 0; x < W; x += 4) {

      const amp =
        12 *
        Math.sin(
          x * 0.05 +
          Date.now() * 0.001
        );

      if (x === 0) {

        ctx.moveTo(
          x,
          wfY + amp
        );

      } else {

        ctx.lineTo(
          x,
          wfY + amp
        );

      }

    }

    ctx.stroke();

    requestAnimationFrame(draw);

  }

  draw();

})();


// ============================================================
// TICKER
// ============================================================

const tickerItems = [

  'Video Editing',
  'Color Grading',
  'Motion Graphics',
  'Sound Design',
  'Wedding Films',
  'YouTube Content',
  'Commercial Ads',
  'Instagram Reels',
  'Corporate Videos',
  'After Effects',
  'DaVinci Resolve',
  'Adobe Premiere',
  'Cinematic Cuts',
  '4K Exports',
  'Fast Delivery',
  'Client Satisfaction'

];


(function buildTicker() {

  const track =
    document.getElementById('tickerTrack');

  if (!track) return;

  const doubled = [
    ...tickerItems,
    ...tickerItems,
    ...tickerItems,
    ...tickerItems
  ];

  track.innerHTML =
    doubled.map(t => `

      <span class="ticker-item">

        ${t}

        <span class="ticker-dot">
          ◆
        </span>

      </span>

    `).join('');

})();


// ============================================================
// NAVBAR SCROLL
// ============================================================

const navbar =
  document.getElementById('navbar');

if (navbar) {

  window.addEventListener('scroll', () => {

    navbar.classList.toggle(
      'scrolled',
      window.scrollY > 60
    );

  }, { passive: true });

}


// ============================================================
// MOBILE MENU
// ============================================================

const navToggle =
  document.getElementById('navToggle');

const mobileMenu =
  document.getElementById('mobileMenu');

const mobileClose =
  document.getElementById('mobileClose');


if (navToggle && mobileMenu) {

  navToggle.addEventListener(
    'click',
    () => {
      mobileMenu.classList.add('open');
    }
  );

}


if (mobileClose && mobileMenu) {

  mobileClose.addEventListener(
    'click',
    () => {
      mobileMenu.classList.remove('open');
    }
  );

}


function closeMobile() {

  if (mobileMenu) {

    mobileMenu.classList.remove('open');

  }

}


// ============================================================
// SCROLL REVEAL
// ============================================================

const revObs =
  new IntersectionObserver(
    entries => {

      entries.forEach(e => {

        if (e.isIntersecting) {

          e.target.classList.add('vis');

        }

      });

    },
    {
      threshold: 0.08
    }
  );


document
  .querySelectorAll('.rev')
  .forEach(el => {

    revObs.observe(el);

  });


// ============================================================
// SKILL RINGS
// ============================================================

const skillObs =
  new IntersectionObserver(
    entries => {

      entries.forEach(e => {

        if (e.isIntersecting) {

          e.target
            .querySelectorAll('.sk-fill')
            .forEach(ring => {

              const target =
                parseInt(
                  ring.getAttribute(
                    'data-offset'
                  )
                );

              setTimeout(() => {

                ring.style.strokeDashoffset =
                  target;

              }, 100);

            });

        }

      });

    },
    {
      threshold: 0.2
    }
  );


document
  .querySelectorAll('.sk-card')
  .forEach(c => {

    skillObs.observe(c);

  });


// ============================================================
// PLAYHEAD ANIMATION
// ============================================================

const ph =
  document.getElementById('playhead');

if (ph) {

  let pos = 5;
  let dir = 1;

  setInterval(() => {

    pos += dir * 0.5;

    if (pos > 92 || pos < 5) {

      dir *= -1;

    }

    ph.style.left =
      pos + '%';

  }, 50);

}


// ============================================================
// WAVEFORM CLIPS
// ============================================================

const wfc =
  document.getElementById('wf-clips');

if (wfc) {

  const heights = [

    6,10,14,8,12,16,10,8,
    14,12,6,10,14,8,12,16,
    10,8,14,12,6,10,14,8,
    12,16,10,8,14,12,6,10,
    14,8,12,16,10,8

  ];

  wfc.innerHTML =
    heights.map(h => `

      <span
        style="
          display:inline-block;
          width:2px;
          height:${h}px;
          background:rgba(6,182,212,.7);
          margin:0 .5px;
          border-radius:1px;
          vertical-align:middle;
        "
      ></span>

    `).join('');

}


// ============================================================
// ======================= GALLERY =============================
// ============================================================


// IMPORTANT:
// Keep the file names EXACTLY the same as the files
// inside your frontend/videos folder.

const galleryData = [

  {
    cat: 'commercial',
    title: 'Bike Edit 1',
    video: 'Bike1.mp4 (1).mp4',
    h: 200
  },

  {
    cat: 'commercial',
    title: 'Bike Edit 2',
    video: 'Bike2.mp4 (1).mp4',
    h: 200
  },

  {
    cat: 'commercial',
    title: 'Car Edit',
    video: 'Car Edit.mp4.mp4',
    h: 220
  },

  {
    cat: 'wedding',
    title: 'Engagement Video',
    video: 'Engagement.mp4 (1).mp4',
    h: 200
  },

  {
    cat: 'commercial',
    title: 'Frams Edit',
    video: 'Frams Edit.mp4 (1).mp4',
    h: 180
  },

  {
    cat: 'instagram',
    title: 'IV Edit',
    video: 'IV edit.mp4 (1).mp4',
    h: 200
  },

  {
    cat: 'instagram',
    title: 'IV Edit 1',
    video: 'IV1.mp4.mp4',
    h: 200
  },

  {
    cat: 'wedding',
    title: 'Invitation Video',
    video: 'Invitation.mp4 (1).mp4',
    h: 220
  },

  {
    cat: 'motion',
    title: 'Murugan Edit',
    video: 'Murugan.mp4 (1).mp4',
    h: 200
  },

  {
    cat: 'instagram',
    title: 'Nanban Edit',
    video: 'Nanban.mp4.mp4',
    h: 200
  },

  {
    cat: 'instagram',
    title: 'Reels Edit',
    video: 'Reels.mp4.mp4',
    h: 200
  },

  {
    cat: 'instagram',
    title: 'Reels Edit 1',
    video: 'Reels1.mp4.mp4',
    h: 200
  },

  {
    cat: 'wedding',
    title: 'Save The Date',
    video: 'Save the date (1).mp4',
    h: 220
  },

  {
    cat: 'corporate',
    title: 'Sriet Video',
    video: 'Sriet.mp4 (1).mp4',
    h: 200
  },

  {
    cat: 'corporate',
    title: 'Staff Video',
    video: 'Staffs.mp4 (1).mp4',
    h: 200
  },

  {
    cat: 'instagram',
    title: 'Thala Edit',
    video: 'Thala.mp4.mp4',
    h: 200
  },

  {
    cat: 'commercial',
    title: 'WOne-Ten',
    video: 'WOne-Ten .mp4',
    h: 200
  }

];


// ============================================================
// GRADIENTS
// ============================================================

const grads = [

  'linear-gradient(135deg,#0f2027,#203a43)',

  'linear-gradient(135deg,#1a1a2e,#0f3460)',

  'linear-gradient(135deg,#200122,#6f0000)',

  'linear-gradient(135deg,#0a3d0a,#145214)',

  'linear-gradient(135deg,#2d1b69,#5b21b6)',

  'linear-gradient(135deg,#0f0c29,#302b63)',

  'linear-gradient(135deg,#1c1c1c,#3a3a3a)',

  'linear-gradient(135deg,#0d1117,#1a2332)'

];


// ============================================================
// SAFE VIDEO PATH
// ============================================================

function getVideoPath(filename) {

  return 'videos/' +
    encodeURIComponent(filename);

}


// ============================================================
// BUILD FILTER TABS
// ============================================================

const cats = [

  'all',
  'wedding',
  'corporate',
  'youtube',
  'commercial',
  'instagram',
  'travel',
  'music',
  'motion'

];


const filterDiv =
  document.getElementById('filterTabs');


if (filterDiv) {

  cats.forEach(category => {

    const button =
      document.createElement('button');

    button.className =
      'ftab' +
      (category === 'all'
        ? ' act'
        : '');

    button.dataset.filter =
      category;

    button.textContent =
      category === 'all'
        ? 'All'
        : category.charAt(0).toUpperCase() +
          category.slice(1);

    filterDiv.appendChild(button);


    button.addEventListener(
      'click',
      () => {

        document
          .querySelectorAll('.ftab')
          .forEach(tab => {

            tab.classList.remove('act');

          });

        button.classList.add('act');


        document
          .querySelectorAll('.mi')
          .forEach(item => {

            const show =
              category === 'all' ||
              item.dataset.cat === category;


            if (show) {

              item.style.opacity = '1';

              item.style.transform = '';

              item.style.pointerEvents =
                'auto';

            } else {

              item.style.opacity = '0';

              item.style.transform =
                'scale(.94)';

              item.style.pointerEvents =
                'none';

            }

          });

      }
    );

  });

}


// ============================================================
// BUILD GALLERY
// ============================================================

const grid =
  document.getElementById('galleryGrid');


if (grid) {

  galleryData.forEach((item, index) => {

    const div =
      document.createElement('div');

    div.className =
      'mi rev';

    div.dataset.cat =
      item.cat;


    const videoPath =
      getVideoPath(item.video);


    div.innerHTML = `

      <div
        class="mi-thumb"
        style="
          height:${item.h}px;
          position:relative;
          overflow:hidden;
          background:${grads[index % grads.length]};
        "
      >

        <video
          src="${videoPath}"
          muted
          autoplay
          loop
          playsinline
          preload="auto"
          class="portfolio-video"
          style="
            width:100%;
            height:100%;
            object-fit:cover;
            display:block;
          "
        ></video>


        <div
          class="mi-play"
          style="
            pointer-events:none;
          "
        >
          ▶
        </div>


        <div class="mi-overlay">

          <div class="mi-cat">
            ${item.cat}
          </div>

          <div class="mi-title">
            ${item.title}
          </div>

        </div>

      </div>

    `;


    grid.appendChild(div);


    // Scroll reveal
    revObs.observe(div);


    // ========================================================
    // VIDEO CLICK PLAY / PAUSE
    // ========================================================

    const video =
      div.querySelector('video');


    if (video) {

      div.addEventListener(
        'click',
        () => {

          if (video.paused) {

            video.play().catch(error => {

              console.log(
                'Video play blocked:',
                error
              );

            });

          } else {

            video.pause();

          }

        }
      );


      // Error detection
      video.addEventListener(
        'error',
        () => {

          console.error(
            'VIDEO FAILED TO LOAD:',
            item.video
          );

          console.error(
            'Path:',
            videoPath
          );

        }
      );

    }


    // ========================================================
    // 3D TILT EFFECT
    // ========================================================

    div.addEventListener(
      'mousemove',
      e => {

        const rect =
          div.getBoundingClientRect();


        const cx =
          rect.left +
          rect.width / 2;


        const cy =
          rect.top +
          rect.height / 2;


        const rx =
          ((e.clientY - cy) /
            rect.height) *
          12;


        const ry =
          -((e.clientX - cx) /
            rect.width) *
          12;


        div.style.transform =

          `perspective(800px)
           rotateX(${rx}deg)
           rotateY(${ry}deg)
           translateY(-6px)`;

        div.style.animationPlayState =
          'paused';

      }
    );


    div.addEventListener(
      'mouseleave',
      () => {

        div.style.transform = '';

        div.style.animationPlayState =
          'running';

      }
    );

  });

}


// ============================================================
// CONTACT FORM
// ============================================================

async function submitContact(event) {

  console.log(
    'Submit button clicked!'
  );


  event.preventDefault();


  const btn =
    event.target.querySelector(
      'button[type="submit"]'
    );


  if (!btn) return;


  const originalText =
    btn.innerHTML;


  btn.disabled = true;

  btn.innerHTML =
    'Sending...';


  const name =
    document
      .getElementById('name')
      .value
      .trim();


  const email =
    document
      .getElementById('email')
      .value
      .trim();


  const phone =
    document
      .getElementById('phone')
      .value
      .trim();


  const projectType =
    document
      .getElementById('projectType')
      .value;


  const budget =
    document
      .getElementById('budget')
      .value;


  const message =
    document
      .getElementById('message')
      .value
      .trim();


  try {

    const response =
      await fetch(
        'https://siddharth-portfolio-o283.onrender.com/api/contact',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify({

            name,
            email,
            phone,
            projectType,
            budget,
            message

          })

        }
      );


    const data =
      await response.json();


    if (
      response.ok &&
      data.success
    ) {

      btn.innerHTML =
        '✓ Sent!';


      btn.style.background =
        'linear-gradient(135deg,#10b981,#06B6D4)';


      alert(
        '✅ Thank you! Your inquiry has been sent successfully.'
      );


      document
        .getElementById('contactForm')
        .reset();


    } else {

      alert(
        data.message ||
        '❌ Failed to send inquiry.'
      );


      btn.innerHTML =
        originalText;

    }


  } catch (error) {

    console.error(
      'Error:',
      error
    );


    alert(
      '❌ Unable to connect to the server.'
    );


    btn.innerHTML =
      originalText;

  }


  btn.disabled = false;


  setTimeout(() => {

    btn.innerHTML =
      originalText;

    btn.style.background =
      '';

  }, 3000);

}


// ============================================================
// REVIEW FORM
// ============================================================

function submitReview(event) {

  event.preventDefault();


  const btn =
    event.target.querySelector(
      'button[type="submit"]'
    );


  if (!btn) return;


  const originalText =
    btn.innerHTML;


  btn.innerHTML =
    '✓ Review Submitted!';


  btn.style.background =
    'linear-gradient(135deg,#10b981,#06B6D4)';


  setTimeout(() => {

    btn.innerHTML =
      originalText;

    btn.style.background =
      '';

  }, 3000);

}


// ============================================================
// FINAL CHECK
// ============================================================

console.log(
  '✅ SID VISUALS JavaScript Loaded Successfully'
);

console.log(
  '🎬 Gallery videos:',
  galleryData.length
);
