// import React, { ReactNode, useEffect } from 'react';
// import { useAppSelector } from '.';
// import { store } from '../store';
// import { checkAuth } from '../store/api-actions';

// export default function useAuth(children: ReactNode) {
//   useEffect(() => {
//     store.dispatch(checkAuth());
//   }, []);

//   const authorizationStatus = useAppSelector(
//     (state) => state.authorizationStatus
//   );

//   if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
//     return <Preloader />;
//   }

//   return {children}
// }

export {}