// ========================================================
// MẢNG DỮ LIỆU ĐIỀU KHIỂN HỆ THỐNG LẬT ẢNH TRANG CHARACTER
// ========================================================
const charaAssetsArray = [
    {
        src: "Charater/Faye the witch.jpg",
        title: "Faye Final Concept",
        desc: "Designed with a cosmic and gothic palette for an upcoming fantasy RPG world."
    },
    {
        src: "Charater/Faye 1.jpg",
        title: "Initial Linework",
        desc: "The raw line-art focus on clean hair flowing physics and clothing dynamic folds."
    },
    {
        src: "Charater/faye 2.jpg",
        title: "Expression Practice",
        desc: "Mood board exploration mapping down various character facial emotions."
    },
    {
        src: "Charater/hair.jpg",
        title: "Color Palettes",
        desc: "Color theory test isolating highlight glows from deep shadow environments."
    }
];

let currentAssetIndex = 0;

// Hàm cốt lõi thực hiện hoán đổi ảnh lớn và nội dung chữ bên phải
function updateActiveAsset(index) {
    const mainView = document.getElementById('starbucks-main-view');
    const titleNode = document.getElementById('chara-summary-title');
    const textNode = document.getElementById('chara-summary-text');
    const thumbnails = document.querySelectorAll('.chara-thumb-item');
    
    if (!mainView || !titleNode || !textNode) return;

    currentAssetIndex = index;
    const targetAsset = charaAssetsArray[currentAssetIndex];

    thumbnails.forEach(img => img.classList.remove('active'));
    mainView.style.opacity = "0.3";
    
    setTimeout(() => {
        mainView.src = targetAsset.src;
        titleNode.innerText = targetAsset.title;
        textNode.innerText = targetAsset.desc;
        mainView.style.opacity = "1";
        
        const activeThumb = document.querySelector(`.chara-thumb-item[data-index="${currentAssetIndex}"]`);
        if (activeThumb) {
            activeThumb.classList.add('active');
            activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, 120);
}

function selectStarbucksAsset(index) {
    updateActiveAsset(index);
}

function nextStarbucksAsset() {
    let nextIndex = (currentAssetIndex + 1) % charaAssetsArray.length;
    updateActiveAsset(nextIndex);
}

function prevStarbucksAsset() {
    let prevIndex = (currentAssetIndex - 1 + charaAssetsArray.length) % charaAssetsArray.length;
    updateActiveAsset(prevIndex);
}

// ========================================================
// TỔNG HỢP TOÀN BỘ SỰ KIỆN KHI TRANG ĐƯỢC TẢI HOÀN TOÀN
// ========================================================
document.addEventListener('DOMContentLoaded', function() {
    
    // --- KHAI BÁO BIẾN CHO PHẦN INTRO VIDEO VÀ KIỂM TRA SESSION ---
    const video = document.getElementById('intro-video');
    const introContainer = document.getElementById('video-intro-container');
    const portfolioWrapper = document.getElementById('portfolio-wrapper');
    const skipBtn = document.getElementById('skip-video-btn');

    function endIntroVideo() {
        if (introContainer && portfolioWrapper) {
            introContainer.style.display = 'none'; 
            portfolioWrapper.classList.add('show-content');
            introContainer.remove();
            sessionStorage.setItem('hasWatchedIntro', 'true');
        }
    }

    if (sessionStorage.getItem('hasWatchedIntro') === 'true') {
        if (introContainer && portfolioWrapper) {
            introContainer.style.display = 'none';
            portfolioWrapper.classList.add('show-content');
            introContainer.remove();
        }
    } else {
        if (video) {
            video.addEventListener('error', function() {
                alert("LỖI: Trình duyệt không tìm thấy file 'video-intro.mp4'.");
            });
            video.play().catch(error => {
                console.log("Autoplay bị chặn:", error);
            });
            video.addEventListener('ended', endIntroVideo);
        }
    }

    if (skipBtn) {
        skipBtn.addEventListener('click', endIntroVideo);
    }

    // --- LOGIC ĐỔI MÀU NỀN VẬN HÀNH THANH ĐIỀU HƯỚNG MENU ---
    const navLinks = document.querySelectorAll('.top-nav .nav-item a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                navLinks.forEach(item => item.classList.remove('clicked-active'));
                this.classList.add('clicked-active');

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                navLinks.forEach(item => item.classList.remove('clicked-active'));
                this.classList.add('clicked-active');
            }
        });
    });

    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentHash === '#about-me' && linkHref === '#about-me') {
            link.classList.add('clicked-active');
        } else if (currentPath.includes(linkHref) && linkHref !== 'index.html' && linkHref !== '#about-me') {
            link.classList.add('clicked-active');
        }
    });

    // --- HIỆU ỨNG BỤI SAO BAY THEO QUỸ ĐẠO BÊN PHẢI ---
    const avatar = document.getElementById('character-avatar');
    const portfolioTitle = document.querySelector('.main-title');
    const artworkLink = document.querySelector('.top-nav .scroll-link1');

    if (avatar && artworkLink && portfolioTitle) {
        function createStar() {
            if (document.hidden) return;

            const star = document.createElement('span');
            star.className = 'star-particle';
            
            const starTypes = ['✦', '✧', '★'];
            star.innerText = starTypes[Math.floor(Math.random() * starTypes.length)];

            const avatarRect = avatar.getBoundingClientRect();
            const startX = avatarRect.left + (avatarRect.width * 0.3) + (Math.random() * 40 - 20);
            const startY = avatarRect.top + (avatarRect.height * 0.4) + (Math.random() * 30 - 15);

            const artRect = artworkLink.getBoundingClientRect();
            const artCenterX = artRect.left + (artRect.width / 2);
            const artCenterY = artRect.top + (artRect.height / 2);
            
            const endX = artCenterX - startX;
            const endY = artCenterY - startY;

            // Neo điểm lượn dựa sát vào mép trái chữ ARTWORK để ép dải sao lượn gọn góc phải
            const midX = (artRect.left - startX) + (Math.random() * 40 - 20);
            const midY = (artRect.top + 100 - startY) + (Math.random() * 40 - 20);

            star.style.left = `${startX}px`;
            star.style.top = `${startY}px`;
            star.style.setProperty('--x-mid', `${midX}px`);
            star.style.setProperty('--y-mid', `${midY}px`);
            star.style.setProperty('--x-end', `${endX}px`);
            star.style.setProperty('--y-end', `${endY}px`);
            star.style.fontSize = `${1.2 + Math.random() * 0.8}rem`;

            document.body.appendChild(star);

            setTimeout(() => { star.remove(); }, 1800);
        }

        let starInterval;
        setInterval(() => {
            setTimeout(() => {
                starInterval = setInterval(createStar, 120);
                setTimeout(() => { clearInterval(starInterval); }, 1000);
            }, 1400);
        }, 3000);

        avatar.addEventListener('click', function() {
            window.location.href = 'work.html';
        });
    }
});

