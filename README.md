# Operation: Offline — Full Stack

A festive, interactive Raksha Bandhan mini-site with an Express backend.

### Included
- Rich maroon / saffron / rose / gold visual design (no generic blue minimalist UI)
- Mobile-first interactive experience
- 10-question Who WOULD? quiz
- Answers saved server-side
- Deterministic personalized compatibility score
- Persistent anonymous session ID
- Delivery countdown
- Easter egg
- Admin results page

### Run
1. Install Node.js 18+
2. `npm install`
3. `npm start`
4. Open `http://localhost:3000`

### Admin
Open `http://localhost:3000/admin.html`.
Set `ADMIN_KEY` in your environment. For local testing, `rakhi-admin` also works.

### Customize
Edit `CONFIG` near the bottom of `public/index.html`:
- sisterName
- yourName
- meetingDate
- personalMessage

### Production note
The included JSON store is intentionally simple for a personal project. On a multi-instance production host, replace it with a hosted database.
