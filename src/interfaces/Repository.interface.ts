export interface RepositoryInterface {
  getAll(): unknown;

  create(data: unknown): unknown;

  findById(id: string): unknown;

  update(id: string, data: unknown): unknown;

  delete(id: string): unknown;
}
