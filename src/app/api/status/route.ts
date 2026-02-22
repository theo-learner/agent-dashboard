import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const AGENTS = ['main', 'attendant', 'po', 'pm', 'dev', 'qa', 'marketing', 'ux', 'hr', 'analyst', 'designer'];

interface BusEntry {
  ts: string;
  from: string;
  to: string;
  type: string;
  text: string;
}

function getBusPath(): string | null {
  if (process.env.BUS_FILE_PATH) return process.env.BUS_FILE_PATH;

  const enableSample = process.env.ENABLE_SAMPLE_DATA === 'true';
  if (enableSample) return path.join(process.cwd(), 'public/data/bus-sample.jsonl');

  return null;
}

function parseBusFile(busPath: string): BusEntry[] {
  try {
    const content = fs.readFileSync(busPath, 'utf-8');
    return content
      .trim()
      .split('\n')
      .filter(Boolean)
      .map(l => JSON.parse(l));
  } catch {
    return [];
  }
}

function normalizeAgent(from: string): string {
  const lower = from.toLowerCase();
  // Handle subagent patterns like "dev-subagent", "agent:qa:subagent:..."
  for (const agent of AGENTS) {
    if (lower.startsWith(agent) || lower.includes(`:${agent}:`)) return agent;
  }
  return lower;
}

export async function GET() {
  try {
    const busPath = getBusPath();
    if (!busPath) {
      return NextResponse.json(
        { error: 'BUS_FILE_PATH not configured (set BUS_FILE_PATH or ENABLE_SAMPLE_DATA=true)' },
        { status: 503 }
      );
    }

    const entries = parseBusFile(busPath);
    const now = Date.now();

  const statusMap: Record<string, { status: string; lastActivity: string; confidence: number; lastMessage: string; counts: Record<string, number> }> = {};

  for (const agent of AGENTS) {
    const agentEntries = entries.filter(e => normalizeAgent(e.from) === agent);
    const last = agentEntries[agentEntries.length - 1];
    const lastTs = last ? new Date(last.ts).getTime() : 0;
    const diffMin = last ? (now - lastTs) / 60000 : Infinity;

    const doneCount = agentEntries.filter(e => e.type === 'done' || e.type === 'status').length;
    const errorCount = agentEntries.filter(e => e.type === 'error').length;
    const total = doneCount + errorCount;
    const confidence = total > 0 ? Math.round((doneCount / total) * 100) : 100;

    let status = 'red';
    if (diffMin <= 60) status = 'green';
    else if (diffMin <= 360) status = 'yellow';
    if (agentEntries.some(e => e.type === 'error') && agentEntries[agentEntries.length - 1]?.type === 'error') {
      status = 'red';
    }

    const counts: Record<string, number> = {};
    for (const e of agentEntries) {
      counts[e.type] = (counts[e.type] || 0) + 1;
    }

    statusMap[agent] = {
      status,
      lastActivity: last?.ts || '',
      confidence,
      lastMessage: last?.text || '',
      counts,
    };
  }

  return NextResponse.json(statusMap);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
