import Header from "~/components/Layout/Components/Header";



function DefaultLayout({children}) {
    return (
        <div>
            <Header />
            
                <div className="content">
                    {children}
                </div>
            
        </div>
    )
}

export default DefaultLayout;