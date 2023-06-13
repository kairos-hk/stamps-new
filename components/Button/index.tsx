'use client'

import clsx from 'clsx'
import style from './style.module.scss'
import { useRef, type DetailedHTMLProps, type FC, type ButtonHTMLAttributes } from 'react'
import Image from 'next/image'

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { altColor?: boolean }

export const Button: FC<Props> = (props) => {
  const emojiIndex = useRef(Math.floor(Math.random() * 7) + 1)

  return (
    <div className={clsx(style.container, (props.disabled ?? false) && style.disabled)}>
      <Image className={style.emoji} width={59} height={40} src={`/assets/emojis/emoji${emojiIndex.current}${props.altColor === true ? '-alt' : ''}.svg`} alt="" />
      <button className={clsx(props.className, style.button)} {...props}>
        {props.children}
      </button>
    </div>
  )
}
