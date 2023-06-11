import clsx from 'clsx'
import style from './style.module.scss'
import { type DetailedHTMLProps, type FC, type ButtonHTMLAttributes } from 'react'

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button: FC<Props> = (props) => {
  return (
    <button className={clsx(props.className, style.button)} {...props}>
      {props.children}
    </button>
  )
}
