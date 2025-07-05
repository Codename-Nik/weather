export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'UTC' 
  }).format(date);
}

export function formatWeekday(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    timeZone: 'UTC'
  }).format(date);
}

export function formatLongDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC'
  }).format(date);
}

function isValidDate(dateString: string): boolean {
  return !isNaN(Date.parse(dateString));
}

function safeFormat(
  dateString: string,
  formatter: (date: string) => string
): string {
  return isValidDate(dateString) ? formatter(dateString) : dateString;
}

export const safeFormatShortDate = (dateString: string) => 
  safeFormat(dateString, formatShortDate);
export const safeFormatWeekday = (dateString: string) => 
  safeFormat(dateString, formatWeekday);
export const safeFormatLongDate = (dateString: string) => 
  safeFormat(dateString, formatLongDate);