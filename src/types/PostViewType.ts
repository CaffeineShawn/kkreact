import {
  PostsWithRelay_postsWithRelay_edges_node_commentsWithRelay,
  PostsWithRelay_postsWithRelay_edges_node_creator, PostsWithRelay_postsWithRelay_edges_node_reports,
  PostsWithRelay_postsWithRelay_edges_node_subject, PostsWithRelay_postsWithRelay_edges_node_votes
} from '../generated/PostsWithRelay'

export interface PostViewType {
  id: string
  content: string
  createdAt: string
  votes: PostsWithRelay_postsWithRelay_edges_node_votes;
  reports: PostsWithRelay_postsWithRelay_edges_node_reports;
  commentsWithRelay: PostsWithRelay_postsWithRelay_edges_node_commentsWithRelay;
  subject: PostsWithRelay_postsWithRelay_edges_node_subject | null;
  images: string[] | null
  creator: PostsWithRelay_postsWithRelay_edges_node_creator | null
}
