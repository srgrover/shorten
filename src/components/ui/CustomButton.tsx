import { Button } from "flowbite-react";

interface Props {
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
    icon?: React.ReactNode;
    color?: string;
}

export const CustomButton = ({ className, onClick, children, icon, color }: Props) => {
    return (
        <Button
            color={ color }
            onClick={ onClick }
            className={`h-8 cursor-pointer flex gap-3 ${ className }`}>
            { icon && icon }
            { children }
        </Button>
    )
}