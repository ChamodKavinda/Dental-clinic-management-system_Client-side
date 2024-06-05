import Button from '@mui/material/Button';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { MdCalendarMonth } from "react-icons/md";
import { FaWheelchair } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import {useNavigate} from "react-router-dom";


const  Sidebar = ()=>{

    const navigate = useNavigate();


    return(
        <>
            <div className="sidebar">
                <ul>
                    <li>
                            <Button className="w-100" onClick={()=> navigate('/dashboard')}>
                                <span className="icon"><LuLayoutDashboard/></span>
                                Dashboard
                            </Button>

                    </li>

                    <li>
                        <Button className="w-100" onClick={()=> navigate('/appointment')}>
                            <span className="icon"><MdCalendarMonth/></span>
                            Appointment
                            {/*<span className="arrow"><FaAngleRight/></span>*/}
                        </Button>
                    </li>

                    <li>
                        <Button className="w-100" onClick={()=> navigate('/patient')}>
                            <span className="icon"><FaWheelchair/></span>
                            Patient
                            {/*<span className="arrow"><FaAngleRight/></span>*/}
                        </Button>
                    </li>

                    <li>
                        <Button className="w-100" onClick={()=> navigate('/dentist')}>
                            <span className="icon"><FaUserDoctor/></span>
                            Dentist
                            {/*<span className="arrow"><FaAngleRight/></span>*/}
                        </Button>
                    </li>

                    <li>
                        <Button className="w-100" onClick={()=> navigate('/staff')}>
                            <span className="icon"><GrUserWorker/></span>
                            Staff
                            {/*<span className="arrow"><FaAngleRight/></span>*/}
                        </Button>
                    </li>
                </ul>
            </div>

        </>
    );
}

export default Sidebar
