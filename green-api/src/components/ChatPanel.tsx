import React from 'react';

function ChatPanel() {
  return (
    <div className='flex gap-6 p-4 bg-gray-200'>
      <input type="text" placeholder='Напишите сообщение' className='flex-1 px-4 py-2 rounded outline-none bg-white' />
      <button type="submit" className='bg-lime-600 hover:bg-lime-700 transition text-white px-4 py-2 rounded cursor-pointer'>Отправить</button>
    </div>
  );
}

export default ChatPanel;