<template>
  <div class="puzzle-view">
    <h2>Arma el rompecabezas</h2>
    <div class="timer" :class="{ critical: isCritical }">
        Tiempo: {{ displayTime }}s
    </div>
    <!-- <button @click="$emit('completed')" class="debug-skip">Skip ⏩</button> -->
    
    <div class="game-area">
        <!-- Target Grid -->
        <div class="puzzle-grid">
            <div 
                v-for="(piece, index) in gridSlots" 
                :key="'slot-' + index"
                class="grid-slot"
                :data-index="index"
                :class="{ 'has-piece': piece !== null }"
            >
                <div 
                    v-if="piece !== null"
                    class="puzzle-piece in-grid"
                    @mousedown="handlePointerDown($event, { value: piece, id: 'grid-'+index }, 'grid', index)"
                    @touchstart="handlePointerDown($event, { value: piece, id: 'grid-'+index }, 'grid', index)"
                    :style="getPieceStyle(piece)"
                ></div>
            </div>
        </div>

        <!-- Scattered Pieces (Source) -->
        <div class="scattered-area">
            <div 
                v-for="piece in scatteredPieces" 
                :key="'piece-' + piece.id"
                class="puzzle-piece scattered"
                @mousedown="handlePointerDown($event, piece, 'scatter')"
                @touchstart="handlePointerDown($event, piece, 'scatter')"
                :style="{ 
                    ...getPieceStyle(piece.value), 
                    top: piece.y + 'px', 
                    left: piece.x + 'px' 
                }"
            ></div>
        </div>
        
        <!-- Dragging Ghost -->
        <div 
            v-if="draggingPiece"
            id="dragging-ghost"
            class="puzzle-piece dragging"
            :style="{ 
                ...getPieceStyle(draggingPiece.value), 
                top: draggingPiece.y + 'px', 
                left: draggingPiece.x + 'px' 
            }"
        ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import puzzleImg from '@/assets/images/puzzle/puzzle_bg.jpeg';

const emit = defineEmits(['completed']);

// Game State
const gridSlots = ref(Array(9).fill(null)); 
const scatteredPieces = ref([]); 
const draggingPiece = ref(null); // { value, x, y, id, offsetX, offsetY }

// Initialize Game
const initGame = () => {
    const pieces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    gridSlots.value = Array(9).fill(null);
    draggingPiece.value = null;
    
    scatteredPieces.value = pieces.map(val => {
        const x = Math.random() * (window.innerWidth * 0.8) + (window.innerWidth * 0.1);
        const y = Math.random() * (window.innerHeight * 0.3) + (window.innerHeight * 0.6);
        return {
            id: val,
            value: val,
            x: x - 40,
            y: y - 40
        };
    });
};

// Pointer Events (Mouse + Touch)
const handlePointerDown = (event, piece, source, index) => {
    // Prevent default to avoid scrolling/selection
    event.preventDefault();
    
    const clientX = event.clientX || event.touches?.[0]?.clientX;
    const clientY = event.clientY || event.touches?.[0]?.clientY;

    // Calculate offset to prevent snapping to center
    // But since we are moving things to a global fixed layer, 
    // it's easier to just center it or keep relative.
    // Let's simpler: snap center to finger for better visibility on mobile? 
    // Actually offset is better feel.
    
    // Logic: Remove from source immediately and put into "draggingPiece" state
    if (source === 'grid') {
        gridSlots.value[index] = null;
    } else {
        const idx = scatteredPieces.value.findIndex(p => p.id === piece.id);
        if (idx !== -1) scatteredPieces.value.splice(idx, 1);
    }

    draggingPiece.value = {
        ...piece,
        x: clientX - 50, // Center (assuming 100px width)
        y: clientY - 50,
        isDragging: true
    };
    
    // Add global listeners
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);
};

const handlePointerMove = (event) => {
    if (!draggingPiece.value) return;
    event.preventDefault(); // Prevent scrolling
    
    const clientX = event.clientX || event.touches?.[0]?.clientX;
    const clientY = event.clientY || event.touches?.[0]?.clientY;

    draggingPiece.value.x = clientX - 50;
    draggingPiece.value.y = clientY - 50;
};

