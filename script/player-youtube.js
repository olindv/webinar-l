let player;
const playerContainer = $('.player');
const volumeIcon = $('.player__volume-icon');

let eventsInit = () => {
  $('.player__start').click(e => {
    e.preventDefault();

    const btn = $(e.currentTarget);
    if (playerContainer.hasClass('paused')) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });
  
  $('.player__playback').click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const buttnoPositionPercent = clickedPosition / bar.width() * 100 - 1.5;
    const newPlaybackPosition = (player.getDuration() / 100) * buttnoPositionPercent;
    
    $('.player__playback-button').css({
      left: `${buttnoPositionPercent}%`
    });
    $('.player__playback').css({
      background: `linear-gradient(to right, #E01F3D  ${buttnoPositionPercent}%, #333 ${buttnoPositionPercent}%)`
    });
    
    player.seekTo(newPlaybackPosition);
  })
  $('.player__splash').click(e => {
    player.playVideo();
    
  })
  $('.player__volume').click(e => {
    const volume = $(e.currentTarget);
    const clickedPositionVolume = e.originalEvent.layerX;
    const volumePositionPercent = clickedPositionVolume / volume.width() * 100 - 10;
    
    $('.player__volume-button').css({
      left: `${volumePositionPercent}%`
    });
    $('.player__volume').css({
      background: `linear-gradient(to right, #E01F3D  ${volumePositionPercent}%, #333 ${volumePositionPercent}%)`
    });
    
    player.setVolume(volumePositionPercent);
  })
  $('.player__volume-icon').click(() => {
    if (player.isMuted()) {
      player.unMute();
      volumeIcon.removeClass('muted');
    } else {
      player.mute();
      volumeIcon.addClass('muted');
      $('.player__volume').css({
        background: `linear-gradient(to right, #E01F3D  0%, #333 0%)`
      });
      $('.player__volume-button').css('left','0%');
    }
  })  
  
  $('.player__splash').click(e => {
    player.playVideo();
    
  })
}

const formatTime = (timeSec) => {
  const roundTime = Math.round(timeSec); // округление до целого значения секунд
  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime - (minutes * 60));
  function addZero(num) {
    return num < 10 ?  `0${num}` : num;
  }
  
  return minutes + ':' + seconds;
} 

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();
  
  $('.player__duration-estimate').text(formatTime(durationSec));
  
  if (typeof interval != 'undefined') {
    clearInterval(interval);
  }
  
  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = completedSec/durationSec * 100 - 1.5;
    $('.player__playback-button').css({
      left: `${completedPercent}%`
    });
    $('.player__playback').css({
      background: `linear-gradient(to right, #E01F3D  ${completedPercent}%, #333 ${completedPercent}%)`
    });
    $('.player__duration-completed').text(formatTime(completedSec));
  }, 1000);
}

const onPlayerStateChange = event => {
  /*
  -1 – воспроизведение видео не началось
  0 – воспроизведение видео завершено
  1 – воспроизведение
  2 – пауза
  3 – буферизация
  5 – видео находится в очереди
 */

switch (event.data) {
  case 1:
    playerContainer.addClass('player--active');
    playerContainer.addClass('paused');
    break;
    
    
  case 2:
    playerContainer.removeClass('player--active');
    playerContainer.removeClass('paused');
    break;
}
}


function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '392',
    width: '662',
    videoId: '912LQ9meZCM',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}

eventsInit();