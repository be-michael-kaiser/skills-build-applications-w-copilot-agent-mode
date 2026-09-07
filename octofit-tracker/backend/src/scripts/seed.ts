import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.ts';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Team.insertMany([
      { name: 'Trail Blazers', mascot: 'Bolt', city: 'Portland', memberCount: 18, weeklyGoalMinutes: 3600 },
      { name: 'Core Crushers', mascot: 'Flex', city: 'Austin', memberCount: 14, weeklyGoalMinutes: 2800 },
      { name: 'Cardio Crew', mascot: 'Dash', city: 'Chicago', memberCount: 21, weeklyGoalMinutes: 4200 },
    ]);

    await User.insertMany([
      {
        username: 'maya-pace',
        email: 'maya.pace@example.com',
        displayName: 'Maya Pace',
        role: 'Runner',
        team: 'Trail Blazers',
        joinedAt: new Date('2026-01-12T12:00:00Z'),
      },
      {
        username: 'leo-lift',
        email: 'leo.lift@example.com',
        displayName: 'Leo Lift',
        role: 'Strength Coach',
        team: 'Core Crushers',
        joinedAt: new Date('2026-02-04T12:00:00Z'),
      },
      {
        username: 'nina-flow',
        email: 'nina.flow@example.com',
        displayName: 'Nina Flow',
        role: 'Cyclist',
        team: 'Cardio Crew',
        joinedAt: new Date('2026-03-18T12:00:00Z'),
      },
    ]);

    await Activity.insertMany([
      {
        user: 'Maya Pace',
        type: 'Outdoor run',
        durationMinutes: 46,
        caloriesBurned: 430,
        recordedAt: new Date('2026-09-05T14:30:00Z'),
      },
      {
        user: 'Leo Lift',
        type: 'Strength circuit',
        durationMinutes: 52,
        caloriesBurned: 390,
        recordedAt: new Date('2026-09-06T11:15:00Z'),
      },
      {
        user: 'Nina Flow',
        type: 'Spin class',
        durationMinutes: 40,
        caloriesBurned: 360,
        recordedAt: new Date('2026-09-07T09:00:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { rank: 1, user: 'Maya Pace', team: 'Trail Blazers', points: 1280, activeMinutes: 415 },
      { rank: 2, user: 'Nina Flow', team: 'Cardio Crew', points: 1195, activeMinutes: 390 },
      { rank: 3, user: 'Leo Lift', team: 'Core Crushers', points: 1110, activeMinutes: 355 },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Mobility Reset',
        focus: 'Mobility',
        level: 'Beginner',
        durationMinutes: 20,
        exercises: ['Cat-cow flow', 'World greatest stretch', 'Hip airplanes', 'Thoracic rotations'],
      },
      {
        title: 'Tempo Run Builder',
        focus: 'Endurance',
        level: 'Intermediate',
        durationMinutes: 45,
        exercises: ['10 minute warmup jog', '4 tempo intervals', 'Easy recovery jog', 'Cooldown walk'],
      },
      {
        title: 'Full Body Power Circuit',
        focus: 'Strength',
        level: 'Advanced',
        durationMinutes: 38,
        exercises: ['Kettlebell swings', 'Goblet squats', 'Push presses', 'Renegade rows'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
