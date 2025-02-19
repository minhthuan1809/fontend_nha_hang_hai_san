// xủ lý tiếng việt trê url
export const removeAccentsAndSpaces = (str: string) => {
  return str.normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[đĐ]/g, "d")
  .replace(/\s+/g, "_")
  .toLowerCase();
};

