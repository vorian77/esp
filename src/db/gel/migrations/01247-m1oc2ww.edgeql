CREATE MIGRATION m1oc2wwfpulejscsbpv726ofrj5osemnf5jw3e2qhqfpj7ntlog25a
    ONTO m1mmhkn5hsmtmtmlfdyebbxv5fkdtec63vd2dxajr7f4p54convkpa
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK codeComponent;
  };
  ALTER TYPE sys_core::SysNodeObj {
      CREATE LINK codeComponent: sys_core::SysCode;
  };
};
