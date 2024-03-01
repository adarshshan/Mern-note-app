import React from 'react'

function AdminUserCard({user}) {
    return (
        <div class="col mb-3">
            <div class="card">
                <img src="https://www.bootdey.com/image/340x120/FFB6C1/000000" alt="Cover" class="card-img-top" />
                <div class="card-body text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" style={{ width: '100px', marginTop: '-65px' }} alt="User" class="img-fluid img-thumbnail rounded-circle border-0 mb-3" />
                    <h5 class="card-title">John Doe</h5>
                    <p class="text-secondary mb-1">Full Stack Developer</p>
                    <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-light btn-sm bg-white has-icon btn-block" type="button"><i class="material-icons">add</i>Follow</button>
                    <button class="btn btn-light btn-sm bg-white has-icon ml-2" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></button>
                </div>
            </div>
        </div>
    )
}

export default AdminUserCard
