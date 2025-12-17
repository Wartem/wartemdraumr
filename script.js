// --- DATA CONFIGURATION ---

const CONTENT = {
    artist: {
        id: 'artist',
        title: 'Wartem Draumr',
        subtitle: 'ANCIENT NORSE — A UNIFIED IDENTITY',
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
        meta: 'The Spirit',
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
            'assets/Viking_Berserker_Rage_Cinematic_Video (5).mp4',
            'assets/Viking_Berserker_Rage_Cinematic_Video (6).mp4',
            'assets/Viking_Berserker_Rage_Cinematic_Video (8).mp4'
        ],
        overlayTitle: 'The Ritual Cycles',
cards: [
    {
        id: 'I',
        title: 'Ginnungagap',
        meta: 'The Void • Grounded',
        desc: 'Low-frequency drones and sustained tones designed to slow breathing and heart rate. Clears mental noise and prepares the body for focus before exertion.',
        track: {
        src: 'assets/ginnungagap_runaljud.mp3'
        }
    },
    {
        id: 'II',
        title: 'Berserkergang',
        meta: 'The Fury • Surging',
        desc: 'Aggressive, polyrhythmic percussion and driving patterns that elevate adrenaline and trigger the fight response. Built for output, force, and forward momentum.',
        track: {
        src: 'assets/berserkergang_hamask_160_pre.mp3'
        }
    },
    {
        id: 'III',
        title: 'Valhalla',
        meta: 'The Release • Gathering',
        desc: 'Extended textures and open pacing that allow the nervous system to settle. Supports recovery, grounding, and the return from total physical expenditure.',
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
        meta: 'The Story • Grounded',
        desc: 'Melodic structures built around voice and string, intended to carry narrative over time. Supports listening, recall, and the transmission of memory through song.',
        track: {
        src: 'assets/saga_1_restless_lover_2_k100_pre.mp3'
        }
    },
    {
        id: 'II',
        title: 'Hearth',
        meta: 'The Home • Driving',
        desc: 'Close, grounded textures shaped by repetition and warmth. Creates a sense of safety, continuity, and presence within a shared space.',
        track: {
        src: 'assets/hearth_12_forns_sagna_k60_pre.mp3'
        }
    },
    {
        id: 'III',
        title: 'Voyage',
        meta: 'The Horizon • Flowing',
        desc: 'Extended, unfolding compositions that accompany movement and transition. Orients attention outward toward landscape, distance, and passage.',
        track: {
        src: 'assets/voy_16_Echoes_Ancients_pre.mp3'
        }
    }
]
    }
};

const FADE_DURATIONS = {
    artist: 1500,
    primal: 1400,
    folk: 1500
};

// --- STATE VARIABLES ---
let currentFocus = null; // 'artist'; // Default
let activePlaylist = [];
let currentPlaylistIndex = 0;
let activePlayerId = 1; 
let isTransitioning = false;
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

