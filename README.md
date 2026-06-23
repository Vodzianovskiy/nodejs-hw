
```
nodejs-hw
├─ .prettierrc
├─ eslint.config.mjs
├─ package-lock.json
├─ package.json
└─ src
   ├─ constants
   │  ├─ tags.js
   │  └─ time.js
   ├─ controllers
   │  ├─ authController.js
   │  ├─ notesController.js
   │  └─ userController.js
   ├─ db
   │  └─ connectMongoDB.js
   ├─ middleware
   │  ├─ authenticate.js
   │  ├─ errorHandler.js
   │  ├─ logger.js
   │  └─ notFoundHandler.js
   ├─ models
   │  ├─ note.js
   │  ├─ session.js
   │  └─ user.js
   ├─ server.js
   ├─ services
   │  └─ auth.js
   ├─ templates
   │  └─ reste-password-email.html
   ├─ utils
   │  ├─ saveFileToCloudinary.js
   │  └─ sendMail.js
   └─ validations
      ├─ authValidation.js
      └─ notesValidation.js

```