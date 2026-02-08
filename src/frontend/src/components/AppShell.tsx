import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';

export default function AppShell() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';
  const authText = loginStatus === 'logging-in' ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const navLinks = [
    { path: '/', label: 'Overview' },
    { path: '/bio', label: 'Bio' },
    { path: '/learning-outcomes', label: 'Learning Outcomes' },
    { path: '/takeaways', label: 'Takeaways' },
    { path: '/activities', label: 'Activities' },
    { path: '/slides', label: 'Slides' },
    { path: '/references', label: 'References' },
    { path: '/movie-references', label: 'Movie References' },
    { path: '/leadership-board', label: 'Leadership Board' },
  ];

  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Title */}
            <button
              onClick={() => navigate({ to: '/' })}
              className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            >
              Leadership & Resilience
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate({ to: link.path })}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    currentPath === link.path ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Auth Button (Desktop) */}
            <div className="hidden lg:block">
              <button
                onClick={handleAuth}
                disabled={disabled}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isAuthenticated
                    ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {authText}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      navigate({ to: link.path });
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPath === link.path
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="mt-2 px-4">
                  <button
                    onClick={handleAuth}
                    disabled={disabled}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isAuthenticated
                        ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {authText}
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Decorative Moat & Trees Footer Banner */}
      <div className="w-full overflow-hidden">
        <img
          src="/assets/generated/moat-trees-footer-banner.dim_1600x300.png"
          alt=""
          className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover object-center"
          aria-hidden="true"
        />
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-1.5">
              © 2026. Built with <Heart className="h-4 w-4 text-destructive fill-destructive" /> using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
