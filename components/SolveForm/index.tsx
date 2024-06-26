'use client'

import style from './style.module.scss'

import { useState, type FC, useEffect } from 'react'
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

  useEffect(() => {
    window.history.replaceState({}, '', '/')
  }, [])

  const renderAnswerButtons = (): JSX.Element => {
    switch (question.questionId) {
      case 2:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>영덕대게</Button>
            <Button onClick={onXClick}>물가자미</Button>
            <Button onClick={onXClick}>황금은어</Button>
            <Button onClick={onOClick}>아기상어</Button>
          </div>
        )
      case 4:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>컴퓨터응용기계과</Button>
            <Button onClick={onXClick}>글로벌용접과</Button>
            <Button onClick={onXClick}>정밀설계기계과</Button>
            <Button onClick={onOClick}>스마트모바일학과</Button>
          </div>
        )
      case 6:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>경주</Button>
            <Button onClick={onOClick}>울진</Button>
            <Button onClick={onXClick}>포항</Button>
            <Button onClick={onXClick}>청송</Button>
          </div>
        )
      case 8:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>산학일체형 도제학교</Button>
            <Button onClick={onOClick}>항공우주 진로캠프</Button>
            <Button onClick={onXClick}>스마트공장 거점학교</Button>
            <Button onClick={onXClick}>중소기업 인력양성 사업</Button>
          </div>
        )
      case 10:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>스마트기계과와 스마트용접과가 운영되고 있다.</Button>
            <Button onClick={onXClick}>스마트용접과가 있다.</Button>
            <Button onClick={onXClick}>신동중학교와 중고 병설 학교이다.</Button>
            <Button onClick={onOClick}>경북기계명장고등학교는 마이스터 고등학교이다.</Button>
          </div>
        )
      case 12:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>50m</Button>
            <Button onClick={onXClick}>100m</Button>
            <Button onClick={onOClick}>150m</Button>
            <Button onClick={onXClick}>200m</Button>
          </div>
        )
      case 14:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onOClick}>영천</Button>
            <Button onClick={onXClick}>김천</Button>
            <Button onClick={onXClick}>봉화</Button>
            <Button onClick={onXClick}>울릉도</Button>
          </div>
        )
      case 16:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onOClick}>조리과, 피부미용과</Button>
            <Button onClick={onXClick}>간호학과, 패션디자인과</Button>
            <Button onClick={onXClick}>동물자원학과, 축산가공학과</Button>
            <Button onClick={onXClick}>전기전자과, 기계과</Button>
          </div>
        )
      case 18:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>세무회계과, 경영금융과</Button>
            <Button onClick={onOClick}>세무회계과, 광고마케팅과</Button>
            <Button onClick={onXClick}>경영사무과, 광고마케팅과</Button>
            <Button onClick={onXClick}>경영사무과, 회계세무과</Button>
          </div>
        )
      case 20:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>맥북프로 무상대여</Button>
            <Button onClick={onXClick}>다양한 방과후 프로그램 무상지원</Button>
            <Button onClick={onXClick}>의성 전입 재학생 교복 무상지원</Button>
            <Button onClick={onOClick}>스쿨캠핑 무상지원</Button>
          </div>
        )
      case 22:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>15마리</Button>
            <Button onClick={onXClick}>16마리</Button>
            <Button onClick={onOClick}>17마리</Button>
            <Button onClick={onXClick}>18마리</Button>
          </div>
        )
      case 24:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onOClick}>라온(일식조리 동아리)</Button>
            <Button onClick={onXClick}>라따뚜이(서양조리 동아리)</Button>
            <Button onClick={onXClick}>빵긋빵긋(제과제빵 동아리)</Button>
            <Button onClick={onXClick}>파인카페(바리스타 동아리)</Button>
          </div>
        )
      case 26:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>도시공간디자인과</Button>
            <Button onClick={onXClick}>스마트전기전자과</Button>
            <Button onClick={onXClick}>유통마케팅과</Button>
            <Button onClick={onOClick}>화학공학과</Button>
          </div>
        )
      case 28:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>17%</Button>
            <Button onClick={onXClick}>37%</Button>
            <Button onClick={onXClick}>57%</Button>
            <Button onClick={onOClick}>77%</Button>
          </div>
        )
      case 30:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>소방안전과</Button>
            <Button onClick={onXClick}>스마트팩토리과</Button>
            <Button onClick={onXClick}>스마트모빌리티과</Button>
            <Button onClick={onOClick}>통과</Button>
          </div>
        )
      case 32:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>해바라기</Button>
            <Button onClick={onOClick}>장미</Button>
            <Button onClick={onXClick}>라벤더</Button>
            <Button onClick={onXClick}>개나리</Button>
          </div>
        )
      case 34:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>100년의 역사를 가지고 있다.</Button>
            <Button onClick={onXClick}>기숙사는 4개 동으로 이루어져 있다.</Button>
            <Button onClick={onXClick}>대강당의 이름은 누리관이다.</Button>
            <Button onClick={onOClick}>소강당의 이름은 누리관이다. </Button>
          </div>
        )
      case 36:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>금융비즈니스과</Button>
            <Button onClick={onXClick}>보건간호과</Button>
            <Button onClick={onXClick}>영유아보육과</Button>
            <Button onClick={onOClick}>K-POP 양성과</Button>
          </div>
        )
      case 38:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>세라믹시각디자인과</Button>
            <Button onClick={onXClick}>실내공간디자인과</Button>
            <Button onClick={onOClick}>산업디자인과</Button>
            <Button onClick={onXClick}>제품디자인과</Button>
          </div>
        )
      case 40:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>관광서비스과, 유튜브창업과</Button>
            <Button onClick={onXClick}>글로벌경영과, 스포츠마케팅과</Button>
            <Button onClick={onXClick}>유튜브창업과, IT융합정보과</Button>
            <Button onClick={onOClick}>스포츠마케팅과, 농생명공학과</Button>
          </div>
        )
      case 42:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>떡제조과</Button>
            <Button onClick={onXClick}>호텔조리과</Button>
            <Button onClick={onXClick}>중식조리과</Button>
            <Button onClick={onOClick}>카페베이커리과</Button>
          </div>
        )
      case 44:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>회계금융과</Button>
            <Button onClick={onXClick}>공공사무행정과</Button>
            <Button onClick={onXClick}>스마트마케팅과</Button>
            <Button onClick={onOClick}>디저트카페창업과</Button>
          </div>
        )
      case 46:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>전자회로설계전공</Button>
            <Button onClick={onOClick}>항공서비스전공</Button>
            <Button onClick={onXClick}>자동화시스템전공</Button>
            <Button onClick={onXClick}>로봇제어전공</Button>
          </div>
        )
      case 48:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>사무회계과</Button>
            <Button onClick={onXClick}>유통판매과</Button>
            <Button onClick={onXClick}>메타커머스과</Button>
            <Button onClick={onOClick}>테라리움과</Button>
          </div>
        )
      case 50:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>작년 개교 50년을 맞이하였다.</Button>
            <Button onClick={onXClick}>마이스터 고등학교 이다.</Button>
            <Button onClick={onOClick}>학급당 인원은 30명이다.</Button>
            <Button onClick={onXClick}>정밀기계과, 자동화시스템과, 전기전자과 3개 학과가 있다.</Button>
          </div>
        )
      case 52:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>화훼장식기능사</Button>
            <Button onClick={onXClick}>축산기능사</Button>
            <Button onClick={onXClick}>농기계정비기능사</Button>
            <Button onClick={onOClick}>식품기술사</Button>
          </div>
        )
      case 54:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>펫카페경영과</Button>
            <Button onClick={onXClick}>외식조리과</Button>
            <Button onClick={onXClick}>제과제빵과</Button>
            <Button onClick={onOClick}>스포츠학과</Button>
          </div>
        )
      case 56:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>문경공업고등학교의 학과는 4개이다.</Button>
            <Button onClick={onXClick}>문경공업고등학교를 졸업하면 취업을 다양하게 할 수 있다.</Button>
            <Button onClick={onOClick}>문경공업고등학교는 예체능학교이다.</Button>
            <Button onClick={onXClick}>문경공업고등학교는 남녀공학이다.</Button>
          </div>
        )
      case 58:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onOClick}>과정평가형 국가기술자격증</Button>
            <Button onClick={onXClick}>과정형평가 국가기술자격증</Button>
            <Button onClick={onXClick}>과정평가 국가기술자격증</Button>
            <Button onClick={onXClick}>과정사평가 국가기술자격증</Button>
          </div>
        )
      case 60:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>상산전자고등학교는 경북 상주시에 위치하고 있다.</Button>
            <Button onClick={onXClick}>현재 전자과, 전기제어과, 정밀기계과 3개과로 구성되어 있다.</Button>
            <Button onClick={onXClick}>2025년도에 이차전지응용과 신입생을 모집한다.</Button>
            <Button onClick={onOClick}>상산전자고등학교는 남학생 학교이다.</Button>
          </div>
        )
      case 62:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>5명</Button>
            <Button onClick={onXClick}>10명</Button>
            <Button onClick={onXClick}>15명</Button>
            <Button onClick={onOClick}>45명</Button>
          </div>
        )
      case 64:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>보건간호과</Button>
            <Button onClick={onXClick}>경영금융서비스과</Button>
            <Button onClick={onXClick}>카페경영과</Button>
            <Button onClick={onOClick}>기계공학과</Button>
          </div>
        )
      case 66:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>육군 – 차량정비</Button>
            <Button onClick={onXClick}>육군 - 자주포운용</Button>
            <Button onClick={onXClick}>해병 – 통신운용</Button>
            <Button onClick={onOClick}>해군 - 조리병</Button>
          </div>
        )
      case 68:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>드론전자과</Button>
            <Button onClick={onXClick}>드론전기에너지과</Button>
            <Button onClick={onXClick}>IT전자과</Button>
            <Button onClick={onOClick}>드론기계과</Button>
          </div>
        )
      case 70:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>철도운영정보과</Button>
            <Button onClick={onXClick}>철도차량기계과</Button>
            <Button onClick={onXClick}>철도전기신호과</Button>
            <Button onClick={onOClick}>철도우주항공과</Button>
          </div>
        )
      case 72:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>반도체시스템과</Button>
            <Button onClick={onXClick}>스마트그리드과</Button>
            <Button onClick={onXClick}>디지털인공지능과</Button>
            <Button onClick={onOClick}>항공전자과</Button>
          </div>
        )
      case 74:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>대구</Button>
            <Button onClick={onXClick}>구미</Button>
            <Button onClick={onXClick}>의성</Button>
            <Button onClick={onOClick}>안동</Button>
          </div>
        )
      case 76:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>웰빙조리과</Button>
            <Button onClick={onOClick}>글로벌토목과</Button>
            <Button onClick={onXClick}>스마트팩토리과</Button>
            <Button onClick={onXClick}>사물인터넷과</Button>
          </div>
        )
      case 78:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>구미</Button>
            <Button onClick={onXClick}>경주</Button>
            <Button onClick={onXClick}>포항</Button>
            <Button onClick={onOClick}>청송</Button>
          </div>
        )
      case 80:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>헤어미용</Button>
            <Button onClick={onXClick}>피부미용</Button>
            <Button onClick={onOClick}>화훼장식</Button>
            <Button onClick={onXClick}>메이크업</Button>
          </div>
        )
      case 82:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>포항보건고등학교는 남학생이 없다.</Button>
            <Button onClick={onOClick}>포항보건고등학교는 기숙사가 있다.</Button>
            <Button onClick={onXClick}>포항보건고등학교는 포항시 남구에 있다.</Button>
            <Button onClick={onXClick}>포항보건고등학교 하복은 분홍색이다.</Button>
          </div>
        )
      case 84:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>스마트전자과</Button>
            <Button onClick={onOClick}>이차전지과</Button>
            <Button onClick={onXClick}>산업디자인과</Button>
            <Button onClick={onXClick}>조리과</Button>
          </div>
        )
      case 86:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>재료기술과</Button>
            <Button onClick={onXClick}>자동화기계과</Button>
            <Button onClick={onXClick}>전기전자제어과</Button>
            <Button onClick={onOClick}>조리과</Button>
          </div>
        )
      case 88:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>50명</Button>
            <Button onClick={onXClick}>100명</Button>
            <Button onClick={onXClick}>150명</Button>
            <Button onClick={onOClick}>235명</Button>
          </div>
        )
      case 90:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>안동</Button>
            <Button onClick={onOClick}>영주</Button>
            <Button onClick={onXClick}>봉화</Button>
            <Button onClick={onXClick}>문경</Button>
          </div>
        )
      case 92:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>전교생 3주간 해외어학연수 실시</Button>
            <Button onClick={onXClick}>우수학생 유럽(독일)연수 실시</Button>
            <Button onClick={onXClick}>산업수요맞춤형 교육에 따른 상업계 베이스에 공학 및 영어교육 융합교육실시</Button>
            <Button onClick={onOClick}>기숙사 개인별 1인실 제공</Button>
          </div>
        )
      case 94:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>다양한 곤충</Button>
            <Button onClick={onXClick}>파충류, 절지동물 등의 특수동물</Button>
            <Button onClick={onOClick}>선반 밀링 기계</Button>
            <Button onClick={onXClick}>수직형 식물공장</Button>
          </div>
        )
      case 96:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onOClick}>싱가폴</Button>
            <Button onClick={onXClick}>프랑스</Button>
            <Button onClick={onXClick}>제주도</Button>
            <Button onClick={onXClick}>태국</Button>
          </div>
        )
      case 98:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>축산</Button>
            <Button onClick={onXClick}>식품</Button>
            <Button onClick={onOClick}>산림</Button>
            <Button onClick={onXClick}>수산</Button>
          </div>
        )
      case 100:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>스마트농업경영과</Button>
            <Button onClick={onXClick}>스마트기계산업과</Button>
            <Button onClick={onXClick}>베이커리카페경영과</Button>
            <Button onClick={onOClick}>스마트소프트웨어과</Button>
          </div>
        )
      case 102:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>23.1%</Button>
            <Button onClick={onXClick}>36.9%</Button>
            <Button onClick={onXClick}>44.5%</Button>
            <Button onClick={onOClick}>54.3%</Button>
          </div>
        )
      case 104:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>퀸</Button>
            <Button onClick={onOClick}>라온</Button>
            <Button onClick={onXClick}>로니</Button>
            <Button onClick={onXClick}>페니</Button>
          </div>
        )
      case 106:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>글로벌 해양강국을 이끌어가는 스마트 해양수산분야 영마이스터를 양성</Button>
            <Button onClick={onXClick}>2025학년도 모집인원은 전국단위 남·여학생 64명이다.</Button>
            <Button onClick={onOClick}>스마트양식과는 일반전형으로 32명을 모집한다.</Button>
            <Button onClick={onXClick}>입학전형에는 심층면접이 포함되어있다.</Button>
          </div>
        )
      case 108:
        return (
          <div className={style.multipleChoice}>
            <Button onClick={onXClick}>보건간호과</Button>
            <Button onClick={onOClick}>금융정보과</Button>
            <Button onClick={onXClick}>스마트웰빙과</Button>
            <Button onClick={onXClick}>건강코디네이터과</Button>
          </div>
        )
      default:
        return (
          <div className={style.buttons}>
            <Button onClick={onOClick}>
              O
            </Button>
            <Button onClick={onXClick} altColor>
              X
            </Button>
          </div>
        )
    }
  }

  return (
    <>
      <div className={style.solveForm}>
        <h2><span>{question.questionId}.</span> {question.questionContent}</h2>
        <Image src="/assets/characters/char2.svg" width={200} height={260} alt="" />
      </div>

      {renderAnswerButtons()}

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
