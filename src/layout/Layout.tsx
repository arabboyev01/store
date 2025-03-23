import Navbar from "./Navbar";

interface LayoutInterface {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutInterface) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </main>
            <footer className="bg-white border-t mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-gray-500">© 2025 ShopCatalog. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;