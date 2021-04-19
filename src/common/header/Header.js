import React, { useState} from "react";
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.svg';
import './Header.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


const TabContainer = function (props) {
    return (
    
    <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
        {props.children}
    </Typography>
    )
}



TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}


const Header = ( props ) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [usernameRequired, setUserNameRequired] = useState("dispNone");
    const [username, setUserName] = useState("");
    const [loginPasswordRequired, setLoginPasswordRequired] = useState("dispNone");
    const [loginPassword, setLoginPassword] = useState("");
    const [firstnameRequired, setFirstNameRequired ] =useState("dispNone");
    const [firstname, setFirstName] = useState("");
    const [lastnameRequired, setLastNameRequired] = useState("dispNone");
    const [lastname, setLastName] = useState("");
    const [emailRequired, setEmailRequired] = useState("dispNone");
    const [email, setEmail] = useState("");
    const [registerPasswordRequired, setRegisterPasswordRequired] = useState("dispNone");
    const [registerPassword, setRegisterPassword] = useState("");
    const [contactRequired, setContactRequired] = useState("dispNone");
    const [contact, setContact] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("access-token")== null ? false : true);
    const [loginError, setLoginError] = useState("");
    

	//This function will handle the modal component from Material-UI .
    const onModalClick = () => {
    
     
        setModalIsOpen(true);
        setValue(0);
        setUserNameRequired("dispNone");
        setUserName("");
        setLoginPasswordRequired("dispNone");
        setLoginPassword("");
        setFirstNameRequired("dispNone");
        setFirstName("");
        setLastNameRequired("dispNone");
        setLastName("");
        setEmailRequired("dispNone");
        setEmail("");
        setRegisterPasswordRequired("dispNone");
        setRegisterPassword("");
        setContactRequired("dispNone");
        setContact("");
    
    
    }


   const onCloseModal = () => {
        setModalIsOpen(false);
    }


    const onTabChange = (event, value) => {
        setValue(value);
      
    }


	// Login feature implementation
    const  onLoginClick = () => {

      
        username === "" ? setUserNameRequired("dispBlock") : setUserNameRequired("dispNone" );
        loginPassword === "" ? setLoginPasswordRequired("dispBlock") :setLoginPasswordRequired("dispNone");
        
        setLoginError("error");
        if(username === "" || loginPassword === "") return;     

    
        let dataLogin = null;
        fetch(props.baseUrl + "auth/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                Authorization: "Basic " + window.btoa(username + ":" + loginPassword)

            },
            body: dataLogin,
        })
        .then(async(response) => {
            if(response.ok){
                sessionStorage.setItem("access-token",response.headers.get("access-token"));
                 return response.json();
        } else{
            let error = await response.json();
            setLoginError(error.message);
            throw new Error("error");
            

        }
        })
        .then((data) => {
            sessionStorage.setItem("uuid", data.id);
            setLoggedIn(true);
            onCloseModal();

        }).catch((error) => {});
    };
    
    
    const  onUserNameInput = (e) => {
        setUserName( e.target.value);
    }

    
    const onInputLoginPasswordChange = (e) => {
        setLoginPassword(e.target.value);
    }


	//Register Feature implementation.
    const  onRegister = () => {

        setFirstName === "" ? setFirstNameRequired("dispBlock" ) : setFirstNameRequired("dispNone");
        setLastName === "" ? setLastNameRequired("dispBlock") : setLastNameRequired("dispNone");
        setEmail === "" ? setEmailRequired("dispBlock") : setEmailRequired("dispNone");
        setRegisterPassword === "" ? setRegisterPasswordRequired("dispBlock") : setRegisterPasswordRequired("dispNone");
        setContact === "" ? setContactRequired("dispBlock") : setContactRequired("dispNone");



        let dataSignup = JSON.stringify({
            email_address: email,
            first_name: firstname,
            last_name: lastname,
            mobile_number:contact,
            password: registerPassword
        });

        fetch(props.baseUrl + "signup",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                Authorization: "Basic" + window.btoa(username + ":" + loginPassword)

            },
            body: dataSignup,
        }).then((data) => {setRegistrationSuccess(true)});


    }

   
    const onInputFirstName = (e) => {
        setFirstName(e.target.value);
    }


    const onInputLastName = (e) => {
        setLastName( e.target.value);
    }


    const onInputEmail = (e) => {
        setEmail(e.target.value);
    }


    const onInputRegisterPassword = (e) => {
        setRegisterPassword(e.target.value);
    }

    
    const onInputContactChange = (e) => {
        setContact(e.target.value);
    }


    const logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");
        console.log(' reached here');
        setLoggedIn(false);
    }


