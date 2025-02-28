import { GoPlus } from 'react-icons/go';
import SearchComp from '../features/catalogue/SearchComp';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const navigate = useNavigate();
  return (
    <section className="px-10 py-7">
      <nav className="flex justify-between items-center mb-8">
        <div
          className="w-40"
          onClick={() => {
            navigate('/home');
          }}
        >
          <img
            src="../public/images/logoHub.png"
            alt="logo"
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2 bg-gray-300 py-2 px-5 rounded-full cursor-pointer">
          <GoPlus />
          <p>Create Art</p>
        </div>
      </nav>

      <SearchComp></SearchComp>
    </section>
  );
}
