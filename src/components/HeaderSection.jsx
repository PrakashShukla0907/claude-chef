import chefLogo from "../assets/chef-claude-icon1.png"
import "../styles/HeaderStyle.css"
export default function HeaderSection(){

 return (
  <header>
   <nav className="nav-container">
    <img src={chefLogo} alt="nav-logo" />
    <h1>Chef Claude</h1>
   </nav>
  </header>
 )
}