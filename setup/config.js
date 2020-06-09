// module.exports = {
//    mongoURL:
//       "mongodb+srv://friday:Hello123@stackoverflowclone-zcgsj.mongodb.net/test?retryWrites=true&w=majority",
//    secret: "mystrongsecretdonottrytosteelit",
// };

module.exports = {
   mongoURL: process.env.mongoURL,
   secret: process.env.secret,
};
