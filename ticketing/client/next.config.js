export function webpackDevMiddleware(config) {
    config.webpackDevMiddleware.poll = 300;
    return config;
}