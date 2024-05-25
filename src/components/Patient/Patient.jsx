import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import React from "react";

function Patient(){
    return(
        <>
            <Header/>

            <div className="main d-flex">
                <div className="sidebarWrapper">
                    <Sidebar/>
                </div>


                <div className="right-content w-100">
                    <div className="row dashboardBoxWrapperRow">
                        <div className="col-md-9">
                            <div className="dashboardBoxWrapper d-flex">
                                <h1>Patient</h1>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </>
    );
}

export default Patient