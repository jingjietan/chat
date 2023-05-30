import { Model } from "objection";

import User from "./User";
import Comment from "./Comment";

class Post extends Model {
  static get tableName() {
    return "posts";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],

      properties: {
        id: { type: "integer" },
        title: { type: "string" },
        content: { type: "string" },
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
          from: "posts.authorId",
          to: "users.id",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "posts.id",
          to: "comments.postId",
        },
      },
    };
  }
}

export default Post;
