import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  return res.send({
    message: "Hi I successfully got a request :)",
  });
});

export default handler;
