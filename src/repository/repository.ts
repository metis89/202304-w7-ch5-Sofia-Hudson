/* eslint-disable no-unused-vars */
export interface Repository<T extends { id: string | number }> {
  getAll: () => Promise<T[]>;
  getById: (id: T['id']) => Promise<T>;
  search: (query: { key: string; value: unknown }) => Promise<T[]>;
  post: (data: Omit<T, 'id'>) => Promise<T>;
  patch: (id: T['id'], data: Partial<T>) => Promise<T>;
  delete: (id: T['id']) => Promise<void>;
}
