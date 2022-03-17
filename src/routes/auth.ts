import express from "express";
import { NextFunction, Request, Response } from "express";
import passport from "../config/passport";
import authController from "../controllers/auth";

const router = express.Router();

router.get("/login", passport.authenticate('google', {scope : ['profile', 'email']}));
router.get("/loginCallback", passport.authenticate('google'), authController.loginCallback);
router.get("/logout", authController.logout);

export = router;