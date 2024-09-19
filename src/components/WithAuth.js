// import { useContext, useEffect } from "react";
// import { useRouter } from "next/router";
// import AuthContext from "../contexts/AuthContext";

// const withAuth = (WrappedComponent) => {
//   return (props) => {
//     const { user } = useContext(AuthContext);
//     const router = useRouter();

//     useEffect(() => {
//       if (!user) router.replace("/login");
//     }, [user]);

//     if (!user) return null;

//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAuth;
