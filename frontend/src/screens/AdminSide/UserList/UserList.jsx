import React, { useEffect, useLayoutEffect, useState } from 'react'
import AdminUserCard from '../../../Components/admin/AdminUserCard'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserList } from '../../../actions/adminAction';
import ErrorMessage from '../../../Components/ErrorMessage';
import Loading from '../../../Components/Loading';
import AdminHeader from '../../../Components/Header/AdminHeader';

function UserList() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const adminLogin = useSelector((state) => state.adminLogin);
    const userRegister = useSelector((state) => state.userRegister);
    const { adminInfo } = adminLogin;
    const { userInfo } = userRegister;
    const getUserLis = useSelector(state => state.getUserList);
    const { loading, users, error } = getUserLis;

    const deleteUse = useSelector(state => state.deleteUser);
    const { success: deleteSuccess, loading: deleteLoading, error: deletionError } = deleteUse;
    useEffect(() => {
        if (!adminInfo) navigate('/admin-login');
        dispatch(getUserList());
    }, [deleteSuccess, adminInfo, userInfo]);
    return (
        <>
            <AdminHeader setSearch={setSearch} />
            <div className="container">
                <div className="main-body">

                    <nav aria-label="breadcrumb" className="main-breadcrumb">
                        admin panal
                    </nav>
                    {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                    {deletionError && <ErrorMessage variant='danger'>{deletionError}</ErrorMessage>}
                    {loading && <Loading />}
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gutters-sm">
                        {users?.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).map(user => {
                            return (
                                <AdminUserCard userDetail={user} key={user._id} />
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserList
