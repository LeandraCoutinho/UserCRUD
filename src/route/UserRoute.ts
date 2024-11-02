import { Router } from "express";
import {
    createUser,
    updateUser,
    fetchUsers,
    showUser,
    deleteUser,
} from "../controller/UserController";

const router = Router();

router.get("/", fetchUsers);
router.get("/:id", showUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;