function getFadeDuration() {
    return FADE_DURATIONS[currentFocus] || 1400;
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

    soundTrigger.textContent = soundEnabled ? 'Sound: On' : 'Sound: Off [M]';
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
    document.body.className = `focus-${focusKey}`; // Clears 'ritual-active'

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

function updateLandingText(data) {
    // Simple fade out/in effect for text
    const elements = [landingTitle, landingSubtitle, landingDesc];
    
    elements.forEach(el => el.classList.add('text-fade-out'));

    setTimeout(() => {
        landingTitle.textContent = data.title;
        if (data.id === 'artist' && data.subtitle === 'ANCIENT NORSE — A UNIFIED IDENTITY') {
            landingSubtitle.innerHTML = '<span class="subtitle-main">ANCIENT NORSE — A UNIFIED </span><span class="subtitle-break">IDENTITY</span>';
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
        // Artist Mode: Navigation buttons
        const navDiv = document.createElement('div');
        navDiv.className = 'artist-actions';
        navDiv.innerHTML = `
            <div class="focus-buttons-row">
                <button class="btn-trance" onclick="setFocus('primal')">Primal Norse</button>
                <button class="btn-trance" onclick="setFocus('folk')">Norse Folk</button>
            </div>
        `;
        actionContainer.appendChild(navDiv);

        if (landingSocialLinks) {
            landingSocialLinks.innerHTML = `
                <a href="#" class="social-link" target="_blank" rel="noopener noreferrer">Spotify</a>
                <a href="https://youtube.com/@wartemdraumr?si=x1WlmypHp64JxXkH" class="social-link" target="_blank" rel="noopener noreferrer">YouTube</a>
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

        if (typeof videoEl.requestVideoFrameCallback === 'function') {
            videoEl.requestVideoFrameCallback(() => done());
            return;
        }

        videoEl.addEventListener('loadeddata', done, { once: true });
        setTimeout(done, 250);
    });
}

function changeVideoContext(newPlaylist) {
    // HARD reset of engine state
    isTransitioning = true;
    currentPlaylistIndex = 0;
    activePlayerId = 1;

    activePlaylist = newPlaylist;

    const fadeDuration = getFadeDuration();

    // Drop curtain
    fadeOverlay.classList.add('active');

    setTimeout(() => {
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
        player1.src = activePlaylist[0];
        player1.load();

        player1.play()
            .then(() => {
                player1.classList.add('visible');
                return waitForFirstFrame(player1);
            })
            .then(() => {
                isTransitioning = false;
                fadeOverlay.classList.remove('active');
                setVideoOpacityTransitionsEnabled(true);
            })
            .catch(() => {
                isTransitioning = false;
                fadeOverlay.classList.remove('active');
                setVideoOpacityTransitionsEnabled(true);
            });

    }, fadeDuration);
}

function performCrossfade() {
    isTransitioning = true;

    const fadeDuration = getFadeDuration();

    const currentVid = activePlayerId === 1 ? player1 : player2;
    const nextVid = activePlayerId === 1 ? player2 : player1;
    const nextIdx = (currentPlaylistIndex + 1) % activePlaylist.length;

    if (!nextVid.src.includes(activePlaylist[nextIdx])) {
        nextVid.src = activePlaylist[nextIdx];
        nextVid.load();
    }

    nextVid.play().then(() => {
        nextVid.classList.add('visible');
        currentVid.classList.remove('visible');

        setTimeout(() => {
            currentVid.pause();
            currentVid.currentTime = 0;

            activePlayerId = activePlayerId === 1 ? 2 : 1;
            currentPlaylistIndex = nextIdx;

            const futureIdx = (currentPlaylistIndex + 1) % activePlaylist.length;
            currentVid.src = activePlaylist[futureIdx];
            currentVid.load();

            isTransitioning = false;
        }, fadeDuration);
    }).catch(() => {
        isTransitioning = false;
    });
}

function checkTime(e) {
    if (activePlaylist.length < 2) return;

    const player = e.target;
    const activePlayer = activePlayerId === 1 ? player1 : player2;

    if (player !== activePlayer) return;
    if (!player.duration || isNaN(player.duration)) return;

    const fadeDuration = getFadeDuration();
    const remaining = player.duration - player.currentTime;

    if (
        remaining < (fadeDuration / 1000) &&
        remaining > 0.1 &&
        !isTransitioning
    ) {
        performCrossfade();
    }
}

player1.addEventListener('timeupdate', checkTime);
player2.addEventListener('timeupdate', checkTime);

// --- INTERACTION ---

// Shield Wall Logic
/* enterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    requestFullscreen();
    document.body.classList.add('ritual-active');
    statusDisplay.textContent = `Focus: ${CONTENT[currentFocus].title} // Deep State`;
}); */

enterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.add('ritual-active');
    statusDisplay.textContent = `Focus: ${CONTENT[currentFocus].title} // Deep State`;
});

function standDown() {
    if (!document.body.classList.contains('ritual-active')) return;
    document.body.classList.remove('ritual-active');
    statusDisplay.textContent = `Focus: ${CONTENT[currentFocus].title} // Active`;
    if (window.WDPlayer && typeof window.WDPlayer.reset === 'function') {
        window.WDPlayer.reset();
    }
}

exitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    standDown();
});

function requestFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
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

/* window.addEventListener("load", () => {
    document.body.style.opacity = "1";
    }); */
