export default () => {
  return {
    headers: {
      Authorization: `Client-ID aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5`,
      'Content-Type': 'application/json',
      XClient: window.location.hostname + (window.location.port ? `:${window.location.port}` : ''),
    },
  };
};