

let inputval = document.getElementById("input_value");

let username = document.getElementById("user_list");
firebase
  .database()
  .ref("post/")
  .on("child_added", (snapshot) => {
    const data = snapshot.val();
  var div1 = document.createElement("div")
  div1.setAttribute("class" , "div1")
  var div2 = document.createElement("div")
    var li = document.createElement("li");
    var textdata = document.createElement("span");
    textdata.setAttribute("class" , "_text")
    textdata.innerHTML = data.inputval;
    console.log(data);

    var editbtn = document.createElement("button");
    editbtn.innerHTML = "Edit";
    editbtn.setAttribute("class", "editbtn");

    editbtn.addEventListener("click", function () {
      var update = prompt("Update value", textdata.innerHTML);
      textdata.innerHTML = update;
      firebase
        .database()
        .ref("post/" +"comments/" + snapshot.key)
        .update({
          inputval: update,
        })
        .then((value) => {
          window.location.reload();
        })

        .catch((error) => {
          console.error("onRejected function called: " + error.message);
        });
    });

    var deledbtn = document.createElement("button");
    deledbtn.innerHTML = "Delete";
    deledbtn.setAttribute("class", "deltbtn");
    deledbtn.addEventListener("click", () => {
      firebase
        .database()
        .ref("post/" + snapshot.key)
        .remove()
        .then((res) => {
          window.location.reload();
        })

        .catch((error) => {
          console.error("onRejected function called: " + error.message);
        });
    });

    username.appendChild(li);
    li.appendChild(div1)
    li.appendChild(div2)
    div1.appendChild(textdata)
    div2.appendChild(editbtn)
    div2.appendChild(deledbtn)
  });

const addpost = (e) => {
  e.preventDefault()
  firebase.database().ref("post/").push({
    inputval: inputval.value,
  });

  document.getElementById("input_value").value = "";
  firebase
    .database()
    .ref("post/")
    .on("child_added", (snapshot) => {
      const data = snapshot.val();
    })


};

const removeAll=()=>{
  firebase
  .database()
  .ref("post/" )
  .remove()
  .then((res) => {
    window.location.reload();
  })

  .catch((error) => {
    console.error("onRejected function called: " + error.message);
  });
}