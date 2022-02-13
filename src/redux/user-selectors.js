export const requestUsers = (state) => {
    return state.usersPage.users
}

export const requestPageSize = (state) => {
    return state.usersPage.pageSize
}

export const requestTotalUserCount = (state) => {
    return state.usersPage.totalUserCount
}

export const requestCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const requestInProgress = (state) => {
    return state.usersPage.inProgress
}

export const requestFollowingProgress = (state) => {
    return state.usersPage.followingProgress
}