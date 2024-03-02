import React from 'react'
import { CiEdit } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux'
import { MdDeleteOutline } from "react-icons/md";
import { deleteUser } from '../../actions/adminAction';
import { Link } from 'react-router-dom';

function AdminUserCard({ userDetail }) {

    const dispatch = useDispatch();

    const editHandler = (id) => {

    }
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure ?')) {
            dispatch(deleteUser(id))
        }
    }
    return (
        <div className="col mb-3">
            <div className="card">
                <img src="https://www.bootdey.com/image/340x120/FFB6C1/000000" alt="Cover" className="card-img-top" />
                <div className="card-body text-center">
                    <img src={userDetail.pic} style={{ width: '100px', height: '130px', marginTop: '-65px' }} alt="User" className="img-fluid img-thumbnail rounded-circle border-0 mb-3" />
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{userDetail.name}</h5>
                        <Link to={`/edit-user/${userDetail._id}`}>
                            <CiEdit />
                        </Link>
                    </div>
                    <div className="d-flex justify-content-between fw-bold">
                        <p className="text-secondary mb-1">{userDetail.email}</p>
                        <MdDeleteOutline onClick={() => deleteHandler(userDetail._id)} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminUserCard
