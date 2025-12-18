// --- DATA CONFIGURATION ---

const CONTENT = {
    artist: {
        id: 'artist',
        title: 'Wartem Draumr',
        subtitle: 'ANCIENT NORSE \u2014 A UNIFIED IDENTITY',
        desc: 'Wartem Draumr is an artistic identity through which Norse-inspired music is explored across two complementary approaches. Working from an Ancient Norse foundation, the music unfolds through two distinct sonic paths. Primal Norse is visceral, bodily, and ritual-driven. Norse Folk is narrative, textural, and rooted in place and memory. Both are inseparable expressions of the same underlying force.',
        playlist: [
            'assets/Nordic_Landscape_Video_Generation.mp4',
            'assets/Nordic_Landscape_Video_Generation (1).mp4',
            'assets/Nordic_Landscape_Video_Generation (2).mp4',
            'assets/Nordic_Landscape_Video_Generation (3).mp4',
            'assets/Nordic_Landscape_Video_Generation (4).mp4',
            'assets/Nordic_Landscape_Video_Generation (5).mp4',
        ],
        overlayTitle: 'Map of Forms',
        cards: [
            {
                id: 'I',
                title: 'Ancient Norse',
                meta: 'The Foundation',
                desc: 'The cultural and mythological ground. A living root system of symbols, practices, and memory from which all expressions emerge.'
                ,
                track: {
                    src: 'assets/ancient_norse.wav'
                }
            },
            {
                id: 'II',
                title: 'Primal Norse',
                meta: 'The Body',
                desc: 'The active state. Trance, adrenaline, and physical focus. Music as ritual function, designed to alter the body and sharpen intent.'
                ,
                track: {
                    src: 'assets/primal_norse.wav'
                }
            },
            {
                id: 'III',
                title: 'Norse Folk',
                meta: 'The Story & the Spirit',
                desc: 'The reflective state. Story, voice, and melody shaped by place and memory. Music for listening, remembrance, and continuity.'
                ,
                track: {
                    src: 'assets/norse_folk.wav'
                }
            }
        ]
    },
    primal: {
        id: 'primal',
        title: 'Primal Norse',
        subtitle: 'The Body & The Spirit',
        desc: 'Primal Norse is music designed for altered physical states. It is rhythm-driven, forceful, and functional, built to sharpen focus, elevate adrenaline, and carry the body through exertion and trance. This is sound as ritual tool: direct, uncompromising, and embodied.',
        playlist: [
            'assets/Viking_Berserker_Rage_Cinematic_Video (1).mp4',
            'assets/Viking_Berserker_Rage_Cinematic_Video (3).mp4',
            'assets/Viking_Berserker_Rage_Cinematic_Video (4).mp4',
            'assets/Viking_Berserker_Rage_Cinematic_Video (6).mp4',
            'assets/Viking_Berserker_Rage_Cinematic_Video (5).mp4'
        ],
        overlayTitle: 'The Ritual Cycles',
        cards: [
            {
                id: 'I',
                title: 'Ginnungagap',
                meta: 'The Void \u2014 Weighted',
                desc: 'Sustained motion and variable density that establish gravity and orientation. Builds internal tension and readiness without urgency, forming a foundation before force is directed.', track: {
                    src: 'assets/ginnungagap_runaljud.mp3'
                }
            },
            {
                id: 'II',
                title: 'Berserksgangr',
                meta: 'The Fury \u2014 Unleashed',
                desc: 'A progressive surge from agitation into trance, where restraint dissolves but direction remains. Rhythm overtakes voice as rage is absorbed into automatic motion, reaching a state of relentless urgency, confidence, and decisive force.',
                track: {
                    src: 'assets/berserkergang_hamask_160_pre.mp3'
                }
            },
            {
                id: 'III',
                title: 'Valhǫll',
                meta: 'The Hall \u2014 Tempered',
                desc: 'Steady, driving motion and controlled density that hold aggression in check. Channels elevated intensity into discipline, focus, and preparation for conflict.',
                track: {
                    src: 'assets/valhalla_22_odins_fury_120_pre.mp3'
                }
            }
        ]
    },
    folk: {
        id: 'folk',
        title: 'Norse Folk',
        subtitle: 'The Hearth & The Saga',
        desc: 'Norse Folk is music for listening and remembrance. It is carried by voice, melody, and texture, shaped by story, landscape, and lived memory. This is sound for the long form: reflection, continuity, and presence within place.',
        playlist: [
            'assets/Norse_Forest_Rain_Immersion.mp4',
            'assets/Norse_Longhouse_In_Rainy_Forest.mp4',
            'assets/Immersive_Norse_Forest_Rain_Video (1).mp4',
            'assets/Immersive_Norse_Forest_Rain_Video.mp4',
            'assets/Norse_Ritual_Place_in_Forest (3).mp4',
            'assets/Immersive_Norse_Forest_Rain_Video (2).mp4',
            'assets/Norse_Ritual_Place_in_Forest (2).mp4'
        ],
        overlayTitle: 'The Folk Forms',
        cards: [
            {
                id: 'I',
                title: 'Saga',
                meta: 'The Story \u2014 Gravitas',
                desc: 'Recounting unfolds through focused vocal presence and deliberate progression. Draws listeners in through suspense and authority rather than comfort, sustaining tension as meaning unfolds over time.',
                track: {
                    src: 'assets/saga_1_restless_lover_2_k100_pre.mp3'
                }
            },
            {
                id: 'II',
                title: 'Hearth',
                meta: 'The Home \u2014 Gathering',
                desc: 'Warm, grounded forms led by a clear vocal line and supported by collective presence. Carries story through song while surrounding it with shared voices, creating safety, continuity, and belonging within a lived space.',
                track: {
                    src: 'assets/hearth_12_forns_sagna_k60_pre.mp3'
                }
            },
            {
                id: 'III',
                title: 'Voyage',
                meta: 'The Horizon \u2014 Enveloping',
                desc: 'Extended, layered forms that surround the listener with mass and momentum. Dense textures and converging motion create a sense of passage through scale rather than distance, drawing attention inward toward immersion, continuity, and collective presence.',
                track: {
                    src: 'assets/voy_16_Echoes_Ancients_pre.mp3'
                }
            }
        ]
    }
};

