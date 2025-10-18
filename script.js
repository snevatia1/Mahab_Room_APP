let rooms, tariff, rules, restricted_periods;
let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
let history = JSON.parse(localStorage.getItem('history') || '[]');
const defaultMem = {id: '123', name: 'John Doe'};

// Load JSONs with error handling
async function loadData() {
  try {
    rooms = await fetch('data/config/rooms.json').then(r => { if (!r.ok) throw new Error('Rooms fetch failed'); return r.json(); });
    tariff = await fetch('data/config/tariff.json').then(r => { if (!r.ok) throw new Error('Tariff fetch failed'); return r.json(); });
    rules = await fetch('data/config/rules.json').then(r => { if (!r.ok) throw new Error('Rules fetch failed'); return r.json(); });
    restricted_periods = await fetch('data/config/restricted_periods.json').then(r => { if (!r.ok) throw new Error('Restricted fetch failed'); return r.json(); });
    console.log('Data loaded successfully');
  } catch (e) {
    console.error('Load data error:', e);
    alert('Error loading data: ' + e.message + '. Check console and file paths.');
    throw e; // Prevent further execution
  }
}

// Generate calendar
function generateCalendar() {
  console.log('Generating calendar...');
  const container = document.getElementById('calendar-container');
  container.innerHTML = ''; // Clear
  let current = moment('2025-10-01');
  for (let i = 0; i < 6; i++) {
    const month = current.format('MMMM YYYY');
    const table = document.createElement('table');
    table.innerHTML = `<caption>${month}</caption><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>`;
    const startDay = current.clone().startOf('month').day();
    let row = table.insertRow();
    for (let j = 0; j < startDay; j++) row.insertCell();
    const daysInMonth = current.daysInMonth();
    for (let day = 1; day <= daysInMonth; day++) {
      if (row.cells.length === 7) row = table.insertRow();
      const cell = row.insertCell();
      const dateStr = current.format('YYYY-MM') + '-' + day.toString().padStart(2, '0');
      let period;
      if (restricted_periods) {
        period = restricted_periods.find(p => moment(dateStr).isBetween(p.start, p.end, null, '[]'));
        if (period) cell.classList.add(period.type);
      }
      let vacant = rooms ? rooms.length : 0;
      bookings.forEach(b => {
        if (moment(dateStr).isBetween(b.start, b.end, null, '[]')) vacant -= b.selectedRooms.length;
      });
      cell.innerHTML = `${day}<br><span class="vacant-count">${vacant}</span>`;
    }
    container.appendChild(table);
    current.add(1, 'month');
  }
  console.log('Calendar generated');
}

// Update availability
function updateAvailability() {
  const start = document.getElementById('avail-start').value;
  const end = document.getElementById('avail-end').value;
  if (!start || !end) return;
  const results = document.getElementById('avail-results');
  results.innerHTML = '';
  const blocks = [...new Set(rooms.map(r => r.block))];
  blocks.forEach(block => {
    const total = rooms.filter(r => r.block === block).length;
    let free = total;
    bookings.forEach(b => {
      if (moment(b.start).isSameOrBefore(end) && moment(b.end).isSameOrAfter(start)) {
        free -= b.selectedRooms.filter(r => r.block === block).length;
      }
    });
    results.innerHTML += `<p>${block}: ${free}/${total} free</p>`;
  });
}

// Start booking
async function startBooking() {
  console.log('Start booking clicked');
  const otp = prompt('Enter OTP (test: 123)');
  if (otp !== '123') {
    alert('Invalid OTP');
    return;
  }
  try {
    await loadData();
  } catch (e) {
    return; // Already alerted
  }
  document.getElementById('member-name').textContent = defaultMem.name;
  document.getElementById('booking-wizard').style.display = 'block';
  // Add guest rows for Member and Temp
  const createTable = (id, title, maxRows) => {
    const div = document.getElementById(id);
    const table = document.createElement('table');
    table.innerHTML = '<tr><th>Sr No</th><th>Name</th><th>Age</th><th>Meal Pref (V/NV)</th></tr>';
    for (let i = 1; i <= maxRows; i++) {
      const row = table.insertRow();
      row.innerHTML = `<td>${i}</td><td><input type="text"></td><td><input type="number"></td><td><select><option>V</option><option>NV</option></select></td>`;
    }
    div.appendChild(table);
  };
  createTable('member-list', 'Member Details', 5);
  createTable('temp-member-list', 'Temp Member Details', 5);
  console.log('Wizard shown');
}

