import React from 'react';
import Header from "../Header";
import Sidebar from "./Sidebar/Sidebar";
import './dashboard.css';

function Dashboard() {
    return (
        <>
            <Header/>

            <div className="main d-flex">
                <div className="sidebarWrapper">
                    <Sidebar/>
                </div>


                <div className="right-content w-100">
                   <div className="row dashboardBoxWrapperRow">
                       <div className="col-md-10">
                           <div className="dashboardBoxWrapper d-flex">
                               <div className="dashboardBox">
                               </div>

                               <div className="dashboardBox">
                               </div>

                               <div className="dashboardBox">
                               </div>

                               <div className="dashboardBox">
                                </div>

                               <div className="dashboardBox">
                               </div>

                               <div className="dashboardBox">
                               </div>

                           </div>
                       </div>




                   </div>
                </div>
            </div>

        </>
    );
}

export default Dashboard;
