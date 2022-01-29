import React, { useRef, useState } from 'react';
import axios from 'axios';
import Giphy from './Giphy';

function ReactForm() {
  const [data, setData] = useState([]);
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      nameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
  };

  const handleReset = () => {
    nameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
  };

  const handleSearch = async (e) => {
    // log your value here
    try {
      const result = await axios('https://api.giphy.com/v1/gifs/search', {
        params: {
          api_key: process.env.React_APP_GIPHY_API,
          q: e.target.value,
          limit: 10
        }
      });
      setData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const debounce = (callback, delay) => {
    // add your debounce logic here
    setTimeout(callback, delay);
  };

  const debouncedSearch = (event) => debounce(handleSearch(event), 1000);

  const setNameInputFocus = (e) => {
    nameRef.current.focus();
  };

  const setEmailInputFocus = (e) => {
    emailRef.current.focus();
  };

  const setPasswordFocus = (e) => {
    passwordRef.current.focus();
  };

  return (
    <React.Fragment>
      <div>
        <p>part 1</p>
        <label>
          Name:
          <input placeholder='name' type='text' ref={nameRef} />
        </label>
        <label>
          Email:
          <input placeholder='email' type='text' ref={emailRef} />
        </label>

        <label>
          Password:
          <input placeholder='password' type='text' ref={passwordRef} />
        </label>
        <hr />
        <button onClick={setNameInputFocus}>Focus Name Input</button>
        <button onClick={setEmailInputFocus}>Focus Email Input</button>
        <button onClick={setPasswordFocus}>Focus Password Input</button>
        <hr />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <hr />
        <p>part 2</p>
        <label>
          Search:
          <input
            placeholder='search with debounce'
            type='text'
            onChange={debouncedSearch}
          />
        </label>
      </div>

      <div className='data-disply'>
        <Giphy items={data} />
      </div>
    </React.Fragment>
  );
}

export default ReactForm;
