export const firstNameFormat = (name: string) => {
  if (!name || typeof name !== 'string') return;

  const firstName = name.split(' ')[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
};

export const slugify = (input: string): string => {
  return input
    .normalize('NFD')
    .replace(/[\p{Diacritic}]/gu, '')
    .replace(/[^\p{L}\p{N}\s.-]/gu, '')
    .replace(/\./g, '-')
    .trim()
    .replace(/[\s-]+/g, '-')
    .toLowerCase();
};

export const getLastNumberFromStr = (input: string): number => {
  const lastPart = input.split('-').at(-1);
  return Number(lastPart);
};
