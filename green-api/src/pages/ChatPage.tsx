import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';

function ChatPage() {
  return (
    <div className='grid grid-cols-[1fr_4fr] h-[calc(100vh-80px)]'>
      <ChatList />
      {/* <ChatWindow /> */}
    </div>
  );
}

export default ChatPage;