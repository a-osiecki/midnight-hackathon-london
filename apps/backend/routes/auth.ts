import { Router } from "express";
import { stravaService } from "../services/strava";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", { authUrl: stravaService.getAuthUrl() });
});

router.get("/callback", async (req, res) => {
  const code = req.query.code as string;
  if (!code) return res.send("Missing OAuth code");

  await stravaService.exchangeToken(code);
  res.redirect("/dashboard");
});

export default router;
