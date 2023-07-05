import jwt from 'jsonwebtoken';

const generateJWT = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid
    };

    jwt.sign(payload, process.env.JWT_SECRET || '', {
      expiresIn: '1h'
    }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

export default generateJWT;
