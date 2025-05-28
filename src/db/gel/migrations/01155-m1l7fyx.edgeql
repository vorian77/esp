CREATE MIGRATION m1l7fyxve3zwqb45jc7rzrb7d4dxr52iymu7pf4hc4u5tc6rewch6a
    ONTO m1q7ilgj2fqid2rvd5bnl7jtqndjlgknkgwe2xn7kfiab65awuy6sq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK codeListEditPresetType {
          RENAME TO codeListPresetType;
      };
  };
};
