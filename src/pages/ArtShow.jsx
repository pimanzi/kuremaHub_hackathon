import { GoPlus } from 'react-icons/go';
import ArtPage from '@/features/arts/ArtPage';

export default function ArtShow() {
  return (
    <section className="px-10 py-7">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">KuremaHub</h1>
        <div className="flex items-center gap-2 bg-gray-300 py-2 px-5 rounded-full cursor-pointer">
          <GoPlus />
          <p>Create Art</p>
        </div>
      </nav>

      <ArtPage></ArtPage>
    </section>
  );
}
