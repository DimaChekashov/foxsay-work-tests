import React from 'react';

type ChatItemProps = {
  chat: number;
}

function ChatItem({ chat }: ChatItemProps) {
  return (
    <div>ChatItem {chat}</div>
  );
}

export default ChatItem;