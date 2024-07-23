import { redirect } from "next/navigation";

const IndexPage = () => {
  return redirect("/auth/signin");
};

export default IndexPage;
