import { motion } from "framer-motion";
import ArtUploadForm from "../components/artUploadForm";
import ChatBot from "@/components/ArtChartBot/ChatBot";
const ArtUpload = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="bg-primary/5 text-primary-foreground/80 text-xs font-medium py-1 px-3 rounded-full inline-block mb-3">
            Artify • Describe • Create
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Create Art
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your artwork and with help our AI assistant craft the perfect artistic 
            description that captures its essence and emotion.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-panel rounded-xl p-6 sm:p-8 md:p-10 shadow-xl backdrop-blur"
        >
          <ArtUploadForm />
        </motion.div>
        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            KuremaHub.Inc
          </p>
        </div>
        < ChatBot />
      </div>
    </div>
  );
};
export default ArtUpload;