import { type FC } from 'react'
import { TitleBar } from '../../components/TitleBar'
import style from './style.module.scss'
import RedirectButton from '../../components/RedirectButton'

const NoticePage: FC = () => {
  return (
    <main className={style.container}>
      <TitleBar>도움말</TitleBar>
      <div className={style.content}>
        <div>
          <h3>스탬프 투어 참여 방법</h3>
          <ol>
            <li>1층 학교(창업비즈쿨) 홍보관 찾아가기</li>
            <li>관심있거나 보고 싶은 학교 홍보부스 방문해 상담&체험하고 스탬프 받기</li>
            <li>
              스탬프 획득 후 직업교육홍보관(1층)에서 확인받고 <b>코인</b> 받기
              <ul><li>스탬프 5개당 <b>코인</b> 1개로 교환</li></ul>
            </li>
            <li>
              코인으로 신나는 게임 참여하기
              <ul>
                <li>친구와 함께 인생네컷 찍기</li>
                <li>꽝 없는 인형 뽑기</li>
                <li>두근두근 학교 홍보물 뽑기</li>
              </ul>
            </li>
            <li>많은 학교를 방문할수록 다양한 게임참여가 가능합니다.</li>
          </ol>
        </div>

        <div>
          <h3>보물찾기 참여 방법</h3>
          <ol>
            <li>
              박람회장 내 보물찾기용 배너를 찾기
              <ul><li>1층(2곳), 3층(3곳)</li></ul>
            </li>
            <li>
              배너 QR를 스캔하여 문제 풀기
              <ul><li>문제 힌트는 직업교육홍보관(1층) 앞 AI로봇, 키오스크, 학교 홍보부스에서 제공</li></ul>
            </li>
            <li>
              직업계고 O/X 문제 풀어 정답 시 1코인 획득
              <ul><li>코인 획득 후 5분간 참여 제한</li></ul>
            </li>
            <li>코인 획득 후 직업교육홍보관에서 확인받고 코인 받기</li>
            <li><b>코인</b>으로 신나는 게임(<i>인생네컷, 인형뽑기, 학교 홍보물 뽑기</i>) 참여하기</li>
          </ol>
        </div>
      </div>

      <div>
        <RedirectButton>
          시작하기
        </RedirectButton>
      </div>
    </main>
  )
}

export default NoticePage
