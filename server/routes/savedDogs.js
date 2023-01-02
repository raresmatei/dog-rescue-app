import bodyParser from 'body-parser';
import express from 'express';
import { deleteSavedDog, getSavedDogByUserId, getSavedDogByUserIdAndDogId, saveDog } from '../controllers/savedDogs';

const router = express.Router();

router.post('/', saveDog);

router.get('/:userId', getSavedDogByUserId);

router.get('/:userId/:dogId', getSavedDogByUserIdAndDogId);

router.delete('/:userId/:dogId', deleteSavedDog)

export default router;