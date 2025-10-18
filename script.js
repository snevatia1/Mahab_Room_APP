// Load data (in real, fetch JSON; here inline for simplicity)
const rooms = [
  {"block": "A", "room_no": "A-1", "floor": "1st", "min_person": 1, "max_person": 2, "airconditioning": false, "wheel_chair_access": true, "pets_permitted": false, "group_booking_permitted": true},
  {"block": "A", "room_no": "A-2", "floor": "1st", "min_person": 2, "max_person": 4, "airconditioning": false, "wheel_chair_access": true, "pets_permitted": false, "group_booking_permitted": true},
  {"block": "A", "room_no": "A-3", "floor": "1st", "min_person": 1, "max_person": 2, "airconditioning": false, "wheel_chair_access": true, "pets_permitted": false, "group_booking_permitted": true},
  {"block": "A", "room_no": "A-4", "floor": "1st", "min_person": 2, "max_person": 4, "airconditioning": false, "wheel_chair_access": true, "pets_permitted": false, "group_booking_permitted": true},
  {"block": "A", "room_no": "A-5", "floor": "1st", "min_person": 2, "max_person": 3, "airconditioning": false, "wheel_chair_access": true, "pets_permitted": false, "group_booking_permitted": true},
  {"block": "A", "room_no": "A-6", "floor": "1st", "min_person": 2, "max_person": 3, "airconditioning": false, "wheel_chair_access": true, "pets_permitted": false, "group_booking_permitted": true},
  {"block": "A", "room_no": "A-7", "floor": "1st", "min_person": 1, "max_person": 2, "airconditioning": false, "wheel_chair_access": true, "pets_permitted": false, "group_booking_permitted": true},
  {"block": "A", "room_no": "A-8", "floor": "1st", "min_person": 1, "max_person": 2, "airconditioning": false, "wheel_chair_access": true, "pets_permitted": false, "group_booking_permitted": true},
  {"block": "A", "room_no": "A-9", "floor": "G", "min_person": 1, "max_person": 2, "airconditioning": false, "wheel_chair_access": true, "pets_permitted": false, "group_booking_permitted": true},
  {"block": "B", "room_no": "B-1", "floor": "G", "min_person": 2, "max_person": 4, "airconditioning": false, "wheel_chair_access": true, "pets_permitted": false, "group_booking_permitted": false},
  {"block": "B", "room_no": "B-2", "floor": "G", "min_person": 2, "max_person": 4, "airconditioning": false, "wheel_chair_access": false, "pets_permitted": false, "group_booking_permitted": false},
  {"block": "B", "room_no": "B-3", "floor": "G", "min_person": 2, "max_person": 4, "airconditioning": false, "wheel_chair_access": false, "pets_permitted": false, "group_booking_permitted": false},
  {"block": "B", "room_no": "B-4", "floor": "G", "min_person": 2, "max_person": 4, "airconditioning": false, "wheel_chair_access": false, "pets_permitted": false, "group_booking_permitted": false},
  {"block": "B", "room_no": "B-5", "floor": "G", "min_person": 2, "max_person": 4, "airconditioning": false, "wheel_chair_access": false, "pets_permitted": false, "group_booking_permitted": false},
  {"block": "B", "room_no": "B-6", "floor": "G", "min_person": 2, "max_person": 4, "airconditioning": false, "wheel_chair_access": false, "pets_permitted": false, "group_booking_permitted": false},
  {"block": "B", "room_no": "B-7", "floor": "G", "min_person": 2, "max_person": 4, "airconditioning": false, "wheel_chair_access": false, "pets_permitted": false, "group_booking_permitted": false},
  {"block": "B", "room_no": "B-8", "floor": "G", "min_person": 2, "max_person": 4, "airconditioning": false, "wheel_chair_access": false, "pets_permitted": false, "group_booking_permitted": false},
  {"block": "B", "room_no": "B-9", "floor": "G", "min_person": 1, "max_person": 2, "airconditioning": false, "wheel_chair_access": false, "pets_permitted": false, "group_booking_permitted": false},
  {"block": "Old C", "room_no": "C-1", "floor": "G", "min_person": 2, "max_person": 3, "airconditioning": true, "wheel_chair_access": false, "pets_permitted": false, "group_booking_permitted": true},
  {"block": "Old C", "room_no": "C-2", "floor": "G", "min_person": 2, "max_person": 3, "airconditioning": true, "wheel_chair_access": false, "pets_permitted": false, "group_booking_permitted": true},
  {"block": "Old C", "room_no": "C-3", "floor": "G", "min_person": 2, "max_person": 3, "airconditioning": true, "wheel_chair_access": false, "pets_permitted": false, "group_booking_permitted": true},
  {"block": "Old C", "room_no": "C-4", "floor": "G", "min_person": 2, "max_person": 3, "airconditioning": true, "wheel_chair_access": false, "pets_permitted": false, "group_booking_permitted": true},
  {"block": "Old C", "room_no": "C-5", "floor": "G", "min_person": 2, "max_person": 3, "airconditioning": true, "wheel_chair_access": false, "pets_permitted": false, "group_booking_permitted": true},
  {"block": "Old C", "room_no": "C-6", "floor": "G", "min_person": 2, "max_person": 3, "airconditioning": true, "wheel_chair_access": false, "pets_permitted": false, "group_booking_permitted": true},
  {"block": "New C", "room_no": "C-7", "floor": "G", "min_person": 2, "max_person": 2, "airconditioning": true, "wheel_chair_access": false, "pets_permitted": true, "group_booking_permitted": true},
  {"block": "New C", "room_no": "C-8", "floor": "G", "min_person": 2, "max_person": 2, "airconditioning": true, "wheel_chair_access": false, "pets_permitted": true, "group_booking_permitted": true},
  {"block": "New C", "room_no": "C-9", "floor": "G", "min_person": 1, "max_person": 2, "airconditioning": true, "wheel_chair_access": false, "pets_permitted": true, "group_booking_permitted": true},
  {"block": "New C", "room_no": "C-10", "floor": "G", "min_person": 1, "max_person": 2, "airconditioning": true, "wheel_chair_access": false, "pets_permitted": true, "group_booking_permitted": true},
  {"block": "D", "room_no": "D-1", "floor": "G", "min_person": 1, "max_person": 2, "airconditioning": true, "wheel_chair_access": true, "pets_permitted": true, "group_booking_permitted": false},
  {"block": "D", "room_no": "D-2", "floor": "G", "min_person": 1, "max_person": 2, "airconditioning": true, "wheel_chair_access": true, "pets_permitted": true, "group_booking_permitted": false},
  {"block": "D", "room_no": "D-3", "floor": "G", "min_person": 2, "max_person": 3, "airconditioning": true, "wheel_chair_access": true, "pets_permitted": true, "group_booking_permitted": false},
  {"block": "D", "room_no": "D-4", "floor": "G", "min_person": 2, "max_person": 3, "airconditioning": true, "wheel_chair_access": true, "pets_permitted": true, "group_booking_permitted": false},
  {"block": "Old E", "room_no": "E-1", "floor": "G", "min_person": 1, "max_person": 2, "airconditioning": true, "wheel_chair_access": false, "pets_permitted": true, "group_booking_permitted": false},
  {"block": "Old E", "room_no": "E-2", "floor": "G", "min_person": 1, "max_person": 2, "airconditioning": true, "wheel_chair_access": false, "pets_permitted": true, "group_booking_permitted": false},
  {"block": "Old E", "room_no": "E-3", "floor": "G", "min_person": 2, "max_person": 3, "airconditioning": true, "wheel_chair_access": false, "pets_permitted": false, "group_booking_permitted": false},
  {"block": "New E", "room_no": "E-4", "floor": "G", "min_person": 2, "max_person": 2, "airconditioning": true, "wheel_chair_access": true, "pets_permitted": false, "group_booking_permitted": false},
  {"block": "New E", "room_no": "E-5", "floor": "G", "min_person": 2, "max_person": 2, "airconditioning": true, "wheel_chair_access": true, "pets_permitted": false, "group_booking_permitted": false},
  {"block": "New E", "room_no": "E-6", "floor": "G", "min_person": 2, "max_person": 2, "airconditioning": true, "wheel_chair_access": true, "pets_permitted": false, "group_booking_permitted": false},
  {"block": "New E", "room_no": "E-7", "floor": "G", "min_person": 2, "max_person": 2, "airconditioning": true, "wheel_chair_access": true, "pets_permitted": false, "group_booking_permitted": false}
];

