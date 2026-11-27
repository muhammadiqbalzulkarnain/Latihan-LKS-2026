import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deletePost, followUser, getDetailUser, getFollowers, getFollowing, unfollowUser } from "../helpers/fetch.js";

export default function UserProfile() {
    const {username} = useParams()
    const [user, setUser] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    document.title = 'Profile' + username;

    useEffect(() => {
        getDetailUser(username, setUser)
        getFollowers(username, setFollowers)
        getFollowing(username, setFollowing)
    }, [])

    return <>
        <main className="mt-5">
            <div className="container py-5">
                <div className="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                            <h5 className="mb-0">{user?.full_name}</h5>
                            <span>@{user?.username}</span>
                        </div>
                        <small className="mb-0 text-muted">
                            {user?.bio}
                        </small>
                    </div>
                    <div>
                        <ProfileComponent user={user} />
                        <div className="d-flex gap-3">
                            <div>
                                <div className="profile-label"><b>{user?.posts_count}</b> Posts</div>
                            </div>
                            <div className="profile-dropdown">
                                <div className="profile-label"><b>{user?.followers_count}</b> Followers</div>
                                <div className="profile-list">
                                    <div className="card">
                                        <div className="card-body">
                                            {
                                                followers?.map((follower, idx) => (
                                                    <div className="profile-user" key={idx}>
                                                        <a href={`/profile/${follower.username}`}>@{follower.username}</a>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-dropdown">
                                <div className="profile-label"><b>{user?.following_count}</b> Following</div>
                                <div className="profile-list">
                                    <div className="card">
                                        <div className="card-body">
                                            {
                                                following?.map((follow, idx) => (
                                                    <div className="profile-user" key={idx}>
                                                        <a href={`/profile/${follow.username}`}>@{follow.username}</a>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    (user?.is_private && !user?.is_your_account && user?.following_status !== 'following') ? (
                        <div className="card py-4">
                            <div className="card-body text-center">
                                &#128274; This account is private
                            </div>
                        </div>
                    ) : (
                        <div className="row justify-content-center">
                            {
                                user?.posts?.map((post, idx) => (
                                    <div className="col-md-4" key={post.id || idx}>
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <div className="card-images mb-2">
                                                    {
                                                        post.attachments?.map((attachment, j) => (
                                                            <img
                                                                src={`http://127.0.0.1:8000/storage/${attachment.storage_path}`}
                                                                key={`image-${idx}-${j}`} alt="image"
                                                                className="w-100" />
                                                        ))
                                                    }
                                                </div>
                                                <p className="mb-0 text-muted">{post.caption}</p>
                                                {
                                                    user?.is_your_account &&
                                                    <button type="button" onClick={() => deletePost(post.id)}
                                                        className="btn btn-danger">
                                                        Delete
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </main>
    </>
}

function ProfileComponent({ user }) {
    if (user?.is_your_account) {
        return <>
            <a href="/create-post" className="btn btn-primary w-100 mb-2">
                + Create new post
            </a>
        </>
    }

    if (user?.following_status === 'not-following') {
        return <>
            <button type="button" onClick={() => followUser(user?.username)} className="btn btn-primary w-100 mb-2">
                Follow
            </button>
        </>
    }

    if (user?.following_status === 'requested') {
        return <>
            <button type="button" onClick={() => unfollowUser(user?.username)} className="btn btn-secondary w-100 mb-2">
                Requested
            </button>
        </>
    }

    if (user?.following_status === 'following') {
        return <>
            <button type="button" onClick={() => unfollowUser(user?.username)} className="btn btn-secondary w-100 mb-2">
                Following
            </button>
        </>
    }
}