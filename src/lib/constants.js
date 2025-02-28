export const ART_TYPES = ["Painting", "Picture", "Fabric", "Sculpture"];
export const CURRENCIES = ["USD", "EUR", "GBP"];
export const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};
export const DEFAULT_FORM_DATA = {
  title: "",
  type: "Painting",
  price: 0,
  currency: "USD",
  colors: "",
  theme: "",
};
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "image/svg+xml",
];
export const PLACEHOLDER_DESCRIPTIONS = [
  {
    id: "1",
    text: "A stunning composition that evokes deep emotions through its masterful use of color and form. The dynamic interplay of light and shadow creates a sense of movement that draws the viewer into its captivating narrative.",
  },
  {
    id: "2",
    text: "This expressive piece showcases the artist's unique perspective and technical brilliance. The textured surfaces and bold strokes reflect a passionate exploration of the medium, resulting in a work of profound meaning and visual power.",
  },
  {
    id: "3",
    text: "An enchanting creation that balances precision with spontaneity. The harmonious color palette and thoughtful composition invite contemplation, revealing new details with each viewing that speak to the artwork's enduring significance.",
  },
];