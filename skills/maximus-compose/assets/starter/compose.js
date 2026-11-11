// Composition and local feedback only. Components implement the controls.
const tabs = document.getElementById('settings-tabs');
tabs.tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'notifications', label: 'Notifications' },
];

document.getElementById('profile-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  document.getElementById('profile-notice').textContent = `Saved locally for this preview: ${data.get('workspace-name')}.`;
});

document.getElementById('notification-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const enabled = new FormData(event.currentTarget).has('updates');
  const status = enabled ? 'enabled' : 'disabled';
  document.getElementById('notification-notice').textContent = `Email updates ${status} in this preview.`;
});
