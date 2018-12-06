import { BaseRepository } from './BaseRepository';
import { User } from '../model/User';
import DatabaseService from '../database/DatabaseService';

const database = new DatabaseService();

export default class UserRepository implements BaseRepository<User> {
  findAll(callback: any): void {
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
  }
  
  deleteOne(id: number): void {
  }
}
