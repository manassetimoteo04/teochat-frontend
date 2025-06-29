function UserSmallImg({ url, alt }) {
  return (
    <div className="sm:w-[4rem] sm:h-[4rem] w-[4rem] h-[4rem] rounded-full overflow-hidden">
      <img src={url} alt={alt} />
    </div>
  );
}

export default UserSmallImg;
