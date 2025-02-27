// src/components/SearchComp.jsx
import Card from './Card'; // Ensure this import is present
import { GoPlus } from "react-icons/go"; 
import { CiSearch } from "react-icons/ci";

const SearchComp = () => {
    return (
        <section className="px-10 py-7">
            <nav className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">KuremaHub</h1>
                <div className="flex items-center gap-2 bg-gray-300 py-2 px-5 rounded-full cursor-pointer">
                    <GoPlus />
                    <p>Create Art</p>
                </div>
            </nav>

            <div className="mb-8">
                <div className="flex items-center gap-2 border border-black p-2 rounded-full mb-4 w-full max-w-[400px]">
                    <input type="text" name="searchbar" id="searchbar" className="w-full outline-none" placeholder="Search artwork..." />
                    <CiSearch className="text-xl" />
                </div>

                <div className="flex flex-wrap gap-2">
                    <div className="bg-gray-300 px-5 py-2 rounded-full cursor-pointer">All</div>
                    <div className="bg-gray-300 px-5 py-2 rounded-full cursor-pointer">Paints</div>
                    <div className="bg-gray-300 px-5 py-2 rounded-full cursor-pointer">Photography</div>
                    <div className="bg-gray-300 px-5 py-2 rounded-full cursor-pointer">Sculptures</div>
                    <div className="bg-gray-300 px-5 py-2 rounded-full cursor-pointer">Fabric</div>
                </div>
            </div>

            <div className="flex flex-wrap lg:justify-between gap-5">
                <Card />
                <Card />
                <Card />
                {/* Add more Card components as needed */}
            </div>
        </section>
    );
};

export default SearchComp;