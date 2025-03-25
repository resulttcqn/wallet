import Sidebar from "./layouts/Sidebar";

export default function Layout({ children }) {
    return (
      <>
        <Sidebar/>
        <main className="bg-black min-h-screen">
          <div className="p-4 sm:ml-64">
              <div className="p-4 rounded-lg dark:border-gray-700">
                    {children}
              </div>
          </div>
        </main>
      </>
    );
  }
  


  