const ToolBadge = ({ icon, name }: { icon: React.ReactNode; name: string }) => {
    // Objeto con las clases específicas para cada herramienta
    const toolStyles: { [key: string]: string } = {
        React: "bg-[#333] text-[#61dafb]",
        Remix: "bg-[#333] text-white [text-shadow:0_0_10px_#1174e4]",
        ExpressJS: "bg-[#010409] text-[#e6edf3]",
        PHP: "bg-[#777BB3] text-white",
        MySQL: "bg-[#00758F] text-[#e6edf3]",
        JavaScript: "bg-[#F7DF1E] text-black",
        TypeScript: "bg-[#c7c7c7] dark:bg-white text-[#007acc]",
        Python: "bg-[#1E415E] text-white",
        Flask: "bg-white text-[#2A2123]",
        TensorFlow: "bg-[#FAFAFB] text-[#425066]",
        SQLAlchemy: "bg-white text-[#D71F00]",
        Api_CB: "bg-[#777BB3] text-[#010409]",
        GraphQL: "bg-[#c7c7c7] text-[#E10098] dark:bg-white",
        Shopify: "bg-[#212326] text-white",
    };

    return (
        <li className={`place-content-center text-center rounded-[10px] h-[26px] ${toolStyles[name] || ''}`}>
            <span className="text-xs font-semibold flex items-center gap-[2px] h-full px-2 py-1">
                {icon && icon}
                {name}
            </span>
        </li>
    );
};

export default ToolBadge;
