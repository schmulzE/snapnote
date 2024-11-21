export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  
  // Format the date as "16th May 2024"
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  
  // Add ordinal suffix to day
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  
  // Calculate relative time
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = (now.getFullYear() - date.getFullYear()) * 12 
    + (now.getMonth() - date.getMonth());
  
  let relativeTime: string;
  
  if (diffInMinutes < 1) {
    relativeTime = 'just now';
  } else if (diffInMinutes < 60) {
    relativeTime = `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    relativeTime = `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else if (diffInDays < 30) {
    relativeTime = `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  } else if (diffInMonths === 1) {
    relativeTime = '1 month ago';
  } else if (diffInMonths < 12) {
    relativeTime = `${diffInMonths} months ago`;
  } else {
    relativeTime = `${Math.floor(diffInMonths / 12)} year${Math.floor(diffInMonths / 12) !== 1 ? 's' : ''} ago`;
  }
  
  return `${formattedDate} (${relativeTime})`;
};