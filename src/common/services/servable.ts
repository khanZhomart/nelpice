export interface Servable<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T>;
    save(payload: T): Promise<T>;
    remove(id:number): Promise<void>;
}