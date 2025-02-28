import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { LucideCheck, LucideRefreshCw, LucidePencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { generateDescription } from "@/lib/deepseekApi";

const DescriptionGenerator = ({ title, colors, theme, onSelect }) => {
  const [descriptions, setDescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const hasInputs = title && colors && theme;

  const generateDescriptions = async () => {
    if (!hasInputs) return;
    setLoading(true);

    try {
      const prompts = [
        `Generate an artistic description for a painting titled "${title}" featuring colors: ${colors} and theme: ${theme}.`,
        `Provide a short, creative description for an artwork named "${title}" with colors: ${colors} in the theme of ${theme}.`,
        `Describe an artwork named "${title}" with a ${theme} theme using colors: ${colors}.`
      ];

      const generated = await Promise.all(prompts.map(prompt => generateDescription(prompt)));

      setDescriptions(
        generated.map((text, index) => ({
          id: index,
          text: text || "Failed to generate description",
          selected: false,
        }))
      );
    } catch (error) {
      console.error("Error generating descriptions:", error);
    }

    setLoading(false);
  };

  const regenerateDescription = async (id) => {
    setLoading(true);
    const prompt = `Provide a fresh description for an artwork titled "${title}" in the theme of ${theme} using colors: ${colors}.`;

    const newDescription = await generateDescription(prompt);

    setDescriptions((prev) =>
      prev.map((desc) =>
        desc.id === id
          ? { ...desc, text: newDescription || "Failed to generate new description" }
          : desc
      )
    );

    setLoading(false);
  };

  const selectDescription = (id) => {
    setDescriptions((prev) =>
      prev.map((desc) => ({
        ...desc,
        selected: desc.id === id,
      }))
    );

    const selectedDesc = descriptions.find((desc) => desc.id === id);
    if (selectedDesc) {
      onSelect(selectedDesc.text);
    }
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const saveEdit = () => {
    if (!editingId) return;

    setDescriptions((prev) =>
      prev.map((desc) =>
        desc.id === editingId ? { ...desc, text: editedText, selected: true } : desc
      )
    );

    onSelect(editedText);
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">AI Description Generator</h3>
        <Button onClick={generateDescriptions} disabled={loading || !hasInputs}>
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
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="p-6 h-64 flex flex-col justify-between animate-pulse">
                <div className="h-4 w-3/4 bg-gray-300 rounded" />
                <div className="h-4 w-5/6 bg-gray-300 rounded" />
                <div className="h-4 w-2/3 bg-gray-300 rounded" />
              </Card>
            ))
          : descriptions.map((desc) => (
              <motion.div
                key={desc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: desc.id * 0.1 }}
              >
                <Card className={cn("p-6 flex flex-col", desc.selected && "border-primary")}>
                  {editingId === desc.id ? (
                    <>
                      <Textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="min-h-[160px] mb-4"
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
                    </>
                  ) : (
                    <>
                      <p className="text-sm italic leading-relaxed mb-4">{desc.text}</p>
                      <div className="flex justify-end space-x-2">
                        <Button size="icon" variant="outline" onClick={() => regenerateDescription(desc.id)} title="Regenerate">
                          <LucideRefreshCw className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" onClick={() => startEditing(desc.id, desc.text)} title="Edit">
                          <LucidePencil className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant={desc.selected ? "default" : "outline"} onClick={() => selectDescription(desc.id)} title="Select">
                          <LucideCheck className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </Card>
              </motion.div>
            ))}
      </div>
    </div>
  );
};

export default DescriptionGenerator;
