export default function CreateLayout({
    children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <div className="min-h-screen bg-background m-5">
            {children}
        </div>
    </>
  )
}