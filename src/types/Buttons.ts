
export interface ButtonProps {
    disabled?: boolean,
    size?: 'large' | 'medium' | 'small',
    variant?: 'primary' | 'secondary',
    href?: string | null,
    to?: string | object | null,
    as?: 'button' | 'a',
    type?: 'button' | 'submit' | 'reset',
}