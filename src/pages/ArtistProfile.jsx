import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { IoMdArrowRoundBack } from 'react-icons/io';
import {
  Facebook,
  Instagram,
  Twitter,
  Globe,
  MapPin,
  Check,
  Plus,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthUsers } from '@/features/Authentication/useAuthUsers';
import { useArts } from '@/features/arts/useArts';

const ArtistProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authUsers, isLoading } = useAuthUsers();
  const { arts, isLoading: loadingArts } = useArts();
  const isMobile = useIsMobile();
  if (isLoading || loadingArts)
    return (
      <div className="h-screen flex justify-center items-center">
        {' '}
        <div className="loader"></div>
      </div>
    );
  const artsShow = arts.filter((art) => art.userId === Number(id));

  const user = authUsers.filter((user) => user.id === Number(id))[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Banner Area */}
      <div className="flex items-center md:px-20 px-5  gap-4 text-3xl">
        <IoMdArrowRoundBack
          className="text-5xl hover:cursor-pointer"
          onClick={() => navigate(-1)}
        ></IoMdArrowRoundBack>
        <h1 className="font-semibold text-3xl md:text-5xl py-10">Profile</h1>
      </div>

      <div className="relative w-full md:px-20">
        <div className="w-full h-64 md:h-80 overflow-hidden md:rounded-xl">
          <img
            src={'/images/cover.jpeg'}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Picture */}
        <div className="absolute left-1/2 md:left-52 transform -translate-x-1/2 -bottom-20">
          <Avatar className="h-40 w-40 border-4 border-background">
            <img
              src={user.avatar || '/images/default-user.jpg'}
              alt="image"
              className="h-full w-full object-cover"
            />
          </Avatar>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="container max-w-4xl mx-auto px-4 pt-24 md:pt-5 pb-8 relative">
        <div className="md:text-start text-center">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <h1 className="text-3xl font-bold">
              {user.firstName + ' ' + user.lastName}
            </h1>
          </div>
        </div>
        <div className="bg-gray-800 h-[1px] px-36 mb-10"></div>
        {/* Artworks Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Artworks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artsShow.map((artwork) => (
              <Card
                key={artwork.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer animate-fade-in"
                onClick={() => handleArtworkClick(artwork.id)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{artwork.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {artwork.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
