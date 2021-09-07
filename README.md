# Mega Man

<p align="center">
  <img src="docs/MegaMan.png" alt="Mega Man" height=250>
</p>

## Table of Contents
- [💭 Background](#-background)
- [🙌 Contributing](#-Contributing)
  * [Environment](#environment)
  * [New application](#new-application)
  * [Start](#start)

## 💭 Background
Mega Man is a Discord Bot to help facilitate and automate processes that go on
within The Robotics Club of Central Florida.  This is an open-source project
licenced under the MIT licence.

## 🙌 Contributing
When contributing to this project, you will need a few [prerequisite software](#environment) to collaborate and run Mega Man.  Vijay Stroup can help you with some of the
installation process if you are using a Unix/Linux environment; Window's users
will have to research on their own on how to get the required prerequisite software.

### Environment
- [git](https://nodejs.org/en/)
- [Node.js v16.6.0 or higher](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

It is recommended that you use a version manager with NodeJS as it is updated 
frequently.  A few of the more popular VMs for NodeJS are: [nvm](https://github.com/nvm-sh/nvm)
or [asdf](https://github.com/asdf-vm/asdf).  The difference is asdf comes with
much more stuff than just NodeJS.  Furthermore, when you install NodeJS, it comes
with npm.

### New application
0. Turn on Discord Developer in your account settings on Discord.  You can find 
this in User Settings > Advanced > Developer Mode.
1. Visit the [Discord Developer Portal](https://discord.com/developers/applications).
2. Create a New Application.  The name can be anything you want such as `Mega Man Dev`.
3. Take note of the `APPLICATION ID` on the General Information tab.  You will 
need this later to put in your `.env` file.
4. Go to the Bot tab and Add a new Bot.
5. Take note of the `TOKEN` on the Bot tab.  You will need this later to put in 
your `.env` file.
6. On the Bot tab > Privileged Gateway Intents, turn on both `PRESENCE INTENT`
and `SERVER MEMBERS INTENT`.
7. Go to the OAuth2 tab > OAuth2 URL Generator.  In the scopes, make sure you 
select `bot` **AND** `applications.commands`.
8. Scroll down to the Bot Permissions and select `Administrator`.
9. After step 8, take note of the URL you can copy in the scopes section, you
will copy this in a second to invite this application to your dev server.
10. Back in The Robotics Club of Central Florida Discord Server, there is a
server template you can create from for a dev server located in the pins of the 
resources channel in the Discord Team category.  Create a new server from this
template; it will come with all the channels and roles/permissions.
11. Now from step 9, copy and paste the URL in your web browser and invite the 
application you just made to the dev server you just made.

### Start
Before copying the following commands, it is highly recommended you use git with
ssh keys.  Information about doing this can be found [here](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) and this tutorial 
will assume this is your setup.  If you don't have a ssh key yet, you can find 
out how to make one [here](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

```
git clone git@github.com:RoboticsClubatUCF/MegaMan.git && cd MegaMan && npm i && cp .env.example .env
```

Now from [New Application](#new-application) step 3, copy your `APPLICATION ID` 
and set it to the value of `CLIENT_ID` in `.env` (ex `CLIENT_ID=12345678910`).  
Do the same thing for the `TOKEN` in step 5 of [New Application](#new-application)
and set it to the value of `TOKEN` in `.env` (ex `TOKEN=blahBlaHBlahHH8828.BlaH1.Blahahahahhahaha-BLAH-bb`).  

When making any changes, make sure you create a new branch and work on that 
branch only (**NOT the master branch**).  It is typical to name your branches
`name/feature` where name is your name and feature is what you are working on.
For instance, if Vijay Stroup was working on the /jointeam command, Vijay Stroup
would create a new branch called `vijaystroup/jointeam`.  If you need a refresher
on git, there are many resouces on YouTube, or you can ask in the Discord Team
channels.

When you make a new command, you need to register it with Discord.  To do so,
run:
```
npm run register
```

Then you can run the bot in dev mode:
```
npm run dev
```

When you feel you are done with your feature, make a pull request to the main 
branch and it will be reviewed, tested, and merged.