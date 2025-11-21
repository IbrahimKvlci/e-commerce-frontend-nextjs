export default function Profile() {
    return (
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
            <div className="px-6 py-6">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                    <p className="text-sm text-gray-500">john.doe@example.com</p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">Kişisel Bilgiler</h3>
                            <p className="mt-1 text-sm text-gray-500">Kişisel bilgilerinizi buradan güncelleyin.</p>
                        </div>

                        <div className="sm:col-span-2">
                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Ad</label>
                                    <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border" placeholder="John" />
                                </div>

                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Soyad</label>
                                    <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border" placeholder="Doe" />
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-posta adresi</label>
                                    <input type="email" name="email" id="email" autoComplete="email" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border" placeholder="john.doe@example.com" />
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefon numarası</label>
                                    <input type="tel" name="phone" id="phone" autoComplete="tel" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border" placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3">
                            İptal
                        </button>
                        <button type="submit" className="bg-indigo-600 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Değişiklikleri Kaydet
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}