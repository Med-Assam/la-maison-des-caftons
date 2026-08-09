import { NextResponse } from 'next/server';
import caftans from '../../../../data/caftans.json';

export async function GET() {
  return NextResponse.json(caftans);
}
