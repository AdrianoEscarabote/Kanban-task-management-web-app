import Image from "next/image"

const ButtonShowSideBar = () => {

  return (
    <button className="w-28 h-12 rounded-3xl absolute bottom-8 -left-14 bg-purple_Dark flex items-center justify-center">
      <Image className="ml-14 h-auto w-6" src="/assets/icon-show-sidebar.svg" width="26" height="20" alt="" />            
    </button>
  )
}

export default ButtonShowSideBar