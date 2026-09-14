// ============================================================
// SID VISUALS - MAIN JAVASCRIPT
// ============================================================


// ============================================================
// POINTER LIGHT
// ============================================================

const pointerLight = document.querySelector('.pointer-light');

if (pointerLight) {

  document.addEventListener('mousemove', (e) => {

    pointerLight.style.left = e.clientX + 'px';
    pointerLight.style.top = e.clientY + 'px';

  });

}


// ============================================================
// BACKGROUND CANVAS
// ============================================================

const canvas = document.getElementById('bgCanvas');

if (canvas) {

  const ctx = canvas.getContext('2d');

  let particles = [];

  function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

  }

  resizeCanvas();

  window.addEventListener('resize', resizeCanvas);

  for (let i = 0; i < 60; i++) {

    particles.push({

      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,

      size: Math.random() * 2 + 0.5,

      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4

    });

  }

  function animateParticles() {

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    particles.forEach((p) => {

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;

      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.size,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = 'rgba(255,255,255,0.25)';

      ctx.fill();

    });

    requestAnimationFrame(animateParticles);

  }

  animateParticles();

}


// ============================================================
// TICKER
// ============================================================

const ticker = document.querySelector('.ticker-track');

if (ticker) {

  ticker.innerHTML += ticker.innerHTML;

}


// ============================================================
// NAVBAR SCROLL
// ============================================================

const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {

  if (!navbar) return;

  if (window.scrollY > 50) {

    navbar.classList.add('scrolled');

  } else {

    navbar.classList.remove('scrolled');

  }

});


// ============================================================
// MOBILE MENU
// ============================================================

const menuBtn =
  document.querySelector('.menu-btn');

const navLinks =
  document.querySelector('.nav-links');

if (menuBtn && navLinks) {

  menuBtn.addEventListener('click', () => {

    navLinks.classList.toggle('active');

  });

}


// ============================================================
// SCROLL REVEAL
// ============================================================

const revealElements =
  document.querySelectorAll('.rev');

let revObs = null;

if ('IntersectionObserver' in window) {

  revObs = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add('visible');

          revObs.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );

  revealElements.forEach((el) => {

    revObs.observe(el);

  });

}


// ============================================================
// SKILL RINGS
// ============================================================

const skillRings =
  document.querySelectorAll('.skill-ring');

skillRings.forEach((ring) => {

  const value =
    ring.dataset.value || 0;

  ring.style.setProperty(
    '--progress',
    value + '%'
  );

});


// ============================================================
// PLAYHEAD ANIMATION
// ============================================================

const playheads =
  document.querySelectorAll('.playhead');

playheads.forEach((playhead) => {

  playhead.style.animation =
    'playheadMove 3s linear infinite';

});


// ============================================================
// WAVEFORM CLIPS
// ============================================================

const waveformClips =
  document.querySelectorAll('.waveform');

waveformClips.forEach((wave) => {

  wave.style.animation =
    'waveMove 2s ease-in-out infinite';

});


// ============================================================
// GALLERY DATA
// ============================================================

const galleryData = [

  {
    cat: 'commercial',
    title: 'Bike Edit 1',
    video: 'videos/Bike1.mp4 (1).mp4',
    h: 200
  },

  {
    cat: 'commercial',
    title: 'Bike Edit 2',
    video: 'videos/Bike2.mp4 (1).mp4',
    h: 200
  },

  {
    cat: 'commercial',
    title: 'Car Edit',
    video: 'videos/Car Edit.mp4.mp4',
    h: 220
  },

  {
    cat: 'wedding',
    title: 'Engagement Video',
    video: 'videos/Engagement.mp4 (1).mp4',
    h: 200
  },

  {
    cat: 'commercial',
    title: 'Frams Edit',
    video: 'videos/Frams Edit.mp4 (1).mp4',
    h: 180
  },

  {
    cat: 'instagram',
    title: 'IV Edit',
    video: 'videos/IV edit.mp4 (1).mp4',
    h: 200
  },

  {
    cat: 'instagram',
    title: 'IV Edit 1',
    video: 'videos/IV1.mp4.mp4',
    h: 200
  },

  {
    cat: 'wedding',
    title: 'Invitation Video',
    video: 'videos/Invitation.mp4 (1).mp4',
    h: 220
  },

  {
    cat: 'motion',
    title: 'Murugan Edit',
    video: 'videos/Murugan.mp4 (1).mp4',
    h: 200
  },

  {
    cat: 'instagram',
    title: 'Nanban Edit',
    video: 'videos/Nanban.mp4.mp4',
    h: 200
  },

  {
    cat: 'instagram',
    title: 'Reels Edit',
    video: 'videos/Reels.mp4.mp4',
    h: 200
  },

  {
    cat: 'instagram',
    title: 'Reels Edit 1',
    video: 'videos/Reels1.mp4.mp4',
    h: 200
  },

  {
    cat: 'wedding',
    title: 'Save The Date',
    video: 'videos/Save the date (1).mp4',
    h: 220
  },

  {
    cat: 'corporate',
    title: 'Sriet Video',
    video: 'videos/Sriet.mp4 (1).mp4',
    h: 200
  },

  {
    cat: 'corporate',
    title: 'Staff Video',
    video: 'videos/Staffs.mp4 (1).mp4',
    h: 200
  },

  {
    cat: 'instagram',
    title: 'Thala Edit',
    video: 'videos/Thala.mp4.mp4',
    h: 200
  },

  {
    cat: 'commercial',
    title: 'WOne-Ten',
    video: 'videos/WOne-Ten .mp4',
    h: 200
  }

];


