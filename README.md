# First try on OAuth

- While using Google authentication, we need to let Google recognize our server IP first.
- `linux1.csie.ntu.edu.tw:5678` has already applied for recognition, so we have to run server on that constrain, or we need to apply for new recognition.
- How to run:
	- Server: `linux1.csie.ntu.edu.tw:5678`
	- React dev server: `linux1.csie.ntu.edu.tw:8765`
		- This server is only for development
		- While developing, we do not want to keep building our React project.
		- After building for production, the redirect address in route/index.js (express side) need to be modified.
