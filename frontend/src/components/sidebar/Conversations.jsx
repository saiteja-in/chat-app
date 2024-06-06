import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'

const Conversations = () => {
  const{loading,conversation}=useGetConversations();
  console.log("conversations = ",conversation)
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversation.map((convo,idx)=>(
        <Conversation 
        key={convo._id}
        conversation={convo}
        lastIdx={idx===conversation.length-1}
        />
      ))}
      {loading ? <span className='loading loading-spinner mx-auto'></span>:null}
    </div>
  )
}

export default Conversations
