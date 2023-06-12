import style from './style.module.scss'
import { type FC, type ReactNode } from 'react'

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
  if (!isOpened)
    return <></>

  return (
    <div className={style.container}>
      <div onClick={onClose} className={style.background}></div>
      <div className={style.content}>
        <div className={style.card}>
          <div className={style.inner}>
            {children}
          </div>

          <button className={style.backBtn} onClick={onClose}>
            {backButtonLabel}
          </button>
        </div>
        <p className={style.notice}>{notice}</p>
      </div>
    </div>
  )
}
