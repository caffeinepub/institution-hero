import { ReactNode } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { LogIn, Loader2 } from 'lucide-react';

interface SignInGateProps {
  children: ReactNode;
}

export default function SignInGate({ children }: SignInGateProps) {
  const { login, loginStatus, identity, isInitializing } = useInternetIdentity();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  // Show loading state while initializing
  if (isInitializing) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <Loader2 className="h-8 w-8 text-muted-foreground animate-spin mb-4" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // If not authenticated, show sign-in prompt
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 rounded-lg border border-border bg-muted/30">
        <LogIn className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Sign In Required</h3>
        <p className="text-sm text-muted-foreground text-center mb-6 max-w-md">
          Please sign in to view community contributions and access additional features.
        </p>
        <button
          onClick={login}
          disabled={isLoggingIn}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              <LogIn className="h-5 w-5" />
              Sign In
            </>
          )}
        </button>
      </div>
    );
  }

  // If authenticated, render children
  return <>{children}</>;
}
