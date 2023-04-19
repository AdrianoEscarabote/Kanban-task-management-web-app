import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { rootState } from "@/redux/reduxTypes";
import { themeDark, themeLight } from "../../redux/theme/actions"
import Image from "next/image";

const InputToggle = () => {
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)

  const dispatch = useDispatch()

  const [isToggled, setIsToggled] = useState<boolean>(true)

  const handleToggleChange = () => {
    setIsToggled(!isToggled);
    theme === "light" ? dispatch(themeDark("dark")) : dispatch(themeLight("light"))
  };

  return (  

    <div className={`rounded-md w-64 h-12 flex items-center justify-center gap-5 ${theme === "light" ? "bg-almost_White" : "bg-almost_Dark"}`}>

      <Image src="/assets/icon-light-theme.svg" width="18" height="18" alt="" />

      <div className={`relative inline-block w-10 h-6 bg-purple_Dark rounded-full hover:bg-purple_Light`}>
       
        <label htmlFor="toggle" className="block w-full h-full cursor-pointer">
          
          <input
            type="checkbox"
            id="toggle"
            name="toggle"
            className="sr-only"
            checked={isToggled}
            onChange={handleToggleChange}
          />
          
          <div
            className={`absolute left-1 w-4 h-4 bg-white rounded-full top-1 transform transition-all duration-200 ${isToggled ? 'translate-x-4' : ''}`}
          >
          </div>
        </label>
      </div>

      <Image src="/assets/icon-dark-theme.svg" width="18" height="18" alt="" />

    </div>

  )
}

export default InputToggle