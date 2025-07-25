// Set current level on page load
const currentLevel = window.location.pathname.split('/').pop().charAt(0);
if (!isNaN(currentLevel)) {
  localStorage.setItem('currentLevel', currentLevel);
}

// Update progress bar
function updateProgress() {
  const level = parseInt(localStorage.getItem('currentLevel') || 1);
  const progress = ((level - 1) / 6) * 100;
  document.querySelector('.progress-fill').style.width = `${progress}%`;
}