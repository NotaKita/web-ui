import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AuthForm from '@/components/AuthForm';

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AuthForm mode={mode} />
          <div className="mt-4 text-center">
            {mode === 'login' ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Don't have an account?
                </span>
                <Button
                  variant="link"
                  className="text-sm"
                  onClick={() => setMode('register')}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <span className="text-sm text-muted-foreground">
                  Already have an account?
                </span>
                <Button
                  variant="link"
                  className="text-sm"
                  onClick={() => setMode('login')}
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
