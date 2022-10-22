import React from 'react';
import { useState ,useEffect} from 'react';
import { FaUser } from 'react-icons/fa';

function Register() {

const [formData, setFormData] = useState({
  name:'',
  email:'',
  password:'',
  confirmpassword:''
})

const { name, email, password, confirmpassword } = formData

const onChange = (e)=>{
  
  setFormData((prevState)=>({
       ...prevState,
       [e.target.name]: e.target.value,

  }))

}
const onSubmit = (e)=>{
  e.preventDefault()
}

  return <>
    <section className="heading">
      <h1>
        <FaUser /> Register
      </h1>
      <p>please create an account</p>
    </section>
    <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
             <input type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='enter name'
              onChange={onChange}/>
          </div>
          <div className='form-group'>
             <input type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='enter email'
              onChange={onChange}/>
          </div>
          <div className='form-group'>
             <input type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='enter password'
              onChange={onChange}/>
          </div>
          <div className='form-group'>
             <input type='password'
              className='form-control'
              id='name'
              name='confirmpassword'
              value={confirmpassword}
              placeholder='confirm password'
              onChange={onChange}/>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>submit</button>
          </div>
        </form>
    </section>
  </>
}

export default Register