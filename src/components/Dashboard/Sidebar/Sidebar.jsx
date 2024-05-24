import Button from '@mui/material/Button';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { MdCalendarMonth } from "react-icons/md";
import { FaWheelchair } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import {Link} from "react-router-dom";

const  Sidebar = ()=>{
    return(
        <>
            <div className="sidebar">
                <ul>
                    <li>
                            <Button className="w-100">
                                <span className="icon"><LuLayoutDashboard/></span>
                                Dashboard
                            </Button>

                    </li>

                    <li>
                        <Button className="w-100">
                            <span className="icon"><MdCalendarMonth/></span>
                            Appointment
                            <span className="arrow"><FaAngleRight/></span>
                        </Button>
                    </li>

                    <li>
                        <Button className="w-100">
                            <span className="icon"><FaWheelchair/></span>
                            Patient
                            <span className="arrow"><FaAngleRight/></span>
                        </Button>
                    </li>

                    <li>
                        <Button className="w-100">
                            <span className="icon"><FaUserDoctor/></span>
                            Dentist
                            <span className="arrow"><FaAngleRight/></span>
                        </Button>
                    </li>

                    <li>
                        <Button className="w-100">
                            <span className="icon"><GrUserWorker/></span>
                            Staff
                            <span className="arrow"><FaAngleRight/></span>
                        </Button>
                    </li>
                </ul>
            </div>

        </>
    );
}

export default Sidebar
