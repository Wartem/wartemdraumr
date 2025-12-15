// --- DATA CONFIGURATION ---

const CONTENT = {
    artist: {
        id: 'artist',
        title: 'Wartem Draumr',
        subtitle: 'Ancient Norse — A Unified Identity',
        desc: 'Wartem Draumr is the artistic identity through which an ancient spirit is restored as lived presence and function. Working from an Ancient Norse foundation, the music unfolds through two distinct sonic paths. Primal Norse is visceral, bodily, and ritual-driven. Norse Folk is narrative, textural, and rooted in place and memory. Both are inseparable expressions of the same underlying force.',
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
    },
    {
        id: 'II',
        title: 'Primal Norse',
        meta: 'The Body',
        desc: 'The active state. Trance, adrenaline, and physical focus. Music as ritual function, designed to alter the body and sharpen intent.'
    },
    {
        id: 'III',
        title: 'Norse Folk',
        meta: 'The Spirit',
        desc: 'The reflective state. Story, voice, and melody shaped by place and memory. Music for listening, remembrance, and continuity.'
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
            'assets/Viking_Berserker_Rage_Cinematic_Video (2).mp4',
            'assets/Viking_Berserker_Rage_Cinematic_Video (3).mp4',
            'assets/Viking_Berserker_Rage_Cinematic_Video (4).mp4',
            'assets/Viking_Berserker_Rage_Cinematic_Video (5).mp4'
        ],
        overlayTitle: 'The Ritual Cycles',
cards: [
    {
        id: 'I',
        title: 'Ginnungagap',
        meta: 'The Void • 60 BPM',
        desc: 'Low-frequency drones and sustained tones designed to slow breathing and heart rate. Clears mental noise and prepares the body for focus before exertion.'
    },
    {
        id: 'II',
        title: 'Berserkergang',
        meta: 'The Fury • 140 BPM',
        desc: 'Aggressive, polyrhythmic percussion and driving patterns that elevate adrenaline and trigger the fight response. Built for output, force, and forward momentum.'
    },
    {
        id: 'III',
        title: 'Valhalla',
        meta: 'The Release • Free Tempo',
        desc: 'Extended textures and open pacing that allow the nervous system to settle. Supports recovery, grounding, and the return from total physical expenditure.'
    }
]
    },
    folk: {
        id: 'folk',
        title: 'Norse Folk',
        subtitle: 'The Hearth & The Saga',
        desc: 'Norse Folk is music for listening and remembrance. It is carried by voice, melody, and texture, shaped by story, landscape, and lived memory. This is sound for the long form: reflection, continuity, and presence within place.',
        playlist: [
            'assets/video_04.mp4',
            'assets/video_05.mp4',
            'assets/video_02.mp4'
        ],
        overlayTitle: 'The Folk Forms',
cards: [
    {
        id: 'I',
        title: 'Saga',
        meta: 'The Story',
        desc: 'Melodic structures built around voice and string, intended to carry narrative over time. Supports listening, recall, and the transmission of memory through song.'
    },
    {
        id: 'II',
        title: 'Hearth',
        meta: 'The Home',
        desc: 'Close, grounded textures shaped by repetition and warmth. Creates a sense of safety, continuity, and presence within a shared space.'
    },
    {
        id: 'III',
        title: 'Voyage',
        meta: 'The Horizon',
        desc: 'Extended, unfolding compositions that accompany movement and transition. Orients attention outward toward landscape, distance, and passage.'
    }
]
    }
};

const FADE_DURATION = 2000;

// --- STATE VARIABLES ---
let currentFocus = 'artist'; // Default
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

function init() {
    // Set Initial State
    setFocus('artist');
    
    // Setup Global Listeners
    setupFocusOverlay();
    setupKeyboard();
    
    // Status
    statusDisplay.textContent = "Identity: Wartem Draumr // Active";
}

const soundTrigger = document.getElementById('sound-trigger');

