CREATE MIGRATION m1ejktiwcfgorrm4cqav54u2k2ucq6i5ewv66l3mm76avrt7d6fdxa
    ONTO m15csxjyjfjum4eakjx52ebb63rauitteenuyfrmupscegcam3c32q
{
  ALTER TYPE sys_user::SysUserType {
      DROP EXTENDING sys_core::SysObjOrg;
      EXTENDING sys_core::ObjRootCore,
      sys_user::Mgmt LAST;
  };
};
