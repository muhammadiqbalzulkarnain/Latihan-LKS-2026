import { parseDate } from "../helpers/helper.js";
import { useState, useEffect } from "react";
import { acceptFollow, getAllUsers, getFollowers, getPosts } from "../helpers/fetch.js";

export default function Homepage() {
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [currentPost, setCurrentPost] = useState([])
    const [followers, setFollowers] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pagePostUpdated, setPagePostUpdated] = useState(true)
    const username = window.localStorage.getItem("username")

    document.title = 'Homepage'

    function detectBottom(e) {
        const totalHeight = document.documentElement.scrollHeight;
        const currentPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        if ((currentPosition + windowHeight >= totalHeight) && pagePostUpdated) {
            setCurrentPage(v => v + 1)
            setPagePostUpdated(false)
        }
    }

    useEffect(() => {
        if (currentPage === 0) return
        getPosts(setCurrentPost, currentPage)
    }, [currentPage])

    useEffect(() => {
        if (currentPage === 0) return

        setPosts(v => {
            return {
                ...currentPost,
                posts: [
                    ...v.posts,
                    ...currentPost.posts,
                ]
            }
        })
    }, [currentPost])

    useEffect(() => {
        getAllUsers(setUsers)
        getPosts(setPosts)

        if (username && username !== "null") {
            getFollowers(username, setFollowers)
        }

        document.addEventListener('scroll', detectBottom)

        return () => {
            document.removeEventListener('scroll', detectBottom)
        }
    }, [username])

    return (
        <>
            <main className="mt-5">
                <div className="container py-5">
                    <div className="row justify-content-between">
                        <div className="col-md-8">
                            <h5 className="mb-3">News Feed</h5>

                            {
                                posts?.posts?.map((post, i) => (
                                    <div className="card mb-4" key={i}>
                                        <div
                                            className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                                            <h6 className="mb-0">{post.user.full_name}</h6>
                                            <small
                                                className="text-muted">{parseDate(post.created_at)}</small>
                                        </div>
                                        <div className="card-body">
                                            <div className="card-images mb-2">
                                                {
                                                    post?.attachments?.map((attachment, j) => (
                                                        <img
                                                            src={`http://127.0.0.1:8000/storage/${attachment.storage_path}`}
                                                            key={`image-${i}-${j}`} alt="image"
                                                            className="w-100" />
                                                    ))
                                                }
                                            </div>
                                            <p className="mb-0 text-muted"><b><a
                                                href={`/profile/${post.user.username}`}>{post.user.username}</a></b> {post.bio}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                        <div className="col-md-4">
                            {
                                followers?.filter(v => v.is_requested).length > 0 &&
                                <div className="request-follow mb-4">
                                    <h6 className="mb-3">Follow Requests</h6>
                                    <div className="request-follow-list">
                                        <div className="card mb-2">
                                            {
                                                followers?.filter(v => v.is_requested).map(follower => (
                                                    <div
                                                        className="card-body d-flex align-items-center justify-content-between p-2">
                                                        <a href={`/profile/${follower.username}`}>@{follower.username}</a>
                                                        <button type="button"
                                                            onClick={() => acceptFollow(follower.username)}
                                                            className="btn btn-primary btn-sm">
                                                            Confirm
                                                        </button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="explore-people">
                                <h6 className="mb-3">Explore People</h6>
                                <div className="explore-people-list">
                                    {
                                        users?.map((user, i) => (
                                            <div className="card mb-2" key={i}>
                                                <div className="card-body p-2">
                                                    <a href={`/profile/${user.username}`}>@{user.username}</a>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}