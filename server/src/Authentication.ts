/**
 * Created by laurence-ho on 21/07/17.
 */

import CampgroundRepository from './repository/CampgroundRepository';
import CommentRepository from './repository/CommentRepository';

const campgroundRepository = new CampgroundRepository();
const commentRepository = new CommentRepository();

let authentication: any = {};

authentication.checkCampOwner = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    try {
      campgroundRepository.findOneById(req.params.id, (callback: any) => {
        if (callback.campground.user_id !== req.user.id) {
          res.status(403).send({message: 'You have no permission'});
        } else {
          next();
        }
      });
    } catch (err) {
      res.status(500).send({message: err})
    }
  } else {
    res.status(403).send({message: 'Please Login First'});
  }
};

authentication.checkCommentOwner = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    try {
      commentRepository.findOneById(req.params.comment_id, (callback: any) => {
        if (callback.comment.user_id !== req.user.id) {
          res.status(403).send({message: 'You have no permission'});
        } else {
          next();
        }
      });
    } catch (err) {
      res.status(500).send({message: err})
    }
  } else {
    res.status(403).send({message: 'Please Login First'});
  }
};

authentication.isLoggedIn = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).send({message: 'Please Login First'});
};

export = authentication;

