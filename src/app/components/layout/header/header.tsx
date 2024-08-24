import LoginBtn from "./login-btn";

export default function Header() {
  return (
    <header className="bg-slate-200 text-4xl">
      <div className="container flex items-center justify-between py-2">
        <h1 className="font-bold">Tech Path</h1>
        <LoginBtn />
      </div>
    </header>
  );
}
