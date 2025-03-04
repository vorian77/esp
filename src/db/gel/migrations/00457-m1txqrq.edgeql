CREATE MIGRATION m1txqrqnel4g2q3umw6sadl43xvsgm5joxtharmpwe2iap5s3nii3a
    ONTO m1kr7pthjmknadaqcmaep5jba52kxl6ilmfvowtvtb5g644u4iav3a
{
              CREATE TYPE sys_core::SysDataObjListEditDataMapItem EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK column: sys_core::SysDataObjColumn;
      CREATE PROPERTY orderDisplay := (0);
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE MULTI LINK listEditDataMapItems: sys_core::SysDataObjListEditDataMapItem {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
