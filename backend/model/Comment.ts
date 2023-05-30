import { Model } from "objection";
import User from "./User";
import Post from "./Post";

class Comment extends Model {
  static get tableName() {
    return "comments";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["content"],

      properties: {
        id: { type: "integer" },
        content: { type: "string" },
        postId: { type: "integer" },
        authorId: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "comments.authorId",
          to: "users.id",
        },
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: "comments.postId",
          to: "post.id",
        },
      },
    };
  }
}

export default Comment;
