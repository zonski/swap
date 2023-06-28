import {auth,} from "express-oauth2-jwt-bearer";
import {config} from "../../config.js";

export const validateAccessToken = auth({
  issuerBaseURL: `https://${config.auth0.domain}`,
  audience: config.auth0.audience,
});

// export const checkRequiredPermissions = (requiredPermissions: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const permissionCheck = claimCheck((payload) => {
//       const permissions = payload.permissions as string[];
//
//       const hasPermissions = requiredPermissions.every((requiredPermission) =>
//         permissions.includes(requiredPermission)
//       );
//
//       if (!hasPermissions) {
//         throw new InsufficientScopeError();
//       }
//
//       return hasPermissions;
//     });
//
//     permissionCheck(req, res, next);
//   };
// };