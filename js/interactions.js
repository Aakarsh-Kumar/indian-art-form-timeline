/* ==========================================================================
   MUSEUM INTERACTIONS & INTERFACE LOGIC
   Indian Art Through the Ages
   ========================================================================== */

let activeId = 1; // Tracks the currently active timeline event ID

document.addEventListener("DOMContentLoaded", () => {
  const hoverCard = document.getElementById("hover-card");
  const exploreBtn = document.getElementById("explore-btn");
  const modalOverlay = document.getElementById("editorial-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  // Initial load: Set selected panel to show event 1
  updateSelectedArtifact(activeId);

  // --- 1. Sync Selected Panel with TimelineJS Changes ---
  // We wait for timelineInstance to load and then bind the change listener
  const checkTimelineLoaded = setInterval(() => {
    if (window.timelineInstance) {
      clearInterval(checkTimelineLoaded);

      // Listen for slide change events
      window.timelineInstance.on('change', (data) => {
        if (data && data.unique_id) {
          const id = parseInt(data.unique_id.replace('slide-', ''), 10);
          if (id && !isNaN(id)) {
            activeId = id;
            updateSelectedArtifact(id);
          }
        }
      });
      
      // Also bind loaded event to run custom styling adjustments
      window.timelineInstance.on('loaded', () => {
        adjustTimelineNavigator();
      });
    }
  }, 100);

  // --- 2. Timeline Marker Hover Interaction (Event Delegation) ---
  document.addEventListener('mouseover', (e) => {
    const marker = e.target.closest('.tl-marker');
    if (marker && hoverCard) {
      // Find the index of this marker among all markers in the timeline nav
      const markers = Array.from(document.querySelectorAll('.tl-timenav-content .tl-marker'));
      const index = markers.indexOf(marker);
      
      if (index !== -1 && index < timelineData.length) {
        const item = timelineData[index];
        
        // Populate hover card content
        hoverCard.innerHTML = `
          <div class="hover-card-era">${item.era}</div>
          <div class="hover-card-title">${item.artifact}</div>
          <div class="hover-card-period">${item.period}</div>
          <img class="hover-card-image" src="${item.imageUrl}" alt="${item.artifact}">
          <div class="hover-card-desc">${item.shortDescription}</div>
          <div class="hover-card-hint">Explore →</div>
        `;
        
        // Position hover card above the marker dot
        const rect = marker.getBoundingClientRect();
        const cardWidth = 280;
        
        // Calculate centered X position
        let cardX = rect.left + window.scrollX + (rect.width / 2) - (cardWidth / 2);
        // Position Y slightly above the marker dot
        let cardY = rect.top + window.scrollY - 300; // Rough offset to sit above nav
        
        // Adjust for viewport boundaries
        if (cardX < 10) cardX = 10;
        if (cardX + cardWidth > window.innerWidth - 10) {
          cardX = window.innerWidth - cardWidth - 10;
        }

        // Apply position and activate
        hoverCard.style.left = `${cardX}px`;
        hoverCard.style.top = `${cardY}px`;
        hoverCard.classList.add("active");
      }
    }
  });

  document.addEventListener('mouseout', (e) => {
    const marker = e.target.closest('.tl-marker');
    if (marker && hoverCard) {
      hoverCard.classList.remove("active");
    }
  });

  // --- 3. Click Interactions for Media & Buttons ---
  document.addEventListener('click', (e) => {
    // If user clicks the explore button below the timeline
    if (e.target.closest('#explore-btn')) {
      openEditorialModal(activeId);
    }
    
    // If user clicks the active TimelineJS slide's image/media block or description text
    if (e.target.closest('.tl-slide-active .tl-media') || e.target.closest('.tl-slide-active .tl-text-content')) {
      openEditorialModal(activeId);
    }
  });

  // Close modal click handlers
  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener("click", closeEditorialModal);
    
    // Close when clicking overlay backdrop
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeEditorialModal();
      }
    });
  }

  // Keyboard accessibility (Esc to close)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("open")) {
      closeEditorialModal();
    }
  });
});

// --- Update the Selected Artifact Info Panel below timeline ---
function updateSelectedArtifact(id) {
  const item = timelineData.find(d => d.id === id);
  if (!item) return;

  const panel = document.getElementById("selected-artifact-info");
  if (!panel) return;

  // Use a fade-out effect, update, and fade-in
  panel.style.opacity = "0.3";
  panel.style.transform = "translateY(5px)";
  panel.style.transition = "opacity 200ms ease, transform 200ms ease";

  setTimeout(() => {
    // Update elements
    document.getElementById("panel-era").textContent = item.era;
    document.getElementById("panel-title").textContent = item.artifact;
    document.getElementById("panel-image").src = item.imageUrl;
    document.getElementById("panel-image").alt = item.artifact;
    document.getElementById("panel-image-credit").innerHTML = `Source: <a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">${item.sourceName}</a>`;
    
    // Populate Metadata
    document.getElementById("meta-period").textContent = item.period;
    document.getElementById("meta-region").textContent = item.region;
    document.getElementById("meta-medium").textContent = item.medium;
    document.getElementById("meta-artist").textContent = item.artist;
    
    // Text description
    document.getElementById("panel-text").textContent = item.shortDescription;

    // Restore opacity and slide into place
    panel.style.opacity = "1";
    panel.style.transform = "translateY(0)";
  }, 200);
}

// --- Open Editorial Modal ---
function openEditorialModal(id) {
  const item = timelineData.find(d => d.id === id);
  if (!item) return;

  const modal = document.getElementById("editorial-modal");
  if (!modal) return;

  // Populate modal fields
  document.getElementById("modal-era").textContent = item.era;
  document.getElementById("modal-title").textContent = item.artifact;
  document.getElementById("modal-meta-period").textContent = item.period;
  document.getElementById("modal-meta-region").textContent = item.region;
  document.getElementById("modal-meta-medium").textContent = item.medium;
  document.getElementById("modal-meta-artist").textContent = item.artist;
  
  document.getElementById("modal-image").src = item.imageUrl;
  document.getElementById("modal-image").alt = item.artifact;
  document.getElementById("modal-image-credit").innerHTML = `Source: <a href="${item.sourceUrl}" target="_blank" rel="noopener" style="color: inherit; text-decoration: underline;">${item.sourceName}</a>`;

  // Render context paragraphs
  const bodyContainer = document.getElementById("modal-editorial-body");
  bodyContainer.innerHTML = item.contextParagraphs.map(para => `<p>${para}</p>`).join("");

  // Open modal and lock scroll
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

// --- Close Editorial Modal ---
function closeEditorialModal() {
  const modal = document.getElementById("editorial-modal");
  if (!modal) return;

  modal.classList.remove("open");
  document.body.style.overflow = "";
}

// --- Minor UI adjustments inside TimelineJS iframe elements ---
function adjustTimelineNavigator() {
  // Add fine-styling parameters once TimelineJS loads
  const groups = document.querySelectorAll('.tl-timegroup');
  groups.forEach(g => {
    g.style.borderLeft = '1px solid rgba(26,26,26,0.1)';
  });
}
