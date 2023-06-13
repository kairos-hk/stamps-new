'use client'
import Image from 'next/image'
import style from './style.module.scss'
import { useRef, type FC, type ReactNode } from 'react'

interface Props {
  children?: ReactNode
  isOpened?: boolean
  onClose?: () => any
  notice?: ReactNode
  backButtonLabel?: string
}

export const Modal: FC<Props> = ({
  isOpened = false,
  onClose = () => {},
  backButtonLabel = '돌아가기',
  children,
  notice
}) => {
  const emojiIndex = useRef(Math.floor(Math.random() * 7) + 1)

  if (!isOpened)
    return <></>

  return (
    <div className={style.container}>
      <div onClick={onClose} className={style.background}></div>
      <div className={style.content}>
        <Image className={style.emoji} width={59} height={40} src={`/assets/emojis/emoji${emojiIndex.current}.svg`} alt="" />
        <div className={style.card}>
          <div className={style.inner}>
            {children}
          </div>

          <button className={style.backBtn} onClick={onClose}>
            {backButtonLabel}
          </button>
        </div>
        {notice !== undefined &&
          <p className={style.notice}>{notice}</p>}
      </div>
    </div>
  )
}
