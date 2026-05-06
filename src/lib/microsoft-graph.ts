import { clerkClient } from '@clerk/nextjs/server';

export type MicrosoftGraphProfile = {
  id: string;
  displayName: string | null;
  givenName: string | null;
  surname: string | null;
  userPrincipalName: string | null;
  mail: string | null;
  jobTitle: string | null;
  officeLocation: string | null;
  mobilePhone: string | null;
  businessPhones: string[];
};

export class MicrosoftGraphError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'MicrosoftGraphError';
  }
}

async function getMicrosoftAccessToken(userId: string): Promise<string> {
  const client = await clerkClient();
  const response = await client.users.getUserOauthAccessToken(userId, 'microsoft');
  const token = response.data[0]?.token;

  if (!token) {
    throw new MicrosoftGraphError(
      'No Microsoft OAuth token is available for this Clerk user. Sign in with Microsoft and ensure the Clerk Microsoft connection requests Microsoft Graph delegated scopes.',
      404,
    );
  }

  return token;
}

export async function getMicrosoftGraphProfile(userId: string): Promise<MicrosoftGraphProfile> {
  const token = await getMicrosoftAccessToken(userId);
  const response = await fetch('https://graph.microsoft.com/v1.0/me', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const details = await response.text();
    throw new MicrosoftGraphError(
      `Microsoft Graph /me failed with ${response.status}: ${details}`,
      response.status,
    );
  }

  return response.json() as Promise<MicrosoftGraphProfile>;
}

