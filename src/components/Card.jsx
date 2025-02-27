// src/components/Card.jsx
const Card = () => {
    return (
        <div className="w-full max-w-[350px] h-auto rounded-lg overflow-hidden shadow-lg">
            <div className="h-[30vh] bg-gray-300">
                {/* <img src="https://via.placeholder.com/400" alt="Artwork" className="w-full h-full object-cover" /> */}
            </div>
            <div className="p-4 bg-gray-100">
                <div className="flex flex-col mb-4">
                    <h1 className="text-xl font-medium">Iron Throne</h1>
                    <p className="font-bold text-lg">$400</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <p>Artist</p>
                    </div>
                    <div className="text-gray-600 bg-gray-200 rounded-full px-5 py-2">
                        Paint
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;