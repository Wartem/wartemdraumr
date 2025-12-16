// player.js
(() => {
    const audio = document.getElementById('global-audio');
    if (!audio) return;

    let currentCardId = null;
    let currentCardEl = null;

    function playTrack(trackSrc, cardId, cardEl) {
        if (!trackSrc) return;

        // Same card clicked → toggle pause / resume
        if (currentCardId === cardId) {
            if (audio.paused) {
                audio.play().catch(() => {});
                document.body.classList.add('is-playing');
                cardEl.classList.add('is-active');
            } else {
                audio.pause();
            }
            return;
        }

        // New card clicked → switch track
        if (currentCardEl) {
            currentCardEl.classList.remove('is-active');
        }

        audio.src = trackSrc;
        audio.load();
        audio.muted = false;
        if (audio.volume === 0) audio.volume = 1;

        currentCardId = cardId;
        currentCardEl = cardEl;

        audio.play().catch(() => {});
        document.body.classList.add('is-playing');
        cardEl.classList.add('is-active');
    }

    audio.addEventListener('pause', () => {
        document.body.classList.remove('is-playing');
        if (currentCardEl) currentCardEl.classList.remove('is-active');
    });

    audio.addEventListener('timeupdate', () => {
    if (!currentCardEl || !audio.duration) return;
    const progress = (audio.currentTime / audio.duration) * 100;
    const line = currentCardEl.querySelector('.progress-line');
    if (line) line.style.width = `${progress}%`;
    });

    audio.addEventListener('ended', () => {
        document.body.classList.remove('is-playing');
        if (currentCardEl) currentCardEl.classList.remove('is-active');
        currentCardId = null;
        currentCardEl = null;
    });

    window.WDPlayer = {
        playTrack
    };
})();
