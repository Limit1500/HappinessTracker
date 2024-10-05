import { addBreedRating, searchBreedType, searchLikedBreeds, searchNewBreeds, } from "./breedsQueries.js";
import { checkUserData, findUser, insertUser } from "./userQueries.js";
import { Router } from "express";
export let router = Router();
router.post("/signin", async (req, res) => {
    try {
        await checkUserData(req.body.username, req.body.email, req.body.password);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    try {
        const response = await insertUser(req.body.username, req.body.email, req.body.password);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
});
router.post("/login", async (req, res) => {
    try {
        const response = await findUser(req.body.username, req.body.password);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        return;
    }
});
router.post("/searchBreedType", async (req, res) => {
    try {
        const response = await searchBreedType(req.body.breedType);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        return;
    }
});
router.post("/searchLikedBreeds", async (req, res) => {
    try {
        const response = await searchLikedBreeds(req.body.userId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        return;
    }
});
router.post("/addBreedRating", async (req, res) => {
    try {
        await addBreedRating(req.body.breedRating, req.body.breedId, req.body.userId);
        res.status(200);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        return;
    }
});
router.post("/searchNewBreeds", async (req, res) => {
    try {
        const response = await searchNewBreeds(req.body.userId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        return;
    }
});
