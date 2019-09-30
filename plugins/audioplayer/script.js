`use strict`;

const data = [{
    title: "Yami New Forest Theme",
    composer: "Sassy Keys",
    company: "Tumultuous Productions",
    type: "mp3",
    src: "audio/Yami_New_Forest_Theme_Update.mp3"
},
{
    title: "Brother Sickness",
    composer: "Sassy Keys",
    company: "Tumultuous Productions",
    type: "mp3",
    src: "audio/Brotherly_Sickness_lilmix.mp3"
}]


const audioplayer_plugin = (document, srcElmt,data) =>{

    let player = function (){
        
        let _infoView;
        this.audioplayer;

        const init = ()=>{
            let _wrapper = document.createDocumentFragment();
            
            let _playListComponent = new PlayListComponent(data);

            this.audioPlayer = new AudioPlayerComponent(_playListComponent.playList);            
            _infoView = new infoBoxView(this.audioPlayer);

            this.audioPlayer.onSrcChange(handleSrcChange);
            _wrapper.appendChild(_infoView.getElement());
            _wrapper.appendChild(this.audioPlayer.getElement());    
            document.getElementById(srcElmt).appendChild(_wrapper);

            this.audioPlayer.start();

        }

        const handleSrcChange = (track)=>{
            _infoView.setInfo(track);
        }


        const ProgressBarComponent = function (){
            
            let _duration = 0;
            let _elmt = document.createElement('DIV');
            let _progressElmt = document.createElement('DIV');
            let _timerElmt = document.createElement('SPAN');

            //style span element
            _timerElmt.style.background ="transparent";
            _timerElmt.style.position = "absolute";
            _timerElmt.style.alignSelf = "center";

            _elmt.className = "progress-bar";
            _progressElmt.className = "progression";

            _elmt.appendChild(_progressElmt);
            _elmt.appendChild(_timerElmt);
            const _setDuration = (time)=>{
                _duration = time;
                _render(0);
            }
         
            const _render = (current) =>{  
                //Update progress
                _updateProgress(current);
                _timerElmt.innerHTML = `${_parseTime(current)}/${_parseTime(_duration)}`
            }

            const _updateProgress= (time) =>{
                let _width = time / _duration * 100;
                _progressElmt.style.width= _width + '%';
            }

            const _getElement = ()=>{
                return _elmt;
            }

            const _parseTime = (seconds)=>{
                return new Date(seconds * 1000).toISOString().substr(14,5);
            }

            const component = function (){
                this.getElement = _getElement;
                this.setDuration = _setDuration;
                this.render = _render;
            }
            return new component;   
        };

        const ProgressBarView = function (className = "progress-bar"){

            let _progress;
            let _elmt = document.createElement('DIV');
            let _progressElmt = document.createElement('DIV');
            let _className;
            _elmt.className = className;
            _progressElmt.className = "progression";
            _elmt.appendChild(_progressElmt);
        
            const _setProgress = (percentage)=> {
                _progress = percentage;
                _progressElmt.style.width = percentage + "%";
            }

            const _addEventListener = (event,cb) => {
                _elmt.addEventListener(event,cb);
            }
            const _getElement = ()=>{
                return _elmt;
            }

            //Set initial volume level
            _setProgress(_progress);
            const view = function () {
                this.setProgress = _setProgress;
                this.setEventListener = _addEventListener;
                this.getElement = _getElement;
                this.getProgress = ()=>{
                    return _progress;
                }
                this.setClass = (value)=>{
                    _className = value;
                }
            }
            
            return new view;        
        }


        const AudioComponent = function(){

            let _audio = document.createElement('AUDIO');
            _audio.autoplay = true;
            _audio.preload = "metadata";

            const _play = ()=>{
                return  _audio.play();
            }
            const _pause = ()=>{
                _audio.pause();
            }

            const _setAudioSource = (src)=>{
                _audio.src = src;
                _audio.load();
            }

            const _getElement = () =>{
                return _audio;
            }

            const component = function () {
                this.play = _play;
                this.pause = _pause;
                this.setAudioSource = _setAudioSource;
                this.getElement = _getElement;
            }

            return new component;
        }

        const AudioPlayerComponent = function (_srcList){
            
            let _isActive = false;
            let _elmt = document.createElement('DIV')
            let _progressBar = new ProgressBarComponent();
            let _volumeBar = new ProgressBarView("volume-bar");
            let _audio = new AudioComponent();
            let _track;
            let _srcIndex = 0;
            let _onSrcChange; //A callback function that happens on a src change.

            _elmt.className="audio-player";

            let _play = PlayerControlBtn("play_circle_filled", ()=>{
                _isActive = _audio.play();
                _render();
            });

            let _pause = PlayerControlBtn("pause_circle_filled", ()=>{
                _audio.pause();
                _isActive = !_isActive;
                _render();
            });

            let _prev = PlayerControlBtn("skip_previous", ()=>{
                _decSrc();
                _handleSrcChange(_srcList[_srcIndex]);
               _isActive = _audio.play();
               _render();
            });
            let _next = PlayerControlBtn("skip_next", ()=>{
                _incSrc();
                _handleSrcChange(_srcList[_srcIndex]);
                _isActive = _audio.play();
                _render();
            });

            const _handleSrcChange = (track)=>{
                _audio.setAudioSource(track.src);
                _track = track;
                if(_onSrcChange){
                    _onSrcChange(track);
                }
            }

            const _handleMuteToggle = (value)=>{
                if(value === "volume_off"){
                    _audio.getElement().volume = 0;
                }
                else if(value === "volume_up"){
                    _audio.getElement().volume = _volumeBar.getProgress() / 100;
                }
            }

            let _volumeBtn = new ToggableBtn(["volume_up","volume_off"],_handleMuteToggle);

            let _decSrc =()=>{
                if(_srcIndex - 1 >= 0){
                    _srcIndex--;
                }
                else{
                    _srcIndex = 0;
                }
            }

            let _incSrc = ()=>{
                if(_srcIndex + 1 < _srcList.length){
                    _srcIndex++;
                }
                else{
                    _srcIndex = _srcList.length - 1;
                }
            }

            let _setMetaData = (evt)=>{
                _progressBar.setDuration(evt.target.duration);
            }

            let _render = ()=>{
                _elmt.replaceChild((_isActive ? _pause : _play),_elmt.childNodes[1]);
            }

            const _updateBar = (evt) =>{
                _progressBar.render(evt.target.currentTime);
            }

            const _handleAdjustVolume = (evt)=>{
                if(_volumeBar.getProgress() === 0){
                    //Toggle mute
                    _volumeBtn.toggle();
                }

                let target = evt.currentTarget;
                let value = evt.offsetX;
                value = value / target.offsetWidth;
                _adjustVolume(value);

                if(value*100 > 0 && _volumeBtn.getState() === "volume_off"){
                    _volumeBtn.toggle();
                }

            }      
            const _adjustVolume = (value)=>{ 
                if(value >= .93){
                    value = 1;
                }else if(value <= .08){
                    value = 0;
                    //Change Volume Icon to muted
                    _volumeBtn.toggle();
                }
                _audio.getElement().volume = value;
                _volumeBar.setProgress(value*100);
            }

            _elmt.appendChild(_prev);
            _elmt.appendChild(_play);
            _elmt.appendChild(_next);
            _elmt.appendChild(_progressBar.getElement());
            _elmt.appendChild(_volumeBtn.getElement());
            _elmt.appendChild(_volumeBar.getElement());
            _elmt.appendChild(_audio.getElement());
            
            //Add a click listeners 
             _volumeBar.setEventListener('click',_handleAdjustVolume);

           

            //Set up listener for when metadata has been loaded.
            _audio.getElement().onloadedmetadata = _setMetaData;
            //Listener for when current track is finished
            _audio.getElement().onended = ()=>{
                _incSrc();
                _audio.setAudioSource(_srcList[_srcIndex].src);
            
            };

            //Set up listener for when time changes
            _audio.getElement().ontimeupdate = _updateBar;

            //Set starting volume;
            _adjustVolume(.30);

            const _start = ()=>{
                 //start the player
             _handleSrcChange(_srcList[_srcIndex]);
             let start = _audio.play();

            if (start !== undefined) {
                start.then(_ => {
                  // Autoplay started!
                  _isActive = true;
                  _render();
                }).catch(error => {
                  // Autoplay was prevented.
                  _isActive = false;
                  _render();
                });
              }
            }
              const component = function (){
                    this.getElement = ()=>{
                        return _elmt;
                    } 
                    this.getTrack = ()=>{
                        return _track;
                    }
                    this.onSrcChange = (cb)=>{
                        _onSrcChange = cb;
                    }
                    this.start = _start;
              }
            return new component;
        };

        const infoBoxView = function (track) {
            let _elmt = document.createElement('DIV');
            _elmt.className = "audio-info";

            let _title = document.createElement('SPAN');
            let _composer = document.createElement('SPAN');
            let _company = document.createElement('SPAN');

            _elmt.appendChild(_title);
            _elmt.appendChild(_composer);
            _elmt.appendChild(_company);

            const _setInfo = (track)=>{
                _title.innerHTML = track.title;
                _composer.innerHTML = track.composer;
                _company.innerHTML = track.company;
            }

            const view = function (){
                this.setInfo = _setInfo;
                this.getElement = ()=>{
                    return _elmt;
                }
            }

            return new view;
        }

        const PlayListComponent = function(data){

            this.playList = data.map((item)=>{
                return new PlayListItem(item);
            });

        

        }

        const PlayListItem = function(item){
            this.title = item.title;
            this.composer = item.composer;
            this.company = item.company;
            this.type = item.type;
            this.src = item.src;
            return this;
        }

        const PlayerControlBtn = (icon,onClick)=>{  
            let elmt = document.createElement('I');
            elmt.className = "material-icons";
            elmt.innerHTML = icon;
            elmt.addEventListener('click',onClick);
            return elmt;
        }

        const ToggableBtn = function (icons,onToggle){

            let _elmt = document.createElement('I');
            _elmt.className ="material-icons";
            let _index = 0;
            _elmt.innerHTML = icons[_index];
            const _toggle = ()=>{
                if(icons[_index+1]){
                    _index++;
                    _elmt.innerHTML = icons[_index];
                }else{

                    _index = 0;
                    _elmt.innerHTML = icons[_index];
                }
                onToggle(icons[_index]);
            }

            _elmt.addEventListener('click', _toggle)

            const component = function() {
                this.toggle = _toggle;
                this.getElement = ()=>{
                    return _elmt;
                }
                this.getState = () =>{
                    return icons[_index];
                }
            }
            return new component;
        }
        
        init();
    };

    return new player;
} 

//This is used to autostart the audio when it is able to.
let aplayer = audioplayer_plugin(document,"audio-plugin",data);
//  (function (){
//     const userInputEventNames = [
//         'click', 'contextmenu', 'auxclick', 'dblclick', 'mousedown',
//         'mouseup', 'pointerup', 'touchend', 'keydown', 'keyup'
//     ];

//     function addAudioPlayer(){

//         aplayer.audioPlayer.start();
//         userInputEventNames.forEach(eventName => {
//             document.removeEventListener(eventName, addAudioPlayer);
//           });

//     }

//     userInputEventNames.forEach(eventName => {
//         document.addEventListener(eventName, addAudioPlayer);
//       });

//  })();




