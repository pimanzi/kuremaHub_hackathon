import React, { useState } from "react";
import { CURRENCY_SYMBOLS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
const ArtPreview = ({ formData }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  if (!formData.filePreview) {
    return null;
  }
  const getPriceDisplay = () => {
    if (formData.price === undefined || formData.currency === undefined) {
      return null;
    }
    const currencySymbol = CURRENCY_SYMBOLS[formData.currency];
    return `${currencySymbol}${formData.price.toLocaleString()}`;
  };
  return (
    <motion.div 
      className="rounded-lg overflow-hidden shadow-lg bg-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-video bg-muted">
        <div className={!imageLoaded ? "img-loading" : ""}>
          <img
            src={formData.filePreview}
            alt={formData.title || "Artwork preview"}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.type && (
            <Badge variant="outline" className="text-xs">
              {formData.type}
            </Badge>
          )}
          {getPriceDisplay() && (
            <Badge variant="secondary" className="text-xs">
              {getPriceDisplay()}
            </Badge>
          )}
        </div>
        {formData.title && (
          <h3 className="text-xl font-medium mb-2 tracking-tight">{formData.title}</h3>
        )}
        {formData.description && (
          <p className="text-sm text-muted-foreground italic">
            {formData.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};
export default ArtPreview;