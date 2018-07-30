/**
 * Created by laurence-ho on 21/07/17.
 */

import * as express from 'express';
import * as authentication from '../Authentication';
import CampgroundRepository from '../repository/CampgroundRepository';

const router = express.Router();
const campgroundRepository = new CampgroundRepository();

// get all campgrounds
router.get('/campground', (req: any, res: any) => {
	try {
		campgroundRepository.findAll((callback: any) => {
			callback.message = 'OK';
			res.status(200).send(callback);
		});
	} catch (err) {
		res.status(500).send({ message: err })
	}
});

// create one campground
router.post('/campground', authentication.isLoggedIn, (req: any, res: any) => {
	req.body.name = req.sanitize(req.body.name);
	req.body.image = req.sanitize(req.body.image);
	req.body.description = req.sanitize(req.body.description);
	req.body.price = req.sanitize(req.body.price);

	try {
		campgroundRepository.createOne(req.body, (callback: any) => {
			callback.message = 'OK';
			res.status(200).send(callback);
		});
	} catch (err) {
		res.status(500).send({ message: err })
	}
});

router.get('/campground/:id', (req: any, res: any) => {
	try {
		campgroundRepository.findOneById(req.params.id, (callback: any) => {
			callback.message = 'OK';
			res.status(200).send(callback);
		});
	} catch (err) {
		res.status(500).send({ message: err })
	}
});

router.get('/campground/:id/edit', authentication.checkCampOwner, (req: any, res: any) => {
	try {
		campgroundRepository.findOneById(req.params.id, (callback: any) => {
			callback.message = 'OK';
			res.status(200).send(callback);
		});
	} catch (err) {
		res.status(500).send({ message: err })
	}
});

// edit one campground
router.put('/campground/:id/edit', authentication.checkCampOwner, (req: any, res: any) => {
	req.body.name = req.sanitize(req.body.name);
	req.body.image = req.sanitize(req.body.image);
	req.body.description = req.sanitize(req.body.description);
	req.body.price = req.sanitize(req.body.price);

	try {
		campgroundRepository.updateOne(req.body);
		res.status(200).send({ message: 'OK' });
	} catch (err) {
		res.status(500).send({ message: err })
	}
});

// delete one campground
router.delete('/campground/:id', authentication.checkCampOwner, (req: any, res: any) => {
	try {
		campgroundRepository.deleteOne(req.params.id);
		res.status(200).send({ message: 'OK' });
	} catch (err) {
		res.status(500).send({ message: err })
	}
});

export = router;