// ============================================================
// GRADIENT BACKGROUNDS
// ============================================================

const grads = [

  'linear-gradient(135deg,#0f172a,#1e3a8a)',

  'linear-gradient(135deg,#111827,#312e81)',

  'linear-gradient(135deg,#172554,#0f766e)',

  'linear-gradient(135deg,#1e1b4b,#581c87)',

  'linear-gradient(135deg,#111827,#164e63)',

  'linear-gradient(135deg,#172554,#1e40af)'

];


// ============================================================
// FILTER TABS
// ============================================================

const filterTabs =
  document.getElementById('filterTabs');

if (filterTabs) {

  const filters = [

    {
      name: 'All',
      value: 'all'
    },

    {
      name: 'Instagram',
      value: 'instagram'
    },

    {
      name: 'Commercial',
      value: 'commercial'
    },

    {
      name: 'Wedding',
      value: 'wedding'
    },

    {
      name: 'Motion',
      value: 'motion'
    },

    {
      name: 'Corporate',
      value: 'corporate'
    }

  ];

  filters.forEach((filter, index) => {

    const button =
      document.createElement('button');

    button.className =
      'filter-btn' +
      (index === 0 ? ' active' : '');

    button.textContent =
      filter.name;

    button.dataset.filter =
      filter.value;

    filterTabs.appendChild(button);

    button.addEventListener('click', () => {

      document
        .querySelectorAll('.filter-btn')
        .forEach((btn) => {

          btn.classList.remove('active');

        });

      button.classList.add('active');

      const cards =
        document.querySelectorAll('.mi');

      cards.forEach((card) => {

        const category =
          card.dataset.cat;

        if (
          filter.value === 'all' ||
          category === filter.value
        ) {

          card.style.display = '';

        } else {

          card.style.display = 'none';

        }

      });

    });

  });

}


// ============================================================
// GLASS VIDEO MODAL
// ============================================================

function openVideoModal(
  videoSrc,
  title,
  category
) {

  // Remove old popup if one exists

  const oldModal =
    document.getElementById('videoModal');

  if (oldModal) {

    oldModal.remove();

  }


  // Create popup

  const modal =
    document.createElement('div');

  modal.id = 'videoModal';

  modal.className =
    'video-modal';


  // Popup HTML

  modal.innerHTML = `

    <div class="video-modal-backdrop"></div>

    <div class="video-modal-box">

      <button
        class="video-modal-close"
        aria-label="Close video"
      >
        ×
      </button>


      <div class="video-modal-header">

        <div>

          <div class="video-modal-category">
            ${category}
          </div>

          <div class="video-modal-title">
            ${title}
          </div>

        </div>


        <div class="video-modal-status">
          ● NOW PLAYING
        </div>

      </div>


      <div class="video-modal-player">

        <video
          class="video-modal-video"
          src="${videoSrc}"
          controls
          autoplay
          playsinline
          preload="auto"
        ></video>

      </div>


      <div class="video-modal-footer">

        <span>
          🎬 SID VISUALS
        </span>

        <span>
          ESC to close
        </span>

      </div>

    </div>

  `;


  // Add popup to page

  document.body.appendChild(modal);


  // Stop background scrolling

  document.body.classList.add(
    'modal-open'
  );


  // Trigger animation

  requestAnimationFrame(() => {

    modal.classList.add('active');

  });


  // Get elements

  const modalVideo =
    modal.querySelector(
      '.video-modal-video'
    );

  const closeButton =
    modal.querySelector(
      '.video-modal-close'
    );

  const backdrop =
    modal.querySelector(
      '.video-modal-backdrop'
    );

  const modalBox =
    modal.querySelector(
      '.video-modal-box'
    );


  // Close function

  function closeVideoModal() {

    modal.classList.remove('active');

    document.body.classList.remove(
      'modal-open'
    );


    if (modalVideo) {

      modalVideo.pause();

      modalVideo.currentTime = 0;

    }


    setTimeout(() => {

      if (modal.parentNode) {

        modal.remove();

      }

    }, 350);

  }


  // Close button

  closeButton.addEventListener(
    'click',
    closeVideoModal
  );


  // Click outside popup

  backdrop.addEventListener(
    'click',
    closeVideoModal
  );


  // Prevent popup click from closing

  modalBox.addEventListener(
    'click',
    (event) => {

      event.stopPropagation();

    }
  );


  // ESC key

  function escapeHandler(event) {

    if (event.key === 'Escape') {

      closeVideoModal();

      document.removeEventListener(
        'keydown',
        escapeHandler
      );

    }

  }


  document.addEventListener(
    'keydown',
    escapeHandler
  );


  // Try autoplay

  if (modalVideo) {

    const playPromise =
      modalVideo.play();

    if (
      playPromise !== undefined
    ) {

      playPromise.catch(() => {

        console.log(
          '▶️ Click play button to start video.'
        );

      });

    }

  }

}


