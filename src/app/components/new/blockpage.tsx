import LoginBtn from "./login-btn";

export default function Blockpage() {
  return (
    <div className="min-h-[calc(100vh-60px-50px)] bg-yellow-300">
      <div className="container mx-auto flex justify-center">
        <div className="mt-10 w-[500px] rounded-sm bg-white p-3 md:px-10 md:py-5">
          <h2 className="mb-[15px] text-center">ボタンをクリックするとGitHubログイン画面に移行</h2>
          <LoginBtn />
        </div>
      </div>
    </div>
  );
}
