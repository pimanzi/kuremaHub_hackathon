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
          <img src="/images/logoHub.png" alt="logo" className="w-full" />
        </div>
        <button
          onClick={() => {
            navigate('/account');
          }}
          className="flex items-center gap-2 bg-primary text-neutral-white px-8 py-3 rounded-full hover:bg-accent transition-colors"
        >
          {' '}
          <GoPlus />
          <p className="text-white">Create Art</p>
        </button>
      </nav>

      <SearchComp></SearchComp>
    </section>
  );
}
