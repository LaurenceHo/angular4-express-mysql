export interface BaseRepository {

	findAll(): any;

	findOneById(id: number): any;

	createOne(item: any): number;

	updateOne(id: number, item: any): void;

	deleteOne(id: number): void;

}
