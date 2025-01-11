const app = require('./app');
const { port } = require('./config/env');
const healthRouter = require('./routes/health');

app.use(healthRouter);

app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});
