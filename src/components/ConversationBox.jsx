function ConversationBox({ conv }) {
  return (
    <div className="grid items-center py-4 gap-4 grid-cols-[6rem_1fr]">
      <div className="w-[6rem] h-[6rem] rounded-full overflow-hidden">
        <img src={conv.img} alt="" />
      </div>
      <div>
        <div className="flex justify-between items-center">
          <p className="font-[600]">{conv.name}</p>
          <span className="text-gray-500 text-[1.4rem]">{conv.time}</span>
        </div>
        <div>
          <span>{conv.message}</span>
        </div>
      </div>
    </div>
  );
}

export default ConversationBox;