soundTrigger.addEventListener('click', () => {
    soundEnabled = !soundEnabled;

    [player1, player2].forEach(player => {
        player.muted = !soundEnabled;
        if (soundEnabled) {
            player.volume = 0.8; // fixed, restrained level
        }
    });

    soundTrigger.textContent = soundEnabled ? 'Sound: On' : 'Sound: Off [M]';
});

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
    if (!CONTENT[focusKey]) return;
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
        landingSubtitle.textContent = data.subtitle;
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

    if (focusKey === 'artist') {
        // Artist Mode: Navigation buttons
        const navDiv = document.createElement('div');
        navDiv.className = 'artist-actions';
        navDiv.innerHTML = `
            <div class="focus-buttons-row">
                <button class="btn-trance" onclick="setFocus('primal')">Primal Norse</button>
                <button class="btn-trance" onclick="setFocus('folk')">Norse Folk</button>
            </div>
        <div class="social-links">
            <a href="#" class="social-link" target="_blank" rel="noopener noreferrer">Spotify</a>
            <a href="https://youtube.com/@wartemdraumr?si=x1WlmypHp64JxXkH" class="social-link" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="#" class="social-link" target="_blank" rel="noopener noreferrer">Bandcamp</a>
        </div>
        `;
        actionContainer.appendChild(navDiv);
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
    
    // Clear grid
    cyclesGrid.innerHTML = '';
    
    // Generate Cards
    data.cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'cycle-card';
        div.innerHTML = `
            <span class="rune">${card.id}</span>
            <h4>${card.title}</h4>
            <p class="meta">${card.meta}</p>
            <p class="desc">${card.desc}</p>
        `;
        cyclesGrid.appendChild(div);
    });
}

// --- VIDEO ENGINE ---

function changeVideoContext(newPlaylist) {
    // Stop crossfader
    isTransitioning = false;
    
    // Update data
    activePlaylist = newPlaylist;
    currentPlaylistIndex = 0;

    // Cinematic Fade Reset
    fadeOverlay.classList.add('active'); // Fade screen to black

    setTimeout(() => {
        // Reset Players behind the curtain
        activePlayerId = 1;
        
        player1.src = activePlaylist[0];
        player1.load();
        player1.classList.remove('visible'); // Reset visibility
        
        player2.src = activePlaylist[1];
        player2.load();
        player2.classList.remove('visible');

        // Play P1
        player1.play().then(() => {
            player1.classList.add('visible');
            fadeOverlay.classList.remove('active'); // Lift curtain
        }).catch(err => {
            console.warn("Autoplay blocked", err);
            // Even if blocked, we lift curtain so user can see/interact
            fadeOverlay.classList.remove('active'); 
        });

    }, 1100); // Wait for fade to black (1s) + buffer (100ms)
}

function performCrossfade() {
    isTransitioning = true;
    const currentVid = activePlayerId === 1 ? player1 : player2;
    const nextVid = activePlayerId === 1 ? player2 : player1;
    const nextIdx = (currentPlaylistIndex + 1) % activePlaylist.length;

    // Load next video into the hidden player if not already done
    // (Ideally done after previous swap, but checking here ensures safety)
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
            
            // State Update
            activePlayerId = activePlayerId === 1 ? 2 : 1;
            currentPlaylistIndex = nextIdx;
            
            // Preload *Next* Step
            const futureIdx = (currentPlaylistIndex + 1) % activePlaylist.length;
            currentVid.src = activePlaylist[futureIdx];
            currentVid.load();
            
            isTransitioning = false;
        }, FADE_DURATION);
    }).catch(e => {
        console.error("Crossfade failed", e);
        isTransitioning = false;
    });
}

function checkTime(e) {
    if (activePlaylist.length < 2) return;
    
    const player = e.target;
    // Only active player checks time
    if (player !== (activePlayerId === 1 ? player1 : player2)) return;

    const remaining = player.duration - player.currentTime;
    if (remaining < (FADE_DURATION / 1000) && remaining > 0.1 && !isTransitioning) {
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

exitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.remove('ritual-active');
    statusDisplay.textContent = `Focus: ${CONTENT[currentFocus].title} // Active`;
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
            setFocus(focusKey);
            focusOverlay.classList.remove('open');
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
            else if (document.body.classList.contains('ritual-active')) {
                document.body.classList.remove('ritual-active');
            }
        }
        if (e.key === 'f' || e.key === 'F') {
            if (!document.body.classList.contains('ritual-active')) {
                focusOverlay.classList.toggle('open');
            }
        }
        if (e.key === 'm' || e.key === 'M') {
            toggleSound();
        }
    });
}

// Start
document.addEventListener('DOMContentLoaded', init);