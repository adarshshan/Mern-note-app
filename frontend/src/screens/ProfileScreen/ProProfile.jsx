import React, { useEffect, useState } from 'react'
import './ProfileScreen.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";

function ProProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pic, setPic] = useState('');

    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const updateUser = useSelector(state => state.updateUser);
    const { success } = updateUser;

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPic(userInfo.pic);
        } else {
            navigate('/')
        }

    }, [success]);
    return (
        <div class="page-content page-container" id="page-content">
            <div class="padding">
                <div class="row  d-flex justify-content-center">
                    <div class="col-xl-6 col-md-12">
                        <div class="card user-card-full">
                            <div class="row m-l-0 m-r-0">
                                <div class="col-sm-4 bg-c-lite-green user-profile">
                                    <div class="card-block text-center text-white">
                                        <div class="m-b-25">
                                            <img src={pic} class="img-radius" alt="User-Profile-Image" />
                                        </div>
                                        <h6 class="f-w-600">{name}</h6>
                                        <Link to='/update-image'>
                                            <small style={{ cursor: 'pointer' }}><CiEdit /> change pic</small>
                                        </Link>
                                        <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <div class="card-block pb-5 pt-5 py-5 shadow">
                                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                        <Link to='/update-name-email'>
                                            <p style={{ textAlign: 'right', fontSize: '20px' }}><CiEdit /></p>
                                        </Link>
                                        <div className='shadow p-4'>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Name</p>
                                                    <h6 class="text-muted f-w-400">{name}</h6>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Email</p>
                                                    <h6 class="text-muted f-w-400">{email}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-100">
                                            <Link to='/new-password'>
                                                <div className=" text-center change-btn">
                                                    change password
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProProfile
