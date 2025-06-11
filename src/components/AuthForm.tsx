import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/app/router/routePaths';

interface Props {
    mode: 'login' | 'register';
}

const AuthForm = ({ mode }: Props) => {
    const [email, setEmail] = useState('demo@mail.com');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        console.log('Submitting form:', { email, password });
        try {
            const url =
                mode === 'login'
                    ? 'https://api-dev.notakita.web.id/auth/login'
                    : 'https://api-dev.notakita.web.id/auth/register';

            const res = await axios.post(
                url,
                { email, password },
                { withCredentials: true }
            );
            console.log(`${mode === 'login' ? 'Login' : 'Register'} success:`, res.data);

            navigate(ROUTE_PATHS.HOME);
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError(err.message || 'An unexpected error occurred');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button className="w-full" type="submit">
                {mode === 'login' ? 'Login' : 'Register'}
            </Button>
        </form>
    );
};

export default AuthForm;
