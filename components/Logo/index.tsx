import Image from 'next/image'
import style from './style.module.scss'
import { type FC } from 'react'

export const Logo: FC = () => {
  return (
    <div className={style.logo}>
      <Image className={style.character} width={70} height={64} src="/assets/characters/char1.svg" alt="캐릭터 이미지"/>
      <div className={style.title}>
        <p className={style.top}>경상북도교육청</p>
        <p className={style.bottom}>직업교육박<span>람</span><span>회</span></p>
      </div>
    </div>
  )
}
