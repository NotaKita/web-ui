import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'https://api-dev.notakita.web.id/auth/logout',
        {},
        { withCredentials: true }
      );
      navigate('/');
    } catch (err) {
      // Optionally handle error
      navigate('/');
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <Button className="mt-4" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;