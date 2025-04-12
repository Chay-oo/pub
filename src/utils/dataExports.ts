import { exportUserData, getUserData } from '../services/databaseService';

export const downloadUserData = async (userId: string, format: 'json' | 'csv' = 'json') => {
  try {
    if (format === 'json') {
      return await exportUserData(userId);
    } else {
      const data = await getUserData(userId);
      // Convert to CSV format if needed
      // Implementation for CSV conversion would go here
      return data;
    }
  } catch (error) {
    console.error('Error downloading user data:', error);
    throw error;
  }
};

export const getSubscriptionStats = async () => {
  try {
    const newsletters = await dbService.getNewsletterSubscriptions();
    const advisories = await dbService.getAdvisoryEmails();
    
    return {
      totalNewsletterSubscriptions: newsletters.length,
      totalAdvisoryEmails: advisories.length,
      newsletterEmails: newsletters.map(sub => sub.email),
      advisoryEmails: advisories.map(adv => adv.email)
    };
  } catch (error) {
    console.error('Error getting subscription stats:', error);
    throw error;
  }
};