// ========================================================
// HÀM ĐIỀU KHIỂN XOAY VÒNG ẢNH BẰNG BÀN PHÍM THEO KHỐI ACTIVE
// ========================================================
function updateDetailGallery(isNext) {
    // Nếu chưa có khối nào được focus, tự động chọn khối detail-workspace đầu tiên hiển thị
    if (!activeWorkspace) {
        activeWorkspace = document.querySelector('.detail-workspace');
    }
    if (!activeWorkspace) return;

    // Lấy tất cả ảnh nhỏ và ảnh nhỏ đang active CHỈ trong khối này
    const allThumbs = activeWorkspace.querySelectorAll('.detail-thumb-node');
    if (allThumbs.length === 0) return;

    const currentActiveThumb = activeWorkspace.querySelector('.detail-thumb-node.active');
    let currentIndex = 0;

    // Định vị vị trí hiện tại của ảnh đang active trong cụm
    if (currentActiveThumb) {
        currentIndex = Array.from(allThumbs).indexOf(currentActiveThumb);
    }

    // Tăng hoặc giảm index cục bộ trong cụm
    if (isNext) {
        currentIndex = (currentIndex + 1) % allThumbs.length;
    } else {
        currentIndex = (currentIndex - 1 + allThumbs.length) % allThumbs.length;
    }

    // Kích hoạt hàm đổi ảnh chính xác cho phần tử tiếp theo
    switchDetailAsset(allThumbs[currentIndex]);
}

