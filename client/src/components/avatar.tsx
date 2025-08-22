function Avatar() {
  const defaultImage = "/vite.svg";
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-2 pt-4 pb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-red-200">
          <img
            src={defaultImage}
            alt="Image"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-2xl font-sans font-semibold capitalize text-white">
          Expanse User
        </span>
      </div>
    </>
  );
}

export default Avatar;
