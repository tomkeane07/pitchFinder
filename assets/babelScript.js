//REACT COMPONENT
var Pitches = React.createClass({
    getInitialState: function(){
        return({
            pitches:[]
        })
    },

    render: function(){
        var pitches = this.state.pitches;
        pitches = pitches.map(function(pitch, index){
            //console.log(pitch.geometry.coordinates);
            var marker = L.marker(pitch.geometry.coordinates.reverse()).addTo(mymap);
            return(
                    <li key={index}>
                        <span className="name">{pitch.name}</span>
                        <span className="phone">{pitch.phone}</span>
                        <span className="dist">{Math.floor(pitch.dist.calculated/1000)} km</span>

                    </li>
                );
        });

        return(
            <div>
                <div id="pitch-container">     
                    <form id="search" onSubmit={this.getPitches}>
                        <label>Enter your Latitude:</label>
                        <input id="inLat" type="text" ref="lat" placeholder="latitude" required />
                        <label>Enter your Longitude:</label>
                        <input id="inLng" type="text" ref="lng" placeholder="longitude" required />
                        <input type="submit" value="Find Pitches" />
                    </form>
                    <button id="getLocation" onClick={this.getLocation}>provide your location</button>
               </div>
               <div>
                    <h1>add a pitch to our DB</h1> 
                    <form class="addPitch" onSubmit={this.AddPitch}>
                        <label>pitch</label>
                        <input name="name" type="text" ref="name" placeholder="name" required />
                        <label>phone</label>
                        <input name="phone" type="text" ref="phone" placeholder="phone"/><br/>
                        <label>Latitude:</label>
                        <input name="inLat" type="text" ref="alat" placeholder="latitude" required />
                        <label>Longitude:</label>
                        <input name="inLng" type="text" ref="alng" placeholder="longitude" required />
                        <input type="submit" value="Add Pitch" />
                    </form>
                </div>
                <ul>{pitches}</ul>
            </div>
        );
    },
    getPitches: function(e){
        e.preventDefault();
        var lng = this.refs.lng.value;
        var lat = this.refs.lat.value;
        mymap.setView([lat,lng],13)
        fetch('/api/pitches?lng=' + lng + '&lat=' + lat).then(function(data){
            return data.json();
        }).then( json => {
            this.setState({
                pitches: json
            });
            //console.log(json);
        });
    },



    AddPitch: function(e){
        e.preventDefault();
        var coord = [this.refs.alng.value,this.refs.alat.value];
        var name = this.refs.name.value;
        var phone = this.refs.phone.value;
        var data = {
            name: name,
            phone: phone,
            geometry: {
                type:"point",
                coordinates:coord
            }
        }
        console.log(data);
        
        $.ajax({
            type: "POST",
            url: "/api/pitches",
            data: JSON.stringify(data),
            contentType:"application/json"
        });
    },

    getLocation: function(){
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
});


ReactDOM.render(<Pitches/>, document.getElementById('pitches'));

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  inLat.value=crd.latitude;
  inLng.value=crd.longitude;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}




//leaflet map

var mymap = L.map('map').setView([53.3498, -6.2603], 10);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidG9ta2VhbmUwNyIsImEiOiJjazMwMDN1MjEwZHA0M29qd3Y0ZjFpNGx2In0.kZbdDU9R8BeKyDkMLctcbw'
}).addTo(mymap);



