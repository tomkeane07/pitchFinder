function toggleMap() {
  $('#map').toggleClass("hide");
}

function AddPitch(e){
    e.preventDefault();
    var coord = [this.refs.alng.value,this.refs.alat.value];
    alert(this.refs.alng.value+" "+this.refs.alat.value)
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
}