// ============================================================
// BUILD GALLERY
// ============================================================

const grid =
  document.getElementById(
    'galleryGrid'
  );


if (grid) {

  // Clear old gallery

  grid.innerHTML = '';


  // Create every gallery card

  galleryData.forEach(
    (item, index) => {

      const card =
        document.createElement('div');


      card.className =
        'mi rev';


      card.dataset.cat =
        item.cat;


      // Card HTML

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


      // Add card to gallery

      grid.appendChild(card);


      // Scroll reveal observer

      if (
        typeof revObs !==
        'undefined' &&
        revObs
      ) {

        revObs.observe(card);

      }


      // Get card video

      const video =
        card.querySelector(
          '.portfolio-video'
        );


      // Load first frame

      video.addEventListener(
        'loadedmetadata',
        () => {

          try {

            video.currentTime = 0;

          } catch (error) {

            console.log(
              'Could not set first frame:',
              error
            );

          }

        }
      );


      // Make sure card video NEVER plays

      video.addEventListener(
        'play',
        () => {

          video.pause();

        }
      );


      // Pause after seeking

      video.addEventListener(
        'seeked',
        () => {

          video.pause();

        }
      );


      // ======================================================
      // CARD CLICK → OPEN POPUP
      // ======================================================

      card.addEventListener(
        'click',
        (event) => {

          event.preventDefault();

          event.stopPropagation();


          console.log(
            '🎬 OPENING VIDEO POPUP:',
            item.title
          );


          openVideoModal(
            item.video,
            item.title,
            item.cat
          );

        }
      );


      // Video loading error

      video.addEventListener(
        'error',
        () => {

          console.error(
            '❌ Video could not load:',
            item.video
          );

        }
      );


      // ======================================================
      // 3D CARD EFFECT
      // ======================================================

      card.addEventListener(
        'mousemove',
        (event) => {

          const rect =
            card.getBoundingClientRect();


          const centerX =
            rect.left +
            rect.width / 2;


          const centerY =
            rect.top +
            rect.height / 2;


          const rotateX =
            ((event.clientY - centerY) /
              rect.height) *
            12;


          const rotateY =
            -((event.clientX - centerX) /
              rect.width) *
            12;


          card.style.transform =
            `
              perspective(800px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
              translateY(-6px)
            `;


          card.style.animationPlayState =
            'paused';

        }
      );


      card.addEventListener(
        'mouseleave',
        () => {

          card.style.transform = '';

          card.style.animationPlayState =
            'running';

        }
      );

    }
  );

}


// ============================================================
// CONTACT FORM
// ============================================================

const contactForm =
  document.getElementById(
    'contactForm'
  );


if (contactForm) {

  contactForm.addEventListener(
    'submit',
    async (event) => {

      event.preventDefault();


      const formData =
        new FormData(contactForm);


      const data = {

        name:
          formData.get('name'),

        email:
          formData.get('email'),

        phone:
          formData.get('phone'),

        message:
          formData.get('message')

      };


      try {

        const response =
          await fetch(
            '/api/contact',
            {

              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json'
              },

              body:
                JSON.stringify(data)

            }
          );


        const result =
          await response.json();


        console.log(
          'Contact response:',
          result
        );


        if (response.ok) {

          alert(
            'Message sent successfully!'
          );

          contactForm.reset();

        } else {

          alert(
            'Something went wrong. Please try again.'
          );

        }

      } catch (error) {

        console.error(
          'Contact form error:',
          error
        );

        alert(
          'Unable to send message right now.'
        );

      }

    }
  );

}


// ============================================================
// REVIEW FORM
// ============================================================

const reviewForm =
  document.getElementById(
    'reviewForm'
  );


if (reviewForm) {

  reviewForm.addEventListener(
    'submit',
    (event) => {

      event.preventDefault();

      console.log(
        'Review submitted'
      );

      alert(
        'Thank you for your review!'
      );

      reviewForm.reset();

    }
  );

}


// ============================================================
// FINAL LOG
// ============================================================

console.log(
  '🎬 SID VISUALS portfolio loaded successfully.'
);

console.log(
  '🎬 Gallery loaded:',
  galleryData.length,
  'videos'
);
