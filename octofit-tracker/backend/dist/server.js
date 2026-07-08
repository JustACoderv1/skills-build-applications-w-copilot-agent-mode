"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./config/database");
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const sendCollection = async (res, fetcher) => {
    try {
        const items = await fetcher();
        res.json(items);
    }
    catch (error) {
        console.error('Error fetching collection', error);
        res.status(500).json({ error: 'Unable to load collection' });
    }
};
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker API is running',
        port,
        apiUrl,
    });
});
app.get('/api/users', async (_req, res) => {
    await sendCollection(res, () => models_1.User.find({}).lean());
});
app.get('/api/users/', async (_req, res) => {
    await sendCollection(res, () => models_1.User.find({}).lean());
});
app.post('/api/users', async (req, res) => {
    try {
        const newUser = await models_1.User.create(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ error: 'Unable to create user' });
    }
});
app.post('/api/users/', async (req, res) => {
    try {
        const newUser = await models_1.User.create(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ error: 'Unable to create user' });
    }
});
app.get('/api/teams', async (_req, res) => {
    await sendCollection(res, () => models_1.Team.find({}).lean());
});
app.get('/api/teams/', async (_req, res) => {
    await sendCollection(res, () => models_1.Team.find({}).lean());
});
app.post('/api/teams', async (req, res) => {
    try {
        const newTeam = await models_1.Team.create(req.body);
        res.status(201).json(newTeam);
    }
    catch (error) {
        console.error('Error creating team', error);
        res.status(500).json({ error: 'Unable to create team' });
    }
});
app.post('/api/teams/', async (req, res) => {
    try {
        const newTeam = await models_1.Team.create(req.body);
        res.status(201).json(newTeam);
    }
    catch (error) {
        console.error('Error creating team', error);
        res.status(500).json({ error: 'Unable to create team' });
    }
});
app.get('/api/activities', async (_req, res) => {
    await sendCollection(res, () => models_1.Activity.find({}).lean());
});
app.get('/api/activities/', async (_req, res) => {
    await sendCollection(res, () => models_1.Activity.find({}).lean());
});
app.post('/api/activities', async (req, res) => {
    try {
        const newActivity = await models_1.Activity.create(req.body);
        res.status(201).json(newActivity);
    }
    catch (error) {
        console.error('Error creating activity', error);
        res.status(500).json({ error: 'Unable to create activity' });
    }
});
app.post('/api/activities/', async (req, res) => {
    try {
        const newActivity = await models_1.Activity.create(req.body);
        res.status(201).json(newActivity);
    }
    catch (error) {
        console.error('Error creating activity', error);
        res.status(500).json({ error: 'Unable to create activity' });
    }
});
app.get('/api/leaderboard', async (_req, res) => {
    await sendCollection(res, () => models_1.LeaderboardEntry.find({}).lean());
});
app.get('/api/leaderboard/', async (_req, res) => {
    await sendCollection(res, () => models_1.LeaderboardEntry.find({}).lean());
});
app.post('/api/leaderboard', async (req, res) => {
    try {
        const newLeaderboardEntry = await models_1.LeaderboardEntry.create(req.body);
        res.status(201).json(newLeaderboardEntry);
    }
    catch (error) {
        console.error('Error creating leaderboard entry', error);
        res.status(500).json({ error: 'Unable to create leaderboard entry' });
    }
});
app.post('/api/leaderboard/', async (req, res) => {
    try {
        const newLeaderboardEntry = await models_1.LeaderboardEntry.create(req.body);
        res.status(201).json(newLeaderboardEntry);
    }
    catch (error) {
        console.error('Error creating leaderboard entry', error);
        res.status(500).json({ error: 'Unable to create leaderboard entry' });
    }
});
app.get('/api/workouts', async (_req, res) => {
    await sendCollection(res, () => models_1.Workout.find({}).lean());
});
app.get('/api/workouts/', async (_req, res) => {
    await sendCollection(res, () => models_1.Workout.find({}).lean());
});
app.post('/api/workouts', async (req, res) => {
    try {
        const newWorkout = await models_1.Workout.create(req.body);
        res.status(201).json(newWorkout);
    }
    catch (error) {
        console.error('Error creating workout', error);
        res.status(500).json({ error: 'Unable to create workout' });
    }
});
app.post('/api/workouts/', async (req, res) => {
    try {
        const newWorkout = await models_1.Workout.create(req.body);
        res.status(201).json(newWorkout);
    }
    catch (error) {
        console.error('Error creating workout', error);
        res.status(500).json({ error: 'Unable to create workout' });
    }
});
app.listen(port, '0.0.0.0', () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${apiUrl}`);
});
