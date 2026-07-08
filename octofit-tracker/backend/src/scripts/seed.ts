import dotenv from 'dotenv';
import '../config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

dotenv.config();

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        role: 'admin',
        location: 'London',
        fitnessGoal: 'Marathon training',
      },
      {
        name: 'Grace Hopper',
        email: 'grace@example.com',
        role: 'member',
        location: 'New York',
        fitnessGoal: 'Strength building',
      },
      {
        name: 'Katherine Johnson',
        email: 'katherine@example.com',
        role: 'coach',
        location: 'Washington',
        fitnessGoal: 'Mobility and endurance',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Alpha Squad',
        members: users.slice(0, 2).map((user) => user.name),
        captain: 'Ada Lovelace',
        focus: 'Endurance',
      },
      {
        name: 'Beta Crew',
        members: [users[1].name, users[2].name],
        captain: 'Grace Hopper',
        focus: 'Strength',
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'run',
        duration: 30,
        date: '2026-07-08',
        calories: 320,
      },
      {
        userId: users[1]._id.toString(),
        type: 'workout',
        duration: 45,
        date: '2026-07-08',
        calories: 410,
      },
      {
        userId: users[2]._id.toString(),
        type: 'cycle',
        duration: 60,
        date: '2026-07-09',
        calories: 500,
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id.toString(), points: 1200, rank: 1 },
      { userId: users[1]._id.toString(), points: 950, rank: 2 },
      { userId: users[2]._id.toString(), points: 880, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Run',
        difficulty: 'easy',
        duration: 20,
        focus: 'Cardio',
      },
      {
        title: 'HIIT Circuit',
        difficulty: 'hard',
        duration: 35,
        focus: 'Strength',
      },
      {
        title: 'Pilates Flow',
        difficulty: 'medium',
        duration: 25,
        focus: 'Mobility',
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