const handlePointerUp = (event) => {
    if (!draggingPiece.value) return;
    
    // Remove global listeners
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('touchmove', handlePointerMove);
    window.removeEventListener('touchend', handlePointerUp);
    
    const clientX = event.clientX || event.changedTouches?.[0]?.clientX;
    const clientY = event.clientY || event.changedTouches?.[0]?.clientY;

    // Check if dropped over a slot
    // We can use document.elementFromPoint
    // Note: The dragging piece itself might block the check if pointer-events not handled.
    // We'll set pointer-events: none on dragging piece in CSS momentarily or rely on z-index/elementFromPoint behavior.
    
    // Hide the dragging piece momentarily to check what's underneath
    const DragEl = document.getElementById('dragging-ghost');
    if (DragEl) DragEl.style.display = 'none';
    
    let dropped = false;
    const elem = document.elementFromPoint(clientX, clientY);
    if (DragEl) DragEl.style.display = 'block'; // Restore

    const slot = elem ? elem.closest('.grid-slot') : null;
    
    if (slot) {
        // Extract index from some attribute or id we put on slot
        const slotIndex = parseInt(slot.dataset.index);
        
        if (!isNaN(slotIndex)) {
            const existing = gridSlots.value[slotIndex];
            
            // Place current piece
            gridSlots.value[slotIndex] = draggingPiece.value.value;
            dropped = true;
            
            // If there was a piece, displace it to random pos
            if (existing !== null && existing !== undefined) {
                 const pos = getRandomPosition();
                 scatteredPieces.value.push({
                    id: existing,
                    value: existing,
                    ...pos
                 });
            }
        }
    }

    if (!dropped) {
        // Return to scatter
        // Use current position if in bounds, or respawn?
        // Let's use current position but ensure it stays in bottom area?
        // Or just let it drop where it is (if valid)?
        // User wants bottom area constraint.
        
        // Simple respawn in bottom area to keep things tidy
        const pos = getRandomPosition();
        scatteredPieces.value.push({
            id: draggingPiece.value.id,
            value: draggingPiece.value.value,
            x: draggingPiece.value.x, // Keep where dropped? 
            // If dropped in grid area but not in slot, we should push it down.
            // Let's just push it to current x/y but clamped or just use random.
            // User requested "en la parte roja deben ir las piezas".
            // So if I drop it in yellow area (top), it should go to bottom.
            ...pos
        });
    }

    draggingPiece.value = null;
    checkWin();
};

const getRandomPosition = () => {
        const x = Math.random() * (window.innerWidth * 0.8) + (window.innerWidth * 0.1);
        // Ensure pieces stay in the bottom area (e.g., 70% to 90% of screen height)
        const y = Math.random() * (window.innerHeight * 0.2) + (window.innerHeight * 0.75);
        return {
            x: x - 40,
            y: y - 40
        };
};

const timeLeft = ref(60.0);
const isCritical = ref(false);
let timerInterval = null;

const displayTime = computed(() => {
    return timeLeft.value.toFixed(2);
});

onMounted(() => {
    initGame();
    timerInterval = setInterval(() => {
        if (timeLeft.value > 0.5) {
            timeLeft.value -= 0.1;
        } else {
            isCritical.value = true;
            timeLeft.value = 0.01 + (timeLeft.value - 0.01) * 0.98;
            if (timeLeft.value < 0.01) timeLeft.value = 0.01;
        }
    }, 100);
});

onUnmounted(() => {
    clearInterval(timerInterval);
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('touchmove', handlePointerMove);
    window.removeEventListener('touchend', handlePointerUp);
});

const getPieceStyle = (val) => {
    const row = Math.floor(val / 3);
    const col = val % 3;
    return {
        backgroundImage: `url(${puzzleImg})`,
        backgroundSize: '300% 300%',
        backgroundPosition: `${col * 50}% ${row * 50}%`
    };
};

const checkWin = () => {
    if (gridSlots.value.every((val, index) => val === index)) {
        setTimeout(() => emit('completed'), 1000);
    }
};
</script>

<style scoped>
.puzzle-view {
    text-align: center;
    color: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden; /* Contain falling pieces */
}

.puzzle-view h2 {
    font-size: 2rem;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
    background: rgba(0, 0, 0, 0.3);
    padding: 8px 8px;
    border-radius: 15px;
    margin-top: 4px;
}

.game-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    width: 100%;
}

.puzzle-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    margin-top: 20px;
    z-index: 10; /* Above scattered pieces */
}

.grid-slot {
    width: 100%;
    height: 100%;
    border: 1px dashed rgba(255, 255, 255, 0.5); /* More visible border */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    background: rgba(255, 255, 255, 0.05);
}

.grid-slot:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: white;
    box-shadow: 0 0 10px rgba(255,255,255,0.3);
    transform: scale(1.02); /* Slight pop */
}

.puzzle-piece {
    width: 100px;
    height: 100px;
    background-color: #ffcccc;
    background-repeat: no-repeat;
    border-radius: 5px;
    cursor: grab;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}

.puzzle-piece.scattered {
    position: fixed; /* Allow them to float anywhere */
    transform: rotate(calc(var(--r, 0) * 1deg)); /* Add randomness in css later if needed */
    transition: top 0.3s, left 0.3s; /* Smooth movement when returning */
}

.timer {
    font-size: 2rem;
    font-family: monospace;
    margin-top: 20px;
}

.timer.critical {
    color: #ff4757;
}

.debug-skip {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0,0,0,0.3);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 0.8rem;
    z-index: 2000;
}

.puzzle-piece.dragging {
    position: fixed;
    z-index: 1000;
    pointer-events: none; /* Important for elementFromPoint */
    opacity: 0.9;
    scale: 1.1;
    cursor: grabbing;
}

@media (max-width: 600px) {
    .puzzle-grid {
        width: 90vw;
        height: 90vw;
         max-width: 300px;
         max-height: 300px;
    }
    .puzzle-piece {
        width: 100%;
        height: 100%; /* In grid */
    }
     .puzzle-piece.scattered, .puzzle-piece.dragging {
         width: 80px;
         height: 80px; 
     }
}
</style>
