import Image from "next/image"

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="flex min-h-screen">
        <section className="hidden w-1/2 bg-red p-10  items-center justify-center lg:flex xl:w-2/5">
            <div className="flex max-h-[800px] max-w-[430px] flex-col">
                <div className="flex justify-center">
                    <Image src="/logo.png" 
                        alt="logo" 
                        width={128} 
                        height={128} 
                        className="cursor-pointer 
                                   h-auto transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-2 hover:mb-4"/>
                </div>
            <div className="space-y-2 text-white">
                <h1 className="h1">Manage your files</h1>
                <p className="">Placeholder text, with some more text</p>
            </div></div>
        </section> 
        <section className="flex flex-1 flex-col items-center bg-white p-4 pt-10 lg:justify-center lg:p-10 lg:py-0">
            <div className="mb-16 lg:hidden">
                <Image src="/logo.png" 
                        alt="logo" 
                        width={128} 
                        height={128} 
                        className="cursor-pointer 
                                   h-auto transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-2 hover:mb-4"/>
            </div>
            {children}
        </section></div>
  )
}

export default Layout