import { Outlet } from "react-router-dom";
import Header from "./header";

const MainPage = () => {
  return (
    <>
      <div className="min-h-full">
        <Header />
        <main>
          <div className="mx-auto max-w-2xl px-1 py-20 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8">
            {/* Your content */}
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export { MainPage };
