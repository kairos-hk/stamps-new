'use client'

import style from './style.module.scss'

import { useState, type FC } from 'react'
import { type QuestionData } from '../../app/solvequiz/page'
import { Button } from '../Button'
import Image from 'next/image'
import { Modal } from '../Modal'
import { useRouter } from 'next/navigation'

interface Props {
  question: QuestionData
}

export const SolveFrom: FC<Props> = ({ question }) => {
  const router = useRouter()
  const [openCorrectModal, setOpenCorrectModal] = useState(false)
  const [openWrongModal, setOpenWrongModal] = useState(false)

  const onOClick = (): void => {
    if (!question.isCorrect) {
      setOpenWrongModal(true)
      return
    }

    setOpenCorrectModal(true)
    void markAsCorrect()
  }

  const onXClick = (): void => {
    if (question.isCorrect) {
      setOpenWrongModal(true)
      return
    }

    setOpenCorrectModal(true)
    void markAsCorrect()
  }

  const markAsCorrect = async (): Promise<void> => {
    await fetch('/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: question.questionId
      })
    })
  }

  return (
    <>
      <div className={style.solveForm}>
        <h2><span>{question.questionId}.</span> {question.questionContent}</h2>
        <Image src="/assets/characters/char2.svg" width={200} height={260} alt="" />
      </div>

      <div className={style.buttons}>
        <Button onClick={onOClick}>
          O
        </Button>
        <Button onClick={onXClick} altColor>
          X
        </Button>
      </div>

      <Modal
        isOpened={openCorrectModal}
        backButtonLabel="문제 목록으로 돌아가기"
        onClose={() => { router.replace('/quizs') }}>
        <div className={style.modalContent}>
          <Image alt="축하하는 굿자비" src="/assets/characters/char3.svg" width={191} height={161} />
          <h3><span>1</span>코인을 획득했어요</h3>
          <p>(장소)에서 코인으로 교환 받을 수 있어요</p>
        </div>
      </Modal>

      <Modal
        isOpened={openWrongModal}
        backButtonLabel="다른 문제 스캔"
        onClose={() => { router.replace('/quizscan') }}>
          <div className={style.modalContent}>
            <Image alt="졸고있는 굿자비" src="/assets/characters/char4.svg" width={191} height={161} />
            <h3>이런! 오답이에요</h3>
            <p>다시 시도해 보세요</p>
          </div>
      </Modal>
    </>
  )
}
