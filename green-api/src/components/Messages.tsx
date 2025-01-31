import React from 'react';
import Message from './Message';

function Messages() {
  return (
    <div className='p-4 px-6 bg-gray-100 flex flex-col overflow-y-scroll justify-end items-end gap-2'>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
}

export default Messages;