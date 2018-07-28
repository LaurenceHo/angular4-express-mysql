export interface BaseRepository<T> {

	findAll(): any;

	findOneById(id: number): any;

	createOne(item: T): number;

	updateOne(id: number, item: T): void;

	deleteOne(id: number): void;

}
