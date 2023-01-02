import SavedDog from '../models/savedDogs';

export const saveDog = async (req, res) => {

    const { userId, dogId } = req.body;

    try {
        const savedDog = new SavedDog({ dogId, userId });

        await savedDog.save();

        res.send(savedDog);
    } catch (err) {
        console.log(err);
    }
};

export const getSavedDogByUserId = async(req, res)=>{
    const {userId} = req.params;

    try {
        const dogs = await SavedDog.find({userId});

        res.send(dogs);
    } catch (error) {
        console.log(error);
    }
}

export const getSavedDogByUserIdAndDogId = async (req, res) => {
    const { userId, dogId } = req.params;

    console.log('ids: ', userId, dogId);

    try {
        const dog = await SavedDog.findOne({ userId, dogId });

        res.send(dog);
    } catch (error) {
        console.log(error);
    }
};

export const deleteSavedDog = async(req, res)=>{
    const { userId, dogId } = req.params;
    console.log(userId, dogId);

    try {
        await SavedDog.deleteOne({ dogId, userId });

        res.send({dogId, userId});
    } catch (err) {
        console.log(err);
    }
}
