// Interactive controller for theme toggle, navigation, filtering, and modal interactions
document.addEventListener('DOMContentLoaded', () => {
  // Theme Management
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme-preference');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-preference', theme);
  };

  if (storedTheme) {
    applyTheme(storedTheme);
  } else if (systemPrefersDark) {
    applyTheme('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // Mobile Navigation
  const menuToggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggleBtn && navMenu) {
    menuToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggleBtn.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close menu when clicking navigation links
    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Project Data for Interactive Modal
  const projectDetails = {
    'sip-smk': {
      title: 'Sistem Informasi Perpustakaan SMKN 1 Kepanjen',
      category: 'Web Application',
      description: 'Aplikasi manajemen perpustakaan sekolah untuk memudahkan sirkulasi peminjaman, pengembalian, inventaris buku, dan laporan denda secara real-time. Dilengkapi fitur pencarian katalog buku untuk siswa dan dashboard admin untuk staf perpustakaan.',
      tech: 'PHP, MySQL, JavaScript, Bootstrap / Modern CSS',
      role: 'Full-stack Developer (School Project)',
      status: 'Selesai & Diuji pada Jaringan Lokal Sekolah'
    },
    'ekantin': {
      title: 'E-Kantin Kanega (Sistem Pemesanan Kantin)',
      category: 'Frontend & UI',
      description: 'Platform pemesanan digital untuk area kantin SMKN 1 Kepanjen guna mengurangi antrean saat jam istirahat. Siswa dapat melihat menu stand, memesan paket makanan, dan melihat estimasi waktu penyiapan.',
      tech: 'HTML5, Modern CSS, Vanilla JavaScript, LocalStorage',
      role: 'Frontend Developer & UI Designer',
      status: 'Prototipe Interaktif Siap Uji Coba'
    },
    'presensi-pkl': {
      title: 'Aplikasi Presensi & Jurnal PKL Siswa',
      category: 'Web Application',
      description: 'Sistem pencatatan kehadiran dan logbook kegiatan harian bagi siswa yang sedang melaksanakan Praktik Kerja Lapangan (PKL) di industri, dengan validasi geotagging sederhana dan pelaporan mingguan ke guru pembimbing.',
      tech: 'HTML5, JavaScript, CSS Grid/Flexbox, REST API Integration',
      role: 'Frontend Developer',
      status: 'Versi 1.0 Siap Digunakan'
    },
    'umkm-showcase': {
      title: 'Katalog Produk Kreatif Siswa & UMKM Kepanjen',
      category: 'Frontend & UI',
      description: 'Website showcase responsif yang menampilkan produk kreatif hasil karya siswa jurusan RPL serta mitra UMKM lokal di sekitar Kepanjen. Memiliki desain modern, cepat diakses, dan ramah perangkat mobile.',
      tech: 'Semantic HTML, CSS Variables, Responsive Design',
      role: 'UI Designer & Web Publisher',
      status: 'Live & Dapat Diakses'
    }
  };

  // Project Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Handling
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalRole = document.getElementById('modal-role');
  const modalStatus = document.getElementById('modal-status');
  const modalCloseBtn = document.getElementById('modal-close');

  const openModal = (projectId) => {
    const data = projectDetails[projectId];
    if (!data || !modal) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalDesc.textContent = data.description;
    modalTech.textContent = data.tech;
    modalRole.textContent = data.role;
    modalStatus.textContent = data.status;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-project-id]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const id = trigger.getAttribute('data-project-id');
      openModal(id);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Contact Form Feedback Handler
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');

  if (contactForm && formAlert) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Mengirim Pesan...';

      setTimeout(() => {
        formAlert.className = 'form-alert success';
        formAlert.textContent = 'Terima kasih atas pesan Anda! Rendi akan segera merespons melalui email.';
        formAlert.style.display = 'block';

        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        setTimeout(() => {
          formAlert.style.display = 'none';
        }, 6000);
      }, 700);
    });
  }

  // Active Link Observer on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
});
