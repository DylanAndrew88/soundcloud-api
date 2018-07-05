
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
          console.log(data[i].id);
          let markup = `
            <div class="results">
              <img class="track-art" src="${data[i].artwork_url}">
              <p class="title">${data[i].title}</p>
              <p class="userName">${data[i].user.username}</p>
              <button id="play-button" value="${data[i].id}" onclick="playTrack()">Play</button>
              <p class="track-id">${data[i].id}</p>
            </div>
        `
        resultsPlaceholder.innerHTML += markup;
        }
      })
    })
  };

  function playTrack() {
    let id = event.target.value;
    let clientID = '?client_id=8538a1744a7fdaa59981232897501e04';
    console.log(id);
    fetch('https://api.soundcloud.com/tracks/' + id + '/?client_id=8538a1744a7fdaa59981232897501e04').then(function(res) {
      if(res.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + res.status);
        return
      }
      res.json().then(function(data) {
        document.getElementById('player-name').innerHTML = data.title;
        document.getElementById('player-art').src = data.artwork_url;
        document.getElementById('music-player').src = data.stream_url + clientID;
      })
    })
  }
