function Login () {

    const googleLogin = () => {
        window.location.href = import.meta.env.VITE_BASEURL + import.meta.env.VITE_GOOGLE_PATH
    }

    return (
        <>
            <button onClick={googleLogin}>
                Login con Google
            </button>
        </>
    )
}

export default Login