import { type SVGProps } from "react";
import { type IconName } from "@/types/name";

export { IconName };
export function Icon({
  name,
  className,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
}) {
  return (
    <svg
      {...props}
      className={`${className}`}
    >
      <use href={`/assets/Icons/sprite.svg#${name}`} />
    </svg>
  );
}