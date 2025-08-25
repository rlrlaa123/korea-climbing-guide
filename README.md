# Korea Climbing Guide (K-Climb Guide)

A lightweight web app for **international climbers visiting Korea** to quickly find indoor climbing gyms (bouldering/lead), prices, hours, and access tips.  
브랜드명: **K-Climb Guide**

---

## Problem
Foreign visitors struggle to discover **English-friendly** indoor climbing gyms in Korea with reliable info such as location, day pass prices, rental gear, and difficulty scales.

## Solution (MVP)
- **Gym Explorer (Core)**
  - Map & list of gyms (address, nearest subway, opening hours, contact)
  - **Day pass & rental info** (shoes/chalk), beginner-friendly flags
  - **Difficulty system tags** (V-scale / Font / Color)
  - Quick notes: “crowded hours”, “first-timer tips”

- **Language**
  - **EN first**, KR secondary; standardized fields

- **Filters**
  - City/area, discipline (Bouldering/Lead), beginner-friendly, training boards (Moon/Kilter/Tension)

## Secondary (Nice-to-have)
- **Partner posts** → short text post + external contact (WhatsApp/Kakao)
- **Events list** → comps, meetups, one-day classes

## Out of Scope (for now)
- AI Q&A / Chatbot
- Full social networking features

## Long-Term Roadmap
- **Ticket/Pass integration**
  - Day pass / intro class booking links
  - Chain memberships (multi-branch support)
  - Promo codes / newcomer bundles
- Rich reviews with photos
- Multi-language beyond EN/KR (JP/ZH)
- Outdoor crag gateway (27Crags/Mountain Project hand-offs)

---

## Data Model (draft)
- **gyms**: id, name, city, address, geo (lat/lng), subway_stop, disciplines, difficulty_system, boards, day_pass_price, rentals, hours, phone, site_url, instagram, notes  
- **events**: id, gym_id, title, date/time, brief, link  
- **partner_posts**: id, gym_id, level, time_slot, note, external_contact  

---

## References & Inspiration
- Mountain Project (Korea gyms): https://www.mountainproject.com/gyms/south-korea  
- IndoorClimbing.com (Korea gyms): https://www.indoorclimbing.com/southkorea.html  
- 27Crags (Korea overview): https://27crags.com/countries/korea-republic-of  
- The Climb (multi-branch chain): https://theclimb.co.kr/  
- Climbing Park Seongsu (FB/IG): [Instagram](https://www.instagram.com/p/C8_b3sdyN75/) | [Facebook](https://www.facebook.com/UnleashOutdoor/posts/climbing-park-seongsu-with-unleashclimbing_park_seongsua-climbing-gym-in-seongsu/288480304266569/)  
- Reddit (tourist POV): [Seoul gyms](https://www.reddit.com/r/bouldering/comments/1itphw1/bouldering_gym_in_seoul/) | [Korea bouldering](https://www.reddit.com/r/bouldering/comments/1cs9u0b/south_korea_bouldering/)  
- Expat directories: [Expat Kids Korea](https://expatkidskorea.com/listing/climbing-centers/) | [Angloinfo Seoul](https://www.angloinfo.com/seoul/directory/seoul-climbing-bouldering-735)  
- Local apps: [올라(ALLA)](https://play.google.com/store/apps/details?id=com.hatchilab.allaapp) | [오클고](https://apps.apple.com/kr/app/%EC%98%A4%ED%81%B4%EA%B3%A0-%ED%81%B4%EB%9D%BC%EC%9D%B4%EB%B0%8D-%EA%B8%B0%EB%A1%9D-%EC%95%94%EC%9E%A5-%EC%A0%95%EB%B3%B4/id6479561592)  
- Patagonia article: https://www.patagonia.com/stories/long-live-the-dirtbag-dungeons/story-18035.html  

---