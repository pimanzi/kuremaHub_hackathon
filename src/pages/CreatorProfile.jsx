import React, { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Facebook, Instagram, Twitter, Globe, MapPin, Check, Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const CreatorProfile = () => {
  const isMobile = useIsMobile();
  const [creator, setCreator] = useState({
    name: "John Doe",
    isVerified: true,
    location: "Klaxik, Rwanda",
    bio: "Multidisciplinary artist working at the intersection of photography, design and visual arts. Creating unique experiences through art.",
    socialLinks: {
      instagram: "https://instagram.com/johndoe",
      twitter: "https://twitter.com/johndoe",
      facebook: "https://facebook.com/johndoe",
      website: "https://johndoe.com",
    },
    coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1600&h=400&fit=crop",
    profileImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop",
  });

  const [artworks, setArtworks] = useState([
    {
      id: 1,
      title: "Abstract Vision",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=500&fit=crop",
      description: "An exploration of color and form",
    },
    {
      id: 2,
      title: "Urban Landscape",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop",
      description: "City life in abstract form",
    },
    {
      id: 3,
      title: "Digital Dreams",
      image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&h=500&fit=crop",
      description: "A journey through digital art",
    },
    {
      id: 4,
      title: "Nature's Harmony",
      image: "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?w=500&h=500&fit=crop",
      description: "Inspired by natural elements",
    },
  ]);

  const handleUpdateInfo = () => {
    console.log("Update info clicked");
    // This would open an edit modal or navigate to edit page
  };

  const handleCreateArt = () => {
    console.log("Create art clicked");
    // This would open artwork upload form
  };

  const handleArtworkClick = (artworkId) => {
    console.log(`Artwork ${artworkId} clicked`);
    // This would open detailed view of the artwork
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Banner Area */}
      <h1 className="md:px-20 px-5 font-semibold text-3xl md:text-5xl py-10">Profile</h1>
      <div className="relative w-full md:px-20">
        <div className="w-full h-64 md:h-80 overflow-hidden md:rounded-xl">
          <img 
            src={creator.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Picture */}
        <div className="absolute left-1/2 md:left-52 transform -translate-x-1/2 -bottom-20">
          <Avatar className="h-40 w-40 border-4 border-background">
            <img src={creator.profileImage} alt={creator.name} className="h-full w-full object-cover" />
          </Avatar>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="container max-w-4xl mx-auto px-4 pt-24 md:pt-5 pb-8 relative">
        <div className="md:text-start text-center">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <h1 className="text-3xl font-bold">{creator.name}</h1>
            {creator.isVerified && (
              <Check className="h-5 w-5 text-blue-500 bg-blue-100 rounded-full p-0.5" />
            )}
          </div>
          
          <div className="flex items-center justify-center md:justify-start text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{creator.location}</span>
          </div>
          
          <p className="max-w-lg mx-auto text-muted-foreground mb-6 md:mx-0">
            {creator.bio}
          </p>
          
          {/* Social Links */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center"
          >
            <div className="flex justify-center md:justify-start space-x-4 mb-6">
            <a href={creator.socialLinks.instagram} className="p-2 rounded-full hover:bg-accent transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={creator.socialLinks.twitter} className="p-2 rounded-full hover:bg-accent transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href={creator.socialLinks.facebook} className="p-2 rounded-full hover:bg-accent transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href={creator.socialLinks.website} className="p-2 rounded-full hover:bg-accent transition-colors">
              <Globe className="h-5 w-5" />
            </a>
          </div>
          
          <Button onClick={handleUpdateInfo} variant="outline" className="mb-6">
            Update Info
          </Button>
          </div>
          
        </div>
        <div className="bg-gray-800 h-[1px] px-36 mb-10"></div>
        {/* Artworks Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Artworks</h2>
            <Button onClick={handleCreateArt} variant="default" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Art
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
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
                  <p className="text-muted-foreground text-sm">{artwork.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;