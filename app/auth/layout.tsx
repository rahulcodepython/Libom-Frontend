export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-12 items-center justify-center w-full h-screen">
            <div className="w-full max-w-lg">
                {children}
            </div>
        </div>
    );
}
