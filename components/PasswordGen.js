"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";

const PasswordGen = () => {
  // pass gen characters
  const upperAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerAlpha = "abcdefghijklmnopqrstuvwxyz";
  const specialChar = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  const numbers = "1234567890";

  // checked state of all input tags
  const [lowerCheck, setlowerCheck] = useState(true);
  const [upperCheck, setupperCheck] = useState(false);
  const [specialCharCheck, setspecialCharCheck] = useState(true);
  const [numbCheck, setNumbCheck] = useState(false);

  // Changing all the input tags if checked
  const checkChange = (paramCheck, setparamCheck) => {
    setparamCheck(!paramCheck);
  };

  // appending all the checked elements into the array
  const [charSet, setcharSet] = useState([lowerAlpha, specialChar]);
  useEffect(() => {
    let updatecharSet = [];
    if (lowerCheck) {
      updatecharSet.push(lowerAlpha);
    }
    if (upperCheck) {
      updatecharSet.push(upperAlpha);
    }
    if (specialCharCheck) {
      updatecharSet.push(specialChar);
    }
    if (numbCheck) {
      updatecharSet.push(numbers);
    }
    if (JSON.stringify(charSet) !== JSON.stringify(updatecharSet)) {
      setcharSet(updatecharSet);
    }
  }, [upperCheck, lowerCheck, specialCharCheck, numbCheck]);

  //  this is for range input tag
  const [passLen, setpassLen] = useState(16);
    if (passLen < 4){
      setpassLen(4);
    }
 

  function passGen(passwordLength, charSet) {
    // const allcharSet = [upperAlpha, lowerAlpha, specialChar, numbers];
    const allcharSet = [...charSet];

    function ArrayShuffle(arr) {
      let n = arr.length;
      for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function randPass(passLength) {
      let finalPass = "";
      let finalPassArr = [];
      // shuffling the array
      let MixCharSet = ArrayShuffle(allcharSet);
      // filling every set of character
      for (let i = 0; i < MixCharSet.length; i++) {
        const charSet = MixCharSet[i];
        const randNumb = Math.floor(Math.random() * charSet.length);
        finalPassArr.push(charSet[randNumb]);
      }
      // filling remaining password
      MixCharSet = ArrayShuffle(MixCharSet);
      while (finalPassArr.length < passLength) {
        const charSelect = Math.floor(Math.random() * MixCharSet.length);
        const character = MixCharSet[charSelect];
        const randNumb = Math.floor(Math.random() * character.length);
        finalPassArr.push(character[randNumb]);
      }
      finalPassArr = ArrayShuffle(finalPassArr);
      finalPass = finalPassArr.join("");
      return finalPass;
    }
    return randPass(passwordLength);
  }

  // generating passwords
  const passValRef = useRef();
  const generatedpass = () => {
    if (charSet.length > 0) {
      passValRef.current.value = passGen(passLen, charSet);
    } else if (charSet.length == []) {
      toast.error("Input fields must not be empty");
    }
  };

  // generate password on page load

  useEffect(() => {
    generatedpass();
  }, []);

  // this is for bg color and img tags
  const [passStrength, setPassStrength] = useState("Bad Password");
  const [passStrengthColor, setPassStrengthColor] = useState("Green");
  const [StrengthImg, setStrengthImg] = useState("/assets/tick.png");

  useEffect(() => {
    if (passLen >= 4 && passLen <= 6) {
      setPassStrength("Bad Password");
      setPassStrengthColor("bg-[rgba(255,4,4,0.57)]");
      setStrengthImg("/assets/info.png");
    } else if (passLen > 6 && passLen <= 11) {
      setPassStrength("Weak Password");
      setPassStrengthColor("bg-[rgba(255,64,0,0.57)]");
      setStrengthImg("/assets/info.png");
    } else {
      setPassStrength("Strong Password");
      setPassStrengthColor("bg-[rgba(14,157,67,0.55)]");
      setStrengthImg("/assets/tick.png");
    }
  }, [passLen]);

  // copy button functionality for generated password

  const copyBtn = async () => {
    await navigator.clipboard.writeText(passValRef.current.value);
    toast.success("Password Copied Sucessfully");
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
        theme="colored"
      />
      <div
        className={`${passStrengthColor} w-3/4 mx-auto mt-10 flex justify-center items-center max-sm:w-full md:w-[90%] lg:w-[85%] xl:w-[80%]`}
      >
        {/* pass and Strength tag here */}

        <div className="h-[12rem] w-full rounded-sm flex flex-col justify-center items-center text-white">
          {/* password */}
          <div className="flex justify-center items-center pb-2 pl-4 border-b-[1px] border-b-white w-[70%] max-sm:w-[95%]">
            <input
              type="text"
              className="text-3xl bg-transparent w-[90%] outline-none overflow-y-hidden h-[3rem] max-md:text-xl max-sm:text-xl"
              readOnly
              ref={passValRef}
            />

            {/* copy and refresh buttons */}
            <div className="flex justify-center items-center gap-2 z-10">
              <Image
                src="/assets/refresh.png"
                height={36}
                width={36}
                alt="refresh"
                className="invert cursor-pointer max-md:h-6 max-md:w-6 max-sm:h-6 max-sm:w-6 z-10"
                onClick={() => generatedpass()}
                loading="lazy"
              />
              <button
                className="bg-yellow-400 w-[7rem] h-[2rem] rounded-sm text-gray-600 font-semibold dark:text-white max-md:hidden max-sm:hidden z-10"
                onClick={() => {
                  copyBtn();
                }}
              >
                Copy
              </button>
              <Image src="/assets/Copy.png" alt="copy" height={26} width={26} className="hidden max-md:block max-sm:block invert z-10" loading="lazy" onClick={() => {copyBtn();}}/>
            </div>
          </div>
          <div className="text-gray-700 text-lg font-medium flex justify-center items-center gap-1 mt-2">
            <Image
              src={StrengthImg}
              height={20}
              width={20}
              alt="strength status"
              className="dark:invert"
              loading="lazy"
            />
            <span className="dark:text-white">{passStrength}</span>
          </div>
        </div>
      </div>

      <div className="bg-white w-[67%] mx-auto pt-5 dark:bg-gray-900 max-sm:w-[100%] md:w-[86%] lg:w-[80%] xl:w-[75%]">
        <div className="text-lg text-gray-600 pl-[3rem] dark:text-white max-sm:text-center max-sm:pl-0 max-sm:text-base max-md:text-sm max-md:text-center max-md:px-0">
          Use the slider, and select from the options, below, to lengthen your
          password and strengthen your security.
        </div>
        {/* Range input and it's value */}
        <div className="flex justify-center flex-col gap-2 bg-white dark:bg-gray-900">
          <div className="text-gray-500 pl-[3rem] my-5 dark:text-white max-md:text-sm max-sm:text-sm">
            Password range (4-64)
          </div>
          <div className="flex flex-col justify-center items-center gap-2 w-full">
            <input
              type="range"
              min={0}
              max={64}
              value={passLen}
              onChange={(e) => setpassLen(e.target.value)}
              className="w-[80%] h-[1px] dark:h-[2px]"
            />
            <div className="text-2xl text-gray-600 font-semibold dark:text-white max-md:text-lg max-sm:text-lg">
              {passLen}
            </div>
          </div>
        </div>
        {/* input tags */}
        <div className="bg-white py-[2rem] text-lg text-gray-700 font-medium flex justify-center gap-5 items-center dark:bg-gray-900 dark:text-white max-sm:flex-col max-sm:items-start max-sm:ml-[6rem] max-sm:text-[1rem] max-md:grid max-md:grid-cols-2 max-md:mx-6 max-md:text-sm max-md:font-medium">
          <div className="flex justify-center items-center gap-1 max-md:justify-start max-sm:justify-start">
            <input
              type="checkbox"
              name="lowercase"
              id="lowercase"
              className="w-4 h-4 border-2 outline-none border-gray-400 rounded-sm checked:bg-blue-500 cursor-pointer max-md:h-3 max-sm:h-3"
              checked={lowerCheck}
              onChange={() => checkChange(lowerCheck, setlowerCheck)}
            />
            <label htmlFor="lowercase">Lower case</label>
          </div>

          <div className="flex justify-center items-center gap-1 max-md:justify-start max-sm:justify-start">
            <input
              type="checkbox"
              name="uppercase"
              id="uppercase"
              className="w-4 h-4 border-2 outline-none border-gray-400 rounded-sm checked:bg-blue-500 cursor-pointer max-md:h-3 max-sm:h-3"
              checked={upperCheck}
              onChange={() => checkChange(upperCheck, setupperCheck)}
            />
            <label htmlFor="uppercase">Upper case</label>
          </div>

          <div className="flex justify-center items-center gap-1 max-md:justify-start max-sm:justify-start">
            <input
              type="checkbox"
              name="spChar"
              id="spChar"
              className="w-4 h-4 border-2 outline-none border-gray-400 rounded-sm checked:bg-blue-500 cursor-pointer max-md:h-3 max-sm:h-3"
              checked={specialCharCheck}
              onChange={() =>
                checkChange(specialCharCheck, setspecialCharCheck)
              }
            />
            <label htmlFor="spChar">Special Characters</label>
          </div>

          <div className="flex justify-center items-center gap-1 max-md:justify-start max-sm:justify-start">
            <input
              type="checkbox"
              name="numbers"
              id="numbers"
              className="w-4 h-4 border-2 outline-none border-gray-400 rounded-sm checked:bg-blue-500 cursor-pointer max-md:h-3 max-sm:h-3"
              checked={numbCheck}
              onChange={() => checkChange(numbCheck, setNumbCheck)}
            />
            <label htmlFor="numbers">Numbers</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGen;
