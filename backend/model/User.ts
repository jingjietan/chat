import { Model } from "objection";

import Post from "./Post";
import Comment from "./Comment";

interface User {
  id: number
  name: string
  email: string
  hashPassword: string
}

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "hashPassword"],

      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        email: { type: "string" },
        hashPassword: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: "users.id",
          to: "posts.authorId",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "users.id",
          to: "comments.authorId",
        },
      },
    };
  }
}

export default User;
