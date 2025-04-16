function showPanel(panel) {
  document.getElementById('launch').style.display = (panel === 'launch') ? 'block' : 'none';
  document.getElementById('stop').style.display = (panel === 'stop') ? 'block' : 'none';
}

function startAttack() {
  const ip = document.getElementById("targetIP").value;
  const port = document.getElementById("port").value;
  const time = document.getElementById("duration").value;
  const threads = document.getElementById("threads").value;
  const apikey = document.getElementById("apiKey").value;

  fetch(`/start?ip=${ip}&port=${port}&time=${time}&threads=${threads}&apikey=${apikey}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("log").innerText = `✅ Started: Attack ID ${data.attack_id}`;
      document.getElementById("attackID").value = data.attack_id;
      document.getElementById("copyBtn").style.display = 'inline-block';
    }).catch(err => {
      document.getElementById("log").innerText = `❌ Error: ${err}`;
    });
}

function stopAttack() {
  const attack_id = document.getElementById("attackID").value;

  fetch(`/stop?attack_id=${attack_id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("log").innerText = `🛑 ${data.status}`;
    }).catch(err => {
      document.getElementById("log").innerText = `❌ Error: ${err}`;
    });
}

function copyToClipboard() {
  const attackID = document.getElementById("attackID").value;
  navigator.clipboard.writeText(attackID).then(() => {
    document.getElementById("log").innerText = `📋 Attack ID copied: ${attackID}`;
  }).catch(err => {
    document.getElementById("log").innerText = `❌ Failed to copy Attack ID: ${err}`;
  });
}
