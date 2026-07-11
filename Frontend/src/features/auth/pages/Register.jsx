import { useNavigate, Link } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import LoadingSpinner from '../../../components/LoadingSpinner'

const Register = () => {

    
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { loading, handleRegister } = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate('/')
    }

    if (loading) {
        return <LoadingSpinner message="Creating your account..." />
    }

    return (
        <main>
            <div className="form-container">
                <h1>Sign Up</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id='username' name='username' placeholder='Enter email address' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id='email' name='email' placeholder='Enter email address' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Password</label>
                        <input onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id='password' name='password' placeholder='Enter password' />
                    </div>

                    <button className='button primary-button'>Register</button>

                </form>

                <p>Already have an account? <Link to={'/login'}>Login here</Link></p>
            </div>
        </main>
    )
}

export default Register