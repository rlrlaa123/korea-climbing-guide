# Korea Climbing Guide (K-Climb Guide)

한국을 방문하는 **외국인 클라이머**를 위한 실내 암장 탐색 웹앱입니다.  
볼더링/리드 암장의 위치, 가격, 운영시간, 접근 팁을 빠르게 확인할 수 있습니다.  
브랜드명: **K-Climb Guide**

---

## 문제 (Problem)
외국인 방문객은 한국에서 **영어 기반 실내암장 정보**를 얻기 어렵습니다.  
위치, 1회권 가격, 장비 대여 여부, 난이도 체계 같은 기본 정보가 흩어져 있어 불편합니다.

## 해결책 (Solution / MVP)
- **암장 탐색 (핵심)**
  - 지도 및 리스트 (주소, 지하철역, 운영시간, 연락처)
  - **1회권·대여 정보** (신발/초크), 초보자 친화 여부
  - **난이도 체계 태그** (V스케일 / 폰테인블로 / 색깔)
  - 간단 팁: 혼잡 시간대, 초심자 주의사항

- **언어**
  - 영어 우선, 한국어 보조 → 필드 표준화

- **검색 필터**
  - 도시/지역, 유형(볼더/리드), 초보자 여부, 트레이닝 보드(Moon/Kilter/Tension)

## 부가 기능 (Secondary)
- **파트너 매칭 게시판** → 짧은 글 + 외부 연락처(WhatsApp/카카오톡)
- **이벤트 캘린더** → 대회, 모임, 원데이 클래스

## 제외 (현재 범위 밖)
- AI 챗봇/Q&A
- SNS형 팔로우/피드 기능

## 장기 로드맵
- **티켓/패스 연동**
  - 1회권/체험 수업 예약 링크
  - 체인 멤버십(멀티 지점 지원)
  - 신규 방문객 프로모션/번들
- 사진 포함 리뷰
- 다국어 확장 (영/한 → 일/중)
- 아웃도어 크랙 정보와 연동 (27Crags/Mountain Project)

---

## 데이터 모델 (초안)
- **gyms**: id, 이름, 도시, 주소, 위경도, 지하철역, 유형, 난이도체계, 보드, 1회권 가격, 대여 여부, 운영시간, 연락처, 웹/인스타, 비고  
- **events**: id, gym_id, 제목, 날짜/시간, 설명, 링크  
- **partner_posts**: id, gym_id, 실력, 시간대, 메모, 외부연락처  

---

## 참고 자료 (References)
- Mountain Project (한국 암장): https://www.mountainproject.com/gyms/south-korea  
- IndoorClimbing.com (한국 암장): https://www.indoorclimbing.com/southkorea.html  
- 27Crags (한국 개요): https://27crags.com/countries/korea-republic-of  
- 더 클라임 (체인): https://theclimb.co.kr/  
- 클라이밍파크 성수: [Instagram](https://www.instagram.com/p/C8_b3sdyN75/) | [Facebook](https://www.facebook.com/UnleashOutdoor/posts/climbing-park-seongsu-with-unleashclimbing_park_seongsua-climbing-gym-in-seongsu/288480304266569/)  
- Reddit 후기: [서울 암장](https://www.reddit.com/r/bouldering/comments/1itphw1/bouldering_gym_in_seoul/) | [한국 볼더링](https://www.reddit.com/r/bouldering/comments/1cs9u0b/south_korea_bouldering/)  
- 외국인/교포 커뮤니티: [Expat Kids Korea](https://expatkidskorea.com/listing/climbing-centers/) | [Angloinfo Seoul](https://www.angloinfo.com/seoul/directory/seoul-climbing-bouldering-735)  
- 로컬 앱: [올라(ALLA)](https://play.google.com/store/apps/details?id=com.hatchilab.allaapp) | [오클고](https://apps.apple.com/kr/app/%EC%98%A4%ED%81%B4%EA%B3%A0-%ED%81%B4%EB%9D%BC%EC%9D%B4%EB%B0%8D-%EA%B8%B0%EB%A1%9D-%EC%95%94%EC%9E%A5-%EC%A0%95%EB%B3%B4/id6479561592)  
- Patagonia 기사: https://www.patagonia.com/stories/long-live-the-dirtbag-dungeons/story-18035.html  

---