import { Request, Response } from 'express';
import {
    createMemberComment,
    createNonMemberComment,
    getCommentsFromPostUuid,
    deleteMemberCommentFromUuid,
    deleteNonMemberCommentFromUuid
} from '../../service/comment.service';
import { addReward_service } from '../../service/reward.service';

const sendMemberComment = async (req: Request, res: Response) => {
    const {
        content,
        postUuid,
        parentUuid,
    } = req.body;
    const { id } = req.user;
    const result = await createMemberComment({
        content,
        postUuid,
        id,
        parentUuid,
    });
    if (result.success) {
        addReward_service({ type: "comment", id });
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}

const sendNonMemberComment = async (req: Request, res: Response) => {
    const {
        content,
        postUuid,
        parentUuid,
        anonymouseId,
        password,
    } = req.body;
    const result = await createNonMemberComment({
        content,
        postUuid,
        anonymouseId,
        password,
        parentUuid
    });
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}

const deleteMemberComment = async (req: Request, res: Response) => {
    const id = req.user.id;
    const { commentUuid } = req.body;
    const result = await deleteMemberCommentFromUuid({
        id,
        commentUuid,
    })
    if (result.success) {
        return res.status(200).json(result);
    }
    else {
        return res.status(400).json(result);
    }
}
const deleteNonMemberComment = async (req: Request, res: Response) => {
    const { commentUuid, commentPassword } = req.body;
    const result = await deleteNonMemberCommentFromUuid({
        commentPassword,
        commentUuid,
    })
    if (result.success) {
        return res.status(200).json(result);
    }
    else {
        return res.status(400).json(result);
    }
}


const updateMemberComment = (req: Request, res: Response) => {
    const result = { success: true }
    if (result.success) {
        return res.status(200).json(result);
    }
    else {
        return res.status(400).json(result);
    }
}
const updateNonMemberComment = (req: Request, res: Response) => {
    const result = { success: true }
    if (result.success) {
        return res.status(200).json(result);
    }
    else {
        return res.status(400).json(result);
    }
}


const getComments = async (req: Request, res: Response) => {
    const postUuid = req.query.postUuid as string;
    const result = await getCommentsFromPostUuid({ postUuid });
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(400).json(result)
    }
}


export {
    sendMemberComment,
    sendNonMemberComment,
    getComments,
    deleteMemberComment,
    deleteNonMemberComment,
    updateMemberComment,
    updateNonMemberComment,
}
