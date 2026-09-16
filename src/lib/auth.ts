import { cookies } from 'next/headers';

export const ADMIN_COOKIE_NAME = 'karmayogi_admin_session';
export const ADMIN_SECRET_TOKEN = 'karmayogi_authenticated_session_token_2026';

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_COOKIE_NAME);
    return session?.value === ADMIN_SECRET_TOKEN;
  } catch {
    return false;
  }
}
