import { Request, Response } from 'express';
import { getTransactions_service } from '../../service/transaction.service';

const getTransactions_controller = async (req: Request, res: Response) => {
    try {
        const privateKey = req?.user?.privateKey as string;
        const result = await getTransactions_service({ privateKey });
        if (result.success) {
            return res.status(201).json(result);
        }
        else {
            return res.status(500).json(result)
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            error: err,
        })
    }
}

export {
    getTransactions_controller
}
