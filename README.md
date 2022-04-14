# Virtual-Bulletin

## Description

Use this app as a hub for research materials that you wish to share with a group or just keep in one location. Users are given the option to create groups and invite others to join. From there, a user can create bulletins to share with that group. Posts can be made to those bulletins the same way you would in the real world! 

[Virtual Bulletins](https://mysterious-meadow-53370.herokuapp.com/login)

To use the live app, simply follow the above link and create an account!

![screenshot of Bulletin](https://github.com/MaxFrank13/Virtual-Bulletin/blob/main/public/assets/images/sign-in-photo.PNG)

If you'd like to clone the repository and set it up for yourself, follow the directions below.

## Installation

  - Clone this repository to receive all of the files
   - Set up your environment variables in a .env file
   - Run "npm install" in the command line of your terminal to set up all of the dependencies
   - Initialize your database by running the "schema.sql" file with MySQL
   - There is no seed data provided for this app
   - Run "npm start" to start the application's connection
   - Go to the url of the application (http//:localhost:3001) and you'll see it running

## Using the app

### Create an account

Once you have the app running, you must first create an account. Your email won't be used for anything other than to uniquely identify you and send group invites. Once you have created an account, you will be brought to your dashboard.

### Personal Dashboard

This dashboard is your own personal hub that holds records of any groups you belong to and bulletins you have access to. Clicking on any of the group or bulletin tags will navigate you to the corresponding page.

![screenshot of Personal Dashboard](https://github.com/MaxFrank13/Virtual-Bulletin/blob/main/public/assets/images/dashboard-photo.PNG)

This is also where you can create your first group! You will need to create one before making any bulletins. Bulleins require a reference to the group it belongs to. So when creating a bulletin, you will need to also submit a group that you'd like it to belong to.

### Group Dashboard

![screenshot of Group Dashboard](https://github.com/MaxFrank13/Virtual-Bulletin/blob/main/public/assets/images/group-dashboard-photo.PNG)

This is the dashboard that is shared with a group. Each group dashboard has options to create bulletins, invite members, and check group settings. You can also navigate to any of the group's bulletins from this page.

![screenshot of Group Dashboard](https://github.com/MaxFrank13/Virtual-Bulletin/blob/main/public/assets/images/invitation-photo.PNG)

You can also see what role each member has for that group. In future development, a chat screen could be added here to improve collaboration and interactivity between users.

### Bulletin board

The bulletin board itself is the main attraction for this application. Users can place notes on the bulletin board in a similar way they would in person. Links and images can be attached to the posts. Posts can also be edited and deleted. 

![screenshot of Group Dashboard](https://github.com/MaxFrank13/Virtual-Bulletin/blob/main/public/assets/images/bulletin-photo.PNG)



## Future Development

There are responsivenes concerns with this application. The glaring issue is that the bulletin itself isn't mobile-friendly. That being said, it was never meant to be. This is supposed to replicate how someone would interact with a real bulletin board. Bulletin boards are supposed to be wide. When using one, you typically don't look at the whole thing at once. Instead, you are more likely to be "zoomed in" on certain parts of the bulletin. I'm not sure if anything should be done about this, but I wanted to address it here for reference.

As of April 14th, 2022, there are still many odds and ends that can be tied up to clean things up. One of which is ensuring users have the option to leave/delete groups, as well as removing bulletins when they're defunct or otherwise unused. A large poriton of the routes are in place for this, so it would mostly be work done on the FE.

Adding a chat box and/or messaging system would be helpful for this application and was in the original idea. 

The position of cards can be adjusted by clicking the board when in edit mode, however, this isn't the best user experience. Future development could be to make this drag-and-drop process smoother.








