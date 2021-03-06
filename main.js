
  let submission = document.getElementById('submission');

  function searchTracks() {
    let search = submission.value.toLowerCase();
    fetch('https://api.soundcloud.com/tracks?client_id=8538a1744a7fdaa59981232897501e04&q=' + search).then(function(res) {
      if(res.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + res.status);
        return
      }
      res.json().then(function(data) {
        for(i=0; i < data.length; i++) {
          if (data[i].artwork_url == null) {
             data[i].artwork_url = "record_placeholder.png";
          }
          document.getElementById('main-header').style.float = "left";
          document.getElementById('main-header').style.marginTop = "-7.5rem";
          document.getElementById('main-header').style.marginLeft = "4rem";
          document.getElementById('search').style.width = "40rem";
          document.getElementById('search').style.marginLeft = "35rem";
          document.getElementById('submission').style.display = "inline";
          document.getElementById('submission').style.width = "25rem";
          document.getElementById('submission').style.fontSize = "2.5rem";
          document.getElementById('submission').style.marginLeft = "-5rem";
          document.getElementById('submission').style.marginRight = ".7rem";
          document.getElementById('search-button').style.fontSize = "1.5rem";
          document.getElementById('resultsPlaceholder').style.marginTop = "5rem";
          let markup = `
            <div class="results">
              <img class="track-art" src="${data[i].artwork_url}">
              <p class="title">${data[i].title}</p>
              <p class="userName">${data[i].user.username}</p>
              <button id="play-button" value="${data[i].id}" onclick="playTrack()">Play</button>
            </div>
        `
        resultsPlaceholder.innerHTML += markup;
        }
      })
    })
  };

  /*Event Listener on Enter for searchTracks()*/
  submission.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("search-button").click();
    }
  });

  function playTrack() {
    let id = event.target.value;
    let clientID = '?client_id=8538a1744a7fdaa59981232897501e04';
    fetch('https://api.soundcloud.com/tracks/' + id + '/?client_id=8538a1744a7fdaa59981232897501e04').then(function(res) {
      if(res.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + res.status);
        return
      }
      res.json().then(function(data) {
        if (data.artwork_url == null) {
           data.artwork_url = "record_placeholder.png";
        }
        document.getElementById('player-name').innerHTML = data.title;
        document.getElementById('player-art').src = data.artwork_url;
        document.getElementById('music-player').src = data.stream_url + clientID;
      })
    })
  }
