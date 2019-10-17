<script>
export default {
    name: 'User',
    data: () => ({
        isLoggedIn : 'false',
        userTypes : [
            { id: 0, type: 'Normal' },
            { id: 1, type: 'Accounting' },
            { id: 2, type: 'Admin' },
            { id: 3, type: 'Super Admin' }
        ],
        CurrentUserType : 0,
    })
}
</script>