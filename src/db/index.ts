import Dexie, { Table } from 'dexie';

interface User {
  id?: string;
  email: string;
  createdAt: Date;
}

interface NewsletterSubscription {
  id?: string;
  email: string;
  subscribedAt: Date;
}

interface AdvisoryEmail {
  id?: string;
  email: string;
  userId: string;
  sentAt: Date;
}

interface ChatMessage {
  id?: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

interface FinancialData {
  id?: string;
  userId: string;
  dataType: string;
  content: string;
  createdAt: Date;
}

class FinanceDatabase extends Dexie {
  users!: Table<User>;
  newsletterSubscriptions!: Table<NewsletterSubscription>;
  advisoryEmails!: Table<AdvisoryEmail>;
  chatMessages!: Table<ChatMessage>;
  financialData!: Table<FinancialData>;

  constructor() {
    super('FinanceDB');
    this.version(1).stores({
      users: '++id, email',
      newsletterSubscriptions: '++id, email',
      advisoryEmails: '++id, email, userId',
      chatMessages: '++id, userId, role',
      financialData: '++id, userId, dataType'
    });
  }
}

export const db = new FinanceDatabase();

export const dbService = {
  async createUser(email: string) {
    return await db.users.add({
      email,
      createdAt: new Date()
    });
  },

  async getUserById(id: string) {
    return await db.users.get(id);
  },

  async addNewsletterSubscription(email: string) {
    return await db.newsletterSubscriptions.add({
      email,
      subscribedAt: new Date()
    });
  },

  async addAdvisoryEmail(email: string, userId: string) {
    return await db.advisoryEmails.add({
      email,
      userId,
      sentAt: new Date()
    });
  },

  async addChatMessage(userId: string, role: 'user' | 'assistant', content: string) {
    return await db.chatMessages.add({
      userId,
      role,
      content,
      createdAt: new Date()
    });
  },

  async addFinancialData(userId: string, dataType: string, content: any) {
    return await db.financialData.add({
      userId,
      dataType,
      content: JSON.stringify(content),
      createdAt: new Date()
    });
  },

  async getUserByEmail(email: string) {
    return await db.users.where('email').equals(email).first();
  },

  async getNewsletterSubscriptions() {
    return await db.newsletterSubscriptions.toArray();
  },

  async getAdvisoryEmails() {
    return await db.advisoryEmails.toArray();
  },

  async getChatMessagesByUser(userId: string) {
    return await db.chatMessages
      .where('userId')
      .equals(userId)
      .sortBy('createdAt');
  },

  async getFinancialDataByUser(userId: string) {
    return await db.financialData
      .where('userId')
      .equals(userId)
      .reverse()
      .sortBy('createdAt');
  }
};