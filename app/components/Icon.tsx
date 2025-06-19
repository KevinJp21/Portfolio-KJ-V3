type IconProps = {
    name: string;
    className?: string;
  };
  
  export default function Icon({ name, className}: IconProps) {
    return (
      <svg className={className}>
        <use href={`/assets/Icons/Icons.svg?${Date.now()}#${name}`} />
      </svg>
    );
  }
  