// Controls crossfade timing BETWEEN videos within the same focus playlist.
// Keep this aligned with `.bg-video { transition: opacity ... }` in `style.css`.
const VIDEO_CROSSFADE_MS = 2000;

// Controls the "black curtain" fade dfuration when switching focus.
const FOCUS_SWITCH_FADE_MS = 3500;

// --- STATE VARIABLES ---f
let currentFocus = null; // 'artist'; // Default
let activePlaylist = [];
let currentPlaylistIndex = 0;
let activePlayerId = 1;
let isTransitioning = false;
let videoContextToken = 0;
let crossfadeTimer = null;
let autoCycleTimer = null;
let soundEnabled = false;

// --- DOM ELEMENTS ---
const player1 = document.getElementById('v1');
const player2 = document.getElementById('v2');
const fadeOverlay = document.getElementById('fade-overlay');
const statusDisplay = document.getElementById('status-display');

// Text Elements
const landingTitle = document.getElementById('landing-title');
const landingSubtitle = document.getElementById('landing-subtitle');
const landingDesc = document.getElementById('landing-desc');
const actionContainer = document.getElementById('action-container');
const landingSocialLinks = document.getElementById('landing-social-links');
const presentationTitle = document.getElementById('presentation-title');
const cyclesGrid = document.getElementById('cycles-grid');
const enterBtn = document.getElementById('enter-btn'); // Will be event-delegated or managed
const exitBtn = document.getElementById('exit-btn');

// Overlay Elements
const focusTrigger = document.getElementById('focus-trigger');
const focusOverlay = document.getElementById('focus-overlay');
const closeFocusBtn = document.getElementById('close-focus-btn');
const focusOptions = document.querySelectorAll('.focus-list button');

// --- INITIALIZATION ---

let revealed = false;

function init() {
    document.documentElement.style.setProperty('--focus-switch-fade-ms', `${FOCUS_SWITCH_FADE_MS}ms`);
    document.documentElement.style.setProperty('--video-crossfade-ms', `${VIDEO_CROSSFADE_MS}ms`);

    // Set Initial State
    setFocus('artist');

    if (!revealed) {
        document.body.style.opacity = "1";
        revealed = true;
    }

    // Setup Global Listeners
    setupFocusOverlay();
    setupKeyboard();

    // Status
    statusDisplay.textContent = "Identity: Wartem Draumr // Active";
}

const soundTrigger = document.getElementById('sound-trigger');

function toggleSound() {
    soundEnabled = !soundEnabled;

    [player1, player2].forEach(player => {
        player.muted = !soundEnabled;
        if (soundEnabled) {
            player.volume = 0.8;
        }
    });

    soundTrigger.textContent = soundEnabled ? 'Focus Sound: On' : 'Focus Sound: Off [M]';
}

