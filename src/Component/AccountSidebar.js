import { AccountSidebarData } from "./AccountSidebarData";
import { Link } from "react-router-dom";

function Sidebar(props) {
  return (
    <>
      <div>
        <nav className="nav-menu active">
          <ul className="nav-menu-items">
            {AccountSidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
