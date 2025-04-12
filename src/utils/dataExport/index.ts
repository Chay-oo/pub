import { getUserData, exportUserData } from '../../services/databaseService';
import { formatToCSV, formatToJSON } from './formatters';
import { downloadFile } from './fileDownload';
import { calculateSubscriptionStats } from './statsCalculator';
import type { SubscriptionStats } from './statsCalculator';

export const downloadUserData = async (userId: string, format: 'json' | 'csv' = 'json'): Promise<void> => {
  try {
    const data = await getUserData(userId);
    const filename = `user_data_${userId}.${format}`;
    
    if (format === 'json') {
      const jsonContent = formatToJSON(data);
      downloadFile(jsonContent, filename, 'application/json');
    } else {
      const csvContent = formatToCSV(data);
      downloadFile(csvContent, filename, 'text/csv');
    }
  } catch (error) {
    console.error('Error downloading user data:', error);
    throw error;
  }
};

export const getSubscriptionStats = async (): Promise<SubscriptionStats> => {
  try {
    return await calculateSubscriptionStats();
  } catch (error) {
    console.error('Error getting subscription stats:', error);
    throw error;
  }
};

export type { SubscriptionStats };