import React from 'react';
import useChatStore from '../store/chatStore';
import ChatItem from './ChatItem';

function ChatList() {
  const chats = useChatStore((state) => state.chats);

  return (
    <div className='flex flex-col bg-gray-200 border-r border-gray-300'>
      {chats.map((chat) => <ChatItem key={chat} chat={chat} />)}
    </div>
  );
}

export default ChatList;