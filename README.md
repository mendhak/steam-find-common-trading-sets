A script to find common trading sets between two Steam profiles. This can be useful for helping with cross-trades, and quickly knowing which sets you and another person have in common. 


### Usage

Run using

    node findcommon.js 76561197984170060 76561197969177473


Substitute the values with your Profile ID and the other person's Profile ID.    
This script requires that both people have their inventory set to public. 

### Screenshot

Here's an example output

![screenshot](screenshot.png)


### Motivation
Sometimes I want to do a cross-set trade with another person on Steam.  It would help if I knew which sets are common between us, so that I can easily filter through their inventory without going through hundreds of pages.  

### TODO

- [ ] Make this a Docker container
- [ ] Show the items one per line within the cell
- [ ] Show the items alphabetically
- [X] Paging - some people will have more than 5000 items! 76561198129362520
