# Afose Cli - A registry component installer

This cli helps to install any registry component(s). This is born out of the need to install AccentureUI component and also shadcn-ui component but both were failing.

So, I build a minimalistic cli tool which can download the components and also install the dependencies.

## How to install

Install as follows:

```bash

npm install -g afose
```

After installation, run this command to ensure that you have the cli correctly installed on your machine:

```bash

afose version
```

## Usage of Afose cli

I wanna install 3d-spin component of accentureUI, the registry link is:

`https://ui.aceternity.com/registry/3d-pin.json`

```bash
afose add -r https://ui.aceternity.com/registry/3d-pin.json
```

This will check my setup and install it appropriately.

Happy Hacking!
