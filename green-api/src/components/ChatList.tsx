import React from 'react';
import useChatStore from '../store/chatStore';
import ChatItem from './ChatItem';

function ChatList() {
  const chats = useChatStore((state) => state.chats);

  return (
    <div>
      {chats.map((chat) => <ChatItem key={chat} chat={chat} />)}
    </div>
  );
}

export default ChatList;