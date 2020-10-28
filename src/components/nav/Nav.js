import './Nav.css'
import logo from '../nav/kochi-metro-500.jpg'; 

function Nav() {
    return (
        <div class="nav-bar">
            <div class="nav-add-icon">
                <img src = {logo} width="300" height="80" alt="nfhftuhj"/>
            </div>
            <div class="nav-kochi-metro"> KOCHI METRO</div>
        </div>

    )

}

export default Nav;