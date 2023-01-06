import bodyParser from 'body-parser';
import express from 'express';
import { deleteSavedDog, getSavedDogByUserId, getSavedDogByUserIdAndDogId, getSavedDogs, saveDog } from '../controllers/savedDogs';

const router = express.Router();

router.post('/', saveDog);

router.get('/:userId', getSavedDogByUserId);

router.get('/:userId/:dogId', getSavedDogByUserIdAndDogId);

router.delete('/:userId/:dogId', deleteSavedDog);

router.get('/', getSavedDogs);

export default router;