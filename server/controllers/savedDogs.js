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

export const getSavedDogs = async (req, res) => {
    console.log(req.params);
    const { userId } = req.params;

    try {
        const dogs = await SavedDog.find();

        // console.log('dogs: ', dogs);

        res.send(dogs);
    } catch (error) {
        console.log('erorr: ', error);
    }
};

export const getSavedDogByUserId = async(req, res)=>{
    console.log(req.params);
    const {userId} = req.params;

    try {
        const dogs = await SavedDog.find({userId});

        console.log('dogs: ', dogs);

        res.send(dogs);
    } catch (error) {
        console.log('erorr: ', error);
    }
}

export const getSavedDogByUserIdAndDogId = async (req, res) => {
    const { userId, dogId } = req.params;

    try {
        const dog = await SavedDog.findOne({ userId, dogId });

        res.send(dog);
    } catch (error) {
        console.log(error);
    }
};

export const deleteSavedDog = async(req, res)=>{
    const { userId, dogId } = req.params;

    try {
        await SavedDog.deleteOne({ dogId, userId });

        res.send({dogId, userId});
    } catch (err) {
        console.log(err);
    }
}
