import { Router } from "express";
import { stravaService } from "../services/strava";
import { HRMetricsService } from "../services/hrMetrics";

const router = Router();

router.get("/dashboard", async (req, res) => {
  const activities = await stravaService.getActivities();

  const hrData = await Promise.all(
    activities.map(async (a) => {
      const hr = await stravaService.getHRStream(a.id);
      return {
        activityId: a.id,
        metrics: HRMetricsService.computeMetrics(hr),
        raw: hr,
      };
    })
  );

  res.render("dashboard", { activities, hrData });
});


export default router;
