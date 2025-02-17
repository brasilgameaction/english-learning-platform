interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  provider: string;
  lastLogin: Date;
}

interface Content {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  category: 'listening' | 'speaking' | 'reading';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Date;
  createdBy: string;
}

class DatabaseService {
  private readonly USERS_KEY = 'englishLearningUsers';
  private readonly CONTENT_KEY = 'englishLearningContent';

  // User management methods
  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    if (!usersJson) return [];
    return JSON.parse(usersJson, (key, value) => {
      if (key === 'lastLogin') return new Date(value);
      return value;
    });
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  async saveUser(user: User): Promise<void> {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    
    if (index !== -1) {
      users[index] = user;
    } else {
      users.push(user);
    }
    
    this.saveUsers(users);
  }

  async getUser(id: string): Promise<User | undefined> {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const users = this.getUsers();
    return users.find(user => user.email === email);
  }

  async getAllUsers(): Promise<User[]> {
    return this.getUsers();
  }

  async deleteUser(id: string): Promise<void> {
    const users = this.getUsers();
    const filteredUsers = users.filter(user => user.id !== id);
    this.saveUsers(filteredUsers);
  }

  async updateUserLastLogin(id: string): Promise<void> {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex !== -1) {
      users[userIndex].lastLogin = new Date();
      this.saveUsers(users);
    }
  }

  async clearAllData(): Promise<void> {
    // Remove all data from localStorage
    localStorage.removeItem(this.USERS_KEY);
    localStorage.removeItem(this.CONTENT_KEY);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
  }

  // Content management methods
  private getContent(): Content[] {
    const contentJson = localStorage.getItem(this.CONTENT_KEY);
    if (!contentJson) return [];
    return JSON.parse(contentJson, (key, value) => {
      if (key === 'createdAt') return new Date(value);
      return value;
    });
  }

  private saveContent(content: Content[]): void {
    localStorage.setItem(this.CONTENT_KEY, JSON.stringify(content));
  }

  async addContent(content: Omit<Content, 'id' | 'createdAt'>): Promise<Content> {
    const contents = this.getContent();
    const newContent: Content = {
      ...content,
      id: `content_${Date.now()}`,
      createdAt: new Date(),
    };
    
    contents.push(newContent);
    this.saveContent(contents);
    return newContent;
  }

  async getContentById(id: string): Promise<Content | undefined> {
    const contents = this.getContent();
    return contents.find(content => content.id === id);
  }

  async getAllContent(): Promise<Content[]> {
    return this.getContent();
  }

  async getContentByCategory(category: Content['category']): Promise<Content[]> {
    const contents = this.getContent();
    return contents.filter(content => content.category === category);
  }

  async deleteContent(id: string): Promise<void> {
    const contents = this.getContent();
    const filteredContents = contents.filter(content => content.id !== id);
    this.saveContent(filteredContents);
  }

  async deleteAllContent(): Promise<void> {
    localStorage.removeItem(this.CONTENT_KEY);
  }
}

export const dbService = new DatabaseService();
export type { User, Content }; 