// ── Dark Mode Toggle ──
(function () {
    var html = document.documentElement;
    var btn = document.getElementById('dark-toggle');
    var saved = localStorage.getItem('theme');

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
        if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
    }

    applyTheme(saved === 'dark' ? 'dark' : 'light');

    if (btn) {
        btn.addEventListener('click', function () {
            var current = html.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', next);
            applyTheme(next);
        });
    }
})();

// ── Active nav link highlight ──
(function () {
    var links = document.querySelectorAll('nav a');
    var currentPage = location.pathname.split('/').pop() || 'index.html';
    links.forEach(function (link) {
        var href = link.getAttribute('href');
        if (
            href === currentPage ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')
        ) {
            link.classList.add('active');
        }
    });
})();

// ── Focus Trap Helper ──
function createFocusTrap(container) {
    var selector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    return function handleKeydown(e) {
        if (e.key !== 'Tab') return;
        var focusable = Array.from(container.querySelectorAll(selector)).filter(function (el) {
            return !el.closest('[hidden]') && el.offsetParent !== null;
        });
        if (focusable.length === 0) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first) { last.focus(); e.preventDefault(); }
        } else {
            if (document.activeElement === last) { first.focus(); e.preventDefault(); }
        }
    };
}

// ── Lightbox (Gallery page) ──
(function () {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxCaption = document.getElementById('lightbox-caption');
    var lightboxClose = document.getElementById('lightbox-close');
    var trapHandler = createFocusTrap(lightbox);
    var previousFocus = null;

    function openLightbox(src, alt) {
        previousFocus = document.activeElement;
        lightboxImg.src = src;
        lightboxCaption.textContent = alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
        lightboxClose.focus();
        document.addEventListener('keydown', trapHandler);
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightboxImg.src = '';
        document.body.style.overflow = '';
        document.removeEventListener('keydown', trapHandler);
        if (previousFocus) previousFocus.focus();
    }

    document.querySelectorAll('.photo-frame').forEach(function (frame) {
        frame.setAttribute('tabindex', '0');
        frame.setAttribute('role', 'button');
        function tryOpen() {
            var img = frame.querySelector('img');
            if (img && img.complete && img.naturalWidth > 0) {
                openLightbox(img.src, img.alt);
            }
        }
        frame.addEventListener('click', tryOpen);
        frame.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tryOpen(); }
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
})();

// ── Blog Modal ──
(function () {
    var modal = document.getElementById('blog-modal');
    if (!modal) return;

    var modalClose = document.getElementById('blog-modal-close');
    var modalTitle = document.getElementById('blog-modal-title');
    var modalMeta = document.getElementById('blog-modal-meta');
    var modalTags = document.getElementById('blog-modal-tags');
    var modalBody = document.getElementById('blog-modal-body');
    var trapHandler = createFocusTrap(modal.querySelector('.blog-modal-inner'));
    var previousFocus = null;

    var articles = [
        {
            id: 1,
            title: 'Mengapa Game High-APM Membuatku Menjadi Programmer yang Lebih Baik',
            date: '15 Jan 2026',
            readTime: '5 menit baca',
            tags: ['Teknologi', 'Gaming', 'Programming'],
            body: `
                <p>Banyak orang menganggap bermain game adalah pemborosan waktu. Tapi setelah bertahun-tahun berkutat dengan game strategi real-time yang menuntut ratusan tindakan per menit, saya menyadari sesuatu: keterampilan ini langsung ditransfer ke dunia pemrograman.</p>
                <h3>Apa Itu High-APM?</h3>
                <p>APM (Actions Per Minute) adalah metrik dalam game strategi yang mengukur seberapa cepat seorang pemain mengambil keputusan dan mengeksekusinya. Pemain profesional bisa mencapai 300-400 APM. Ini bukan hanya soal kecepatan klik — ini soal berpikir cepat, multitasking, dan membuat keputusan di bawah tekanan waktu.</p>
                <h3>Koneksi ke Pemrograman</h3>
                <ul>
                    <li><strong>Debugging cepat:</strong> Terbiasa membaca situasi dengan cepat membuat saya lebih efisien dalam melacak bug.</li>
                    <li><strong>Prioritas task:</strong> Saat ada banyak fitur yang perlu dikerjakan, saya bisa menentukan mana yang paling mendesak dengan lebih cepat.</li>
                    <li><strong>Adaptasi:</strong> Ketika requirement berubah mendadak, saya tidak panik — saya adjust strategi seperti di tengah pertandingan.</li>
                    <li><strong>Fokus di bawah tekanan:</strong> Deadline ketat? Bagi saya itu seperti fase endgame — justru di situ performa terbaik keluar.</li>
                </ul>
                <h3>Kesimpulan</h3>
                <p>Game high-APM mengajarkan bahwa kecepatan tanpa akurasi tidak berguna — begitu juga coding. Yang penting adalah keputusan yang tepat, dieksekusi dengan efisien. Kalau kamu seorang programmer yang juga gamer, jangan malu-maluin hobby-mu — itu mungkin salah satu aset terbesarmu.</p>
            `
        },
        {
            id: 2,
            title: 'K-Pop Dance: Disiplin, Ekspresi, dan Pelajaran Hidup di Balik Gerakan',
            date: '28 Feb 2026',
            readTime: '4 menit baca',
            tags: ['Seni', 'Dance', 'K-Pop'],
            body: `
                <p>Pertama kali saya mencoba cover K-Pop dance, saya pikir itu mudah — tinggal ikuti gerakan di video. Tapi setelah jam pertama latihan, kaki saya sudah gemetar dan tubuh saya terasa tidak punya koordinasi sama sekali.</p>
                <h3>Lebih dari Sekadar Meniru</h3>
                <p>K-Pop dance — terutama genre girl group dan boy band modern — menggabungkan teknik yang sangat beragam: popping, locking, contemporary, bahkan elemen bela diri. Setiap gerakan punya "count" yang harus tepat. Salah satu count saja dan seluruh formasi bisa kacau.</p>
                <h3>Pelajaran yang Tidak Terduga</h3>
                <ul>
                    <li><strong>Konsistensi mengalahkan bakat:</strong> Saya bukan penari alami, tapi latihan rutin membuat gerakan yang tadinya mustahil jadi otomatis.</li>
                    <li><strong>Keberanian tampil:</strong> Pertunjukan pertama saya di depan orang lain adalah pengalaman paling menakutkan sekaligus paling membebaskan.</li>
                    <li><strong>Mendengar tubuh sendiri:</strong> Dance mengajarkan body awareness — kapan harus push harder, kapan harus istirahat.</li>
                    <li><strong>Tim vs individu:</strong> Saat dancing dalam grup, egosemu harus dimatikan. Yang penting bukan kamu terlihat keren — tapi formasi keseluruhannya indah.</li>
                </ul>
                <h3>Koneksi dengan Kehidupan</h3>
                <p>Setiap koreografi adalah tantangan baru. Dan setiap kali saya berhasil menguasai satu lagu, ada kepuasan yang tidak bisa dibeli. Itu yang membuat saya terus kembali ke lantai latihan — bukan karena saya ingin jadi idol, tapi karena proses penguasaannya sendiri sangat berharga.</p>
            `
        },
        {
            id: 3,
            title: 'Fotografi: Seni Melihat yang Mengubah Cara Saya Memandang Dunia',
            date: '10 Mar 2026',
            readTime: '6 menit baca',
            tags: ['Seni', 'Fotografi', 'Kreativitas'],
            body: `
                <p>Saya mulai serius fotografi dengan kamera ponsel biasa. Tidak ada gear mahal, tidak ada kelas formal. Hanya rasa penasaran tentang mengapa beberapa foto terasa "hidup" sementara foto lain terasa datar.</p>
                <h3>Komposisi: Bahasa Visual yang Dipelajari</h3>
                <p>Rule of thirds, leading lines, framing — semua ini terdengar teknis, tapi intinya sederhana: fotografi yang baik adalah storytelling visual. Setiap elemen dalam frame bercerita sesuatu. Tanggung jawab fotografer adalah memilih elemen mana yang masuk dan mana yang dikeluarkan.</p>
                <h3>Cahaya adalah Segalanya</h3>
                <ul>
                    <li><strong>Golden hour:</strong> Cahaya matahari 1 jam setelah terbit atau sebelum terbenam menghasilkan warna hangat yang tidak bisa ditiru di waktu lain.</li>
                    <li><strong>Bayangan:</strong> Sering diabaikan, padahal bayangan bisa menciptakan kontras dramatis dan kedalaman yang kuat.</li>
                    <li><strong>Cahaya buatan:</strong> Lampu neon kota malam hari punya karakter tersendiri — dingin, urban, dan penuh mood.</li>
                </ul>
                <h3>Apa yang Fotografi Ajarkan</h3>
                <p>Setelah tekun memotret, saya mulai melihat dunia berbeda. Saya memperhatikan pantulan genangan air di trotoar, cara kucing tidur dengan sempurna, ekspresi seseorang yang tidak sadar sedang diperhatikan. Fotografi mengajarkan bahwa keindahan ada di mana-mana — kita hanya perlu berhenti sejenak dan benar-benar melihat.</p>
                <p>Dan itulah pelajaran terbesar yang saya bawa ke kehidupan sehari-hari: melambat, memperhatikan, dan menghargai momen yang sekejap sebelum ia menghilang.</p>
            `
        },
        {
            id: 4,
            title: 'Trupest: Membangun Web Card Game dari Nol dengan TypeScript',
            date: '27 Des 2025',
            readTime: '6 menit baca',
            tags: ['Project', 'TypeScript', 'Game Dev', 'Web'],
            body: `
                <p>Trupest (singkatan dari <em>Troupe</em>) adalah proyek game kartu lokal berbasis browser yang saya bangun dari nol. Ide awalnya sederhana: saya ingin game kartu yang bisa dimainkan bersama teman tanpa perlu install apapun, cukup buka browser. Tapi perjalanannya jauh lebih kompleks dari yang saya bayangkan.</p>
                <h3>Konsep: Menggabungkan Tiga Game Sekaligus</h3>
                <p>Trupest menggabungkan mekanik dari tiga game kartu klasik — Whist, Spades, dan Hearts. Ketiganya adalah game <em>trick-taking</em>, artinya pemain berlomba memenangkan "trik" dengan kartu tertinggi atau kartu truf. Tantangannya adalah merancang ruleset yang terasa kohesif, bukan sekadar tumpukan aturan dari tiga game berbeda.</p>
                <h3>Stack Teknis</h3>
                <ul>
                    <li><strong>TypeScript:</strong> Dipilih karena logika game melibatkan banyak state kompleks — deck, tangan pemain, skor, urutan giliran — yang jauh lebih aman dikelola dengan type system.</li>
                    <li><strong>Browser-native:</strong> Tidak ada backend, tidak ada database. Semua state game berjalan di client, membuatnya bisa dimainkan secara lokal tanpa koneksi internet.</li>
                    <li><strong>Cross-platform:</strong> Berjalan di desktop maupun mobile hanya dengan membuka URL di browser.</li>
                </ul>
                <h3>Tantangan Terbesar</h3>
                <p>Bagian paling sulit bukan coding-nya, tapi desain game-nya. Setiap perubahan kecil pada aturan bisa mengubah keseimbangan seluruh permainan. Saya melakukan puluhan iterasi dan playtesting sebelum menemukan ruleset yang terasa fun dan fair. Proyek ini mengajarkan saya bahwa game design adalah seni tersendiri yang tidak kalah kompleks dari engineering-nya.</p>
                <p>Repository: <a href="https://github.com/ephanpdk/trupest" target="_blank" rel="noopener noreferrer">github.com/ephanpdk/trupest</a></p>
            `
        },
        {
            id: 5,
            title: 'E-Commerce Recommendation System: Belajar Machine Learning Lewat Proyek Nyata',
            date: '8 Des 2025',
            readTime: '7 menit baca',
            tags: ['Project', 'Machine Learning', 'Python', 'E-Commerce'],
            body: `
                <p>Proyek ini lahir dari keingintahuan saya tentang bagaimana platform e-commerce besar seperti Tokopedia atau Shopee bisa "tahu" produk apa yang ingin kamu beli, bahkan sebelum kamu menyadarinya sendiri. Jawabannya: sistem rekomendasi berbasis machine learning.</p>
                <h3>Apa Itu Recommendation System?</h3>
                <p>Recommendation system adalah algoritma yang menganalisis pola perilaku pengguna — produk apa yang dilihat, dibeli, atau diberi rating — lalu memprediksi produk lain yang kemungkinan besar akan disukai pengguna tersebut. Ada dua pendekatan utama yang saya eksplorasi:</p>
                <ul>
                    <li><strong>Collaborative Filtering:</strong> Menemukan pengguna dengan pola yang mirip, lalu merekomendasikan apa yang disukai mereka. "Orang yang membeli ini juga membeli..."</li>
                    <li><strong>Content-Based Filtering:</strong> Menganalisis atribut produk itu sendiri (kategori, deskripsi, harga) untuk menemukan produk serupa.</li>
                </ul>
                <h3>Proses Pengerjaan</h3>
                <p>Proyek ini dibangun menggunakan Jupyter Notebook dan Python. Alur kerjanya meliputi:</p>
                <ul>
                    <li>Eksplorasi dan pembersihan data (EDA) untuk memahami distribusi dan kualitas dataset.</li>
                    <li>Feature engineering untuk mengekstrak sinyal yang berguna dari data mentah.</li>
                    <li>Implementasi model dan evaluasi menggunakan metrik seperti precision dan recall.</li>
                    <li>Visualisasi hasil rekomendasi untuk memvalidasi kualitas output model.</li>
                </ul>
                <h3>Pelajaran yang Diambil</h3>
                <p>Machine learning bukan sulap. Kualitas data jauh lebih menentukan hasil akhir daripada kecanggihan algoritmanya. Proyek ini mengajarkan saya untuk tidak langsung loncat ke model, tapi menghabiskan waktu yang cukup untuk benar-benar memahami data terlebih dahulu.</p>
                <p>Repository: <a href="https://github.com/ephanpdk/ecommerce-recommendation-system" target="_blank" rel="noopener noreferrer">github.com/ephanpdk/ecommerce-recommendation-system</a></p>
            `
        }
    ];

    function openModal(articleId) {
        var article = articles.find(function (a) { return a.id === articleId; });
        if (!article) return;
        previousFocus = document.activeElement;
        modalTitle.textContent = article.title;
        modalMeta.innerHTML = '&#128197; ' + article.date + ' &nbsp;&bull;&nbsp; &#128337; ' + article.readTime;
        modalTags.innerHTML = article.tags.map(function (t) {
            return '<span class="blog-tag">' + t + '</span>';
        }).join('');
        modalBody.innerHTML = article.body;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        modalClose.focus();
        document.addEventListener('keydown', trapHandler);
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', trapHandler);
        if (previousFocus) previousFocus.focus();
    }

    document.querySelectorAll('.blog-card').forEach(function (card) {
        card.addEventListener('click', function () {
            var id = parseInt(card.getAttribute('data-id'), 10);
            openModal(id);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
})();

// ── Contact Form ──
(function () {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var submitBtn = form.querySelector('.form-submit');
    var msgEl = document.getElementById('form-message');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = form.querySelector('[name="name"]').value.trim();
        var email = form.querySelector('[name="email"]').value.trim();
        var message = form.querySelector('[name="message"]').value.trim();

        if (!name || !email || !message) {
            showMessage('Semua field wajib diisi.', 'error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Mengirim...';
        msgEl.className = 'form-message';
        msgEl.style.display = 'none';

        var data = new FormData(form);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: data
        })
        .then(function (res) { return res.json(); })
        .then(function (json) {
            if (json.success) {
                showMessage('Pesan berhasil dikirim! Saya akan segera membalas.', 'success');
                form.reset();
            } else {
                showMessage('Gagal mengirim pesan. Silakan coba lagi.', 'error');
            }
        })
        .catch(function () {
            showMessage('Terjadi kesalahan jaringan. Silakan coba lagi.', 'error');
        })
        .finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Kirim Pesan';
        });
    });

    function showMessage(text, type) {
        msgEl.textContent = text;
        msgEl.className = 'form-message ' + type;
    }
})();
