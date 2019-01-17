import DatabaseService from '../database/DatabaseService';
import { Comment } from '../model/Comment';
import { BaseRepository } from './BaseRepository';

const database = new DatabaseService();

export default class CommentRepository implements BaseRepository<Comment> {
  findAll(callback: any): void {
    // TODO
  }
  
  findOneById(id: number, callback: any): void {
    database.query('SELECT * FROM comments WHERE id = ?', [ id ]).then(
      (result: any) => callback({comment: result[ 0 ]})
    );
  }
  
  createOne(item: Comment, callback: any): void {
    database.query('INSERT INTO comments SET ?', item).then(
      (result: any) => callback({comment_id: result.insertId})
    );
  }
  
  updateOne(item: Comment): void {
    database.query('UPDATE comments SET ? WHERE id = ?', [ item, item.id ]);
  }
  
  deleteOne(id: number): void {
    database.query('DELETE FROM comments WHERE id = ?', [ id ]);
  }
}
