import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
};

export function corsMiddleware(req: NextApiRequest,
  res: NextApiResponse) {
  return runMiddleware(req, res, cors)
}