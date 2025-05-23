import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: (origin, callback) => callback(null, true), // allow all origins
    credentials: true // must be 'credentials', not 'Credential'
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes Import 
import userRouter from './routes/user.routes.js';
import commentRouter from './routes/comment.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';
import healthcheckRouter from './routes/healthcheck.routes.js';
import likeRouter from './routes/like.routes.js';
import playlistRouter from './routes/playlist.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import tweetRouter from './routes/tweet.routes.js';
import videoRouter from './routes/video.routes.js';
import homeRouter from './routes/home.routes.js';

// Routes Declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/healthcheck', healthcheckRouter);
app.use('/api/v1/likes', likeRouter);
app.use('/api/v1/playlists', playlistRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/tweets', tweetRouter);
app.use('/api/v1/videos', videoRouter);
app.use('/api/v1/home', homeRouter);

export default app;