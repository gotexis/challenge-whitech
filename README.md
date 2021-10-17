# whitech-exis

## How to run
Tests (api only)

```sh
yarn
yarn test
```

Run with docker

```sh
docker build -t whitech-exis .
docker run -p 4000:4000 -it whitech-exis
```

Run without docker

```sh
yarn # will install pkgs both frontend and backend
yarn dev:server # Backend
yarn start # Frontend
```

## Highlights
- Minimal use of libraries, mostly coding be hand
- No lodash
- No CSS framework
- Hooks
- No redux
- Clear structure
- Typescript
- webpack / babel for backend enabling all ES6+
- Using all modern patterns, including async / await in the main loop
- Using in-mem sqlite eliminates the need for spinning up additional db
- data is loaded automatically
- Some api tests

## Caveats
- No redux but surely hooks can fully drop-in replace them
- Obviously no `react-router` due to the app only having one page
- Didn't have time to properly style top-right select
- Didn't trouble to strip frontend from docker build, slightly increasing build time
- No frontend tests (sorry it's been quite long already)
- The api tests only covered REST layer so not much for unit-test