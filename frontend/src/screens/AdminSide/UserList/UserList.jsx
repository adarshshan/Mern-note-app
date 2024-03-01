import React, { useLayoutEffect } from 'react'
import AdminUserCard from '../../../Components/admin/AdminUserCard'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserList } from '../../../actions/adminAction';
import ErrorMessage from '../../../Components/ErrorMessage';
import Loading from '../../../Components/Loading';

function UserList() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const adminLogin = useSelector((state) => state.adminLogin);
    const { adminInfo } = adminLogin;
    const getUserLis = useSelector(state => state.getUserList);
    const { loading, users, error } = getUserLis;
    useLayoutEffect(() => {
        dispatch(getUserList());
        if (!adminInfo) navigate('/admin-login');
    }, [adminLogin, dispatch]);
    return (
        <div class="container">
            <div class="main-body">

                <nav aria-label="breadcrumb" class="main-breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li class="breadcrumb-item"><a href="javascript:void(0)">User</a></li>
                        <li class="breadcrumb-item active" aria-current="page">User Grid</li>
                    </ol>
                </nav>
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {loading && <Loading />}
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gutters-sm">
                    {users?.map(user => {
                        return (
                            <AdminUserCard userDetail={user} key={user._id} />
                        )
                    })}
                    {/* <AdminUserCard />
                    <AdminUserCard />
                    <AdminUserCard />
                    <AdminUserCard />
                    <AdminUserCard />
                    <AdminUserCard />
                    <AdminUserCard />
                    <AdminUserCard /> */}

                </div>
            </div>
        </div>
    )
}

export default UserList
