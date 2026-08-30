/* ==========================================================================
   TIMELINEJS INITIALIZATION
   Indian Art Through the Ages
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Map our rich timelineData to TimelineJS structure
  const events = timelineData.map(item => {
    // Map periods to approximate numeric years for TimelineJS positioning
    let year = 2000;
    if (item.id === 1) year = -2500;       // c. 2500 BCE
    else if (item.id === 2) year = -250;   // c. 250 BCE
    else if (item.id === 3) year = 450;    // c. 5th century CE
    else if (item.id === 4) year = 1100;   // c. 10th-12th century CE
    else if (item.id === 5) year = 1000;   // c. 950-1050 CE
    else if (item.id === 6) year = 1660;   // 16th-18th century
    else if (item.id === 7) year = 1730;   // 17th-18th century
    else if (item.id === 8) year = 1885;   // Late 19th century
    else if (item.id === 9) year = 1935;   // 1930s-1940s
    else if (item.id === 10) year = 2026;  // Contemporary India

    return {
      start_date: {
        year: year.toString()
      },
      media: {
        url: item.imageUrl,
        caption: `${item.artifact} — ${item.era}`,
        credit: item.sourceName
      },
      text: {
        headline: item.artifact,
        text: item.timelineText
      },
      unique_id: `slide-${item.id}`
    };
  });

  const timelineJson = {
    events: events
  };

  // Configure TimelineJS options
  const options = {
    debug: false,
    initial_zoom: 2,
    hash_bookmark: false,
    show_back_to_start: false,
    start_at_slide: 0,
    font: 'default', // Uses default browser fonts, letting our CSS override them
    is_embed: false,
    lang: 'en'
  };

  // Instantiate TimelineJS
  // The global window.timelineInstance is used by interactions.js to listen to slides
  window.timelineInstance = new TL.Timeline('timeline-embed', timelineJson, options);
});
