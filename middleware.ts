import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [
    '/',
    '/events/:id',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing'
  ],
  ignoredRoutes: [
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing'
  ]
});

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Ajuster les attributs SameSite pour un cookie spécifique de Clerk
  const cookie = req.cookies.get('__clerk_db_jwt');
  if (cookie) {
    res.cookies.set('__clerk_db_jwt', cookie.value, { // Utilisez cookie.value pour obtenir la chaîne
      sameSite: 'none',
      secure: true,
    });
  }

  return res;
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
