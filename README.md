A script to find common trading sets between two Steam profiles. This can be useful for helping with cross-trades, and quickly knowing which sets you and another person have in common. 


### Usage

Run using the Docker image:

    docker run --rm -t mendhak/steam-find-common-trading-sets 76561197984170060 76561197960340640

Run using the NodeJS script directly:

    node findcommon.js 76561197984170060 76561197969177473


Substitute the values with your Profile ID and the other person's Profile ID.    
This script requires that both people have their inventory set to public. 

### Screenshot

Here's an example output

![screenshot](https://raw.githubusercontent.com/mendhak/steam-find-common-trading-sets/master/screenshot.png)

Grayed out text = both users have it  
White text = the other user doesn't have it

### Motivation
Sometimes I want to do a cross-set trade with another person on Steam.  It would help if I knew which sets are common between us, so that I can easily filter through their inventory without going through hundreds of pages.  

### TODO

- [x] Make this a Docker container
- [X] Show the items one per line within the cell
- [X] Show the items alphabetically
- [X] Paging - some people will have more than 5000 items! 76561198129362520
