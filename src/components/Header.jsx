import './Styles.css';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Link } from "react-router-dom";
import teeth from '../assets/teeth.png';
import { MdOutlineMenu } from "react-icons/md";
import { MdMenuOpen } from "react-icons/md";
import Button from "@mui/material/Button";
import SearchBox from "./SearchBox";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const Header = () => {
    return (
        <header className="d-flex align-items-center">
            <div className="container-fluid w-100">
                <div className="row d-flex align-items-center w-100">
                    <div className="col-sm-2 part1">
                        <Link to={'/dashboard'} className="d-flex align-items-center logo">
                            <img src={teeth} />
                            <span className="ml-2">Dental Pro Care </span>

                        </Link>
                    </div>
                    <div className="col-sm-3 d-flex align-items-center part2 pl-4">
                        <Button className="rounded-circle mr-3"><MdMenuOpen /></Button>
                        <SearchBox/>
                    </div>

                    <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
                        <Button className="rounded-circle mr-3"><MdOutlineLightMode /></Button>

                        <div className="myAccWrapper">
                            <Button className="myAcc d-flex align-items-center">
                                <div className="userImg">
                                <span className="rounded-circle">
                                    <img src="https://thumbs.dreamstime.com/z/unknown-male-avatar-profile-image-businessman-vector-unknown-male-avatar-profile-image-businessman-vector-profile-179373829.jpg?w=768" alt=""/>
                                </span>
                                </div>
                                <div className="userInfo">
                                    <h4>Kamal</h4>
                                    <p className="mb-0">kamal100@gmail.com</p>
                                </div>
                            </Button>
                        </div>

                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;
