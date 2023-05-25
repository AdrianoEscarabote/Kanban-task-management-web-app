import style from "./style.module.css"

const Preloader = () => {

  return (
    <div className={style.parent}>
      <div className={style.preloader}>
        <div className={style.loader}></div>
      </div>
    </div>
  )
}

export default Preloader