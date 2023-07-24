'user client';

import { Crisp } from 'crisp-sdk-web';
import { useEffect } from 'react';

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('96f11bfa-654a-4059-9bee-06901925be84');
  }, []);

  return null;
};

export default CrispChat;
