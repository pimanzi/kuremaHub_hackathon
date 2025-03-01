import { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
import useUser from '@/features/Authentication/useUser';
import { useArts } from '@/features/arts/useArts';
import { IoMdArrowRoundBack } from 'react-icons/io';

const AccountProfile = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const { arts, isLoading: loadingArts } = useArts();
  if (isLoading || loadingArts)
    return (
      <div className="h-screen flex justify-center items-center">
        {' '}
        <div className="loader"></div>
      </div>
    );
  console.log(user);
  const id = user.id;
  const artsShow = arts.filter((art) => art.userId === Number(id));
  const handleUpdateInfo = () => {
    console.log('Update info clicked');
    // This would open an edit modal or navigate to edit page
  };

  const handleCreateArt = () => {
    navigate('/profile/createArt');
  };

  const handleArtworkClick = (artworkId) => {
    console.log(`Artwork ${artworkId} clicked`);
    // This would open detailed view of the artwork
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Banner Area */}
      <div className="md:px-20 px-5 flex gap-3 items-center ">
        <IoMdArrowRoundBack
          className=" text-3xl md:text-5xl hover:cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        ></IoMdArrowRoundBack>
        <h1 className="font-semibold text-3xl md:text-5xl py-10">Profile</h1>
      </div>
      <div className="relative w-full md:px-20">
        <div className="w-full h-64 md:h-80 overflow-hidden md:rounded-xl">
          <img
            src="/images/cover.jpeg"
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Picture */}
        <div className="absolute left-1/2 md:left-52 transform -translate-x-1/2 -bottom-20">
          <Avatar className="h-40 w-40 border-4 border-background">
            <img
              src={user.user_metadata.avatar || '/images/default-user.jpg'}
              alt="avatar"
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
              {user.user_metadata.firstName + ' ' + user.user_metadata.lastName}
            </h1>
          </div>

          <div className=" my-4 flex flex-col md:flex-row md:justify-between md:items-center text-white">
            <Button
              onClick={handleUpdateInfo}
              className="bg-primary text-neutral-white px-8 py-3 rounded-full hover:bg-accent transition-colors"
            >
              Update Info
            </Button>
          </div>
        </div>
        <div className="bg-gray-800 h-[1px] px-36 mb-10"></div>
        {/* Artworks Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Artworks</h2>
            <Button
              onClick={handleCreateArt}
              className="bg-primary text-neutral-white px-8 py-3 rounded-full hover:bg-accent transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Art
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artsShow.length ? (
              artsShow.map((artwork) => (
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
              ))
            ) : (
              <div className="flex justify-center items-center text-primary w-full">
                {' '}
                No arts created yet, create your own art now seemleesly{' '}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
