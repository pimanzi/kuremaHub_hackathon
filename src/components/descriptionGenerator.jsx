import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/hooks/use-toast";
import { LucideCheck, LucideRefreshCw, LucidePencil } from "lucide-react";
import { PLACEHOLDER_DESCRIPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
const DescriptionGenerator = ({ title, colors, theme, onSelect, isGenerating = false }) => {
  const [descriptions, setDescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  // For development only - replace with actual API call
  const generateDescriptions = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setDescriptions(
        PLACEHOLDER_DESCRIPTIONS.map(desc => ({
          ...desc,
          selected: false
        }))
      );
      setLoading(false);
      
      toast({
        title: "Descriptions generated",
        description: "We've created three unique descriptions for your artwork",
      });
    }, 2000);
  };
  const regenerateDescription = (id) => {
    setLoading(true);
    
    // Simulate API call for regeneration
    setTimeout(() => {
      const updatedDescriptions = descriptions.map(desc => {
        if (desc.id === id) {
          // Get a different description from our placeholder set
          const otherDescriptions = PLACEHOLDER_DESCRIPTIONS.filter(d => d.id !== id);
          const randomIndex = Math.floor(Math.random() * otherDescriptions.length);
          return {
            ...desc,
            text: otherDescriptions[randomIndex].text
          };
        }
        return desc;
      });
      
      setDescriptions(updatedDescriptions);
      setLoading(false);
      
      toast({
        title: "Description updated",
        description: "We've regenerated a new description for you",
      });
    }, 1500);
  };
  const selectDescription = (id) => {
    const updatedDescriptions = descriptions.map(desc => ({
      ...desc,
      selected: desc.id === id
    }));
    
    setDescriptions(updatedDescriptions);
    const selectedDesc = updatedDescriptions.find(d => d.selected);
    
    if (selectedDesc) {
      onSelect(selectedDesc.text);
      toast({
        title: "Description selected",
        description: "You've chosen your favorite description",
      });
    }
  };
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };
  const saveEdit = () => {
    if (!editingId) return;
    
    const updatedDescriptions = descriptions.map(desc => {
      if (desc.id === editingId) {
        return {
          ...desc,
          text: editedText,
          selected: true
        };
      }
      return {
        ...desc,
        selected: false
      };
    });
    
    setDescriptions(updatedDescriptions);
    onSelect(editedText);
    setEditingId(null);
    
    toast({
      title: "Description updated",
      description: "Your edited description has been saved",
    });
  };
  const cancelEdit = () => {
    setEditingId(null);
  };
  const hasInputs = title && colors && theme;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">AI Description Generator</h3>
        <Button
          onClick={generateDescriptions}
          disabled={loading || !hasInputs}
          className="transition-soft"
        >
          {loading ? (
            <>
              <LucideRefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : descriptions.length > 0 ? (
            "Regenerate All"
          ) : (
            "Generate Descriptions"
          )}
        </Button>
      </div>
      {!hasInputs && (
        <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md">
          Please fill in the title, colors, and theme fields to generate descriptions.
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-3">
        {loading ? (
          // Loading placeholders
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={`loading-${index}`} className="p-6 h-64 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="h-4 w-full loading-shimmer rounded" />
                <div className="h-4 w-3/4 loading-shimmer rounded" />
                <div className="h-4 w-5/6 loading-shimmer rounded" />
                <div className="h-4 w-2/3 loading-shimmer rounded" />
                <div className="h-4 w-4/5 loading-shimmer rounded" />
              </div>
              <div className="flex justify-end space-x-2">
                <div className="h-9 w-9 loading-shimmer rounded-md" />
                <div className="h-9 w-9 loading-shimmer rounded-md" />
                <div className="h-9 w-9 loading-shimmer rounded-md" />
              </div>
            </Card>
          ))
        ) : (
          descriptions.map((desc) => (
            <motion.div
              key={desc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Number(desc.id) * 0.1 }}
            >
              <Card
                className={cn(
                  "p-6 h-full flex flex-col justify-between",
                  desc.selected && "border-primary"
                )}
              >
                {editingId === desc.id ? (
                  <div className="flex flex-col h-full">
                    <Textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="flex-1 min-h-[160px] mb-4"
                      placeholder="Edit your description..."
                    />
                    <div className="flex justify-end space-x-2">
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={saveEdit}>
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm italic leading-relaxed mb-4">{desc.text}</p>
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => regenerateDescription(desc.id)}
                        disabled={loading}
                        title="Regenerate this description"
                      >
                        <LucideRefreshCw className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => startEditing(desc.id, desc.text)}
                        title="Edit this description"
                      >
                        <LucidePencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant={desc.selected ? "default" : "outline"}
                        onClick={() => selectDescription(desc.id)}
                        title={desc.selected ? "Selected" : "Select this description"}
                      >
                        <LucideCheck className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </Card>
            </motion.div>
          ))
        )}
      </div>
      {descriptions.length > 0 && !loading && (
        <p className="text-xs text-muted-foreground text-center mt-4">
          Select your favorite description or edit it to make it perfect. Once you're
          satisfied, you can submit your artwork.
        </p>
      )}
    </div>
  );
};
export default DescriptionGenerator;