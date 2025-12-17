// player.js
(() => {
    const audio = document.getElementById('global-audio');
    if (!audio) return;

    let currentCardId = null;
    let currentCardEl = null;
    let currentTrackSrc = null;

    function reset() {
        try {
            audio.pause();
            audio.currentTime = 0;
            audio.removeAttribute('src');
            audio.load();
        } catch {}

        document.body.classList.remove('is-playing');

        if (currentCardEl) {
            currentCardEl.classList.remove('is-active');
            const line = currentCardEl.querySelector('.progress-line');
            if (line) line.style.width = '0%';
        }

        currentCardId = null;
        currentCardEl = null;
        currentTrackSrc = null;
    }

    function playTrack(trackSrc, cardId, cardEl) {
        if (!trackSrc) return;

        // Same card clicked → toggle pause / resume
        if (currentCardId === cardId && currentTrackSrc === trackSrc) {
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
        currentTrackSrc = trackSrc;

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
        currentTrackSrc = null;
    });

    window.WDPlayer = {
        playTrack,
        reset
    };
})();
