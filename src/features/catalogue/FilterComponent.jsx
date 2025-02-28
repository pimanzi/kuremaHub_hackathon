import { useSearchParams } from 'react-router-dom';

export default function FilterComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick(value) {
    searchParams.set('category', value);
    setSearchParams(searchParams);
  }
  const choosenCategory = searchParams.get('category') || 'all';

  const getButtonClass = (category) => {
    return `px-5 py-2 rounded-full cursor-pointer transition-all duration-300 ${
      choosenCategory === category
        ? 'bg-[#2C3E50] text-[#FFFFFF] shadow-lg'
        : 'bg-[#E9ECEF] text-[#2C3E50] hover:bg-[#495057] hover:text-[#FFFFFF]'
    }`;
  };

  return (
    <div className="flex flex-wrap gap-2">
      <div onClick={() => handleClick('all')} className={getButtonClass('all')}>
        All
      </div>
      <div
        onClick={() => handleClick('painting')}
        className={getButtonClass('painting')}
      >
        Paints
      </div>
      <div
        onClick={() => handleClick('photography')}
        className={getButtonClass('photography')}
      >
        Photography
      </div>
      <div
        onClick={() => handleClick('sculpture')}
        className={getButtonClass('sculpture')}
      >
        Sculptures
      </div>
      <div
        onClick={() => handleClick('fabric')}
        className={getButtonClass('fabric')}
      >
        Fabric
      </div>
    </div>
  );
}
