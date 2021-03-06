"use strict";
import { API_URL } from "../utils/server";
import { getUserSessionData } from "../utils/session.js";
import { RedirectUrl } from "./Router";

const myAccountPage = () => {
    console.log("MyAccountPage");
    let accountpage = `<main role="main" class="container p-5">

  <div id="user">
  

</main>

</html>
`;
    page.innerHTML = accountpage;
    userObj();

};

const userObj = () => {

    const user = getUserSessionData();

    fetch(API_URL + "users/useracc", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
                Authorization: user.token,
            },
        })
        .then((response) => {
            if (!response.ok)
                throw new Error(
                    "Error code : " + response.status + " : " + response.statusText
                );
            return response.json();
        })
        .then((data) => usercontainer(data.user))
        .catch((err) => onError(err));

};

const usercontainer = (data) => {
    if (!data) return;
    let userdata = `<br><br><br><br>
  <div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" alt="Image utilisateur" style=" width: 40%;
                            height: 100%;"/>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="profile-head">
                                    <h5>${data[0].fname} ${data[0].name}</h5>
                                    <h6> Membre  </h6>
                                    <p id="messageBoard"> </p> 
                                   
                                  <div id="buttonsdiv">   
                                    <button id="edit" type="button" class="btn btn-secondary">Modifier</button>

                                    <button id="deleteacc" type="button" class="btn btn-danger">Supprimer compte</button>
                                    <button id="deletedata" type="button" class="btn btn-danger">Supprimer mes donnees</button>
                                </div>
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item"><br>
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Mes infos</a>
                                </li>
                                <li class="nav-item"><br>
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Info channels</a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row">
                                            <div class="col-md-6"></div>
                                            <div class="col-md-6">
                                                <p>Email: ${data[0].email} </p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6"> 
                                            </div>
                                            <div class="col-md-6">
                                                <p>Prenom : ${data[0].fname}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                            </div>
                                            <div class="col-md-6">
                                                <p>Nom : ${data[0].name}</p>
                                            </div>
                                        </div>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="row">
                                            <div class="col-md-6"></div>
                                            <div class="col-md-6">
                                                <p>Nombre de channels : ${data[1]}</p>
                                            </div>
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>
                    `;

    userdata += ` </div>`;

    document.querySelector("#user").innerHTML = userdata;

    let deleteBtn = document.getElementById("deleteacc");
    let buttonsdiv = document.getElementById('buttonsdiv');

    deleteBtn.addEventListener("click", function() {
        buttonsdiv.innerHTML = `
    <button id="confirmation" type="button" class="btn btn-danger">Confirmer</button>
    <button id="abort" type="button" class="btn btn-success">Annuler</button>`
        let confirmationButton = document.getElementById("confirmation");
        confirmationButton.addEventListener("click", function() { RedirectUrl("/deleteaccount"); });

        let abortBtn = document.getElementById('abort');
        abortBtn.addEventListener("click", function() { RedirectUrl('/myaccount') });

    })

    let modifyBtn = document.getElementById("edit");
    modifyBtn.addEventListener("click", function onModify() {

        let updateUserData = `<br><br><br><br>
        <div class="container emp-profile">
                  <form method="put">
                      <div class="row">
                          <div class="col-md-4">
                              <div class="profile-img">
                                  <img src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" alt="Image utilisateur" style=" width: 40%;
                                  height: 100%;"/>
                              </div>
                          </div>
                          <div class="col-md-8">
                              <div class="profile-head">
                                          <h5>${data[0].fname} ${data[0].name}</h5>
                                          <h6>Membre</h6>
                                          <span id="messageBoard"></span>
                                            
                                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                                      <li class="nav-item"><br>
                                          <a class="nav-link active"  aria-selected="true">Veuillez entrer vos infos</a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-md-8">
                              <div class="tab-content profile-tab" id="myTabContent">
                                  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                              <div class="row">
                                                  <div class="col-md-6">  </div>
                                                  <div class="col-md-6">
                                                  <label>Prenom : </label>
                                                  <input type="text" id="fname" class="input-xlarge" required="" pattern="^([a-zA-Z]|\s)*$">
                                                  </div>
                                              </div>
                                              <div class="row">
                                                  <div class="col-md-6"> </div>
                                                  <div class="col-md-6">
                                                  <label>  Nom : </label>
                                                  <input type="text"  id="name" class="input-xlarge" required="" pattern="^([a-zA-Z]|\s)*$">
                                                  </div>
                                              </div>
                                              <div class="row">
                                                <div class="col-md-6"> </div>
                                                <button id="update" class="btn btn-primary">Update</button>
                                              </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      
                  </form>           
              </div>
              `
        updateUserData += ` </div>`;


        document.querySelector("#user").innerHTML = updateUserData;

        document.getElementById("update").addEventListener("click", onUpdateUser);

    })

    let deletedatabtn = document.getElementById("deletedata");
    deletedatabtn.addEventListener("click", function() {
        let msg = document.getElementById("messageBoard");
        msg.innerHTML = 'Vos donnees ont bien ete supprimes';
    });

};


const onUpdateUser = (e) => {
    console.log("dans OnUpdateuser");
    e.preventDefault();
    let fname = document.getElementById("fname").value;
    let name = document.getElementById("name").value;

    if (!fname || !name || !fname.match("^([a-zA-Z]|\s)*$") || !name.match("^([a-zA-Z]|\s)*$")) {
        document.getElementById("messageBoard").innerHTML = `Formulaire vide ou presence d'espaces.`
        return;
    }

    let newData = {
        fname: document.getElementById("fname").value,
        name: document.getElementById("name").value,
        username: getUserSessionData().username,
    };

    const user = getUserSessionData();

    fetch(API_URL + "users", {
            method: "PATCH", // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(newData), // body data type must match "Content-Type" header
            headers: {
                "Content-Type": "application/json",
                Authorization: user.token,
            },
        })
        .then((response) => {
            if (!response.ok)
                throw new Error("Error code : " + response.status + " : " + response.statusText);
            return response.json();
        })
        .then((data) => RedirectUrl("/myaccount"))
        .catch((err) => onError(err));
};


const onError = (err) => {
    let messageBoard = document.querySelector("#messageBoard");
    let errorMessage = "";
    if (err.message.includes("401")) errorMessage = "There is an error.";
    else errorMessage = err.message;
    messageBoard.innerText = errorMessage;
    messageBoard.classList.add("d-block");
};



export default myAccountPage;