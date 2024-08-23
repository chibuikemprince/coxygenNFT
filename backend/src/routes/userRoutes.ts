import { Router } from "express";
import {
  createUser,
  getUserByWallet,
  updateUserByWallet,
} from "../controllers/UserController";
import { validateUser } from "../middlewares/validateUser";

const router = Router();

router.post("/users", validateUser, createUser);
router.get("/users/:walletAddress", getUserByWallet);
router.put("/users/:walletAddress", validateUser, updateUserByWallet);

export default router;
