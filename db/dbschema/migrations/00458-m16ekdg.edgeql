CREATE MIGRATION m16ekdgv5qdk6vmzvrdlxzkkj6idw3w4vgdkpfnettk3kuf5szpjua
    ONTO m1txqrqnel4g2q3umw6sadl43xvsgm5joxtharmpwe2iap5s3nii3a
{
  ALTER TYPE sys_core::SysDataObjListEditDataMapItem {
      ALTER LINK column {
          SET TYPE sys_db::SysColumn USING (.column[IS sys_db::SysColumn]);
      };
  };
};
