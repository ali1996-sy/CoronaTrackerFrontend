let navBar = document.querySelector("#navBar");
import { getUserSessionData } from "../utils/session.js";
import MyImage from "../images/logo.png";
// destructuring assignment
const Navbar = () => {
    let navbar;
    let user = getUserSessionData();
    if (!user) { // pas connecte
        navbar = `<nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
      <a data-uri="/"><img src="${MyImage}" alt="CoronaTracker logo" style=" width: 90px;height: 90px;"></a>
        
    <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
    
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" data-uri="/">Accueil <span class="sr-only">(current)</span></a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link"  data-uri="/login">Login <span class="sr-only">(current)</span></a>
        </li>

        <li class="nav-item">
        <a class="nav-link"  data-uri="/register">Register <span class="sr-only">(current)</span></a>
        </li>
      </ul>
    </div>
  </nav>`;
    } else { //connecte
        navbar = `<nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
        <a data-uri="/"><img src="${MyImage}" alt="CoronaTracker logo" style=" width: 90px;height: 90px;"></a>

    <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" data-uri="/">Accueil <span class="sr-only">(current)</span></a>
        </li>
        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</a>
          <div class="dropdown-menu" aria-labelledby="dropdown01">
            <a class="dropdown-item" data-uri="/addChannel">Cree un channel<span class="sr-only">(current)</span></a>
            <a class="dropdown-item"  data-uri="/delchannel">Mes channels <span class="sr-only">(current)</span></a>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link"  data-uri="/myaccount">Mon Compte <span class="sr-only">(current)</span></a>
        </li>

        <li class="nav-item">
          <a class="nav-link"  data-uri="/logout">Logout <span class="sr-only">(current)</span></a>
        </li>
      </ul>
  </div>    
  </nav>`;
    }

    return (navBar.innerHTML = navbar);
};

export default Navbar;