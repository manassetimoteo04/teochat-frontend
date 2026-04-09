/* eslint-disable no-console */
import { randomUUID } from "crypto";

const args = process.argv.slice(2);
const getArg = (key, fallback) => {
  const idx = args.indexOf(key);
  if (idx === -1) return fallback;
  return args[idx + 1] ?? fallback;
};

const projectId = getArg("--project", "");
const count = Number(getArg("--count", "50"));
const baseUrl =
  getArg("--base", "") ||
  process.env.API_BASE_URL ||
  "http://localhost:5000/api/v1";
const token = getArg("--token", "") || process.env.TOKEN || "";

if (!projectId) {
  console.error(
    "Missing project id. Usage: node scripts/seed-tasks.js --project <id> [--count 50] [--token <jwt>] [--base http://localhost:5000/api/v1]",
  );
  process.exit(1);
}

const priorities = ["low", "medium", "high"];
const statuses = ["todo", "in_progress", "done"];
const topics = [
  "Wireframes",
  "API Integration",
  "Design Review",
  "Backend Fixes",
  "QA Pass",
  "Analytics Setup",
  "Deploy Prep",
  "Docs",
  "User Testing",
  "Polish",
];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomDateBetween(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function buildTask() {
  const now = new Date();
  const start = randomDateBetween(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10),
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 20),
  );
  const dueDate = new Date(start.getTime() + (1 + Math.floor(Math.random() * 14)) * 86400000);
  return {
    title: `${pick(topics)} #${Math.floor(Math.random() * 200)}`,
    description: `Tarefa auto-gerada ${randomUUID().slice(0, 8)}`,
    priority: pick(priorities),
    status: pick(statuses),
    dueDate: dueDate.toISOString(),
  };
}

async function main() {
  const url = `${baseUrl}/tasks/${projectId}`;
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  let created = 0;
  for (let i = 0; i < count; i += 1) {
    const payload = buildTask();
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
  console.log(`Done. Created ${created} tasks.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
