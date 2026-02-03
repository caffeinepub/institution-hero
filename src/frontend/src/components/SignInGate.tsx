import { ReactNode } from 'react';
import { LogIn, AlertCircle } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

interface SignInGateProps {
  children: ReactNode;
}

export default function SignInGate({ children }: SignInGateProps) {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  if (!isAuthenticated) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Sign In Required</h3>
        <p className="text-muted-foreground mb-4">
          Please sign in to submit your response and view community contributions.
        </p>
        <button
          onClick={login}
          disabled={isLoggingIn}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogIn className="h-4 w-4" />
          {isLoggingIn ? 'Signing in...' : 'Sign In to Continue'}
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