const tariff = {
  "regular": {
    "member": {"double": 5460, "single_double": 4410, "single_single": 2730, "extra_adult": 2170, "extra_child": 1085},
    "senior": {"double": 4914, "single_double": 3969, "single_single": 2457, "extra_adult": 1953},
    "temp": {"double": 9930, "single_double": 8060, "single_single": 4965, "extra_adult": 3727, "extra_child": 1863.5}
  },
  "special": {
    "member": {"double": 6552, "single_double": 5292, "single_single": 3276, "extra_adult": 2604, "extra_child": 1302},
    "senior": {"double": 5896.8, "single_double": 4762.8, "single_single": 2948.4, "extra_adult": 2343.6},
    "temp": {"double": 11868.8, "single_double": 9648.4, "single_single": 5934.4, "extra_adult": 4448.8, "extra_child": 2224.4}
  },
  "add_ons": {"bbq_per_person": 210, "ac_per_night": 1000, "gst_on_ac": 0.18}
};

const rules = {
  "booking_windows": {"member": 180, "with_temp": 90, "unaccompanied_temp": 60},
  "max_live_bookings": 2,
  "room_limits": {"weekday": 6, "weekend": 3},
  "group": {"min_rooms": 10, "max_rooms": 19, "min_nights": 2, "max_nights": 5, "deposit": 20000, "guest_list_days": 15, "block_caps": {"c": 10, "a": 9}},
  "cancellation": {
    "regular": [{"days": ">7", "cancel": 0.1, "mod": 0}, {"days": "2-7", "cancel": 0.2, "mod": 1000}, {"days": "<2", "cancel": "100% first 2 days", "mod": "cancel"}],
    "special": [{"days": ">30", "cancel": 0.1, "mod": 0}, {"days": "7-30", "cancel": 0.2, "mod": 2000}, {"days": "2-7", "cancel": 0.5, "mod": 3000}, {"days": "<2", "cancel": 1, "mod": "no"}],
    "group_complete": [{"days": ">7", "cancel": 20000, "mod": 0}, {"days": "2-7", "cancel": 0.2, "mod": 5000}, {"days": "<2", "cancel": 0.5, "mod": "no"}],
    "group_partial": [{"days": ">7", "cancel": 0.1, "mod": 0}, {"days": "2-7", "cancel": 0.2, "mod": 1000}, {"days": "<2", "cancel": 1, "mod": "no"}]
  }
};

