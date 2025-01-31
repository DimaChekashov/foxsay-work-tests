import React from 'react';

type ChatItemProps = {
  chat: number;
}

function ChatItem({ chat }: ChatItemProps) {
  return (
    <div className='bg-gray-200 inline-block p-3 py-5 text-black border-b border-gray-300 cursor-pointer hover:bg-gray-300'>ChatItem {chat}</div>
  );
}

export default ChatItem;