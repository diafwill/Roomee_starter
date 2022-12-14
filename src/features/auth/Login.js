import { useRef, useState, useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import companyLogo from '../auth/images/Rommee.png';
import GroupD from '../auth/images/GroupD.png';
import VectorR from '../auth/images/Vector.svg';
import EyeP from '../auth/images/eye.svg';

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({ user, pwd }).unwrap()

            dispatch(setCredentials({ ...userData, user }))
            setUser('')
            setPwd('')
            navigate('/welcome')
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }
    const [values, setValues] = useState({
        password: "password",
        showPassword: false,
      });
      
    const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
    };
    
    /* const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    } */
    const handleUserInput = (e) => setUser(e.target.value)

    const handlePwdInput = (e) => setPwd(e.target.value)
    

    const content = isLoading ? <h1>Loading...</h1> : (
        <div className="grids">
            <section className="gd1 ">
                <img className='logo' src={companyLogo} alt="logo"/>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <div className='login'>
                    <h1 className='titre__connecte'>Se connecter</h1>

                    <form onSubmit={handleSubmit}>
                        <div className='mail' >
                            <label htmlFor="username">Adresse mail:</label>
                            <input
                                type="text"
                                placeholder='exemple@mail.com'
                                id="username"
                                ref={userRef}
                                value={user}
                                onChange={handleUserInput}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className='pass'> 
                            <label htmlFor="password">Password:</label>
                            <Link className='forgot__pwd' to="/welcome"> Mot de passe oubli?? ?</Link>
                            <div class="input-icons">
                                <input
                                    type={values.showPassword ? "text" : "password"}
                                    placeholder='Entrez votre mot de passe'
                                    id="password"
                                    onChange={handlePwdInput}
                                    value={pwd}
                                    //value={values.password}
                                    required
                                />
                                <img className='pass__eye' id="show_password"  onClick={handleClickShowPassword} src={EyeP} alt="EyeP"/>
                            </div>
                        </div>
                        <div className='radio'> 

                            <input
                                type="checkbox"
                                placeholder='Entrez votre mot de passe'
                                id="password"
                                onChange={handlePwdInput}
                                value={pwd}
                                required
                            />
                            <label htmlFor="password">Rester connect??</label>
                        </div>
                        <button className='btn__connecter'>Se connecter</button>
                    </form>
                </div>
            </section>
            <section className="gd2">
                <img className='GroupD' src={GroupD} alt="GroupD"/>
                <img className='VectorR' src={VectorR} alt="VectorR"/>
            </section>

        </div>

        
    )

    return content
}
export default Login