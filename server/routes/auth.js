import express from 'express';
import { signin, signup } from '../controllers/auth';

const router = express.Router();

router.get("/", (req, res)=>{
    return res.json({
        data: "hello from API"
    })
})

router.post("/signup", signup);

router.post("/signin", signin);

export default router;