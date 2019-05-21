# 台大轉學生家教平台

### 簡介
為轉學生社團(台大轉聯會)提供能讓社員自行刊登家教資訊（針對轉學考）的網站

### 連結
- Deploy: http://linux1.csie.ntu.edu.tw:1994/
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
	- Demo:
		- Admin
			- 帳號：ntutrans2019@gmail.com
			- 密碼：leo19941227
		- Candidate/Teacher：這兩個身份會互相轉換，因此用同一個Demo帳號
			- 帳號：ntutranstutor@gmail.com
			- 密碼：leo19941227

- Build
	- backend
		1. `git clone https://github.com/b03902130/midterm_ntutranstutor.git`
		2. `cd midterm_ntutranstutor/backend/`
		3. `npm install`
		4. `npm start`
		5. 只需要backend資料夾的部分跑起來網站即可正常運作，會跑在 http://localhost:1994/
	- frontend
		1. `cd midterm_ntutranstutor/frontend/`
		2. `npm install`
		3. `npm start`
		4. 想要讓此frontend development server可以和backend正確溝通的話，開啟backend的指令改成`npm run double`

### 其他說明


### 使用的框架


### 貢獻


### 心得

