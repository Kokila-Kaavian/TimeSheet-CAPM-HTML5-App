import React, {useState} from "react";
import { Link, Outlet } from "react-router-dom";
import { Label } from '@ui5/webcomponents-react';

import './sidebar.css';

const Sidebar = () =>{
  const sidebarMenuDetails = [
		{'name':'My Profile', 'path': '/user/profile'},
		{'name': 'Time Entries', 'path': '/user'}
	]
	const [activeMenu, setActiveMenu] = useState(1);

    return(
        <div className="user-sidebar-main-container">
            <div className={`user-sidebar`}>
							<div className="user-sidebar-menus">
								{sidebarMenuDetails.map((menu, index)=>(
									<Link 
										key={menu['path']}
										to={menu['path']}
										onClick={()=>{
											setActiveMenu(index)
										}}
									>
									<Label className={`menu-label ${index === activeMenu ? 'active' : ''}`}>{menu['name']}</Label>
									</Link>
								))}
							</div>
            </div>
						<div className="component-container">
							<Outlet />
						</div>
        </div>
    )

}

export default Sidebar;