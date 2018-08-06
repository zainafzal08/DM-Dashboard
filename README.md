# DM Dashboard

A wonderful site to help you DM better!

>TODO

0. finish character cards
0.5. left right arrow character cycle
1. story live editing
2. look up command
3. command buttons
4. edit character / view full card
5. You can change these colors of characters from story eidt screen
6. chapter links have a tool tip
7. battle mode
8. clean up style/refactor (use format strings + semicolons)
9. improved watched interface

### Playing
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
| `help` | opens the console help diaouge |  `help` |
| `clear` | clears console | `clear` |
| `roll` or `r` | rolls a set of dice | `roll 5 d10` |
| `look up` | looks a spell or item up and displays info | `look up zone of truth`

Note you can navigate history via the up and and down arrows ;)

> NPC Card

This is a card outlining the current NPC's in view. You can edit this by clicking on the pencil icon to swap out / in any NPC's you want in view.

If you need a NPC to make a save or check you can simply use the buttons on the npc card to roll various checks and automatically add the relevant modifier.

You can also click on the plus icon to generate a random NPC card who you can tweek if you need a npc with a character sheet on the fly.

> Enemy Card

This is identical to the NPC card but details various enemies not in battle.

You can also generate enemies on the fly in the same way.

##### Battle phase

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
