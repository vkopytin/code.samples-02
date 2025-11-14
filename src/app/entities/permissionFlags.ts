// by default all permissions are as for own resources
// Adding permissions means extending more rights
export enum PermissionFlags {
  None = 0,
  List = 1 << 0,
  Details = 1 << 1,
  Create = 1 << 2,
  Edit = 1 << 3,
  Remove = 1 << 4,
  All = 1 << 5, // extends to all resources
}
