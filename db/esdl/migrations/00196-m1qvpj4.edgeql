CREATE MIGRATION m1qvpj4jtewdr7yahnjsvgtpmpju6lcnfynuvkl6u6a4mvigsg2moq
    ONTO m1yrh5re53q7py757gxs2bf6lke23j62j4teh5bazhvjscmpfcszbq
{
                  CREATE TYPE sys_core::SysDataObjActionConfirm {
      CREATE REQUIRED LINK codeActionShow: sys_core::SysCode;
      CREATE CONSTRAINT std::exclusive ON (.codeActionShow);
      CREATE PROPERTY confirmButtonLabelCancel: std::str;
      CREATE PROPERTY confirmButtonLabelConfirm: std::str;
      CREATE PROPERTY confirmMessage: std::str;
      CREATE PROPERTY confirmTitle: std::str;
  };
  ALTER TYPE sys_core::SysDataObjAction {
      CREATE MULTI LINK actionConfirms: sys_core::SysDataObjActionConfirm {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE TYPE sys_core::SysDataObjActionShow {
      CREATE REQUIRED LINK codeActionShow: sys_core::SysCode;
      CREATE CONSTRAINT std::exclusive ON (.codeActionShow);
      CREATE REQUIRED PROPERTY isRequired: std::bool;
  };
  ALTER TYPE sys_core::SysDataObjAction {
      CREATE MULTI LINK actionShows: sys_core::SysDataObjActionShow {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      ALTER LINK codeActionConfirmType {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      ALTER LINK codeActionsEnable {
          RESET CARDINALITY USING (SELECT
              .codeActionsEnable 
          LIMIT
              1
          );
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
  ALTER TYPE sys_core::SysDataObjAction {
      DROP LINK codeActionsShow;
      DROP PROPERTY confirmButtonLabelCancel;
      DROP PROPERTY confirmButtonLabelConfirm;
      DROP PROPERTY confirmMessage;
      DROP PROPERTY confirmTitle;
  };
};
