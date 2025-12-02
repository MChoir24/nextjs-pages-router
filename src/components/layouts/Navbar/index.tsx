import style from './Navbar.module.css';

export default function Navbar() {
  return (
    // <div className="flex w-full h-[70px] bg-black text-white items-center px-[5%]">
    <div className={style.navbar}>
      <h1>My Navbar</h1>
    </div>
  );
}