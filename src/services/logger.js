import { debugDate } from "../utils/date";

const develop = process.env.NODE_ENV === 'development';

export const logger = {
  info: (...data) => {
    if (develop) console.log(`[INFO ${debugDate()}]: `, ...data)
  },
  error: (...data) => {
    if (develop) console.error(`[ERROR ${debugDate()}]: `, ...data)
  },
  debug: (...data) => {
    if (develop) console.debug(`[DEBUG ${debugDate()}]: `, ...data)
  }
};

export default logger;
