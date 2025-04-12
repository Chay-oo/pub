export const formatToCSV = (data: any): string => {
    const headers = Object.keys(data);
    const csvHeader = headers.join(',');
    const csvRows = Object.values(data).map(value => 
      typeof value === 'object' ? JSON.stringify(value) : value
    ).join(',');
    
    return `${csvHeader}\n${csvRows}`;
  };
  
  export const formatToJSON = (data: any): string => {
    return JSON.stringify(data, null, 2);
  };