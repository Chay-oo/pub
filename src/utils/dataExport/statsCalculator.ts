import { dbService } from '../../db';

export interface SubscriptionStats {
  totalNewsletterSubscriptions: number;
  totalAdvisoryEmails: number;
  newsletterEmails: string[];
  advisoryEmails: string[];
}

export const calculateSubscriptionStats = async (): Promise<SubscriptionStats> => {
  const newsletters = await dbService.getNewsletterSubscriptions();
  const advisories = await dbService.getAdvisoryEmails();
  
  return {
    totalNewsletterSubscriptions: newsletters.length,
    totalAdvisoryEmails: advisories.length,
    newsletterEmails: newsletters.map(sub => sub.email),
    advisoryEmails: advisories.map(adv => adv.email)
  };
};