// Find available rooms
function findAvailableRooms() {
  const form = document.getElementById('booking-form');
  const start = moment(form['start-date'].value);
  const end = moment(form['end-date'].value);
  const nights = end.diff(start, 'days');
  if (nights < 1) return alert('Invalid dates');
  const filters = {
    wheel_chair_access: form['wheelchair'].checked,
    pets_permitted: form['pets'].checked,
    airconditioning: form['ac'].checked,
    single: form['single'].checked ? true : false
  };
  // Get available rooms
  let avail = getAvailableRooms(start, end, filters);
  let html = '';
  if (avail.length === 0) {
    html += '<p>No exact match. Alternates:</p>';
    // Relax filters
    for (let key in filters) {
      if (filters[key]) {
        let relaxed = {...filters, [key]: false};
        let altAvail = getAvailableRooms(start, end, relaxed);
        if (altAvail.length > 0) html += `<p>Without ${key}: ${altAvail.length} rooms</p>`;
      }
    }
  }
  // Group by block
  const blocks = {};
  avail.forEach(r => {
    if (!blocks[r.block]) blocks[r.block] = [];
    blocks[r.block].push(r);
  });
  for (let block in blocks) {
    html += `<div class="block"><h3>${block} (${blocks[block].length} vacant)</h3>`;
    blocks[block].forEach(r => {
      html += `<div class="room-item"><input type="checkbox" value="${r.room_no}" data-min="${r.min_person}" data-max="${r.max_person}"> ${r.room_no} (Min: ${r.min_person}, Max: ${r.max_person})</div>`;
    });
    html += '</div>';
  }
  // Check partial
  if (avail.length < nights * parseInt(form['mem-adults'].value || 1)) html += '<p>Partial availability; alternate rooms for some dates. Club will shift luggage.</p>';
  document.getElementById('available-rooms').innerHTML = html;
  document.getElementById('calculate-btn').style.display = 'block';
}

function getAvailableRooms(start, end, filters) {
  let availRooms = rooms.filter(r => {
    if (filters.single && (r.min_person !== 1 || r.max_person !== 2)) return false;
    for (let key in filters) if (filters[key] && !r[key]) return false;
    return true;
  });
  bookings.forEach(b => {
    if (moment(b.start).isSameOrBefore(end.format('YYYY-MM-DD')) && moment(b.end).isSameOrAfter(start.format('YYYY-MM-DD'))) {
      b.selectedRooms.forEach(br => availRooms = availRooms.filter(ar => ar.room_no !== br.room_no));
    }
  });
  return availRooms;
}

// Calculate booking
function calculateBooking() {
  const form = document.getElementById('booking-form');
  const start = moment(form['start-date'].value);
  const end = moment(form['end-date'].value);
  const nights = end.diff(start, 'days');
  let selectedRooms = Array.from(document.querySelectorAll('#available-rooms input:checked')).map(cb => rooms.find(r => r.room_no === cb.value));
  if (selectedRooms.length === 0) return alert('Select rooms');
  // Occupants selection with split
  const occDiv = document.getElementById('occupants-selection');
  occDiv.style.display = 'block';
  occDiv.innerHTML = '<h3>Occupants per Room (Member/Temp/Children)</h3>';
  selectedRooms.forEach(r => {
    let html = `<div class="room-occ">${r.room_no} (Max ${r.max_person}): 
      Member Adults: <select class="mem-adult-sel"><option>0</option><option>1</option><option>2</option></select>
      Temp Adults: <select class="temp-adult-sel"><option>0</option><option>1</option><option>2</option></select>
      Children: <select class="child-sel"><option>0</option><option>1</option><option>2</option></select>
    </div>`;
    occDiv.innerHTML += html;
  });
  // Proceed to summary
  let type = restricted_periods.some(p => p.type === 'special' && start.isBefore(p.end) && end.isAfter(p.start)) ? 'special' : 'regular';
  const memAdults = parseInt(form['mem-adults'].value || 0);
  const seniors = parseInt(form['seniors'].value || 0);
  const memChildren10 = parseInt(form['mem-children-10'].value || 0);
  const memChildren1121 = parseInt(form['mem-children-11-21'].value || 0);
  const tempAdults = parseInt(form['temp-adults'].value || 0);
  const tempChildren = parseInt(form['temp-children'].value || 0);
  const totalOccupants = memAdults + seniors + memChildren10 + memChildren1121 + tempAdults + tempChildren;
  const totalRooms = selectedRooms.length;
  let total = 0;
  const baseType = form['single'].checked ? 'single_single' : 'double'; // Simplified
  total += totalRooms * tariff[type].member[baseType] * nights;
  total += seniors * tariff[type].senior.extra_adult * nights;
  total += tempAdults * tariff[type].temp.extra_adult * nights;
  total += (memAdults + memChildren1121 - totalRooms) * tariff[type].member.extra_adult * nights; // Extras
  total += (memChildren10 + tempChildren) * tariff[type].temp.extra_child * nights; // Use temp for children extras if mixed
  if (form['ac'].checked) total += totalRooms * (tariff.add_ons.ac_per_night * (1 + tariff.add_ons.gst_on_ac)) * nights;
  // Validate occupants
  const sumMemAdults = Array.from(occDiv.querySelectorAll('.mem-adult-sel')).reduce((sum, s) => sum + parseInt(s.value), 0);
  const sumTempAdults = Array.from(occDiv.querySelectorAll('.temp-adult-sel')).reduce((sum, s) => sum + parseInt(s.value), 0);
  const sumChildren = Array.from(occDiv.querySelectorAll('.child-sel')).reduce((sum, s) => sum + parseInt(s.value), 0);
  if (sumMemAdults !== memAdults + seniors + memChildren1121 || sumTempAdults !== tempAdults || sumChildren !== memChildren10 + tempChildren) return alert('Per room counts must match total');
  const summary = document.getElementById('booking-summary');
  summary.innerHTML = `<p>Dates: ${start.format('YYYY-MM-DD')} to ${end.format('YYYY-MM-DD')} (${nights} nights)</p>
    <p>Total Rooms: ${totalRooms}</p>
    <p>Total Occupants: ${totalOccupants}</p>
    <p>Type: ${type}</p>
    <p>Total: ₹${total.toFixed(2)} (incl. GST)</p>`;
  document.getElementById('confirm-btn').style.display = 'block';
  speak(`Your booking summary: ${nights} nights, ${totalRooms} rooms, ${totalOccupants} occupants, total ${total} rupees.`);
}