return (
        
<div>
	<header className="header">
		<img src={logo} className="logo" alt="Movies App Logo" />
                {!loggedIn ?
                    
		<div className="loginButton">
			<Button variant="contained" color="default" onClick={onModalClick}>
                            Login
                        </Button>
		</div>
                    :
                    
		<div className="loginButton">
			<Button variant="contained" color="default" onClick={logoutHandler}>
                            Logout
                        </Button>
		</div>
                }
                {props.showBookShowButton === "true" && !loggedIn
                    ? 
		<div className="bookshow-button">
			<Button variant="contained" color="primary" onClick={onModalClick}>
                            Book Show
                        </Button>
		</div>
                    : ""
                }

                {props.showBookShowButton === "true" && loggedIn
                    ? 
		<div className="bookshow-button">
			<Link to={"/bookshow/" + props.id}>
				<Button variant="contained" color="primary">
                                Book Show
                            </Button>
			</Link>
		</div>
                    : ""
                }

            
	</header>
	<Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                contentLabel="Login"
                onRequestClose={onCloseModal}
                style={customStyles}
            >
		<Tabs className="tabs" value={value} onChange={onTabChange}>
			<Tab label="Login" />
			<Tab label="Register" />
		</Tabs>

                {value === 0 &&
                    
		<TabContainer>
			<FormControl required>
				<InputLabel htmlFor="username">Username</InputLabel>
				<Input id="username" type="text" username={username} onChange={onUserNameInput} />
				<FormHelperText className={usernameRequired}>
					<span className="red">required</span>
				</FormHelperText>
			</FormControl>
			<br />
			<br />
			<FormControl required>
				<InputLabel htmlFor="loginPassword">Password</InputLabel>
				<Input id="loginPassword" type="password" loginpassword={loginPassword} onChange={onInputLoginPasswordChange} />
				<FormHelperText className={loginPasswordRequired}>
					<span className="red">required</span>
				</FormHelperText>
			</FormControl>
			<br />
			<br />
                        {loggedIn === true &&
                            
			<FormControl>
				<span className="successText">
                                    Login Successful!
                                </span>
			</FormControl>
                        }
                        
			<br />
			<br />
			<Button variant="contained" color="primary" onClick={onLoginClick}>LOGIN</Button>
		</TabContainer>
                }

                {value === 1 &&
                    
		<TabContainer>
			<FormControl required>
				<InputLabel htmlFor="firstname">First Name</InputLabel>
				<Input id="firstname" type="text" firstname={firstname} onChange={onInputFirstName} />
				<FormHelperText className={firstnameRequired}>
					<span className="red">required</span>
				</FormHelperText>
			</FormControl>
			<br />
			<br />
			<FormControl required>
				<InputLabel htmlFor="lastname">Last Name</InputLabel>
				<Input id="lastname" type="text" lastname={lastname} onChange={onInputLastName} />
				<FormHelperText className={lastnameRequired}>
					<span className="red">required</span>
				</FormHelperText>
			</FormControl>
			<br />
			<br />
			<FormControl required>
				<InputLabel htmlFor="email">Email</InputLabel>
				<Input id="email" type="text" email={email} onChange={onInputEmail} />
				<FormHelperText className={emailRequired}>
					<span className="red">required</span>
				</FormHelperText>
			</FormControl>
			<br />
			<br />
			<FormControl required>
				<InputLabel htmlFor="registerPassword">Password</InputLabel>
				<Input id="registerPassword" type="password" registerpassword={registerPassword} onChange={onInputRegisterPassword} />
				<FormHelperText className={registerPasswordRequired}>
					<span className="red">required</span>
				</FormHelperText>
			</FormControl>
			<br />
			<br />
			<FormControl required>
				<InputLabel htmlFor="contact">Contact No.</InputLabel>
				<Input id="contact" type="text" contact={contact} onChange={onInputContactChange} />
				<FormHelperText className={contactRequired}>
					<span className="red">required</span>
				</FormHelperText>
			</FormControl>
			<br />
			<br />
                        {registrationSuccess === true &&
                            
			<FormControl>
				<span className="successText">
                     Registration Successful. Please Login!
                </span>
			</FormControl>
                        }
                        
			<br />
			<br />
			<Button variant="contained" color="primary" onClick={onRegister}>REGISTER</Button>
		</TabContainer>
                }
            
	</Modal>
</div>
)
}

export default Header;