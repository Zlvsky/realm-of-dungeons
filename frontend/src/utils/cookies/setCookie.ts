import Cookies from "js-cookie";

function setCookies(jwt: string) {
    Cookies.set("jwt", jwt, { expires: 7 });
}

export default setCookies;