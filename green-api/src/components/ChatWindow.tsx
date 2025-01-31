import ChatPanel from './ChatPanel';
import Messages from './Messages';

function ChatWindow() {
  return (
    <div className='grid grid-rows-[1fr_auto]'>
      <Messages />
      <ChatPanel />
    </div>
  );
}

export default ChatWindow;