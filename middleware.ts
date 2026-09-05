import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 1. Check if the user is trying to access ANY page inside /admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    
    // 2. Look for the browser's built-in authorization header
    const basicAuth = req.headers.get('authorization');

    // 3. Grab your secret credentials from the .env file
    const user = process.env.ADMIN_USERNAME;
    const pwd = process.env.ADMIN_PASSWORD;

    if (basicAuth) {
      // Decode the credentials the user typed into the popup
      const authValue = basicAuth.split(' ')[1];
      const [providedUser, providedPwd] = atob(authValue).split(':');

      // 4. If they match, let them into the dashboard!
      if (providedUser === user && providedPwd === pwd) {
        return NextResponse.next();
      }
    }

    // 5. If they don't match (or haven't typed anything yet), block them and show the popup
    return new NextResponse('Unauthorized access', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }
  
  // Let everyone access the normal food website normally
  return NextResponse.next();
}

// Tell Next.js to only run this check on admin routes to keep the main site blazing fast
export const config = {
  matcher: ['/admin/:path*'],
};