const restricted_periods = [
  {"start": "2025-10-17", "end": "2025-11-02", "type": "special", "name": "Diwali"},
  {"start": "2025-12-19", "end": "2026-01-04", "type": "special", "name": "Christmas/New Year"},
  {"start": "2025-06-30", "end": "2025-09-14", "type": "closed", "name": "Monsoons"},
  {"start": "2025-09-15", "end": "2025-09-15", "type": "event", "name": "Club Re-Opens"},
  {"start": "2025-03-14", "end": "2025-03-16", "type": "long_weekend", "name": "Holi"},
  {"start": "2025-03-28", "end": "2025-03-31", "type": "long_weekend", "name": "Ramzan Eid"},
  {"start": "2025-04-11", "end": "2025-04-14", "type": "long_weekend", "name": "Dr Ambedkar Jayanti"},
  {"start": "2025-04-18", "end": "2025-04-20", "type": "long_weekend", "name": "Good Friday"},
  {"start": "2025-05-09", "end": "2025-05-12", "type": "long_weekend", "name": "Buddha Purnima"},
  {"start": "2026-01-23", "end": "2026-01-26", "type": "long_weekend", "name": "Republic Day"},
  // BBQ events (Sats mostly)
  {"start": "2025-01-11", "end": "2025-01-11", "type": "event", "name": "Barbeque"},
  {"start": "2025-01-25", "end": "2025-01-25", "type": "event", "name": "Barbeque"},
  {"start": "2025-02-08", "end": "2025-02-08", "type": "event", "name": "Barbeque"},
  {"start": "2025-02-22", "end": "2025-02-22", "type": "event", "name": "Barbeque"},
  {"start": "2025-03-08", "end": "2025-03-08", "type": "event", "name": "Barbeque"},
  {"start": "2025-03-22", "end": "2025-03-22", "type": "event", "name": "Barbeque"},
  {"start": "2025-04-12", "end": "2025-04-12", "type": "event", "name": "Barbeque"},
  {"start": "2025-04-26", "end": "2025-04-26", "type": "event", "name": "Barbeque"},
  {"start": "2025-05-10", "end": "2025-05-10", "type": "event", "name": "Barbeque"},
  {"start": "2025-05-24", "end": "2025-05-24", "type": "event", "name": "Barbeque"},
  {"start": "2025-06-14", "end": "2025-06-14", "type": "event", "name": "Barbeque"},
  {"start": "2025-11-11", "end": "2025-11-11", "type": "event", "name": "Barbeque"},
  {"start": "2025-11-25", "end": "2025-11-25", "type": "event", "name": "Barbeque"},
  // Add more from PDF if needed
  {"start": "2025-05-23", "end": "2025-06-08", "type": "event", "name": "Summer Season"},
  {"start": "2025-06-08", "end": "2025-06-08", "type": "event", "name": "Non-Season Begins"}
];

