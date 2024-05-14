import * as FaIcons from "react-icons/fa";
import { SidebarData } from "./SidebarData";
import { Link } from "react-router-dom";

function Sidebar(props) {
  const { newItemCategory, setNewItemCategory } = props;

  return (
    <>
      <div>
        <nav className="nav-menu active">
          <ul className="nav-menu-items">
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link onClick={() => setNewItemCategory("")} to={item.path}>
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
