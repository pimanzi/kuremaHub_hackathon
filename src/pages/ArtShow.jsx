import { GoPlus } from 'react-icons/go';
import ArtPage from '@/features/arts/ArtPage';
import { useNavigate } from 'react-router-dom';

export default function ArtShow() {
  const navigate = useNavigate();
  return (
    <section className="px-10 py-7">
      <nav className="flex justify-between items-center mb-8">
        <h1
          onClick={() => {
            navigate('/catalogue');
          }}
          className="text-2xl font-bold hover:cursor-pointer"
        >
          KuremaHub
        </h1>
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

      <ArtPage></ArtPage>
    </section>
  );
}
