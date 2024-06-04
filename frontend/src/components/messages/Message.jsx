import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img 
                alt="tailwind"
                src={"https://static.vecteezy.com/system/resources/previews/004/819/327/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"}
                />

            </div>

        </div>
        <div className={"chat-bubble text-white bg-blue-500 "}>Hi whats up</div>
        <div className='chat-footer opacity-45 text-xs flex gap-1 items-center'>12:67</div>
    </div>
  )
}

export default Message;

