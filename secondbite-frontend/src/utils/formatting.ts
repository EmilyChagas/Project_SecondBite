export const currencyFormatter = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const dateFormatter = (date: string | Date) => new Date(date).toLocaleString();

export const partialDateFormatter = (date: string | Date) => new Date(date).toLocaleDateString();

export const dateStringFormatter = (date: string | Date) => {
  const locale = navigator.language;
  return new Date(date).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const dateStringComplete = (date: string | Date) => {
  const locale = navigator.language;
  return new Date(date).toLocaleString(locale, {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const dateTimeFormatter = (date: string | Date) =>
  new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
