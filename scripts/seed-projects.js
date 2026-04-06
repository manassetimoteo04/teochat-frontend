/* eslint-disable no-console */
import { randomUUID } from "crypto";

const args = process.argv.slice(2);
const getArg = (key, fallback) => {
  const idx = args.indexOf(key);
  if (idx === -1) return fallback;
  return args[idx + 1] ?? fallback;
};

const teamId = getArg("--team", "");
const count = Number(getArg("--count", "30"));
const baseUrl =
  getArg("--base", "") ||
  process.env.API_BASE_URL ||
  "http://localhost:5000/api/v1";
const token = getArg("--token", "") || process.env.TOKEN || "";

if (!teamId) {
  console.error(
    "Missing team id. Usage: node scripts/seed-projects.js --team <id> [--count 30] [--token <jwt>] [--base http://localhost:5000/api/v1]",
  );
  process.exit(1);
}

const statuses = ["active", "pending", "finished", "canceled"];
const themes = [
  "Website Redesign",
  "Mobile App",
  "CRM Migration",
  "Analytics Revamp",
  "Brand Refresh",
  "Support Hub",
  "Growth Experiments",
  "Internal Tools",
  "Payments Upgrade",
  "Community Launch",
];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomDateBetween(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function buildProject() {
  const now = new Date();
  const createdAt = randomDateBetween(
    new Date(now.getFullYear(), now.getMonth() - 2, 1),
    new Date(now.getFullYear(), now.getMonth(), now.getDate()),
  );
  const endDate = new Date(createdAt.getTime() + (7 + Math.floor(Math.random() * 60)) * 86400000);
  return {
    name: `${pick(themes)} #${Math.floor(Math.random() * 200)}`,
    description: `Projeto auto-gerado ${randomUUID().slice(0, 8)}`,
    teamId,
    status: pick(statuses),
    createdAt: createdAt.toISOString(),
    endDate: endDate.toISOString(),
  };
}

async function main() {
  const url = `${baseUrl}/projects`;
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  let created = 0;
  for (let i = 0; i < count; i += 1) {
    const payload = buildProject();
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Failed", res.status, text);
      process.exit(1);
    }
    created += 1;
    if (created % 10 === 0) console.log(`Created ${created}/${count}`);
  }
  console.log(`Done. Created ${created} projects.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