soundTrigger.addEventListener('click', toggleSound);

// --- FOCUS MANAGEMENT ENGINE ---

function setFocus(focusKey) {
    if (!CONTENT[focusKey]) return;        // validate first
    if (focusKey === currentFocus) return; // prevent redundant render

    if (window.WDPlayer && typeof window.WDPlayer.reset === 'function') {
        window.WDPlayer.reset();
    }

    const data = CONTENT[focusKey];
    currentFocus = focusKey;

    // 1. Update Document Title
    document.title = `${data.title} | Focus`;

    // 2. CSS Theming hook (for specific colors)
    Object.keys(CONTENT).forEach(key => document.body.classList.remove(`focus-${key}`));
    document.body.classList.add(`focus-${focusKey}`);

    // 3. Animate Text Content Swap
    updateLandingText(data);

    // 4. Update Video Playlist
    changeVideoContext(data.playlist);

    // 5. Build Action Buttons
    renderActionButtons(focusKey);

    // 6. Build Presentation Layer (Shield Wall)
    renderPresentationLayer(data);

    // 7. Update Status
    statusDisplay.textContent = `Focus: ${data.title} // Active`;
}

let landingFocusIntent = 0;

function switchFocusFromLanding(focusKey) {
    if (!CONTENT[focusKey]) return;
    if (focusKey === currentFocus) return;

    const intent = ++landingFocusIntent;

    // Fade to black (instead of snapping to black) when switching via landing buttons.
    if (!fadeOverlay.classList.contains('active')) {
        fadeOverlay.style.transition = '';
        fadeOverlay.classList.add('active');
        requestAnimationFrame(() => {
            if (intent !== landingFocusIntent) return;
            setFocus(focusKey);
        });
        return;
    }

    setFocus(focusKey);
}

function updateLandingText(data) {
    // Simple fade out/in effect for text
    const elements = [landingTitle, landingSubtitle, landingDesc];

    elements.forEach(el => el.classList.add('text-fade-out'));

    setTimeout(() => {
        landingTitle.textContent = data.title;
        if (data.id === 'artist') {
            landingSubtitle.innerHTML = '<span class="subtitle-main">ANCIENT NORSE &mdash; A UNIFIED </span><span class="subtitle-break">IDENTITY</span>';
        } else {
            landingSubtitle.textContent = data.subtitle;
        }
        landingDesc.textContent = data.desc;

        elements.forEach(el => {
            el.classList.remove('text-fade-out');
            el.classList.add('text-fade-in');
            // Cleanup animation class after it runs
            setTimeout(() => el.classList.remove('text-fade-in'), 1000);
        });
    }, 500);
}

function renderActionButtons(focusKey) {
    actionContainer.innerHTML = ''; // Clear current
    if (landingSocialLinks) landingSocialLinks.innerHTML = '';

    if (focusKey === 'artist') {
        // Artist Mode: single Focus CTA
        const navDiv = document.createElement('div');
        navDiv.className = 'artist-actions';
        navDiv.innerHTML = `
            <button id="focus-sigil" class="focus-sigil" type="button" aria-label="Select Focus">
                <span class="rune">ᚠ</span>
            </button>
        `;
        actionContainer.appendChild(navDiv);

        const sigilBtn = navDiv.querySelector('#focus-sigil');
        if (sigilBtn) {
            sigilBtn.addEventListener('click', () => {
                if (focusTrigger) focusTrigger.click();
                else if (focusOverlay) focusOverlay.classList.add('open');
            });
        }

        if (landingSocialLinks) {
            landingSocialLinks.innerHTML = `
                <a href="#" class="social-link" target="_blank" rel="noopener noreferrer">Spotify</a>
                <a href="http://www.youtube.com/@WartemDraumr" class="social-link" target="_blank" rel="noopener noreferrer">YouTube</a>
                <a href="#" class="social-link" target="_blank" rel="noopener noreferrer">Bandcamp</a>
            `;
        }

        // Artist mode also keeps the Shield Wall button at the bottom (handled by static HTML #enter-btn)
        enterBtn.style.display = 'inline-block';
        enterBtn.textContent = 'Enter The Shield Wall';
    } else {
        // Sub-focus modes: Just simple content
        enterBtn.style.display = 'inline-block';
        enterBtn.textContent = 'Enter The Shield Wall';
    }
}

