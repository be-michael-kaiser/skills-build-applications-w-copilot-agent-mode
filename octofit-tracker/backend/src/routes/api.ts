import { Router, type RequestHandler } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.ts';

const apiRouter = Router();

const asyncHandler = (handler: RequestHandler): RequestHandler => (request, response, next) => {
  Promise.resolve(handler(request, response, next)).catch(next);
};

apiRouter.get('/users/', asyncHandler(async (_request, response) => {
  const users = await User.find({}, { __v: 0 }).sort({ displayName: 1 }).lean();
  response.json({ users });
}));

apiRouter.get('/teams/', asyncHandler(async (_request, response) => {
  const teams = await Team.find({}, { __v: 0 }).sort({ name: 1 }).lean();
  response.json({ teams });
}));

apiRouter.get('/activities/', asyncHandler(async (_request, response) => {
  const activities = await Activity.find({}, { __v: 0 }).sort({ recordedAt: -1 }).lean();
  response.json({ activities });
}));

apiRouter.get('/leaderboard/', asyncHandler(async (_request, response) => {
  const leaderboard = await LeaderboardEntry.find({}, { __v: 0 }).sort({ rank: 1 }).lean();
  response.json({ leaderboard });
}));

apiRouter.get('/workouts/', asyncHandler(async (_request, response) => {
  const workouts = await Workout.find({}, { __v: 0 }).sort({ title: 1 }).lean();
  response.json({ workouts });
}));

export default apiRouter;