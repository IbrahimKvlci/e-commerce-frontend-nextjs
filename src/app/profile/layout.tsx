import Sidebar from "@/components/profile/Sidebar";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Hesap Ayarları</h1>
                    <p className="mt-2 text-sm text-gray-500">Profilinizi, siparişlerinizi ve tercihlerinizi yönetin.</p>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
                    {/* Sidebar Navigation */}
                    <aside className="py-6 lg:py-0 lg:col-span-3">

                        <Sidebar />
                    </aside>
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-9">
                        {children}
                    </div>
                </div>
            </div>
        </div >
    );
}