// Confirm booking
function confirmBooking() {
  const form = document.getElementById('booking-form');
  const selectedRooms = Array.from(document.querySelectorAll('#available-rooms input:checked')).map(cb => rooms.find(r => r.room_no === cb.value));
  const booking = {
    memId: defaultMem.id,
    start: form['start-date'].value,
    end: form['end-date'].value,
    selectedRooms
    // Guests etc.
  };
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  alert('Booking confirmed (simulated)!');
  document.getElementById('booking-wizard').style.display = 'none';
  generateCalendar(); // Update
  updateAvailability();
}

// Voice assistant
function speak(text) {
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utter);
  }
}

// Admin functions
function loginAdmin() {
  if (document.getElementById('admin-pass').value !== 'admin123') return alert('Wrong password');
  document.getElementById('admin-content').style.display = 'block';
  const select = document.getElementById('json-select');
  select.onchange = () => {
    const key = select.value;
    document.getElementById('edit-json').value = JSON.stringify(window[key], null, 2);
  };
  select.onchange(); // Load first
  // Bookings list
  const blist = document.getElementById('bookings-list');
  bookings.forEach((b, i) => {
    const li = document.createElement('li');
    li.innerHTML = `${b.memId}: ${b.start} to ${b.end} <button onclick="cancelBooking(${i})">Cancel</button>`;
    blist.appendChild(li);
  });
  // History
  const hlist = document.getElementById('history-list');
  history.forEach(h => {
    const li = document.createElement('li');
    li.textContent = `${h.date}: ${JSON.stringify(h.changes)}`;
    hlist.appendChild(li);
  });
}

function saveJson() {
  const select = document.getElementById('json-select');
  const updated = JSON.parse(document.getElementById('edit-json').value);
  window[select.value] = updated;
  history.push({date: new Date().toISOString(), changes: updated});
  localStorage.setItem('history', JSON.stringify(history));
  alert('Saved (in memory; refresh to test)');
}

function cancelBooking(index) {
  // Simulate charges
  const b = bookings[index];
  const daysToStart = moment(b.start).diff(moment(), 'days');
  let charge = 0;
  // Apply rules (simplified)
  if (daysToStart > 7) charge = rules.cancellation.regular[0].cancel * 100; // Percent
  alert(`Cancelled with ₹${charge} charge (simulated)`);
  bookings.splice(index, 1);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  location.reload();
}

// Init
window.onload = async () => {
  try {
    await loadData();
    generateCalendar();
    document.getElementById('avail-start').value = moment().format('YYYY-MM-DD');
    document.getElementById('avail-end').value = moment().add(1, 'day').format('YYYY-MM-DD');
    updateAvailability();
  } catch (e) {
    console.error('Onload error:', e);
    alert('Page load error: Check console. Possibly missing files or network issue.');
  }
};