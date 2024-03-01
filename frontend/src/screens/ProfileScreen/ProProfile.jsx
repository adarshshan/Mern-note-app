import React, { useEffect, useState } from 'react'
import './ProfileScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";

function ProProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pic, setPic] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPic(userInfo.pic);
        } else {
            navigate('/')
        }

    }, [])
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
                                        <small style={{ cursor: 'pointer' }}>change pic</small>
                                        <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <div class="card-block">
                                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <p class="m-b-10 f-w-600">Name</p>
                                                <h6 class="text-muted f-w-400">{name}</h6>
                                            </div>
                                            <div class="col-sm-6">
                                                <p class="m-b-10 f-w-600 mt-2"><MdEdit /></p>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-6">
                                                <p class="m-b-10 f-w-600">Email</p>
                                                <h6 class="text-muted f-w-400">{email}</h6>
                                            </div>
                                            <div class="col-sm-6">
                                                <p class="m-b-10 f-w-600 mt-3"><MdEdit /></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 text-center change-btn">
                                                change password
                                            </div>

                                        </div>

                                        <ul class="social-link list-unstyled m-t-40 m-b-10">
                                            <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                            <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                            <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                        </ul>
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
