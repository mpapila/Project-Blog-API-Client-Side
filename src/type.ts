export interface ErrorResponse {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
}

export interface LocationType {
    successMessage?: string;
}
export interface User {
    id: number;
    username: string;
    isAuthor: boolean;

}

export interface Comment {
    userId: number;
    map(arg0: (comment: Comment) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    length: number;
    id: number;
    content: string
    date: string;
    user: User;

}

export interface Post {
    id: number;
    title: string;
    content: string;
    date: string;
    isPublished: boolean;
    userId: number;
    user: User;
    comment: Comment
}

export interface PostData {
    posts: Post[];
    allPosts: Post[];
    id: number;
    title: string;
    content: string;
    date: string;
    isPublished: boolean;
    userId: number;
    comment: Comment
    user: User;

}
