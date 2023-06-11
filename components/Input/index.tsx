import clsx from 'clsx'
import style from './style.module.scss'
import { type DetailedHTMLProps, type InputHTMLAttributes, type FC } from 'react'

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: FC<Props> = (props) => {
  return (
    <input {...props} className={clsx(props.className, style.input)} />
  )
}
