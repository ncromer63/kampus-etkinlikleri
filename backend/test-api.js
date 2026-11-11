import app from './src/app.js';

const PORT = 3001;

async function runTests() {
  const server = app.listen(PORT, async () => {
    console.log(`Test server running on port ${PORT}...`);
    const baseUrl = `http://localhost:${PORT}`;

    let passed = 0;
    let failed = 0;

    function assert(condition, message) {
      if (condition) {
        console.log(`[PASS] ${message}`);
        passed++;
      } else {
        console.error(`[FAIL] ${message}`);
        failed++;
      }
    }

    try {
      // Test 1: GET /health
      console.log('\n--- 1. GET /health ---');
      const res1 = await fetch(`${baseUrl}/health`);
      assert(res1.status === 200, `Status code is 200 (actual: ${res1.status})`);
      const data1 = await res1.json();
      console.log('Response body:', JSON.stringify(data1, null, 2));
      assert(data1.status === 'ok', `status is 'ok' (actual: ${data1.status})`);
      assert(data1.student === '2416501085', `student is '2416501085' (actual: ${data1.student})`);

      // Test 2: GET /events
      console.log('\n--- 2. GET /events ---');
      const res2 = await fetch(`${baseUrl}/events`);
      assert(res2.status === 200, `Status code is 200 (actual: ${res2.status})`);
      const data2 = await res2.json();
      console.log(`Fetched ${data2.length} events.`);
      assert(Array.isArray(data2), 'Response is an array');
      assert(data2.length === 6, `Initial event count is 6 (actual: ${data2.length})`);

      // Test 3: GET /events/event-2
      console.log('\n--- 3. GET /events/event-2 ---');
      const res3 = await fetch(`${baseUrl}/events/event-2`);
      assert(res3.status === 200, `Status code is 200 (actual: ${res3.status})`);
      const data3 = await res3.json();
      console.log('Response body:', JSON.stringify(data3, null, 2));
      assert(data3.id === 'event-2', `id is 'event-2' (actual: ${data3.id})`);
      assert(data3.title === 'Robotik Atölyesi', `title is 'Robotik Atölyesi' (actual: ${data3.title})`);
      assert(data3.category === 'Atölye', `category is 'Atölye' (actual: ${data3.category})`);

      // Test 4: GET /events/yok
      console.log('\n--- 4. GET /events/yok ---');
      const res4 = await fetch(`${baseUrl}/events/yok`);
      assert(res4.status === 404, `Status code is 404 (actual: ${res4.status})`);
      const data4 = await res4.json();
      console.log('Response body:', JSON.stringify(data4, null, 2));
      assert(data4.error && data4.error.message === 'Event not found', `error message is 'Event not found' (actual: ${data4.error?.message})`);

      // Test 5: POST /events (Tam body)
      console.log('\n--- 5. POST /events (tam body) ---');
      const newEventPayload = {
        title: 'Açık Kaynak Hackathonu',
        category: 'Yarışma',
        date: '2026-11-25',
        time: '09:00',
        location: 'Mühendislik Fakültesi',
        description: '24 saatlik açık kaynak kod maratonu.',
        capacity: 100,
      };
      const res5 = await fetch(`${baseUrl}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEventPayload),
      });
      assert(res5.status === 201, `Status code is 201 (actual: ${res5.status})`);
      const data5 = await res5.json();
      console.log('Response body:', JSON.stringify(data5, null, 2));
      assert(data5.id && data5.id.startsWith('event-'), `Generated ID exists and starts with 'event-' (actual: ${data5.id})`);
      assert(data5.title === newEventPayload.title, `title matches (actual: ${data5.title})`);
      assert(data5.category === newEventPayload.category, `category matches (actual: ${data5.category})`);
      assert(data5.date === newEventPayload.date, `date matches (actual: ${data5.date})`);

      // Test 6: POST /events (Sadece title)
      console.log('\n--- 6. POST /events (sadece title) ---');
      const missingPayload = {
        title: 'Eksik Etkinlik',
      };
      const res6 = await fetch(`${baseUrl}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(missingPayload),
      });
      assert(res6.status === 400, `Status code is 400 (actual: ${res6.status})`);
      const data6 = await res6.json();
      console.log('Response body:', JSON.stringify(data6, null, 2));
      assert(
        data6.error && data6.error.message === 'title, category and date are required',
        `error message is 'title, category and date are required' (actual: ${data6.error?.message})`
      );

      console.log(`\n========================================`);
      console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
      console.log(`========================================\n`);

    } catch (err) {
      console.error('Test execution error:', err);
      failed++;
    } finally {
      server.close(() => {
        console.log('Test server closed.');
        process.exit(failed > 0 ? 1 : 0);
      });
    }
  });
}

runTests();
