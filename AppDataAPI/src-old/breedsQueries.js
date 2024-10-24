import { pool } from "./database.js";
export async function searchBreedType(breedType) {
    try {
        const response = await pool.query("SELECT * FROM breeds WHERE type = $1", [
            breedType,
        ]);
        return response.rows;
    }
    catch (error) {
        throw error;
    }
}
export async function searchLikedBreeds(userId) {
    try {
        const response = await pool.query("SELECT * FROM users_breeds JOIN breeds ON users_breeds.breed_id = breeds.id WHERE users_breeds.user_id = $1;", [userId]);
        return response.rows;
    }
    catch (error) {
        throw error;
    }
}
export async function addBreedRating(breedRating, breedId, userId) {
    try {
        const response = await pool.query("SELECT * FROM users_breeds WHERE user_id = $1 AND breed_id = $2", [userId, breedId]);
        if (response.rowCount !== 0) {
            throw new Error("ERROR: already rated");
        }
        await pool.query("INSERT INTO users_breeds (user_id, breed_id, rating) VALUES ($1, $2, $3)", [userId, breedId, breedRating]);
    }
    catch (error) {
        throw error;
    }
}
export async function removeBreedRating(breedId, userId) {
    try {
        await pool.query("DELETE FROM users_breeds WHERE breed_id = $1 AND user_id = $2;", [breedId, userId]);
    }
    catch (error) {
        throw error;
    }
}
export async function searchNewBreeds(userId) {
    try {
        const likedBreedIds = (await searchLikedBreeds(userId)).map((breed) => breed.breed_id);
        if (likedBreedIds.length === 0) {
            const allBreeds = await pool.query("SELECT * FROM breeds");
            return allBreeds.rows;
        }
        const placeholders = likedBreedIds
            .map((_, index) => `$${index + 1}`)
            .join(",");
        const unlikedBreeds = await pool.query(`SELECT * FROM breeds WHERE id NOT IN (${placeholders})`, likedBreedIds);
        return unlikedBreeds.rows;
    }
    catch (error) {
        throw error;
    }
}
