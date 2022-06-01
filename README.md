# obs-disco
obs-disco is a web based stream overlay for OBS or StreamLabs. Objectively I'd like to has all expected events for streams mapped and setup.

## Setup
* Clone repository
    * ```git clone https://github.com/williamtober/obs-disco.git```
    * Add browser source in OBS or Streamlabs, select local file, and then select the index.html file in project directory
    * in the project directory ./js/index.js change the channelname to your twitch channel name.




### Resources
obs disco uses [twitch-js](https://github.com/twitch-js/twitch-js) and [nyan-cat](https://github.com/twitch-js/twitch-js) for functionality and testing purposes.

### MVP Goal
The minimum goal is to get chat working with the custom overlay.

### Forward Plan
Add custom event handler for multiple events i.e. subscriptions, follows, bit donations, hypetrains etc etc
