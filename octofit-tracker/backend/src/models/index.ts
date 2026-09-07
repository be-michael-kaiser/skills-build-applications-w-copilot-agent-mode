import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    role: { type: String, required: true },
    team: { type: String, required: true },
    joinedAt: { type: Date, required: true },
  },
  { collection: 'users', timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    city: { type: String, required: true },
    memberCount: { type: Number, required: true },
    weeklyGoalMinutes: { type: Number, required: true },
  },
  { collection: 'teams', timestamps: true },
);

const activitySchema = new Schema(
  {
    user: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    recordedAt: { type: Date, required: true },
  },
  { collection: 'activities', timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    rank: { type: Number, required: true, unique: true },
    user: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
    activeMinutes: { type: Number, required: true },
  },
  { collection: 'leaderboard', timestamps: true },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focus: { type: String, required: true },
    level: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    exercises: { type: [String], required: true },
  },
  { collection: 'workouts', timestamps: true },
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);