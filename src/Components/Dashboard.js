import { API_URL } from "../utils/server.js";

let creatBorad=()=>{
    let cont=[];
console.log("GET data");
   //fetch('https://data.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-pandemic-belgium-hosp-province%40public&sort=date&facet=date&facet=province&facet=region', {
   fetch(API_URL+"cases/", {
   method: "get",headers:{
      
    }}).then(response => response.json())
  .then(data => {data.board/* .records */.map(element => {cont.push({province: `${/* element.fields.province */element.province}`,'À l hôpital' :(/* element.fields .nr_reporting*/element["hôpital"]),'Cas Confirme' :(/* element.fields.new_in */element["CasConfirme"]),'Rétabli' :(/* element.fields. new_out*/element["Rétabli"])}) })
  make(cont)

})

function make(cont){
 let  board=document.getElementById("board");
 board.style.width = "1200px";
  board.style.height= "300px";
  board.style.border="2px solid";
  
  new Morris.Bar({
    // ID of the element in which to draw the chart.//
    element: 'board',
    fillOpacity: 4,
    data: cont,
    // The name of the data record attribute that contains x-values.
    xkey: `province`,
    // A list of names of data record attributes that contain y-values.
    ykeys: ['À l hôpital','Cas Confirme','Rétabli'],
    // Labels for the ykeys -- will be displayed when you hover over the
    labels: ['À l hôpital','Cas Confirme','Rétabli'],
    gridTextSize:8,
    gridTextWeight:540,
    gridTextColor:'white',
    barColors: ['orange','red',' rgb(34, 177, 77)',]
})

}}
export default creatBorad;