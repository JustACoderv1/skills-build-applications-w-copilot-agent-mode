import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'admin' | 'member' | 'coach';
  location?: string;
  fitnessGoal?: string;
}

export interface ITeam extends Document {
  name: string;
  members: string[];
  captain: string;
  focus: string;
}

export interface IActivity extends Document {
  userId: string;
  type: string;
  duration: number;
  date: string;
  calories?: number;
}

export interface ILeaderboardEntry extends Document {
  userId: string;
  points: number;
  rank: number;
}

export interface IWorkout extends Document {
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
  focus: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  role: { type: String, enum: ['admin', 'member', 'coach'], default: 'member' },
  location: { type: String, trim: true },
  fitnessGoal: { type: String, trim: true },
}, { timestamps: true });

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, trim: true },
  members: [{ type: String, trim: true }],
  captain: { type: String, required: true, trim: true },
  focus: { type: String, trim: true },
}, { timestamps: true });

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  duration: { type: Number, required: true },
  date: { type: String, required: true },
  calories: { type: Number },
}, { timestamps: true });

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true, trim: true },
  points: { type: Number, required: true, default: 0 },
  rank: { type: Number, required: true },
}, { timestamps: true });

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true, trim: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  duration: { type: Number, required: true },
  focus: { type: String, trim: true },
}, { timestamps: true });

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export const Team: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);
export const Activity: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry: Model<ILeaderboardEntry> = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);
