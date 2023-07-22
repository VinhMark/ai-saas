import Heading from '@/components/Heading';
import { Settings } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div>
      <Heading
        title='Settings'
        description='Mange account settings.'
        icon={Settings}
        iconColor='text-gray-700'
        bgColor='text-gray-700/10'
      />
    </div>
  );
};

export default SettingsPage;
