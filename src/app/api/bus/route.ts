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
  try {
    const entries = parseBusFile();
    return NextResponse.json(entries);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