function renderPresentationLayer(data) {
    presentationTitle.textContent = data.overlayTitle;
    cyclesGrid.innerHTML = '';

    data.cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'cycle-card';

        div.innerHTML = `
            <span class="rune">${card.id}</span>
            <h4>${card.title}</h4>
            <p class="meta">${card.meta}</p>
            <p class="desc">${card.desc}</p>
            <div class="progress-line"></div>
        `;

        // STEP 4: wire card to audio playback (only if track exists)
        if (card.track && card.track.src && window.WDPlayer) {
            div.addEventListener('click', () => {
                window.WDPlayer.playTrack(card.track.src, card.id, div);
            });
            div.classList.add('is-playable');
        }

        cyclesGrid.appendChild(div);
    });
}

// --- VIDEO ENGINE ---

function setVideoOpacityTransitionsEnabled(enabled) {
    const value = enabled ? '' : 'none';
    player1.style.transition = value;
    player2.style.transition = value;
    // Force style flush so the next toggle doesn't animate unexpectedly
    void player1.offsetHeight;
}

function waitForFirstFrame(videoEl) {
    return new Promise((resolve) => {
        let resolved = false;

        const done = () => {
            if (resolved) return;
            resolved = true;
            resolve();
        };

        const onNextPaint = () => requestAnimationFrame(done);

        if (typeof videoEl.requestVideoFrameCallback === 'function') {
            videoEl.requestVideoFrameCallback(() => done());
            return;
        }

        if (videoEl.readyState >= 2) {
            onNextPaint();
            return;
        }

        videoEl.addEventListener('loadeddata', onNextPaint, { once: true });
        setTimeout(done, 250);
    });
}

function ensureActiveVideoPlaying() {
    if (fadeOverlay.classList.contains('active')) return;

    const activeVid = activePlayerId === 1 ? player1 : player2;
    if (!activeVid || !activeVid.src) return;

    // Some browsers can stall video decode when large composited layers toggle quickly.
    // A best-effort play() nudge keeps playback moving without affecting timing.
    activeVid.play().catch(() => { });
}

async function changeVideoContext(newPlaylist) {
    // HARD reset of engine state
    isTransitioning = true;
    videoContextToken += 1;
    const token = videoContextToken;
    if (crossfadeTimer) {
        clearTimeout(crossfadeTimer);
        crossfadeTimer = null;
    }
    currentPlaylistIndex = 0;
    activePlayerId = 1;

    activePlaylist = newPlaylist;

    const curtainAlreadyActive = fadeOverlay.classList.contains('active');

    // Drop curtain immediately (avoid 1-frame flash of previous focus)
    if (!curtainAlreadyActive) {
        fadeOverlay.style.transition = 'none';
        fadeOverlay.classList.add('active');
        void fadeOverlay.offsetHeight;
        // Restore the CSS-driven transition so the reveal animates with --focus-switch-fade-ms.
        fadeOverlay.style.transition = '';
        await new Promise(requestAnimationFrame);
    } else {
        // If something else already raised the curtain (e.g. landing switch fade),
        // don't override it (which would cause a "snap to black").
        fadeOverlay.style.transition = '';
        await new Promise(requestAnimationFrame);
    }
    if (token !== videoContextToken) return;

    // Prevent the old visible video from fading out slowly (and flashing during curtain lift)
    setVideoOpacityTransitionsEnabled(false);

    // FULL reset behind curtain
    [player1, player2].forEach(player => {
        player.pause();
        player.currentTime = 0;
        player.classList.remove('visible');

        // CRITICAL: remove stale source
        player.removeAttribute('src');
        player.load();
    });

    // Load ONLY the first video into player1
    if (!activePlaylist || activePlaylist.length === 0) {
        isTransitioning = false;
        fadeOverlay.classList.remove('active');
        setVideoOpacityTransitionsEnabled(true);
        return;
    }

    try {
        player1.src = activePlaylist[0];
        player1.load();

        await player1.play();
        if (token !== videoContextToken) return;

        player1.classList.add('visible');
        await waitForFirstFrame(player1);
        if (token !== videoContextToken) return;
    } catch (e) {
        if (token !== videoContextToken) return;
    }

    // Reveal (fade back in) using CSS var duration
    await new Promise(requestAnimationFrame);
    fadeOverlay.classList.remove('active');
    setVideoOpacityTransitionsEnabled(true);

    await new Promise(resolve => setTimeout(resolve, FOCUS_SWITCH_FADE_MS));
    if (token !== videoContextToken) return;

    isTransitioning = false;
}

