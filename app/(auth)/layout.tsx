import Image from 'next/image'
import Header from '@/components/ui/header'
import Illustration from '@/public/images/auth-illustration.svg'
import { UserProvider } from '@/context/UserContext'
import Footer from '@/components/ui/footer'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <UserProvider>
      <Header nav={true} />
      <main className="grow">
        <section className="relative">
          {/* Illustration */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
            <Image src={Illustration} className="max-w-none" priority alt="Page Illustration" />
          </div>
          {children}
        </section>
      </main>
      <Footer />
      </UserProvider>
    </>
  )
}
