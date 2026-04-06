/* eslint-disable no-console */
import { randomUUID } from "crypto";

const args = process.argv.slice(2);
const getArg = (key, fallback) => {
  const idx = args.indexOf(key);
  if (idx === -1) return fallback;
  return args[idx + 1] ?? fallback;
};

const companyId = getArg("--company", "");
const teamId = getArg("--team", "");
const count = Number(getArg("--count", "50"));
const baseUrl =
  getArg("--base", "") ||
  process.env.API_BASE_URL ||
  "http://localhost:5000/api/v1";
const token = getArg("--token", "") || process.env.TOKEN || "";

if (!companyId || !teamId) {
  console.error(
    "Missing ids. Usage: node scripts/seed-events.js --company <id> --team <id> [--count 50] [--token <jwt>] [--base http://localhost:5000/api/v1]",
  );
  process.exit(1);
}

const statuses = ["pending", "active", "finished", "canceled"];
const types = ["video-call", "presential"];
const topics = [
  "Sprint Planning",
  "Revisao de KPIs",
  "Onboarding",
  "Roadmap",
  "Design Review",
  "Retro",
  "All Hands",
  "Workshop",
  "Parcerias",
  "Reuniao com Cliente",
];
const locations = [
  "Sala A",
  "Sala B",
  "Auditório",
  "Sala Criativa",
  "Coworking",
];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomDateBetween(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function buildEvent() {
  const now = new Date();
  const start = randomDateBetween(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
    new Date(now.getFullYear(), now.getMonth() + 2, 0),
  );
  start.setMinutes(0, 0, 0);
  start.setHours(8 + Math.floor(Math.random() * 9));
  const end = new Date(start.getTime() + (30 + Math.floor(Math.random() * 5) * 15) * 60000);

  const type = pick(types);
  const title = `${pick(topics)} #${Math.floor(Math.random() * 200)}`;

  return {
    teamId,
    title,
    description: `Evento auto-gerado ${randomUUID().slice(0, 8)}`,
    date: start.toISOString().split("T")[0],
    startTime: start.toISOString(),
    endTime: end.toISOString(),
    type,
    location: type === "presential" ? pick(locations) : "",
    status: pick(statuses),
  };
}

async function main() {
  const url = `${baseUrl}/events/${companyId}`;
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  let created = 0;
  for (let i = 0; i < count; i += 1) {
    let attempts = 0;
    let success = false;
    while (!success && attempts < 10) {
      attempts += 1;
      const payload = buildEvent();
      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        success = true;
        created += 1;
        if (created % 10 === 0) console.log(`Created ${created}/${count}`);
      } else {
        const text = await res.text();
        if (res.status === 409) continue;
        console.error("Failed", res.status, text);
        process.exit(1);
      }
    }
    if (!success) {
      console.error("Failed after multiple attempts due to collisions.");
      process.exit(1);
    }
  }
  console.log(`Done. Created ${created} events.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
