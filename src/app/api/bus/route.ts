import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

interface BusEntry {
  ts: string;
  from: string;
  to: string;
  type: string;
  text: string;
}

function parseBusFile(): BusEntry[] {
  // Try local file first, then fallback to bundled sample
  const busPath = process.env.BUS_FILE_PATH || path.join(process.cwd(), 'public/data/bus-sample.jsonl');
  
  try {
    const content = fs.readFileSync(busPath, 'utf-8');
    const lines = content.trim().split('\n').filter(Boolean);
    return lines.map(line => JSON.parse(line) as BusEntry);
  } catch {
    return [];
  }
}

export async function GET() {
  const entries = parseBusFile();
  
  // Filter last 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recent = entries.filter(e => new Date(e.ts) >= sevenDaysAgo);
  
  return NextResponse.json(recent);
}
