import { useState, useRef, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const { loading, sendMessage } = useSendMessage();
	const emojiPickerRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

	const handleEmojiClick = (emojiData) => {
		setMessage(prev => prev + emojiData.emoji);
	};

	const toggleEmojiPicker = () => {
		setShowEmojiPicker(prev => !prev);
	};

	// Close emoji picker when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
				setShowEmojiPicker(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5 pr-20 bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<div className='absolute inset-y-0 end-0 flex items-center pe-3 gap-2'>
					<button 
						type='button' 
						onClick={toggleEmojiPicker}
						className='text-gray-400 hover:text-white transition-colors'
					>
						<BsEmojiSmile size={20} />
					</button>
					<button type='submit' className='text-gray-400 hover:text-white transition-colors'>
						{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
					</button>
				</div>
				
				{/* Emoji Picker */}
				{showEmojiPicker && (
					<div 
						ref={emojiPickerRef}
						className='absolute bottom-full mb-2 right-0 z-50'
					>
						<EmojiPicker
							onEmojiClick={handleEmojiClick}
							theme="dark"
							width={300}
							height={400}
							previewConfig={{
								showPreview: false
							}}
						/>
					</div>
				)}
			</div>
		</form>
	);
};
export default MessageInput;