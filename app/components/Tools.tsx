export default function Tools({ name }: { name: string }) {
    const toolStyles: { [key: string]: string } = {
        Java: 'bg-[rgba(0,99,247,0.1)]',
        JavaScript: 'bg-[rgba(247,223,30,.9)]',
        PHP: 'bg-[rgba(122,134,184,.9)]',
        TypeScript: 'bg-[#262626]',
        React: 'bg-[#404756]',
        Remix: 'bg-[rgba(35,39,47,.9)]',
        NextJS: 'bg-[#171717]',
        TailwindCSS: 'bg-[#1E293B]',
        Angular: 'bg-[rgba(19,94,185,.2)]',
        ExpressJS: 'bg-[rgba(0,99,247,0.1)] dark:bg-[rgba(190,198,214,0.9)]',
        MySQL: 'bg-[rgba(190,198,214,0.9)]',
        GraphQL: 'bg-[#E1E4E8]',
        Shopify: 'bg-[rgba(38,38,38,1)]',
        Python: 'bg-[rgba(30,65,94,.9)]',
        TensorFlow: 'bg-[rgba(190,198,214,0.2)]',
        Keras: 'bg-[rgba(208,0,0,.7)]',
        NLTK: 'bg-[rgba(190,198,214,.9)]',
        SQLAlchemy: 'bg-[rgba(232,232,232,.9)]',
        Flask: 'bg-[rgba(232,232,232,.6)]',
        SciKitLearn: 'bg-[rgba(52,152,201,.6)]',
        Matplotlib: 'bg-[rgba(30,30,30,.8)]',
        Seaborn: 'bg-[rgba(232,232,232,.9)]',
        Pandas: 'bg-[rgba(34,40,50,.9)]',
        NumPy: 'bg-[rgba(232,232,232,.9)]',
        npm: 'bg-[rgba(232,232,232,.9)]',
        pnpm: 'bg-[rgba(232,232,232,.9)]',
        Git: 'bg-[rgba(240,240,232,.8)]',
    }
    return (
        <div className={`rounded-[1.25rem] relative overflow-hidden cursor-pointer group ${toolStyles[name]}`}>
            <img decoding="async" src={`/assets/Logos/${name}.webp`} alt={name} width={'200px'} height={'200px'} loading='lazy'
            className="h-full w-full p-2 object-contain rounded-[1.25rem]"
            />
            <div className="absolute text-[#000c] font-bold text-base w-full h-[24px] flex justify-center items-center bg-[#fff8] bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>{name}</span>
            </div>
        </div>
    );
}
