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

// ── Lightbox (Gallery page) ──
(function () {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxCaption = document.getElementById('lightbox-caption');
    var lightboxClose = document.getElementById('lightbox-close');

    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxCaption.textContent = alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightboxImg.src = '';
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.photo-frame').forEach(function (frame) {
        frame.addEventListener('click', function () {
            var img = frame.querySelector('img');
            if (img && img.complete && img.naturalWidth > 0) {
                openLightbox(img.src, img.alt);
            }
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
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

    var articles = [
        {
            id: 1,
            title: 'Mengapa Game High-APM Membuatku Menjadi Programmer yang Lebih Baik',
            date: '15 Jan 2026',
            readTime: '5 menit baca',
            tags: ['Teknologi', 'Gaming', 'Programming'],
            excerpt: 'Ternyata kebiasaan bermain game strategi real-time secara intensif punya dampak nyata terhadap cara saya menulis kode dan menyelesaikan masalah pemrograman.',
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
            excerpt: 'Menari K-Pop bukan sekadar meniru gerakan idola. Ada filosofi mendalam soal konsistensi, keberanian, dan ekspresi diri yang saya pelajari dari lantai latihan.',
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
            excerpt: 'Kamera bukan hanya alat dokumentasi. Ia mengubah cara mata melihat, memaksa kita melambat dan memperhatikan detail yang biasanya terlewat begitu saja.',
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
            title: 'Belajar TypeScript: Dari Frustasi ke Produktivitas dalam 30 Hari',
            date: '5 Apr 2026',
            readTime: '7 menit baca',
            tags: ['Teknologi', 'TypeScript', 'Web Dev'],
            excerpt: 'TypeScript terasa menyebalkan di minggu pertama — semua code saya merah penuh error. Tapi di hari ke-30, saya tidak bisa membayangkan kembali ke JavaScript biasa.',
            body: `
                <p>Ketika pertama belajar TypeScript, reaksi pertama saya adalah: "Ini JavaScript tapi lebih susah. Untuk apa?" Error di mana-mana, type annotation yang harus ditulis manual, interface yang terasa bertele-tele. Saya hampir menyerah di hari kelima.</p>
                <h3>Mengapa TypeScript Terasa Sulit di Awal</h3>
                <p>Masalahnya bukan TypeScript yang buruk — masalahnya adalah saya sudah terbiasa dengan kebebasan JavaScript. TypeScript memaksa kita berpikir lebih struktural: data apa yang mengalir di mana, function apa yang menerima dan mengembalikan apa. Ini butuh perubahan mindset, bukan hanya sintaks baru.</p>
                <h3>Titik Balik di Minggu Kedua</h3>
                <ul>
                    <li>Saya mulai melihat error sebagai <em>teman</em>, bukan musuh. TypeScript menangkap bug sebelum kode dijalankan.</li>
                    <li>IntelliSense di editor jadi jauh lebih powerful — autocomplete yang benar-benar akurat.</li>
                    <li>Refactoring besar jadi tidak menakutkan lagi karena compiler langsung tunjukkan mana yang harus diubah.</li>
                </ul>
                <h3>Hari ke-30: Tidak Mau Balik</h3>
                <p>Di proyek trupest (web game saya), TypeScript sangat membantu mengelola kompleksitas logika permainan kartu. State management yang rumit jadi lebih terkontrol karena setiap type didefinisikan dengan jelas. Kalau kamu ragu mencoba TypeScript, mulailah hari ini. Investasi awal yang terasa berat itu akan terbayar berlipat.</p>
            `
        }
    ];

    function openModal(articleId) {
        var article = articles.find(function (a) { return a.id === articleId; });
        if (!article) return;

        modalTitle.textContent = article.title;
        modalMeta.innerHTML = '&#128197; ' + article.date + ' &nbsp;&bull;&nbsp; &#128337; ' + article.readTime;
        modalTags.innerHTML = article.tags.map(function (t) {
            return '<span class="blog-tag">' + t + '</span>';
        }).join('');
        modalBody.innerHTML = article.body;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
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
        if (e.key === 'Escape') closeModal();
    });
})();
