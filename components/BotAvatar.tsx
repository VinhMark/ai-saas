import { Avatar, AvatarImage } from './ui/Avatar';

const BotAvatar = () => {
  return (
    <Avatar className='w-8 h-8'>
      <AvatarImage className='p-1' src='/logo.png' />
    </Avatar>
  );
};

export default BotAvatar;
