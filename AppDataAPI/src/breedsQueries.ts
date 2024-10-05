import { response } from "express";
import { error } from "console";
import { pool } from "./database.js";

export async function searchBreedType(breedType: string) {
  try {
    const response = await pool.query("SELECT * FROM breeds WHERE type = $1", [
      breedType,
    ]);
    return response.rows;
  } catch (error) {
    throw error;
  }
}

export async function searchLikedBreeds(userId: number) {
  try {
    const response = await pool.query(
      "SELECT * FROM users_breeds WHERE user_id = $1",
      [userId]
    );
    return response.rows;
  } catch (error) {
    throw error;
  }
}

export async function addBreedRating(
  breedRating: 1 | 2 | 3 | 4 | 5,
  breedId: number,
  userId: number
) {
  try {
    await pool.query(
      "INSERT INTO users_breeds (user_id, breed_id, rating) VALUES ($1, $2, $3)",
      [userId, breedId, breedRating]
    );
  } catch (error) {
    throw error;
  }
}

export async function searchNewBreeds(userId: number) {
  try {
    const likedBreedIds = (await searchLikedBreeds(userId)).map(
      (breed) => breed.breed_id
    );

    if (likedBreedIds.length === 0) {
      const allBreeds = await pool.query("SELECT * FROM breeds");
      return allBreeds.rows;
    }

    const placeholders = likedBreedIds
      .map((_, index) => `$${index + 1}`)
      .join(",");

    const unlikedBreeds = await pool.query(
      `SELECT * FROM breeds WHERE id NOT IN (${placeholders})`,
      likedBreedIds
    );
    return unlikedBreeds.rows;
  } catch (error) {
    throw error;
  }
}
