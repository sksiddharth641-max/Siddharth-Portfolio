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
// BUILD GALLERY
// ============================================================

function openVideoModal(videoSrc, title, category) {
  const oldModal = document.getElementById('videoModal');
  if (oldModal) oldModal.remove();

  const modal = document.createElement('div');
  modal.id = 'videoModal';
  modal.className = 'video-modal';

  modal.innerHTML = `
    <div class="video-modal-backdrop"></div>

    <div class="video-modal-box">
      <button class="video-modal-close" type="button">×</button>

      <div class="video-modal-header">
        <div>
          <div class="video-modal-category">${category}</div>
          <div class="video-modal-title">${title}</div>
        </div>
      </div>

      <div class="video-modal-player">
        <video
          class="video-modal-video"
          src="${videoSrc}"
          controls
          playsinline
          muted
          preload="auto"
        ></video>
      </div>

      <div class="video-modal-footer">
        <span>SID VISUALS</span>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.classList.add('modal-open');

  requestAnimationFrame(() => {
    modal.classList.add('active');
  });

  const popupVideo =
    modal.querySelector('.video-modal-video');

  setTimeout(() => {
    popupVideo.muted = true;
    popupVideo.play().catch(() => {});
  }, 300);

  function closeModal() {
    popupVideo.pause();

    modal.classList.remove('active');
    document.body.classList.remove('modal-open');

    setTimeout(() => {
      modal.remove();
    }, 400);

    document.removeEventListener(
      'keydown',
      escapeHandler
    );
  }

  function escapeHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  modal
    .querySelector('.video-modal-close')
    .addEventListener('click', closeModal);

  modal
    .querySelector('.video-modal-backdrop')
    .addEventListener('click', closeModal);

  document.addEventListener(
    'keydown',
    escapeHandler
  );
}


const grid =
  document.getElementById('galleryGrid');

if (grid) {

  grid.innerHTML = '';

  galleryData.forEach((item, index) => {

    const card =
      document.createElement('div');

    card.className = 'mi rev';

    card.dataset.cat = item.cat;

    card.innerHTML = `
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
          class="portfolio-video"
          src="${item.video}"
          muted
          playsinline
          preload="metadata"
          style="
            width:100%;
            height:100%;
            object-fit:cover;
            display:block;
            cursor:pointer;
            pointer-events:none;
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

    grid.appendChild(card);

    // Scroll reveal
    if (typeof revObs !== 'undefined') {
      revObs.observe(card);
    }

    const video =
      card.querySelector('.portfolio-video');

    const playButton =
      card.querySelector('.mi-play');


    // ========================================================
    // SHOW FIRST FRAME AS THUMBNAIL
    // ========================================================

    video.addEventListener('loadedmetadata', () => {

      video.currentTime = 0;

    });


    video.addEventListener('seeked', () => {

      video.pause();

    });


    // ========================================================
    // WHEN VIDEO ENDS
    // ========================================================

    video.addEventListener('ended', () => {

      playButton.style.opacity = '1';

      video.currentTime = 0;

      video.pause();

    });


    // ========================================================
    // VIDEO ERROR
    // ========================================================

    video.addEventListener('error', () => {

      console.error(
        '❌ Video could not load:',
        item.video
      );

    });


    // ========================================================
    // 3D TILT
    // ========================================================

    card.addEventListener('mousemove', e => {

      const rect =
        card.getBoundingClientRect();

      const cx =
        rect.left + rect.width / 2;

      const cy =
        rect.top + rect.height / 2;

      const rx =
        ((e.clientY - cy) /
          rect.height) * 12;

      const ry =
        -((e.clientX - cx) /
          rect.width) * 12;

      card.style.transform =
        `perspective(800px)
         rotateX(${rx}deg)
         rotateY(${ry}deg)
         translateY(-6px)`;

      card.style.animationPlayState =
        'paused';

    });


    card.addEventListener('mouseleave', () => {

      card.style.transform = '';

      card.style.animationPlayState =
        'running';

    });

  });


  // ============================================================
  // OPEN VIDEO POPUP
  // ============================================================

  grid.addEventListener('click', function (e) {

    const card =
      e.target.closest('.mi');

    if (!card) return;

    const video =
      card.querySelector('.portfolio-video');

    if (!video) return;

    e.preventDefault();
    e.stopPropagation();

    // Make sure thumbnail NEVER plays
    video.pause();
    video.muted = true;
    video.currentTime = 0;

    const videoSrc =
      video.getAttribute('src');

    const title =
      card
        .querySelector('.mi-title')
        ?.textContent
        .trim()
        || 'Project';

    const category =
      card
        .querySelector('.mi-cat')
        ?.textContent
        .trim()
        || '';

    console.log(
      '🎬 POPUP:',
      title,
      videoSrc
    );

    openVideoModal(
      videoSrc,
      title,
      category
    );

  });

}


console.log(
  '🎬 Gallery loaded:',
  galleryData.length,
  'videos'
);
```

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
