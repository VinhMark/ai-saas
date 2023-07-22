import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div>
      Landing page (Unprotected)
      <div className=''>
        <Link href='/sign-in'>
          <Button>Login</Button>
        </Link>
        <Link href='/sign-up'>
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
