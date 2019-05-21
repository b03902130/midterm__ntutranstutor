# NTU TRANS TUTOR

### 簡介
為轉學生社團(台大轉聯會)提供能讓社員自行刊登家教資訊（針對轉學考）的網站

### 連結
- Demo: http://linux1.csie.ntu.edu.tw:1994/
- Github: https://github.com/b03902130/midterm_ntutranstutor

### 使用說明
- App
	- 未登入：瀏覽網頁內容，除了首頁外有三個主頁面（由Navigation Bar進入），而每個老師有一個個人頁面（由教師卡片進入）
		- 所有教師：將所有老師依據科系來排列教師卡片。
		- 所有課程：將所有老師依據其有刊登的科目，用科目來排列教師卡片。
		- 分類搜尋：用來快速查找某個科系或科目有什麼老師，每個按鈕會各自連結到上面兩個頁面正確的位置。
		- 教師個人頁面：列出教師個人資訊，聯絡方式，和每門科目的上課方式和收費。
	- 登入：使用Google OAuth 2.0，google帳號分四種身份:
		- Candidate：Gmail有在白名單上，代表為社團成員，可以刊登教師資訊但尚未刊登。
		- Teacher：Candidate刊登教師資訊後成為Teacher。可以編輯自己的教師頁面，但不能編輯其他人的。
		- Admin: 可以編輯所有教師刊登的內容。也可以編輯白名單，控管哪些Google帳號可以刊登內容。
		- Outsider：其他非上述三種身份的Google帳號。不能做什麼，因為這是給社團內部成員刊登使用，外部人員不能更改網站任何內容，因此只能瀏覽網頁。
	- Candidate：
		1. 右上角登入
		2. 右上角的箭頭下拉選單，點擊「成為教師」的按鈕
		3. 編輯個人資訊，可上傳照片，正方形為佳
		4. 編輯完後按儲存，身份變成Teacher，並自動引導到教師個人頁面
	- Teacher：
		1. 右上角登入
		2. 右上角的箭頭下拉選單，點擊「我的教師頁面」的按鈕
		3. 可以編輯個人資訊，更改圖片，新增課程與收費，或刪除此教師所有內容（身份變回Candidate）
	- Admin：
		1. 右上角登入
		2. 右上角的箭頭下拉選單會有「新增老師」和「管理白名單」的按鈕
			- 新增老師：
				- 讓管理員可以刊登任意數量的教師資訊
				- Teacher只能刊登一個，並只能編輯那一個
			- 管理白名單：
				- 有列在白名單上的Gmail才能刊登教師資訊
				- 主要是認Gmail，白名單上其他的欄位如姓名學號臉書，是方便管理用的
		3. 在「所有教師」和「所有課程」的列表中，每一張教師卡片點進去都能編輯該教師的個人和課程資訊
	- Demo accounts:
		- Admin
			- 帳號：ntutrans2019@gmail.com
			- 密碼：leo19941227
		- Candidate/Teacher：這兩個身份會互相轉換，因此用同一個Demo帳號
			- 帳號：ntutranstutor@gmail.com
			- 密碼：leo19941227

- Build
  - 執行環境預設為Linux，如果在Windows上執行，則須修改backend和frontend的package.json中設定環境變數的寫法：
    - Linux: `PORT=1994 next_command`
    - Windows: `SET PORT=1994 & next_command` (前面加SET，後面加&)
      - frontend的package.json只有PORT要改
      - backend的package.json要改PORT和DEBUG兩個變數
    - backend用的port是1994，frontend用的port是1227
	- Setup
    1. `git clone https://github.com/b03902130/midterm_ntutranstutor.git`
    2. `cd midterm_ntutranstutor/backend/`
    3. `npm install`
    4. `cd ../frontend/`
    5. `npm install`
  - Demo at local
    1. `cd midterm_ntutranstutor/backend/`
    2. `npm start`
    3. Demo server runs at `http://localhost:1994/`
	- Develop at local
    1. `cd midterm_ntutranstutor/backend/`
    2. `npm run double`
    3. `cd ../frontend/`
    4. `npm start`
    5. Both frontend and backend servers will refresh on file changes, URL: `http://localhost:1227/`

### 其他說明
- 由於Google OAuth 2.0需要預先設定正確的server URL，所以只有以下兩個跑backend的URL可以正確執行(包含PORT)：
  - `http://linux1.csie.ntu.edu.tw:1994` (demo link)
  - `http://localhost:1994`

### 使用的框架
- Backend
  - express
  - passport
  - passport-google-oauth
  - axios
  - mongodb/mongoose
- Frontend
  - react
  - axios
  - bootstrap
  - react-bootstrap
  - material-ui
  - react-router
- Reference
  - Upload to Imgurl: `https://github.com/pinceladasdaweb/imgur`

### 貢獻
- 過去自己在跑社團時，因擔任轉聯會幹部而辦了家教平台。那時最大的困境就是我們只有用Facebook粉專作為刊登資訊與聯絡的管道，變得很難管理。
  - 教師資訊只能用相簿的方式勉強依據科系分類，難以針對科目分類。就算在每位教師的貼文上加科目tag，也會因為FB的tag搜尋太爛而不實用。
  - 編輯權限難以控管，就算把教師加入粉專editor，也沒辦法限制誰只能編輯什麼貼文，而且教師人數一多也不好把全部人都加editor。後來就變成教師想編輯任何資訊就得聯絡小編，造成工作負擔。
  - 但由於是無營利的社團服務，若工作麻煩又沒好處就很難找下一屆經營。
- 主要貢獻就是提供管理工具，讓社團的這項服務可以更輕鬆經營。仍然使用FB粉專作為觸及手段，但詳情資料由網站提供。
- Future work：未來會再加入對話功能，讓非社團成員（考生）登入後就能直接在網站上聯絡老師，可以保護老師的個資。

### 心得
這個Project做起來感觸良多，畢竟就曾是自己花了好多時間籌辦的東西，裡面每一張圖或icon都是過去自己做的，雖然最後沒有很成功但還是很有感情。
隔了兩三年後把他做出來就挺感動的，圖沒有白修，也藉此把前後端都自己摸過。除了Imgurl上傳圖片的部分有借用別人的code後修改，其他部分都是參考
一些範例後手刻。這次除了體驗了後端動輒得咎的複雜，也努力學著快速使用CSS框架。真心覺得CSS框架很難上手......其他工具都是看看文件，試跑
一下或開個debugger就能知道大致怎麼使用，但CSS框架常常看了文件老半天，查了StackOverflow，又各種trial & error，還是兜不出想要的
樣子。能藉這次Project掌握如何使用CSS框架覺得很有收穫。另外是前後端的溝通，使用Axios的過程，一開始常常為了前端改後端，之後又為了後端改前端
，寫得很不乾淨。撞了幾次牆後有比較了解該怎麼把前後端切乾淨，先定好spec再開寫才不會一遍混亂。

