import { initPassword } from "./password.js";
import { initTheme } from "./theme.js";
import { initLogin } from "./login.js";
import { initSignup } from "./signup.js";
import { initForgotPass } from "./forgotPass.js";
import { initVerifyCode } from "./verifyCode.js";
import { initResetPassword } from "./resetPassword.js";


document.addEventListener("DOMContentLoaded", function () {

    initPassword();
    initTheme();
    initLogin();
    initSignup();
    initForgotPass();
    initVerifyCode();
    initResetPassword();

});