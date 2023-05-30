import express from "express";
import { z } from "zod";

import protect from "../util/protect.js";
import { postIdParser, commentIdParser } from "../util/params.js";

import Post from "../model/Post.js";
import Comment from "../model/Comment.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.query().withGraphFetched('comments.author(selectNonSensitive)')
  .modifiers({
    selectNonSensitive(builder) {
      builder.select("id", "name")
    }
  })
  res.json(posts);
});

router.post("/", protect, async (req, res) => {
  try {
    const id = z.coerce.number().parse(req.user?.id);
    const value = z
      .object({
        title: z.string(),
        content: z.string().optional(),
      })
      .parse(req.body);
    await Post.query().insert({
      title: value.title,
      content: value.content,
      authorId: id,
    });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
});

router.put("/:postId", protect, postIdParser, async (req, res) => {
  try {
    const content = z.string().optional().parse(req.body.content);
    await Post.query().findById(req.postId).patch({
      content,
    });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
});

router.delete("/:postId", protect, postIdParser, async (req, res) => {
  try {
    await Post.query().deleteById(req.params.postId);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
});

router.post("/:postId/c/", protect, postIdParser, async (req, res) => {
  try {
    const content = z.string().nonempty().parse(req.body.content);
    await Comment.query().insert({
      content,
      authorId: req.user?.id,
      postId: req.postId,
    });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
});

router.put(
  "/:postId/c/:commentId",
  protect,
  postIdParser,
  commentIdParser,
  async (req, res) => {
    try {
      const authorId = z.coerce.number().parse(req.user?.id);
      const content = z.string().parse(req.body.content);
      await Comment.query()
        .where("authorId", authorId)
        .findById(req.commentId)
        .patch({ content });
      return res.sendStatus(200);
    } catch (error) {
      return res.sendStatus(400);
    }
  }
);

router.delete(
  "/:postId/c/:commentId",
  protect,
  postIdParser,
  commentIdParser,
  async (req, res) => {
    try {
      const authorId = z.coerce.number().parse(req.user?.id);
      await Comment.query()
        .where("authorId", authorId)
        .deleteById(req.commentId);
      return res.sendStatus(200);
    } catch (error) {
      return res.sendStatus(400);
    }
  }
);

export default router;
