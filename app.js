const domainInfo = {
  mds: 'Check Point MDS R81.20 API ile CMA bazlı object, user ve policy operasyonları.',
  netscaler: 'NetScaler NITRO REST API ile VIP, service group, backend ve binding yönetimi.',
  nginx: 'NGINX yalnızca reverse proxy/domain routing/SSL termination için pasif katmandır.',
};

const feed = [
  {
    time: '2026-04-16T08:41:19Z',
    requestId: 'REQ-7D31A2',
    domain: 'MDS',
    operation: 'bulk user create',
    status: 'SUCCESS',
  },
  {
    time: '2026-04-16T08:46:07Z',
    requestId: 'REQ-7D31A3',
    domain: 'NetScaler',
    operation: 'vip create',
    status: 'DRY_RUN',
  },
];

const domainDescription = document.getElementById('domain-description');
const pills = document.querySelectorAll('.pill');
const feedBody = document.getElementById('feed');
const fileInput = document.getElementById('bulkFile');
const fileMeta = document.getElementById('file-meta');
const validateButton = document.getElementById('validate');
const executeButton = document.getElementById('execute');

function renderFeed() {
  feedBody.innerHTML = '';
  feed.forEach((entry) => {
    const tr = document.createElement('tr');
    const statusClass =
      entry.status === 'SUCCESS' ? 'ok' : entry.status === 'DRY_RUN' ? 'warn' : 'fail';
    tr.innerHTML = `
      <td>${entry.time}</td>
      <td>${entry.requestId}</td>
      <td>${entry.domain}</td>
      <td>${entry.operation}</td>
      <td><span class="status ${statusClass}">${entry.status}</span></td>
    `;
    feedBody.appendChild(tr);
  });
}

pills.forEach((pill) => {
  pill.addEventListener('click', () => {
    pills.forEach((item) => item.classList.remove('active'));
    pill.classList.add('active');
    domainDescription.textContent = domainInfo[pill.dataset.domain];
  });
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) {
    fileMeta.textContent = 'Henüz dosya seçilmedi.';
    return;
  }
  fileMeta.textContent = `${file.name} · ${(file.size / 1024).toFixed(1)} KB`;
});

validateButton.addEventListener('click', () => {
  alert('Validation tamamlandı: payload formatı, scope ve idempotency kontrolleri geçti.');
});

executeButton.addEventListener('click', () => {
  const requestId = `REQ-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;
  feed.unshift({
    time: new Date().toISOString(),
    requestId,
    domain: document.querySelector('.pill.active').dataset.domain.toUpperCase(),
    operation: document.getElementById('operation').value,
    status: document.getElementById('dry-run').value === 'true' ? 'DRY_RUN' : 'SUCCESS',
  });
  renderFeed();
});

renderFeed();
