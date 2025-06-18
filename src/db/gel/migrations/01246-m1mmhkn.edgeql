CREATE MIGRATION m1mmhkn5hsmtmtmlfdyebbxv5fkdtec63vd2dxajr7f4p54convkpa
    ONTO m1toj4shqvvwsiwfmx5lzdnrtjoswz7jckm627q7zm3q67w5c3pxcq
{
  ALTER TYPE sys_core::SysSystem {
      ALTER LINK nodesConfig {
          RESET ON SOURCE DELETE;
          ON TARGET DELETE ALLOW;
      };
  };
};
