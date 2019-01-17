import DatabaseService from '../database/DatabaseService';
import { User } from '../model/User';
import { BaseRepository } from './BaseRepository';

const database = new DatabaseService();

export default class UserRepository implements BaseRepository<User> {
  findAll(callback: any): void {
    // TODO
  }
  
  findOneById(id: number, callback: any): void {
    database.query('SELECT * FROM users WHERE id = ?', [ id ]).then(
      (result: any) => callback(result[ 0 ])
    );
  }
  
  findOneByUsername(username: string, callback: any): void {
    database.query('SELECT * FROM users WHERE username = ?', [ username ]).then(
      (result: any) => callback(result[ 0 ])
    );
  }
  
  createOne(item: User, callback: any): void {
    database.query('INSERT INTO users ( username, password ) values (?,?)', [ item.username, item.password ]).then(
      (result: any) => callback({user_id: result.insertId})
    );
  }
  
  updateOne(item: User): void {
    // TODO
  }
  
  deleteOne(id: number): void {
    // TODO
  }
}
