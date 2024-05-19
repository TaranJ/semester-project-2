import { setUploadListener } from "./api/createlisting.js";
import { handleNoUserForPostCreation } from "./ui/logindisplay.js";

handleNoUserForPostCreation();
setUploadListener();
