// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Only run on client side
  if (process.client) {
    console.log('🔐 Auth Middleware Running...');
    console.log('From:', from.path);
    console.log('To:', to.path);
    
    const token = localStorage.getItem('jwt_token');
    const user = localStorage.getItem('user');
    
    console.log('Token exists:', !!token);
    console.log('User exists:', !!user);
    
    // More lenient check - just check if token exists
    const isAuthenticated = !!token;
    
    console.log('Is authenticated:', isAuthenticated);

    // Public routes that don't require authentication
    const publicRoutes = ['/login', '/signup', '/'];
    
    // If trying to access dashboard without auth
    if (to.path === '/dashboard' && !isAuthenticated) {
      console.log('❌ No auth for dashboard, redirecting to login');
      return navigateTo('/login');
    }
    
    // If authenticated and trying to access login/signup
    if (isAuthenticated && (to.path === '/login' || to.path === '/signup')) {
      console.log('✅ Already authenticated, redirecting to dashboard');
      return navigateTo('/dashboard');
    }
    
    console.log('✅ Auth check passed, proceeding to:', to.path);
  } else {
    console.log('🔐 Auth Middleware: Server side, skipping');
  }
});