# DM Dashboard

A wonderful site to help you DM better!

### Playing
##### Adventure Phase

This is when your team is not in battle but interacting with the enviornment.
You have a couple of cards to interact with

> Story Card

This is a card that displays the current story notes, you can skip forward and back chapters. This isn't just text, it's a flavour of markown which lets you do cool things like give each NPC a color, highlight dialouge, bold and italisize things etc. For more information go to the dungeon down section.

You can edit it live as your players ruin your story by clicking on the pencil icon. A modal will pop up allowing you to make edits and then save.

> Dice Card

This is a card with a set of dice you can roll to do various checks that arn't player related.

> NPC Card

This is a card outlining the current NPC's in view. You can edit this by clicking on the pencil icon to swap out / in any NPC's you want in view.

If you need a NPC to make a save or check you can simply use the buttons on the npc card to roll various checks and automatically add the relevant modifier.

You can also click on the plus icon to generate a random NPC card who you can tweek if you need a npc with a character sheet on the fly.

> Enemy Card

This is identical to the NPC card but details various enemies not in battle.

You can also generate enemies on the fly in the same way.

> Battle card

This is a card to let you start a battle and shift the dashboard into the battle phase. It takes in a initiative roll for all players who are involved (if a player is not involved don't give them a roll and they won't be put into the battle)

It also asks you to specify which enemies are involved. It will automatically roll initiative and put them into the order.

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
