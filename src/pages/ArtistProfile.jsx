import { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthUsers } from '@/features/Authentication/useAuthUsers';
import { useArts } from '@/features/arts/useArts';
import { IoMdArrowRoundBack } from 'react-icons/io';

const Artistprofile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authUsers, isLoading } = useAuthUsers();
  const { arts, isLoading: loadingArts } = useArts();

  if (isLoading || loadingArts)
    return (
      <div className="h-screen flex justify-center items-center">
        {' '}
        <div className="loader"></div>
      </div>
    );
  const user = authUsers.filter((user) => user.id === Number(id))[0];
  const artsShow = arts.filter((art) => art.userId === Number(id));
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
              src={user.avatar || '/images/default-user.jpg'}
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
              {user.firstName + ' ' + user.lastName}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artsShow.map((artwork) => (
              <Card
                key={artwork.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer animate-fade-in"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{artwork.name}</h3>
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

export default Artistprofile;
