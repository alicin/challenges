
<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/alicin/challenges/master/challenge-3/src/assets/logo.png" alt="Flamme" height="80">
  <br>
  Bunny Todos
  <br>
</h1>

#### Build Setup
Instructions below are tested with `NodeJS v7.7.2` and works with `npm` package manager as well.

``` bash
# install dependencies
yarn   # or npm install

# serve with hot reload at localhost:3000
yarn start   # or npm start

# build for production
yarn build   # or npm run build

```

Built bundle is designed to be served over an http connection (instead of file://)<br>
You can serve it using python's built in `SimpleHTTPServer` class:

``` bash
# This will serve the built bundle @ http://localhost:8000

cd build
python -m SimpleHTTPServer
```
