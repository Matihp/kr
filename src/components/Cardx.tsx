export default function Cardx({ children, noPadding }: { children: React.ReactNode, noPadding?: boolean }) {
    let styles="bg-white w-[200px] shadow-md shadow-gray-300 rounded-md mb-5"
    if(!noPadding){
      styles += " p-4"
    }
    return (
      <div className={styles}>
          {children}
      </div>
    )
  }