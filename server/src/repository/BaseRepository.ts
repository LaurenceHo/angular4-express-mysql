export interface BaseRepository<T> {

	findAll(callback: any): void;

	findOneById(id: number, callback: any): void;

	createOne(item: T, callback: any): void;

	updateOne(item: T): void;

	deleteOne(id: number): void;

}
