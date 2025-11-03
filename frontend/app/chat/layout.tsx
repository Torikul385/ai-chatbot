import LeftNav from "@/components/LeftNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex ">
        <div>
          <LeftNav />
        </div>
        <div className="w-full">
          <div className="">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
