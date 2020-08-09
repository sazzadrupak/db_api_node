module.exports = () => {
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
};
