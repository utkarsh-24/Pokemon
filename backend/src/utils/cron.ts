import cron from "node-cron"
import Pet from "../models/pet"
import logger from "./logger";
import moment from "moment";
import Pokemon from "../models/pokemon";

const monitorPetHealthStatus = async () => {
    try {
        let skip = 0;
        let pets = await Pet.aggregate([{ $skip: skip }, { $limit: 20 }]);
        while (pets.length > 0) {
            skip += 20;
            let bulkUpdatePetData = [];
            let bulkUpdatePokemonData = [];
            for (const pet of pets) {
                if (pet.healthStatus > 0) {
                    const lastFeedTime = moment(pet.lastFeedTime);
                    const currentTime = moment();
                    const hoursSinceLastFeed = currentTime.diff(lastFeedTime, 'hours');
                    if (hoursSinceLastFeed != 0 && hoursSinceLastFeed % 4 === 0) {
                        pet.healthStatus -= 2;
                        pet.healthStatus = Math.max(pet.healthStatus, 0);
                        bulkUpdatePetData.push({
                            updateOne: {
                                filter: { _id: pet._id },
                                update: { $set: { healthStatus: pet.healthStatus } }
                            }
                        })
                    }
                } else {
                    bulkUpdatePetData.push({
                        deleteOne: {
                            filter: { _id: pet._id }
                        }
                    })
                    bulkUpdatePokemonData.push({
                        updateOne: {
                            filter: { _id: pet._id },
                            update: { $set: { adopted: false } }
                        }
                    })
                }
            }
            if (bulkUpdatePetData.length > 0)
                Pet.bulkWrite(bulkUpdatePetData);
            if (bulkUpdatePokemonData.length > 0)
                Pokemon.bulkWrite(bulkUpdatePokemonData)
            pets = await Pet.aggregate([{ $skip: skip }, { $limit: 20 }]);
        }
    } catch (err) {
        console.error(err);
        logger.error(err)
    }
}


cron.schedule('0 * * * *', monitorPetHealthStatus);





