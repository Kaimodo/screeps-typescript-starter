# Screeps Typescript Starter Mod

This will just be an modded / extended Version of the Starter.
It's WIP. It can be used OOB right now, anyway there is some more work 2 do.

## ToDO

* Fine Tuning
* Better Documentation

## Implemented

* Added TypeDoc for some Documentation purposes
* Added a Tasks.json for VSCode Support
* Added little Structure in SRC
* Added some Helper Functions

### TypeDoc
The Documentation can be done via Task in VSCODE
or per CommandLine

Type

`typedoc --out AI-Doc src/ --ignoreCompilerErrors --name <NAME_OF_UR_PROJECT>`

a Quick Info on how to Comment for TypeDoc is in the [Assets-Folder][_Asset]
[_Asset]:Assets/index.md

### VSCode-Tasks

* Screeps:Deploy(World)
* Screeps:Deploy(Simulator)
* Screeps:Deploy(PrivateServer)
* Screeps:Deploy(ScreepsPLUS)
* TypeDoc:Generate
* Screeps:Live-Run(World)
* Screeps:Live-Run(Simulator)
* Screeps:Live-Run(PrivateServer)
* Screeps:Live-Run(ScreepsPLUS)

# Screeps Typescript Starter

Screeps Typescript Starter is a starting point for a Screeps AI written in Typescript. It provides everything you need to start writing your AI whilst leaving `main.ts` as empty as possible.

## Basic Usage

You will need:

 - [Node.JS](https://nodejs.org/en/download) (>= 8.0.0)
 - A Package Manager ([Yarn](https://yarnpkg.com/en/docs/getting-started) or [npm](https://docs.npmjs.com/getting-started/installing-node))
 - Rollup CLI (Optional, install via `npm install -g rollup`)

Download the latest source [here](https://github.com/screepers/screeps-typescript-starter/archive/master.zip) and extract it to a folder.

Open the folder in your terminal and run your package manager to install install the required packages and TypeScript declaration files:

```bash
# npm
npm install

# yarn
yarn
```

Fire up your preferred editor with typescript installed and you are good to go!

### Rollup and code upload

Screeps Typescript Starter uses rollup to compile your typescript and upload it to a screeps server.

Move or copy `screeps.sample.json` to `screeps.json` and edit it, changing the credentials and optionally adding or removing some of the destinations.

Running `rollup -c` will compile your code and do a "dry run preparing the code for upload but not actually pushing it. Running `rollup -c --dest main` will compile your code, and then upload it to a screeps server using the `main` config from `screeps.json`.

You can use `-cw` instead of `-c` to automatically re-run when your source code changes - for example, `rollup -cw --dest main` will automatically upload your code to the `main` configuration every time your code is changed.

Finally, there are also NPM scripts that serve as aliases for these commands in `package.json` for IDE integration. Running `npm run push-main` is equivalent to `rollup -c --dest main`, and `npm run watch-sim` is equivalent to `rollup -cw --dest sim`.

#### Important! To upload code to a private server, you must have [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth) installed and configured!

## Typings

The type definitions for Screeps come from [typed-screeps](https://github.com/screepers/typed-screeps). If you find a problem or have a suggestion, please open an issue there.

## Documentation

We've also spent some time reworking the documentation from the ground-up, which is now generated through [Gitbooks](https://www.gitbook.com/). Includes all the essentials to get you up and running with Screeps AI development in TypeScript, as well as various other tips and tricks to further improve your development workflow.

Maintaining the docs will also become a more community-focused effort, which means you too, can take part in improving the docs for this starter kit.

To visit the docs, [click here](https://screepers.gitbooks.io/screeps-typescript-starter/).

## Contributing

Issues, Pull Requests, and contribution to the docs are welcome! See our [Contributing Guidelines](CONTRIBUTING.md) for more details.
