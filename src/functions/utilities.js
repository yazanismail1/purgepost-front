import { db } from "@/components/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import cookie from 'react-cookies'

const setCookie = (name, value, days=0) => {
    cookie.save(name, value, { path: '/' });
    // document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

const getCookie = (name) => {
    return cookie.load(name);
    // const nameEQ = name + "=";
    // const ca = document.cookie.split(';');
    // for (let i = 0; i < ca.length; i++) {
    //     let c = ca[i];
    //     while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    //     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    // }
    // return null;
}

const eraseCookie = (name) => {
    cookie.remove(name);
    // document.cookie = name + '=; Max-Age=-99999999;';
}

const getDataFromFirebase = async (collection, id) => {
    const ref = doc(db, collection, id);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("User data:", data);
        return data;
    } else {
        console.log("No such document!");
        alert("No such document!");
    }
}

const sendPostRequest = (url, body) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            return data;
        })
        .catch((error) => {
            console.log('Error:', error);
            return;
        });
}

const sendGetRequest = (url) => {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            return;
        });
}

const initFacebookSdk = (callback) => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = () => {
        window?.FB?.init({
            appId: '1268250524120464', // Replace with your App ID
            cookie: true,
            xfbml: true,
            version: 'v16.0'
        });

        // Call the provided callback once initialized
        if (typeof callback === 'function') {
            callback();
        }
    };
};

const getFacebookLoginStatus = (callback) => {
    window?.FB?.getLoginStatus((response) => {
        if (typeof callback === 'function') {
            callback(response);
        }
    });
};

const fbLogin = (callback) => {
    window?.FB?.login((response) => {
        if (typeof callback === 'function') {
            callback(response);
        }
    });
};

export { setCookie, getCookie, eraseCookie, getDataFromFirebase, sendPostRequest, sendGetRequest, initFacebookSdk, getFacebookLoginStatus, fbLogin };