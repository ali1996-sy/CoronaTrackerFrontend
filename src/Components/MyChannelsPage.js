"use strict";
import { API_URL } from "../utils/server";
import { getUserSessionData } from "../utils/session.js";
let SearchBar= require("./SearchBar.js");

var etat = true;
let searchBar;
const MyChannelsPage = () => {
    console.log("MyChannelsPage");
    
    page.innerHTML=` <div id="page">
    
    
              <div id="searchBar"></div>
               <div id="tableau"></div>
        
    
  </div>
        
        <div id="tableau"></div>
          
            
              
                
  
  </html>

  
</div>`;
    searchBar = new SearchBar();

    channelList();

};

const channelList = () => {

    const user = getUserSessionData();

    fetch(API_URL + "channel/mychannels", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(user), // body data type must match "Content-Type" header
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
        .then((data) => channelListTable(data.tableau))
        .catch((err) => onError(err));

};

const channelListTable = (data) => {
    if (!data) return;
    console.log(etat);
    let tableau;

    if (etat) {
        tableau = `
    <div class="my-3 p-3 bg-white rounded box-shadow">
    <h6 class="border-bottom border-gray pb-2 mb-0">Mes Channels</h6>
    <div class="btn-group btn-group-toggle col-12 " data-toggle="buttons">
      <label class="btn  btn-primary col-6 active">
        <input type="radio" name="options" id="option1" autocomplete="off" checked data-uri="/">Channel ouvert</label>
      <label class="btn  btn-secondary  col-6">
        <input type="radio" name="options" id="option2" autocomplete="off" data-uri="/fermé">Channel fermé</label>
    </div>
  
  `;
    } else {
        tableau = `
      <div class="my-3 p-3 bg-white rounded box-shadow">
      <h6 class="border-bottom border-gray pb-2 mb-0">Mes Channels</h6>
      <div class="btn-group btn-group-toggle col-12 " data-toggle="buttons">
        <label class="btn  btn-secondary  col-6 active">
          <input type="radio" name="options" id="option1" autocomplete="off" >Channel ouvert</label>
        <label class="btn  btn-primary col-6">
          <input type="radio" name="options" id="option2" autocomplete="off" checked>Channel fermé</label>
      </div>
    `;

    }

    tableau += `
  <table class="table table-hover">
        <thead>
          <tr class="bg-primary">
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Region</th>
            <th scope="col">date</th>
            <th scope="col">Etat</th>
          </tr>
        </thead>
  <tbody>
  `;


    data.forEach((element) => {
        if (element.state == "ouvert" && etat) {
            tableau += `
    <tr data-id="${element.id}">
        
          <th scope="row">${element.id}</th>
          <td>${element.title}</td>
          <td>${element.region}</td>
          <td>${element.date}</td>
          <td>${element.state}</td>
          <td><button class="btn btn-danger delete">Delete</button></td>
    </tr> `;
        } else if (element.state == "ferme" && !etat) {
            tableau += `
    <tr data-id="${element.id}">
          <th scope="row">${element.id}</th>
          <td>${element.title}</td>
          <td>?</td>
          <td>${element.date}</td>
          <td>${element.state}</td>
          <td><button id="delete" class="btn btn-danger delete">Delete</button></td>
    </tr> `;
        }
    });




    tableau += ` </tbody>
      </table>
      </div>
  `;

    document.querySelector("#tableau").innerHTML = tableau;

    const deleteBtns = document.querySelectorAll(".delete");

    deleteBtns.forEach((deleteBtn) => {
        console.log('deletebouton nombre ' + deleteBtns);
        deleteBtn.addEventListener("click", onDelete);
    });


    let btnOpen = document.getElementById("option1");
    let btnClose = document.getElementById("option2");
    btnOpen.onclick = function() {
        console.log("oopen");
        inverseState(true);
        channelList();
    };
    btnClose.onclick = function() {
        console.log("cloose");
        inverseState(false);
        channelList();
    };
    document.getElementById("rechercher").onclick = function (e){
        onSearch(e);
      };

};
const onSearch = (e) =>{
    let titre = document.getElementById("titre").value;
    if(!titre){
      titre="*";
    }
    let region = document.getElementById("region").value;
    
 fetch(API_URL + "channel/"+titre+"/"+region, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return response.json();
    })
    .then((data) => channelListTable(data))
    .catch((err) => onError(err));

    let btnOpen = document.getElementById("option1");
    let btnClose = document.getElementById("option2");
    btnOpen.onclick = function() {
        console.log("oopen");
        inverseState(true);
        channelList();
    };
    btnClose.onclick = function() {
        console.log("cloose");
        inverseState(false);
        channelList();
    };

};

const onDelete = (e) => {
    // the id is given in the current table row under data-id attribute
    console.log('dans le onDelete');
    const channelid = e.target.parentElement.parentElement.dataset.id;
    const user = getUserSessionData();
    fetch(API_URL + "/channel/" + channelid, {
            method: "DELETE",
            headers: {
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
        .then((data) => MyChannelsPage())
        .catch((err) => onError(err));
};

const onError = (err) => {
    console.error("DelChannelPage::onError:", err);
    let errorMessage = "Error";
    if (err.message) {
        if (err.message.includes("401"))
            errorMessage =
            "The site has a little problem.";
        else errorMessage = err.message;
    }
};

function inverseState(state) {
    etat = state;
};




export default MyChannelsPage;