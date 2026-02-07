import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, LogIn, LogOut, Heart } from 'lucide-react';
import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { proposalContent } from '../content/proposalContent';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const navigate = useNavigate();

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const navLinks = [
    { to: '/', label: 'Overview' },
    { to: '/bio', label: 'Bio' },
    { to: '/learning-outcomes', label: 'Learning Outcomes' },
    { to: '/takeaways', label: 'Takeaways' },
    { to: '/activities', label: 'Activities' },
    { to: '/references', label: 'References' },
    { to: '/movie-references', label: 'Movie References' },
  ];

  const handleAuthAction = () => {
    if (isAuthenticated) {
      clear();
      navigate({ to: '/' });
    } else {
      login();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Title */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src="/assets/generated/institution-hero-logo.dim_512x512.png"
                alt="Institution Hero Logo"
                className="h-10 w-10"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground tracking-tight">
                  {proposalContent.title}
                </span>
                <span className="text-xs text-muted-foreground hidden sm:block">
                  Next Generation Student Leaders
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  activeProps={{
                    className: 'text-foreground font-semibold',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleAuthAction}
                disabled={isLoggingIn}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? (
                  'Signing in...'
                ) : isAuthenticated ? (
                  <>
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border/40">
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    activeProps={{
                      className: 'text-foreground bg-accent font-semibold',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleAuthAction();
                    setMobileMenuOpen(false);
                  }}
                  disabled={isLoggingIn}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:bg-accent rounded-md transition-colors disabled:opacity-50"
                >
                  {isLoggingIn ? (
                    'Signing in...'
                  ) : isAuthenticated ? (
                    <>
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </>
                  )}
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-1">
              © 2026. Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-center sm:text-right">
              {proposalContent.author} • {proposalContent.organization}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
