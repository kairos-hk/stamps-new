'use client'

import { useState, type FC, type ReactNode } from 'react'
import { Button } from '../Button'
import { Modal } from '../Modal'

interface Props {
  children?: ReactNode
  buttonLabel?: ReactNode
  notice?: ReactNode
  onClose?: () => void
}

export const ModalButton: FC<Props> = ({ notice, children, buttonLabel, onClose: onCloseFn }) => {
  const [isOpened, setIsOpened] = useState(false)

  const onOpen = (): void => {
    setIsOpened(true)
  }

  const onClose = (): void => {
    setIsOpened(false)
    onCloseFn?.()
  }

  return (
    <>
      <Button onClick={onOpen}>{buttonLabel}</Button>
      <Modal notice={notice} onClose={onClose} isOpened={isOpened}>
        {children}
      </Modal>
    </>
  )
}