// Simulation storage
let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
let history = JSON.parse(localStorage.getItem('history') || '[]');

// Generate calendar
function generateCalendar() {
  const container = document.getElementById('calendar-container');
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
      cell.textContent = day;
      const dateStr = current.format('YYYY-MM') + '-' + day.toString().padStart(2, '0');
      const period = restricted_periods.find(p => moment(dateStr).isBetween(p.start, p.end, null, '[]'));
      if (period) cell.classList.add(period.type);
    }
    container.appendChild(table);
    current.add(1, 'month');
  }
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
        free -= b.rooms.filter(r => r.block === block).length;
      }
    });
    results.innerHTML += `<p>${block}: ${free}/${total} free</p>`;
  });
}

// Start booking
function startBooking() {
  const otp = prompt('Enter OTP (test: 1234)');
  if (otp !== '1234') return alert('Invalid OTP');
  const memId = prompt('Member ID (test: 123)');
  if (bookings.filter(b => b.memId === memId).length >= rules.max_live_bookings) return alert('Max bookings reached');
  document.getElementById('booking-wizard').style.display = 'block';
  // Add guest rows
  const guestTable = document.createElement('table');
  guestTable.innerHTML = '<tr><th>Sr No</th><th>Name</th><th>Age</th><th>Meal Pref (V/NV)</th></tr>';
  for (let i = 1; i <= 10; i++) {
    const row = guestTable.insertRow();
    row.innerHTML = `<td>${i}</td><td><input type="text"></td><td><input type="number"></td><td><select><option>V</option><option>NV</option></select></td>`;
  }
  document.getElementById('guest-list').appendChild(guestTable);
}

