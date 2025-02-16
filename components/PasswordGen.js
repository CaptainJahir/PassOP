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
  const [mixCaseCheck, setmixCaseCheck] = useState(false);
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
    if (mixCaseCheck) {
      if (lowerCheck && !upperCheck) {
        updatecharSet.push(upperAlpha);
      } else if (!lowerCheck && upperCheck) {
        updatecharSet.push(lowerAlpha);
      } else if (!lowerCheck && !upperCheck) {
        updatecharSet.push(lowerAlpha, upperAlpha);
      }
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
  }, [upperCheck, lowerCheck, mixCaseCheck, specialCharCheck, numbCheck]);

  //  this is for range input tag
  const [passLen, setpassLen] = useState(16);
  useEffect(() => {
    if (passLen < 4) setpassLen(4);
  }, [passLen]);

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
        pauseOnHover
        pauseOnFocusLoss
        draggable
        theme="colored"
      />
      <div
        className={`${passStrengthColor} w-3/4 mx-auto mt-10 flex justify-center items-center `}
      >
        {/* pass and Strength tag here */}

        <div className="h-[12rem] w-full rounded-sm flex flex-col justify-center items-center text-white">
          {/* password */}
          <div className="flex justify-center items-center pb-2 pl-4 border-b-[1px] border-b-white w-[70%]">
            <input
              type="text"
              className="text-3xl bg-transparent w-[90%] outline-none overflow-y-hidden h-[3rem]"
              readOnly
              ref={passValRef}
            />

            {/* copy and refresh buttons */}
            <div className="flex justify-center items-center gap-2">
              <Image
                src="/assets/refresh.png"
                height={36}
                width={36}
                priority={true}
                alt="refresh"
                className="invert cursor-pointer"
                onClick={() => generatedpass()}
              />
              <button
                className="bg-yellow-400 w-[7rem] h-[2rem] rounded-sm text-gray-600 font-semibold"
                onClick={() => {
                  copyBtn();
                }}
              >
                Copy
              </button>
            </div>
          </div>
          <div className="text-gray-700 text-lg font-medium flex justify-center items-center gap-1 mt-2">
            <Image
              src={StrengthImg}
              height={20}
              width={20}
              alt="strength status"
            />
            <span>{passStrength}</span>
          </div>
        </div>
      </div>

      <div className="bg-white h-[4rem]  w-[67%] mx-auto pt-5">
        <div className="text-lg text-gray-600 pl-[3rem]">
          Use the slider, and select from the options, below, to lengthen your
          password and strengthen your security.
        </div>
        {/* Range input and it's value */}
        <div className="flex justify-center flex-col gap-2 bg-white">
          <div className="text-gray-500 pl-[3rem] my-5">
            Password range (4-64)
          </div>
          <div className="flex flex-col justify-center items-center gap-2 w-full">
            <input
              type="range"
              min={0}
              max={64}
              value={passLen}
              onChange={(e) => setpassLen(e.target.value)}
              className="w-[80%] h-[1px]"
            />
            <div className="text-2xl text-gray-600 font-semibold">
              {passLen}
            </div>
          </div>
        </div>
        {/* input tags */}
        <div className="bg-white py-[2rem] text-lg text-gray-700 font-medium flex justify-center gap-5 items-center">
          <div className="flex justify-center items-center gap-1">
            <input
              type="checkbox"
              name="lowercase"
              id="lowercase"
              className="w-4 h-4 border-2 outline-none border-gray-400 rounded-sm checked:bg-blue-500 cursor-pointer"
              checked={lowerCheck}
              onChange={() => checkChange(lowerCheck, setlowerCheck)}
            />
            <label htmlFor="lowercase">Lower case</label>
          </div>

          <div className="flex justify-center items-center gap-1">
            <input
              type="checkbox"
              name="uppercase"
              id="uppercase"
              className="w-4 h-4 border-2 outline-none border-gray-400 rounded-sm checked:bg-blue-500 cursor-pointer"
              checked={upperCheck}
              onChange={() => checkChange(upperCheck, setupperCheck)}
            />
            <label htmlFor="uppercase">Upper case</label>
          </div>

          <div className="flex justify-center items-center gap-1">
            <input
              type="checkbox"
              name="mixedCase"
              id="mixedCase"
              className="w-4 h-4 border-2 outline-none border-gray-400 rounded-sm checked:bg-blue-500 cursor-pointer"
              checked={mixCaseCheck}
              onChange={() => checkChange(mixCaseCheck, setmixCaseCheck)}
            />
            <label htmlFor="mixedCase">Mixed case</label>
          </div>

          <div className="flex justify-center items-center gap-1">
            <input
              type="checkbox"
              name="spChar"
              id="spChar"
              className="w-4 h-4 border-2 outline-none border-gray-400 rounded-sm checked:bg-blue-500 cursor-pointer"
              checked={specialCharCheck}
              onChange={() =>
                checkChange(specialCharCheck, setspecialCharCheck)
              }
            />
            <label htmlFor="spChar">Special Characters</label>
          </div>

          <div className="flex justify-center items-center gap-1">
            <input
              type="checkbox"
              name="numbers"
              id="numbers"
              className="w-4 h-4 border-2 outline-none border-gray-400 rounded-sm checked:bg-blue-500 cursor-pointer"
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
