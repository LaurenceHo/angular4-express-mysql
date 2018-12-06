/**
 * Created by laurence-ho on 22/07/17.
 */

import * as express from 'express';
import * as authentication from '../Authentication';
import CommentRepository from '../repository/CommentRepository';

const router = express.Router();
const commentRepository = new CommentRepository();

// get one comment for edit
router.get('/comment/:comment_id/edit', authentication.checkCommentOwner, (req: any, res: any) => {
  try {
    commentRepository.findOneById(req.params.comment_id, (callback: any) => {
      callback.message = 'OK';
      res.status(200).send(callback);
    });
  } catch (err) {
    res.status(500).send({message: err})
  }
});

// create a new comment by campground id
router.post('/comment', authentication.isLoggedIn, (req: any, res: any) => {
  req.body.text = req.sanitize(req.body.text);
  
  try {
    commentRepository.createOne(req.body, (callback: any) => {
      callback.message = 'OK';
      res.status(200).send(callback);
    });
  } catch (err) {
    res.status(500).send({message: err})
  }
});

// edit one comment by comment id
router.put('/comment/:comment_id/edit', authentication.checkCommentOwner, (req: any, res: any) => {
  req.body.text = req.sanitize(req.body.text);
  
  try {
    commentRepository.updateOne(req.body);
    res.status(200).send({message: 'OK'});
  } catch (err) {
    res.status(500).send({message: err})
  }
});

// delete one comment
router.delete('/comment/:comment_id', authentication.checkCommentOwner, (req: any, res: any) => {
  try {
    commentRepository.deleteOne(req.params.comment_id);
    res.status(200).send({message: 'OK'});
  } catch (err) {
    res.status(500).send({message: err})
  }
});

export = router;
