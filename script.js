/* ================================================
   STUDENT PORTFOLIO — script.js
   Minimal JavaScript — scroll animations & nav
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------
     1. SCROLL-TRIGGERED FADE-IN ANIMATION
     Uses IntersectionObserver to reveal .fade-in
     elements as they enter the viewport.
  ----------------------------------------------- */
  var fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target); // Only animate once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }


  /* -----------------------------------------------
     2. MOBILE HAMBURGER MENU
     Shows/hides nav on small screens.
  ----------------------------------------------- */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  /* -----------------------------------------------
     3. SCROLL-TO-TOP BUTTON
     Appears after scrolling 400px down.
  ----------------------------------------------- */
  var scrollTopBtn = document.getElementById('scroll-top-btn');

  window.addEventListener('scroll', function () {
    // Show/hide floating scroll-to-top button
    scrollTopBtn.classList.toggle('show', window.scrollY > 400);

    // Add shadow to navbar when scrolled
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
  });

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Footer back-to-top button
  var footerTopBtn = document.getElementById('footer-top-btn');
  if (footerTopBtn) {
    footerTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* -----------------------------------------------
     4. CERTIFICATE PREVIEW MODAL / LIGHTBOX
  ----------------------------------------------- */
  var certModal        = document.getElementById('cert-modal');
  var certModalImg     = document.getElementById('cert-modal-img');
  var certModalTitle   = document.getElementById('cert-modal-title');
  var certModalClose   = document.getElementById('cert-modal-close');
  var certModalBackdrop = document.getElementById('cert-modal-backdrop');
  var certCards        = document.querySelectorAll('.cert-card');

  function openCertModal(imgSrc, titleText) {
    if (!certModal || !certModalImg) return;
    certModalImg.src = imgSrc;
    certModalImg.alt = titleText || 'Certificate Preview';
    if (certModalTitle) {
      certModalTitle.textContent = titleText || 'Certificate Preview';
    }
    certModal.classList.add('active');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  }

  function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove('active');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore background scrolling
    if (certModalImg) {
      setTimeout(function () {
        if (!certModal.classList.contains('active')) {
          certModalImg.src = '';
        }
      }, 300);
    }
  }

  // Attach click listener to each certificate card
  certCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var img = card.querySelector('.cert-image img');
      var title = card.querySelector('.cert-title');
      var imgSrc = card.getAttribute('data-cert-img') || (img ? img.getAttribute('src') : '');
      var titleText = card.getAttribute('data-cert-title') || (title ? title.textContent : 'Certificate Preview');

      if (imgSrc) {
        openCertModal(imgSrc, titleText);
      }
    });
  });

  // Close handlers
  if (certModalClose) {
    certModalClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeCertModal();
    });
  }

  if (certModalBackdrop) {
    certModalBackdrop.addEventListener('click', closeCertModal);
  }

  if (certModal) {
    certModal.addEventListener('click', function (e) {
      // If clicked on modal container outside dialog
      if (e.target === certModal) {
        closeCertModal();
      }
    });
  }

  // ESC key to close modal
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
      closeCertModal();
    }
  });


  /* -----------------------------------------------
     5. HERO INTERACTIVE DEV CODE CARD
  ----------------------------------------------- */
  var btnRunPortgen = document.getElementById('btn-run-portgen');
  var btnFunFact    = document.getElementById('btn-fun-fact');
  var codeLiveOutput = document.getElementById('code-live-output');

  var quickFacts = [
    "Secured 3rd Rank at NSUT INNOVISION'25 out of hundreds of participants!",
    "Built PortGen to compile raw .txt files into complete portfolios with Gemini.",
    "Certified in Microsoft Azure Fundamentals (AZ-900).",
    "Passionate chess player who loves tactical endgame patterns and algorithms.",
    "B.Tech CSE (Honours) at GLA University with 93% in 10th & 82% in 12th."
  ];
  var quickFactIndex = 0;

  if (btnRunPortgen && codeLiveOutput) {
    btnRunPortgen.addEventListener('click', function () {
      codeLiveOutput.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Parsing .txt ➔ Gemini ➔ JSON schema...</span>';
      setTimeout(function () {
        codeLiveOutput.innerHTML = '<i class="fas fa-check-circle" style="color: #39d353;"></i> <span style="color: #39d353;">PortGen compiled "portfolio.html" in 42ms! ✨</span>';
      }, 500);
    });
  }

  if (btnFunFact && codeLiveOutput) {
    btnFunFact.addEventListener('click', function () {
      var fact = quickFacts[quickFactIndex % quickFacts.length];
      quickFactIndex++;
      codeLiveOutput.innerHTML = '<i class="fas fa-lightbulb" style="color: #f7df1e;"></i> <span>' + fact + '</span>';
    });
  }

});