// ========================================================
// HÀM CỐT LÕI XỬ LÝ LẬT ẢNH TÁCH BIỆT (HÀM THEO HTML GỐC)
// ========================================================
function switchDetailAsset(clickedThumb) {
    if (!clickedThumb) return;

    // 1. Dò ngược lên thẻ cha để tìm chính xác khối .detail-workspace chứa ảnh được bấm
    const workspace = clickedThumb.closest('.detail-workspace');
    if (!workspace) return;

    // Cập nhật khối này thành khối active hiện tại cho bàn phím nhận diện
    activeWorkspace = workspace;

    // 2. Chỉ định vị ảnh lớn và các khối chữ nội bộ nằm TRONG khối workspace này
    const mainView = workspace.querySelector('.img-box > img');
    const titleNode = workspace.querySelector('.info-box-right .info-content-segment:nth-child(1) h3');
    const textNode = workspace.querySelector('.info-box-right .para p');
    const allThumbsInBlock = workspace.querySelectorAll('.detail-thumb-node');

    if (!mainView) return;

    // 3. Xóa class active của các thumbnail cũ của riêng mục này
    allThumbsInBlock.forEach(img => {
        img.classList.remove('active');
        // Sửa lỗi dính dấu ngoặc kép bẩn trên chuỗi class của HTML gốc
        img.className = img.className.replace('active"', '').trim(); 
    });

    // 4. Tạo hiệu ứng mờ chuyển đổi mượt mà cho ảnh chính
    mainView.style.transition = "opacity 0.12s ease";
    mainView.style.opacity = "0.3";

    // Lấy chỉ số index hiện tại
    const currentIndex = clickedThumb.getAttribute('data-index');

    setTimeout(() => {
        // Đổi đường dẫn ảnh lớn bằng ảnh thumbnail vừa bấm
        mainView.src = clickedThumb.src;
        mainView.style.opacity = "1";
        
        // Gán trạng thái active làm nổi bật cho thumbnail đang chọn
        clickedThumb.classList.add('active');

        // 5. Cập nhật đồng bộ nội dung chữ (Tiêu đề & Đoạn mô tả) dựa theo mảng dữ liệu mẫu ở trên
        if (customCharaData[currentIndex]) {
            if (titleNode) titleNode.innerText = customCharaData[currentIndex].title;
            if (textNode) textNode.innerText = customCharaData[currentIndex].desc;
        }

        // 6. Tự động cuộn thanh slide đưa ảnh đang xem vào vị trí chính giữa khung ngang nhìn mượt mà
        clickedThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, 120);
}

// ========================================================
// LẮNG NGHE SỰ KIỆN PHÍM BẤM TRÊN BÀN PHÍM TOÀN CỤC
// ========================================================
document.addEventListener('keydown', function(event) {
    // Chỉ kích hoạt lật hình nếu màn hình đang có cấu trúc danh sách ảnh nhỏ
    if (document.querySelector('.detail-thumb-node')) {
        if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
            event.preventDefault(); // Ngăn trình duyệt cuộn trang ngoài ý muốn
            updateDetailGallery(true); 
        } 
        else if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
            event.preventDefault();
            updateDetailGallery(false); 
        }
    }
});

// ========================================================
// KHỞI TẠO THEO DÕI VÙNG HOẠT ĐỘNG TRÊN MÀN HÌNH (VIEWPORT / HOVER)
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    const streamBlocks = document.querySelectorAll('.detail-workspace');
    
    // Thiết lập trạng thái active mặc định cho ảnh số 1 của từng cụm
    streamBlocks.forEach(block => {
        const firstThumb = block.querySelector('.detail-thumb-node');
        if (firstThumb) {
            firstThumb.classList.add('active');
        }

        // Cơ chế 1: Khi đưa chuột (Hover) vào vùng của nhân vật nào, phím mũi tên sẽ điều khiển vùng đó
        block.addEventListener('mouseenter', () => {
            activeWorkspace = block;
        });
    });

    // Cơ chế 2: Khi cuộn màn hình (Scroll), khối nhân vật nào nằm ở giữa màn hình nhiều nhất sẽ chiếm tiêu điểm bàn phím
    window.addEventListener('scroll', () => {
        let closestBlock = null;
        let minDistance = Infinity;
        const centerY = window.innerHeight / 2;

        streamBlocks.forEach(block => {
            const rect = block.getBoundingClientRect();
            const blockCenter = rect.top + rect.height / 2;
            const distance = Math.abs(centerY - blockCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestBlock = block;
            }
        });

        if (closestBlock) {
            activeWorkspace = closestBlock;
        }
    });
});

// ========================================================
// LOGIC ĐIỀU KHIỂN NÚT MŨI TÊN CUỘN VỀ ĐẦU TRANG (BACK TO TOP)
// ========================================================
document.addEventListener('DOMContentLoaded', function() {
    const topBtn = document.getElementById("back-to-top-btn");

    if (topBtn) {
        window.addEventListener('scroll', function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                topBtn.style.display = "block";
            } else {
                topBtn.style.display = "none";
            }
        });

        topBtn.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