// Calculate booking
function calculateBooking() {
  const form = document.getElementById('booking-form');
  const start = moment(form['start-date'].value);
  const end = moment(form['end-date'].value);
  const nights = end.diff(start, 'days');
  if (nights < 1) return alert('Invalid dates');
  const numRooms = parseInt(form['num-rooms'].value);
  const isGroup = numRooms >= rules.group.min_rooms;
  if (isGroup && nights < rules.group.min_nights || nights > rules.group.max_nights) return alert('Group booking nights invalid');
  // Check restricted
  let type = 'regular';
  if (restricted_periods.some(p => p.type === 'special' && start.isBefore(p.end) && end.isAfter(p.start))) type = 'special';
  if (restricted_periods.some(p => p.type === 'closed' && start.isBefore(p.end) && end.isAfter(p.start))) return alert('Closed period');
  if (isGroup && restricted_periods.some(p => (p.type === 'special' || p.type === 'long_weekend') && start.isBefore(p.end) && end.isAfter(p.start))) return alert('No groups in special/long weekends');
  // Guests
  const memAdults = parseInt(form['mem-adults'].value || 0);
  const seniors = parseInt(form['seniors'].value || 0);
  const children10 = parseInt(form['children-10'].value || 0);
  const children1121 = parseInt(form['children-11-21'].value || 0);
  const tempAdults = parseInt(form['temp-adults'].value || 0);
  const tempChildren = parseInt(form['temp-children'].value || 0);
  const totalGuests = memAdults + seniors + children10 + children1121 + tempAdults + tempChildren;
  // Filters
  const filters = {
    wheel_chair_access: form['wheelchair'].checked,
    pets_permitted: form['pets'].checked,
    airconditioning: form['ac'].checked,
    single: form['single'].checked ? {min_person: 1, max_person: 2} : null
  };
  // Available rooms
  let availRooms = rooms.filter(r => {
    for (let key in filters) if (filters[key] && !r[key]) return false;
    return true;
  });
  // Simulate availability check
  bookings.forEach(b => {
    if (moment(b.start).isSameOrBefore(end.format('YYYY-MM-DD')) && moment(b.end).isSameOrAfter(start.format('YYYY-MM-DD'))) {
      b.rooms.forEach(br => availRooms = availRooms.filter(ar => ar.room_no !== br.room_no));
    }
  });
  if (availRooms.length < numRooms) return alert('Not enough rooms available');
  // Tariffs
  let total = 0;
  const baseType = form['single'].checked ? (numRooms > 1 ? 'single_double' : 'single_single') : 'double';
  total += numRooms * tariff[type].member[baseType] * nights;
  total += seniors * tariff[type].senior.extra_adult * nights;
  total += (memAdults + tempAdults - numRooms) * tariff[type].member.extra_adult * nights; // Extras
  total += children10 * tariff[type].member.extra_child * nights;
  total += tempChildren * tariff[type].temp.extra_child * nights;
  if (form['ac'].checked) total += numRooms * (tariff.add_ons.ac_per_night + tariff.add_ons.ac_per_night * tariff.add_ons.gst_on_ac) * nights;
  // Summary
  const summary = document.getElementById('booking-summary');
  summary.innerHTML = `<p>Dates: ${start.format('YYYY-MM-DD')} to ${end.format('YYYY-MM-DD')} (${nights} nights)</p>
    <p>Rooms: ${numRooms} (${isGroup ? 'Group' : 'Standard'})</p>
    <p>Guests: ${totalGuests} (Details in form)</p>
    <p>Type: ${type}</p>
    <p>Total: ₹${total.toFixed(2)} (incl. GST)</p>`;
  document.getElementById('confirm-btn').style.display = 'block';
  speak(`Your booking summary: ${nights} nights, ${numRooms} rooms, total ${total} rupees.`);
}

// Confirm booking
function confirmBooking() {
  const form = document.getElementById('booking-form');
  const booking = {
    memId: form['mem-id'].value,
    start: form['start-date'].value,
    end: form['end-date'].value,
    rooms: rooms.slice(0, parseInt(form['num-rooms'].value)), // Simulate assigning first available
    // Add guest details from table, etc.
  };
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  alert('Booking confirmed (simulated)!');
  document.getElementById('booking-wizard').style.display = 'none';
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
window.onload = () => {
  generateCalendar();
  document.getElementById('avail-start').value = moment().format('YYYY-MM-DD');
  document.getElementById('avail-end').value = moment().add(1, 'day').format('YYYY-MM-DD');
  updateAvailability();
};