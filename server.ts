import express, { Express } from 'express';
import { createRequestHandler } from '@remix-run/express';
import { ServerBuild } from '@remix-run/node';

const getBuild = async (app: Express, isProduction: boolean): Promise<ServerBuild> => {
  if (isProduction) {
    app.use(express.static('build/client'));

    return (await import('build/server/index.js')) as ServerBuild;
  } else {
    const vite = await import('vite');
    const viteDevServer = await vite.createServer({ server: { middlewareMode: true } });

    app.use(viteDevServer.middlewares);

    return (await viteDevServer.ssrLoadModule('virtual:remix/server-build')) as Promise<ServerBuild>;
  }
};

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

const build = await getBuild(app, isProduction);
const requestHandler = createRequestHandler({ build });

// eslint-disable-next-line
app.all('*', requestHandler);

app.listen(3000, () => {
  console.log('App listening on http://localhost:3000');
});
