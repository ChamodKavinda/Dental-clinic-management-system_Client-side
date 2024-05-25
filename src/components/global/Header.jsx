import '../Styles.css';
import {Link, useNavigate} from "react-router-dom";
import teeth from '../../assets/teeth.png';
import { MdMenuOpen } from "react-icons/md";
import Button from "@mui/material/Button";
import SearchBox from "../SearchBox";
import { MdOutlineLightMode } from "react-icons/md";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


const Header = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();
    const handleLoginClick = path => {
        navigate(path);
    };

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
                        <Button className="rounded-circle mr-3" ><MdOutlineLightMode /></Button>



                        <div className="myAccWrapper">
                            <Button className="myAcc d-flex align-items-center" onClick={handleClick}>
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

                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> My account
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={() => handleLoginClick('/')}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>

                        </div>

                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;
