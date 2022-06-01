const channel = "tobeythepancake";
const { Chat } = window.TwitchJs;
const app = document.getElementById("app");

app.innerHTML = ``;

const run = async () => {
    const chat = new Chat({
      username,
      token,
      log: { level: "warn" }
    });
  
    chat.on("*", (message) => {
      const time = new Date(message.timestamp).toTimeString();
      const event = message.event || message.command;
      const channel = message.channel;
      let msg = message.message || "";
      let background = '';
  
      try{
        if(message.tags.badges.broadcaster && message.tags.badges.broadcaster === true) {
          background = 'rgba(158, 24, 0, 1)'
        } else if(message.isModerator == true) {
          background = 'rgb(18, 112, 0, 1)'
        } else {
          background = 'rgba(0,0,0,0.8)'
        }
      } catch(e) {
        console.log('error : ', e)
      }
  
      let emotes = message.tags.emotes.map((emote) => {
        console.log('emote data : ', emote)
        return { string : msg.substring(emote.start, emote.end+1), element : `<img height='56px' width='56px' src="https://static-cdn.jtvnw.net/emoticons/v1/${emote.id}/1.0" />`}
      })
  
      console.log('emotes : ', emotes)
  
      for(let i = 0; i < emotes.length; i++) {
        console.log('replacing all :', emotes[i].string)
        msg = msg.replaceAll(emotes[i].string, emotes[i].element)
        console.log('msg after : ', msg)
      }
      // for(let i = 0; i < message.tags.emotes.length; i++) {
      //   let emote = `<img src="https://static-cdn.jtvnw.net/emoticons/v1/${message.tags.emotes[i].id}/1.0" />`
      //   console.log(emote)
      //   // replace where the emote is in the message
      //   let target = msg.slice(message.tags.emotes[i].start, message.tags.emotes[i].end);
      //   msg = msg.replaceAll(target, emote)
      //   console.log(msg)
        
      // }
  
      let globalNyanTime = false;
      if(message.message.toLowerCase().includes('!nyantime') && globalNyanTime == false) {
        console.log('nyantime hit')
        // ! .,__,.........,__,.....╭¬¬¬¬¬━━╮
        // ! `•.,¸,.•*¯`•.,¸,.•*|:¬¬¬¬¬¬::::|:^------^ 
        // ! `•.,¸,.•*¯`•.,¸,.•*|:¬¬¬¬¬¬::::||｡◕‿‿◕｡| 
        // ! -........--""-.......--"╰O━━━━O╯╰--O-O--╯
        let magicNumber = 5;
        let magicTotal = 0;
        
        for(let i = 0; i < magicNumber; i++ ) {
          magicTotal += 2500 * (i + 1)
          
          console.log('magic total : ', magicTotal)
          setTimeout(() => {
            document.body.innerHTML += `<div id='nyantime${i}' style="position: relative; z-index: 10; top:2%;">
            <div class="sparks-combo" >
              <div class="spark"></div>
              <div class="spark"></div>
              <div class="spark"></div>
              <div class="spark"></div>
            </div>
        
            <div id="wave-a" class="hot rainbow"></div>
            <div id="wave-a" class="cold rainbow"></div>
        
            <div id="wave-b" class="hot rainbow"></div>
            <div id="wave-b" class="cold rainbow"></div>
            <div>
              <div id="nyan-cat" class="frame1">
              
                <div id="tail"></div>
        
                <div id="paws"></div>
        
                <div id="pop-tarts-body">
                  <div id="pop-tarts-body-cream"></div>
                </div>
        
                <div id="head">
                  <div id="face"></div>
                </div>
            
              </div>
            </div>
          </div>`
          if(i == 4){
            document.body.innerHTML += `<audio id='nyanaudio' audio autoplay="true" loop="true">
                                          <source src="audio/nyan-cat.ogg" type="audio/ogg" />
                                          <source src="audio/nyan-cat.mp3" type="audio/mpeg" />
                                        </audio>`
          }
          }, 1500 * (i + 1))
        }
  
        setTimeout(() => {
          for(let i = 0; i < magicNumber; i++ ){
            setTimeout(() => {
              console.log(`removing nyan${i}`)
              let nyantarget = document.getElementById(`nyantime${i}`)
              nyantarget.remove()
              
              if(i == 4) {
                let target = document.getElementById(`nyanaudio`)
                target.remove()
                console.log('music removed')
                // * GLOBAL NYANTIME RESET SO THE NEXT PERSON CAN CALL NYAN
                globalNyanTime = false;
              }
              
            }, 2500 * (i + 1))
            
          }
        }, magicTotal)
        
      }
  
  
      console.log(message)
      if(message.username !== 'tmi.twitch.tv' && !message.username.includes('justinfan')){
          app.innerHTML += `<div style="margin: 0 0 10px 0; height: auto !important; width: 360px !important; background: ${background};  padding: 10px 5px 10px 20px; display: flex; flex-direction:row; flex-wrap: wrap;"><strong style="font-weight: 600;">${message.username} : </strong> ${msg}</div>`
      }
      
    });
  
    await chat.connect();
    await chat.join(channel);
  };
  
  run();
  