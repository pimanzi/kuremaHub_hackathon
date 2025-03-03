import { useNavigate } from 'react-router-dom';
import { useAuthUsers } from '../Authentication/useAuthUsers';

const Card = ({ art, id, users }) => {
  const user = users.filter((user) => user.id === art.userId);
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/art/${id}`);
      }}
      className="w-full lg:max-w-[450px] min-w-[200px] h-auto rounded-lg overflow-hidden shadow-lg relative group"
    >
      <div className="h-[50vh] bg-gray-300 relative">
        <img
          src={art.image}
          alt="Artwork"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 ease-in-out"></div>
      </div>

      <div className="absolute bottom-0 left-0 w-full transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 p-4 bg-gray-100/60 bg-opacity-95 z-10 rounded-tl-xl rounded-tr-xl">
        <div className="flex flex-col mb-4">
          <h1 className="text-xl font-medium">{art.name}</h1>
          <p className="font-bold text-lg">{art.price} RWF</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full">
              <img
                src={user[0].avatar || '/images/default-user.jpg'}
                alt="Artwork"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <p>{user[0].firstName + ' ' + user[0].lastName}</p>
          </div>
          <div className="text-gray-600 bg-gray-200/70 rounded-full px-4 py-1">
            {art.category}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
