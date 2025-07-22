interface Post {
    id: string,
    title: string,
    created_at: string,
    upvotes: number,
    nr_of_comments: number,
    description: string,
    image: string,
    group: {
        id: string,
        name: string,
        image: string
    },
    user: {
        id: string,
        name: string,
        image: string
    }
}

interface PostListItemProps {
    post: Post;
}

interface Group{
    id:string
    name:string
    image:string
}
interface Comment {
    id: string;
    post_id: string;
    user_id: string;
    parent_id: string | null;
    comment: string;
    created_at: string;
    upvotes: number;
    user: User;
    replies: Comment[];
  }