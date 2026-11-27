const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

function useToken() {
    const token = window.localStorage.getItem("token");
    if (token && token !== "null" && token !== "undefined") {
        myHeaders.set("Authorization", `Bearer ${token}`);
        return true;
    }
}

export function login(username, password, setErrors) {
    myHeaders.append("Content-Type", "application/json");
    useToken();

    const raw = JSON.stringify({
        "username": username,
        "password": password
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/api/v1/auth/login", requestOptions)
        .then(async (response) => {
            const data = await response.json();
            if (response.ok) {
                window.localStorage.setItem("token", data.token);
                window.localStorage.setItem('username', username);
                window.location.href = '/homepage';
            } else {
                setErrors(data?.errors);
                alert(data.message);
            }
        })
}

export function logout() {
    useToken()

    const raw = "";

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/api/v1/auth/logout", requestOptions)
        .then(async (response) => {
            window.localStorage.clear();
            window.location.href = '/login'
        })
}

export function register({fullName, username, password, bio, isPrivate}, setErrors) {
    myHeaders.append("Content-Type", "application/json");
    useToken()

    const raw = JSON.stringify({
        "full_name": fullName,
        "username": username,
        "password": password,
        "bio": bio,
        "is_private": isPrivate
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/api/v1/auth/register", requestOptions)
        .then(async (response) => {
            const data = await response.json();
            if (response.ok) {
                window.localStorage.setItem("token", data.token);
                window.localStorage.setItem('username', username);
                
                alert("Registrasi berhasil! Silakan login.");
                window.location.href = '/login';
            } else {
                setErrors(data?.errors);
                alert(data.message);
            }
        })
}

export function getAllUsers(setUsers) {
    if (!useToken()) return;

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/api/v1/users", requestOptions)
        .then(async (response) => {
            const data = await response.json();
            setUsers(data.users);
        })
}

export function getFollowers(username, setFollowers) {
    if (!useToken()) return;

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`http://127.0.0.1:8000/api/v1/users/${username}/followers`, requestOptions)
        .then(async (response) => {
            const data = await response.json();
            if (response.ok) {
                setFollowers(data.followers);
            } else {
                alert(data.message || "Fail to getFollowers");
            }
        })
}

export function getDetailUser(username, setUser) {
    useToken()

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`http://127.0.0.1:8000/api/v1/users/${username}`, requestOptions)
        .then(async (response) => {
            const data = await response.json();
            if (response.ok) {
                setUser(data);
            } else {
                alert(data.message || "Fail to getDetail");
            }
        })
}

export function getFollowing(username, setFollowing) {
    useToken()

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`http://127.0.0.1:8000/api/v1/users/${username}/following`, requestOptions)
        .then(async (response) => {
            const data = await response.json();
            if (response.ok) {
                setFollowing(data.following);
            } else {
                alert(data.message || "Fail to getFollowing");
            }
        })
}

export function deletePost(id) {
    useToken()

    const raw = "";

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(`http://127.0.0.1:8000/api/v1/posts/${id}`, requestOptions)
        .then(async (response) => {
            if (response.ok) {
                window.location.reload()
            } else {
                const data = await response.json();
                alert(data.message || "Fail to deletePost");
            }
        })
}

export function followUser(username) {
    useToken()

    const formdata = new FormData();

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };

    fetch(`http://127.0.0.1:8000/api/v1/users/${username}/follow`, requestOptions)
        .then(async (response) => {
            if (response.ok) {
                window.location.reload()
            } else {
                const data = await response.json();
                alert(data.message || "Fail to follow");
            }
        })
}

export function unfollowUser(username) {
    useToken()

    const formdata = new FormData();

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };

    fetch(`http://127.0.0.1:8000/api/v1/users/${username}/unfollow`, requestOptions)
        .then(async (response) => {
            if (response.ok) {
                window.location.reload()
            } else {
                const data = await response.json();
                alert(data.message || "Fail to unfollow");
            }
        })
}

export function acceptFollow(username) {
    useToken()

    const raw = "";

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(`http://127.0.0.1:8000/api/v1/users/${username}/accept`, requestOptions)
        .then(async (response) => {
            if (response.ok) {
                window.location.reload()
            } else {
                const data = await response.json();
                alert(data.message || "Fail to acceptFollow");
            }
        })
}

export function createNewPost({caption, files}, username, setErrors) {
    useToken()

    const formdata = new FormData();
    if (caption) {
        formdata.append("caption", caption);
    }
    if (files) {
        let i = 0
        for (const file of files) {
            formdata.append(`attachments[${i}]`, file);
            i++
        }
    }

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/api/v1/posts", requestOptions)
        .then(async (response) => {
            if (response.ok) {
                window.location.href = `/profile/${username}`
            } else {
                const data = await response.json();
                alert(data.message || "Fail to createNewPost");
            }
        })
}

export function getPosts(setPosts, page = 0, size = 10) {
    useToken()

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`http://127.0.0.1:8000/api/v1/posts/v2?page=${page}&size=${size}`, requestOptions)
        .then(async (response) => {
            const data = await response.json();
            if (response.ok) {
                setPosts(data);
            } else {
                alert(data.message || "Fail to getPosts");
            }
        })
}