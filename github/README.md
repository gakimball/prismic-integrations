# Prismic + GitHub

> Prismic integration field API to connect to GitHub

## Usage

In production, `npm start` will run the server.

Requests with the format `/users/:username` or `/orgs/:orgname` will return a list of GitHub repos for that user, in the format used by Prismic.

## Local Development

```bash
git clone https://github.com/gakimball/prismic-integrations
cd prismic-integrations/github
npm i
npm run dev
```

## License

MIT &copy; [Geoff Kimball](https://geoffkimball.com)
