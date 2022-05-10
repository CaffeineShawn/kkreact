import {
  PostsWithRelay_postsWithRelay_edges_node_creator, PostsWithRelay_postsWithRelay_edges_node_reports,
  PostsWithRelay_postsWithRelay_edges_node_subject, PostsWithRelay_postsWithRelay_edges_node_votes
} from '../generated/PostsWithRelay'
import { SearchPosts_posts_edges_node_Post_trendingComments } from '../generated/SearchPosts'

export interface PostViewType {
  id: string
  content: string
  createdAt: string
  votes: PostsWithRelay_postsWithRelay_edges_node_votes;
  reports: PostsWithRelay_postsWithRelay_edges_node_reports;
  subject: PostsWithRelay_postsWithRelay_edges_node_subject | null;
  trendingComments: SearchPosts_posts_edges_node_Post_trendingComments;
  images: string[] | null
  creator: PostsWithRelay_postsWithRelay_edges_node_creator | null
}
