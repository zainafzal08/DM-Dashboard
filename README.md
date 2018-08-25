# DM Dashboard

A wonderful site to help you DM better!

# Setting up

1. install node package manager (npm)
2. cd into DM-dashboard
3. npm install (this will install all required dependencies)
4. npm run build (compiles the ES6 JS in `/src` into a bundle in `dist/assets/js`)

# structure

`/dist` Is the distribution site with css, html and bundled js
`/node_modules` js dependencies

`/src` ES6 Source files for website (standard js, no framework)
`/src/data` test json objects which will edventually be served by the backend
`/src/Character.js` Character object outlining stats etc.
`/src/index.js` entry and init code
`/src/PlayersDash.js` Object for rendering and keeping state of player card dashboard
`/src/Story.js` Object for rendering and keeping state of the story card
`/src/Terminal.js` Object for rendering and keeping state of the terminal
`/src/Tools.js` Various misc. tools including the Virtual Dom Node interface
`/src/test.js` a (too small) set of tests for the above files

`.babelrc` Config file for babel (compiles from ES6 js -> ES5)
`package.json` NPM information on what scripts/dependencies this project has
`webpack.config.js` config file for webpack (resolved dependency trees in `/src`)

# working

To open the frontend just open the file `dist/index.html` in a browser (chrome preferably)

> Note: The site is currently in alpha so only supports full screen view, mobile + responsive design elements are coming soon.

Whenever you make changes to the source js you have to build `npm run build` and refresh before the changes will register.

> hotloading coming soon. It's annoying to set up

# TODO

- finish character cards
  - add character/npc
  - left right keyboard arrow character cycle
  - swap out
  - full character cards
  - edit character
  - fix up save bs ability check modifier logic in character
- hot loading
- modal animations / general animations
- story live editing
  - update player colors (not arbitrary, iterate over current colour scheme shade wise)
- commands
  - look up command (for spells etc.)
  - command buttons
  - command to roll a check for a character which adds modifier automatically
    - roll dex save for Daniel big tits
- battle mode
- responsive
- server backend
- new campaign option + user state
  - honestly stick with username + password -> flask session cookie
  - oauth is too complex for a beta and it's always annoying to get working
- remove cross dependency (kinda ruins encapsulation) for playerDash <-> terminal


### Goal State: Playing
##### Adventure Phase

This is when your team is not in battle but interacting with the enviornment.
You have a couple of cards to interact with

> Story Card

This is a card that displays the current story notes, you can skip forward and back chapters. This isn't just text, it's a flavour of markown which lets you do cool things like give each NPC a color, highlight dialouge, bold and italisize things etc. For more information go to the dungeon down section.

You can edit it live as your players ruin your story by clicking on the pencil icon. A modal will pop up allowing you to make edits and then save.

> Command Card

This is a card where you can run commands such as rolling a set of dice to do a set of checks.
the following commands are supported

| Command | Description | Example |
| ------- | ----------- | ------- |
| `clear` | clears console | `clear` |
| `roll` or `r` | rolls a set of dice | `roll 5 d10` |
| `look up` | looks a spell or item up and displays info | `look up zone of truth`

Note you can navigate history via the up and and down arrows ;)

> NPC Card

This is a card outlining the current NPC's in view. You can edit this by clicking on the pencil icon to swap out / in any NPC's you want in view.

If you need a NPC to make a save or check you can simply use the buttons on the npc card to roll various checks and automatically add the relevant modifier.

Note for the purposes of this app a enemy _is_ a NPC

##### Goal State: Battle

This is composed of a set of enemy cards specifying the enemies in battle. You can use the text box at the bottom to quickly execute a set of commands.
I chose to build the battle engine like this rather then with buttons because it allows for quicker actions and also avoids the issue of having a 100 buttons on the dashboard.

| Command            | Example               | Description                |
| ------------------ | --------------------- | -------------------------- |
| `hit p x`          | `hit gunthur 10`      | hits gunthur for 10 damage |

... more to come


#### Tools

**Dungeon Down**

This is the special langauge you can write stories in so it comes up with colors and nice text details.

Lets start simple, to bold surround the text with two asterisks

```
*i am bolded!*
```

<b>i am bolded!</b>

To italicise surround it with underscores

```
_i am a whisper_
```

<i>i am a whisper</i>

And lastly if you want a seperator use

```
---
```

<hr>

OK but now we get into the fun stuff, anytime you mention a character surround the character with square braces as such

```
[brad]
```

And the character will have a colour assigned to them that's consistent across the document.

<span style="color:blue"><b>brad</b></span>

The cool thing is now if you have any dialouge it get's automatically highlighted and coloured, as long as you specify dialouge as such

```
[brad] "woah! dude! yikes!"
[sandy] "you said it fuckboy mcgee!"
```

<blockquote style="border-left-color: blue"><span style="color:blue"><b>brad: </b> woah! dudes! yikes!</span></blockquote>
<blockquote style="border-left-color: green"><span style="color: green"><b>Sandy: </b>you said it fuckboy mcgee!!</span></blockquote>

That is the charater name in square brackets, followed by the dialouge in double quotes.

You can change these colors from the default on the edit story screen.

Lastly if you want to have something such as "if the team makes decision A go to chapter 1 else go to chapter 4" you can use chapter links.

```
this is a chapter link to chapter 2 right here <2>
```
