CREATE MIGRATION m1yffd2p3n3nedf4cxstizqtzlkuoe76c67pkzobbi4dlfp7ulq6sa
    ONTO m1evl3f5nrtfe7aljsaqmv7l3w2eik7drhe2eons6njnvwmgcgib4q
{
  ALTER TYPE sys_user::SysUserType {
      DROP LINK resources;
  };
  DROP TYPE sys_user::SysUserTypeResource;
};