function performCrossfade() {
    isTransitioning = true;
    const token = videoContextToken;

    const fadeDuration = VIDEO_CROSSFADE_MS;

    const currentVid = activePlayerId === 1 ? player1 : player2;
    const nextVid = activePlayerId === 1 ? player2 : player1;
    const nextPlayerId = activePlayerId === 1 ? 2 : 1;
    const nextIdx = (currentPlaylistIndex + 1) % activePlaylist.length;

    if (!nextVid.src.includes(activePlaylist[nextIdx])) {
        nextVid.src = activePlaylist[nextIdx];
        nextVid.load();
    }

    nextVid.play().then(() => {
        if (token !== videoContextToken) return;
        nextVid.classList.add('visible');
        currentVid.classList.remove('visible');

        // Update state as soon as we swap visibility so time/ended handlers track the correct player.
        activePlayerId = nextPlayerId;
        currentPlaylistIndex = nextIdx;

        if (crossfadeTimer) clearTimeout(crossfadeTimer);
        crossfadeTimer = setTimeout(() => {
            if (token !== videoContextToken) return;
            currentVid.pause();
            currentVid.currentTime = 0;

            const futureIdx = (currentPlaylistIndex + 1) % activePlaylist.length;
            currentVid.src = activePlaylist[futureIdx];
            currentVid.load();

            isTransitioning = false;
            crossfadeTimer = null;
        }, fadeDuration);
    }).catch(() => {
        if (token !== videoContextToken) return;
        isTransitioning = false;
    });
}

function checkTime(e) {
    if (activePlaylist.length < 2) return;

    const player = e.target;
    const activePlayer = activePlayerId === 1 ? player1 : player2;

    if (player !== activePlayer) return;
    if (!player.duration || isNaN(player.duration)) return;

    const fadeDuration = VIDEO_CROSSFADE_MS;
    const remaining = player.duration - player.currentTime;

    if (
        remaining < (fadeDuration / 1000) &&
        remaining > 0.1 &&
        !isTransitioning
    ) {
        performCrossfade();
    }
}

function handleVideoEnded(e) {
    if (!activePlaylist || activePlaylist.length === 0) return;

    const activePlayer = activePlayerId === 1 ? player1 : player2;
    if (e.target !== activePlayer) return;

    // Fallback: if a video reaches the end (e.g. missed `timeupdate`), keep the playlist moving.
    if (activePlaylist.length === 1) {
        try {
            activePlayer.currentTime = 0;
        } catch (e) { }
        activePlayer.play().catch(() => { });
        return;
    }

    if (!isTransitioning) performCrossfade();
}

player1.addEventListener('timeupdate', checkTime);
player2.addEventListener('timeupdate', checkTime);
player1.addEventListener('ended', handleVideoEnded);
player2.addEventListener('ended', handleVideoEnded);

// --- INTERACTION ---

// Shield Wall Logic
enterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.add('ritual-active');
    statusDisplay.textContent = `Focus: ${CONTENT[currentFocus].title} // Deep State`;
    requestAnimationFrame(ensureActiveVideoPlaying);
});

function standDown() {
    if (!document.body.classList.contains('ritual-active')) return;
    document.body.classList.remove('ritual-active');
    statusDisplay.textContent = `Focus: ${CONTENT[currentFocus].title} // Active`;
    if (window.WDPlayer && typeof window.WDPlayer.reset === 'function') {
        window.WDPlayer.reset();
    }
    requestAnimationFrame(ensureActiveVideoPlaying);
}

exitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    standDown();
});

function requestFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => { });
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
}

// Focus Overlay Logic
function setupFocusOverlay() {
    focusTrigger.addEventListener('click', () => {
        focusOverlay.classList.add('open');
    });

    closeFocusBtn.addEventListener('click', () => {
        focusOverlay.classList.remove('open');
    });

    focusOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            const focusKey = btn.getAttribute('data-focus');

            // Start transition FIRST
            setFocus(focusKey);

            // Close overlay AFTER fade-out has started
            setTimeout(() => {
                focusOverlay.classList.remove('open');
            }, 300);
        });
    });
}

function setupKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close focus overlay if open
            if (focusOverlay.classList.contains('open')) {
                focusOverlay.classList.remove('open');
            }
            // Or close shield wall if open
            else {
                standDown();
            }
        }
        if (e.key === 'f' || e.key === 'F') {
            if (document.body.classList.contains('ritual-active')) standDown();
            else focusOverlay.classList.toggle('open');
        }
        if (e.key === 'm' || e.key === 'M') {
            toggleSound();
        }
    });
}

// Start
document.addEventListener('DOMContentLoaded', init);