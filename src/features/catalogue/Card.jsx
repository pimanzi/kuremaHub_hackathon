const Card = ({ art }) => {
  return (
    <div className="w-full lg:max-w-[450px] min-w-[200px] h-auto rounded-lg overflow-hidden shadow-lg relative group">
      <div className="h-[50vh] bg-gray-300 relative">
        <img
          src={art.image}
          alt="Artwork"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 ease-in-out"></div>
      </div>

      <div className="absolute bottom-0 left-0 w-full transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 p-4 bg-gray-100 bg-opacity-95 z-10">
        <div className="flex flex-col mb-4">
          <h1 className="text-xl font-medium">{art.name}</h1>
          <p className="font-bold text-lg">{art.price} RWF</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <p>Artist</p>
          </div>
          <div className="text-gray-600 bg-gray-200 rounded-full px-5 py-2">
            {art.category}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
