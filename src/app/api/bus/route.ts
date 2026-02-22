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

function getBusPath(): string | null {
  if (process.env.BUS_FILE_PATH) return process.env.BUS_FILE_PATH;

  const enableSample = process.env.ENABLE_SAMPLE_DATA === 'true';
  if (enableSample) return path.join(process.cwd(), 'public/data/bus-sample.jsonl');

  return null;
}

function parseBusFile(busPath: string): BusEntry[] {
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
    const busPath = getBusPath();
    if (!busPath) {
      return NextResponse.json(
        { error: 'BUS_FILE_PATH not configured (set BUS_FILE_PATH or ENABLE_SAMPLE_DATA=true)' },
        { status: 503 }
      );
    }

    const entries = parseBusFile(busPath);
    return NextResponse.json(entries);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
