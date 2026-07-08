import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

const sendCollection = async (res: Response, fetcher: () => Promise<unknown[]>) => {
  try {
    const items = await fetcher();
    res.json(items);
  } catch (error) {
    console.error('Error fetching collection', error);
    res.status(500).json({ error: 'Unable to load collection' });
  }
};

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    port,
    apiUrl,
  });
});

app.get('/api/users', async (_req: Request, res: Response) => {
  await sendCollection(res, () => User.find({}).lean());
});

app.get('/api/users/', async (_req: Request, res: Response) => {
  await sendCollection(res, () => User.find({}).lean());
});

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user', error);
    res.status(500).json({ error: 'Unable to create user' });
  }
});

app.post('/api/users/', async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user', error);
    res.status(500).json({ error: 'Unable to create user' });
  }
});

app.get('/api/teams', async (_req: Request, res: Response) => {
  await sendCollection(res, () => Team.find({}).lean());
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  await sendCollection(res, () => Team.find({}).lean());
});

app.post('/api/teams', async (req: Request, res: Response) => {
  try {
    const newTeam = await Team.create(req.body);
    res.status(201).json(newTeam);
  } catch (error) {
    console.error('Error creating team', error);
    res.status(500).json({ error: 'Unable to create team' });
  }
});

app.post('/api/teams/', async (req: Request, res: Response) => {
  try {
    const newTeam = await Team.create(req.body);
    res.status(201).json(newTeam);
  } catch (error) {
    console.error('Error creating team', error);
    res.status(500).json({ error: 'Unable to create team' });
  }
});

app.get('/api/activities', async (_req: Request, res: Response) => {
  await sendCollection(res, () => Activity.find({}).lean());
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  await sendCollection(res, () => Activity.find({}).lean());
});

app.post('/api/activities', async (req: Request, res: Response) => {
  try {
    const newActivity = await Activity.create(req.body);
    res.status(201).json(newActivity);
  } catch (error) {
    console.error('Error creating activity', error);
    res.status(500).json({ error: 'Unable to create activity' });
  }
});

app.post('/api/activities/', async (req: Request, res: Response) => {
  try {
    const newActivity = await Activity.create(req.body);
    res.status(201).json(newActivity);
  } catch (error) {
    console.error('Error creating activity', error);
    res.status(500).json({ error: 'Unable to create activity' });
  }
});

app.get('/api/leaderboard', async (_req: Request, res: Response) => {
  await sendCollection(res, () => LeaderboardEntry.find({}).lean());
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  await sendCollection(res, () => LeaderboardEntry.find({}).lean());
});

app.post('/api/leaderboard', async (req: Request, res: Response) => {
  try {
    const newLeaderboardEntry = await LeaderboardEntry.create(req.body);
    res.status(201).json(newLeaderboardEntry);
  } catch (error) {
    console.error('Error creating leaderboard entry', error);
    res.status(500).json({ error: 'Unable to create leaderboard entry' });
  }
});

app.post('/api/leaderboard/', async (req: Request, res: Response) => {
  try {
    const newLeaderboardEntry = await LeaderboardEntry.create(req.body);
    res.status(201).json(newLeaderboardEntry);
  } catch (error) {
    console.error('Error creating leaderboard entry', error);
    res.status(500).json({ error: 'Unable to create leaderboard entry' });
  }
});

app.get('/api/workouts', async (_req: Request, res: Response) => {
  await sendCollection(res, () => Workout.find({}).lean());
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  await sendCollection(res, () => Workout.find({}).lean());
});

app.post('/api/workouts', async (req: Request, res: Response) => {
  try {
    const newWorkout = await Workout.create(req.body);
    res.status(201).json(newWorkout);
  } catch (error) {
    console.error('Error creating workout', error);
    res.status(500).json({ error: 'Unable to create workout' });
  }
});

app.post('/api/workouts/', async (req: Request, res: Response) => {
  try {
    const newWorkout = await Workout.create(req.body);
    res.status(201).json(newWorkout);
  } catch (error) {
    console.error('Error creating workout', error);
    res.status(500).json({ error: 'Unable to create workout' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`API base URL: ${apiUrl}`);
});
