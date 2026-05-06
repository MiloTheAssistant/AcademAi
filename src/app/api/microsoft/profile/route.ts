import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import {
  getMicrosoftGraphProfile,
  MicrosoftGraphError,
} from '@/lib/microsoft-graph';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const profile = await getMicrosoftGraphProfile(userId);
    return NextResponse.json({ profile });
  } catch (err) {
    if (err instanceof MicrosoftGraphError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }

    console.error('Microsoft Graph profile error:', err);
    return NextResponse.json(
      { error: 'Unable to load Microsoft Graph profile.' },
      { status: 500 },
    );
  }
}

