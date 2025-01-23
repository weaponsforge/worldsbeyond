## worldsbeyond

A game set in a medieval-fantasy setting where characters find their life's meaning and purpose, and the World's existence.

All `Classes` have pre-defined roles and paths, except for a certain `Character`. Or several `Characters`.

> An experimental game testing the interaction of game classes, models, objects, and events on NodeJS.


### Requirements

The following software and dependencies were used during development. Feel free to use other versions.

1. Windows 10 OS
2. NodeJS 14.18.3


## Installation

1. Clone the repository.<br>
`git clone worldsbeyond.git`
2. Install dependencies.<br>
`npm install`


## Usage

### Using Node

1. Run the main program.<br>
`npm start`
2. Run the battle simulation.<br>
`npm run battle`

### Using Docker

1. Build the image.<br>
`docker build -t weaponsforge/worldsbeyond .`

2. Run a container in detached mode.<br>
`docker run -it --rm -d --name worldsbeyond weaponsforge/worldsbeyond`

3. Run the battle simulation.<br>
`docker exec -it worldsbeyond npm run battle`

4. Stop the container.<br>
`docker stop worldsbeyond`

## Available Scripts

### npm start

Run the main program.

### npm run battle

Run the simulation battle program.

### npm run lint

Lint the source codes.

### npm run lint:fix

Fix lint errors.

@weaponsforge
20220603
