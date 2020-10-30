![Main](https://github.com/tylergrinn/react-svg/workflows/Main/badge.svg)
![Dependencies](https://img.shields.io/david/tylergrinn/react-svg?style=flat-square)
![Dev Dependencies](https://img.shields.io/david/dev/tylergrinn/react-svg?style=flat-square)

# Setup

1. Clone repository

   ```cmd
   git clone --recursive https://github.com/tylergrinn/react-svg.git
   ```

   OR

   ```cmd
   git clone https://github.com/tylergrinn/react-svg.git
   git submodule update --init
   ```

1. Install dependencies for root project and react fork

   ```cmd
   yarn
   yarn --cwd react
   ```

1. Build react fork

   ```cmd
   yarn build:react
   ```

1. Start development server

   ```cmd
   yarn start
   ```
